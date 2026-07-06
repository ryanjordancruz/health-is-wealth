export const categoryVisuals: Record<string, { emoji: string; gradient: string }> = {
  "Proteins & Meat": { emoji: "🥩", gradient: "from-rose-50 to-rose-100" },
  "Dairy & Eggs": { emoji: "🥛", gradient: "from-sky-50 to-sky-100" },
  "Plant-Based Protein": { emoji: "🌱", gradient: "from-lime-50 to-lime-100" },
  Produce: { emoji: "🥦", gradient: "from-emerald-50 to-emerald-100" },
  "Pantry & Grains": { emoji: "🌾", gradient: "from-amber-50 to-amber-100" },
  "Snacks & Bars": { emoji: "🍪", gradient: "from-orange-50 to-orange-100" },
  Beverages: { emoji: "🥤", gradient: "from-cyan-50 to-cyan-100" },
  "Vitamins & Supplements": { emoji: "💊", gradient: "from-violet-50 to-violet-100" },
  "Superfoods & Powders": { emoji: "✨", gradient: "from-teal-50 to-teal-100" },
};

const fallbackVisual = { emoji: "🛒", gradient: "from-stone-50 to-stone-100" };

export function getCategoryVisual(category: string) {
  return categoryVisuals[category] ?? fallbackVisual;
}
