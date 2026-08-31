"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  to: number;
  /** Rendered after the number, e.g. a plus sign. */
  suffix?: string;
  durationMs?: number;
  className?: string;
}

/** Ease-out so the number decelerates into its final value. */
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

export default function CountUp({
  to,
  suffix = "",
  durationMs = 1800,
  className = "",
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(to);
        return;
      }

      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / durationMs);
        setValue(Math.round(easeOut(t) * to));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    // Already on screen at mount (short pages, deep links) — start immediately.
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      run();
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to, durationMs]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {value.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}
