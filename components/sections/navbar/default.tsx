"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { handleAnchorClick } from "@/lib/scroll-to";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Platform", href: "#platform" },
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
        "fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#0a0a0a]/92 backdrop-blur-xl",
        className,
      )}
    >
      <div className="flex h-14 items-stretch lg:h-16">
        <a
          href="/"
          className="flex items-center gap-2.5 border-r border-white/10 px-6 transition-colors hover:bg-white/5 lg:px-10 2xl:px-16"
        >
          <img
            src="/logo-mark.png"
            alt=""
            aria-hidden
            className="h-7 w-auto shrink-0 object-contain lg:h-8"
          />
          <span className="font-mono text-xs font-medium tracking-[0.16em] text-white uppercase">
            Blundell Analytics
          </span>
        </a>

        <div className="hidden flex-1 items-center px-8 lg:flex">
          <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-600 uppercase">
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
              className="flex items-center border-l border-white/10 px-6 font-mono text-[11px] tracking-[0.14em] text-neutral-300 uppercase transition-colors hover:bg-white/5 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          onClick={(e) => handleAnchorClick(e, "#contact")}
          className="hidden items-center border-l border-white/10 bg-white px-7 font-mono text-[11px] tracking-[0.14em] text-black uppercase transition-colors hover:bg-neutral-200 lg:flex"
        >
          Request a Report
        </a>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="flex items-center border-l border-white/10 px-5 text-white transition-colors hover:bg-white/5 lg:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden bg-[#0a0a0a] transition-all duration-300 ease-in-out lg:hidden",
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
            className="block border-t border-white/10 px-6 py-4 font-mono text-[11px] tracking-[0.14em] text-neutral-300 uppercase"
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
          className="block border-t border-white/10 bg-white px-6 py-4 font-mono text-[11px] tracking-[0.14em] text-black uppercase"
        >
          Request a Report
        </a>
      </div>
    </header>
  );
}
