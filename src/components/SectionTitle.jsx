import { motion } from "framer-motion";
import { fadeUp } from "../data/siteData.js";

export default function SectionTitle({ eyebrow, title, subtitle, align = "left" }) {
  const isCenter = align === "center";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow && (
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-neutral-400">
          {eyebrow}
        </p>
      )}
      <h2 className="text-4xl font-black leading-tight text-neutral-950 sm:text-5xl lg:text-6xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-5 text-lg leading-8 text-neutral-600 sm:text-xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
