import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { ProductCard } from "@/components/product-card";
import { ProductThumbnail } from "@/components/product-thumbnail";
import { BrandLinkButton } from "@/components/brand-link-button";
import { HeroProductReel } from "@/components/hero-product-reel";

export const metadata: Metadata = {
  title: "The Protein Pantry | Find Real High-Protein Snacks",
  description:
    "Find your next favorite high-protein, low-calorie snack — from real brands you can trust.",
};

function buildShopHref(search: string, category: string) {
  const params = new URLSearchParams();
  if (search) params.set("search", search);
  if (category) params.set("category", category);
  const qs = params.toString();
  return qs ? `/?${qs}` : "/";
}

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const { search, category } = await searchParams;
  const activeSearch = search?.trim() ?? "";
  const activeCategory = category?.trim() ?? "";
  const hasFilters = activeSearch !== "" || activeCategory !== "";

  const session = await auth();

  const [allProducts, savedRows, recentlyViewed] = await Promise.all([
    prisma.product.findMany({
      where: { active: true },
      orderBy: [{ category: "asc" }, { name: "asc" }],
    }),
    session?.user
      ? prisma.savedItem.findMany({
          where: { userId: session.user.id },
          select: { productId: true },
        })
      : Promise.resolve([]),
    session?.user && !hasFilters
      ? prisma.viewedItem.findMany({
          where: { userId: session.user.id },
          include: { product: true },
          orderBy: { viewedAt: "desc" },
          take: 10,
        })
      : Promise.resolve([]),
  ]);
  const savedIds = new Set(savedRows.map((row) => row.productId));
  const categories = [...new Set(allProducts.map((p) => p.category))].sort();

  // Group flavor variants of the same product line into one family — a
  // sibling's familyId points at its primary variant's own id, and the
  // primary itself has no familyId, so `familyId ?? id` always resolves to
  // the primary's id as the grouping key regardless of which row it is.
  const families = new Map<string, typeof allProducts>();
  for (const product of allProducts) {
    const key = product.familyId ?? product.id;
    const list = families.get(key) ?? [];
    list.push(product);
    families.set(key, list);
  }
  for (const variants of families.values()) {
    variants.sort((a, b) => {
      const aPrimary = (a.familyId ?? a.id) === a.id;
      const bPrimary = (b.familyId ?? b.id) === b.id;
      if (aPrimary !== bPrimary) return aPrimary ? -1 : 1;
      return (a.flavorName ?? a.name).localeCompare(b.flavorName ?? b.name);
    });
  }

  // Sampled from every family's primary photo (not the filtered/searched
  // set) so the hero reel always represents the full catalog, regardless of
  // the current search or category filter.
  const reelImages = [...families.values()]
    .map((variants) => variants[0].imageUrl)
    .filter((url): url is string => !!url);

  const query = activeSearch.toLowerCase();
  const matchingFamilies = [...families.values()].filter((variants) => {
    if (activeCategory && variants[0].category !== activeCategory) return false;
    if (!query) return true;
    return variants.some((v) =>
      [v.name, v.description, v.category, v.brand, v.flavorName ?? ""]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  });

  const byCategory = new Map<string, (typeof allProducts)[]>();
  for (const family of matchingFamilies) {
    const cat = family[0].category;
    const list = byCategory.get(cat) ?? [];
    list.push(family);
    byCategory.set(cat, list);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <div className="relative overflow-hidden rounded-3xl px-6 py-12 sm:px-10 sm:py-16 mb-12">
        <HeroProductReel images={reelImages} />

        <div className="relative">
          <div className="mb-8 max-w-2xl">
            <span className="inline-block rounded-full bg-white text-brand-700 shadow-sm px-3 py-1 text-sm font-medium mb-4">
              High-protein. Low-calorie. Real brands.
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight mb-3">
              Find your next favorite high-protein snack.
            </h1>
            <p className="text-lg text-stone-500">
              The Protein Pantry curates high-protein, low-calorie snacks from real brands —
              search or browse by category below, and we&apos;ll point you to where to buy it.
            </p>
          </div>

          <form action="/" method="GET" className="mb-6">
            {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
            <div className="relative max-w-xl">
              <input
                type="search"
                name="search"
                defaultValue={activeSearch}
                placeholder="Search products, like 'protein powder' or 'spinach'..."
                className="w-full rounded-full border border-stone-200 bg-white px-5 py-3 pr-24 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1.5 rounded-full bg-brand-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
              >
                Search
              </button>
            </div>
          </form>

          <div className="flex flex-wrap gap-2">
            <Link
              href={buildShopHref(activeSearch, "")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                activeCategory === ""
                  ? "bg-brand-600 text-white"
                  : "bg-white text-stone-700 shadow-sm hover:bg-stone-100"
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
                    ? "bg-brand-600 text-white"
                    : "bg-white text-stone-700 shadow-sm hover:bg-stone-100"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {recentlyViewed.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-stone-900 mb-4">Recently viewed</h2>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {recentlyViewed.map(({ product }) => (
              <div
                key={product.id}
                className="flex items-center gap-3 bg-white border border-stone-200 rounded-2xl p-3 shrink-0 w-72"
              >
                <ProductThumbnail
                  category={product.category}
                  imageUrl={product.imageUrl}
                  name={product.name}
                  size="sm"
                />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-stone-400 uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <p className="font-semibold text-stone-900 truncate text-sm">{product.name}</p>
                </div>
                <BrandLinkButton
                  productId={product.id}
                  brand={product.brand}
                  externalUrl={product.externalUrl}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {hasFilters && (
        <div className="mb-8 flex items-center justify-between text-sm text-stone-500">
          <p>
            {matchingFamilies.length} result{matchingFamilies.length === 1 ? "" : "s"}
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
          <Link href="/" className="text-brand-600 hover:underline">
            Clear filters
          </Link>
        </div>
      )}

      {matchingFamilies.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-stone-500">
            {hasFilters
              ? "No products match your search. Try a different term or category."
              : "No products available yet. Check back soon!"}
          </p>
        </div>
      ) : (
        Array.from(byCategory.entries()).map(([cat, families]) => (
          <section key={cat} className="mb-12">
            <h2 className="text-xl font-semibold text-stone-900 mb-4">{cat}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {families.map((variants) => (
                <ProductCard
                  key={variants[0].id}
                  variants={variants}
                  savedVariantIds={variants.map((v) => v.id).filter((id) => savedIds.has(id))}
                />
              ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
}
