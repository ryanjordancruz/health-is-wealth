"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ProductThumbnail } from "@/components/product-thumbnail";

type CartItemRowProps = {
  productId: string;
  name: string;
  category: string;
  priceCents: number;
  quantity: number;
  servingSize: string;
};

export function CartItemRow({
  productId,
  name,
  category,
  priceCents,
  quantity,
  servingSize,
}: CartItemRowProps) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const updateQuantity = (nextQuantity: number) => {
    if (nextQuantity < 1) return;
    setLocalQuantity(nextQuantity);
    startTransition(async () => {
      await fetch(`/api/cart/${productId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quantity: nextQuantity }),
      });
      router.refresh();
    });
  };

  const removeItem = () => {
    startTransition(async () => {
      await fetch(`/api/cart/${productId}`, { method: "DELETE" });
      router.refresh();
    });
  };

  return (
    <div className="flex items-center justify-between gap-4 py-4 border-b border-stone-200">
      <div className="flex items-center gap-4">
        <ProductThumbnail category={category} size="sm" />
        <div>
          <p className="font-medium text-stone-900">{name}</p>
          <p className="text-sm text-stone-500">
            {servingSize} · ${(priceCents / 100).toFixed(2)} each
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center border border-stone-300 rounded-full overflow-hidden">
          <button
            type="button"
            disabled={pending}
            onClick={() => updateQuantity(localQuantity - 1)}
            className="px-3 py-1 text-stone-600 hover:bg-stone-100 disabled:opacity-50"
          >
            −
          </button>
          <span className="px-3 text-sm font-medium">{localQuantity}</span>
          <button
            type="button"
            disabled={pending}
            onClick={() => updateQuantity(localQuantity + 1)}
            className="px-3 py-1 text-stone-600 hover:bg-stone-100 disabled:opacity-50"
          >
            +
          </button>
        </div>

        <p className="w-20 text-right font-medium text-stone-900">
          ${((priceCents * localQuantity) / 100).toFixed(2)}
        </p>

        <button
          type="button"
          disabled={pending}
          onClick={removeItem}
          className="text-sm text-stone-400 hover:text-red-600 transition-colors disabled:opacity-50"
        >
          Remove
        </button>
      </div>
    </div>
  );
}
