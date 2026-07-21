# mobile-layout-fit - Work Plan

## TL;DR (For humans)

**What you'll get:** Zero horizontal overflow on mobile (375px and 320px viewports). Every section, image, and menu fits within the screen width without clipping or hidden scroll. The menu items grid stacks price below name on small screens. The hero image loads responsively (smaller file on mobile). A dev diagnostic reveals any remaining hidden overflow.

**Why this approach:** The root cause of "horizontal scroll on mobile" is not one bug — it's multiple overflow sources being silently masked by a 3-layer `overflow-x: hidden` cascade (html → body → #root). Fixing each source individually means the defense layer becomes truly defensive instead of a band-aid. Each fix is a surgical CSS/className change, no structural redesign.

**What it will NOT do:** No layout redesign, no new sections, no changes to desktop, no changes to content text, no changes to scroll behavior (Lenis/scrollToId), no changes to color/typography. The pill nav and glass menu stay as-is visually.

**Effort:** Low-Medium (5 files, all className/CSS-level changes, no logic changes)
**Risk:** Low — all changes are CSS containment fixes (min-w-0, responsive grid, srcSet); no behavior change
**Decisions to sanity-check:** Keep overflow-x: hidden on #root as defense-in-depth (remove from html/body so dev can see overflow during testing); menu grid collapses to single-column on ≤380px (price below name); hero image gets srcSet with 3 widths

---

> TL;DR (machine): Low-medium effort, low risk. 5 files modified at CSS/className level only.

## Scope
### Must have
- Menu.tsx: Menu items grid no longer overflows on ≤320px — add `min-w-0` to `<dt>`, add `max-[380px]:grid-cols-1` to the grid so price drops below name on tiny screens
- Nav.tsx: Home button gets `min-w-0` so it shrinks instead of pushing hamburger off-screen
- Hero.tsx: Remove `overflow-hidden` from per-word spans (clip was silently cutting long words); keep Framer Motion animation working
- Hero.tsx: Add `srcSet` + `sizes` to hero `<img>` for responsive image loading (640/1024/2400 widths)
- styles.css: Remove `overflow-x: hidden` from `html` and `body` (keep only on `#root` as `overflow-x: clip`); remove the `@media (max-width: 768px)` re-assertion on html/body; this lets the browser show a scrollbar if any overflow remains, revealing bugs instead of hiding them
- `npm run build` passes with zero errors

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do NOT redesign any layout (no new grid structures, no sidebar nav, no removing the pill nav or glass menu)
- Do NOT modify desktop layout (md+ breakpoint behavior unchanged)
- Do NOT change content.json text content
- Do NOT modify scrollToId, Lenis, smooth scroll, or section IDs
- Do NOT change the color palette, typography, or font sizes
- Do NOT remove Framer Motion animations
- Do NOT add new dependencies

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after + build verification + Playwright visual QA at 375px AND 320px
- Evidence: .omo/evidence/

## Execution strategy
### Parallel execution waves

Wave 1 (parallel — no file deps between these):
1. Fix Menu.tsx grid overflow
2. Fix Nav.tsx home button overflow
3. Fix Hero.tsx word spans + add responsive srcSet
4. Fix styles.css overflow cascade

Wave 2 (depends on Wave 1):
5. Build verification + Playwright QA at 375px and 320px

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Menu.tsx grid fix | — | 5 | 2, 3, 4 |
| 2. Nav.tsx home button fix | — | 5 | 1, 3, 4 |
| 3. Hero.tsx spans + srcSet | — | 5 | 1, 2, 4 |
| 4. styles.css overflow fix | — | 5 | 1, 2, 3 |
| 5. Build + Playwright QA | 1,2,3,4 | F1-F4 | — |

## Todos
> Implementation + Test = ONE todo. Never separate.

- [ ] 1. Fix Menu.tsx grid overflow on small viewports
  What to do / Must NOT do:
  1. In `src/sections/Menu.tsx` line 55, add `max-[380px]:grid-cols-1 max-[380px]:gap-x-0` to the `motion.dl` className so the grid collapses to single column on tiny screens (price drops below name)
  2. On line 63 (the `<dt>`), add `min-w-0` so the item name can shrink within its grid cell instead of forcing overflow
  3. On line 64 (the `<dd>`), add `max-[380px]:text-left` so the price left-aligns when stacked below the name (instead of right-aligned which looks odd in single column)
  Must NOT change the grid on viewports >380px, must NOT change item names or prices, must NOT modify the category tabs or section header.
  Parallelization: Wave 1 | Blocked by: — | Blocks: Todo 5
  References: src/sections/Menu.tsx:55-65 (the `<motion.dl>` and its children)
  Acceptance criteria (agent-executable): `npm run build` passes. At 320px viewport, the menu items grid shows names and prices in a single column (price below name), no horizontal overflow. At 375px+, the two-column layout (name left, price right) is unchanged.
  QA scenarios (happy): Build passes, 320px screenshot shows stacked layout. QA scenarios (failure): 320px screenshot still shows horizontal overflow or clipped price. Evidence: .omo/evidence/task-1-menu-grid/
  Commit: Y | fix: prevent menu grid overflow on small mobile viewports

