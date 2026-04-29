import { motion } from "framer-motion";
import MethodStep from "./MethodStep.jsx";
import SectionTitle from "./SectionTitle.jsx";
import { fadeUp, methods, staggerContainer } from "../data/siteData.js";

export default function MethodSection() {
  return (
    <section id="method" className="scroll-mt-24 bg-neutral-50 py-24 sm:py-32">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
          <SectionTitle
            eyebrow={methods.eyebrow}
            title={methods.title}
            subtitle={methods.subtitle}
          />
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="rounded-[2rem] border border-neutral-200 bg-white p-6 shadow-card sm:p-8"
          >
            <p className="text-2xl font-black leading-snug text-neutral-950 sm:text-3xl">
              {methods.emphasis}
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          className="mt-14 grid gap-5 lg:grid-cols-4"
        >
          {methods.steps.map((step, index) => (
            <MethodStep
              key={step.number}
              step={step}
              isLast={index === methods.steps.length - 1}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
