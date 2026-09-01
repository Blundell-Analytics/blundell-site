"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import ThemeToggle from "@/components/ui/theme-toggle";
import { handleAnchorClick } from "@/lib/scroll-to";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Platform", href: "#platform" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  className?: string;
}

/**
 * Full-bleed instrument bar: flush to the viewport edges, divided into cells by
 * hairline rules, with the call to action occupying the final cell.
 */
export default function Navbar({ className }: NavbarProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "border-hairline bg-ink/92 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex h-14 items-stretch lg:h-16">
        <a
          href="/"
          className="border-hairline flex items-center gap-2.5 border-r px-6 transition-colors hover:bg-[var(--btn-ghost-bg)] lg:px-10 2xl:px-16"
        >
          <img
            src="/logo-mark.png"
            alt=""
            aria-hidden
            className="h-7 w-auto shrink-0 object-contain"
          />
          <span className="text-fg font-mono text-xs font-medium tracking-[0.16em] uppercase">
            Blundell Analytics
          </span>
        </a>

        <div className="hidden flex-1 items-center px-8 lg:flex">
          <span className="text-fg-4 font-mono text-[10px] tracking-[0.18em] uppercase">
            Quantitative Football Transfer Intelligence
          </span>
        </div>
        <div className="flex-1 lg:hidden" />

        <nav className="hidden items-stretch lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleAnchorClick(e, link.href)}
              className="border-hairline text-fg-2 hover:text-fg flex items-center border-l px-6 font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:bg-[var(--btn-ghost-bg)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <ThemeToggle className="border-hairline w-12 shrink-0 border-l" />

        <a
          href="#contact"
          onClick={(e) => handleAnchorClick(e, "#contact")}
          className="btn-primary border-hairline hidden items-center border-l px-7 font-mono text-[11px] tracking-[0.14em] uppercase lg:flex"
        >
          Request a Report
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="border-hairline text-fg flex items-center border-l px-5 transition-colors hover:bg-[var(--btn-ghost-bg)] lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "bg-ink overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(e) => {
              setOpen(false);
              handleAnchorClick(e, link.href);
            }}
            className="border-hairline text-fg-2 block border-t px-6 py-4 font-mono text-[11px] tracking-[0.14em] uppercase"
          >
            {link.label}
          </a>
        ))}
        <a
          href="#contact"
          onClick={(e) => {
            setOpen(false);
            handleAnchorClick(e, "#contact");
          }}
          className="btn-primary border-hairline block border-t px-6 py-4 font-mono text-[11px] tracking-[0.14em] uppercase"
        >
          Request a Report
        </a>
      </div>
    </header>
  );
}
