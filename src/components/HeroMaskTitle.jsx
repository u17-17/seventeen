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
  const smoothX = useSpring(mouseX, { stiffness: 170, damping: 26, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 170, damping: 26, mass: 0.5 });

  const handleMouseMove = (event) => {
    const bounds = wrapperRef.current?.getBoundingClientRect();
    if (!bounds) return;
    mouseX.set(event.clientX - bounds.left);
    mouseY.set(event.clientY - bounds.top);
  };

  const maskImage = useMotionTemplate`radial-gradient(circle 148px at ${smoothX}px ${smoothY}px, black 0%, black 56%, transparent 66%)`;

  return (
    <div className="relative mx-auto w-full max-w-7xl">
      <div
        ref={wrapperRef}
        onMouseEnter={(event) => {
          handleMouseMove(event);
          setHovered(true);
        }}
        onMouseLeave={() => setHovered(false)}
        onMouseMove={handleMouseMove}
        className="group relative hidden cursor-none select-none py-6 md:block"
      >
        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="whitespace-nowrap text-center text-[clamp(4rem,9.4vw,9.4rem)] font-black leading-[0.88] text-neutral-950"
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
          }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-neutral-950" />
          <motion.h2
            className="absolute inset-0 flex items-center justify-end whitespace-nowrap pr-[clamp(0.15rem,1.5vw,1.8rem)] text-right text-[clamp(3.2rem,6.8vw,6.8rem)] leading-none text-white"
            animate={{
              opacity: hovered ? 1 : 0.68,
              fontWeight: hovered ? 800 : 500,
              letterSpacing: hovered ? "0.01em" : "0.08em",
            }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
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
        <h1 className="whitespace-nowrap text-[clamp(2.55rem,11.2vw,5.2rem)] font-black leading-[0.9] text-neutral-950">
          {englishTitle}
        </h1>
        <p className="ml-auto w-fit rounded-full bg-neutral-950 px-5 py-3 text-[clamp(1.65rem,7.4vw,3.5rem)] font-extrabold leading-none text-white">
          {chineseTitle}
        </p>
      </motion.div>
    </div>
  );
}
