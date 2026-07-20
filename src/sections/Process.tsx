import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

export function Process() {
  const reduced = usePrefersReducedMotion();
  const { process } = site;
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (reduced) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = Number((e.target as HTMLElement).dataset.idx);
            setActive(idx);
          }
        }
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0.1 }
    );
    refs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, [reduced]);

  return (
    <section className="relative pt-[clamp(5rem,12vw,11rem)] pb-[clamp(5rem,12vw,11rem)] px-[clamp(1.25rem,5vw,6rem)] scroll-mt-20" id="process" aria-label="Our baking process">
      <div className="max-w-[1280px] mx-auto mb-[clamp(3rem,6vw,5rem)] flex flex-col gap-5">
        <span className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem]">{process.eyebrow}</span>
        <motion.h2
          className="font-display text-h2 leading-[1.04] tracking-[-0.02em] font-[400] m-0 text-ink"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {process.h2}
        </motion.h2>
      </div>

      <div className="max-w-[1280px] mx-auto grid grid-cols-[1fr_1fr] gap-[clamp(2rem,5vw,5rem)] items-start max-md:grid-cols-1">
        <div className="sticky top-[14vh] flex flex-col gap-0 border-l border-hairline pl-8 max-md:relative max-md:top-0 max-md:pl-6">
          {process.steps.map((step, i) => (
            <div
              key={step.step}
              ref={(el) => (refs.current[i] = el)}
              data-idx={i}
              className={`py-6 border-b border-hairline flex flex-col gap-[0.6rem] transition-opacity duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${active === i ? "opacity-100" : "opacity-55"}`}
            >
              <span className="font-mono text-[0.72rem] tracking-[0.15em] uppercase text-ink-muted">
                Step 0{step.step}
              </span>
              <h3 className="font-display text-[1.6rem] leading-[1.1] text-ink m-0 font-[400]">{step.title}</h3>
              <p className="text-ink-muted m-0 leading-[1.55] text-body max-w-[32ch]">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-[clamp(1.5rem,4vw,3rem)]">
          {process.images.map((img, i) => (
            <motion.figure
              key={img.pexels_id}
              className="aspect-[16/11] rounded-[14px] overflow-hidden bg-surface"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <img
                src={img.url}
                alt={img.alt}
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
