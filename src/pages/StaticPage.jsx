import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, ImageIcon } from "lucide-react";
import { contact, fadeUp, staggerContainer } from "../data/siteData.js";
import { navigateToHref } from "../utils/scroll.js";

function PageIntro({ page }) {
  const Icon = page.icon;
  const showVisual = page.slug === "classroom";

  return (
    <section className="relative overflow-hidden bg-cream pb-16 pt-28 sm:pb-20 sm:pt-32">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(30,58,50,0.04)_0px,rgba(30,58,50,0.04)_1px,transparent_1px,transparent_18px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,253,247,0.76),transparent_58%)]" />

      <div className="section-shell relative">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            navigateToHref("#hero");
          }}
          className="mb-10 inline-flex min-h-11 items-center gap-2 rounded-full border border-brand/15 bg-white px-4 py-2 text-sm font-semibold text-brand transition-colors hover:border-brand hover:text-brand-deep"
        >
          <ArrowLeft size={16} />
          回到首页
        </a>

        <div className="grid gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-end">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="max-w-4xl"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-brand/70">
              {page.eyebrow}
            </p>
            <h1 className="text-4xl font-black leading-tight text-brand-deep sm:text-6xl lg:text-7xl">
              {page.title}
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 sm:text-xl sm:leading-9">
              {page.subtitle}
            </p>
          </motion.div>

          <motion.aside
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="rounded-3xl border border-brand/12 bg-white p-6 shadow-card sm:p-8"
          >
            <div className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-brand text-accent">
              <Icon size={21} />
            </div>
            <h2 className="text-xl font-bold leading-tight text-brand-deep sm:text-2xl">
              {page.intro.title}
            </h2>
            <p className="mt-4 text-base leading-7 text-neutral-600">
              {page.intro.body}
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {page.intro.points.map((point) => (
                <span
                  key={point}
                  className="rounded-full border border-brand/15 bg-cream/60 px-3 py-1.5 text-xs font-semibold text-brand"
                >
                  {point}
                </span>
              ))}
            </div>

            {showVisual && <BlackboardPlaceholder />}
          </motion.aside>
        </div>
      </div>
    </section>
  );
}

function BlackboardPlaceholder() {
  return (
    <div className="mt-7 overflow-hidden rounded-2xl border border-brand/15 bg-brand-deep p-5 text-cream/85">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-accent/80">
          Blackboard · 板书占位
        </span>
        <ImageIcon size={14} className="text-accent/60" />
      </div>
      <svg viewBox="0 0 320 130" className="h-auto w-full" fill="none">
        <text x="14" y="30" fontSize="13" fontFamily="serif" fill="#e7ede9" opacity="0.85">
          已知:  f(x) = x² − 2ax + 3
        </text>
        <text x="14" y="56" fontSize="13" fontFamily="serif" fill="#c49752" opacity="0.9">
          目标: 讨论 f(x) 在 [0,2] 上的最小值
        </text>
        <line x1="14" y1="68" x2="306" y2="68" stroke="#c49752" strokeOpacity="0.35" strokeDasharray="3 4" />
        <text x="14" y="92" fontSize="12" fontFamily="serif" fill="#e7ede9" opacity="0.65">
          ① 配方: f(x) = (x − a)² + 3 − a²
        </text>
        <text x="14" y="112" fontSize="12" fontFamily="serif" fill="#e7ede9" opacity="0.6">
          ② 分类讨论顶点位置 a 与 [0,2] 的关系
        </text>
      </svg>
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <div className="mb-10 flex items-end justify-between gap-6">
      <h2 className="max-w-3xl text-3xl font-black leading-tight text-brand-deep sm:text-5xl">
        {title}
      </h2>
      <span className="hidden h-px flex-1 bg-brand/15 md:block" />
    </div>
  );
}

