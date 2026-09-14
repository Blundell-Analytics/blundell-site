"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

/** Company-level questions only — nothing about how the modelling works. */
const ITEMS = [
  {
    q: "What do we actually receive?",
    a: "A list of names in order, weighed against the brief you gave us and written in plain English, not for a data scientist. You also get the dashboard itself, so your own staff can rerun the filters and check our work.",
  },
  {
    q: "Which leagues and seasons do you cover?",
    a: "37 leagues, with squad histories going back to 2015. If a market you care about isn't already in there, say so in the brief and we'll confirm it's feasible before any work starts.",
  },
  {
    q: "Is our brief confidential?",
    a: "Yes. What you're looking for, what you can spend, and who you're considering doesn't leave this building. We won't use your name as a reference without asking first.",
  },
  {
    q: "How do we start?",
    a: "Fill in the form below. We reply within 48 hours with scope, timeline, and price, so you know what you're getting before you commit to anything.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-band relative z-10">
      <SectionHeader label="Questions" title="What clubs ask us first." />

      <div className="rail divide-hairline divide-y">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full cursor-pointer items-start gap-6 py-6 text-left transition-colors hover:bg-[var(--cell-bg)]"
              >
                <span className="display-md text-fg flex-1">{item.q}</span>
                <span
                  aria-hidden
                  className={`text-fg-4 mt-1 font-mono text-lg leading-none transition-transform duration-300 ${
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
                    <p className="text-fg-3 max-w-2xl pb-7 text-sm leading-relaxed md:text-base">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
