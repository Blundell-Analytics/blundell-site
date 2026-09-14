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
        className="rail rule-t grid grid-cols-1 gap-10 py-11 lg:grid-cols-12 lg:gap-14 lg:py-14"
      >
        <div className="lg:col-span-7">
          <p className="eyebrow mb-4">About</p>
          <h2 className="display-lg text-fg max-w-2xl">
            Built for the people who have to justify the signing.
          </h2>
          <p className="text-fg-3 mt-4 max-w-2xl text-base leading-relaxed">
            Blundell Analytics is a quantitative football consultancy. We work
            with clubs that treat recruitment the way they treat any other use
            of capital — where a signing competes against every alternative use
            of the same money, and somebody has to defend the decision in a
            room.
          </p>
          <p className="text-fg-3 mt-4 max-w-2xl text-base leading-relaxed">
            We are not a data feed and we are not a video platform. You give us
            a brief and we return a shortlist you can put in front of a sporting
            director without translating it first. It will not tell you which
            signing is guaranteed to work, and we will not claim otherwise.
          </p>
        </div>

        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">How it works</p>
          <ol className="border-hairline divide-hairline divide-y border-t">
            {STAGES.map((s) => (
              <li key={s.n} className="py-4">
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
