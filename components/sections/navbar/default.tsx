"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Method", href: "#method" },
  { label: "Platform", href: "#platform" },
  { label: "Scoring", href: "#scoring" },
  { label: "FAQ", href: "#faq" },
];

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile sheet is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] max-w-[calc(1600px-4rem)] -translate-x-1/2 border border-white/10 bg-[#111112]/85 backdrop-blur-2xl lg:top-6 lg:w-[calc(98%-4rem)]",
        className,
      )}
    >
      <div className="flex w-full items-center justify-between px-4 py-3 lg:px-6">
        <a
          href="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
        >
          <img
            src="/logo_1.png"
            alt=""
            aria-hidden
            className="size-8 shrink-0 object-contain"
          />
          <span className="font-mono text-xs font-medium tracking-[0.14em] text-white uppercase">
            Blundell Analytics
          </span>
        </a>

        <nav className="hidden items-center gap-2 lg:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="btn-mono btn-ghost">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn-mono btn-primary hidden lg:block">
            Request a Report
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <div className="space-y-2 border-t border-white/10 bg-[#111112] px-4 pt-3 pb-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="btn-mono btn-ghost block w-full text-left"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="btn-mono btn-primary block w-full text-left"
          >
            Request a Report
          </a>
        </div>
      </div>
    </header>
  );
}
