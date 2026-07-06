const SCATTERED_ITEMS = [
  { emoji: "🥦", top: "8%", left: "4%", size: "text-7xl", rotate: "-rotate-12" },
  { emoji: "🍎", top: "62%", left: "8%", size: "text-6xl", rotate: "rotate-6" },
  { emoji: "🥑", top: "20%", left: "18%", size: "text-6xl", rotate: "rotate-12" },
  { emoji: "🍫", top: "75%", left: "20%", size: "text-6xl", rotate: "-rotate-6" },
  { emoji: "🥕", top: "10%", left: "34%", size: "text-6xl", rotate: "rotate-3" },
  { emoji: "🍓", top: "55%", left: "40%", size: "text-7xl", rotate: "-rotate-12" },
  { emoji: "🥩", top: "80%", left: "48%", size: "text-6xl", rotate: "rotate-6" },
  { emoji: "🌾", top: "15%", left: "56%", size: "text-6xl", rotate: "-rotate-3" },
  { emoji: "🥛", top: "65%", left: "62%", size: "text-6xl", rotate: "rotate-12" },
  { emoji: "🍪", top: "8%", left: "70%", size: "text-6xl", rotate: "rotate-6" },
  { emoji: "🥜", top: "40%", left: "76%", size: "text-6xl", rotate: "-rotate-6" },
  { emoji: "🥤", top: "78%", left: "80%", size: "text-6xl", rotate: "rotate-3" },
  { emoji: "🥬", top: "22%", left: "88%", size: "text-7xl", rotate: "-rotate-12" },
  { emoji: "💊", top: "58%", left: "92%", size: "text-6xl", rotate: "rotate-6" },
  { emoji: "🌱", top: "5%", left: "48%", size: "text-6xl", rotate: "-rotate-6" },
];

export function HeroFoodBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {SCATTERED_ITEMS.map((item, index) => (
        <span
          key={index}
          className={`absolute opacity-[0.14] ${item.size} ${item.rotate}`}
          style={{ top: item.top, left: item.left }}
        >
          {item.emoji}
        </span>
      ))}
    </div>
  );
}
