"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * One header treatment, and one left edge. The label sits above the heading
 * rather than in its own column — a label column pushes headings inward while
 * body content stays on the rail, which is what made the page look misaligned.
 */
export function SectionHeader({
  label,
  title,
  lead,
  children,
}: {
  label: string;
  title: string;
  lead?: string;
  children?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="rail rule-t py-11 lg:py-14"
    >
      <p className="eyebrow mb-4">{label}</p>
      <h2 className="display-lg text-fg max-w-2xl">{title}</h2>
      {lead && (
        <p className="text-fg-3 mt-4 max-w-2xl text-base leading-relaxed">
          {lead}
        </p>
      )}
      {children}
    </motion.div>
  );
}
