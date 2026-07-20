import { useEffect, useRef, useState } from "react";
import { usePrefersCoarsePointer, usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./CustomCursor.css";

type Mode = "dot" | "ring" | "croissant";

export function CustomCursor() {
  const reduced = usePrefersReducedMotion();
  const coarse = usePrefersCoarsePointer();
  const [mode, setMode] = useState<Mode>("dot");
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const posRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    if (reduced || coarse) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement | null;
      const interactive = target?.closest(
        "a, button, [data-cursor='ring'], input, textarea, select, [role='button']"
      );
      const croissant = target?.closest("[data-cursor='croissant']");
      setMode(croissant ? "croissant" : interactive ? "ring" : "dot");
    };

    const onLeave = () => setMode("dot");

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const tick = () => {
      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.22);
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.22);
      const el = cursorRef.current;
      if (el) {
        el.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    document.body.classList.add("has-custom-cursor");

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(rafRef.current);
      document.body.classList.remove("has-custom-cursor");
    };
  }, [reduced, coarse]);

  if (reduced || coarse) return null;

  return (
    <div
      ref={cursorRef}
      className={`custom-cursor custom-cursor__${mode}`}
      aria-hidden="true"
    >
      {mode === "croissant" ? (
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path
            d="M4 18c0-6 5-10 12-10 5 0 9 3 10 7-1-1-3-2-5-1.5-1 .5-1 2-1 3 0 1 .5 2 1.5 2.5-1.5 3-5 5-9 5-5 0-9-3-9-9z"
            fill="#FFE26E"
            stroke="#3A2E2A"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          <path d="M9 14c1 0 2 .6 2 1.5M14 12c1 .4 1.6 1.2 1.6 2M19 13c.8.2 1.3.9 1.3 1.6" stroke="#3A2E2A" strokeWidth="1" strokeLinecap="round" />
        </svg>
      ) : null}
    </div>
  );
}