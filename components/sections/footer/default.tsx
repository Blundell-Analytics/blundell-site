import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FooterSection() {
  return (
    <footer className="w-full bg-black flex items-center justify-center gap-3 px-6 py-8 relative z-10 border-t border-white/5" style={{ fontFamily: "var(--font-jakarta)" }}>
      <span className="text-[10px] text-white/40 uppercase tracking-widest">
        All Rights Reserved. © 2026 Blundell Analytics.
      </span>
      <a
        href={siteConfig.links.email}
        className="text-white/40 hover:text-blue-400 transition-colors"
        aria-label="Email us"
      >
        <Mail className="size-3.5" />
      </a>
    </footer>
  );
}
