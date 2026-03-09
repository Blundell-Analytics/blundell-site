"use client";

import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label="Toggle theme"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "10px",
        border: "1px solid rgba(0, 74, 173, 0.3)",
        background: "var(--scroll-bg)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        color: "var(--fg-medium)",
        transition: "border-color 0.2s, color 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0, 74, 173, 0.7)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(0, 74, 173, 0.3)";
      }}
    >
      {isDark ? <Sun size={15} /> : <Moon size={15} />}
    </button>
  );
}

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className }: NavbarProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "absolute top-0 left-0 right-0 z-50 flex items-center justify-center px-6 py-5",
        className,
      )}
    >
      <a
        href={siteConfig.url}
        className="hover:opacity-80 transition-opacity"
        style={{
          fontFamily: "var(--font-jakarta)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "-4px",
        }}
      >
        <img
          src="/logo_1.png"
          alt="Blundell Analytics Logo"
          className="h-16 sm:h-20 w-auto shrink-0 object-contain drop-shadow-lg"
        />
        <span
          className="text-sm font-medium tracking-[0.2em] uppercase"
          style={{ color: "var(--fg-faint)" }}
        >
          Blundell Analytics
        </span>
      </a>

      <div
        style={{
          position: "fixed",
          top: "20px",
          right: "24px",
          zIndex: 100,
        }}
      >
        <ThemeToggle />
      </div>
    </motion.header>
  );
}
