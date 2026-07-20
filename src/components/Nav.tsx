import { useEffect, useState } from "react";
import { scrollToId } from "../lib/SmoothScroll";
import "./Nav.css";

const links = [
  { label: "Story", id: "story" },
  { label: "Cakes", id: "signature" },
  { label: "Menu", id: "menu" },
  { label: "Gallery", id: "gallery" },
  { label: "Process", id: "process" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={`nav ${scrolled ? "is-scrolled" : ""}`} aria-label="Primary">
      <button
        className="nav__brand"
        onClick={() => scrollToId("hero")}
        aria-label="Beena's Bake House — home"
      >
        Beena's Bake House
      </button>
      <div className="nav__links">
        {links.map((l) => (
          <button
            key={l.id}
            className="nav__link"
            onClick={() => scrollToId(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <button className="nav__cta" onClick={() => scrollToId("visit")}>
        Order
      </button>
    </nav>
  );
}