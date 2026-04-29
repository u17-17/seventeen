import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import AboutSection from "./components/AboutSection.jsx";
import ProblemsSection from "./components/ProblemsSection.jsx";
import MethodSection from "./components/MethodSection.jsx";
import ExperienceSection from "./components/ExperienceSection.jsx";
import ContactSection from "./components/ContactSection.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-white text-neutral-950 antialiased">
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ProblemsSection />
        <MethodSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
