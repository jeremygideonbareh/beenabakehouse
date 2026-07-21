import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.06,
    },
  }),
  exit: { opacity: 0, y: -12, scale: 0.96, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Menu() {
  const reduced = usePrefersReducedMotion();
  const { menu } = site;
  const [active, setActive] = useState(0);
  const category = menu.categories[active];

  return (
    <section
      className="bg-surface rounded-[clamp(1rem,3vw,2rem)] max-md:rounded-[clamp(0.75rem,2vw,1rem)] mx-0 md:mx-[clamp(1rem,4vw,4rem)] p-[clamp(1.25rem,5vw,3rem)] md:p-[clamp(3rem,7vw,6rem)] pt-[clamp(5rem,12vw,11rem)] pb-[clamp(5rem,12vw,11rem)] scroll-mt-20 relative overflow-hidden"
      id="menu"
      aria-label="Menu"
    >
      {/* Ambient background glow */}
      <div aria-hidden className="pointer-events-none absolute -top-40 -right-40 w-[50vw] h-[50vw] rounded-full bg-accent-butter/10 blur-[120px]" />
      <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 w-[40vw] h-[40vw] rounded-full bg-accent-peach/10 blur-[100px]" />

      <div className="relative z-[1]">
        <div className="flex flex-col gap-4 max-w-[50ch] mb-12">
          <span className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem]">
            {menu.eyebrow}
          </span>
          <motion.h2
            className="font-display text-h2 leading-[1.04] tracking-[-0.02em] font-[400] m-0 text-ink"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {menu.h2}
          </motion.h2>
          <motion.p
            className="text-body-lg text-ink-muted m-0 max-w-[42ch]"
            initial={{ opacity: reduced ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            {menu.subtitle}
          </motion.p>
        </div>

        {/* Glass category filter pills */}
        <div className="flex gap-[0.5rem] flex-wrap mb-10" role="tablist" aria-label="Menu categories">
          {menu.categories.map((c, i) => (
            <button
              key={c.name}
              className={`px-5 py-[0.6rem] min-h-[44px] rounded-full font-mono text-[0.74rem] tracking-[0.1em] uppercase transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] cursor-pointer ${
                active === i
                  ? "bg-white/40 backdrop-blur-md border border-white/60 shadow-[0_4px_20px_-8px_rgba(58,46,42,0.15)] text-ink"
                  : "bg-white/10 backdrop-blur-sm border border-white/20 text-ink-muted hover:bg-white/25 hover:text-ink"
              }`}
              role="tab"
              aria-selected={active === i}
              onClick={() => setActive(i)}
              id={`tab-${i}`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Liquid glass product grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
            initial={reduced ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduced ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
          >
            {category.items.map((item, i) => (
              <motion.article
                key={item.name}
                className="group relative overflow-hidden rounded-[1.6rem] md:rounded-[1.8rem] aspect-[4/5] bg-white/10 shadow-[0_8px_32px_-12px_rgba(58,46,42,0.12)] border border-white/30 will-change-transform"
                variants={reduced ? undefined : cardVariants}
                custom={i}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
                {/* Product image — full-bleed background */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={item.image?.url ?? ""}
                    alt={item.image?.alt ?? item.name}
                    loading={i < 3 ? "eager" : "lazy"}
                    className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>

                {/* Frosted glass gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

                {/* Glass panel — lower third */}
                <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 backdrop-blur-xl bg-white/15 border-t border-white/30 translate-y-0 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-white/25">
                  <h3 className="font-display text-[clamp(1.1rem,2vw,1.4rem)] text-white font-[400] leading-tight tracking-[-0.01em] m-0">
                    {item.name}
                  </h3>
                  <p className="font-mono text-[clamp(0.65rem,1.2vw,0.75rem)] tracking-[0.08em] text-white/80 mt-1.5 m-0">
                    {item.price_placeholder_inr}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <p className="mt-10 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink-muted text-center">
          Prices are placeholders. Availability confirmed when ordering.
        </p>
      </div>
    </section>
  );
}
