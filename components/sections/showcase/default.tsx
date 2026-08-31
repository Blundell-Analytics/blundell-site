"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
 * Numbered index rail on the left selects the view rendered in the viewport on
 * the right, with a hairline rule dividing the two.
 */
export default function DashboardShowcase() {
  const [active, setActive] = useState(0);
  const [enlarged, setEnlarged] = useState(false);
  const view = VIEWS[active];

  return (
    <section id="platform" className="bg-ink relative z-10">
      <div className="rail rule-b py-6">
        <div className="flex items-center gap-2.5">
          <span className="bg-mark size-1.5" />
          <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase">
            01 — Transfer Intelligence
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Index rail */}
        <div className="rail border-white/10 py-12 lg:col-span-4 lg:border-r lg:py-20">
          <h2 className="display-lg mb-12 max-w-sm text-white lg:mb-16">
            One score. Every dimension.
          </h2>

          <ul className="border-t border-white/10">
            {VIEWS.map((v, i) => {
              const isActive = i === active;
              return (
                <li key={v.label} className="border-b border-white/10">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-current={isActive}
                    className="group w-full cursor-pointer py-6 text-left transition-colors"
                  >
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`font-mono text-[11px] tracking-[0.14em] transition-colors ${
                          isActive ? "text-mark" : "text-neutral-600"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`display-md flex-1 transition-colors ${
                          isActive
                            ? "text-white"
                            : "text-neutral-500 group-hover:text-neutral-300"
                        }`}
                      >
                        {v.label}
                      </span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isActive && (
                        <motion.p
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className="overflow-hidden pl-10 text-sm leading-relaxed text-neutral-400"
                        >
                          <span className="block pt-4">{v.description}</span>
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Viewport */}
        <div className="relative min-h-[260px] border-t border-white/10 sm:min-h-[380px] lg:col-span-8 lg:min-h-0 lg:border-t-0">
          <button
            type="button"
            onClick={() => setEnlarged(true)}
            aria-label={`Enlarge ${view.label} view`}
            className="group absolute inset-0 w-full cursor-zoom-in overflow-hidden bg-[#0e0e0f]"
          >
            {VIEWS.map((v, i) => (
              <img
                key={v.screenshot}
                src={v.screenshot}
                alt={`${v.label} dashboard view`}
                className={`absolute inset-0 size-full object-contain object-center transition-opacity duration-500 ${
                  i === active ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            <span className="btn-mono absolute right-4 bottom-4 bg-black/75 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
              Click to enlarge
            </span>
          </button>
        </div>
      </div>

      {enlarged && (
        <div
          role="presentation"
          onClick={() => setEnlarged(false)}
          className="fixed inset-0 z-[60] flex cursor-zoom-out items-center justify-center bg-black/92 p-4 backdrop-blur-sm sm:p-10"
        >
          <img
            src={view.screenshot}
            alt={`${view.label} dashboard view, enlarged`}
            className="max-h-[88vh] max-w-full border border-white/10 object-contain"
          />
        </div>
      )}
    </section>
  );
}
