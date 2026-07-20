import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./SignatureCakes.css";

export function SignatureCakes() {
  const reduced = usePrefersReducedMotion();
  const { signature_cakes } = site;

  return (
    <section className="signature" id="signature" aria-label="Signature cakes">
      <div className="signature__head">
        <motion.span
          className="eyebrow"
          initial={{ opacity: reduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.5 }}
        >
          {signature_cakes.eyebrow}
        </motion.span>
        <motion.h2
          className="display h2"
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
        className="signature__track"
        data-cursor="croissant"
        role="list"
        aria-label="Signature cakes carousel — scroll horizontally"
      >
        {signature_cakes.items.map((item, i) => (
          <motion.article
            key={item.name}
            className="signature__card"
            role="listitem"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: reduced ? 0 : i * 0.05, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="signature__card-media">
              <img
                src={item.image.url}
                alt={item.image.alt}
                width={600}
                height={750}
                loading="lazy"
                decoding="async"
              />
              <span className="signature__card-price">{item.price_placeholder_inr}</span>
            </div>
            <h3 className="signature__card-name">{item.name}</h3>
            <p className="signature__card-summary">{item.summary}</p>
          </motion.article>
        ))}
      </div>

      <p className="signature__disclaimer">{signature_cakes.price_disclaimer}</p>
    </section>
  );
}