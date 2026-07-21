# mobile-nav-redesign-2 - Work Plan

## TL;DR (For humans)

**What you'll get:** The floating pill nav on mobile is replaced by a clean 3-line hamburger icon that opens a premium right-sliding menu. The menu has interactive nav items (Story, Cakes, Menu Gallery, Process, Reviews + Order button) styled with your bakery's warm cream palette and editorial Fraunces typography. Each item animates on entrance. The hero photo is swapped from the baker's-hands shot to a decadent chocolate cake with strawberries.

**Why this approach:** shadcn Sheet (the industry-standard slide-in panel) is the most accessible, production-tested drawer component — used by thousands of sites. It already has all the shadcn scaffolding installed, so adding it is a single CLI command. The visual styling layer on top (Fraunces, cream palette, staggered animation) gives it the high-end bakery look without reinventing accessibility.

**What it will NOT do:** The desktop pill nav stays exactly as-is. No new sections or routes are created. No changes to scrolling, smooth scroll, or section anchors. No other components or pages are modified.

**Effort:** Medium (3-5 files: new sheet component install, Nav.tsx rewrite, content.json swap)
**Risk:** Low — the shadcn Sheet is production-tested; the existing drawer already works so this is a visual upgrade using the same Framer Motion for animations inside the sheet
**Decisions to sanity-check:** Hero image (pexels 16406494 - chocolate cake with strawberries), mobile-only nav change (desktop untouched), shadcn Sheet (side="right") replaces bespoke Framer Motion drawer

---

> TL;DR (machine): Medium effort, low risk. 3 files modified, 1-2 new UI files. Install shadcn Sheet, replace Nav.tsx mobile drawer, swap hero image.

## Scope
### Must have
- Nav.tsx: Mobile hamburger (lucide-react Menu icon, 3 lines) replaces the current inline SVG + Framer Motion drawer
- shadcn Sheet (side="right") with cream/editorial bakery styling as the slide-in drawer
- 6 interactive nav items: Story, Cakes, Menu, Gallery, Process, Reviews (add testimonials section)
- Each nav item: index number (01-06), Fraunces name, Inter description, lucide-react icon, hover state
- Staggered Framer Motion entrance animation on nav items using SheetBody
- Order CTA at bottom of Sheet closing with accent-butter styling
- Close on link click → scrollToId(id)
- @radix-ui/react-dialog installed via shadcn CLI
- content.json: image_primary replaced with pexels 16406494 (chocolate cake with strawberries)
- content.json: old image moved to image_alt or removed
- npm run build passes with zero errors

### Must NOT have (guardrails, anti-slop, scope boundaries)
- Do NOT modify desktop pill nav (md: flex layout remains identical)
- Do NOT modify scrollToId, Lenis offset, section IDs, or scroll-mt-20 values
- Do NOT add new sections or routes to the app
- Do NOT modify any component outside Nav.tsx (except content.json for hero image)
- Do NOT remove Framer Motion from the project

## Verification strategy
> Zero human intervention - all verification is agent-executed.
- Test decision: tests-after + build verification + Playwright visual QA
- Evidence: .omo/evidence/

## Execution strategy
### Parallel execution waves

Wave 1 (parallel — no deps):
1. Install shadcn Sheet (@radix-ui/react-dialog + sheet.tsx)
2. Update hero image in content.json

Wave 2 (depends on Wave 1):
3. Rewrite Nav.tsx mobile drawer to use shadcn Sheet with interactive nav items

Wave 3 (build + QA):
4. Build verification (npm run build)
5. Playwright mobile-viewport screenshot QA

### Dependency matrix
| Todo | Depends on | Blocks | Can parallelize with |
| --- | --- | --- | --- |
| 1. Install shadcn Sheet | — | 3 | 2 |
| 2. Swap hero image in content.json | — | — | 1 |
| 3. Rewrite Nav.tsx mobile drawer | 1 | 4 | — |
| 4. Build + Playwright QA | 3 | F1-F4 | — |

## Todos
> Implementation + Test = ONE todo. Never separate.
<!-- APPEND TASK BATCHES BELOW THIS LINE WITH edit/apply_patch - never rewrite the headers above. -->

