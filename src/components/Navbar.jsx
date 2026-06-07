import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems } from "../data/siteData.js";
import { pageNavItems } from "../data/pageData.js";
import { navigateToHref } from "../utils/scroll.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const mobilePanelRef = useRef(null);
  const homeNavItems = navItems.filter((item) => item.href !== "#contact");
  const desktopItems = [...homeNavItems, ...pageNavItems];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handlePointer = (event) => {
      if (mobilePanelRef.current && !mobilePanelRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    const handleKey = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const handleClick = (href) => {
    setOpen(false);
    navigateToHref(href);
  };

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-stone-200/70 bg-cream/85 shadow-[0_12px_38px_rgba(20,39,31,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-cream/70 backdrop-blur-md"
      }`}
    >
      <nav className="section-shell flex h-16 items-center justify-between sm:h-[72px]">
        <a
          href="#hero"
          onClick={(event) => {
            event.preventDefault();
            handleClick("#hero");
          }}
          className="group flex min-h-11 items-center gap-3 text-left"
          aria-label="回到首页"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-[10px] font-black text-cream transition-transform duration-300 group-hover:rotate-45">
            Y
          </span>
          <span className="text-sm font-black tracking-[0.16em] text-brand-deep">
            YAN TUTOR
          </span>
        </a>

        <div className="hidden items-center gap-0.5 rounded-full border border-brand/10 bg-white/70 p-1 lg:flex">
          {desktopItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                handleClick(item.href);
              }}
              className="min-h-10 rounded-full px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:bg-brand hover:text-cream"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center lg:flex">
          <a
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              handleClick("#contact");
            }}
            className="btn-brand"
          >
            预约诊断
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="grid h-11 w-11 place-items-center rounded-full border border-brand/15 bg-white text-brand-deep lg:hidden"
          aria-label={open ? "关闭导航" : "打开导航"}
          aria-expanded={open}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={mobilePanelRef}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-brand/10 bg-white/95 px-5 pb-5 pt-2 shadow-card lg:hidden"
          >
            <div className="grid gap-1.5">
              {homeNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleClick(item.href);
                  }}
                  className="rounded-2xl px-4 py-3 text-left text-base font-semibold text-neutral-700 hover:bg-cream"
                >
                  {item.label}
                </a>
              ))}
              <div className="my-2 h-px bg-neutral-100" />
              {pageNavItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    handleClick(item.href);
                  }}
                  className="rounded-2xl px-4 py-3 text-left text-base font-semibold text-neutral-700 hover:bg-cream"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(event) => {
                  event.preventDefault();
                  handleClick("#contact");
                }}
                className="mt-2 rounded-2xl bg-brand px-4 py-3 text-left text-base font-semibold text-cream hover:bg-brand-deep"
              >
                预约诊断
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
