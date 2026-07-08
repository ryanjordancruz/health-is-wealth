export const categoryVisuals: Record<string, { emoji: string; gradient: string }> = {
  "Snack Bars": { emoji: "🍫", gradient: "from-amber-50 to-amber-100" },
  "Protein Snacks": { emoji: "🍪", gradient: "from-orange-50 to-orange-100" },
  Jerky: { emoji: "🥩", gradient: "from-rose-50 to-rose-100" },
  "Shakes & Protein Powders": { emoji: "🥤", gradient: "from-cyan-50 to-cyan-100" },
  "Vitamins & Supplements": { emoji: "💊", gradient: "from-violet-50 to-violet-100" },
  "Superfoods & Powders": { emoji: "✨", gradient: "from-teal-50 to-teal-100" },
};

const fallbackVisual = { emoji: "🛒", gradient: "from-stone-50 to-stone-100" };

export function getCategoryVisual(category: string) {
  return categoryVisuals[category] ?? fallbackVisual;
}
