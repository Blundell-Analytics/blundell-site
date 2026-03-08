"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

import Glow from "@/components/ui/glow";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";

const scrollToContact = () => {
  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {

  return (
    <section
      className="relative w-full bg-black overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ height: "100dvh" }}
    >
      {/* Glow */}
      <Glow variant="top" className="opacity-40" />

      {/* Dynamic Backgrounds */}
      <div className="absolute inset-0">
        <InteractiveGridPattern
          className="absolute inset-0 bg-transparent"
          cellSize={40} glowColor="rgba(0, 74, 173, 0.35)" borderColor="rgba(255, 255, 255, 0.045)"
        />
        {/* 
        <Particles 
          className="absolute inset-0 bg-transparent" 
          quantity={60} ease={80} color="#004aad" refresh 
        />
        <Meteors count={15} color="#60a5fa" tailColor="rgba(0, 74, 173, 0.4)" />
        */}
      </div>

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
          gap: "2rem", /* 24px - easy to change! */
          margin: "0 auto",
          marginTop: "40px", /* Increase this (e.g., '40px') to push the title further down from the logo */
        }}
      >
        <h1
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-[1.1] tracking-tight text-white"
          style={{ fontFamily: "var(--font-jakarta)" }}
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
          className="text-sm sm:text-base text-white/40 font-light leading-relaxed max-w-xl"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          We help clubs make smarter{" "}
          <span className="text-white/70 font-medium">transfer decisions</span>{" "}
          backed by robust{" "}
          <span className="text-white/70 font-medium">
            mathematical and statistical models
          </span>
          . Reach out for a{" "}
          <span className="text-white/70 font-medium">customised report</span>{" "}
          — tactical analysis, risk assessments, and shortlists.
        </p>

        {/* CTA button */}
        <button
          onClick={scrollToContact}
          className="group h-12 shrink-0 flex items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Request a Report
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </button>

        <p
          className="text-[11px] text-white/25"
          style={{ fontFamily: "var(--font-jakarta)" }}
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
          className="text-[10px] uppercase tracking-widest text-white/60"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Scroll
        </span>
        <ChevronDown className="size-4 text-white animate-bounce" />
      </motion.div>
    </section>
  );
}
