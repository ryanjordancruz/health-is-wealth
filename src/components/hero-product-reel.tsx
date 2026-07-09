// Purely decorative background strip — duplicated once so the CSS animation
// (translateX 0 -> -50%, see .animate-scroll-x in globals.css) loops
// seamlessly without a visible jump.
export function HeroProductReel({ images }: { images: string[] }) {
  if (images.length === 0) return null;

  const looped = [...images, ...images];

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="flex h-full w-max animate-scroll-x gap-4 py-6">
        {looped.map((src, index) => (
          <div
            key={index}
            className="relative h-full aspect-square shrink-0 rounded-2xl overflow-hidden bg-brand-50"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative reel tiled from ~50 brand CDN domains, not worth a remotePatterns allowlist (see product-thumbnail.tsx) */}
            <img src={src} alt="" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50/60 via-white/80 to-white/95" />
    </div>
  );
}
