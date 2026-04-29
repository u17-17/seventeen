import { motion } from "framer-motion";
import { fadeUp } from "../data/siteData.js";

export default function ProblemCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-card transition-colors hover:border-neutral-500 sm:p-7"
    >
      <div className="mb-9 flex items-center justify-between">
        <div className="grid h-12 w-12 place-items-center rounded-full border border-neutral-200 bg-neutral-50 text-neutral-950 transition-colors group-hover:border-neutral-950">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <span className="h-px w-16 bg-neutral-200 transition-colors group-hover:bg-neutral-950" />
      </div>
      <h3 className="text-2xl font-black leading-tight text-neutral-950">
        {item.title}
      </h3>
      <p className="mt-4 text-base leading-7 text-neutral-600">{item.content}</p>
    </motion.article>
  );
}
