import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/siteData.js";
import { scrollToTarget } from "../utils/scroll.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (href) => {
    setOpen(false);
    scrollToTarget(href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-stone-200/80 bg-stone-50/90 shadow-[0_12px_38px_rgba(10,13,16,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-stone-50/90 shadow-[0_8px_28px_rgba(5,8,12,0.06)] backdrop-blur-md"
      }`}
    >
      <nav className="section-shell flex h-16 items-center justify-between sm:h-[72px]">
        <button
          type="button"
          onClick={() => handleClick("#hero")}
          className="group flex items-center gap-3 text-left"
          aria-label="回到首页"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-neutral-950 text-[10px] font-black text-white transition-transform duration-300 group-hover:rotate-45">
            Y
          </span>
          <span className="text-sm font-black tracking-[0.16em] text-neutral-950">
            YAN TUTOR
          </span>
        </button>

        <div className="hidden items-center gap-1 rounded-full border border-neutral-200 bg-white/70 p-1 md:flex">
          {navItems.map((item) => (
            <button
              key={item.href}
              type="button"
              onClick={() => handleClick(item.href)}
              className="rounded-full px-4 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-950 hover:text-white"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="hidden items-center md:flex">
          <button
            type="button"
            onClick={() => handleClick("#contact")}
            className="rounded-full bg-neutral-950 px-5 py-2.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 hover:bg-neutral-800"
          >
            预约诊断
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-10 w-10 place-items-center rounded-full border border-neutral-200 bg-white text-neutral-950 md:hidden"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="border-t border-neutral-100 bg-white/96 px-5 pb-5 pt-2 shadow-card md:hidden"
        >
          <div className="grid gap-2">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => handleClick(item.href)}
                className="rounded-2xl px-4 py-3 text-left text-base font-semibold text-neutral-700 hover:bg-neutral-100"
              >
                {item.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => handleClick("#contact")}
              className="mt-2 rounded-2xl bg-neutral-950 px-4 py-3 text-left text-base font-semibold text-white"
            >
              预约诊断
            </button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
