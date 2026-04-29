import { motion } from "framer-motion";
import { fadeUp } from "../data/siteData.js";

export default function ExperienceCard({ item }) {
  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white p-7 shadow-card transition-colors hover:border-neutral-500 sm:p-9"
    >
      <span className="pointer-events-none absolute right-7 top-5 text-8xl font-black leading-none text-neutral-100 sm:right-9 sm:top-6 sm:text-9xl">
        {item.number}
      </span>
      <div className="relative">
        <p className="mb-5 w-fit rounded-full border border-neutral-200 bg-neutral-50 px-4 py-2 text-sm font-bold text-neutral-500">
          {item.time}
        </p>
        <h3 className="max-w-[70%] text-3xl font-black leading-tight text-neutral-950 sm:max-w-none sm:text-4xl">
          {item.title}
        </h3>
        <p className="mt-5 max-w-3xl text-lg leading-9 text-neutral-600">
          {item.content}
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-neutral-100 px-4 py-2 text-sm font-semibold text-neutral-600"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
