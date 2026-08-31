"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { PageBackground } from "@/components/ui/page-background";
import { handleAnchorClick } from "@/lib/scroll-to";
import { TypingText } from "@/components/ui/typing-text";

const TYPING_PHRASES = [
  "a calculated one.",
  "a quantified one.",
  "an informed one.",
  "a data-driven one.",
];

/** Masthead strip. Sits below the fold, immediately after the statement. */
const META = [
  { k: "Discipline", v: "Transfer Intelligence" },
  { k: "Model", v: "Five-Objective Scoring" },
  { k: "Output", v: "Customised Report" },
  { k: "Response", v: "Within 48 Hours" },
];

export default function Hero() {
  return (
    <>
      {/* The statement fills exactly one screen; nothing else is in view. */}
      <section
        id="top"
        className="relative flex min-h-screen w-full flex-col overflow-hidden pt-14 lg:pt-16"
      >
        <PageBackground />

        <div className="rail relative z-10 flex flex-1 flex-col justify-end pt-12 pb-10 lg:pb-14">
          <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-10">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="display-hero text-white lg:col-span-8"
            >
              Every transfer decision has a cost. Make it
              <span className="text-mark block">
                <TypingText texts={TYPING_PHRASES} />
                <span
                  aria-hidden
                  className="ml-0.5 inline-block"
                  style={{
                    animation: "cursor-blink 1s step-end infinite",
                    borderLeft: "0.055em solid var(--mark)",
                    height: "0.78em",
                    verticalAlign: "-0.04em",
                  }}
                />
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.75,
                delay: 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="lg:col-span-4"
            >
              <p className="max-w-md text-sm leading-relaxed text-neutral-400 lg:text-base">
                We help clubs make smarter{" "}
                <span className="text-white">transfer decisions</span> backed by{" "}
                <span className="text-white">
                  quantitative models and five-objective scoring
                </span>
                . Commission a{" "}
                <span className="text-white">customised report</span> — tactical
                analysis, risk assessments, and shortlists.
              </p>

              <a
                href="#contact"
                onClick={(e) => handleAnchorClick(e, "#contact")}
                className="btn-mono btn-primary mt-7 inline-block"
              >
                Request a Report
              </a>
            </motion.div>
          </div>

          <div className="mt-12 flex items-center gap-2 text-neutral-600">
            <ChevronDown className="size-3.5 animate-bounce" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
              Scroll
            </span>
          </div>
        </div>
      </section>

      <motion.dl
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="bg-ink rule-t rule-b relative z-10 grid grid-cols-2 lg:grid-cols-4"
      >
        {META.map((m, i) => (
          <div
            key={m.k}
            className={`px-6 py-5 lg:px-10 2xl:px-16 ${
              i % 2 === 1 ? "border-l border-white/10" : ""
            } ${i < 2 ? "border-b border-white/10 lg:border-b-0" : ""} ${
              i === 2 ? "lg:border-l lg:border-white/10" : ""
            }`}
          >
            <dt className="cell-label">{m.k}</dt>
            <dd className="cell-value">{m.v}</dd>
          </div>
        ))}
      </motion.dl>
    </>
  );
}
