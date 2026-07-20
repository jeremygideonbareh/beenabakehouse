import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

export function Testimonials() {
  const reduced = usePrefersReducedMotion();
  const { testimonials } = site;

  return (
    <section className="bg-surface rounded-[clamp(1rem,3vw,2rem)] mx-[clamp(1rem,4vw,4rem)] p-[clamp(3rem,7vw,6rem)] pt-[clamp(5rem,12vw,11rem)] pb-[clamp(5rem,12vw,11rem)] scroll-mt-20" id="testimonials" aria-label="Testimonials">
      <div className="flex flex-col gap-4 mb-12 max-w-[50ch]">
        <span className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem]">{testimonials.eyebrow}</span>
        <motion.h2
          className="font-display text-h2 leading-[1.04] tracking-[-0.02em] font-[400] m-0 text-ink"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ maxWidth: "16ch" }}
        >
          {testimonials.h2}
        </motion.h2>
        <div className="inline-flex items-baseline gap-6 flex-wrap mt-2">
          <span className="font-display text-[clamp(3rem,7vw,5rem)] font-[400] leading-[1] text-ink">
            {testimonials.aggregate.recommend_pct}%
          </span>
          <span className="font-mono text-[0.78rem] tracking-[0.12em] uppercase text-ink-muted max-w-[22ch]">
            of {testimonials.aggregate.reviews_count} Facebook reviewers recommend us
          </span>
        </div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-6">
        {testimonials.items.map((t, i) => (
          <motion.figure
            key={i}
            className="bg-background rounded-[14px] p-[1.8rem] flex flex-col gap-5"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.55,
              delay: reduced ? 0 : i * 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <blockquote className="font-accent italic text-[1.25rem] leading-[1.45] text-ink m-0">
              &ldquo;{t.quote_placeholder}&rdquo;
            </blockquote>
            <figcaption className="font-mono text-[0.72rem] tracking-[0.1em] uppercase text-ink-muted">
              {t.name_placeholder} &middot; {t.source}
              <span className="inline-block mt-2 px-[0.6rem] py-[0.2rem] rounded-full bg-background font-mono text-[0.6rem] tracking-[0.1em] uppercase text-ink-muted ml-2">
                Editable
              </span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="mt-10 font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink-muted">
        {testimonials.aggregate.note}
      </p>
    </section>
  );
}