- [x] 1. Install shadcn Sheet component
  What to do / Must NOT do: Run `npx shadcn@latest add sheet` in the project root to install @radix-ui/react-dialog and generate src/components/ui/sheet.tsx. Must NOT modify any existing file. Must NOT install unrelated components. Verify the resulting sheet.tsx exists and exports Sheet, SheetTrigger, SheetContent, SheetClose, SheetHeader, SheetBody, SheetFooter, SheetTitle, SheetDescription, and SheetContent accepts a `side` prop with "right" value. Must confirm TypeScript compiles after install (tsc --noEmit).
  Parallelization: Wave 1 | Blocked by: — | Blocks: Todo 3
  References: project root (package.json confirms shadcn 4.13.1, cva, clsx, tailwind-merge, lucide-react, tailwindcss-animate all present)
  Acceptance criteria (agent-executable): `ls src/components/ui/sheet.tsx` exists, `grep "side" src/components/ui/sheet.tsx` shows side prop handling, `tsc --noEmit` passes.
  QA scenarios (happy): npx shadcn@latest add sheet installs without errors, sheet.tsx generated, tsc passes. QA scenarios (failure): retry if sheet.tsx missing, verify sandbox/interactive flags. Evidence: .omo/evidence/task-1-install-sheet/
  Commit: N (install step, bundled with Nav rewrite)

