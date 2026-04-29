import { motion } from "framer-motion";
import ExperienceCard from "./ExperienceCard.jsx";
import SectionTitle from "./SectionTitle.jsx";
import { experiences, staggerContainer } from "../data/siteData.js";

export default function ExperienceSection() {
  return (
    <section id="experience" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle
          eyebrow={experiences.eyebrow}
          title={experiences.title}
          subtitle={experiences.subtitle}
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="mt-14 grid gap-6"
        >
          {experiences.items.map((item) => (
            <ExperienceCard key={item.number} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
