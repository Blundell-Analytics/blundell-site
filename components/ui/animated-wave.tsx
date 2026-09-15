"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Adapted from Karim Saif's "Animated Wave Footer" Framer component
 * (https://framer.com/m/Ainmated-Wave-Footer-sVp46C.js) — stripped of the
 * Framer-only bits (addPropertyControls, useIsStaticRenderer, presets,
 * gradient fill, direction/phase controls) since this runs as a plain
 * client component with one fixed configuration, not inside the Framer
 * canvas with a property panel.
 */

type WaveShape = "Sine" | "Soft" | "Triangle" | "Square";

function calculateWaveValue(theta: number, shape: WaveShape) {
  const normTheta = ((theta % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  switch (shape) {
    case "Triangle": {
      const normalized = normTheta / (2 * Math.PI);
      return normalized < 0.5 ? 4 * normalized - 1 : 3 - 4 * normalized;
    }
    case "Square":
      return Math.sin(theta) >= 0 ? 1 : -1;
    case "Soft": {
      const rawSin = (Math.sin(theta) + 1) / 2;
      const smooth = rawSin * rawSin * (3 - 2 * rawSin);
      return smooth * 2 - 1;
    }
    case "Sine":
    default:
      return Math.sin(theta);
  }
}

export interface AnimatedWaveProps {
  barCount?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  waveShape?: WaveShape;
  barSpacing?: number;
  barColor?: string;
  backgroundColor?: string;
  fadeEdges?: boolean;
  interactionStrength?: number;
  className?: string;
}

export function AnimatedWave({
  barCount = 23,
  amplitude = 20,
  frequency = 0.3,
  speed = 2.5,
  waveShape = "Sine",
  barSpacing = 0,
  barColor = "#ffffff",
  backgroundColor = "transparent",
  fadeEdges = false,
  interactionStrength = 1.5,
  className,
}: AnimatedWaveProps) {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const hoverScaleRef = useRef(1);
  const targetHoverScaleRef = useRef(1);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry) setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
      return;
    }

    const animateWave = (currentTime: number) => {
      hoverScaleRef.current += (targetHoverScaleRef.current - hoverScaleRef.current) * 0.1;
      const t = (currentTime / 1000) * speed;
      const effectiveAmplitude = amplitude * hoverScaleRef.current;
      waveRefs.current.forEach((element, index) => {
        if (!element) return;
        const theta = t + index * frequency;
        const offset = effectiveAmplitude * calculateWaveValue(theta, waveShape);
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
      animationFrameRef.current = requestAnimationFrame(animateWave);
    };

    animationFrameRef.current = requestAnimationFrame(animateWave);
    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isInView, speed, amplitude, frequency, waveShape]);

  return (
    <div
      ref={containerRef}
      aria-hidden
      onMouseEnter={() => {
        targetHoverScaleRef.current = interactionStrength;
      }}
      onMouseLeave={() => {
        targetHoverScaleRef.current = 1;
      }}
      className={className}
      style={{
        backgroundColor,
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: `${barSpacing}px`,
        }}
      >
        {Array.from({ length: barCount }).map((_, index) => {
          let opacity = 1;
          if (fadeEdges) {
            const mid = (barCount - 1) / 2;
            const dist = Math.abs(index - mid) / (mid || 1);
            opacity = Math.max(0.15, 1 - dist * 0.7);
          }
          return (
            <div
              key={index}
              ref={(el) => {
                waveRefs.current[index] = el;
              }}
              style={{
                height: `${index + 1}px`,
                backgroundColor: barColor,
                opacity,
                willChange: "transform",
                width: "100%",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
