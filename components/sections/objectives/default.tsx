"use client";

import { motion } from "framer-motion";

const OBJECTIVES = [
  {
    n: "01",
    title: "Tactical Fit",
    body: "How the player performs in your system, your pressing height and your build-up shape — not in the abstract.",
    weight: "30%",
  },
  {
    n: "02",
    title: "Trajectory",
    body: "Age-adjusted performance curve across every competitive minute, so improvement is separated from a hot streak.",
    weight: "20%",
  },
  {
    n: "03",
    title: "Risk",
    body: "Injury record, minutes load, adaptation history and league step-up difficulty, priced as a discount to the score.",
    weight: "20%",
  },
  {
    n: "04",
    title: "Availability",
    body: "Contract position, release terms, agent posture and the realistic probability the deal actually closes.",
    weight: "15%",
  },
  {
    n: "05",
    title: "Value",
    body: "Fee and wage benchmarked against comparable transactions, then tested against resale and amortisation.",
    weight: "15%",
  },
];

export default function Objectives() {
  return (
    <section id="scoring" className="bg-ink relative z-10 py-16 lg:py-24">
      <div className="shell px-6 lg:px-8">
        <div className="mb-10 lg:mb-14">
          <p className="eyebrow mb-4">The Composite Score</p>
          <h2 className="display-lg max-w-2xl text-white">
            Five objectives, weighted to your brief.
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5">
          {OBJECTIVES.map((o, i) => (
            <motion.article
              key={o.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="flex h-full flex-col bg-zinc-900 p-8"
            >
              <div className="mb-6 flex items-center gap-2.5">
                <span className="bg-mark size-1.5" />
                <span className="font-mono text-xs text-neutral-400">
                  {o.n}
                </span>
              </div>

              <h3 className="mb-3 text-xl font-medium text-white">{o.title}</h3>
              <p className="flex-grow text-sm leading-relaxed text-neutral-400">
                {o.body}
              </p>

              <div className="mt-8 border-t border-white/10 pt-4">
                <div className="cell-label">Default weight</div>
                <div className="cell-value">{o.weight}</div>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-neutral-500">
          Weights are set per engagement. A club buying for resale and a club
          buying for a title run are not solving the same problem, and the score
          should not pretend otherwise.
        </p>
      </div>
    </section>
  );
}
