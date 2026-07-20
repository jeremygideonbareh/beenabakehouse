import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

export function Story() {
  const reduced = usePrefersReducedMotion();
  const { story } = site;

  const fade = {
    hidden: { opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, delay: reduced ? 0 : 0.1 * i, ease: [0.22, 1, 0.36, 1] as const },
    }),
  };

  return (
    <section className="relative pt-[clamp(5rem,12vw,11rem)] pb-[clamp(5rem,12vw,11rem)] px-[clamp(1.25rem,5vw,6rem)]" id="story" aria-label="Our story">
      <div className="max-w-[1280px] mx-auto">
        <motion.span
          className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem] mb-5"
          initial={{ opacity: reduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          {story.eyebrow}
        </motion.span>

        <motion.h2
          className="font-display text-h2 leading-[1.04] tracking-[-0.02em] font-[400] m-0 text-ink italic"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ marginBottom: "clamp(2rem, 5vw, 4rem)", maxWidth: "16ch" }}
        >
          {story.h2}
        </motion.h2>

        <div className="grid grid-cols-[1fr_1.1fr] gap-[clamp(2rem,6vw,6rem)] items-start max-md:grid-cols-1 max-md:gap-8">
          <div className="sticky top-[12vh] h-[min(78vh,720px)] overflow-hidden rounded-[14px] bg-surface max-md:relative max-md:top-0 max-md:h-[60vh]">
            <img
              src={story.images[0].url}
              alt={story.images[0].alt}
              width={1280}
              height={1600}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover motion-safe:animate-[kenburns_8s_ease-in-out_infinite_alternate]"
            />
          </div>
          <div className="flex flex-col gap-6 pt-8">
            <motion.blockquote
              className="font-accent italic text-[clamp(1.6rem,3.4vw,2.6rem)] leading-[1.3] text-ink pt-10 pb-6 border-t border-hairline relative before:absolute before:top-[-1px] before:left-0 before:w-[60px] before:h-[3px] before:bg-accent-butter"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              &ldquo;{story.pull_quote.text}&rdquo;
              <span className="font-mono not-italic text-caption tracking-[0.12em] uppercase text-ink-muted mt-4 block">
                &mdash; {story.pull_quote.attribution}
              </span>
            </motion.blockquote>

            <div className="flex flex-col gap-4">
              {story.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
                  className="text-body-lg leading-[1.7] m-0 mb-[1.4rem] max-w-[50ch]"
                  variants={fade}
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.4 }}
                >
                  {p}
                </motion.p>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          className="mt-16 grid grid-cols-3 gap-5 max-md:grid-cols-1"
          initial={{ opacity: reduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          {story.images.slice(1).map((img, i) => (
            <img
              key={i}
              src={img.url}
              alt={img.alt}
              width={640}
              height={800}
              loading="lazy"
              decoding="async"
              className="w-full aspect-[4/5] object-cover rounded-[12px] max-md:aspect-[4/3]"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
