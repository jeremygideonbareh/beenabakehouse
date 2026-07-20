# Beena's Bake House — Design System & Build Brief

> Cinematic, kinetic, pastel-bright website for a 25-year-old home-based custom cake bakery
> in Thiruvananthapuram (Trivandrum), Kerala, India.

---

## 1. Business Snapshot (verified research)

| Field | Value | Source / Confidence |
|---|---|---|
| Business name | Beena's Bake House | Instagram + Facebook |
| Tagline (Instagram bio) | "Homemade delicious fresh butter cakes — Affordable & Customisable — 25 yrs baking experience" | @beenasbakehouse |
| Location | Thiruvananthapuram (TVM / Trivandrum), Kerala, India | Instagram bio "@Tvm" |
| Business model | Home-based, order-only, home-delivery (TVM only) — NO walk-in storefront | Instagram bio + Facebook |
| Years in business | 25 years baking experience (≈ founded 2000) | Instagram bio |
| Phone / WhatsApp | +91 96330 44035 / WhatsApp +91 98957 65653 | Instagram bio |
| Email | beenabakehouse@gmail.com | Facebook page |
| Existing website | beenasbakehouse.com — currently DOWN (transport error) | Facebook page |
| Facebook | facebook.com/beenasbakehouse — 27 reviews, 88% recommend, "Always open", price tier $ | Facebook |
| Instagram | @beenasbakehouse — 948 followers, 334 following, 188 posts | Instagram |
| Owner's quote (FB) | "Let's face it, a nice creamy chocolate cake does a lot for a lot of people; it does for me." | Facebook |
| Specialties | Homemade butter cakes, creamy chocolate cakes, customisable celebration cakes, affordable pricing | Instagram + FB |
| Google Maps listing | NOT present — no storefront | Direct search |
| Apify Instagram scrape | NOT executed — no Apify MCP available in environment; Instagram blocks unauth scraping | Tool inventory |

**What we will NOT fabricate:** individual customer review text, specific Instagram post captions, exact follower-count history, or product prices. The site will use editable placeholder copy that the client can replace with their real quotes, captions and pricing.

---

## 2. Brand & Tone Direction

A **warm, bright, pastel, cinematic** site that honors 25 years of home-baking heritage while feeling premium and modern. Think *Sonoma Bakery's editorial heritage × Café Binocle's playful pastel × Bernice Bakery's kinetic joy* — but tuned for a Kerala home bakery that does custom celebration cakes.

- Voice: warm, humble, confident, family-first. Avoids hype. Speaks about "made-by-hand", "25 years", "delivered to your door in Trivandrum".
- Tagline candidates (for client approval):
  - "Baked at home. Delivered with love. Since the turn of the century."
  - "Twenty-five years of butter, flour and you."
  - "Trivandrum's homemade cake, since 2000."

---

## 3. Color Palette — "Confectionery Air" (locked)

Derived from cross-referencing award-winning bakery/café sites and pastel brief — bright side, not muted.

| Role | Name | Hex | Usage |
|---|---|---|---|
| Background | Bone Cream | `#FBF7F0` | Page base — warm, breathable |
| Surface | Soft Blush | `#F7E4DF` | Cards, panels, dividers |
| Accent 1 (butter) | Butter Yellow | `#FFE26E` | Kinetic loader color, pill CTAs, underlines, hover fills |
| Accent 2 (peach) | Soft Peach | `#FFCBA4` | Secondary CTAs, tags, marquee |
| Accent 3 (mint) | Sage Mint | `#B8D4C2` | "Fresh/daily" badges, lighter accent |
| Text (primary) | Deep Cocoa | `#3A2E2A` | All headings + body (warmer than black) |
| Text (muted) | Mocha | `#6B5852` | Captions, meta, small print |
| Hairline | Linen | `#E8DCC9` | 1px borders, separators |

**Contrast check:** Deep Cocoa `#3A2E2A` on Bone Cream `#FBF7F0` ≈ 11.5:1 (AAA). Mocha `#6B5852` on Bone Cream ≈ 5.8:1 (AA body). Butter Yellow used only for large UI elements + accents, not body text.

---

## 4. Typography — "The Heritage" pairing

