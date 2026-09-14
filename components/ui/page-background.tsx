"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

// InteractiveGridPattern fades this color's own alpha channel with a regex
// (see interactive-grid-pattern.tsx), so it needs a literal rgba() string it
// can parse — a "var(--glow)" reference doesn't match and silently breaks
// the proximity fade. Kept in sync with --glow in app/globals.css.
const GLOW = {
  light: "rgba(29, 78, 216, 0.18)",
  dark: "rgba(77, 141, 255, 0.22)",
};

/**
 * Hero backdrop: the interactive grid, which lights the cell under the cursor
 * and softly warms its neighbours. Absolute so it fills the hero — every other
 * section paints an opaque background over it.
 */
export function PageBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const glow = mounted && resolvedTheme === "light" ? GLOW.light : GLOW.dark;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <InteractiveGridPattern
        className="absolute inset-0 bg-transparent"
        cellSize={44}
        glowColor={glow}
        borderColor="var(--grid-border)"
        proximity={55}
        useWindowMouse
      />
      {/* Dissolve the grid before the hero's bottom edge so it does not end on
          a row of half-cut cells. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[var(--ink)]" />
    </div>
  );
}
