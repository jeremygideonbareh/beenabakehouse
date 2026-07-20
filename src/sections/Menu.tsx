import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

export function Menu() {
  const reduced = usePrefersReducedMotion();
  const { menu } = site;
  const [active, setActive] = useState(0);

  const category = menu.categories[active];

  return (
    <section className="bg-surface rounded-[clamp(1rem,3vw,2rem)] mx-[clamp(1rem,4vw,4rem)] p-[clamp(3rem,7vw,6rem)] pt-[clamp(5rem,12vw,11rem)] pb-[clamp(5rem,12vw,11rem)]" id="menu" aria-label="Menu">
      <div className="flex flex-col gap-4 max-w-[50ch] mb-12">
        <span className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem]">{menu.eyebrow}</span>
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

      <div className="flex gap-[0.4rem] flex-wrap mb-10 border-b border-hairline pb-2" role="tablist" aria-label="Menu categories">
        {menu.categories.map((c, i) => (
          <button
            key={c.name}
            className={`px-4 py-[0.55rem] rounded-full font-mono text-[0.74rem] tracking-[0.1em] uppercase transition-colors duration-300 cursor-pointer ${active === i ? "bg-background text-ink border border-hairline" : "text-ink-muted bg-transparent border border-transparent hover:text-ink"}`}
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            id={`tab-${i}`}
          >
            {c.name}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.dl
          key={active}
          className="grid grid-cols-[1fr_auto] gap-x-8 gap-y-[0.2rem]"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {category.items.map((item) => (
            <div className="contents" key={item.name}>
              <dt className="p-4 border-b border-dashed border-hairline font-display text-[1.4rem] text-ink font-[400]">{item.name}</dt>
              <dd className="p-4 border-b border-dashed border-hairline font-mono text-[0.9rem] tracking-[0.06em] text-ink-muted text-right whitespace-nowrap">{item.price_placeholder_inr}</dd>
            </div>
          ))}
        </motion.dl>
      </AnimatePresence>

      <p className="mt-8 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink-muted">
        Prices are placeholders. Availability confirmed when ordering.
      </p>
    </section>
  );
}
