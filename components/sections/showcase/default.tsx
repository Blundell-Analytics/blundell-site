"use client";

import { useState } from "react";
import { motion } from "framer-motion";

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
  const [isEnlarged, setIsEnlarged] = useState(false);

  return (
    <section
      className="relative w-full py-24 px-6 overflow-hidden"
      style={{ zIndex: 1 }}
    >
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] uppercase tracking-[0.2em] mb-3"
            style={{ fontFamily: "var(--font-jakarta)", color: "#004aad" }}
          >
            Transfer Intelligence
          </p>
          <h2
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 600,
              color: "var(--fg-medium)",
            }}
          >
            One score. Every dimension.
          </h2>
        </div>

        {/* Tab buttons */}
        <div className="flex justify-center gap-2 mb-6 flex-wrap">
          {TABS.map((tab, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              style={{
                fontFamily: "var(--font-jakarta)",
                background: i === active ? "rgba(0, 74, 173, 0.12)" : "var(--bg-card)",
                color: i === active ? "#004aad" : "var(--fg-muted)",
                borderColor: i === active ? "rgba(0, 74, 173, 0.4)" : "var(--bg-card-border)",
              }}
              className="px-5 py-2 rounded-lg text-sm font-medium border transition-all duration-200 backdrop-blur-md hover:opacity-80"
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Description */}
        <p
          className="text-center text-sm mb-10 max-w-lg mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-jakarta)", color: "var(--fg-muted)" }}
        >
          {TABS[active].description}
        </p>

        {/* Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative max-w-4xl mx-auto"
        >
          <button
            type="button"
            className="w-full text-left transition-transform duration-300 hover:scale-[1.02] cursor-zoom-in group"
            onClick={() => setIsEnlarged(true)}
          >
            <div className="absolute inset-0 z-10 hidden group-hover:flex items-center justify-center bg-black/20 rounded-xl transition-all">
              <span className="bg-black/60 text-white text-sm px-4 py-2 rounded-full backdrop-blur-md border border-white/10">Click to enlarge</span>
            </div>
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
          </button>
        </motion.div>

        {/* Modal for enlarged image */}
        {isEnlarged && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 sm:p-8 cursor-zoom-out backdrop-blur-sm transition-opacity"
            onClick={() => setIsEnlarged(false)}
          >
            <div className="relative max-w-[95vw] max-h-[95vh] w-full flex justify-center">
              <img
                src={TABS[active].screenshot}
                alt={TABS[active].label}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl border border-white/10"
              />
              <p className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/50 text-sm">Click anywhere to close</p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
