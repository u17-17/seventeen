import { navItems, footer } from "../data/siteData.js";

function scrollToTarget(href) {
  const target = document.querySelector(href);
  if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  const CtaIcon = footer.ctaIcon;

  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <button
              type="button"
              onClick={() => scrollToTarget("#hero")}
              className="group inline-flex items-center gap-3"
            >
              <span className="grid h-10 w-10 place-items-center rounded-full bg-neutral-950 text-sm font-black text-white transition-transform duration-300 group-hover:rotate-45">
                Y
              </span>
              <span className="text-xl font-black tracking-[0.16em] text-neutral-950">
                {footer.brand}
              </span>
            </button>
            <p className="mt-5 text-lg font-semibold text-neutral-700">
              {footer.subtitle}
            </p>
            <p className="mt-2 text-base text-neutral-500">{footer.slogan}</p>
          </div>

          <div className="flex flex-wrap gap-2 lg:justify-end">
            {navItems.map((item) => (
              <button
                key={item.href}
                type="button"
                onClick={() => scrollToTarget(item.href)}
                className="inline-flex items-center gap-1 rounded-full border border-neutral-200 px-4 py-2 text-sm font-semibold text-neutral-600 transition-colors hover:border-neutral-950 hover:text-neutral-950"
              >
                {item.label}
                <CtaIcon size={14} />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-neutral-200 pt-6 text-sm text-neutral-400 sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright}</p>
          <p>Personal tutor brand page.</p>
        </div>
      </div>
    </footer>
  );
}
