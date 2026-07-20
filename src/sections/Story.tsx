import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./Story.css";

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
    <section className="section story" id="story" aria-label="Our story">
      <div className="section__inner">
        <motion.span
          className="eyebrow"
          initial={{ opacity: reduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          {story.eyebrow}
        </motion.span>

        <motion.h2
          className="display h2"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ marginBottom: "clamp(2rem, 5vw, 4rem)", maxWidth: "16ch" }}
        >
          {story.h2}
        </motion.h2>

        <div className="story__pinwrap">
          <div className="story__media">
            <img
              src={story.images[0].url}
              alt={story.images[0].alt}
              width={1280}
              height={1600}
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="story__text">
            <motion.blockquote
              className="story__quote"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
            >
              “{story.pull_quote.text}”
              <span className="story__quote-attr">
                — {story.pull_quote.attribution}
              </span>
            </motion.blockquote>

            <div className="story__paragraphs">
              {story.paragraphs.map((p, i) => (
                <motion.p
                  key={i}
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
          className="story__strip"
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
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}