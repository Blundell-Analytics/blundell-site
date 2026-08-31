"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-ink relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="rail border-hairline py-14 lg:col-span-5 lg:border-r lg:py-20">
          <p className="eyebrow mb-6">About</p>
          <h2 className="display-lg text-fg max-w-md">
            Built for the people who have to justify the signing.
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="rail border-hairline space-y-6 border-t py-14 lg:col-span-7 lg:border-t-0 lg:py-20"
        >
          <p className="text-fg-2 max-w-2xl text-base leading-relaxed">
            Blundell Analytics is a quantitative football consultancy. We work
            with clubs that treat recruitment the way they treat any other use
            of capital — where a signing competes against every alternative use
            of the same money, and somebody has to defend the decision in a
            room.
          </p>
          <p className="text-fg-3 max-w-2xl text-base leading-relaxed">
            We are not a data feed and we are not a video platform. You give us
            a brief — a position, a budget, a way of playing — and we return a
            ranked shortlist with the reasoning attached, in a format you can
            put in front of a sporting director without translating it first.
            The modelling is ours. The argument stays yours to make.
          </p>
          <p className="text-fg-3 max-w-2xl text-base leading-relaxed">
            We would rather be useful than impressive. Our work is built to
            narrow a market of thousands to a shortlist worth watching, and to
            be candid about where it is uncertain. It will not tell you which
            signing is guaranteed to work, and we will not claim otherwise.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
