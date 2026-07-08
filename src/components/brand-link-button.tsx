"use client";

export function BrandLinkButton({
  productId,
  brand,
  externalUrl,
}: {
  productId: string;
  brand: string;
  externalUrl: string;
}) {
  const recordView = () => {
    const payload = JSON.stringify({ productId });
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/views", new Blob([payload], { type: "application/json" }));
    } else {
      fetch("/api/views", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
        keepalive: true,
      });
    }
  };

  return (
    <a
      href={externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={recordView}
      className="flex-1 text-center rounded-full bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-500 transition-colors"
    >
      View on {brand}
    </a>
  );
}
