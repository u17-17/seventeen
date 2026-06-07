import { useEffect, useMemo, useRef, useState } from "react";

const clamp = (value, min = 0, max = 1) => Math.min(Math.max(value, min), max);

const smoothStep = (edge0, edge1, value) => {
  const x = clamp((value - edge0) / (edge1 - edge0));
  return x * x * (3 - 2 * x);
};

const desktopNoise = [0, 0.34, -0.18, 0.48, -0.42, 0.22, -0.08, 0.58, -0.36, 0.16, -0.52, 0.28, 0];
const mobileNoise = [0, 0.18, -0.16, 0.2, -0.12, 0.16, 0];

const remnants = [
  {
    className: "left-[6%] top-[58%] h-[18vh] w-[32vw]",
    clipPath: "polygon(0 18%, 92% 0, 100% 74%, 12% 100%)",
  },
  {
    className: "right-[9%] top-[50%] h-[20vh] w-[27vw]",
    clipPath: "polygon(8% 0, 100% 18%, 84% 100%, 0 82%)",
  },
  {
    className: "left-[34%] top-[71%] h-[12vh] w-[30vw]",
    clipPath: "polygon(0 32%, 72% 0, 100% 58%, 18% 100%)",
  },
];

function makeWipePolygon(progress, isMobile) {
  const noise = isMobile ? mobileNoise : desktopNoise;
  const travel = isMobile ? 112 : 118;
  const base = 108 - progress * travel;
  const amplitude = (isMobile ? 4 : 9) * (0.55 + progress * 0.85);

  const points = noise.map((noiseValue, index) => {
    const x = (index / (noise.length - 1)) * 100;
    const wave = Math.sin(progress * Math.PI * 2 + index * 0.88) * (isMobile ? 1.2 : 2.4);
    const y = clamp(base + noiseValue * amplitude + wave, 0, 112);
    return { x, y };
  });

  const edgePoints = [...points]
    .reverse()
    .map((point) => `${point.x.toFixed(2)}% ${point.y.toFixed(2)}%`)
    .join(", ");

  return `polygon(0% 0%, 100% 0%, ${edgePoints})`;
}

