import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ProblemsSection from "./components/ProblemsSection.jsx";
import MethodSection from "./components/MethodSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import StaticPage from "./pages/StaticPage.jsx";
import { staticPages } from "./data/pageData.js";
import { getLegacyRedirectTarget, getPageRouteFromHash } from "./utils/routing.js";
import { navigateToHref } from "./utils/scroll.js";

const HeroDissolve = lazy(() => import("./components/HeroDissolve.jsx"));

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#f5efe5]">
      <div className="text-sm font-medium text-neutral-400">Loading…</div>
    </div>
  );
}

function HomePage() {
  return (
    <>
      <Suspense fallback={<LoadingFallback />}>
        <HeroDissolve />
      </Suspense>
      <AboutSection />
      <ProblemsSection />
      <MethodSection />
      <ExperienceSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] },
};

export default function App() {
  const [pageRoute, setPageRoute] = useState(() =>
    getLegacyRedirectTarget(window.location.hash)
      ? null
      : getPageRouteFromHash(window.location.hash),
  );
  const page = pageRoute ? staticPages[pageRoute] : null;

  useEffect(() => {
    const handleHashChange = () => {
      const legacyTarget = getLegacyRedirectTarget(window.location.hash);
      if (legacyTarget) {
        setPageRoute(null);
        window.setTimeout(() => navigateToHref(legacyTarget), 0);
        return;
      }

      setPageRoute(getPageRouteFromHash(window.location.hash));
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    if (pageRoute) window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pageRoute]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-950 antialiased">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] rounded-full bg-brand px-4 py-3 text-sm font-semibold text-cream opacity-0 transition-opacity focus:opacity-100"
      >
        跳到主要内容
      </a>
      <Navbar />
      <main id="main-content">
        <AnimatePresence mode="wait" initial={false}>
          {page ? (
            <motion.div key={`page-${pageRoute}`} {...pageTransition}>
              <StaticPage page={page} />
            </motion.div>
          ) : (
            <motion.div key="home" {...pageTransition}>
              <HomePage />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
