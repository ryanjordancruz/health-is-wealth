import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Shop | LeanCart",
  description: "Browse healthy, high-protein, low-calorie groceries.",
};

export default async function ShopPage() {
  const products = await prisma.product.findMany({
    where: { active: true },
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  const byCategory = new Map<string, typeof products>();
  for (const product of products) {
    const list = byCategory.get(product.category) ?? [];
    list.push(product);
    byCategory.set(product.category, list);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-12">
        <h1 className="text-4xl font-bold text-stone-900 mb-3">Shop</h1>
        <p className="text-lg text-stone-500">
          Healthy, high-protein, low-calorie groceries — browse by category below.
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-stone-500">No products available yet. Check back soon!</p>
        </div>
      ) : (
        Array.from(byCategory.entries()).map(([category, items]) => (
          <section key={category} className="mb-12">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{category}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