- [ ] 2. Add min-w-0 to Nav.tsx home button
  What to do / Must NOT do:
  1. In `src/components/Nav.tsx` line 95-101 (the home button), add `min-w-0 shrink` to the className so the button can shrink instead of pushing the hamburger off-screen on very narrow viewports or if the brand name gets longer
  2. Optionally add `truncate` so text gets ellipsis instead of wrapping to a second line (which would break the pill shape)
  3. Add `overflow-hidden` to the pill `<nav>` itself as a last-resort containment
  Must NOT change the pill position, size, backdrop-blur, or desktop behavior. Must NOT change the hamburger button. Must NOT change the glass menu card.
  Parallelization: Wave 1 | Blocked by: — | Blocks: Todo 5
  References: src/components/Nav.tsx:91-126 (nav pill and home button)
  Acceptance criteria (agent-executable): `npm run build` passes. At 320px viewport, the pill nav shows "Beena's Bake House" (or truncated) + hamburger, no overflow. The hamburger is always visible and clickable.
  QA scenarios (happy): Build passes, 320px shows pill with both elements. QA scenarios (failure): 320px shows hamburger pushed off-screen or clipped. Evidence: .omo/evidence/task-2-nav-button/
  Commit: Y | fix: harden nav pill against overflow on small viewports

- [ ] 3. Fix Hero.tsx word spans + add responsive image srcSet
  What to do / Must NOT do:
  1. In `src/sections/Hero.tsx` line 101-103 (the per-word `<span className="inline-block overflow-hidden align-top pr-[0.18em]">`), change `overflow-hidden` to `overflow-visible` so words are not silently clipped. The Framer Motion `y: 110%` → `y: 0` animation still works because the parent `<div>` (line 90) controls vertical flow. The `overflow-hidden` was meant to clip the word during slide-up, but it also clips words wider than the h1's `max-w-[14ch]`.
  2. Alternatively: move `overflow-hidden` from the word span to the line `<div>` (line 90) so the line clips vertically (for the slide animation) but words can extend horizontally. This is the better fix: add `overflow-y-hidden` to the line div, and remove `overflow-hidden` from the word span. Keep `inline-block align-top pr-[0.18em]` on the word span.
  3. In `src/sections/Hero.tsx` line 59-69 (the hero `<motion.img>`), add `srcSet` and `sizes` attributes for responsive loading:
     ```
     srcSet="https://images.pexels.com/photos/16406494/pexels-photo-16406494.jpeg?auto=compress&cs=tinysrgb&w=640&q=80 640w, https://images.pexels.com/photos/16406494/pexels-photo-16406494.jpeg?auto=compress&cs=tinysrgb&w=1024&q=80 1024w, https://images.pexels.com/photos/16406494/pexels-photo-16406494.jpeg?auto=compress&cs=tinysrgb&w=2400&q=80 2400w"
     sizes="100vw"
     ```
  4. Keep `src` as the 2400w URL for fallback. Keep `loading="eager"`, `fetchPriority="high"`, `decoding="async"`, `w-full h-full object-cover`.
  Must NOT change the gradient overlay, the headline text content, the parallax transform, or the eyebrow/subtitle. Must NOT change `max-w-[14ch]` on the h1.
  Parallelization: Wave 1 | Blocked by: — | Blocks: Todo 5
  References: src/sections/Hero.tsx:59-69 (img), :88-118 (h1 + word spans)
  Acceptance criteria (agent-executable): `npm run build` passes. Hero image at 375px loads the 640w or 1024w variant (check Network tab). Headline words are not clipped. Framer Motion slide-up animation still works.
  QA scenarios (happy): Build passes, 375px screenshot shows hero with responsive image, words not clipped. QA scenarios (failure): 375px image still downloads 2400w, or words are clipped. Evidence: .omo/evidence/task-3-hero-fix/
  Commit: Y | fix: prevent hero word clipping + add responsive image srcSet

