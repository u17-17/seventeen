import { useState } from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";
import { about, fadeUp, staggerContainer } from "../data/siteData.js";

const AVATAR_SRC = "/teacher-avatar.jpg";

export default function AboutSection() {
  const [avatarLoaded, setAvatarLoaded] = useState(true);

  return (
    <section
      id="about"
      className="relative scroll-mt-24 overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(30,58,50,0.04)_0px,rgba(30,58,50,0.04)_1px,transparent_1px,transparent_18px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,253,247,0.7),transparent_58%)]" />

      <div className="section-shell relative grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <SectionTitle eyebrow={about.eyebrow} title={about.title} />

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            className="mt-10 flex flex-col items-start gap-5"
          >
            <div className="relative">
              <div className="absolute -inset-2 rounded-full bg-gradient-to-br from-accent/30 via-transparent to-brand/20 blur-md" />
              <div className="relative grid h-44 w-44 place-items-center overflow-hidden rounded-full border-[3px] border-accent bg-brand-mist shadow-brand">
                {avatarLoaded ? (
                  <img
                    src={AVATAR_SRC}
                    alt="闫老师"
                    onError={() => setAvatarLoaded(false)}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-brand text-cream">
                    <User size={36} strokeWidth={1.4} />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.2em] opacity-70">
                      Photo
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div>
              <p className="text-lg font-bold text-brand-deep">闫老师</p>
              <p className="mt-1 text-sm text-neutral-500">
                Math / Physics · 河北邯郸
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid gap-5"
        >
          <motion.div
            variants={fadeUp}
            className="rounded-3xl border border-brand/10 bg-white p-7 shadow-card sm:p-9"
          >
            <p className="text-lg leading-9 text-neutral-700 sm:text-xl sm:leading-10">
              {about.body}
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {about.highlights.map((item) => (
                <div
                  key={item}
                  className="rounded-2xl border-l-2 border-accent bg-cream/60 px-4 py-4 text-sm font-bold text-brand-deep"
                >
                  {item}
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
          >
            {about.stats.map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="group flex items-center gap-3 rounded-2xl border border-brand/10 bg-white p-4 shadow-[0_8px_22px_rgba(20,39,31,0.04)] transition-colors hover:border-brand/40"
                >
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand text-cream transition-colors group-hover:bg-accent group-hover:text-brand-deep">
                    <Icon size={17} />
                  </div>
                  <p className="text-sm font-bold leading-snug text-brand-deep">
                    {item.label}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
