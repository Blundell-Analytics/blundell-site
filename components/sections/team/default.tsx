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

      <div className="rail grid grid-cols-1 gap-y-10 py-11 sm:grid-cols-3 sm:gap-x-6 lg:py-14">
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
            className="flex flex-col items-center px-6 py-4 text-center"
          >
            <div className="border-hairline bg-well relative size-32 overflow-hidden border lg:size-36">
              <img
                src={person.photo}
                alt={person.name}
                loading="lazy"
                className="size-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>

            <h3 className="display-md text-fg mt-5">{person.name}</h3>
            <div className="mt-2 flex items-center gap-2.5">
              <span className="bg-mark size-1.5" />
              <span className="text-fg-3 font-mono text-[11px] tracking-[0.16em] uppercase">
                {person.role}
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
