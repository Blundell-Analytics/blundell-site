"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { PageBackground } from "@/components/ui/page-background";

/** Sample composite-score readouts cycled through the hero telemetry panel. */
const READOUTS = [
  {
    slot: "Target No. 07",
    position: "Left-sided CB",
    league: "Eredivisie",
    fit: "8.4",
    value: "€12.4m",
    risk: "Low",
    age: "22.3",
    verdict: "SHORTLIST",
  },
  {
    slot: "Target No. 12",
    position: "Ball-carrying No. 8",
    league: "Liga Portugal",
    fit: "7.9",
    value: "€8.1m",
    risk: "Medium",
    age: "24.1",
    verdict: "MONITOR",
  },
  {
    slot: "Target No. 21",
    position: "Inverted RW",
    league: "Championship",
    fit: "9.1",
    value: "€19.0m",
    risk: "Low",
    age: "21.7",
    verdict: "PRIORITY",
  },
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((i) => (i + 1) % READOUTS.length),
      3800,
    );
    return () => clearInterval(id);
  }, []);

  const r = READOUTS[index];

  return (
    <section className="bg-ink relative flex w-full flex-col justify-end overflow-hidden pt-32 pb-16 lg:min-h-screen lg:pt-44 lg:pb-20">
      <PageBackground />
      {/* Vignette so the grid fades into the next section */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-40 bg-gradient-to-b from-transparent to-[#0a0a0a]" />

      <div className="shell relative z-10 grid grid-cols-1 items-end gap-14 px-4 lg:grid-cols-12 lg:gap-10 lg:px-8">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="mb-6 flex items-center gap-2.5">
            <span className="bg-mark pulse-mark size-2" />
            <span className="eyebrow">Quantitative Transfer Intelligence</span>
          </div>

          <h1 className="display-xl mb-7 max-w-4xl text-white">
            Recruitment is capital allocation.
          </h1>

          <p className="max-w-lg text-base leading-relaxed text-neutral-300 md:text-lg">
            Five objectives, one composite score. We model every candidate on
            tactical fit, performance trajectory, risk, availability and price —
            then hand you a ranked, defensible shortlist.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#contact" className="btn-mono btn-primary">
              Request a Report
            </a>
            <a href="#platform" className="btn-mono btn-ghost">
              See the Platform
            </a>
          </div>
        </motion.div>

        {/* Telemetry readout — the live-scoring panel */}
        <motion.aside
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-full border border-white/10 bg-[#111112]/60 p-5 backdrop-blur-[100px] lg:col-span-5 lg:ml-auto lg:max-w-[400px]"
        >
          <div className="mb-4 flex items-center gap-2 border-b border-white/10 pb-3">
            <span className="bg-mark pulse-mark size-2" />
            <span className="font-mono text-[10px] tracking-[0.12em] text-neutral-400 uppercase">
              Composite Score — Live
            </span>
          </div>

          <div key={index} className="animate-appear space-y-2.5">
            <div className="cell flex items-center justify-between">
              <div>
                <div className="cell-label">Candidate</div>
                <div className="cell-value">{r.slot}</div>
              </div>
              <span className="font-mono text-[10px] tracking-[0.1em] text-neutral-500 uppercase">
                {r.verdict}
              </span>
            </div>

            <div className="cell">
              <div className="cell-label">Profile</div>
              <div className="cell-value">{r.position}</div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="cell">
                <div className="cell-label">Fit score</div>
                <div className="cell-value">{r.fit} / 10</div>
              </div>
              <div className="cell">
                <div className="cell-label">Market value</div>
                <div className="cell-value">{r.value}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="cell">
                <div className="cell-label">Risk</div>
                <div className="cell-value">{r.risk}</div>
              </div>
              <div className="cell">
                <div className="cell-label">Age</div>
                <div className="cell-value">{r.age}</div>
              </div>
              <div className="cell bg-white/[0.08]">
                <div className="cell-label">League</div>
                <div className="cell-value truncate text-[11px]">
                  {r.league}
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
