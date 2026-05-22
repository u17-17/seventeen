import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, MessageCircle, Search } from "lucide-react";
import SectionTitle from "./SectionTitle.jsx";
import ConsultationForm from "./forms/ConsultationForm.jsx";
import { copyTextWithFallback } from "../services/submissions.js";
import { contact, fadeUp, staggerContainer } from "../data/siteData.js";

export default function ContactSection() {
  const [qrLoaded, setQrLoaded] = useState(true);
  const [wechatCopyLabel, setWechatCopyLabel] = useState("");

  const handleCopyWechat = async () => {
    const copied = await copyTextWithFallback(contact.wechatId);
    setWechatCopyLabel(copied ? "微信号已复制" : "请手动复制");
    setTimeout(() => setWechatCopyLabel(""), 2200);
  };

  return (
    <section
      id="contact"
      className="relative scroll-mt-24 overflow-hidden bg-cream px-0 py-24 sm:py-32"
    >
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(30,58,50,0.035)_0px,rgba(30,58,50,0.035)_1px,transparent_1px,transparent_18px)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_8%,rgba(255,253,247,0.7),transparent_55%)]" />

      <div className="section-shell relative">
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
          className="mt-14 grid gap-6 lg:grid-cols-[1.12fr_0.88fr] lg:items-start"
        >
          <motion.div variants={fadeUp}>
            <ConsultationForm variant="embedded" />
          </motion.div>

          <motion.aside
            variants={fadeUp}
            className="rounded-3xl border border-brand/12 bg-white p-6 shadow-soft sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-[180px_1fr] sm:items-center lg:grid-cols-1">
              <div className="grid aspect-square w-full max-w-[260px] place-items-center rounded-3xl border border-dashed border-brand/25 bg-cream/60 p-4">
                {qrLoaded ? (
                  <img
                    src={contact.qrPath}
                    alt="微信二维码"
                    onError={() => setQrLoaded(false)}
                    className="h-full w-full rounded-2xl object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 rounded-2xl bg-white text-center">
                    <div className="grid h-14 w-14 place-items-center rounded-full border-2 border-dashed border-brand/30">
                      <span className="text-2xl font-black text-brand/40">?</span>
                    </div>
                    <p className="text-sm font-semibold leading-6 text-brand/50">
                      {contact.qrFallback}
                    </p>
                  </div>
                )}
              </div>

              <div>
                <div className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-3 py-1.5 text-xs font-semibold text-brand">
                  <MessageCircle size={14} />
                  微信咨询
                </div>
                <h3 className="mt-4 text-xl font-bold leading-tight text-brand-deep sm:text-2xl">
                  填写后复制咨询信息，再通过微信发给我
                </h3>
                <p className="mt-4 text-base leading-7 text-neutral-600">
                  {contact.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-neutral-500">
                  微信号：<span className="font-bold text-brand-deep">{contact.wechatId}</span>
                </p>
              </div>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleCopyWechat}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3.5 text-base font-semibold text-cream transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-deep hover:shadow-brand"
              >
                <Copy size={17} />
                {wechatCopyLabel || "复制微信号"}
              </button>
              <div className="inline-flex items-center justify-center gap-2 rounded-full border border-brand/20 bg-white px-5 py-3.5 text-base font-semibold text-brand-deep">
                <Search size={17} />
                微信搜索添加
              </div>
            </div>

            <div className="mt-8 rounded-3xl bg-cream/70 p-5">
              <h4 className="text-base font-bold text-brand-deep sm:text-lg">
                {contact.infoTitle}
              </h4>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {contact.infoItems.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl border border-brand/10 bg-white px-4 py-3"
                  >
                    <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-accent">
                      {index + 1}
                    </span>
                    <span className="text-sm font-semibold text-neutral-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {contact.extras.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.label}
                    className="rounded-2xl border border-brand/10 bg-white p-4"
                  >
                    <Icon className="mb-4 h-5 w-5 text-brand" />
                    <p className="text-sm font-semibold leading-6 text-neutral-700">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.aside>
        </motion.div>
      </div>
    </section>
  );
}
