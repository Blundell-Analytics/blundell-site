"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

/**
 * One header treatment for every section: a mono label in the left column, the
 * heading and any lead copy in the right. Using it everywhere is what makes the
 * page read as one document rather than a stack of unrelated bands.
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
    <div className="rail rule-t grid grid-cols-1 gap-6 py-14 lg:grid-cols-12 lg:gap-10 lg:py-20">
      <p className="eyebrow lg:col-span-3 lg:pt-2">{label}</p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="lg:col-span-9"
      >
        <h2 className="display-lg text-fg max-w-2xl">{title}</h2>
        {lead && (
          <p className="text-fg-3 mt-6 max-w-2xl text-base leading-relaxed">
            {lead}
          </p>
        )}
        {children}
      </motion.div>
    </div>
  );
}

/** Body row on the same grid, for content that follows a SectionHeader. */
export function SectionBody({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rail rule-t grid grid-cols-1 gap-6 py-12 lg:grid-cols-12 lg:gap-10 lg:py-16 ${className}`}
    >
      <p className="eyebrow lg:col-span-3 lg:pt-2">{label ?? ""}</p>
      <div className="lg:col-span-9">{children}</div>
    </div>
  );
}
