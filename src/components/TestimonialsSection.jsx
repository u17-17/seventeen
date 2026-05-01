import { motion } from "framer-motion";
import { Star } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";
import { testimonials, fadeUp, staggerContainer } from "../data/siteData.js";

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="scroll-mt-24 bg-white py-24 sm:py-32">
      <div className="section-shell">
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
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {testimonials.items.map((item) => (
            <motion.article
              key={item.author}
              variants={fadeUp}
              className="rounded-[1.75rem] border border-neutral-200 bg-neutral-50 p-6 sm:p-7"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>
              <blockquote className="text-base leading-7 text-neutral-700">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-sm font-bold text-neutral-950">
                  — {item.author}
                </span>
                <span className="rounded-full bg-neutral-200 px-3 py-1 text-xs font-semibold text-neutral-600">
                  {item.tag}
                </span>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
