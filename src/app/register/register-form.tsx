"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { registerSchema } from "@/lib/validation";

const formSchema = registerSchema
  .extend({ confirmPassword: z.string() })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

export function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(formSchema) });

  const onSubmit = async (values: FormValues) => {
    setFormError(null);

    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        password: values.password,
      }),
    });

    if (!response.ok) {
      const data = await response.json().catch(() => null);
      setFormError(data?.error ?? "Something went wrong. Please try again.");
      return;
    }

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (result?.error) {
      setFormError("Account created, but automatic login failed. Please log in.");
      router.push("/login");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
        <input
          autoComplete="name"
          {...register("name")}
          className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

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
          autoComplete="new-password"
          {...register("password")}
          className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.password && <p className="text-sm text-red-600 mt-1">{errors.password.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">Confirm password</label>
        <input
          type="password"
          autoComplete="new-password"
          {...register("confirmPassword")}
          className="w-full rounded-lg border border-stone-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
        {errors.confirmPassword && (
          <p className="text-sm text-red-600 mt-1">{errors.confirmPassword.message}</p>
        )}
      </div>

      <p className="text-xs text-stone-500">
        Payment details are collected securely by Stripe at checkout — we never see or store your
        card information.
      </p>

      {formError && <p className="text-sm text-red-600">{formError}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-emerald-600 px-4 py-2.5 text-white font-medium hover:bg-emerald-500 transition-colors disabled:opacity-50"
      >
        {isSubmitting ? "Creating account..." : "Sign up"}
      </button>

      <p className="text-sm text-stone-500 text-center">
        Already have an account?{" "}
        <Link href="/login" className="text-emerald-600 hover:underline">
          Log in
        </Link>
      </p>
    </form>
  );
}
