/**
 * Faint technical grid, masked so it fades out toward the fold. Rendered as an
 * absolute layer inside the hero — every other section paints an opaque
 * background over it.
 */
export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--grid-border) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-border) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse 90% 65% at 50% 15%, #000 25%, transparent 78%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 65% at 50% 15%, #000 25%, transparent 78%)",
        }}
      />
      {/* Soft brand wash behind the headline */}
      <div
        className="absolute inset-x-0 top-0 h-[70vh]"
        style={{
          background:
            "radial-gradient(ellipse 55% 50% at 22% 25%, rgba(77,141,255,0.10), transparent 70%)",
        }}
      />
    </div>
  );
}
