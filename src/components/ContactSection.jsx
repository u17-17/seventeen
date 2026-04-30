import { useState } from "react";
import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle.jsx";
import { contact, fadeUp, staggerContainer } from "../data/siteData.js";

export default function ContactSection() {
  const [qrLoaded, setQrLoaded] = useState(true);

  return (
    <section
      id="contact"
      className="scroll-mt-24 bg-neutral-50 px-0 py-24 sm:py-32"
    >
      <div className="section-shell">
        <SectionTitle
          eyebrow={contact.eyebrow}
          title={contact.title}
          subtitle={contact.subtitle}
          align="center"
        />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.18 }}
          className="mt-14 grid gap-6 rounded-[2.25rem] border border-neutral-200 bg-white p-5 shadow-soft sm:p-8 lg:grid-cols-[1.05fr_0.95fr] lg:p-10"
        >
          <motion.div variants={fadeUp} className="rounded-[1.75rem] bg-neutral-50 p-6 sm:p-8">
            <h3 className="text-2xl font-black text-neutral-950">
              {contact.infoTitle}
            </h3>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {contact.infoItems.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-neutral-950 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-base font-semibold text-neutral-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>
            <p className="mt-7 text-lg leading-8 text-neutral-600">
              {contact.description}
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {contact.extras.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-neutral-200 bg-white p-4"
                  >
                    <Icon className="mb-4 h-5 w-5 text-neutral-950" />
                    <p className="text-sm font-bold leading-6 text-neutral-700">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col justify-between rounded-[1.75rem] border border-neutral-200 bg-white p-6 sm:p-8"
          >
            <div>
              <div className="mx-auto grid aspect-square w-full max-w-[320px] place-items-center rounded-[1.75rem] border border-dashed border-neutral-300 bg-neutral-50 p-5">
                {qrLoaded ? (
                  <img
                    src={contact.qrPath}
                    alt="微信二维码"
                    onError={() => setQrLoaded(false)}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-white text-center text-base font-semibold leading-7 text-neutral-400">
                    {contact.qrFallback}
                  </div>
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {contact.buttons.map((button, index) => {
                const Icon = button.icon;
                return (
                  <a
                    key={button.label}
                    href={button.href}
                    className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3.5 text-base font-semibold transition-transform duration-300 hover:-translate-y-1 ${
                      index === 0
                        ? "bg-neutral-950 text-white hover:bg-neutral-800"
                        : "border border-neutral-300 bg-white text-neutral-950 hover:border-neutral-950"
                    }`}
                  >
                    {button.label}
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
