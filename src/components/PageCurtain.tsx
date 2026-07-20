import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../hooks/useMediaQuery";
import "./PageCurtain.css";

/** A re-usable curtain element used as a page-transition overlay.
 *  We expose a simple imperative trigger via the `trigger()` ref method,
 *  wired to Framer for enter-leave transitions on route change (if any).
 *  Single-page mode just renders one shot on first mount. */
export function PageCurtain() {
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState<"hidden" | "entering" | "leaving">(
    reduced ? "hidden" : "entering"
  );
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (reduced) return;
    const t1 = setTimeout(() => setState("leaving"), 60);
    const t2 = setTimeout(() => setState("hidden"), 680);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [reduced]);

  if (state === "hidden" || reduced) return null;

  return (
    <div
      ref={ref}
      className={`page-curtain ${state === "entering" ? "is-entering" : "is-leaving"}`}
      style={{
        transform:
          state === "entering"
            ? "translateY(0%)"
            : "translateY(-101%)",
        transition: "transform 0.62s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      aria-hidden="true"
    />
  );
}