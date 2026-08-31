"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const VIEWS = [
  {
    label: "Transfer Scout",
    screenshot: "/dashboard-scout.png",
    caption:
      "Filter 1,000+ players by position, risk, market value and tactical fit score across every major league.",
    reads: "Search the market",
  },
  {
    label: "Player Detail",
    screenshot: "/dashboard-player.png",
    caption:
      "Deep tactical assessment, injury history, performance trajectory and deal summary — all in one view.",
    reads: "Assess a target",
  },
  {
    label: "Pareto Analysis",
    screenshot: "/dashboard-pareto.png",
    caption:
      "Identify best-value targets plotted by tactical fit vs. business case. Bubble size reflects overall fit score.",
    reads: "Find the value",
  },
];

/**
 * The dashboard shown as an application: a tab strip and a framed window,
 * rather than three screenshots floating in a well.
 */
export default function DashboardShowcase() {
  const [active, setActive] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const view = VIEWS[active];

  return (
    <section id="platform" className="bg-ink relative z-10">
      <div className="rail rule-t rule-b py-14 lg:py-16">
        <p className="eyebrow mb-6">The Platform</p>
        <h2 className="display-lg text-fg max-w-2xl">
          One score. Every dimension.
        </h2>
        <p className="text-fg-3 mt-6 max-w-xl text-base leading-relaxed">
          Every engagement comes with the working platform behind it, not just a
          document. Three views, one ranked list, and the reasoning attached to
          each name on it.
        </p>
      </div>

      {/* Tab strip */}
      <div
        role="tablist"
        aria-label="Dashboard views"
        className="rule-b grid grid-cols-1 sm:grid-cols-3"
      >
        {VIEWS.map((v, i) => {
          const selected = i === active;
          return (
            <button
              key={v.label}
              role="tab"
              aria-selected={selected}
              onClick={() => setActive(i)}
              className={`group border-hairline relative cursor-pointer px-6 py-5 text-left transition-colors lg:px-10 2xl:px-16 ${
                i > 0 ? "border-t sm:border-t-0 sm:border-l" : ""
              } ${selected ? "bg-[var(--cell-bg)]" : "hover:bg-[var(--cell-bg)]"}`}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span
                  className={`size-1.5 transition-colors ${
                    selected ? "bg-mark" : "bg-[var(--hairline-strong)]"
                  }`}
                />
                <span className="text-fg-4 font-mono text-[10px] tracking-[0.16em] uppercase">
                  {String(i + 1).padStart(2, "0")} — {v.reads}
                </span>
              </div>
              <span
                className={`display-md block transition-colors ${
                  selected ? "text-fg" : "text-fg-4 group-hover:text-fg-2"
                }`}
              >
                {v.label}
              </span>
              {selected && (
                <motion.span
                  layoutId="tab-underline"
                  className="bg-mark absolute inset-x-0 bottom-0 h-px"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Application window */}
      <div className="rail py-10 lg:py-14">
        <div className="border-hairline bg-panel border">
          <div className="border-hairline flex items-center justify-between gap-4 border-b px-4 py-3">
            <div className="flex items-center gap-2.5">
              <span className="bg-mark size-1.5 shrink-0" />
              <span className="text-fg-3 truncate font-mono text-[10px] tracking-[0.16em] uppercase">
                {view.label}
              </span>
            </div>
            <span className="text-fg-4 shrink-0 font-mono text-[10px] tracking-[0.16em] uppercase">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(VIEWS.length).padStart(2, "0")}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setEnlarged(true)}
            aria-label={`Enlarge the ${view.label} view`}
            className="bg-well relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={view.screenshot}
                src={view.screenshot}
                alt={`${view.label} dashboard view`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 size-full object-cover object-top"
              />
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Caption */}
      <div className="rail rule-t grid grid-cols-1 gap-4 py-8 lg:grid-cols-12 lg:gap-10">
        <p className="eyebrow lg:col-span-4 lg:pt-1">Reading this view</p>
        <p className="text-fg-3 max-w-2xl text-base leading-relaxed lg:col-span-8">
          {view.caption}
        </p>
      </div>

      {enlarged && (
        <div
          role="presentation"
          onClick={() => setEnlarged(false)}
          className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/90 p-4 backdrop-blur-sm sm:p-10"
        >
          <img
            src={view.screenshot}
            alt={`${view.label} dashboard view, enlarged`}
            className="border-hairline max-h-[90vh] max-w-full border object-contain"
          />
        </div>
      )}
    </section>
  );
}
