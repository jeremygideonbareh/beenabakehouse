import { motion } from "framer-motion";
import { site } from "../lib/content";
import { scrollToId } from "../lib/SmoothScroll";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import { PillButton } from "../components/PillButton";
import { MagneticLink } from "../components/LinkUnderline";
import "./Hero.css";

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
    <header className="hero" id="hero">
      <div className="hero__media">
        <motion.img
          src={hero.image_primary.url}
          alt={hero.image_primary.alt}
          width={2000}
          height={1333}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          initial={reduced ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.08 }}
          animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="hero__veil" />
      <div className="hero__inner">
        <motion.span
          className="hero__eyebrow"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.05, duration: 0.6 }}
        >
          {hero.eyebrow}
        </motion.span>

        <h1 className="hero__title">
          <div>
            {splitWords(hero.title_lines[0]).map((w, i) => (
              <span className="word" key={i}>
                <motion.span
                  variants={wordVariants(i)}
                  initial="hidden"
                  animate="visible"
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </div>
          <div className="line2">
            {splitWords(hero.title_lines[1]).map((w, i) => (
              <span className="word" key={i}>
                <motion.span
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
          className="hero__subtitle"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
          animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ delay: reduced ? 0 : 0.95, duration: 0.6 }}
        >
          {hero.subtitle}
        </motion.p>

        <motion.div
          className="hero__ctas"
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
        className="hero__rail"
        initial={reduced ? { opacity: 1 } : { opacity: 0 }}
        animate={reduced ? { opacity: 1 } : { opacity: 1 }}
        transition={{ delay: reduced ? 0 : 1.3, duration: 0.6 }}
      >
        {["Since 2000", "Trivandrum", "Homemade & delivered"].map((t) => (
          <span className="hero__rail-item" key={t}>
            <span className="hero__rail-dot" />
            {t}
          </span>
        ))}
      </motion.div>
    </header>
  );
}