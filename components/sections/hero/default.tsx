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
              className="display-hero text-fg lg:col-span-8"
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
              <p className="text-fg-3 max-w-md text-sm leading-relaxed lg:text-base">
                We help clubs make smarter{" "}
                <span className="text-fg">transfer decisions</span> backed by{" "}
                <span className="text-fg">quantitative models</span>. Commission
                a <span className="text-fg">customised report</span> — tactical
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

          <div className="text-fg-4 mt-12 flex items-center gap-2">
            <ChevronDown className="size-3.5 animate-bounce" />
            <span className="font-mono text-[10px] tracking-[0.18em] uppercase">
              Scroll
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
