import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";

export const metadata: Metadata = {
  title: "Shop | LeanCart",
  description: "Browse healthy, high-protein, low-calorie groceries.",
};

function buildShopHref(search: string, category: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category } = await searchParams;
  const activeSearch = search?.trim() ?? "";
  const activeCategory = category?.trim() ?? "";

  const [categoryRows, products] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      distinct: ["category"],
      select: { category: true },
      orderBy: { category: "asc" },
    }),
    prisma.product.findMany({
      where: {
        active: true,
        ...(activeCategory ? { category: activeCategory } : {}),
        ...(activeSearch
          ? {
              OR: [
                { name: { contains: activeSearch } },
                { description: { contains: activeSearch } },
                { category: { contains: activeSearch } },
              ],
            }
          : {}),
      },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
  ]);
  const categories = categoryRows.map((row) => row.category);

  const byCategory = new Map<string, typeof products>();
  for (const product of products) {
    const list = byCategory.get(product.category) ?? [];
    list.push(product);
    byCategory.set(product.category, list);
  }

  const hasFilters = activeSearch !== "" || activeCategory !== "";

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900 mb-3">Shop</h1>
        <p className="text-lg text-stone-500">
          Healthy, high-protein, low-calorie groceries and supplements — search or browse by
          category below.
        </p>
      </div>

      <form action="/shop" method="GET" className="mb-6">
        {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
        <div className="relative max-w-xl">
          <input
            type="search"
            name="search"
            defaultValue={activeSearch}
            placeholder="Search products, like 'protein powder' or 'spinach'..."
            className="w-full rounded-full border border-stone-200 bg-white px-5 py-3 pr-24 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 rounded-full bg-emerald-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-emerald-500 transition-colors"
          >
            Search
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 mb-12">
        <Link
          href={buildShopHref(activeSearch, "")}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
            activeCategory === ""
              ? "bg-emerald-600 text-white"
              : "bg-stone-100 text-stone-700 hover:bg-stone-200"
          }`}
        >
          All
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat}
            href={buildShopHref(activeSearch, cat)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              activeCategory === cat
                ? "bg-emerald-600 text-white"
                : "bg-stone-100 text-stone-700 hover:bg-stone-200"
            }`}
          >
            {cat}
          </Link>
        ))}
      </div>

      {hasFilters && (
        <div className="mb-8 flex items-center justify-between text-sm text-stone-500">
          <p>
            {products.length} result{products.length === 1 ? "" : "s"}
            {activeSearch && (
              <>
                {" "}
                for <span className="font-medium text-stone-700">&quot;{activeSearch}&quot;</span>
              </>
            )}
            {activeCategory && (
              <>
                {" "}
                in <span className="font-medium text-stone-700">{activeCategory}</span>
              </>
            )}
          </p>
          <Link href="/shop" className="text-emerald-600 hover:underline">
            Clear filters
          </Link>
        </div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-stone-500">
            {hasFilters
              ? "No products match your search. Try a different term or category."
              : "No products available yet. Check back soon!"}
          </p>
        </div>
      ) : (
        Array.from(byCategory.entries()).map(([cat, items]) => (
          <section key={cat} className="mb-12">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{cat}</h2>
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
