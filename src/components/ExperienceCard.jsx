import { motion } from "framer-motion";
import { fadeUp } from "../data/siteData.js";

export default function ExperienceCard({ item }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative overflow-hidden rounded-3xl border border-brand/10 bg-white p-7 shadow-card transition-colors hover:border-accent/40 sm:p-9"
    >
      <span className="pointer-events-none absolute right-7 top-5 bg-gradient-to-br from-accent/35 to-accent/10 bg-clip-text text-7xl font-black leading-none text-transparent sm:right-9 sm:top-6 sm:text-9xl">
        {item.number}
      </span>
      <div className="relative">
        <p className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-brand/15 bg-cream/50 px-4 py-1.5 text-xs font-semibold text-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {item.time}
        </p>
        <h3 className="max-w-[70%] text-2xl font-black leading-tight text-brand-deep sm:max-w-none sm:text-4xl">
          {item.title}
        </h3>
        <p className="mt-5 max-w-3xl text-base leading-8 text-neutral-600 sm:text-lg sm:leading-9">
          {item.content}
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-brand/10 bg-cream/40 px-3 py-1.5 text-xs font-semibold text-brand"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