| Role | Font | Source | Weights |
|---|---|---|---|
| Display headline | **Fraunces** (variable, ital enabled) | Google Fonts | 300, 400, 500, 9pt-144 optical |
| Body | **Inter** | Google Fonts | 400, 500, 600 |
| Accent (handwritten pull-quote) | **Cormorant Garamond** Italic | Google Fonts | 400 italic |
| Mono (meta, hours, dates, captions) | **JetBrains Mono** | Google Fonts | 400, 500 |

### Type scale

| Token | Size (desktop) | Size (mobile) | Family | Weight |
|---|---|---|---|---|
| hero-display | 144px | 56px | Fraunces | 400, italic opt |
| h2 | 64px | 36px | Fraunces | 400 |
| h3 | 40px | 28px | Fraunces | 500 |
| body-lg | 20px | 18px | Inter | 400 |
| body | 17px | 16px | Inter | 400 |
| caption | 13px | 12px | JetBrains Mono | 500 |
| eyebrow | 12px | 11px | JetBrains Mono | 500, uppercase, letter-spacing 0.14em |

### Loading the fonts

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..600;1,9..144,300..500&family=Inter:wght@400;500;600&family=Cormorant+Garamond:ital,wght@1,400&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 5. Motion System

### Stack
- **GSAP** + **ScrollTrigger** — pinned sections, scrubbed word reveals, hero timeline
- **Lenis** — buttery smooth scroll (subtle, `lerp: 0.1`)
- **Framer Motion** — component enter/exit, layout transitions, magnetic links
- Lottie (optional) — loader flourishes if a brand SVG is supplied later

### Kinetic loader (locked spec)
Duration: 1.4s total. Respects `prefers-reduced-motion` (instant resolve to hero).

1. **0.0–0.6s**: Bone Cream full-screen flash. Wordmark "Beena's Bake House" draws in via SVG `stroke-dasharray` (Fraunces italic wordmark as path), stroke color Deep Cocoa.
2. **0.6–1.0s**: A butter-yellow pill pills-in from bottom with the eyebrow "Est. 2000 · Trivandrum" in JetBrains Mono.
3. **1.0–1.4s**: Curtain wipe — Butter Yellow panel slides down-out (or up-out), revealing hero. Hero image resolves from `opacity 0 → 1, scale 1.08 → 1` over the remaining time.

### Page transitions
- View Transitions API where supported (620ms curtain in Butter Yellow through a `clip-path` inset).
- Fallback: GSAP `gsap.to(overlay, { yPercent: -100, duration: 0.62, ease: 'power3.inOut' })`.

### Scroll choreography
- **Hero**: word-by-word reveal of the 2-line headline (stagger 0.05s, `y: 40 → 0`).
- **Story section**: pinned image of baker hands (Ken Burns scale 1 → 1.06 over 4s, loops), text scrolls over it.
- **Signature cakes**: horizontal-scroll carousel, scroll-pinned via `ScrollTrigger`, 3 product cards visible at once.
- **Gallery**: asymmetric 5-column masonry; each image enters with `y: 32 → 0, opacity 0 → 1, scale 0.96 → 1`.
- **Process/25 years**: vertical timeline with a pinned left rail; right column reveals year-card as it enters.

### Custom cursor
- Default: 6px Deep Cocoa dot, lerp-followed.
- Hover on links/cards: expands to 40px ring with 1px Deep Cocoa stroke, transparent fill.
- In menu section: swaps to a small croissant SVG cursor (32px).
- Hidden on `(pointer: coarse)` and `prefers-reduced-motion: reduce`.

### Microinteractions
- Magnetic hero CTA (Framer Motion `useSpring`, offset 32px max).
- Add-to-inquiry pill: small "item flies to top nav cart" animation (Framer Motion `layoutId`).
- Underline draw on text links via `stroke-dasharray` of an inline SVG path, 360ms.
- Cookie-crumbs cursor trail in the cake-detail section (Bernice Bakery reference) — max 18 crumbs, fades 1.2s.

---

## 6. Information Architecture

```
/ (single-page application with sections, plus a /cakes detail route)

  1. Kinetic loader
  2. Hero
  3. Story / 25 Years (heritage, founder note)
  4. Signature Cakes (carousel)
  5. Menu / Order (cards, category tabs)
  6. Gallery (masonry)
  7. Process (timeline, "our craft" steps)
  8. Testimonials (88% recommend — placeholder review cards)
  9. Visit / Contact / Order CTA (no street address — phone + WhatsApp + service area map)
 10. Footer (marquee of "Trivandrum • Since 2000 • Homemade • Delivered")
```

