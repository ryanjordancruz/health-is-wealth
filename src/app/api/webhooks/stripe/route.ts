import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 500 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  // Signature is verified against the raw request body before we trust
  // anything in the payload — this is what stops a forged POST to this
  // endpoint from minting fake paid orders.
  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      const order = await prisma.order.findUnique({
        where: { id: orderId },
        include: { items: true },
      });

      // Stripe may retry webhook delivery — checking current status first
      // keeps order finalization and the cart-clear idempotent.
      if (order && order.status === "PENDING") {
        const paymentIntentId =
          typeof session.payment_intent === "string" ? session.payment_intent : null;

        await prisma.$transaction(async (tx) => {
          await tx.order.update({
            where: { id: order.id },
            data: { status: "PAID", stripePaymentIntentId: paymentIntentId },
          });

          await tx.cartItem.deleteMany({
            where: {
              userId: order.userId,
              productId: { in: order.items.map((item) => item.productId) },
            },
          });
        });
      }
    }
  }

  return NextResponse.json({ received: true });
}
