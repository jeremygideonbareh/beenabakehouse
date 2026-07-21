import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

export function SignatureCakes() {
  const reduced = usePrefersReducedMotion();
  const { signature_cakes } = site;

  return (
    <section className="relative py-[clamp(5rem,12vw,11rem)] overflow-hidden scroll-mt-20" id="signature" aria-label="Signature cakes">
      <div className="max-w-[1280px] mx-auto mb-[clamp(2rem,6vw,4rem)] px-[clamp(1.25rem,5vw,6rem)] flex flex-col gap-5">
        <motion.span
          className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem]"
          initial={{ opacity: reduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          {signature_cakes.eyebrow}
        </motion.span>
        <motion.h2
          className="font-display text-h2 leading-[1.04] tracking-[-0.02em] font-[400] m-0 text-ink"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ maxWidth: "12ch" }}
        >
          {signature_cakes.h2}
        </motion.h2>
      </div>

      <div
        className="signature__track flex flex-col md:flex-row gap-[clamp(1.5rem,5vw,3rem)] px-[clamp(1.25rem,5vw,6rem)] max-md:px-[clamp(1.25rem,5vw,2rem)] md:overflow-x-auto md:snap-x md:snap-mandatory scrollbar-hide [&::-webkit-scrollbar]:hidden"
        data-cursor="croissant"
        role="list"
        aria-label="Signature cakes carousel"
      >
        {signature_cakes.items.map((item, i) => (
          <motion.article
            key={item.name}
            className="group md:flex-[0_0_clamp(280px,32vw,380px)] md:snap-center max-md:w-full flex flex-col gap-4 bg-transparent"
            role="listitem"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-surface">
              <img
                src={item.image.url}
                alt={item.image.alt}
                width={380}
                height={500}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
              />
              <span className="absolute top-4 right-4 px-[0.85rem] py-[0.4rem] bg-background rounded-full font-mono text-xs tracking-[0.1em] uppercase text-ink">
                {item.price_placeholder_inr}
              </span>
            </div>
            <h3 className="font-display text-[1.6rem] leading-[1.15] font-[500] m-0 text-ink">{item.name}</h3>
            <p className="text-body text-ink-muted m-0 leading-[1.5] max-w-[30ch]">{item.summary}</p>
          </motion.article>
        ))}
      </div>

      <p className="max-w-[1280px] mx-auto mt-[clamp(2rem,5vw,3.5rem)] px-[clamp(1.25rem,5vw,6rem)] font-mono text-[0.72rem] tracking-[0.08em] uppercase text-ink-muted">
        {signature_cakes.price_disclaimer}
      </p>
    </section>
  );
}
