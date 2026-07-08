"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function SaveButton({
  productId,
  initialSaved,
}: {
  productId: string;
  initialSaved: boolean;
}) {
  const router = useRouter();
  const [saved, setSaved] = useState(initialSaved);
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true);
    const nextSaved = !saved;
    setSaved(nextSaved);

    const response = await fetch(nextSaved ? "/api/saved" : `/api/saved/${productId}`, {
      method: nextSaved ? "POST" : "DELETE",
      headers: nextSaved ? { "Content-Type": "application/json" } : undefined,
      body: nextSaved ? JSON.stringify({ productId }) : undefined,
    });

    if (response.status === 401) {
      router.push(`/login?callbackUrl=${encodeURIComponent("/")}`);
      return;
    }

    if (!response.ok) {
      setSaved(!nextSaved);
    } else {
      router.refresh();
    }

    setLoading(false);
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save this product"}
      className={`flex items-center justify-center size-10 shrink-0 rounded-full border transition-colors disabled:opacity-50 ${
        saved
          ? "border-brand-600 bg-brand-50 text-brand-600"
          : "border-stone-200 bg-white text-stone-400 hover:text-brand-600 hover:border-brand-300"
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth={2}
        className="size-5"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21s-6.716-4.35-9.428-8.24C.94 10.02 1.5 6.5 4.5 5.09 6.99 3.92 9.5 5 12 7.5c2.5-2.5 5.01-3.58 7.5-2.41 3 1.41 3.56 4.93 1.928 7.67C18.716 16.65 12 21 12 21z"
        />
      </svg>
    </button>
  );
}
