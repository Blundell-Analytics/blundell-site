import { siteConfig } from "@/config/site";

const COLUMNS = [
  {
    heading: "Product",
    links: [
      { label: "Transfer Scout", href: "#platform" },
      { label: "Player Detail", href: "#platform" },
      { label: "Pareto Analysis", href: "#platform" },
    ],
  },
  {
    heading: "Method",
    links: [
      { label: "Precision Scoring", href: "#method" },
      { label: "Composite Score", href: "#scoring" },
      { label: "FAQ", href: "#faq" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Request a Report", href: "#contact" },
      { label: "Email Us", href: siteConfig.links.email },
    ],
  },
];

export default function FooterSection() {
  return (
    <footer className="bg-ink relative z-10 border-t border-white/10">
      <div className="shell px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <img
                src="/logo_1.png"
                alt=""
                aria-hidden
                className="size-8 object-contain"
              />
              <span className="font-mono text-xs font-medium tracking-[0.14em] text-white uppercase">
                Blundell Analytics
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-neutral-500">
              Quantitative football transfer intelligence. Built for clubs that
              treat recruitment as capital allocation.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <nav key={col.heading}>
              <p className="eyebrow mb-5">{col.heading}</p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-neutral-400 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono text-[11px] tracking-[0.12em] text-neutral-500 uppercase">
            © {new Date().getFullYear()} Blundell Analytics. All rights
            reserved.
          </span>
          <span className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.12em] text-neutral-500 uppercase">
            <span className="pulse-mark size-1.5 bg-green-500" />
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  );
}
