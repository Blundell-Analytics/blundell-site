"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { FormEvent, useState, useEffect } from "react";

import Glow from "@/components/ui/glow";

export default function Hero() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [stars, setStars] = useState<
    { width: string; height: string; top: string; left: string; opacity: number }[]
  >([]);

  useEffect(() => {
    setStars(
      Array.from({ length: 60 }).map(() => ({
        width: Math.random() < 0.2 ? "2px" : "1px",
        height: Math.random() < 0.2 ? "2px" : "1px",
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        opacity: Math.random() * 0.7 + 0.3,
      }))
    );
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email) setSubmitted(true);
  };

  return (
    <section
      className="relative w-full bg-black overflow-hidden flex flex-col items-center justify-center px-6"
      style={{ height: "100dvh" }}
    >
      {/* Glow */}
      <Glow variant="top" className="opacity-40" />

      {/* Starfield */}
      <div className="absolute inset-0 pointer-events-none">
        {stars.map((star, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: star.width,
              height: star.height,
              top: star.top,
              left: star.left,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl w-full text-center flex flex-col items-center gap-8">
        <h1
          className="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1] tracking-tight text-white"
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
            className="w-full rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-4 text-sm text-blue-200"
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
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40">
        <span
          className="text-[10px] uppercase tracking-widest text-white/60"
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          Scroll
        </span>
        <ChevronDown className="size-4 text-white animate-bounce" />
      </div>
    </section>
  );
}
