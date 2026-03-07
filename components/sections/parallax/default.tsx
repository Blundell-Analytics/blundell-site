"use client";

import { useEffect, useRef } from "react";

import { Mockup, MockupFrame } from "@/components/ui/mockup";
import Glow from "@/components/ui/glow";

export default function ParallaxSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current || !imgRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = 1 - rect.bottom / (viewH + rect.height);
      const clamped = Math.max(0, Math.min(1, progress));
      imgRef.current.style.transform = `translateY(${-clamped * 80}px)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-black pt-24 pb-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-20" />

        {/* Heading */}
        <div className="text-center mb-12">
          <p
            className="text-[11px] uppercase tracking-[0.2em] text-white/30 mb-3"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            The Platform
          </p>
          <h2
            className="text-2xl sm:text-3xl font-semibold text-white/80"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Every decision, backed by data
          </h2>
        </div>

        {/* Mockup with parallax image */}
        <div className="relative">
          <MockupFrame size="small">
            <Mockup type="responsive" className="w-full border-0 bg-zinc-950 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imgRef}
                src="/dashboard-player.png"
                alt="Blundell Analytics — Player Detail"
                className="w-full block"
                style={{ willChange: "transform", transition: "transform 0.08s linear" }}
              />
            </Mockup>
          </MockupFrame>
          <Glow variant="top" className="opacity-20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
