"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

/** Company-level questions only — nothing about how the modelling works. */
const ITEMS = [
  {
    q: "What do we actually receive?",
    a: "A ranked shortlist for the brief you set, with the reasoning attached to each name, written to be read in a recruitment meeting rather than by a data scientist. You also get the working platform behind it, so your staff can re-run the filters and see the field for themselves.",
  },
  {
    q: "Which leagues and seasons do you cover?",
    a: "More than sixteen competitions, with squad history reaching back to 2015. If a specific market matters to you and is not already covered, say so in the brief and we will confirm whether it is feasible before any work starts.",
  },
  {
    q: "Is our brief confidential?",
    a: "Yes. What you are looking for, what you can spend and who you are considering stays between us. We will not name you as a client without asking first.",
  },
  {
    q: "How do we start?",
    a: "Send us a brief through the form below. We reply within 48 hours with scope, timeline and price, before you have committed to anything.",
  },
];

export default function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-band relative z-10">
      <SectionHeader label="Questions" title="What clubs ask us first." />

      <div className="rail">
        {ITEMS.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q} className="border-hairline border-b">
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
