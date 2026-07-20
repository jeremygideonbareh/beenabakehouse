# Learnings - Beena Bakehouse Mobile Optimization

## Project Architecture
- Vite + React 18.3.1 + TypeScript, Tailwind v3.4.19, Framer Motion 11 + GSAP + Lenis
- 9 sections (Hero, Story, SignatureCakes, Menu, Gallery, Process, Testimonials, VisitContact, Footer)
- 6 shared components (Nav, PillButton, LinkUnderline, CustomCursor, KineticLoader, PageCurtain)
- Data-driven content from content.json
- Deploy: GitHub Pages via GitHub Actions, base URL /beenabakehouse/

## Key Findings from Explore Audit
- Very sparse responsive breakpoint usage across sections
- No mobile-first approach - site is desktop-first with max-md overrides
- No custom screens in tailwind.config.js

## Critical Mobile Gaps
1. No mobile menu - Nav hides links with max-sm:hidden, no alternative
2. Touch targets below 44px - Menu tabs ~32-36px, price badges 0.68rem
3. No scroll-margin-top - Fixed nav overlaps anchor targets
4. No srcset or picture - mobile downloads desktop-sized images
5. No explicit text-base on form inputs - iOS zoom risk
6. No inputmode/autocomplete on form fields
7. No scrollbar-hide utility for carousels
8. Body font-size not explicitly set for mobile
