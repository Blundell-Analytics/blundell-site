"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface Panel {
  eyebrow: string;
  title: string;
  body: string;
  screenshot: string;
  readouts: { label: string; value: string }[];
}

const PANELS: Panel[] = [
  {
    eyebrow: "Transfer Scout",
    title: "Search the whole market.",
    body: "Filter every player in the database by position, age, risk band, market value and tactical fit score. Narrow eleven thousand candidates to a working shortlist in a single pass.",
    screenshot: "/dashboard-scout.png",
    readouts: [
      { label: "Filters", value: "24" },
      { label: "Leagues", value: "38" },
      { label: "Response", value: "< 1s" },
    ],
  },
  {
    eyebrow: "Player Detail",
    title: "Every dimension of a signing.",
    body: "Tactical assessment, injury history, performance trajectory, contract position and deal summary in one view — with the reasoning behind each objective score laid out beside it.",
    screenshot: "/dashboard-player.png",
    readouts: [
      { label: "Objectives", value: "5" },
      { label: "Features", value: "240" },
      { label: "History", value: "6 yrs" },
    ],
  },
  {
    eyebrow: "Pareto Analysis",
    title: "Find the value frontier.",
    body: "Targets plotted by tactical fit against business case, bubble size weighted by composite score. The frontier shows you which signings nobody else has priced correctly yet.",
    screenshot: "/dashboard-pareto.png",
    readouts: [
      { label: "Axes", value: "Fit × Cost" },
      { label: "Weighting", value: "Composite" },
      { label: "Export", value: "PDF / CSV" },
    ],
  },
];

export default function DashboardShowcase() {
  const [zoomed, setZoomed] = useState<Panel | null>(null);

  return (
    <section id="platform" className="bg-ink relative z-10 py-16 lg:py-24">
      <div className="shell px-0 lg:px-8">
        <div className="mb-10 px-6 lg:mb-14 lg:px-0">
          <p className="eyebrow mb-4">The Platform</p>
          <h2 className="display-lg max-w-2xl text-white">
            One score. Every dimension.
          </h2>
        </div>

        <div className="space-y-6 lg:space-y-8">
          {PANELS.map((panel, i) => (
            <motion.div
              key={panel.screenshot}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 bg-[#111112] lg:grid-cols-8"
            >
              {/* Copy — alternates side on desktop */}
              <div
                className={`flex items-center px-6 py-12 lg:col-span-3 lg:px-14 lg:py-16 ${
                  i % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                <div className="max-w-md">
                  <div className="mb-5 flex items-center gap-2.5">
                    <span className="bg-mark size-1.5" />
                    <span className="font-mono text-xs tracking-[0.16em] text-neutral-400 uppercase">
                      {panel.eyebrow}
                    </span>
                  </div>
                  <h3 className="display-md mb-5 text-white">{panel.title}</h3>
                  <p className="text-base leading-relaxed text-neutral-400">
                    {panel.body}
                  </p>

                  <div className="mt-8 grid grid-cols-3 gap-2.5 border-t border-white/20 pt-8">
                    {panel.readouts.map((r) => (
                      <div key={r.label} className="cell">
                        <div className="cell-label">{r.label}</div>
                        <div className="cell-value">{r.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              <button
                type="button"
                onClick={() => setZoomed(panel)}
                aria-label={`Enlarge ${panel.eyebrow} screenshot`}
                className={`group relative min-h-[280px] cursor-zoom-in overflow-hidden border-t border-white/10 bg-[#0e0e0f] lg:col-span-5 lg:min-h-[560px] lg:border-t-0 ${
                  i % 2 === 1 ? "lg:order-1 lg:border-r" : "lg:border-l"
                }`}
              >
                <img
                  src={panel.screenshot}
                  alt={`${panel.eyebrow} dashboard view`}
                  className="absolute inset-0 size-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.02]"
                />
                <span className="btn-mono absolute right-4 bottom-4 bg-black/70 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                  Enlarge
                </span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {zoomed && (
        <div
          className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-10"
          onClick={() => setZoomed(null)}
          role="presentation"
        >
          <img
            src={zoomed.screenshot}
            alt={`${zoomed.eyebrow} dashboard view, enlarged`}
            className="max-h-[88vh] max-w-full border border-white/10 object-contain"
          />
          <span className="btn-mono absolute bottom-8 left-1/2 -translate-x-1/2 text-neutral-500">
            Click anywhere to close
          </span>
        </div>
      )}
    </section>
  );
}
