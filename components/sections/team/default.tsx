"use client";

import { motion } from "framer-motion";

import { SectionHeader } from "@/components/ui/section";

/** Names and photographs come from the modelling repo; roles from the founders. */
const PEOPLE = [
  {
    name: "Ethan Rajkumar",
    role: "CEO",
    photo: "/team-ethan.jpg",
    linkedin: "https://www.linkedin.com/in/ethanrajkumar/",
  },
  {
    name: "Vivaan Jhaveri",
    role: "CTO",
    photo: "/team-vivaan.jpg",
    linkedin: "https://www.linkedin.com/in/vivaan-jhaveri-892588230/",
  },
  {
    name: "Nathan Rajkumar",
    role: "CFO",
    photo: "/team-nathan.jpg",
    linkedin: "https://www.linkedin.com/in/nathanrajkumar9/",
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

      <div className="rail grid grid-cols-1 gap-8 pb-11 sm:grid-cols-3 lg:pb-14">
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
            className="border-hairline bg-panel mx-auto w-full max-w-[280px] border"
          >
            <div className="bg-well relative aspect-[7/8] w-full overflow-hidden">
              <img
                src={person.photo}
                alt={person.name}
                loading="lazy"
                className="size-full object-cover object-top grayscale transition-all duration-700 hover:grayscale-0"
              />
            </div>

            <div className="border-hairline border-t px-5 py-4">
              <h3 className="display-md text-fg whitespace-nowrap">
                {person.name}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <span className="text-mark font-mono text-[11px] tracking-[0.16em] uppercase">
                  {person.role}
                </span>
                <a
                  href={person.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${person.name} on LinkedIn`}
                  className="text-fg-4 hover:text-fg shrink-0 transition-colors"
                >
                  <svg viewBox="0 0 16 16" fill="currentColor" className="size-3.5">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
                  </svg>
                </a>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
