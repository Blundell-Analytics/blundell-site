"use client";

import { motion } from "framer-motion";

/** How an engagement actually runs — kept to three compact lines. */
const STAGES = [
  {
    n: "01",
    t: "The brief",
    d: "The position, the budget envelope, and the constraint you are actually solving for.",
  },
  {
    n: "02",
    t: "The analysis",
    d: "We model the market against that brief rather than against a generic average.",
  },
  {
    n: "03",
    t: "The report",
    d: "A ranked shortlist with the reasoning attached, plus the platform behind it.",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-band relative z-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="rail rule-t grid grid-cols-1 gap-10 py-11 md:grid-cols-12 md:gap-8 lg:gap-14 lg:py-14"
      >
        <div className="md:col-span-7">
          <p className="eyebrow mb-4">About</p>
          <h2 className="display-lg text-fg max-w-2xl 2xl:max-w-3xl">
            Built for the people who have to justify the signing.
          </h2>
          <p className="text-fg-3 mt-4 max-w-2xl text-base leading-relaxed 2xl:max-w-3xl">
            Blundell Analytics is a quantitative football consultancy. We help
            clubs treat recruitment like capital allocation — every signing
            weighed against the alternatives, with a case a sporting director
            can defend in the room.
          </p>
          <p className="text-fg-3 mt-4 max-w-2xl text-base leading-relaxed 2xl:max-w-3xl">
            Give us a brief — the position, the budget, the way you play — and
            we return a ranked shortlist with the reasoning behind every name on
            it. We don&apos;t sell software, and we won&apos;t tell you a
            signing is guaranteed to work.
          </p>
        </div>

        <div className="md:col-span-5">
          <p className="eyebrow mb-4">How it works</p>
          <ol className="flex flex-col">
            {STAGES.map((s) => (
              <li key={s.n} className="-mx-3 px-3 py-4">
                <div className="flex items-baseline gap-3">
                  <span className="text-mark font-mono text-[11px] tracking-[0.14em]">
                    {s.n}
                  </span>
                  <span className="text-fg text-base font-medium">{s.t}</span>
                </div>
                <p className="text-fg-3 mt-1.5 text-sm leading-relaxed">
                  {s.d}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </motion.div>
    </section>
  );
}
