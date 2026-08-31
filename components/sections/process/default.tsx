"use client";

import { motion } from "framer-motion";

/** Numbered because an engagement genuinely runs in this order. */
const STEPS = [
  {
    n: "01",
    title: "The brief",
    body: "You tell us the position, the budget envelope, the way you want to play and the constraint you are actually solving for. A brief takes a conversation, not a procurement cycle.",
    out: "A defined question",
  },
  {
    n: "02",
    title: "The analysis",
    body: "We model the market against that brief rather than against a generic average. Candidates are compared on the same terms, and the ones that do not survive scrutiny are cut before you ever see them.",
    out: "A ranked field",
  },
  {
    n: "03",
    title: "The report",
    body: "You get a shortlist with the reasoning attached, written to be read in a recruitment meeting — plus the working platform behind it, so your staff can re-run the filters themselves.",
    out: "A defensible decision",
  },
];

export default function Process() {
  return (
    <section id="process" className="bg-ink relative z-10">
      <div className="rail rule-t rule-b py-14 lg:py-16">
        <p className="eyebrow mb-6">How we work</p>
        <h2 className="display-lg text-fg max-w-2xl">
          A brief in. A shortlist out.
        </h2>
        <p className="text-fg-3 mt-6 max-w-xl text-base leading-relaxed">
          No platform to learn, no annual licence to justify before you have
          seen anything. One engagement, start to finish.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {STEPS.map((step, i) => (
          <motion.article
            key={step.n}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`rail border-hairline flex flex-col py-12 lg:py-16 ${
              i > 0 ? "border-t lg:border-t-0 lg:border-l" : ""
            }`}
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-mark font-mono text-[11px] tracking-[0.14em]">
                {step.n}
              </span>
              <span className="bg-hairline-strong h-px w-8" />
            </div>

            <h3 className="display-md text-fg mb-4">{step.title}</h3>

            <p className="text-fg-3 max-w-md flex-grow text-sm leading-relaxed">
              {step.body}
            </p>

            <div className="border-hairline mt-8 border-t pt-5">
              <div className="cell-label">You end up with</div>
              <div className="cell-value">{step.out}</div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
