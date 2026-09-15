"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

export default function Edge() {
  return (
    <section id="edge" className="bg-ink relative z-10">
      <SectionHeader
        label="The edge"
        title="Fit and risk, scored together."
        lead="Most recruitment reports hand you a tactical fit score and a risk flag, and leave you to weigh the two yourself. We don't split them. Every name on your shortlist already accounts for both, so the trade-off is made before the report reaches your desk."
      />

      <div className="rail pb-11 lg:pb-14">
        <motion.blockquote
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="border-mark max-w-2xl border-l-2 pl-6 2xl:max-w-3xl"
        >
          <p className="display-md text-fg">
            A brilliant tactical fit with a serious injury history. A steady
            performer nobody else has flagged as undervalued.
          </p>
          <p className="text-fg-3 mt-3 text-base leading-relaxed">
            Scored separately, that&apos;s two spreadsheets and a guess.
            Scored together, it&apos;s a ranked answer.
          </p>
        </motion.blockquote>
      </div>
    </section>
  );
}
