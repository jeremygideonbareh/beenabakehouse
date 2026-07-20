import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./KineticLoader.css";

export function KineticLoader({ onDone }: { onDone: () => void }) {
  const reduced = usePrefersReducedMotion();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (reduced) {
      const t = setTimeout(() => {
        setHidden(true);
        onDone();
      }, 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setHidden(true);
      const done = setTimeout(onDone, 650);
      return () => clearTimeout(done);
    }, 1450);
    return () => clearTimeout(t);
  }, [reduced, onDone]);

  if (hidden) return null;

  return (
    <motion.div
      className="kinetic-loader"
      initial={false}
      animate={
        reduced
          ? { opacity: 0 }
          : { opacity: 1, transition: { duration: 0.001 } }
      }
      exit={{ opacity: 0 }}
      aria-hidden="true"
    >
      <motion.div
        className="kinetic-loader__curtain"
        initial={{ y: reduced ? "-101%" : "0%" }}
        animate={{ y: reduced ? "-101%" : "0%" }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <svg
        className="kinetic-loader__wordmark"
        viewBox="0 0 600 90"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Beena's Bake House loading"
      >
        <motion.path
          d={
            "M 20 60 C 20 25, 70 25, 70 60 C 70 25, 120 25, 120 60 C 120 25, 170 25, 170 60 " +
            "M 200 30 L 200 70 M 196 30 L 220 30 M 196 70 L 220 70 " +
            "M 250 60 C 250 25, 290 25, 290 60 C 290 75, 270 75, 270 35 C 270 25, 290 25, 290 60 " +
            "M 320 30 L 320 70 M 316 30 L 340 30 M 316 50 L 336 50 M 316 70 L 340 70 " +
            "M 370 30 C 390 30, 400 40, 400 60 C 400 40, 410 30, 430 30 " +
            "M 460 30 C 475 30, 485 40, 485 55 C 485 70, 475 70, 460 70 " +
            "M 510 30 L 510 70 M 506 30 L 530 30 " +
            "M 560 70 C 560 35, 580 35, 580 60 M 560 70 C 580 70, 585 50, 575 50"
          }
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          initial={{ pathLength: 0, opacity: 1 }}
          animate={reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
          transition={{ duration: reduced ? 0.001 : 0.95, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>

      <motion.div
        className="kinetic-loader__pill"
        initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: reduced ? 0 : 0.85,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        Est. 2000 · Trivandrum · Homemade
      </motion.div>

      {!reduced && (
        <motion.div
          className="kinetic-loader__curtain"
          initial={{ y: "0%" }}
          animate={{ y: "-101%" }}
          transition={{ delay: 1, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      )}
    </motion.div>
  );
}