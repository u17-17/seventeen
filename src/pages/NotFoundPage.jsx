import { ArrowLeft, BookOpen } from "lucide-react";
import { notFoundPage } from "../data/pageData.js";

export default function NotFoundPage() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-cream pb-20 pt-36 sm:pb-28 sm:pt-44">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(30,58,50,0.04)_0px,rgba(30,58,50,0.04)_1px,transparent_1px,transparent_18px)]" />
      <div className="section-shell relative">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand/70">
          {notFoundPage.eyebrow}
        </p>
        <div className="mt-5 max-w-3xl border-l-4 border-accent pl-5 sm:pl-8">
          <h1 className="text-4xl font-black leading-tight text-brand-deep sm:text-6xl">
            {notFoundPage.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            {notFoundPage.description}
          </p>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href={notFoundPage.primaryLink.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-bold text-cream transition-colors hover:bg-brand-deep"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            {notFoundPage.primaryLink.label}
          </a>
          <a
            href={notFoundPage.secondaryLink.href}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-brand/20 bg-white px-5 py-3 text-sm font-bold text-brand-deep transition-colors hover:border-brand"
          >
            <BookOpen size={17} aria-hidden="true" />
            {notFoundPage.secondaryLink.label}
          </a>
        </div>
      </div>
    </section>
  );
}
