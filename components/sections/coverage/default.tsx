"use client";

import CountUp from "@/components/ui/count-up";

/**
 * Scale of the underlying data. Figures come from the modelling repo's own
 * documentation — coverage only, nothing about how the models work.
 */
const FIGURES = [
  { to: 16, suffix: "+", label: "Leagues covered" },
  { to: 10, suffix: "", label: "Seasons of history" },
  { to: 63700, suffix: "", label: "Player-seasons held" },
  { to: 1056, suffix: "", label: "Squad-seasons held" },
];

export default function Coverage() {
  return (
    <section className="bg-band relative z-10">
      <div className="rail rule-t pt-11 pb-8 lg:pt-14 lg:pb-9">
        <p className="eyebrow mb-4">Coverage</p>
        <p className="text-fg-3 max-w-2xl text-base leading-relaxed">
          A shortlist is only as good as the field it was drawn from. Ours is
          built on a decade of squad history, rebuilt from source rather than
          licensed wholesale.
        </p>
      </div>

      <dl className="rail grid grid-cols-1 gap-x-10 gap-y-8 pb-12 sm:grid-cols-2 lg:grid-cols-4 lg:pb-14">
        {FIGURES.map((f) => (
          <div key={f.label} className="border-hairline border-t pt-6">
            <dd
              className="text-fg font-medium tracking-[-0.03em]"
              style={{
                fontFamily: "var(--font-inter-tight), sans-serif",
                fontSize: "clamp(2.75rem, 6vw, 4.5rem)",
                lineHeight: 0.95,
              }}
            >
              <CountUp to={f.to} suffix={f.suffix} />
            </dd>
            <dt className="cell-label mt-4">{f.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
