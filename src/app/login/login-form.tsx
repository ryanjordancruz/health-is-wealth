"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginSchema } from "@/lib/validation";
import type { z } from "zod";

type FormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);
    const result = await signIn("credentials", {
      ...values,
      redirect: false,
    });

    if (result?.error) {
      setFormError("Invalid email or password.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Email</label>
        <input
          type="email"
          autoComplete="email"
          {...register("email")}
          className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.email && <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Password</label>
        <input
          type="password"
          autoComplete="current-password"
          {...register("password")}
          className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-emerald-600 px-4 py-2.5 text-white font-medium hover:bg-emerald-500 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Logging in..." : "Log in"}
      </button>

      <p className="text-sm text-stone-500 text-center">
        Don&apos;t have an account?{" "}
        <Link href="/register" className="text-emerald-600 hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
