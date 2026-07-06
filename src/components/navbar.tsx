import Link from "next/link";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { SignOutButton } from "@/components/sign-out-button";

export async function Navbar() {
  const session = await auth();

  const cartCount = session?.user
    ? await prisma.cartItem.aggregate({
        where: { userId: session.user.id },
        _sum: { quantity: true },
      })
    : null;
  const itemCount = cartCount?._sum.quantity ?? 0;

  return (
    <header className="border-b border-stone-200 bg-background/95 backdrop-blur sticky top-0 z-50">
      <div className="mx-auto max-w-6xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-emerald-700 tracking-tight">
          LeanCart
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-700">
          <Link href="/shop" className="hover:text-emerald-600 transition-colors">
            Shop
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link href="/cart" className="relative hover:text-emerald-600 transition-colors">
            Cart
            {itemCount > 0 && (
              <span className="ml-1 inline-flex items-center justify-center rounded-full bg-emerald-600 px-2 py-0.5 text-xs font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
          {session?.user ? (
            <SignOutButton />
          ) : (
            <>
              <Link href="/login" className="hover:text-emerald-600 transition-colors">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-full bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500 transition-colors"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
