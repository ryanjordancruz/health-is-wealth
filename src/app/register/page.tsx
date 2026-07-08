import type { Metadata } from "next";
import { Suspense } from "react";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Sign up | The Protein Pantry",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-md px-6 py-20">
      <h1 className="text-3xl font-semibold text-stone-900 mb-2">Create your account</h1>
      <p className="text-stone-500 mb-8">
        Sign up to save products you like and keep track of what you&apos;ve viewed.
      </p>
      <Suspense>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
