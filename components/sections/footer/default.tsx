"use client";

import { siteConfig } from "@/config/site";
import { handleAnchorClick } from "@/lib/scroll-to";
import { AnimatedWave } from "@/components/ui/animated-wave";

const SECTIONS = [
  { label: "About", href: "#about" },
  { label: "Platform", href: "#platform" },
  { label: "Team", href: "#team" },
  { label: "Questions", href: "#faq" },
];

export default function FooterSection() {
  return (
    <footer className="bg-band rule-t relative z-10">
      <div className="rail flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between lg:py-12">
        <a href="/" className="flex shrink-0 items-center gap-2.5">
          <img
            src="/logo-mark.png"
            alt=""
            aria-hidden
            className="h-6 w-auto object-contain"
          />
          <span className="text-fg font-mono text-[11px] font-medium tracking-[0.16em] uppercase">
            Blundell Analytics
          </span>
        </a>

        <nav className="flex flex-wrap items-center gap-x-8 gap-y-2">
          {SECTIONS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="text-fg-3 hover:text-fg text-sm transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href={siteConfig.links.email}
          className="text-fg-3 hover:text-fg shrink-0 text-sm transition-colors"
        >
          info@blundellanalytics.ca
        </a>
      </div>

      <div className="rule-t h-16 w-full lg:h-20">
        <AnimatedWave
          preset="Custom"
          barCount={8}
          amplitude={7}
          frequency={0.35}
          speed={1.2}
          waveShape="Soft"
          barSpacing={2}
          colorMode="Solid"
          barColor="var(--mark)"
          backgroundColor="transparent"
          fadeEdges
          interactionStrength={1.3}
        />
      </div>

      <div className="rail rule-t py-5">
        <span className="text-fg-4 font-mono text-[10px] tracking-[0.16em] uppercase">
          © 2026 Blundell Analytics. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
