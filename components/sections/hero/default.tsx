"use client";

import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import { PageBackground } from "@/components/ui/page-background";
import { TypingText } from "@/components/ui/typing-text";

const TYPING_PHRASES = [
  "a calculated one.",
  "a quantified one.",
  "an informed one.",
  "a data-driven one.",
];

/** Masthead strip beneath the headline. */
const META = [
  { k: "Discipline", v: "Transfer Intelligence" },
  { k: "Model", v: "Five-Objective Scoring" },
  { k: "Output", v: "Customised Report" },
  { k: "Response", v: "Within 48 Hours" },
];

export default function Hero() {
  return (
    <section className="relative flex min-h-screen w-full flex-col justify-end overflow-hidden pt-28 lg:pt-32">
      <PageBackground />

      <div className="rail relative z-10 flex flex-1 flex-col justify-end pt-12 pb-14 lg:pt-24 lg:pb-20">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-8">
          {/* Section marker */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 lg:flex-col lg:items-start lg:gap-4">
              <span className="bg-mark pulse-mark size-2" />
              <span className="font-mono text-[10px] tracking-[0.18em] text-neutral-500 uppercase lg:[writing-mode:vertical-rl]">
                00 — Overview
              </span>
            </div>
          </div>

          {/* Statement */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <h1 className="display-xl text-white">
              Every transfer decision has a cost. Make it{" "}
              <span className="text-mark">
                <TypingText texts={TYPING_PHRASES} />
                <span
                  aria-hidden
                  className="ml-0.5 inline-block w-[0.06em] self-stretch"
                  style={{
                    animation: "cursor-blink 1s step-end infinite",
                    borderLeft: "0.06em solid var(--mark)",
                    height: "0.8em",
                    verticalAlign: "-0.05em",
                  }}
                />
              </span>
            </h1>
          </motion.div>

          {/* Supporting copy */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.75,
              delay: 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="lg:col-span-3"
          >
            <p className="max-w-sm text-sm leading-relaxed text-neutral-400 lg:text-base">
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
              className="btn-mono btn-primary mt-7 inline-block"
            >
              Request a Report
            </a>
          </motion.div>
        </div>
      </div>

      {/* Masthead strip */}
      <motion.dl
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="rule-t rule-b relative z-10 grid grid-cols-2 lg:grid-cols-4"
      >
        {META.map((m, i) => (
          <div
            key={m.k}
            className={`px-6 py-5 lg:px-10 ${
              i > 0 ? "lg:border-l lg:border-white/10" : ""
            } ${i % 2 === 1 ? "border-l border-white/10 lg:border-l" : ""} ${
              i < 2 ? "border-b border-white/10 lg:border-b-0" : ""
            }`}
          >
            <dt className="cell-label">{m.k}</dt>
            <dd className="cell-value">{m.v}</dd>
          </div>
        ))}
      </motion.dl>

      <div className="rail relative z-10 flex items-center gap-2 py-4 text-neutral-600">
        <ChevronDown className="size-3.5 animate-bounce" />
        <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
          Scroll
        </span>
      </div>
    </section>
  );
}
