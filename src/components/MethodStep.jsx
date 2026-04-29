import { motion } from "framer-motion";
import { fadeUp } from "../data/siteData.js";

export default function MethodStep({ step, isLast }) {
  const Icon = step.icon;

  return (
    <motion.article
      variants={fadeUp}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-[1.75rem] border border-neutral-200 bg-white p-6 shadow-[0_16px_42px_rgba(15,15,15,0.05)] transition-colors hover:border-neutral-500 sm:p-7"
    >
      {!isLast && (
        <div className="absolute left-10 top-full hidden h-10 w-px bg-neutral-200 lg:block" />
      )}
      <div className="mb-8 flex items-start justify-between gap-4">
        <span className="text-5xl font-black leading-none text-neutral-200">
          {step.number}
        </span>
        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-neutral-950 text-white">
          <Icon size={19} />
        </div>
      </div>
      <h3 className="text-2xl font-black text-neutral-950">{step.title}</h3>
      <p className="mt-4 text-base leading-7 text-neutral-600">
        {step.description}
      </p>
    </motion.article>
  );
}
