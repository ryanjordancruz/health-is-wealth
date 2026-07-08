"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-stone-700 hover:text-brand-600 transition-colors"
    >
      Sign out
    </button>
  );
}
