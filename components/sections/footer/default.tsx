"use client";

import { siteConfig } from "@/config/site";
import { handleAnchorClick } from "@/lib/scroll-to";

const LINKS = [
  { label: "Platform", href: "#platform" },
  { label: "Contact", href: "#contact" },
];

export default function FooterSection() {
  return (
    <footer className="bg-ink rule-t relative z-10">
      <div className="rail grid grid-cols-1 gap-12 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
        <div className="lg:col-span-5">
          <div className="mb-6 flex items-center gap-2.5">
            <img
              src="/logo-mark.png"
              alt=""
              aria-hidden
              className="h-7 w-auto object-contain"
            />
            <span className="font-mono text-[11px] font-medium tracking-[0.16em] text-white uppercase">
              Blundell Analytics
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-neutral-400">
            {siteConfig.description}
          </p>
        </div>

        <nav className="lg:col-span-3 lg:col-start-8">
          <p className="eyebrow mb-5">Navigate</p>
          <ul className="space-y-3">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  className="text-sm text-neutral-400 transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-2">
          <p className="eyebrow mb-5">Enquiries</p>
          <a
            href={siteConfig.links.email}
            className="block text-sm break-all text-neutral-400 transition-colors hover:text-white"
          >
            info@blundellanalytics.ca
          </a>
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, "#contact")}
            className="btn-mono btn-ghost mt-6 inline-block"
          >
            Request a Report
          </a>
        </div>
      </div>

      <div className="rail rule-t flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-mono text-[10px] tracking-[0.16em] text-neutral-600 uppercase">
          All Rights Reserved. © 2026 Blundell Analytics.
        </span>
        <span className="font-mono text-[10px] tracking-[0.16em] text-neutral-600 uppercase">
          Responses within 48 hours
        </span>
      </div>
    </footer>
  );
}
