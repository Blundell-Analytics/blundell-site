"use client";

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";

/**
 * Hero backdrop: the interactive grid, which lights the cell under the cursor
 * and softly warms its neighbours. Absolute so it fills the hero — every other
 * section paints an opaque background over it.
 */
export function PageBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
      <InteractiveGridPattern
        className="absolute inset-0 bg-transparent"
        cellSize={44}
        glowColor="rgba(77, 141, 255, 0.35)"
        borderColor="var(--grid-border)"
        proximity={120}
        useWindowMouse
      />
      {/* Dissolve the grid before the hero's bottom edge so it does not end on
          a row of half-cut cells. */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
    </div>
  );
}
