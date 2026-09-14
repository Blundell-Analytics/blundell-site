"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

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
      "Tactical assessment, injury history, performance trend, and the deal itself, all on one page.",
    reads: "Assess a target",
  },
  {
    label: "Pareto Analysis",
    screenshot: "/dashboard-pareto.png",
    caption:
      "The best-value targets, plotted by tactical fit against business case. Bubble size is overall fit.",
    reads: "Find the value",
  },
];

/**
 * Tab list on the left, framed window on the right — switching views updates
 * the screenshot in place, so both stay in view together instead of one
 * scrolling out from under the other.
 */
export default function DashboardShowcase() {
  const [active, setActive] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const view = VIEWS[active];

  // Only the active tab's screenshot is mounted, so preload the other two on
  // mount rather than leaving them to fetch on first click.
  useEffect(() => {
    VIEWS.forEach((v) => {
      const img = new Image();
      img.src = v.screenshot;
    });
  }, []);

  return (
    <section id="platform" className="bg-ink relative z-10">
      <SectionHeader
        label="The platform"
        title="One score. Every dimension."
        lead="Every engagement comes with the dashboard itself, not just a PDF. Filter the market, open a player, and see why they're ranked where they are."
      />

      <div className="rail grid grid-cols-1 gap-8 py-11 md:grid-cols-12 lg:gap-14 lg:py-14">
        {/* Tab list */}
        <div
          role="tablist"
          aria-label="Dashboard views"
          className="md:col-span-4"
        >
          <ol className="flex flex-col">
            {VIEWS.map((v, i) => {
              const selected = i === active;
              return (
                <li key={v.label}>
                  <button
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(i)}
                    className="group -mx-3 w-full cursor-pointer px-3 py-5 text-left transition-colors hover:bg-[var(--cell-bg)]"
                  >
                    <div className="mb-1.5 flex items-center gap-2.5">
                      <span
                        className={`size-1.5 shrink-0 transition-colors ${
                          selected ? "bg-mark" : "bg-[var(--hairline-strong)]"
                        }`}
                      />
                      <span className="text-fg-4 font-mono text-[10px] tracking-[0.16em] uppercase">
                        {String(i + 1).padStart(2, "0")} · {v.reads}
                      </span>
                    </div>
                    <span
                      className={`display-md block transition-colors ${
                        selected ? "text-fg" : "text-fg-4 group-hover:text-fg-2"
                      }`}
                    >
                      {v.label}
                    </span>

                    <AnimatePresence initial={false}>
                      {selected && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="text-fg-3 overflow-hidden text-sm leading-relaxed"
                        >
                          <span className="block pt-3">{v.caption}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {/* Application window */}
        <div className="md:col-span-8">
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