- [x] 2. Swap hero image to pexels 16406494 (chocolate cake with strawberries)
  What to do / Must NOT do: In content.json (lines 107-111), replace image_primary with:
    "image_primary": {
      "pexels_id": 16406494,
      "url": "https://images.pexels.com/photos/16406494/pexels-photo-16406494.jpeg?auto=compress&cs=tinysrgb&w=2400&q=80",
      "alt": "Closeup of rich chocolate cake decorated with fresh strawberries, warm brown and red tones, shallow depth-of-field",
      "credit": "Pexels (royalty-free)"
    }
  Move the old image_primary (pexels 37290074, baker's hands) to image_alt field. Must NOT delete the image_alt key — repurpose it. Must NOT modify any other field in content.json. Verify the new URL loads (webfetch returns 200).
  Parallelization: Wave 1 | Blocked by: — | Blocks: —
  References: content.json:107-118
  Acceptance criteria (agent-executable): `grep "pexels_id.*16406494" content.json` returns match, `grep "pexels_id.*37290074" content.json` returns match under image_alt key.
  QA scenarios (happy): content.json parseable as JSON, new URL fetchable. QA scenarios (failure): file not valid JSON — validate with `node -e "JSON.parse(require('fs').readFileSync('content.json','utf8'))"`. Evidence: .omo/evidence/task-2-hero-image/
  Commit: N (content change, bundled with Nav rewrite)

- [x] 3. Rewrite Nav.tsx — replace mobile drawer with shadcn Sheet + interactive menu items
  What to do / Must NOT do:
  1. Import Sheet components from "../components/ui/sheet" and { Menu, X } from "lucide-react"
  2. Keep the existing DEKSTOP layout UNCHANGED (line 26-52): fixed pill nav with brand button, desktop link div (hidden md:flex), Order CTA for desktop
  3. Replace the hamburger button (current lines 53-63, 3-line inline SVG) with a lucide-react `<Menu size={20} />` icon inside a `flex md:hidden min-h-[44px] min-w-[44px] items-center justify-center` button as SheetTrigger
  4. Replace the entire Framer Motion drawer (current lines 64-109, AnimatePresence + motion.div with x: 100%) with shadcn SheetContent side="right":
     - SheetContent className="bg-background border-l border-hairline w-full max-w-sm sm:max-w-md p-0"
     - SheetHeader with bakery wordmark in Fraunces font, text-left styling, px-6 pt-8 pb-4, border-b border-hairline
     - SheetBody className="flex-1 overflow-y-auto px-6 py-8": 6 interactive nav items
     - Each nav item: motion.div (staggered, variants from bottom, delay based on index), flex row with:
       - Span "0{N}" in font-mono text-xs text-ink-muted w-8
       - lucide-react icon (each section gets own icon: Book/Story, Cake/Signature, Utensils/Menu, Image/Gallery, Box/Process, Star/Testimonials)
       - Div with section name (font-display Fraunces text-xl text-ink) + description (font-mono text-xs text-ink-muted)
       - Hover: bg-[rgba(58,46,42,0.04)] rounded-xl px-4 -mx-4 transition-colors, cursor-pointer
     - Close sheet + scrollToId(l.id) on item click
     - SheetFooter with Order CTA (accent-butter button), px-6 pb-8 pt-4 border-t border-hairline
     - SheetClose button (X icon) top-right of sheet
  5. Update the links array to include testimonials: `{ label: "Reviews", id: "testimonials", icon: "Star", description: "What our customers say" }`
  6. Add placeholder description texts for each nav item in the links array
  7. Keep ALL existing desktop logic (lines 26-52) UNCHANGED — same pills, same hover states, same Order button
  8. Keep the scrolled state tracking (useState + useEffect) for desktop pill opacity/shadows — unchanged
  9. Keep scrollToId import and usage pattern — unchanged
  10. Remove the old isMenuOpen state (no longer needed — Sheet manages its own open/close state)
  11. Must NOT break the desktop nav — only mobile (<768px) gets the Sheet; md+ unchanged
  12. Must NOT modify the wordmark button, desktop link list, or desktop Order CTA

  Parallelization: Wave 2 | Blocked by: Todo 1 (shadcn Sheet installed) | Blocks: Todo 4
  References: Nav.tsx (full file 112 lines), src/components/ui/sheet.tsx (generated by shadcn), src/lib/SmoothScroll.tsx (scrollToId), src/hooks/useMediaQuery.ts (usePrefersReducedMotion if needed)
  Acceptance criteria (agent-executable):
  - `npm run build` passes (tsc + vite)
  - Desktop layout: same pill nav at md+ breakpoint, all desktop links visible
  - Mobile: hamburger Menu icon visible, tapping opens right-sliding cream Sheet with 6 nav items + Order CTA
  - Each nav item has: index number, icon, Fraunces name, Inter description
  - Staggered animation on open
  - Tap item → closes Sheet → page scrolls to section via scrollToId
  - SheetClose X button works
  - Order CTA at bottom works
  QA scenarios (happy): Build passes, Playwright screenshot confirms hamburger visible at <768px viewport, Sheet opens on tap, items animate in staggered, X closes sheet, nav link click scrolls to section. QA scenarios (failure): Sheet doesn't open, nav links don't scroll, desktop nav broken at md+. Evidence: .omo/evidence/task-3-nav-rewrite/
  Commit: Y | feat: replace mobile drawer with shadcn Sheet + interactive nav menu

- [x] 4. Build verification + Playwright mobile visual QA
  What to do / Must NOT do: Run `npm run build` and confirm zero errors. Launch a local server (serve dist on port 3000), use Playwright at 375px viewport to: (1) screenshot the page showing the hamburger icon in the pill nav, (2) click the hamburger and screenshot the open Sheet showing all 6 interactive nav items + Order CTA, (3) verify Sheet slides from right and has correct styling (cream background, Fraunces typography, accent-butter Order button). Must NOT execute on a broken build. Must NOT modify any files.
  Parallelization: Wave 3 | Blocked by: Todo 3 (Nav rewrite) | Blocks: F1-F4
  References: dist/ folder after build, localhost:3000
  Acceptance criteria (agent-executable): `npm run build` returns exit code 0. Screenshots show hamburger icon on mobile, Sheet opens from right, items display with icons + descriptions.
  QA scenarios (happy): Build + screenshots all pass. QA scenarios (failure): Build has errors — fix before QA. Evidence: .omo/evidence/task-4-build-qa/
  Commit: N (verification task)

## Final verification wave
> Runs in parallel after ALL todos. ALL must APPROVE. Surface results and wait for the user's explicit okay before declaring complete.
- [ ] F1. Plan compliance audit — verify all Must Have items delivered, no Scope OUT items modified
- [ ] F2. Code quality review — review Nav.tsx and sheet.tsx for production quality
- [ ] F3. Real manual QA — run the Playwright mobile screenshot QA again on the final version
- [ ] F4. Scope fidelity — confirm desktop nav is unchanged, no new sections added, hero image is pexels 16406494

## Commit strategy
Single commit on branch main: `feat: replace mobile drawer with shadcn Sheet + interactive nav menu; swap hero image`
Files included: src/components/Nav.tsx, src/components/ui/sheet.tsx (new), content.json, package.json (if deps added)

## Success criteria
- [ ] `npm run build` passes with zero errors
- [ ] Mobile: hamburger Menu icon (3 lines) shown below md breakpoint (768px)
- [ ] Mobile: tapping hamburger opens right-sliding cream Sheet with 6 interactive nav items + Order CTA
- [ ] Each nav item: index number (01-06), lucide-react icon, Fraunces name, Inter description, hover state
- [ ] Staggered entrance animation on nav items (Framer Motion)
- [ ] Tap nav item → closes Sheet → scrolls to section
- [ ] Order CTA at bottom works (scrolls to "visit")
- [ ] Desktop pill nav unchanged (same links, same Order, same floating behavior)
- [ ] Hero image: pexels 16406494 (chocolate cake with strawberries)
- [ ] Old hero image moved to image_alt in content.json
- [ ] SheetClose X button works
