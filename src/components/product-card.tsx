"use client";

import { useState } from "react";
import { BrandLinkButton } from "@/components/brand-link-button";
import { SaveButton } from "@/components/save-button";
import { ProductThumbnail } from "@/components/product-thumbnail";

type ProductVariant = {
  id: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  priceCents: number;
  calories: number;
  proteinGrams: number;
  servingSize: string;
  externalUrl: string;
  imageUrl: string | null;
  flavorName: string | null;
};

export function ProductCard({
  variants,
  savedVariantIds = [],
}: {
  variants: ProductVariant[];
  savedVariantIds?: string[];
}) {
  const [activeId, setActiveId] = useState(variants[0].id);
  const active = variants.find((v) => v.id === activeId) ?? variants[0];

  return (
    <div className="flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <ProductThumbnail category={active.category} imageUrl={active.imageUrl} name={active.name} />
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-1">
          {active.brand}
        </p>
        <h3 className="font-semibold text-stone-900 mb-1">{active.name}</h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-3 flex-1">{active.description}</p>

        {variants.length > 1 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {variants.map((variant) => (
              <button
                key={variant.id}
                type="button"
                onClick={() => setActiveId(variant.id)}
                aria-pressed={variant.id === activeId}
                className={`rounded-full px-2.5 py-1 text-xs font-medium transition-colors ${
                  variant.id === activeId
                    ? "bg-brand-600 text-white"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {variant.flavorName ?? variant.name}
              </button>
            ))}
          </div>
        )}

        <div className="flex gap-3 text-xs text-stone-600 mb-3">
          <span className="rounded-full bg-brand-50 text-brand-700 px-2 py-1 font-medium">
            {active.proteinGrams}g protein
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-1 font-medium">
            {active.calories} cal
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-1 font-medium">
            {active.servingSize}
          </span>
        </div>

        <p className="text-sm text-stone-500 mb-3">
          ~${(active.priceCents / 100).toFixed(2)}
        </p>

        <div className="flex gap-2">
          {/* Remount on flavor change so SaveButton's local "saved" state
              re-initializes from this specific variant's saved status
              instead of carrying over the previously selected flavor's
              state (useState only reads its initial value once per
              mount). */}
          <BrandLinkButton
            key={active.id}
            productId={active.id}
            brand={active.brand}
            externalUrl={active.externalUrl}
          />
          <SaveButton
            key={active.id}
            productId={active.id}
            initialSaved={savedVariantIds.includes(active.id)}
          />
        </div>
      </div>
    </div>
  );
}
