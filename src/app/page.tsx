import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-24 md:py-32">
      <div className="max-w-2xl">
        <span className="inline-block rounded-full bg-emerald-50 text-emerald-700 px-3 py-1 text-sm font-medium mb-6">
          High-protein. Low-calorie. Actually tasty.
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-6">
          Groceries built for your macros, not your cravings.
        </h1>
        <p className="text-lg text-stone-500 mb-8">
          LeanCart curates lean proteins, plant-based staples, and low-calorie snacks so hitting
          your nutrition goals doesn&apos;t mean giving up flavor. Browse the shop, build your
          cart, and check out securely with Stripe.
        </p>
        <div className="flex gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-emerald-600 px-6 py-3 font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            Browse the shop
          </Link>
          <Link
            href="/register"
            className="rounded-full border border-stone-300 px-6 py-3 font-medium text-stone-700 hover:border-emerald-400 hover:text-emerald-700 transition-colors"
          >
            Create an account
          </Link>
        </div>
      </div>
    </div>
  );
}
