"use client";

import CountUp from "@/components/ui/count-up";

/**
 * Scale of the underlying data — coverage only, nothing about how the models
 * work. Every figure is grounded in the modelling repo's own documentation:
 *   - 37 leagues: vivaan_data.md, 2026-07-14 update ("Pi ratings now cover
 *     all 37 leagues (was 5)"; FBref parity backfill spans all leagues).
 *   - 63,700 player-seasons: MODEL_WORKINGS.txt §1, the squad-strength panel.
 *   - 266 fields: docs/SCHEMA.md header ("Total Fields: 266 input").
 *   - 8 sources: docs/DATA_FLOW.md §1 ("Eight scrapers pull data from
 *     public football data sources").
 */
const FIGURES = [
  { to: 37, suffix: "", label: "Leagues covered" },
  { to: 63700, suffix: "+", label: "Player-seasons analysed" },
  { to: 266, suffix: "", label: "Data points per player" },
  { to: 8, suffix: "", label: "Independent data sources" },
];

export default function Coverage() {
  return (
    <section className="bg-band relative z-10">
      <div className="rail rule-t pt-11 pb-8 lg:pt-14 lg:pb-9">
        <p className="eyebrow mb-4">Coverage</p>
        <p className="text-fg-3 max-w-2xl text-base leading-relaxed 2xl:max-w-3xl">
          A shortlist is only as good as the field it was drawn from. Ours is
          built on a decade of player history, rebuilt from source rather than
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
