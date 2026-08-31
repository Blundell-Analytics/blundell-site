export default function FooterSection() {
  return (
    <footer className="bg-ink rule-t relative z-10">
      <div className="rail flex flex-col gap-4 py-7 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo-mark.png"
            alt=""
            aria-hidden
            className="h-6 w-auto object-contain"
          />
          <span className="font-mono text-[11px] tracking-[0.16em] text-neutral-500 uppercase">
            Blundell Analytics
          </span>
        </div>
        <span className="font-mono text-[10px] tracking-[0.16em] text-neutral-600 uppercase">
          All Rights Reserved. © 2026 Blundell Analytics.
        </span>
      </div>
    </footer>
  );
}
