"use client";

import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Adapted from Karim Saif's "Animated Wave Footer" Framer component
 * (https://framer.com/m/Ainmated-Wave-Footer-sVp46C.js) — stripped of the
 * Framer-only bits (addPropertyControls, useIsStaticRenderer) since this
 * runs as a plain client component, not inside the Framer canvas.
 */

type WaveShape = "Sine" | "Soft" | "Triangle" | "Square";
type WavePreset =
  | "Classic"
  | "Soft"
  | "Energetic"
  | "Deep"
  | "Minimal"
  | "Pulse"
  | "Custom";

const MOTION_PRESET_MAP: Record<
  Exclude<WavePreset, "Custom">,
  { barCount: number; amplitude: number; frequency: number; speed: number; waveShape: WaveShape }
> = {
  Classic: { barCount: 23, amplitude: 20, frequency: 0.3, speed: 2.5, waveShape: "Sine" },
  Soft: { barCount: 18, amplitude: 10, frequency: 0.2, speed: 1.4, waveShape: "Soft" },
  Energetic: { barCount: 28, amplitude: 35, frequency: 0.42, speed: 5, waveShape: "Sine" },
  Deep: { barCount: 32, amplitude: 45, frequency: 0.18, speed: 1.8, waveShape: "Sine" },
  Minimal: { barCount: 12, amplitude: 8, frequency: 0.25, speed: 1, waveShape: "Sine" },
  Pulse: { barCount: 20, amplitude: 30, frequency: 0.55, speed: 3.8, waveShape: "Soft" },
};

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

function interpolateColor(color1: string, color2: string, factor: number) {
  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    if (clean.length === 3) {
      return [
        parseInt(clean[0] + clean[0], 16),
        parseInt(clean[1] + clean[1], 16),
        parseInt(clean[2] + clean[2], 16),
      ];
    }
    return [
      parseInt(clean.substring(0, 2), 16) || 0,
      parseInt(clean.substring(2, 4), 16) || 0,
      parseInt(clean.substring(4, 6), 16) || 0,
    ];
  };
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  const r = Math.round(rgb1[0] + (rgb2[0] - rgb1[0]) * factor);
  const g = Math.round(rgb1[1] + (rgb2[1] - rgb1[1]) * factor);
  const b = Math.round(rgb1[2] + (rgb2[2] - rgb1[2]) * factor);
  return `rgb(${r}, ${g}, ${b})`;
}

export interface AnimatedWaveProps {
  preset?: WavePreset;
  barCount?: number;
  amplitude?: number;
  frequency?: number;
  speed?: number;
  waveShape?: WaveShape;
  direction?: "Forward" | "Reverse";
  phase?: number;
  colorMode?: "Solid" | "Gradient";
  barColor?: string;
  gradientStart?: string;
  gradientEnd?: string;
  backgroundColor?: string;
  waveWidth?: number;
  barSpacing?: number;
  barRadius?: number;
  fadeEdges?: boolean;
  interactive?: boolean;
  interactionStrength?: number;
  className?: string;
}

export function AnimatedWave({
  preset = "Classic",
  barCount = 23,
  amplitude = 20,
  frequency = 0.3,
  speed = 2.5,
  waveShape = "Sine",
  direction = "Forward",
  phase = 0,
  colorMode = "Solid",
  barColor = "#ffffff",
  gradientStart = "#a855f7",
  gradientEnd = "#06b6d4",
  backgroundColor = "transparent",
  waveWidth = 100,
  barSpacing = 0,
  barRadius = 0,
  fadeEdges = false,
  interactive = true,
  interactionStrength = 1.5,
  className,
}: AnimatedWaveProps) {
  const waveRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const hoverScaleRef = useRef(1);
  const targetHoverScaleRef = useRef(1);

  const activeMotionConfig = useMemo(() => {
    if (preset !== "Custom" && MOTION_PRESET_MAP[preset]) {
      return MOTION_PRESET_MAP[preset];
    }
    return { barCount, amplitude, frequency, speed, waveShape };
  }, [preset, barCount, amplitude, frequency, speed, waveShape]);

  useEffect(() => {
    if (!interactive) {
      targetHoverScaleRef.current = 1;
      hoverScaleRef.current = 1;
    }
  }, [interactive]);

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

    const dirFactor = direction === "Reverse" ? -1 : 1;

    const animateWave = (currentTime: number) => {
      hoverScaleRef.current += (targetHoverScaleRef.current - hoverScaleRef.current) * 0.1;
      const t = (currentTime / 1000) * activeMotionConfig.speed * dirFactor;
      const effectiveAmplitude = activeMotionConfig.amplitude * hoverScaleRef.current;
      waveRefs.current.forEach((element, index) => {
        if (!element) return;
        const theta = t + index * activeMotionConfig.frequency + phase;
        const offset = effectiveAmplitude * calculateWaveValue(theta, activeMotionConfig.waveShape);
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
  }, [isInView, activeMotionConfig, direction, phase]);

  const handleMouseEnter = () => {
    if (interactive) targetHoverScaleRef.current = interactionStrength;
  };
  const handleMouseLeave = () => {
    if (interactive) targetHoverScaleRef.current = 1;
  };

  return (
    <div
      ref={containerRef}
      aria-hidden
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
          width: `${waveWidth}%`,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: `${barSpacing}px`,
        }}
      >
        {Array.from({ length: activeMotionConfig.barCount }).map((_, index) => {
          const total = activeMotionConfig.barCount;
          const factor = total > 1 ? index / (total - 1) : 0;
          const fill =
            colorMode === "Gradient" ? interpolateColor(gradientStart, gradientEnd, factor) : barColor;
          let opacity = 1;
          if (fadeEdges) {
            const mid = (total - 1) / 2;
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
                backgroundColor: fill,
                borderRadius: `${barRadius}px`,
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