function FaqSection({ section }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading title={section.title} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          className="grid gap-5 lg:grid-cols-3"
        >
          {section.items.map((item) => (
            <motion.article
              key={item.question}
              variants={fadeUp}
              className="group rounded-3xl border border-brand/10 bg-cream/40 p-6 transition-colors hover:border-accent/50 sm:p-7"
            >
              <div className="mb-4 inline-flex h-7 w-7 items-center justify-center rounded-full bg-accent/15 text-xs font-bold text-brand transition-colors group-hover:bg-accent group-hover:text-brand-deep">
                Q
              </div>
              <h3 className="text-lg font-bold leading-tight text-brand-deep sm:text-xl">
                {item.question}
              </h3>
              <p className="mt-5 text-base leading-7 text-neutral-600">
                {item.answer}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function VisualPreview({ label }) {
  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-brand/12 bg-cream p-4">
      <div className="mb-4 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand/60">
          {label}
        </span>
        <span className="h-2 w-2 rounded-full bg-accent" />
      </div>
      <div className="grid gap-2">
        <span className="h-2 w-10/12 rounded-full bg-brand/70" />
        <span className="h-2 w-7/12 rounded-full bg-brand/40" />
        <span className="h-2 w-9/12 rounded-full bg-brand/55" />
      </div>
      <div className="mt-6 grid grid-cols-3 gap-2">
        <span className="h-14 rounded-xl border border-brand/15 bg-white/80" />
        <span className="h-14 rounded-xl border border-brand/15 bg-white/80" />
        <span className="h-14 rounded-xl border border-brand/15 bg-white/80" />
      </div>
    </div>
  );
}

function IconGridSection({ section }) {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading title={section.title} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          className="grid gap-5 md:grid-cols-3"
        >
          {section.items.map((item) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                className="rounded-3xl border border-brand/10 bg-white p-6 shadow-card transition-colors hover:border-accent/50 sm:p-7"
              >
                {Icon ? (
                  <div className="mb-7 grid h-12 w-12 place-items-center rounded-full bg-brand text-accent">
                    <Icon size={20} />
                  </div>
                ) : (
                  <VisualPreview label={item.title} />
                )}
                <h3 className="text-xl font-bold leading-tight text-brand-deep sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  {item.content}
                </p>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function TimelineSection({ section }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading title={section.title} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          className="relative grid gap-5 lg:grid-cols-3"
        >
          {section.items.map((item, index) => (
            <motion.article
              key={`${item.label}-${item.title}`}
              variants={fadeUp}
              className="relative rounded-3xl border border-brand/10 bg-white p-6 shadow-card sm:p-7"
            >
              <span className="absolute left-7 top-0 -translate-y-1/2 rounded-full bg-accent px-3 py-1 text-xs font-bold text-brand-deep">
                0{index + 1}
              </span>
              <p className="mb-6 mt-2 inline-flex w-fit items-center gap-2 rounded-full border border-brand/15 bg-cream/60 px-3 py-1.5 text-xs font-semibold text-brand">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                {item.label}
              </p>
              <h3 className="text-xl font-bold leading-tight text-brand-deep sm:text-2xl">
                {item.title}
              </h3>
              <p className="mt-4 text-base leading-7 text-neutral-600">
                {item.content}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ChecklistSection({ section }) {
  return (
    <section className="bg-cream py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading title={section.title} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.16 }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {section.items.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="flex gap-4 rounded-2xl border border-brand/10 bg-white p-5"
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-accent">
                {section.items.indexOf(item) + 1}
              </span>
              <div>
                <h3 className="text-base font-bold text-brand-deep sm:text-lg">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-neutral-600">
                  {item.content}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function CaseSection({ section }) {
  return (
    <section className="bg-white py-20 sm:py-24">
      <div className="section-shell">
        <SectionHeading title={section.title} />
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          className="grid gap-6"
        >
          {section.items.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              className="rounded-3xl border border-brand/10 bg-white p-7 shadow-card sm:p-9"
            >
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-brand px-4 py-1.5 text-xs font-bold text-accent">
                  {item.subject}
                </span>
                <span className="rounded-full bg-cream/70 px-4 py-1.5 text-xs font-semibold text-brand">
                  问题类型
                </span>
              </div>
              <h3 className="text-2xl font-black leading-tight text-brand-deep sm:text-3xl lg:text-4xl">
                {item.title}
              </h3>
              <div className="mt-8 grid gap-5 lg:grid-cols-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                    问题
                  </p>
                  <p className="mt-3 text-base leading-7 text-neutral-600">
                    {item.problem}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                    方法
                  </p>
                  <p className="mt-3 text-base leading-7 text-neutral-600">
                    {item.method}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent-deep">
                    目标
                  </p>
                  <p className="mt-3 text-base leading-7 text-neutral-600">
                    {item.result}
                  </p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function renderSection(section) {
  const firstItem = section.items[0] ?? {};

  if ("question" in firstItem) return <FaqSection key={section.title} section={section} />;
  if ("problem" in firstItem) return <CaseSection key={section.title} section={section} />;
  if ("label" in firstItem) return <TimelineSection key={section.title} section={section} />;
  if (section.items.length >= 4) return <ChecklistSection key={section.title} section={section} />;

  return <IconGridSection key={section.title} section={section} />;
}

function PageCta() {
  return (
    <section className="relative overflow-hidden bg-brand-deep py-16 text-cream sm:py-20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_28%,rgba(196,151,82,0.18),transparent_45%),radial-gradient(circle_at_82%_72%,rgba(231,237,233,0.06),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(231,237,233,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(231,237,233,0.04)_1px,transparent_1px)] [background-size:48px_48px]" />

      <div className="section-shell relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent">
              Next Step
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">
              想先聊聊学生情况？
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-cream/70 sm:text-lg">
              可以先准备年级、科目、当前分数和主要问题，再预约一次学习诊断。
            </p>
          </div>
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              navigateToHref("#contact");
            }}
            className="inline-flex w-fit items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-base font-bold text-brand-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
          >
            去首页预约
            <ArrowUpRight size={18} />
          </a>
        </div>
        <p className="mt-8 text-sm font-semibold text-cream/55">
          微信号：{contact.wechatId}
        </p>
      </div>
    </section>
  );
}

export default function StaticPage({ page }) {
  return (
    <>
      <PageIntro page={page} />
      {page.sections.map(renderSection)}
      <PageCta />
    </>
  );
}
