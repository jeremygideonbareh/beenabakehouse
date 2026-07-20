import { motion } from "framer-motion";
import { site } from "../lib/content";
import { scrollToId } from "../lib/SmoothScroll";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { PillButton } from "../components/PillButton";
import { MagneticLink } from "../components/LinkUnderline";

const splitWords = (s: string) =>
  s.split(" ").map((w) => w);

export function Hero() {
  const reduced = usePrefersReducedMotion();
  const { hero } = site;

  const wordVariants = (i: number) => ({
    hidden: { y: reduced ? 0 : "110%" },
    visible: {
      y: 0,
      transition: {
        duration: reduced ? 0.001 : 0.85,
        ease: [0.22, 1, 0.36, 1] as const,
        delay: reduced ? 0 : 0.2 + i * 0.07,
      },
    },
  });

  return (
    <header className="relative min-h-svh grid grid-rows-[1fr_auto] pt-[6rem] pb-[clamp(3rem,6vw,5rem)] px-[clamp(1.25rem,5vw,6rem)] overflow-hidden scroll-mt-20" id="hero">
      <div className="absolute inset-0 -z-[1] overflow-hidden">
        <motion.img
          src={hero.image_primary.url}
          alt={hero.image_primary.alt}
          width={2000}
          height={1333}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full h-full object-cover"
          initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-[rgba(251,247,240,0.55)] via-[rgba(251,247,240,0.78)] to-[rgba(251,247,240,0.96)]" />
      <div className="relative z-[2] max-w-[1280px] mx-auto w-full self-center flex flex-col gap-[2.5rem]">
        <motion.span
          className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.05, duration: 0.6 }}
        >
          {hero.eyebrow}
        </motion.span>

        <h1 className="font-display text-hero leading-[0.92] tracking-[-0.025em] font-[300] m-0 text-ink max-w-[14ch] max-sm:text-[clamp(3rem,14vw,5rem)]">
          <div>
            {splitWords(hero.title_lines[0]).map((w, i) => (
              <span className="inline-block overflow-hidden align-top pr-[0.18em]" key={i}>
                <motion.span
                  className="inline-block will-change-transform"
                  variants={wordVariants(i)}
                  initial="hidden"
                  animate="visible"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </div>
          <div className="italic font-[400] text-ink-muted">
            {splitWords(hero.title_lines[1]).map((w, i) => (
              <span className="inline-block overflow-hidden align-top pr-[0.18em]" key={i}>
                <motion.span
                  className="inline-block will-change-transform"
                  variants={wordVariants(i + 3)}
                  initial="hidden"
                  animate="visible"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </div>
        </h1>

        <motion.p
          className="text-body-lg max-w-[38ch] text-ink m-0 leading-[1.5]"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.95, duration: 0.6 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="flex gap-4 flex-wrap items-center"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
          animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
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

      <motion.div
        className="relative z-[2] border-t border-hairline pt-5 max-w-[1280px] mx-auto w-full flex flex-wrap gap-[1rem_2rem] justify-between items-center font-mono text-caption tracking-[0.1em] uppercase text-ink-muted"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1 }}
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
