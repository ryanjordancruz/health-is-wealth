import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { getCartForUser } from "@/lib/cart";
import { CartItemRow } from "@/components/cart-item-row";

export const metadata: Metadata = {
  title: "Your cart | LeanCart",
};

export default async function CartPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/login?callbackUrl=/cart");
  }

  // Always scoped to the logged-in user's own id, never a client-supplied
  // one, so a customer can only ever see their own cart.
  const { items, subtotalCents } = await getCartForUser(session.user.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-bold text-stone-900 mb-8">Your cart</h1>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-stone-500 mb-6">Your cart is empty.</p>
          <Link
            href="/"
            className="rounded-full bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            Browse the shop
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-white border border-stone-200 rounded-2xl px-6">
            {items.map((item) => (
              <CartItemRow
                key={item.productId}
                productId={item.productId}
                name={item.product.name}
                category={item.product.category}
                priceCents={item.product.priceCents}
                quantity={item.quantity}
                servingSize={item.product.servingSize}
              />
            ))}
          </div>

          <div className="flex items-center justify-between mt-6 mb-8">
            <span className="text-lg font-medium text-stone-900">Subtotal</span>
            <span className="text-lg font-bold text-emerald-700">
              ${(subtotalCents / 100).toFixed(2)}
            </span>
          </div>

          <form action="/api/checkout" method="POST">
            <button
              type="submit"
              className="w-full rounded-full bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500 transition-colors"
            >
              Checkout securely with Stripe
            </button>
          </form>
        </>
      )}
    </div>
  );
}
