import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./Menu.css";

export function Menu() {
  const reduced = usePrefersReducedMotion();
  const { menu } = site;
  const [active, setActive] = useState(0);

  const category = menu.categories[active];

  return (
    <section className="section menu" id="menu" aria-label="Menu">
      <div className="menu__head">
        <span className="eyebrow">{menu.eyebrow}</span>
        <motion.h2
          className="display h2"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {menu.h2}
        </motion.h2>
        <motion.p
          className="menu__subtitle"
          initial={{ opacity: reduced ? 1 : 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6 }}
        >
          {menu.subtitle}
        </motion.p>
      </div>

      <div className="menu__tabs" role="tablist" aria-label="Menu categories">
        {menu.categories.map((c, i) => (
          <button
            key={c.name}
            className="menu__tab"
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
          className="menu__list"
          initial={reduced ? { opacity: 1 } : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduced ? { opacity: 1 } : { opacity: 0, y: -8 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {category.items.map((item) => (
            <div className="menu__row" key={item.name}>
              <dt className="name">{item.name}</dt>
              <dd className="price">{item.price_placeholder_inr}</dd>
            </div>
          ))}
        </motion.dl>
      </AnimatePresence>

      <p className="menu__note">
        Prices are placeholders. Availability confirmed when ordering.
      </p>
    </section>
  );
}