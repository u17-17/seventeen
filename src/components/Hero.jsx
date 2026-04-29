import { motion } from "framer-motion";
import { ArrowDown, ArrowUpRight, Circle } from "lucide-react";
import HeroMaskTitle from "./HeroMaskTitle.jsx";
import { hero } from "../data/siteData.js";

function scrollToTarget(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden bg-white pt-28 sm:pt-32"
    >
      <div className="absolute inset-0 bg-dot-grid [background-size:22px_22px] opacity-[0.28]" />
      <div className="absolute left-1/2 top-24 h-px w-[86vw] -translate-x-1/2 bg-neutral-950/10" />
      <div className="section-shell relative flex min-h-[calc(100vh-7rem)] flex-col justify-center pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-neutral-200 bg-white/80 px-4 py-2 text-sm font-medium text-neutral-600 shadow-[0_10px_30px_rgba(0,0,0,0.04)]"
        >
          <Circle className="h-2.5 w-2.5 fill-neutral-950 text-neutral-950" />
          <span>{hero.subtitle}</span>
        </motion.div>

        <HeroMaskTitle
          englishTitle={hero.englishTitle}
          chineseTitle={hero.chineseTitle}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-2xl text-center sm:mt-10"
        >
          <p className="text-lg leading-8 text-neutral-600 sm:text-xl">
            {hero.description}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() => scrollToTarget("#contact")}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-neutral-950 px-6 py-3.5 text-base font-semibold text-white transition-transform duration-300 hover:-translate-y-1 hover:bg-neutral-800"
            >
              {hero.primaryCta}
              <ArrowUpRight size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollToTarget("#method")}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 py-3.5 text-base font-semibold text-neutral-950 transition-transform duration-300 hover:-translate-y-1 hover:border-neutral-950"
            >
              {hero.secondaryCta}
              <ArrowDown size={18} />
            </button>
          </div>
        </motion.div>

        <motion.button
          type="button"
          onClick={() => scrollToTarget("#about")}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mx-auto mt-16 flex items-center gap-3 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-950"
        >
          <span>{hero.scrollHint}</span>
          <span className="grid h-9 w-9 place-items-center rounded-full border border-neutral-200 bg-white">
            <ArrowDown size={16} />
          </span>
        </motion.button>
      </div>
    </section>
  );
}
