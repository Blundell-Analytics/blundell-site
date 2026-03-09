"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import Glow from "@/components/ui/glow";

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {

  return (
    <section
      className="relative w-full overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ height: "100dvh", zIndex: 1 }}
    >
      {/* Glow */}
      <Glow variant="top" className="opacity-40" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 w-full text-center"
        style={{
          maxWidth: "42rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "2rem",
          margin: "0 auto",
          marginTop: "40px",
        }}
      >
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight"
          style={{ fontFamily: "var(--font-jakarta)", color: "var(--foreground)" }}
        >
          Every transfer decision has a cost. Make it{" "}
          <em
            style={{
              fontStyle: "italic",
              fontFamily: "var(--font-playfair)",
              color: "transparent",
              backgroundImage:
                "linear-gradient(135deg, #3b82f6 0%, #60a5fa 50%, #bfdbfe 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
            }}
          >
            a calculated one.
          </em>
        </h1>

        <p
          className="text-sm sm:text-base font-light leading-relaxed max-w-xl"
          style={{ fontFamily: "var(--font-jakarta)", color: "var(--fg-muted)" }}
        >
          We help clubs make smarter{" "}
          <span style={{ color: "var(--fg-medium)", fontWeight: 500 }}>transfer decisions</span>{" "}
          backed by robust{" "}
          <span style={{ color: "var(--fg-medium)", fontWeight: 500 }}>
            mathematical and statistical models
          </span>
          . Reach out for a{" "}
          <span style={{ color: "var(--fg-medium)", fontWeight: 500 }}>customised report</span>{" "}
          — tactical analysis, risk assessments, and shortlists.
        </p>

        {/* CTA button */}
        <button
          onClick={scrollToContact}
          className="group h-12 shrink-0 flex items-center justify-center gap-2 rounded-xl px-7 text-sm font-semibold btn-primary"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Request a Report
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p
          className="text-[11px]"
          style={{ fontFamily: "var(--font-jakarta)", color: "var(--fg-subtle)" }}
        >
          No commitment. Responses within 48 hours.
        </p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
      >
        <span
          className="text-[10px] uppercase tracking-widest"
          style={{ fontFamily: "var(--font-jakarta)", color: "var(--fg-medium)" }}
        >
          Scroll
        </span>
        <ChevronDown className="size-4 animate-bounce" style={{ color: "var(--foreground)" }} />
      </motion.div>
    </section>
  );
}
