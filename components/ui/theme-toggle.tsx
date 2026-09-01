"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The server cannot know the stored theme, so render the icon only after
  // hydration rather than flashing the wrong one.
  useEffect(() => setMounted(true), []);

  // resolvedTheme can still be undefined on the first client render, so fall
  // back to the configured theme rather than reporting the wrong state.
  const isDark = mounted ? (resolvedTheme ?? theme) !== "light" : false;

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      className={`text-fg-3 hover:text-fg flex items-center justify-center transition-colors hover:bg-[var(--btn-ghost-bg)] ${className}`}
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-4" />
        ) : (
          <Moon className="size-4" />
        )
      ) : (
        <span className="size-4" />
      )}
    </button>
  );
}
