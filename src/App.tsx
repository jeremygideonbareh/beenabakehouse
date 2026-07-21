import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScroll } from "./lib/SmoothScroll";
import { Nav } from "./components/Nav";
import { CustomCursor } from "./components/CustomCursor";
import { KineticLoader } from "./components/KineticLoader";
import { PageCurtain } from "./components/PageCurtain";
import { Hero } from "./sections/Hero";
import { Story } from "./sections/Story";
import { SignatureCakes } from "./sections/SignatureCakes";
import { Menu } from "./sections/Menu";
import { Gallery } from "./sections/Gallery";
import { Process } from "./sections/Process";
import { Testimonials } from "./sections/Testimonials";
import { VisitContact } from "./sections/VisitContact";
import { Footer } from "./sections/Footer";
import { usePrefersReducedMotion } from "./hooks/useMediaQuery";
import { AdminPanel } from "./components/AdminPanel";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const reduced = usePrefersReducedMotion();
  const [loaded, setLoaded] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") setAdmin(true);
  }, []);

  // Initialize ScrollTrigger after content has painted and Lenis is wired.
  useEffect(() => {
    if (!loaded) return;
    if (reduced) return;

    // Refresh once Lenis has potentially resized things.
    const ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      // Pinned Story — push the text up as user scrolls the section.
      const storyMedia = document.querySelector<HTMLElement>(".story__media");
      const storySection = document.querySelector<HTMLElement>("#story");
      if (storyMedia && storySection) {
        gsap.fromTo(
          storyMedia,
          { y: -16 },
          {
            y: 32,
            ease: "none",
            scrollTrigger: {
              trigger: storySection,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.8,
            },
          }
        );
      }

      // Signature Cakes — horizontal scroll on the track (desktop only).
      const track = document.querySelector<HTMLElement>(".signature__track");
      const signatureSection = document.querySelector<HTMLElement>("#signature");
      if (track && signatureSection && window.matchMedia("(min-width: 768px)").matches) {
        const distance = () =>
          Math.max(0, track.scrollWidth - window.innerWidth + 80);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: signatureSection,
            start: "top top+=80",
            end: () => `+=${distance()}`,
            scrub: 0.6,
            pin: false,
            invalidateOnRefresh: true,
          },
        });
      }
    });
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [loaded, reduced]);

  return (
    <>
      <a className="skip-link" href="#story" aria-label="Skip to main content">
        Skip to content
      </a>

      <CustomCursor />
      <SmoothScroll>
        <MotionConfig reducedMotion="user">
          <AnimatePresence>
            {!loaded && <KineticLoader onDone={() => setLoaded(true)} />}
          </AnimatePresence>

          <PageCurtain />

          <Nav />
          <main>
            <Hero />
            <Story />
            <SignatureCakes />
            <Menu />
            <Gallery />
            <Process />
            <Testimonials />
            <VisitContact />
          </main>
          <Footer />
        </MotionConfig>
      </SmoothScroll>

      {admin && <AdminPanel onClose={() => setAdmin(false)} />}
    </>
  );
}

export default App;