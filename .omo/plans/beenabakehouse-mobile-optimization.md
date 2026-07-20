# Mobile Optimization + Hero Redesign — Beena's Bakehouse

**Goal**: Make the beenabakehouse bakery website fully mobile-optimized and redesign the hero section with a cinematic, award-winning look.

**Stack**: Vite + React 18 + TypeScript, Tailwind v3, Framer Motion + GSAP + Lenis

## Success Criteria
- `npm run build` passes with zero errors
- Hero section redesigned with cinematic imagery + bold serif typography
- All touch targets ≥ 44×44 CSS px
- Font size on all form inputs ≥ 16px (prevents iOS zoom)
- CustomCursor disabled on touch devices
- Nav has working mobile hamburger menu
- Section anchors account for fixed nav offset
- Images have width/height attrs
- `<MotionConfig reducedMotion="user">` wrapping App

## TODOs

0. [x] Redesign Hero section (cinematic + bold text + mobile-optimized)
   - Hero.tsx: Replace current hero with cinematic editorial layout inspired by UND NY + Levain + Bernice
   - Full-bleed image with warm gradient overlay (keeper existing image or find better cinematic bakery shot)
   - Bold serif headline using Fraunces: stacked 2-line reveal ("Handmade. / With Love." style from content.json taglines)
   - Per-line slide-up text reveal animation (Framer Motion)
   - Parallax scroll effect on background image (useScroll + useTransform)
   - Mobile: 85vh height, scaled-down text (clamp()), no parallax, CTA buttons stacked
   - Add `width`/`height` attrs, keep `loading="eager" fetchPriority="high"`
   - Style eyebrow, title, subtitle, two CTAs, stat bar at bottom
   - Desktop layout unchanged animation-wise, just more cinematic

1. [x] Mobile hamburger menu for Nav
   - Nav.tsx: Add hamburger button (min-h-[44px] min-w-[44px]), shown on max-md:flex, hidden on md:hidden
   - Overlay panel: fixed left-0 top-0 z-40 h-full w-full backdrop-blur bg-stone-50/95, slide-in from right
   - Menu links: stacked flex-col gap-6, each link min-h-[44px] flex items-center px-6 text-lg
   - Close button (X icon) in top-right, fixed z-50
   - Close on link click
   - Animate with Framer Motion (AnimatePresence, slide-in from right)
   - Desktop nav links unchanged, shown md:flex

2. [x] Touch target sizing for all interactive elements
   - Menu.tsx: Category tab buttons — add min-h-[44px] to filter buttons
   - Menu.tsx: Price display — replace inline style with text-sm minimum
   - SignatureCakes.tsx: Price badge — increase from text-[0.68rem] to text-xs
   - SignatureCakes.tsx: Card buttons — add min-h-[44px]
   - PillButton.tsx: Verify touch height >=44px, add min-h-[44px]
   - LinkUnderline.tsx: Add min-h-[44px] to clickable area
   - VisitContact.tsx: Submit button — add min-h-12 (48px)
   - Footer.tsx: Social links and nav links — ensure min-h-[44px] min-w-[44px]

3. [x] Form input mobile usability (VisitContact.tsx)
   - All inputs: add className="text-base" (16px) to prevent iOS auto-zoom
   - Add inputMode, autoComplete, type attributes to each form field
   - Update form input heights to h-12 for better touch targets

4. [x] Scroll anchoring — fix nav offset for section anchors
   - App.tsx: Update SmoothScroll scrollToId offset from -20 to -80
   - Add scroll-mt-20 to each section element

5. [x] Image width/height attrs across sections
   - Story.tsx: Add width={800} height={600}
   - SignatureCakes.tsx: Add width={380} height={500} per card
   - Menu.tsx: Add width={480} height={360} per item
   - Gallery.tsx: Add width={400} height={500} per image
   - Process.tsx: Add width={600} height={400}
   - Testimonials.tsx: Add width={120} height={120} per avatar
   - VisitContact.tsx: Add width={800} height={600}
   - Footer.tsx: images if present

6. [x] CustomCursor — strengthen touch device disabling
   - CustomCursor.tsx: Implement useIsCoarsePointer() hook
   - Bail out (return null) on touch/coarse pointer
   - Clean up mousemove event listener

7. [x] Framer Motion — reduced motion support
   - App.tsx: Wrap App content in MotionConfig reducedMotion="user"
   - Verify all entrance animations use transform/opacity only

8. [x] Carousel scrollbar hiding + CSS scroll-snap
   - Gallery.tsx: Add snap-x snap-mandatory + snap-center
   - SignatureCakes.tsx: Add snap-x snap-mandatory + snap-center
   - styles.css: Add .scrollbar-hide utility classes

9. [x] Safe area insets + nav notch padding
   - Nav.tsx: Add pt-[max(0.5rem,env(safe-area-inset-top))] to header

10. [x] Font-size responsive scale
    - Ensure body has explicit base font-size
    - Add responsive heading scale where missing

## Final Verification Wave

F1. [x] Build and lint verification — npm run build passes, zero TypeScript errors
F2. [x] Mobile QA — CustomCursor returns null on touch, hamburger works, form inputs 16px, touch targets >=44px
F3. [x] Desktop regression — desktop layout unchanged, Nav shows full links, animations play, all sections render at >=1024px

## Hotfix: Hero Redesign Restoration + Lighter Overlay

**Problem**: The Hero redesign from TODO 0 was accidentally reverted during this session when `git checkout -- src/sections/Hero.tsx` was run to undo a direct `scroll-mt-20` edit. This reverted ALL uncommitted Hero changes — the parallax, editorial stacked type, per-line reveal, and lighter gradient were lost. The live site now shows the OLD hero with a heavy white overlay (0.55→0.78→0.96 opacity) that washes out the bakery photo.

**Fix needed**:

HF1. [x] Rewrite `src/sections/Hero.tsx` to restore the redesign with a LIGHTER gradient overlay
    - Re-add imports: `useScroll, useTransform` from `framer-motion`, `useRef` from `react`
    - Add parallax: `useScroll` with `offset: ["start start", "end start"]`, `useTransform` for `bgScale` (1→1.08) and `bgY` (0%→15%), disabled on mobile and reduced motion
    - Replace gradient overlay with LIGHTER values: `from-[rgba(251,247,240,0.15)] via-[rgba(251,247,240,0.35)] to-[rgba(251,247,240,0.82)]` — photo clearly visible at top, text legible at bottom
    - Restore editorial stacked headline: per-line slide-up reveal using `lineVariants`, `titleLines.map()`, `clamp()` font sizing
    - Restore `min-h-[85vh] md:min-h-screen` (was `min-h-svh`)
    - Restore `self-end md:self-center` content positioning (was `self-center`)
    - Restore `gap-[clamp(1.5rem,3vw,2.5rem)]` content gap (was `gap-[2.5rem]`)
    - Restore responsive clamp() sizing on eyebrow, subtitle, and stat bar text
    - Keep `scroll-mt-20` on the `<header>` element
    - Keep `width={2000} height={1333}` on the hero image
    - Add `will-change-transform` class to background image
    - Replace `initial`/`animate` on background image with `style={{ scale: bgScale, y: bgY }}`

HF2. [x] Build verification — `npm run build` passes with zero errors

HF3. [ ] Visual QA — launch dev server, screenshot hero, confirm bakery photo is visible through the lighter overlay and text is still legible

HF4. [ ] Commit and push to GitHub main — `fix: restore hero redesign with lighter gradient overlay`
