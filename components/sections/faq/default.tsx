"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ITEMS = [
  {
    q: "What exactly do we receive?",
    a: "A written report and an accompanying dashboard. The report covers the brief, the modelling approach, a ranked shortlist with a composite score per candidate, and a tactical and financial case for the top targets. The dashboard lets your staff re-run the filters themselves.",
  },
  {
    q: "How is the composite score built?",
    a: "Each candidate is scored on five objectives — tactical fit, trajectory, risk, availability and value — from roughly 240 features per player. The objectives are weighted to your brief, then combined into a single comparable number. Every component score is shown, so nothing is a black box.",
  },
  {
    q: "Which leagues and players are covered?",
    a: "38 competitions and just over 11,400 players, with six seasons of history where the underlying data supports it. If a specific market matters to you and is not covered, tell us in the brief and we will confirm feasibility before any work starts.",
  },
  {
    q: "How long does an engagement take?",
    a: "A first shortlist against a defined brief typically lands within two weeks. A single-position deep dive is faster. We respond to every enquiry within 48 hours with scope, timeline and price before committing you to anything.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-ink relative z-10 py-16 lg:py-24">
      <div className="shell px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <p className="eyebrow mb-4">FAQ</p>
          <h2 className="display-lg max-w-2xl text-white">
            The questions clubs ask first.
          </h2>
        </div>

        <div className="border-t border-white/10">
          {ITEMS.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className="border-b border-white/10">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full cursor-pointer items-start gap-6 py-7 text-left transition-colors hover:bg-white/[0.02]"
                >
                  <span className="mt-1 font-mono text-xs text-neutral-500">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="display-md flex-1 text-lg text-white md:text-2xl">
                    {item.q}
                  </span>
                  <span
                    aria-hidden
                    className={`mt-1 font-mono text-xl leading-none text-neutral-400 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-3xl pb-8 text-sm leading-relaxed text-neutral-400 md:pl-[3.25rem] md:text-base">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
