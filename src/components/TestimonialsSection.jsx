import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";
import { testimonials, fadeUp, staggerContainer } from "../data/siteData.js";

export default function TestimonialsSection() {
  const [featured, ...rest] = testimonials.items;

  return (
    <section
      id="testimonials"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,253,247,0.6),transparent_55%)]" />

      <div className="section-shell relative">
        <SectionTitle
          eyebrow={testimonials.eyebrow}
          title={testimonials.title}
          subtitle={testimonials.subtitle}
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="mt-14 grid gap-6"
        >
          {/* 大引文 */}
          <motion.figure
            variants={fadeUp}
            className="relative mx-auto max-w-4xl rounded-[2rem] border border-brand/12 bg-white px-7 py-12 shadow-card sm:px-14 sm:py-14"
          >
            <Quote
              className="absolute left-6 top-6 text-accent/30 sm:left-10 sm:top-8"
              size={56}
              strokeWidth={1.4}
            />
            <div className="mb-5 flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className="fill-accent text-accent"
                />
              ))}
            </div>
            <blockquote className="text-center text-xl font-medium leading-9 text-brand-deep sm:text-2xl sm:leading-[2.6rem]">
              "{featured.quote}"
            </blockquote>
            <figcaption className="mt-7 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-brand/30" />
              <span className="text-sm font-bold text-brand">
                {featured.author}
              </span>
              <span className="rounded-full bg-brand/8 px-3 py-1 text-xs font-semibold text-brand">
                {featured.tag}
              </span>
              <span className="h-px w-10 bg-brand/30" />
            </figcaption>
          </motion.figure>

          {/* 小卡 */}
          <div className="grid gap-5 md:grid-cols-2">
            {rest.map((item) => (
              <motion.article
                key={`${item.author}-${item.quote}`}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-brand/10 bg-white p-6 transition-colors hover:border-accent/50 sm:p-7"
              >
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-accent text-accent"
                      />
                    ))}
                  </div>
                  <span className="rounded-full bg-brand/8 px-3 py-1 text-xs font-semibold text-brand">
                    {item.tag}
                  </span>
                </div>
                <blockquote className="text-base leading-7 text-neutral-700">
                  "{item.quote}"
                </blockquote>
                <p className="mt-5 text-sm font-bold text-brand-deep">
                  — {item.author}
                </p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
