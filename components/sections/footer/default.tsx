"use client";

import { siteConfig } from "@/config/site";
import { handleAnchorClick } from "@/lib/scroll-to";

const SECTIONS = [
  { label: "About", href: "#about" },
  { label: "How we work", href: "#process" },
  { label: "Platform", href: "#platform" },
  { label: "Team", href: "#team" },
  { label: "Questions", href: "#faq" },
];

export default function FooterSection() {
  return (
    <footer className="bg-ink rule-t relative z-10">
      <div className="overflow-hidden">
        <div className="rail grid grid-cols-1 gap-10 py-14 lg:grid-cols-12 lg:gap-10 lg:py-16">
          <div className="lg:col-span-5">
            <div className="mb-5 flex items-center gap-2.5">
              <img
                src="/logo-mark.png"
                alt=""
                aria-hidden
                className="h-7 w-auto object-contain"
              />
              <span className="text-fg font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
                Blundell Analytics
              </span>
            </div>
            <p className="text-fg-3 max-w-sm text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>

          <nav className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow mb-5">Sections</p>
            <ul className="space-y-2.5">
              {SECTIONS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleAnchorClick(e, link.href)}
                    className="text-fg-3 hover:text-fg text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3 lg:col-start-10">
            <p className="eyebrow mb-5">Get in touch</p>
            <a
              href={siteConfig.links.email}
              className="text-fg-3 hover:text-fg block text-sm break-all transition-colors"
            >
              info@blundellanalytics.ca
            </a>
            <p className="text-fg-4 mt-3 text-sm leading-relaxed">
              We reply within 48 hours with scope, timeline and price.
            </p>
          </div>
        </div>

        {/* Watermark, closing the footer out beneath the columns. */}
        <p
          aria-hidden
          className="rail -mb-[0.18em] leading-[0.8] font-medium tracking-[-0.03em] whitespace-nowrap select-none"
          style={{
            fontFamily: "var(--font-inter-tight), sans-serif",
            color: "var(--watermark)",
            fontSize: "clamp(3rem, 11vw, 11rem)",
          }}
        >
          Blundell Analytics
        </p>
      </div>

      <div className="rail rule-t flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between sm:pr-14">
        <span className="text-fg-4 font-mono text-[10px] tracking-[0.16em] uppercase">
          All Rights Reserved. © 2026 Blundell Analytics.
        </span>
        <span className="text-fg-4 font-mono text-[10px] tracking-[0.16em] uppercase">
          Quantitative Football Transfer Intelligence
        </span>
      </div>
    </footer>
  );
}
