"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";

interface HighlightTextProps {
  children: React.ReactNode;
  delay?: number;
}

export function HighlightText({ children, delay = 0 }: HighlightTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <span
      ref={ref}
      style={{
        backgroundImage: "linear-gradient(to right, var(--highlight-color) 100%, transparent 0%)",
        backgroundSize: inView ? "100% 26%" : "0% 26%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "0 58%",
        transition: `background-size 0.65s cubic-bezier(0.25, 1, 0.5, 1) ${delay}s`,
        fontWeight: 500,
        color: "var(--fg-medium)",
      }}
    >
      {children}
    </span>
  );
}