export default function HeroDissolve() {
  const sectionRef = useRef(null);
  const frameRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const visual = useMemo(() => {
    const dissolve = smoothStep(0.02, 0.64, progress);
    const titleReveal = smoothStep(0.32, 0.54, progress);
    const copyReveal = smoothStep(0.58, 0.88, progress);
    const clipPath = makeWipePolygon(dissolve, isMobile);
    const edgeTop = clamp(108 - dissolve * (isMobile ? 112 : 118), -8, 108);
    const remnantOpacity = isMobile ? 0 : smoothStep(0.42, 0.54, progress) * (1 - smoothStep(0.78, 0.96, progress));

    return {
      dissolve,
      titleReveal,
      copyReveal,
      clipPath,
      edgeTop,
      remnantOpacity,
      topTitleY: -18 * dissolve,
      topTitleBlur: isMobile ? 0 : dissolve * 1.2,
      bottomTitleY: 22 - titleReveal * 22,
      bottomCopyY: 20 - copyReveal * 20,
    };
  }, [isMobile, progress]);

  const pinStyle = useMemo(() => {
    if (progress >= 0.998) {
      return {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 0,
        height: "100vh",
      };
    }

    if (progress > 0.002) {
      return {
        position: "fixed",
        left: 0,
        right: 0,
        top: 0,
        height: "100vh",
      };
    }

    return {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      height: "100vh",
    };
  }, [progress]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 767px)");
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    const updateMode = () => {
      setIsMobile(mobileQuery.matches || reducedMotionQuery.matches);
    };

    const updateProgress = () => {
      frameRef.current = 0;
      const section = sectionRef.current;
      if (!section) return;

      const viewportHeight = window.innerHeight || 1;
      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollDistance = Math.max(section.offsetHeight - viewportHeight, 1);
      const next = clamp((window.scrollY - sectionTop) / scrollDistance);

      setProgress((current) => (Math.abs(current - next) > 0.002 ? next : current));
    };

    const requestUpdate = () => {
      if (frameRef.current) return;
      frameRef.current = window.requestAnimationFrame(updateProgress);
    };

    const handleResize = () => {
      updateMode();
      requestUpdate();
    };

    updateMode();
    updateProgress();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    if (mobileQuery.addEventListener) mobileQuery.addEventListener("change", updateMode);
    else mobileQuery.addListener?.(updateMode);

    if (reducedMotionQuery.addEventListener) reducedMotionQuery.addEventListener("change", updateMode);
    else reducedMotionQuery.addListener?.(updateMode);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", handleResize);

      if (mobileQuery.removeEventListener) mobileQuery.removeEventListener("change", updateMode);
      else mobileQuery.removeListener?.(updateMode);

      if (reducedMotionQuery.removeEventListener) reducedMotionQuery.removeEventListener("change", updateMode);
      else reducedMotionQuery.removeListener?.(updateMode);

      if (frameRef.current) window.cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[200vh] overflow-visible bg-[#f5efe5]"
    >
      <div className="z-0 h-screen overflow-hidden" style={pinStyle}>
        <div className="absolute inset-0 bg-[#f5efe5]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(32,28,22,0.045)_1px,transparent_0)] [background-size:28px_28px]" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(32,28,22,0.03)_0px,rgba(32,28,22,0.03)_1px,transparent_1px,transparent_24px)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(255,251,242,0.74),transparent_62%)]" />

          <svg
            className="pointer-events-none absolute bottom-[11vh] left-[8vw] hidden h-36 w-56 text-[#14100a]/10 md:block"
            viewBox="0 0 240 150"
            fill="none"
          >
            <path d="M18 118 C74 18 166 18 222 118" stroke="currentColor" strokeWidth="2" />
            <path d="M30 108 H224" stroke="currentColor" strokeWidth="1" opacity="0.8" />
            <path d="M58 20 V132" stroke="currentColor" strokeWidth="1" opacity="0.8" />
          </svg>
          <svg
            className="pointer-events-none absolute right-[8vw] top-[15vh] hidden h-44 w-44 text-[#14100a]/[0.07] md:block"
            viewBox="0 0 180 180"
            fill="none"
          >
            <circle cx="90" cy="90" r="54" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="90" cy="90" r="78" stroke="currentColor" strokeWidth="1" opacity="0.7" />
            <path d="M18 90 H162 M90 18 V162" stroke="currentColor" strokeWidth="1" opacity="0.55" />
          </svg>

          <div className="section-shell relative z-10 flex h-full flex-col items-center justify-center px-5 pb-14 pt-28 text-center">
            <div
              className="max-w-5xl"
              style={{
                opacity: visual.titleReveal,
                transform: `translate3d(0, ${visual.bottomTitleY}px, 0)`,
              }}
            >
              <p className="mb-5 text-xs font-black uppercase tracking-[0.28em] text-neutral-500">
                YAN TUTOR
              </p>
              <h2 className="whitespace-nowrap text-[clamp(2.25rem,8.5vw,7.25rem)] font-black leading-none tracking-[-0.02em] text-[#17120c]">
                你好，我是闫老师
              </h2>
            </div>

            <div
              className="mt-8 max-w-3xl text-lg leading-9 text-[#4d4539] sm:text-2xl sm:leading-10"
              style={{
                opacity: visual.copyReveal,
                transform: `translate3d(0, ${visual.bottomCopyY}px, 0)`,
              }}
            >
              <p>一个面向高一、高二学生的数学 / 物理辅导老师。</p>
              <p className="mt-2">
                我更关注的不是让你记住公式，而是帮你真正看懂题目背后的逻辑。
              </p>
            </div>
          </div>
        </div>

        <div
          className="absolute inset-0 overflow-hidden bg-[#05080c] text-white will-change-[clip-path]"
          style={{
            clipPath: visual.clipPath,
            WebkitClipPath: visual.clipPath,
          }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_46%,rgba(196,151,82,0.16),transparent_34%),radial-gradient(circle_at_78%_22%,rgba(88,106,118,0.14),transparent_34%),linear-gradient(145deg,#05080c_0%,#071018_42%,#0b1118_68%,#10100e_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(142,162,176,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(142,162,176,0.032)_1px,transparent_1px)] [background-size:44px_44px]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(139,153,164,0.085)_1px,transparent_0)] [background-size:30px_30px] opacity-30" />
          <div className="absolute inset-0 bg-[repeating-linear-gradient(135deg,rgba(188,172,141,0.035)_0px,rgba(188,172,141,0.035)_1px,transparent_1px,transparent_30px)] opacity-45" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,7,12,0.18)_48%,rgba(1,4,8,0.72)_100%)]" />
          <div className="absolute left-1/2 top-[47%] h-[42vh] w-[72vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(214,168,94,0.16)_0%,rgba(214,168,94,0.08)_30%,transparent_68%)] blur-2xl" />

          <div
            className="pointer-events-none absolute inset-x-0 h-[24vh] -translate-y-1/2 bg-[radial-gradient(circle_at_12px_12px,rgba(245,239,229,0.26)_1px,transparent_2px),radial-gradient(circle_at_38px_18px,rgba(216,184,132,0.14)_1px,transparent_3px),linear-gradient(180deg,rgba(245,239,229,0.14),rgba(245,239,229,0))] [background-size:54px_42px,72px_58px,100%_100%] mix-blend-screen blur-[0.2px]"
            style={{
              top: `${visual.edgeTop}%`,
              opacity: clamp(visual.dissolve * 1.2, 0, 0.72),
            }}
          />

          <div className="pointer-events-none absolute left-[8vw] top-[18vh] hidden h-px w-28 rotate-[-18deg] bg-[#c8d3dc]/[0.12] md:block" />
          <div className="pointer-events-none absolute right-[12vw] top-[26vh] hidden h-20 w-20 rounded-full border border-[#c8d3dc]/[0.09] md:block" />
          <div className="pointer-events-none absolute bottom-[20vh] right-[18vw] hidden h-px w-32 rotate-[-24deg] bg-[#d8b884]/[0.10] md:block" />
          <svg
            className="pointer-events-none absolute left-[6vw] top-[23vh] hidden h-40 w-60 text-[#b9c8d3]/[0.08] md:block"
            viewBox="0 0 240 160"
            fill="none"
          >
            <path d="M18 122 C76 28 166 30 222 122" stroke="currentColor" strokeWidth="2" />
            <path d="M24 122 H226 M58 22 V138" stroke="currentColor" strokeWidth="1" opacity="0.7" />
          </svg>
          <svg
            className="pointer-events-none absolute bottom-[12vh] right-[7vw] hidden h-44 w-44 text-[#d8b884]/[0.07] lg:block"
            viewBox="0 0 180 180"
            fill="none"
          >
            <circle cx="90" cy="90" r="58" stroke="currentColor" strokeWidth="1.5" />
            <path d="M18 90 H162 M90 18 V162" stroke="currentColor" strokeWidth="1" opacity="0.65" />
          </svg>

          {remnants.map((remnant) => (
            <div
              key={remnant.className}
              className={`pointer-events-none absolute hidden bg-[#071018] shadow-[0_0_40px_rgba(0,0,0,0.22)] md:block ${remnant.className}`}
              style={{
                clipPath: remnant.clipPath,
                WebkitClipPath: remnant.clipPath,
                opacity: visual.remnantOpacity,
              }}
            />
          ))}

          <div className="section-shell relative z-10 flex h-full flex-col items-center justify-center px-5 pb-14 pt-28 text-center">
            <div
              style={{
                transform: `translate3d(0, ${visual.topTitleY}px, 0)`,
                filter: `blur(${visual.topTitleBlur}px)`,
              }}
            >
              <h1 className="whitespace-nowrap text-[clamp(2.35rem,10vw,8.8rem)] font-black leading-none tracking-[-0.02em] text-[#fbf4e8]">
                Hello, I&apos;m Yan.
              </h1>
              <p className="mt-7 text-base font-medium text-[#d9c8ad]/75 sm:text-xl">
                Math / Physics / 22岁 / 河北邯郸
              </p>
            </div>
          </div>
        </div>

        <div
          className="pointer-events-none absolute bottom-7 left-1/2 z-20 -translate-x-1/2 text-xs font-semibold uppercase tracking-[0.22em] text-white/35 mix-blend-difference"
          style={{ opacity: 1 - smoothStep(0.12, 0.36, progress) }}
        >
          Scroll to reveal
        </div>
      </div>
    </section>
  );
}
