export function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-stone-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} The Protein Pantry.</p>
        <p>We link out to real brands — we don&apos;t sell anything ourselves.</p>
      </div>
    </footer>
  );
}
