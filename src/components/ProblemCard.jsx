import { motion } from "framer-motion";
import { fadeUp } from "../data/siteData.js";

export default function ProblemCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="group rounded-3xl border border-brand/10 bg-white p-6 shadow-card transition-colors hover:border-brand/40 sm:p-7"
    >
      <div className="mb-9 flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-full bg-cream text-brand transition-all duration-300 group-hover:bg-brand group-hover:text-accent">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <span className="h-px w-12 bg-brand/15 transition-all duration-300 group-hover:w-20 group-hover:bg-accent" />
      </div>
      <h3 className="text-xl font-bold leading-tight text-brand-deep sm:text-2xl">
        {item.title}
      </h3>
      <p className="mt-4 text-base leading-7 text-neutral-600">{item.content}</p>
    </motion.article>
  );
}