Navigation is a fixed top bar that becomes a soft cream pill on scroll, with a magnetic "Order" CTA on the right.

---

## 7. Content Map (real data → placeholders)

Every piece of replaceable client content is stored in `/content.json` (sibling to this file). The build reads from `content.json` so the client can edit copy, prices, and images without touching code.

| Section | Field | Value (verified real OR marked placeholder) |
|---|---|---|
| Hero.eyebrow | "Est. 2000 · Trivandrum · Homemade" | REAL (derived from 25 yrs experience) |
| Hero.title line 1 | "Twenty-five years" | Placeholder (subject to client tagline approval) |
| Hero.title line 2 | "of baking home." | Placeholder |
| Hero.subtitle | "Custom butter cakes, made to order, delivered across Trivandrum." | Aligned with IG bio |
| Hero.primary CTA | "Order a cake" | |
| Hero.secondary CTA | "See our cakes" | |
| Contact.phone | +91 96330 44035 | REAL (IG bio) |
| Contact.whatsapp | +91 98957 65653 | REAL (IG bio) |
| Contact.email | beenabakehouse@gmail.com | REAL (FB) |
| Contact.instagram | @beenasbakehouse | REAL |
| Contact.facebook | facebook.com/beenasbakehouse | REAL |
| Contact.serviceArea | "Thiruvananthapuram (Trivandrum), Kerala, India — home delivery only" | REAL |
| Testimonials.aggregate | "88% recommend · 27 Facebook reviews" | REAL |
| Testimonials.individual quotes | 3–6 placeholder warm quotes (clearly editable) | PLACEHOLDER |
| Menu prices | placeholders (₹) | PLACEHOLDER |
| Gallery images | Pexels CDN URLs (curated, pastel aesthetic) | PLACEHOLDER (royalty-free) |

---

## 8. Imagery Inventory

All from Pexels CDN (royalty-free, hot-linkable). Full URLs + sizing in `/content.json`.

| Section | Pexels photo ID | Description |
|---|---|---|
| Hero | 37290074 | Baker hands shaping pita dough on floured wood — warm tones (verified) |
| Hero alt | 30403209 | Golden croissant stack — dramatic (verified) |
| Story | 6280041 | Close-up hands mixing flour on wooden board |
| Story alt | 27564591 | Baker kneading dough — motion blur |
| Story storefront | 18420537 | Bakery window loaves, urban warm glow |
| Signature: macarons | 8625947 | Pastel mint/blush macarons on grey wood — perfect aesthetic (verified) |
| Signature: croissants | 30403209 | Golden flaky croissants |
| Signature: celebration cake | 5691261 | Yellow buttercream with macarons + gold |
| Signature: chocolate cake | 15564375 | Rich chocolate cake on wood |
| Signature: sourdough | 36202913 | Scored sourdough on cutting board |
| Gallery | 17057406, 29170275, 28495593, 30822876 | Bakery products, donuts, cookies, glazed donut |
| Process | 15577266, 37888518, 18613262, 35156656 | Bread scoring, sugar dusting, berry on cake, oven cookies |
| Texture | 11034660, 7965940, 13277182, 6195 | Wheat on spoon, butter blocks, eggs/flour/bowl, crusty bread |

URL pattern: `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w={W}&q={Q}`
- Hero: `w=2400&q=80`
- Section feature: `w=1600&q=80`
- Product card: `w=800&q=80`
- Thumbnail: `w=400&q=75`

---

## 9. Tech Stack

