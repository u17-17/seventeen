import { motion } from "framer-motion";
import { fadeUp } from "../data/siteData.js";

export default function SectionTitle({
  eyebrow,
  title,
  subtitle,
  align = "left",
  tone = "light",
}) {
  const isCenter = align === "center";
  const isDark = tone === "dark";

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}
    >
      {eyebrow && (
        <p
          className={`mb-4 text-xs font-semibold uppercase tracking-[0.28em] ${
            isDark ? "text-accent" : "text-brand/70"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`text-4xl font-black leading-tight sm:text-5xl lg:text-6xl ${
          isDark ? "text-cream" : "text-brand-deep"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-5 text-lg leading-8 sm:text-xl ${
            isDark ? "text-cream/70" : "text-neutral-600"
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
