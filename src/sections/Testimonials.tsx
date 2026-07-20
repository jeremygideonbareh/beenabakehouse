import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./Testimonials.css";

export function Testimonials() {
  const reduced = usePrefersReducedMotion();
  const { testimonials } = site;

  return (
    <section className="section testimonials" id="testimonials" aria-label="Testimonials">
      <div className="testimonials__head">
        <span className="eyebrow">{testimonials.eyebrow}</span>
        <motion.h2
          className="display h2"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
          style={{ maxWidth: "16ch" }}
        >
          {testimonials.h2}
        </motion.h2>
        <div className="testimonials__stats">
          <span className="testimonials__stats-pct">
            {testimonials.aggregate.recommend_pct}%
          </span>
          <span className="testimonials__stats-label">
            of {testimonials.aggregate.reviews_count} Facebook reviewers recommend us
          </span>
        </div>
      </div>

      <div className="testimonials__grid">
        {testimonials.items.map((t, i) => (
          <motion.figure
            key={i}
            className="testimonial"
            initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{
              duration: 0.55,
              delay: reduced ? 0 : i * 0.1,
              ease: [0.22, 1, 0.36, 1] as const,
            }}
          >
            <blockquote className="testimonial__quote">
              “{t.quote_placeholder}”
            </blockquote>
            <figcaption className="testimonial__attr">
              {t.name_placeholder} · {t.source}
              <span className="testimonials__placeholder-tag">Editable</span>
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <p className="testimonials__note">
        {testimonials.aggregate.note}
      </p>
    </section>
  );
}