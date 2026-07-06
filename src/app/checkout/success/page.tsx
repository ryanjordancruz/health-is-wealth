import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { ProductThumbnail } from "@/components/product-thumbnail";

export const metadata: Metadata = {
  title: "Order confirmed | LeanCart",
};

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const session = await auth();
  if (!session?.user) {
    redirect("/login");
  }

  const { session_id: sessionId } = await searchParams;

  // Scoped to both the Stripe session id AND the logged-in user's own id —
  // never trust session_id alone, or a guessed/leaked value could be used
  // to view another customer's order confirmation.
  const order = sessionId
    ? await prisma.order.findFirst({
        where: { stripeCheckoutSessionId: sessionId, userId: session.user.id },
        include: { items: { include: { product: true } } },
      })
    : null;

  if (!order) {
    return (
      <div className="mx-auto max-w-lg px-6 py-24 text-center">
        <h1 className="text-3xl font-bold text-stone-900 mb-3">Order not found</h1>
        <p className="text-stone-500 mb-8">
          We couldn&apos;t find that order. If you just checked out, check your account or try
          again.
        </p>
        <Link href="/" className="text-emerald-600 hover:underline">
          Back to shop
        </Link>
      </div>
    );
  }

  const isPaid = order.status === "PAID";

  return (
    <div className="mx-auto max-w-2xl px-6 py-24">
      <h1 className="text-3xl font-bold text-stone-900 mb-3">
        {isPaid ? "Thanks for your order!" : "Order received"}
      </h1>
      <p className="text-stone-500 mb-8">
        {isPaid
          ? "Your payment was successful and your order is confirmed."
          : "We're confirming your payment now — this usually only takes a moment."}
      </p>

      <div className="bg-white border border-stone-200 rounded-2xl px-6">
        {order.items.map((item) => (
          <div key={item.id} className="flex items-center justify-between py-4 border-b border-stone-200 last:border-b-0">
            <div className="flex items-center gap-4">
              <ProductThumbnail category={item.product.category} size="sm" />
              <div>
                <p className="font-medium text-stone-900">{item.product.name}</p>
                <p className="text-sm text-stone-500">Qty {item.quantity}</p>
              </div>
            </div>
            <p className="font-medium text-stone-900">
              ${((item.priceCents * item.quantity) / 100).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <span className="text-lg font-medium text-stone-900">Total</span>
        <span className="text-lg font-bold text-emerald-700">
          ${(order.totalCents / 100).toFixed(2)}
        </span>
      </div>

      <Link href="/" className="inline-block mt-10 text-emerald-600 hover:underline">
        Continue shopping
      </Link>
    </div>
  );
}
