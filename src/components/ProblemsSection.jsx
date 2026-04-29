import { motion } from "framer-motion";
import ProblemCard from "./ProblemCard.jsx";
import SectionTitle from "./SectionTitle.jsx";
import { problems, staggerContainer } from "../data/siteData.js";

export default function ProblemsSection() {
  return (
    <section id="problems" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="section-shell">
        <SectionTitle
          eyebrow={problems.eyebrow}
          title={problems.title}
          subtitle={problems.subtitle}
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4"
        >
          {problems.items.map((item) => (
            <ProblemCard key={item.title} item={item} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
