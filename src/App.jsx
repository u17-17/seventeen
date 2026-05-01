import { lazy, Suspense } from "react";
import Navbar from "./components/Navbar.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ProblemsSection from "./components/ProblemsSection.jsx";
import MethodSection from "./components/MethodSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import TestimonialsSection from "./components/TestimonialsSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";

const HeroDissolve = lazy(() => import("./components/HeroDissolve.jsx"));

function LoadingFallback() {
  return (
    <div className="flex h-screen items-center justify-center bg-[#f5efe5]">
      <div className="text-sm font-medium text-neutral-400">Loading…</div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-950 antialiased">
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white opacity-0 focus:opacity-100 transition-opacity"
      >
        跳到主要内容
      </a>
      <Navbar />
      <main id="main-content">
        <Suspense fallback={<LoadingFallback />}>
          <HeroDissolve />
        </Suspense>
        <AboutSection />
        <ProblemsSection />
        <MethodSection />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
