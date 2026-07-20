import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./Gallery.css";

const sizes = ["lg", "md", "sm", "wide", "md"] as const;

export function Gallery() {
  const reduced = usePrefersReducedMotion();
  const { gallery } = site;

  return (
    <section className="section gallery" id="gallery" aria-label="Gallery">
      <div className="gallery__head">
        <span className="eyebrow">{gallery.eyebrow}</span>
        <motion.h2
          className="display h2"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {gallery.h2}
        </motion.h2>
      </div>

      <div className="gallery__grid">
        {gallery.images.map((img, i) => (
          <motion.figure
            key={img.pexels_id}
            className={`gallery__tile gallery__tile--${sizes[i % sizes.length]}`}
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 30, scale: reduced ? 1 : 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 0.6,
              delay: reduced ? 0 : i * 0.06,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <img
              src={img.url}
              alt={img.alt}
              width={800}
              height={600}
              loading="lazy"
              decoding="async"
            />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}