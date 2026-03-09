"use client"

import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern"

export function PageBackground() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    >
      <InteractiveGridPattern
        className="absolute inset-0 bg-transparent"
        cellSize={40}
        glowColor="rgba(0, 74, 173, 0.35)"
        borderColor="var(--grid-border)"
        useWindowMouse
      />
    </div>
  )
}
