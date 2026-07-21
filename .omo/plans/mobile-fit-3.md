# mobile-fit-3 — Work Plan

## Problem
Mobile still has horizontal scroll. Root causes (confirmed by reading every section file):
1. **SignatureCakes.tsx**: `overflow-x-auto snap-x` carousel causes horizontal swipe on mobile.
2. **Testimonials.tsx**: `grid-cols-[repeat(auto-fit,minmax(260px,1fr))]` forces a 260px-min column → on phones with ~190px content area, the column blows past the parent → horizontal overflow.
3. **Menu.tsx & Testimonials.tsx**: `mx-[clamp(1rem,4vw,4rem)]` PLUS `p-[clamp(3rem,7vw,6rem)]` → on a 320px viewport eats 128px → only 192px content width → tight/overflow.
4. **Nav.tsx**: Previous plan (mobile-nav-redesign-2) marked todos `[x]` but `Nav.tsx` still uses a centered Framer Motion card drawer — never actually migrated to the planned shadcn Sheet (right-slide-in vertical nav). The mobile nav must be vertical.
5. **App.tsx**: GSAP block references `.signature__track` (non-existent) and `.story__media` (non-existent) — dead selectors; needs gating to md+ so we can hook a real desktop-only horizontal track.
6. **Gallery.tsx**: dead `snap-x snap-mandatory` on a 2-col grid (no overflow today), should be removed to keep CSS clean.

## Goal
- Zero horizontal scroll at 375 / 390 / 360 / 320 px viewport widths.
- All images fit within viewport (no clipped or overflowed images).
- Mobile nav is a vertical (right-slide-in) panel — shadcn Sheet, never a centered modal.
- All sections and menus fit within the viewport on mobile.

## Scope
### Must have
- `src/components/Nav.tsx`: replace centered Framer Motion card with shadcn `<Sheet side="right">` containing a vertical list of 6 nav items (index, icon, label, description) + Order CTA at bottom; staggered Framer Motion entrance; closes on item click → `scrollToId(id)`; desktop pill nav UNCHANGED.
- `src/sections/SignatureCakes.tsx`: mobile = vertical stack (`max-md:flex-col` with full-width cards), `md+` = horizontal carousel (current `flex overflow-x-auto snap-x`). Add `signature__track` class to the track div so App.tsx GSAP can target it (gsap gated to md+).
- `src/sections/Testimonials.tsx`: replace `grid-cols-[repeat(auto-fit,minmax(260px,1fr))]` with `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3`. Reduce mobile horizontal padding: section uses `mx-[clamp(1rem,4vw,4rem)] p-[clamp(3rem,7vw,6rem)] …` → replace with `mx-0 md:mx-[clamp(1rem,4vw,4rem)] p-[clamp(1.25rem,5vw,3rem)] md:p-[clamp(3rem,7vw,6rem)]`. Keep `bg-surface rounded-*` look.
- `src/sections/Menu.tsx`: same horizontal margin/padding fix as Testimonials — `mx-0 md:mx-[clamp(1rem,4vw,4rem)] p-[clamp(1.25rem,5vw,3rem)] md:p-[clamp(3rem,7vw,6rem)]`. Tabs wrap (`flex-wrap` already there). Menu `grid grid-cols-[1fr_auto]` already fine within the new content width.
- `src/sections/Gallery.tsx`: remove `snap-x snap-mandatory` from the grid (no horizontal overflow today, but redundant). Outer section padding fine.
- `src/App.tsx`: gate the `.signature__track` GSAP block with a `window.innerWidth >= 768 && !reduced` check; ignore on mobile. Leave the `.story__media` block alone (already no-op) OR remove it. Add a `ResizeObserver`/`invalidateOnRefresh` so desktop resize adjusts. Simpler: wrap the signature block in an `if (window.innerWidth >= 768)` guard. Refresh `ScrollTrigger` on resize.
- `src/styles.css`: add hard guards — `html, body { max-width: 100vw; overflow-x: hidden; }` (body already has overflow-x:hidden; html is the new add). Also `#root { max-width: 100vw; overflow-x: clip; }`. Add `img, video, svg, canvas { max-width: 100%; }` (already for img). Add `@media (max-width: 768px) { :root { --max-bleed: 100vw; } }` so any bleed containers don't push beyond viewport on mobile. Also ensure `.section { padding-inline: clamp(1rem, 5vw, 6rem); }` already does clamp down. (No change needed, just verified.)

### Must NOT have
- Desktop pill nav, scrollToId offset, section IDs, scroll-mt-20 — UNCHANGED.
- No new sections or routes.
- No removal of Framer Motion, GSAP, Lenis or shadcn Sheet (already present).
- No content.json changes.
- No new dependencies.

## Verification strategy (agent-executable)
1. `npm run build` returns exit code 0.
2. Serve `dist/` (`npx vite preview --port 4173` or static server on 3000).
3. Playwright at 375px, 390px, 360px, 320px viewports:
   - Confirm `document.documentElement.scrollWidth === window.innerWidth` (zero horizontal scroll) at the TOP, hero, signature, menu, gallery, process, testimonials, visit, footer.
   - Screenshot each section.
   - Click hamburger → right-slide-in Sheet opens with 6 vertical nav items + Order CTA; items animate in staggered; clicking item closes sheet AND scrolls to section; X button closes.
   - Confirm all images visible, none clipped horizontally.
4. Desktop at 1280px: confirm pill nav still horizontal, SignatureCakes still horizontal carousel.

## Execution strategy
Single Cursor code agent executes all edits cohesively (disjoint files; GSAP-blocking coordination with SignatureCakes class). Then orchestrator (me) runs build + Playwright QA.

## Commit strategy
Single commit: `fix: mobile responsiveness — vertical slide-in nav, eliminate horizontal scroll on all sections`
Files: Nav.tsx, SignatureCakes.tsx, Testimonials.tsx, Menu.tsx, Gallery.tsx, App.tsx, styles.css