import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "../lib/content";
import { scrollToId } from "../lib/SmoothScroll";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { PillButton } from "../components/PillButton";
import { MagneticLink } from "../components/LinkUnderline";

const splitWords = (s: string) => s.split(" ").map((w) => w);

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const { hero } = site;

  // Parallax — disabled on mobile (<768) or when reduced motion is preferred
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const shouldParallax = !reduced && !isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const bgScale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, shouldParallax ? 1.08 : 1]
  );
  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", shouldParallax ? "15%" : "0%"]
  );

  // Per-line reveal — editorial stacked type
  const lineVariants = (i: number) => ({
    hidden: { y: reduced ? 0 : "110%" },
    visible: {
      y: 0,
      transition: {
        duration: reduced ? 0.001 : 0.9,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: reduced ? 0 : 0.3 + i * 0.15,
      },
    },
  });

  const titleLines = hero.title_lines;

  return (
    <header
      ref={ref}
      className="relative min-h-[85vh] md:min-h-screen grid grid-rows-[1fr_auto] pt-[6rem] pb-[clamp(2rem,5vw,4rem)] px-[clamp(1.25rem,5vw,6rem)] overflow-hidden scroll-mt-20"
      id="hero"
    >
      {/* ---------- Cinematic background with parallax ---------- */}
      <div className="absolute inset-0 -z-[1] overflow-hidden">
        <motion.img
          src={hero.image_primary.url}
          alt={hero.image_primary.alt}
          width={2000}
          height={1333}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover will-change-transform"
          style={{ scale: bgScale, y: bgY }}
        />
      </div>

      {/* Light gradient — bakery photo visible, text legible */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(251,247,240,0.15)] via-[rgba(251,247,240,0.35)] to-[rgba(251,247,240,0.82)]" />

      {/* ---------- Foreground content ---------- */}
      <div className="relative z-[2] max-w-[1280px] mx-auto w-full self-end md:self-center flex flex-col gap-[clamp(1.5rem,3vw,2.5rem)]">
        {/* Eyebrow */}
        <motion.span
          className="font-mono text-[clamp(0.65rem,1.2vw,0.75rem)] tracking-[0.18em] uppercase text-ink-muted"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.1, duration: 0.6 }}
        >
          {hero.eyebrow}
        </motion.span>

        {/* Stacked editorial headline — per-line slide-up reveal */}
        <h1 className="font-display text-[clamp(2.75rem,8vw,7rem)] leading-[0.92] tracking-[-0.025em] font-[300] m-0 text-ink max-w-[14ch]">
          {titleLines.map((line: string, lineIdx: number) => (
            <div
              key={lineIdx}
              className={
                lineIdx === 1
                  ? "italic font-[400] text-ink-muted"
                  : undefined
              }
            >
              {splitWords(line).map((w, i) => {
                const globalIdx = lineIdx * 10 + i;
                return (
                  <span
                    className="inline-block overflow-hidden align-top pr-[0.18em]"
                    key={i}
                  >
                    <motion.span
                      className="inline-block will-change-transform"
                      variants={lineVariants(globalIdx)}
                      initial="hidden"
                      animate="visible"
                    >
                      {w}
                    </motion.span>
                  </span>
                );
              })}
            </div>
          ))}
        </h1>

        {/* Subtitle */}
        <motion.p
          className="text-[clamp(1rem,1.4vw,1.15rem)] max-w-[38ch] text-ink m-0 leading-[1.5]"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.95, duration: 0.6 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex gap-4 flex-wrap items-center"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 1.15, duration: 0.6 }}
        >
          <PillButton onClick={() => scrollToId("visit")}>
            {hero.primary_cta.label}
          </PillButton>
          <MagneticLink onClick={() => scrollToId("signature")}>
            {hero.secondary_cta.label}
          </MagneticLink>
        </motion.div>
      </div>

      {/* ---------- Stat bar ---------- */}
      <motion.div
        className="relative z-[2] border-t border-hairline pt-5 max-w-[1280px] mx-auto w-full flex flex-wrap gap-[1rem_2rem] justify-between items-center font-mono text-[clamp(0.62rem,0.9vw,0.72rem)] tracking-[0.1em] uppercase text-ink-muted"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.3, duration: 0.6 }}
      >
        {["Since 2000", "Trivandrum", "Homemade & delivered"].map((t) => (
          <span className="inline-flex items-center gap-[0.6rem]" key={t}>
            <span className="w-[6px] h-[6px] rounded-full bg-ink" />
            {t}
          </span>
        ))}
      </motion.div>
    </header>
  );
}
