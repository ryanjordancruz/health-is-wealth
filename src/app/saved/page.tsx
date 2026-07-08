import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { requireSession } from "@/lib/authz";
import { getSavedForUser } from "@/lib/saved";
import { ProductThumbnail } from "@/components/product-thumbnail";
import { BrandLinkButton } from "@/components/brand-link-button";
import { SaveButton } from "@/components/save-button";

export const metadata: Metadata = {
  title: "Saved | The Protein Pantry",
};

export default async function SavedPage() {
  const session = await requireSession();
  if (!session) {
    redirect("/login?callbackUrl=/saved");
  }

  const { items } = await getSavedForUser(session.user.id);

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-3xl font-semibold text-stone-900 mb-2">Saved products</h1>
      <p className="text-stone-500 mb-8">
        Products you&apos;ve saved to come back to later.
      </p>

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-stone-500 mb-4">You haven&apos;t saved anything yet.</p>
          <Link href="/" className="text-brand-600 hover:underline">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(({ product }) => (
            <div
              key={product.id}
              className="flex items-center gap-4 bg-white border border-stone-200 rounded-2xl p-4"
            >
              <ProductThumbnail
                category={product.category}
                imageUrl={product.imageUrl}
                name={product.name}
                size="sm"
              />
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                  {product.brand}
                  {!product.active && (
                    <span className="ml-2 rounded-full bg-stone-100 px-2 py-0.5 text-stone-500 normal-case tracking-normal">
                      No longer listed
                    </span>
                  )}
                </p>
                <p className="font-semibold text-stone-900 truncate">{product.name}</p>
                <p className="text-sm text-stone-500">
                  {product.proteinGrams}g protein &middot; {product.calories} cal &middot;{" "}
                  {product.servingSize}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <BrandLinkButton
                  productId={product.id}
                  brand={product.brand}
                  externalUrl={product.externalUrl}
                />
                <SaveButton productId={product.id} initialSaved />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
