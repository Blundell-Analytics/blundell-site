import { Mail } from "lucide-react";
import { siteConfig } from "@/config/site";

export default function FooterSection() {
  return (
    <footer
      className="w-full relative z-10"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      {/* Footer content */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "12px",
          padding: "24px 24px",
          borderTop: "1px solid var(--bg-card-border)",
        }}
      >
        <span style={{ fontSize: "11px", color: "var(--fg-medium)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
          All Rights Reserved. © 2026 Blundell Analytics.
        </span>
        <a
          href={siteConfig.links.email}
          className="hover:text-[#004aad] transition-colors"
          aria-label="Email us"
          style={{ color: "var(--fg-medium)" }}
        >
          <Mail className="size-3.5" />
        </a>
      </div>
    </footer>
  );
}
