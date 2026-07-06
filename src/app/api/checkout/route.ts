import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import { requireSession } from "@/lib/authz";
import { getCartForUser } from "@/lib/cart";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.redirect(new URL("/login?callbackUrl=/cart", request.url), 303);
  }

  if (
    !rateLimit(`checkout:${session.user.id}`, 20, 60 * 60 * 1000) ||
    !rateLimit(`checkout-ip:${clientIp(request)}`, 40, 60 * 60 * 1000)
  ) {
    return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  }

  // Prices, names, and quantities are always re-derived from the database
  // here — never trusted from anything the client could have sent — so a
  // tampered request can't change what the customer is charged.
  const { items, subtotalCents } = await getCartForUser(session.user.id);
  if (items.length === 0) {
    return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? new URL(request.url).origin;

  // The order is created as PENDING with a snapshot of current prices
  // before Stripe is ever contacted. The webhook only ever flips this same
  // row to PAID — it never re-derives pricing from the (possibly
  // since-changed) cart or Product table, so what the customer is charged
  // by Stripe always matches what's recorded as sold.
  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      status: "PENDING",
      totalCents: subtotalCents,
      items: {
        create: items.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          priceCents: item.product.priceCents,
        })),
      },
    },
  });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: { name: item.product.name },
        unit_amount: item.product.priceCents,
      },
      quantity: item.quantity,
    })),
    customer_email: session.user.email ?? undefined,
    success_url: `${baseUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/checkout/cancel`,
    metadata: { orderId: order.id },
  });

  if (!checkoutSession.url) {
    return NextResponse.json({ error: "Could not start checkout." }, { status: 502 });
  }

  await prisma.order.update({
    where: { id: order.id },
    data: { stripeCheckoutSessionId: checkoutSession.id },
  });

  return NextResponse.redirect(checkoutSession.url, 303);
}
