import { useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

export default function HeroMaskTitle({ englishTitle, chineseTitle }) {
  const wrapperRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 130, damping: 24, mass: 0.6 });
  const smoothY = useSpring(mouseY, { stiffness: 130, damping: 24, mass: 0.6 });

  const handleMouseMove = (event) => {
    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  const maskImage = useMotionTemplate`radial-gradient(circle 205px at ${smoothX}px ${smoothY}px, black 0%, black 48%, transparent 67%)`;

  return (
    <div className="relative mx-auto w-full max-w-6xl">
      <div
        ref={wrapperRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="group relative hidden cursor-none select-none py-2 md:block"
      >
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-[clamp(4.8rem,11vw,11.5rem)] font-black leading-[0.85] text-neutral-950"
        >
          {englishTitle}
        </motion.h1>

        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-hidden"
          style={{
            WebkitMaskImage: maskImage,
            maskImage,
          }}
          animate={{
            opacity: hovered ? 1 : 0,
            scale: hovered ? 1 : 0.92,
          }}
          transition={{ duration: 0.28, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-neutral-950" />
          <motion.h2
            className="relative text-center text-[clamp(4.8rem,11vw,11.5rem)] leading-[0.85] text-white"
            animate={{
              opacity: hovered ? 1 : 0.4,
              fontWeight: hovered ? 800 : 500,
              letterSpacing: hovered ? "0.02em" : "0.12em",
              y: hovered ? 0 : 8,
            }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            {chineseTitle}
          </motion.h2>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-3 md:hidden"
      >
        <h1 className="text-[clamp(3.1rem,17vw,6.5rem)] font-black leading-[0.88] text-neutral-950">
          {englishTitle}
        </h1>
        <p className="ml-auto w-fit rounded-full bg-neutral-950 px-5 py-3 text-[clamp(2.3rem,12vw,4.5rem)] font-extrabold leading-none text-white">
          {chineseTitle}
        </p>
      </motion.div>
    </div>
  );
}
