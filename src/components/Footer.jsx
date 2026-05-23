import { ArrowUpRight } from "lucide-react";
import { navItems, footer } from "../data/siteData.js";
import { pageNavItems } from "../data/pageData.js";
import { navigateToHref } from "../utils/scroll.js";

export default function Footer() {
  const primary = navItems.filter((item) => item.href !== "#contact");

  return (
    <footer className="relative overflow-hidden border-t border-brand/10 bg-brand-deep py-14 text-cream">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(196,151,82,0.10),transparent_45%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(231,237,233,0.03)_1px,transparent_1px)] [background-size:100%_44px]" />

      <div className="section-shell relative">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_auto]">
          {/* 品牌 */}
          <div>
            <a
              href="#hero"
              onClick={(event) => {
                event.preventDefault();
                navigateToHref("#hero");
              }}
              className="group inline-flex min-h-11 items-center gap-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-sm font-black text-brand-deep transition-transform duration-300 group-hover:rotate-45">
                Y
              </span>
              <span className="text-lg font-black tracking-[0.16em] text-cream">
                {footer.brand}
              </span>
            </a>
            <p className="mt-5 max-w-md text-base font-semibold text-cream/80">
              {footer.subtitle}
            </p>
            <p className="mt-2 max-w-md text-sm leading-7 text-cream/55">
              {footer.slogan}
            </p>
          </div>

          {/* 导航 */}
          <div className="grid grid-cols-2 gap-x-6 gap-y-2">
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">
                首页章节
              </p>
              <ul className="space-y-2">
                {primary.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateToHref(item.href);
                      }}
                      className="text-sm font-medium text-cream/70 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">
                独立页面
              </p>
              <ul className="space-y-2">
                {pageNavItems.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      onClick={(event) => {
                        event.preventDefault();
                        navigateToHref(item.href);
                      }}
                      className="text-sm font-medium text-cream/70 transition-colors hover:text-accent"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:text-right">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-accent/80">
              下一步
            </p>
            <a
              href="#contact"
              onClick={(event) => {
                event.preventDefault();
                navigateToHref("#contact");
              }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-brand-deep transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-soft"
            >
              预约学习诊断
              <ArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-cream/10 pt-6 text-sm text-cream/50 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>Personal tutor brand page.</p>
        </div>
      </div>
    </footer>
  );
}
