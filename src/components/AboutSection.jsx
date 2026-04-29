import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { about, fadeUp, staggerContainer } from "../data/siteData.js";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-[#f7f7f5] py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(0,0,0,0.028)_0px,rgba(0,0,0,0.028)_1px,transparent_1px,transparent_18px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(255,255,255,0.72),transparent_58%)]" />
      <div className="section-shell relative grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <SectionTitle eyebrow={about.eyebrow} title={about.title} />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="grid gap-5"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-card sm:p-9"
          >
            <p className="text-xl leading-10 text-neutral-700">{about.body}</p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-4 text-base font-bold text-neutral-950"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
          >
            {about.stats.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.25 }}
                  className="group rounded-3xl border border-neutral-200 bg-white p-5 shadow-[0_12px_30px_rgba(15,15,15,0.04)] transition-colors hover:border-neutral-400"
                >
                  <div className="mb-6 grid h-11 w-11 place-items-center rounded-full bg-neutral-950 text-white">
                    <Icon size={19} />
                  </div>
                  <p className="text-lg font-bold leading-7 text-neutral-950">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
