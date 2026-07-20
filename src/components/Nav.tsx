import { useEffect, useState } from "react";
import { scrollToId } from "../lib/SmoothScroll";

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
    <nav
      className={`fixed top-[clamp(0.8rem,2.5vw,1.6rem)] left-1/2 -translate-x-1/2 z-[100] flex items-center gap-[0.4rem] pl-[1.1rem] pr-[0.5rem] py-[0.45rem] bg-background/70 backdrop-blur-lg border border-hairline rounded-full font-mono text-[0.74rem] tracking-[0.08em] uppercase max-w-[calc(100vw-2rem)] transition-[background-color,box-shadow] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${scrolled ? "bg-background/95 shadow-[0_8px_24px_-18px_rgba(58,46,42,0.4)]" : ""}`}
      aria-label="Primary"
    >
      <button
        className="font-display normal-case tracking-[-0.01em] text-[1rem] text-ink font-[400]"
        onClick={() => scrollToId("hero")}
        aria-label="Beena's Bake House — home"
      >
        Beena's Bake House
      </button>
      <div className="flex gap-[0.15rem] mx-[0.4rem] max-sm:hidden">
        {links.map((l) => (
          <button
            key={l.id}
            className="px-[0.7rem] py-[0.4rem] rounded-full text-ink-muted cursor-pointer transition-[color,background-color] duration-300 hover:text-ink hover:bg-[rgba(58,46,42,0.06)]"
            onClick={() => scrollToId(l.id)}
          >
            {l.label}
          </button>
        ))}
      </div>
      <button
        className="px-4 py-[0.55rem] rounded-full bg-accent-butter text-ink cursor-pointer font-[500] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04]"
        onClick={() => scrollToId("visit")}
      >
        Order
      </button>
    </nav>
  );
}