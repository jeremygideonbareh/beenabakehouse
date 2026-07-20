import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { site } from "../lib/content";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";

const sizes = ["lg", "md", "sm", "wide", "md"] as const;

const sizeClasses: Record<string, string> = {
  lg: "col-span-4 aspect-[16/10]",
  md: "col-span-2 aspect-[4/5]",
  sm: "col-span-2 aspect-[4/3]",
  wide: "col-span-3 aspect-[4/3]",
};

export function Gallery() {
  const reduced = usePrefersReducedMotion();
  const { gallery } = site;

  return (
    <section className="relative pt-[clamp(5rem,12vw,11rem)] pb-[clamp(5rem,12vw,11rem)] px-[clamp(1.25rem,5vw,6rem)]" id="gallery" aria-label="Gallery">
      <div className="max-w-[1280px] mx-auto mb-[clamp(2.5rem,6vw,4rem)] flex flex-col gap-5">
        <span className="font-mono text-eyebrow tracking-[0.18em] uppercase text-ink-muted inline-flex items-center gap-[0.6rem]">{gallery.eyebrow}</span>
        <motion.h2
          className="font-display text-h2 leading-[1.04] tracking-[-0.02em] font-[400] m-0 text-ink"
          initial={{ opacity: reduced ? 1 : 0, y: reduced ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] as const }}
        >
          {gallery.h2}
        </motion.h2>
      </div>

      <div className="max-w-[1600px] mx-auto px-[clamp(1.25rem,5vw,6rem)] grid grid-cols-6 gap-[clamp(0.6rem,1.4vw,1.2rem)] max-md:grid-cols-2">
        {gallery.images.map((img, i) => (
          <motion.figure
            key={img.pexels_id}
            className={cn(
              "relative overflow-hidden rounded-[12px] bg-surface group",
              sizeClasses[sizes[i % sizes.length]],
              "max-md:col-span-2 max-md:aspect-[4/3]"
            )}
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
              className="w-full h-full object-cover transition-transform duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
            />
          </motion.figure>
        ))}
      </div>
    </section>
  );
}
