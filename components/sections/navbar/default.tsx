"use client";

import { motion } from "framer-motion";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

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
    </motion.header>
  );
}
