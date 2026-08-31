"use client";

/**
 * Scale of the underlying data. Figures come from the modelling repo's own
 * documentation — keep them to coverage, never to how the models work.
 */
const FIGURES = [
  { value: "16+", label: "Leagues covered" },
  { value: "2015—2025", label: "Seasons of history" },
  { value: "63,700", label: "Player-seasons held" },
  { value: "1,056", label: "Team-seasons held" },
];

export default function Coverage() {
  return (
    <section className="bg-ink relative z-10">
      <div className="rail rule-t py-10 lg:py-12">
        <p className="eyebrow mb-3">Behind it</p>
        <p className="text-fg-3 max-w-2xl text-base leading-relaxed">
          A shortlist is only as good as the field it was drawn from. Ours is
          built on a decade of squad history, rebuilt from source rather than
          licensed wholesale.
        </p>
      </div>

      <dl className="rule-t grid grid-cols-2 lg:grid-cols-4">
        {FIGURES.map((f, i) => (
          <div
            key={f.label}
            className={`rail border-hairline py-10 lg:py-12 ${
              i % 2 === 1 ? "border-l" : ""
            } ${i < 2 ? "border-b lg:border-b-0" : ""} ${
              i === 2 ? "lg:border-l" : ""
            }`}
          >
            <dd className="display-md text-fg mb-2 tabular-nums">{f.value}</dd>
            <dt className="cell-label">{f.label}</dt>
          </div>
        ))}
      </dl>
    </section>
  );
}
