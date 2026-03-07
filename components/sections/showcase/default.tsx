"use client";

import { useState } from "react";

import Glow from "@/components/ui/glow";
import { Mockup, MockupFrame } from "@/components/ui/mockup";

const TABS = [
  {
    label: "Transfer Scout",
    screenshot: "/dashboard-scout.png",
    description:
      "Filter 1,000+ players by position, risk, market value and tactical fit score across every major league.",
  },
  {
    label: "Player Detail",
    screenshot: "/dashboard-player.png",
    description:
      "Deep tactical assessment, injury history, performance trajectory and deal summary — all in one view.",
  },
  {
    label: "Pareto Analysis",
    screenshot: "/dashboard-pareto.png",
    description:
      "Identify best-value targets plotted by tactical fit vs. business case. Bubble size reflects overall fit score.",
  },
];

export default function DashboardShowcase() {
  const [active, setActive] = useState(0);

  return (
    <section className="w-full bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* Heading */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            The Platform
          </p>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-white/80"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Every decision, backed by data
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {TABS.map((tab, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              style={{ fontFamily: "var(--font-jakarta)" }}
              className={[
                "px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-150",
                i === active
                  ? "bg-blue-500/15 text-blue-300 border-blue-500/40"
                  : "text-white/40 border-white/10 hover:text-white/70 hover:border-white/20",
              ].join(" ")}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-center text-sm text-white/40 mb-10 max-w-lg mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {TABS[active].description}
        </p>

        {/* Mockup */}
        <div className="relative">
          <MockupFrame size="small">
            <Mockup type="responsive" className="w-full border-0 bg-zinc-950">
              {TABS.map((tab, i) => (
                <img
                  key={tab.screenshot}
                  src={tab.screenshot}
                  alt={tab.label}
                  className="w-full block"
                  style={{ display: i === active ? "block" : "none" }}
                />
              ))}
            </Mockup>
          </MockupFrame>
          <Glow variant="top" className="opacity-20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
