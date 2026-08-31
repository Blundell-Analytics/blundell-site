"use client";

import { SectionHeader } from "@/components/ui/section";

/** How an engagement actually runs — kept to three lines, not three cards. */
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
    <section id="about" className="bg-ink relative z-10">
      <SectionHeader
        label="About"
        title="Built for the people who have to justify the signing."
        lead="Blundell Analytics is a quantitative football consultancy. We work with clubs that treat recruitment the way they treat any other use of capital — where a signing competes against every alternative use of the same money, and somebody has to defend the decision in a room."
      >
        <p className="text-fg-3 mt-5 max-w-2xl text-base leading-relaxed">
          We are not a data feed and we are not a video platform. You give us a
          brief and we return a shortlist you can put in front of a sporting
          director without translating it first. It will not tell you which
          signing is guaranteed to work, and we will not claim otherwise.
        </p>
      </SectionHeader>

      <div className="rail rule-t py-11 lg:py-14">
        <p className="eyebrow mb-6">How it works</p>
        <ol className="divide-hairline border-hairline max-w-4xl divide-y border-t">
          {STAGES.map((s) => (
            <li
              key={s.n}
              className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-12 sm:gap-6"
            >
              <span className="text-mark font-mono text-[11px] tracking-[0.14em] sm:col-span-1 sm:pt-1">
                {s.n}
              </span>
              <span className="text-fg text-base font-medium sm:col-span-3">
                {s.t}
              </span>
              <span className="text-fg-3 text-sm leading-relaxed sm:col-span-8">
                {s.d}
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
