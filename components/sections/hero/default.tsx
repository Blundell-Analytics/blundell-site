"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";
import { motion } from "framer-motion";

import Glow from "@/components/ui/glow";
import { InteractiveGridPattern } from "@/components/ui/interactive-grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import { Particles } from "@/components/ui/particles";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) {
      window.location.href = `mailto:info@blundellanalytics.ca?subject=Report Request&body=Hi, I would like to request a customized report for my club. My email is ${email}.`;
      setSubmitted(true);
    }
  };

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
            gap: "1.5rem", /* 24px - easy to change! */
            margin: "0 auto",
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

        {submitted ? (
          <div
            className="w-full rounded-xl border border-[#004aad]/30 bg-[#004aad]/10 px-6 py-4 text-sm text-[#004aad]"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            ✓ We&apos;ll be in touch within 48 hours.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col sm:flex-row items-center gap-3"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your club email address"
              className="h-12 w-full rounded-xl border border-white/10 bg-white/5 px-5 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/20 transition-colors"
              style={{ fontFamily: "var(--font-jakarta)" }}
            />
            <button
              type="submit"
              className="group h-12 shrink-0 flex items-center justify-center gap-2 rounded-xl bg-white px-7 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              Request a Report
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        )}

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
