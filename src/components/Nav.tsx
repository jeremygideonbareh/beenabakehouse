import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "../lib/SmoothScroll";
import {
  Menu,
  X,
  BookOpen,
  CakeSlice,
  UtensilsCrossed,
  Image,
  Package,
  Star,
} from "lucide-react";

const links = [
  { label: "Story", id: "story", icon: BookOpen, description: "Our 25-year journey" },
  { label: "Cakes", id: "signature", icon: CakeSlice, description: "Signature creations" },
  { label: "Menu", id: "menu", icon: UtensilsCrossed, description: "Browse our menu" },
  { label: "Gallery", id: "gallery", icon: Image, description: "Photo gallery" },
  { label: "Process", id: "process", icon: Package, description: "How we bake" },
  { label: "Reviews", id: "testimonials", icon: Star, description: "What customers say" },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2, delay: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      damping: 18,
      stiffness: 280,
      mass: 0.9,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNav = useCallback((id: string) => {
    setMenuOpen(false);
    /* small delay so the exit animation plays before scrolling */
    setTimeout(() => scrollToId(id), 200);
  }, []);

  return (
    <>
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
          className="hidden md:inline-flex px-4 py-[0.55rem] rounded-full bg-accent-butter text-ink cursor-pointer font-[500] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.04]"
          onClick={() => scrollToId("visit")}
        >
          Order
        </button>
        <button
          className="flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center p-3 text-ink-muted hover:text-ink transition-colors cursor-pointer"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className="absolute inset-0 bg-black/30 backdrop-blur-md"
              variants={backdropVariants}
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              className="relative w-full max-w-sm rounded-2xl border border-white/20 bg-stone-50/70 backdrop-blur-2xl shadow-2xl overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between px-6 pt-6 pb-3 border-b border-stone-200/50">
                <span className="font-display text-xl text-ink font-[400] tracking-[-0.02em]">
                  Beena's Bake House
                </span>
                <button
                  className="min-h-[44px] min-w-[44px] flex items-center justify-center text-ink-muted hover:text-ink transition-colors"
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={18} />
                </button>
              </div>

              <motion.div
                className="px-4 py-5 flex flex-col gap-0.5"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {links.map((l, i) => {
                  const Icon = l.icon;
                  return (
                    <motion.button
                      key={l.id}
                      variants={itemVariants}
                      className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-white/60 transition-colors text-left group cursor-pointer"
                      onClick={() => handleNav(l.id)}
                    >
                      <span className="font-mono text-[0.6rem] tracking-[0.1em] text-ink-muted/50 w-5 shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        size={16}
                        className="text-ink-muted shrink-0 group-hover:text-ink transition-colors"
                      />
                      <div className="flex flex-col">
                        <span className="font-display text-lg text-ink font-[400] leading-tight">
                          {l.label}
                        </span>
                        <span className="font-mono text-[0.6rem] text-ink-muted tracking-[0.05em]">
                          {l.description}
                        </span>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>

              <div className="px-6 pb-6 pt-3 border-t border-stone-200/50">
                <button
                  className="w-full min-h-[48px] rounded-full bg-accent-butter text-ink font-[500] text-base transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  onClick={() => handleNav("visit")}
                >
                  Order a cake
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}