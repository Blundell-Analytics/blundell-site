"use client";

import { useEffect, useState } from "react";

interface TypingTextProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function TypingText({
  texts,
  typingSpeed = 75,
  deletingSpeed = 38,
  pauseDuration = 2400,
  className,
  style,
}: TypingTextProps) {
  const [displayed, setDisplayed] = useState(texts[0]);
  const [phase, setPhase] = useState<"typing" | "deleting" | "pausing">("pausing");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const current = texts[index];

    if (phase === "pausing") {
      const t = setTimeout(() => setPhase("deleting"), pauseDuration);
      return () => clearTimeout(t);
    }

    if (phase === "deleting") {
      if (displayed.length === 0) {
        const next = (index + 1) % texts.length;
        setIndex(next);
        setPhase("typing");
        return;
      }
      const t = setTimeout(() => setDisplayed((d) => d.slice(0, -1)), deletingSpeed);
      return () => clearTimeout(t);
    }

    if (phase === "typing") {
      if (displayed.length === current.length) {
        const t = setTimeout(() => setPhase("pausing"), pauseDuration);
        return () => clearTimeout(t);
      }
      const t = setTimeout(
        () => setDisplayed(current.slice(0, displayed.length + 1)),
        typingSpeed,
      );
      return () => clearTimeout(t);
    }
  }, [displayed, phase, index, texts, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className} style={style}>
      {displayed}
    </span>
  );
}
