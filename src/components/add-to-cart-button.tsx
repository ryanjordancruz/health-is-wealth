"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddToCartButton({ productId }: { productId: string }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "added" | "error">("idle");

  const handleClick = async () => {
    setStatus("loading");
    const response = await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity: 1 }),
    });

    if (response.status === 401) {
      router.push(`/login?callbackUrl=${encodeURIComponent("/shop")}`);
      return;
    }

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("added");
    router.refresh();
    setTimeout(() => setStatus("idle"), 1500);
  };

  return (
    <button
      onClick={handleClick}
      disabled={status === "loading"}
      className="w-full rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
    >
      {status === "loading" && "Adding..."}
      {status === "added" && "Added ✓"}
      {status === "error" && "Try again"}
      {status === "idle" && "Add to cart"}
    </button>
  );
}
