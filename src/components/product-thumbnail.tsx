"use client";

import { useState } from "react";
import { getCategoryVisual } from "@/lib/category-visuals";

type ProductThumbnailProps = {
  category: string;
  imageUrl?: string | null;
  name?: string;
  size?: "lg" | "sm";
};

export function ProductThumbnail({ category, imageUrl, name, size = "lg" }: ProductThumbnailProps) {
  const [imageFailed, setImageFailed] = useState(false);
  const { emoji, gradient } = getCategoryVisual(category);

  const boxSizeClasses = size === "lg" ? "aspect-[4/3]" : "size-14 shrink-0 rounded-xl";

  if (imageUrl && !imageFailed) {
    return (
      // Hotlinked photos come from arbitrary brand domains; next/image
      // would need every brand's CDN allow-listed in remotePatterns,
      // which doesn't scale for a growing affiliate catalog.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl}
        alt={name ?? category}
        onError={() => setImageFailed(true)}
        className={`object-cover bg-stone-100 ${boxSizeClasses}`}
      />
    );
  }

  const emojiSizeClasses = size === "lg" ? "text-6xl" : "text-2xl";

  return (
    <div
      role="img"
      aria-label={name ?? category}
      className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${boxSizeClasses}`}
    >
      <span aria-hidden="true" className={emojiSizeClasses}>
        {emoji}
      </span>
    </div>
  );
}
