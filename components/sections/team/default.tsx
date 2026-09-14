"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

/** Names and photographs come from the modelling repo; roles from the founders. */
const PEOPLE = [
  { name: "Ethan Rajkumar", role: "CEO", photo: "/team-ethan.jpg" },
  { name: "Vivaan Jhaveri", role: "CTO", photo: "/team-vivaan.jpg" },
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

      <div className="rail grid grid-cols-1 gap-8 py-11 sm:grid-cols-3 lg:py-14">
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
            className="border-hairline bg-panel mx-auto w-full max-w-[260px] border"
          >
            <div className="bg-well relative aspect-[4/5] w-full overflow-hidden">
              <img
                src={person.photo}
                alt={person.name}
                loading="lazy"
                className="size-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>

            <div className="border-hairline border-t px-5 py-4">
              <h3 className="display-md text-fg">{person.name}</h3>
              <div className="mt-2 flex items-center gap-2.5">
                <span className="bg-mark size-1.5" />
                <span className="text-fg-3 font-mono text-[11px] tracking-[0.16em] uppercase">
                  {person.role}
                </span>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
