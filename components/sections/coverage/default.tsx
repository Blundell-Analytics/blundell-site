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
    <section className="bg-ink relative z-10">
      <div className="rail rule-t grid grid-cols-1 gap-6 py-14 lg:grid-cols-12 lg:gap-10 lg:pt-20 lg:pb-10">
        <p className="eyebrow lg:col-span-3 lg:pt-2">Coverage</p>
        <p className="text-fg-3 max-w-2xl text-base leading-relaxed lg:col-span-9">
          A shortlist is only as good as the field it was drawn from. Ours is
          built on a decade of squad history, rebuilt from source rather than
          licensed wholesale.
        </p>
      </div>

      <dl className="rail grid grid-cols-1 gap-x-10 gap-y-10 pb-16 sm:grid-cols-2 lg:grid-cols-4 lg:pb-20">
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
