import { BrandLinkButton } from "@/components/brand-link-button";
import { SaveButton } from "@/components/save-button";
import { ProductThumbnail } from "@/components/product-thumbnail";

type Product = {
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
};

export function ProductCard({
  product,
  isSaved = false,
}: {
  product: Product;
  isSaved?: boolean;
}) {
  return (
    <div className="flex flex-col bg-white border border-stone-200 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
      <ProductThumbnail category={product.category} imageUrl={product.imageUrl} name={product.name} />
      <div className="p-5 flex-1 flex flex-col">
        <p className="text-xs font-medium text-stone-400 uppercase tracking-wide mb-1">
          {product.brand}
        </p>
        <h3 className="font-semibold text-stone-900 mb-1">{product.name}</h3>
        <p className="text-sm text-stone-500 line-clamp-2 mb-3 flex-1">{product.description}</p>

        <div className="flex gap-3 text-xs text-stone-600 mb-3">
          <span className="rounded-full bg-brand-50 text-brand-700 px-2 py-1 font-medium">
            {product.proteinGrams}g protein
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-1 font-medium">
            {product.calories} cal
          </span>
          <span className="rounded-full bg-stone-100 px-2 py-1 font-medium">
            {product.servingSize}
          </span>
        </div>

        <p className="text-sm text-stone-500 mb-3">
          ~${(product.priceCents / 100).toFixed(2)}
        </p>

        <div className="flex gap-2">
          <BrandLinkButton
            productId={product.id}
            brand={product.brand}
            externalUrl={product.externalUrl}
          />
          <SaveButton productId={product.id} initialSaved={isSaved} />
        </div>
      </div>
    </div>
  );
}
