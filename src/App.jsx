import { lazy, Suspense, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Analytics } from "@vercel/analytics/react";
import Navbar from "./components/Navbar.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ProblemsSection from "./components/ProblemsSection.jsx";
import MethodSection from "./components/MethodSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";
import Seo from "./components/Seo.jsx";
import StaticPage from "./pages/StaticPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import { staticPages } from "./data/pageData.js";
import {
  getLegacyRedirectTarget,
  getPageRouteFromUrl,
  isNotFoundPath,
} from "./utils/routing.js";
import { shouldLoadVercelAnalytics } from "./utils/analytics.js";
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
  const initialNotFound = isNotFoundPath(window.location.pathname);
  const [pageRoute, setPageRoute] = useState(() =>
    !initialNotFound && getLegacyRedirectTarget(window.location.hash)
      ? null
      : getPageRouteFromUrl(window.location.pathname, window.location.hash),
  );
  const [notFound, setNotFound] = useState(initialNotFound);
  const page = pageRoute ? staticPages[pageRoute] : null;
  const analyticsEnabled = shouldLoadVercelAnalytics(window.location.hostname);

  useEffect(() => {
    const syncRoute = () => {
      const nextNotFound = isNotFoundPath(window.location.pathname);
      const legacyTarget = nextNotFound
        ? null
        : getLegacyRedirectTarget(window.location.hash);
      if (legacyTarget) {
        setPageRoute(null);
        setNotFound(false);
        window.setTimeout(() => navigateToHref(legacyTarget), 0);
        return;
      }

      setPageRoute(getPageRouteFromUrl(window.location.pathname, window.location.hash));
      setNotFound(nextNotFound);
    };

    syncRoute();
    window.addEventListener("hashchange", syncRoute);
    window.addEventListener("popstate", syncRoute);
    return () => {
      window.removeEventListener("hashchange", syncRoute);
      window.removeEventListener("popstate", syncRoute);
    };
  }, []);

  useEffect(() => {
    if (pageRoute || notFound) {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [notFound, pageRoute]);

  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-950 antialiased">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] rounded-full bg-brand px-4 py-3 text-sm font-semibold text-cream opacity-0 transition-opacity focus:opacity-100"
      >
        跳到主要内容
      </a>
      <Seo page={page} notFound={notFound} />
      <Navbar />
      <main id="main-content">
        <AnimatePresence mode="wait" initial={false}>
          {notFound ? (
            <motion.div key="not-found" {...pageTransition}>
              <NotFoundPage />
            </motion.div>
          ) : page ? (
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
      <Footer showPageCta={Boolean(page)} />
      {analyticsEnabled && <Analytics />}
    </div>
  );
}
