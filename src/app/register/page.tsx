import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Sign up | LeanCart",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-semibold text-stone-900 mb-2">Create your account</h1>
      <p className="text-stone-500 mb-8">
        Sign up to save your cart and check out. Card details are entered later, at checkout,
        directly on Stripe&apos;s secure payment page.
      </p>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
