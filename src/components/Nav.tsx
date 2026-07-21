import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { scrollToId } from "../lib/SmoothScroll";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "./ui/sheet";
import {
  Menu,
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

const containerVariants = {
  hidden: { opacity: 1 },
  visible: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = useCallback((id: string) => {
    setOpen(false);
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

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            render={
              <button
                className="flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center p-3 text-ink-muted hover:text-ink transition-colors cursor-pointer"
                aria-label="Open menu"
              />
            }
          >
            <Menu size={20} />
          </SheetTrigger>

          <SheetContent
            side="right"
            className="w-full max-w-[min(100vw,24rem)] sm:max-w-md border-l border-hairline bg-background p-0"
          >
            <SheetHeader className="px-6 pt-8 pb-4 border-b border-hairline text-left">
              <SheetTitle className="font-display text-xl text-ink font-[400] tracking-[-0.02em] block">
                Beena's Bake House
              </SheetTitle>
              <SheetDescription className="font-mono text-[0.65rem] tracking-[0.12em] uppercase text-ink-muted">
                Menu
              </SheetDescription>
            </SheetHeader>

            <motion.div
              className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-0.5"
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
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-xl hover:bg-[rgba(58,46,42,0.04)] transition-colors text-left group cursor-pointer"
                    onClick={() => handleNav(l.id)}
                  >
                    <span className="font-mono text-[0.6rem] tracking-[0.1em] text-ink-muted/50 w-5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      size={16}
                      className="text-ink-muted shrink-0 group-hover:text-ink transition-colors"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-display text-lg text-ink font-[400] leading-tight">
                        {l.label}
                      </span>
                      <span className="font-mono text-[0.6rem] text-ink-muted tracking-[0.05em] truncate">
                        {l.description}
                      </span>
                    </div>
                  </motion.button>
                );
              })}
            </motion.div>

            <SheetFooter className="px-6 pb-8 pt-4 border-t border-hairline">
              <button
                onClick={() => handleNav("visit")}
                className="w-full min-h-[48px] rounded-full bg-accent-butter text-ink font-[500] text-base transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                Order a cake
              </button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </nav>
    </>
  );
}