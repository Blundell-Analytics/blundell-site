export default function FooterSection() {
  return (
    <footer
      className="w-full relative z-10"
      style={{ fontFamily: "var(--font-jakarta)" }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 24px",
          borderTop: "1px solid var(--bg-card-border)",
          background: "var(--bg-card)",
        }}
      >
        <span style={{ fontSize: "11px", color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.15em" }}>
          All Rights Reserved. © 2026 Blundell Analytics.
        </span>
      </div>
    </footer>
  );
}
