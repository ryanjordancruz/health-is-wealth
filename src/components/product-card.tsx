import { AddToCartButton } from "@/components/add-to-cart-button";
import { ProductThumbnail } from "@/components/product-thumbnail";

type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  priceCents: number;
  calories: number;
  proteinGrams: number;
  servingSize: string;
};

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <ProductThumbnail category={product.category} />
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-semibold text-stone-900 mb-1">{product.name}</h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-3 flex-1">{product.description}</p>

        <div className="flex gap-3 text-xs text-stone-600 mb-3">
          <span className="rounded-full bg-emerald-50 text-emerald-700 px-2 py-1 font-medium">
            {product.proteinGrams}g protein
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-1 font-medium">
            {product.calories} cal
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-1 font-medium">
            {product.servingSize}
          </span>
        </div>

        <p className="font-semibold text-emerald-700 mb-3">
          ${(product.priceCents / 100).toFixed(2)}
        </p>

        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}
