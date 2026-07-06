import { getCategoryVisual } from "@/lib/category-visuals";

type ProductThumbnailProps = {
  category: string;
  size?: "lg" | "sm";
};

export function ProductThumbnail({ category, size = "lg" }: ProductThumbnailProps) {
  const { emoji, gradient } = getCategoryVisual(category);

  const sizeClasses = size === "lg" ? "aspect-[4/3] text-6xl" : "size-14 shrink-0 text-2xl rounded-xl";

  return (
    <div
      role="img"
      aria-label={category}
      className={`flex items-center justify-center bg-gradient-to-br ${gradient} ${sizeClasses}`}
    >
      <span aria-hidden="true">{emoji}</span>
    </div>
  );
}
