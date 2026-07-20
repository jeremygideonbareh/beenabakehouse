import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./Process.css";

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
    <section className="section process" id="process" aria-label="Our baking process">
      <div className="process__head">
        <span className="eyebrow">{process.eyebrow}</span>
        <motion.h2
          className="display h2"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {process.h2}
        </motion.h2>
      </div>

      <div className="process__layout">
        <div className="process__rail">
          {process.steps.map((step, i) => (
            <div
              key={step.step}
              ref={(el) => (refs.current[i] = el)}
              data-idx={i}
              className={`process__step ${active === i ? "is-active" : ""}`}
            >
              <span className="process__step-num">
                Step 0{step.step}
              </span>
              <h3 className="process__step-title">{step.title}</h3>
              <p className="process__step-body">{step.body}</p>
            </div>
          ))}
        </div>

        <div className="process__images">
          {process.images.map((img, i) => (
            <motion.figure
              key={img.pexels_id}
              className="process__img"
              initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <img
                src={img.url}
                alt={img.alt}
                width={1280}
                height={880}
                loading="lazy"
                decoding="async"
              />
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}