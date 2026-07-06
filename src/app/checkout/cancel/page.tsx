import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Checkout cancelled | LeanCart",
};

export default function CheckoutCancelPage() {
  return (
    <div className="mx-auto max-w-lg px-6 py-24 text-center">
      <h1 className="text-3xl font-bold text-stone-900 mb-3">Checkout cancelled</h1>
      <p className="text-stone-500 mb-8">
        No charge was made. Your cart is still saved whenever you&apos;re ready.
      </p>
      <Link
        href="/cart"
        className="rounded-full bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500 transition-colors"
      >
        Back to cart
      </Link>
    </div>
  );
}
