import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { fadeUp, methods, staggerContainer } from "../data/siteData.js";

export default function MethodSection() {
  return (
    <section
      id="method"
      className="relative scroll-mt-24 overflow-hidden bg-brand-deep py-24 text-cream sm:py-32"
    >
      {/* 背景纹理 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(196,151,82,0.16),transparent_42%),radial-gradient(circle_at_82%_72%,rgba(231,237,233,0.08),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(231,237,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(231,237,233,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(231,237,233,0.06)_1px,transparent_0)] [background-size:32px_32px] opacity-40" />

      <div className="section-shell relative">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-end"
        >
          <motion.div variants={fadeUp} className="max-w-xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              {methods.eyebrow}
            </p>
            <h2 className="text-4xl font-black leading-tight text-cream sm:text-5xl lg:text-6xl">
              {methods.title}
            </h2>
            <p className="mt-5 text-lg leading-8 text-cream/70 sm:text-xl">
              {methods.subtitle}
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-br from-accent/12 via-transparent to-transparent p-7 sm:p-9"
          >
            <span className="absolute -left-2 top-7 h-12 w-1 rounded-full bg-accent" />
            <p className="text-2xl font-bold leading-snug text-cream sm:text-3xl">
              {methods.emphasis}
            </p>
          </motion.div>
        </motion.div>

        {/* 横向时间轴 */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-16"
        >
          {/* 连接线 */}
          <div className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent lg:block" />

          <div className="grid gap-6 lg:grid-cols-4 lg:gap-5">
            {methods.steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.number}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="relative"
                >
                  {/* 节点圆点 */}
                  <div className="relative mb-6 flex items-center justify-between lg:mb-7">
                    <div className="relative z-10 grid h-14 w-14 place-items-center rounded-full border-2 border-accent bg-brand-deep text-accent shadow-[0_0_0_4px_rgba(20,39,31,1)]">
                      <Icon size={22} strokeWidth={1.8} />
                    </div>
                    <span className="text-5xl font-black leading-none text-cream/10">
                      {step.number}
                    </span>
                  </div>

                  <div className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 backdrop-blur-sm transition-colors hover:border-accent/40 sm:p-6">
                    <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">
                      <span>STEP {step.number}</span>
                      {index < methods.steps.length - 1 && (
                        <ArrowRight size={12} className="opacity-50" />
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-cream sm:text-2xl">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-cream/65">
                      {step.description}
                    </p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