| Concern | Choice | Rationale |
|---|---|---|
| Framework | **Vite + React 18 + TypeScript** | Fast build, simple deploy, no SSR needed for a marketing site |
| Styling | **Vanilla CSS Modules + CSS custom properties** | No runtime overhead; precise control for kinetic/motion design |
| Motion | **GSAP + ScrollTrigger**, **Framer Motion**, **Lenis** | Per the motion system above |
| Fonts | Google Fonts via `<link>` | Fraunces, Inter, Cormorant Garamond, JetBrains Mono |
| Forms | Static form → mailto / WhatsApp deep link (or Netlify Forms if requested) | No backend required |
| Imaging | Pexels CDN URLs (swap for client's real images later) | Hot-linkable, free, on-brand |
| Deploy | Vercel | Free, fast, simple for a static React site |
| Analytics | Plausible (optional, client-provided key) | Privacy-friendly |

**Accessibility floors:**
- WCAG AA contrast everywhere.
- `prefers-reduced-motion` respected — all motion resolves statically.
- `prefers-contrast: more` respected — palette swaps to higher-contrast variants.
- Keyboard navigable; focus rings visible; skip-to-content link.
- All animation off-screen pauses (no invisible CPU usage).

**Performance floors:**
- LCP < 2.0s on 4G (image preloading critical hero, avif via Vercel image optimizer if we self-host).
- CLS < 0.05 (image width/height attrs, font-display: swap, no layout-shifting animations).
- INP < 100ms (GSAP will-change only on animated elements; debounced scroll handlers).

---

## 10. Build Plan (will execute after this design brief is approved)

### Phase C1 — Scaffold & foundation (~30 min)
- [ ] `npm create vite@latest . -- --template react-ts`
- [ ] Install GSAP, @gsap/react, framer-motion, lenis
- [ ] Add Google Fonts `<link>` to `index.html`
- [ ] Add `content.json`, `DESIGN.md` (this file)
- [ ] Set up Vercel project & link

### Phase C2 — Core pieces (~60 min)
- [ ] `LenisProvider` (smooth scroll) gated by `prefers-reduced-motion`
- [ ] `CustomCursor` component (dot → ring → croissant)
- [ ] `KineticLoader` (1.4s timeline per spec)
- [ ] `PageTransitionCurtain` (butter-yellow clip-path)
- [ ] Design tokens in `tokens.css` (all hex + type scale)
- [ ] Typography primitives, `Eyebrow`, `PillButton`, `MagneticLink`

### Phase C3 — Sections (~2 h)
- [ ] `Hero` (word-by-word reveal, 2-line headline, dual CTA)
- [ ] `Story` (pinned image + 3 paragraphs + pull-quote)
- [ ] `SignatureCakes` (horizontal-scroll pin carousel)
- [ ] `Menu` (category tabs + product cards with hover microinteractions)
- [ ] `Gallery` (asymmetric masonry with Ken Burns)
- [ ] `Process` (vertical timeline, 25-yr milestones)
- [ ] `Testimonials` (88% aggregate + 3 placeholder cards)
- [ ] `VisitContact` (phone/WhatsApp/email + Trivandrum service-area map embed)
- [ ] `Footer` (marquee + 4 columns + wordmark)

### Phase C4 — Polish & motion QA (~45 min)
- [ ] Tune ScrollTrigger timings
- [ ] Add cookie-crumbs cursor trail in Menu/Cake detail
- [ ] Add `prefers-reduced-motion` branch for every animation
- [ ] Lighthouse pass on hero / images
- [ ] Cross-browser (Chrome, Edge, Safari if available)

### Phase C5 — Deploy (~15 min)
- [ ] Vercel deploy
- [ ] Provide live preview URL + content.json edit guide for client

---

## 11. Open Questions for Client (do NOT block build — placeholders until answered)

1. Exact founding year (we inferred ~2000 from "25 yrs experience").
2. Direct review quotes from Facebook (we cannot access unauth).
3. Real product list with prices.
4. Real product photos (we are using Pexels placeholders — swap-in ready).
5. Tagline preference (3 candidates in §2).
6. Any logo SVG we should use in the kinetic loader (currently only wordmark).
7. Order/contact form preference: mailto / WhatsApp deep link / a real backend.

---

## 12. Reference Sites (verified from research)

| Site | URL | Why we reference |
|---|---|---|
| Bernice Bakery | https://bernicebakery.com/ | Cookie crumbs cursor, kinetic bakery microinteractions (HM Feb 2025) |
| Café Binocle | https://www.cafebinocle.com/ | Cream + butter palette, hand-drawn accents (HM Apr 2026) |
| Sonoma Bakery | https://sonomabakery.com/ | "Long-established" editorial heritage tone, pinned story (HM Jun 2022) |
| Flora Café | https://www.florawellnesscafe.com/ | Italic serif headlines, illustration warmth (Nominee 2026) |
| Lula Avocado Oil | https://lulaoil.com/ | Premium product-led storytelling, comparison grid (Nominee 2026) |
| Crav Burgers | https://www.cravburgers.shop/ | Loader + page-transition + footer marquee patterns (SOTD Jun 2026) |
| Mah Ze Dahr Bakery | http://mahzedahrbakery.com/ | Premium patisserie tone for long-established feel (SOTD 2013) |