- [ ] 4. Remove overflow-x: hidden from html/body (keep on #root)
  What to do / Must NOT do:
  1. In `src/styles.css` line 20-21, remove `overflow-x: hidden` from `html` (keep `max-width: 100vw` and other properties)
  2. In `src/styles.css` line 33, remove `overflow-x: hidden` from `body` (keep all other properties)
  3. In `src/styles.css` lines 168-173, remove `overflow-x: hidden` from `html` and `body` in the `@media (max-width: 768px)` block (keep it on `#root`). Or remove the entire html/body lines and keep only `#root { max-width: 100vw; overflow-x: hidden; }` in the media query.
  4. Keep `#root { overflow-x: clip }` at line 39-40 as the single defense layer.
  5. This change means: if any child element overflows, the browser will show a horizontal scrollbar instead of silently clipping. This makes overflow bugs VISIBLE during development and QA. The #root clip layer still prevents overflow from reaching the user in production.
  Must NOT remove overflow-x from #root. Must NOT remove max-width: 100vw from any element. Must NOT add any new CSS rules.
  Parallelization: Wave 1 | Blocked by: — | Blocks: Todo 5
  References: src/styles.css:15-41, 160-174
  Acceptance criteria (agent-executable): `npm run build` passes. If there is any remaining overflow (from todos 1-3 not fully fixing something), it will now show as a horizontal scrollbar in the browser instead of being silently clipped. DevTools console: `document.body.scrollWidth` should equal `window.innerWidth` if all overflow is fixed.
  QA scenarios (happy): Build passes, no horizontal scrollbar visible at 375px or 320px. QA scenarios (failure): horizontal scrollbar appears, indicating an overflow source was not fixed. Evidence: .omo/evidence/task-4-overflow-css/
  Commit: Y | fix: unmask hidden overflow by removing redundant overflow-x hidden layers

- [ ] 5. Build verification + Playwright visual QA at 375px and 320px
  What to do / Must NOT do: Run `npm run build` and confirm zero errors. Launch dev server, use Playwright at 375px (iPhone X) AND 320px (iPhone SE 1st gen) viewports to: (1) screenshot the full page scroll at each size, (2) check DevTools console for `document.body.scrollWidth > window.innerWidth` — if true, overflow remains, (3) screenshot the Menu section at 320px to verify stacked layout, (4) screenshot the hero at 375px to verify image loaded and words not clipped, (5) open the glass menu at 320px to verify it fits. Must NOT execute on a broken build. Must NOT modify any files.
  Parallelization: Wave 2 | Blocked by: Todos 1,2,3,4 | Blocks: F1-F4
  References: dist/ folder after build, localhost:5173
  Acceptance criteria (agent-executable): `npm run build` returns exit code 0. `document.body.scrollWidth === window.innerWidth` at both 375px and 320px. Screenshots show no horizontal scrollbar, no clipped content, menu stacked on 320px, hero image loaded at 375px.
  QA scenarios (happy): Build + screenshots + console check all pass. QA scenarios (failure): Build has errors, or scrollWidth > innerWidth, or screenshots show clipped content. Evidence: .omo/evidence/task-5-build-qa/
  Commit: N (verification task)

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE.
- [ ] F1. Plan compliance audit — verify all Must Have items delivered, no Scope OUT items modified
- [ ] F2. Code quality review — review all 4 changed files for production quality (no stray overflow, no broken animations)
- [ ] F3. Real manual QA — Playwright at 375px AND 320px, console scrollWidth check, screenshot evidence
- [ ] F4. Scope fidelity — confirm desktop layout unchanged, no new dependencies, no content text changes

## Commit strategy
Single commit on branch main: `fix: eliminate mobile horizontal overflow across menu, nav, hero, and overflow cascade`
Files included: src/sections/Menu.tsx, src/components/Nav.tsx, src/sections/Hero.tsx, src/styles.css

## Success criteria
- [ ] `npm run build` passes with zero errors
- [ ] At 375px: no horizontal scrollbar, no clipped content
- [ ] At 320px: no horizontal scrollbar, menu items stack (price below name), nav pill fits, glass menu fits
- [ ] Hero image loads responsive variant (640w or 1024w on mobile)
- [ ] Hero headline words not clipped
- [ ] `document.body.scrollWidth === window.innerWidth` at both 375px and 320px
- [ ] Desktop layout (md+) completely unchanged
- [ ] Framer Motion animations still work (hero word slide-up, menu category transitions)