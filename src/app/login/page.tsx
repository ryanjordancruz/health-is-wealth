import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
  title: "Log in | The Protein Pantry",
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-semibold text-stone-900 mb-2">Welcome back</h1>
      <p className="text-stone-500 mb-8">Log in to view your saved products.</p>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
