import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
      <div className="hidden md:flex gap-[0.15rem] mx-[0.4rem]">
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
      <button
        className="flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center p-3"
        onClick={() => setIsMenuOpen(true)}
        aria-label="Open menu"
      >
        <svg width="18" height="14" viewBox="0 0 18 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1" y1="1" x2="17" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="1" y1="7" x2="17" y2="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="1" y1="13" x2="17" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-sm bg-stone-50/95 backdrop-blur-sm"
            style={{ paddingTop: "env(safe-area-inset-top)" }}
          >
            <button
              className="absolute top-6 right-6 min-h-[44px] min-w-[44px] flex items-center justify-center"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close menu"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="2" y1="2" x2="18" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="18" y1="2" x2="2" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <div className="flex flex-col items-center justify-center h-full gap-6 px-8">
              {links.map((l) => (
                <button
                  key={l.id}
                  className="min-h-[44px] text-lg font-mono uppercase tracking-[0.08em] text-ink-muted hover:text-ink transition-colors duration-300"
                  onClick={() => {
                    setIsMenuOpen(false);
                    scrollToId(l.id);
                  }}
                >
                  {l.label}
                </button>
              ))}
              <button
                className="mt-4 min-h-[44px] px-8 py-3 rounded-full bg-accent-butter text-ink font-[500] text-base transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04]"
                onClick={() => {
                  setIsMenuOpen(false);
                  scrollToId("visit");
                }}
              >
                Order
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}