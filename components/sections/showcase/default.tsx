"use client";

import { useState } from "react";
import { motion } from "framer-motion";

/** Add an entry here to put another dashboard view on the page. */
const VIEWS = [
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

/**
 * Ledger of every dashboard view: numbered label column on the left, the view
 * itself on the right, one hairline-ruled row each.
 */
export default function DashboardShowcase() {
  const [enlarged, setEnlarged] = useState<(typeof VIEWS)[number] | null>(null);

  return (
    <section id="platform" className="bg-ink relative z-10">
      <div className="rail rule-b py-12 lg:py-16">
        <p className="eyebrow mb-6">Transfer Intelligence</p>
        <h2 className="display-xl max-w-5xl text-white">
          One score. Every dimension.
        </h2>
      </div>

      {VIEWS.map((view, i) => (
        <motion.article
          key={view.screenshot}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 border-b border-white/10 lg:grid-cols-12"
        >
          <div
            className={`rail flex flex-col justify-center border-white/10 py-10 lg:col-span-4 lg:py-14 ${
              i % 2 === 1 ? "lg:order-2 lg:border-l" : "lg:border-r"
            }`}
          >
            <div className="mb-5 flex items-center gap-3">
              <span className="text-mark font-mono text-[11px] tracking-[0.14em]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="h-px w-8 bg-white/20" />
            </div>
            <h3 className="display-md mb-4 text-white">{view.label}</h3>
            <p className="max-w-md text-sm leading-relaxed text-neutral-400">
              {view.description}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setEnlarged(view)}
            aria-label={`Enlarge ${view.label} view`}
            className={`group relative flex cursor-zoom-in items-center justify-center overflow-hidden border-t border-white/10 bg-[#0e0e0f] p-5 lg:col-span-8 lg:border-t-0 lg:p-10 ${
              i % 2 === 1 ? "lg:order-1" : ""
            }`}
          >
            <img
              src={view.screenshot}
              alt={`${view.label} dashboard view`}
              className="block max-h-[320px] w-auto max-w-full border border-white/10 object-contain transition-transform duration-700 group-hover:scale-[1.015] lg:max-h-[400px]"
            />
          </button>
        </motion.article>
      ))}

      {enlarged && (
        <div
          role="presentation"
          onClick={() => setEnlarged(null)}
          className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-10"
        >
          <img
            src={enlarged.screenshot}
            alt={`${enlarged.label} dashboard view, enlarged`}
            className="max-h-[90vh] max-w-full border border-white/10 object-contain"
          />
        </div>
      )}
    </section>
  );
}
