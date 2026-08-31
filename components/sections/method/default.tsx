"use client";

import { useEffect, useState } from "react";

const BULLETS = [
  "Every candidate scored on the same five objectives",
  "Tactical fit modelled against your system, not a generic average",
  "Injury, minutes and trajectory risk priced into the score",
  "Market value benchmarked against comparable transactions",
];

const STATS = [
  { label: "Players modelled", value: "11,400+" },
  { label: "Leagues covered", value: "38" },
  { label: "Features per player", value: "240" },
];

/** Deterministic pseudo-random weights so server and client render the same grid. */
const CELLS = Array.from({ length: 12 * 8 }, (_, i) => {
  const n = Math.sin(i * 12.9898) * 43758.5453;
  return n - Math.floor(n);
});

export default function Method() {
  const [lit, setLit] = useState(-1);

  useEffect(() => {
    const id = setInterval(() => setLit(Math.floor(Math.random() * 96)), 700);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="method" className="bg-ink relative z-10 py-16 lg:py-24">
      <div className="shell px-0 lg:px-8">
        <div className="grid grid-cols-1 bg-[#111112] lg:grid-cols-8">
          {/* Copy */}
          <div className="flex items-center px-6 py-14 lg:col-span-3 lg:py-20 lg:pr-12 lg:pl-16">
            <div className="max-w-lg">
              <p className="eyebrow mb-6">Precision Scoring</p>
              <h2 className="display-md mb-6 text-white">
                A thousand hours of scouting, priced into one number.
              </h2>
              <p className="text-base leading-relaxed text-neutral-300">
                Traditional scouting sees a handful of matches. We evaluate
                every minute a player has featured — then compress it into one
                comparable score your board can actually argue with.
              </p>

              <div className="mt-10 border-t border-white/20 pt-8">
                <div className="mb-5 flex items-center gap-3">
                  <span className="bg-mark size-1.5" />
                  <span className="font-mono text-xs tracking-[0.16em] text-neutral-400 uppercase">
                    What goes in
                  </span>
                </div>
                <ul className="space-y-2.5 text-sm leading-relaxed text-neutral-300">
                  {BULLETS.map((b) => (
                    <li key={b}>• {b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Coverage matrix */}
          <div className="relative min-h-[420px] overflow-hidden border-t border-white/10 bg-[#0e0e0f] lg:col-span-5 lg:min-h-[640px] lg:border-t-0 lg:border-l">
            <div className="absolute inset-0 grid grid-cols-12 grid-rows-8 gap-px p-px">
              {CELLS.map((w, i) => (
                <div
                  key={i}
                  className="transition-colors duration-700"
                  style={{
                    background:
                      i === lit
                        ? "var(--mark)"
                        : `rgba(255,255,255,${(w * 0.05).toFixed(3)})`,
                  }}
                />
              ))}
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-6 lg:p-10">
              <p className="eyebrow mb-3">Coverage</p>
              <p className="display-md mb-4 text-white">
                Every minute, scored.
              </p>
              <div className="grid max-w-xl grid-cols-3 gap-2.5">
                {STATS.map((s) => (
                  <div key={s.label} className="cell">
                    <div className="cell-label">{s.label}</div>
                    <div className="cell-value">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
