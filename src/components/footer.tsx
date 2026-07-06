export function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-20">
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-stone-500 flex items-center justify-between">
        <p>© {new Date().getFullYear()} LeanCart. A portfolio project — not a real store.</p>
        <p>Payments securely processed by Stripe.</p>
      </div>
    </footer>
  );
}
