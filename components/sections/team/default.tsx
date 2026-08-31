"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

/**
 * Names and photographs are taken from the modelling repo (the report author
 * line and reports/presentation/photos).
 *
 * `role` and `bio` are PLACEHOLDERS — there is no verified source for either,
 * and inventing them would put false claims about real people on a live site.
 * Replace both for each person before this ships.
 */
const PEOPLE = [
  {
    name: "Vivaan Jhaveri",
    photo: "/team-vivaan.jpg",
    role: "TODO — role",
    bio: "TODO — two or three sentences. What you did before this, what you own here, and the thing that makes a club comfortable handing you a recruitment brief. Specific beats impressive.",
  },
  {
    name: "Ethan Rajkumar",
    photo: "/team-ethan.jpg",
    role: "TODO — role",
    bio: "TODO — two or three sentences, same shape as above.",
  },
  {
    name: "Nathan Rajkumar",
    photo: "/team-nathan.jpg",
    role: "TODO — role",
    bio: "TODO — two or three sentences, same shape as above.",
  },
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

              <p className="text-fg-3 max-w-md text-sm leading-relaxed">
                {person.bio}
              </p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
