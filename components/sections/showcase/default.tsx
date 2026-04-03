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
            className="text-sm uppercase tracking-[0.15em] mb-3"
            style={{ fontFamily: "var(--font-jakarta)", color: "#004aad", fontWeight: 500 }}
          >
            Transfer Intelligence
          </p>
          <h2
            style={{
              fontFamily: "var(--font-jakarta)",
              fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
              fontWeight: 600,
              color: "var(--foreground)",
              lineHeight: 1.15,
            }}
          >
            One score. Every dimension.
          </h2>
        </div>

        {/* Pill tabs */}
        <div
          className="flex justify-center mb-6"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          <div
            className="inline-flex p-1 rounded-full text-sm gap-1"
            style={{ background: "var(--bg-card)", border: "1px solid var(--bg-card-border)" }}
          >
            {TABS.map((tab, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="relative cursor-pointer rounded-full py-2 px-6 font-medium transition-colors duration-200 z-10"
                style={{ color: active === i ? "#fff" : "var(--fg-muted)" }}
              >
                {active === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "#004aad" }}
                    transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Description */}
        <p
          className="text-center text-sm mb-10 mx-auto leading-relaxed"
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
          className="relative"
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
