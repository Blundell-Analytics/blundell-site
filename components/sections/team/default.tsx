"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

/** Names and photographs come from the modelling repo; roles from the founders. */
const PEOPLE = [
  { name: "Vivaan Jhaveri", role: "CTO", photo: "/team-vivaan.jpg" },
  { name: "Ethan Rajkumar", role: "CEO", photo: "/team-ethan.jpg" },
  { name: "Nathan Rajkumar", role: "CFO", photo: "/team-nathan.jpg" },
];

export default function Team() {
  return (
    <section id="team" className="bg-ink relative z-10">
      <SectionHeader
        label="Team"
        title="Who you would be working with."
        lead="Blundell Analytics is deliberately small. The people who build the work are the people who present it."
      />

      <div className="grid grid-cols-1 md:grid-cols-3">
        {PEOPLE.map((person, i) => (
          <motion.article
            key={person.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.5,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className={`border-hairline flex flex-col ${
              i > 0 ? "border-t md:border-t-0 md:border-l" : ""
            }`}
          >
            <div className="rail pt-10 lg:pt-12">
              <div className="bg-well relative size-28 overflow-hidden lg:size-32">
                <img
                  src={person.photo}
                  alt={person.name}
                  loading="lazy"
                  width={640}
                  height={640}
                  className="size-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
                />
              </div>
            </div>

            <div className="rail pt-7 pb-10 lg:pb-12">
              <div className="mb-5 flex items-center gap-3">
                <span className="bg-mark size-1.5" />
                <span className="text-fg-3 font-mono text-[11px] tracking-[0.16em] uppercase">
                  {person.role}
                </span>
              </div>

              <h3 className="display-md text-fg mb-4">{person.name}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
