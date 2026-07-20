import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersCoarsePointer, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./LinkUnderline.css";

interface Props {
  href?: string;
  onClick?: () => void;
  children: ReactNode;
  magnetic?: boolean;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function MagneticLink({
  href,
  onClick,
  children,
  magnetic = true,
  className = "",
  target,
  rel,
  ...rest
}: Props) {
  const reduced = usePrefersReducedMotion();
  const coarse = usePrefersCoarsePointer();
  const ref = useRef<HTMLAnchorElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  const onMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (reduced || coarse || !magnetic) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const offsetX = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
    const offsetY = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
    x.set(offsetX * 12);
    y.set(offsetY * 8);
  };
  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x: sx, y: sy }}
      className={`link-underline ${className}`.trim()}
      target={target}
      rel={rel}
      aria-label={rest["aria-label"]}
    >
      {children}
      <svg viewBox="0 0 100 6" preserveAspectRatio="none" aria-hidden="true">
        <path d="M1 3 H99" />
      </svg>
    </motion.a>
  );
}