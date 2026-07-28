# TOPPANEL Homepage — Full Redesign Implementation Brief

## Codebase Context

Next.js 14 App Router, TypeScript, Tailwind CSS v3, Framer Motion, Lucide React icons.
Static export (`output: "export"`) deployed on Netlify. No server-side rendering.
All site content lives in `src/data/data.ts` — do NOT edit content there unless instructed.
Existing images: `/images/DRC-S01.jpg`, `/images/DRC-D20.jpg`, `/images/DRC-D29.jpg`,
`/images/TopPanel logo.svg`, `/images/TopPanel logo white.svg`.

---

## Goal

Implement a complete visual redesign based on the provided design reference. The new
design replaces the current dark cinematic hero and navy palette with a clean,
light, editorial Japanese-minimal aesthetic. Every component listed below must be
rebuilt or restyled exactly as specified. Do not change any other pages — only the
files listed in this brief.

---

## 1 — Color Palette (tailwind.config.ts)

Replace ALL existing color tokens with this new set:

```ts
colors: {
  // Brand
  primary:        "#111111",   // near-black — text, buttons, borders
  "primary-hover":"#333333",
  "primary-light":"#555555",
  "primary-bg":   "#f5f2ee",   // warm off-white — page background
  "primary-dark": "#0a0a0a",   // deepest black

  // Surfaces
  surface:        "#faf8f5",   // slightly warmer than white — card/panel bg
  "surface-2":    "#f0ece6",   // dividers, subtle section bg

  // Neutrals
  text:   "#111111",
  muted:  "#888880",           // captions, labels
  border: "#e0dbd4",           // default border — warm gray

  // Gold accent (keep for select CTAs)
  gold:       "#c8a96e",
  "gold-dark":"#a07840",

  // Semantic
  destructive: "#ef4444",
  success:     "#22c55e",

  // Legacy aliases — keep so existing components don't break
  ink:             "#111111",
  body:            "#333333",
  "border-strong": "#c8c4be",
  "surface-2":     "#f0ece6",
  accent:          "#111111",
  "accent-warm":   "#c8a96e",
  charcoal:        "#1e293b",
  dark:            "#334155",
  mid:             "#888880",
  light:           "#c8c4be",
  off:             "#faf8f5",
}
```

Also set the body background in `src/app/globals.css`:
```css
body { background-color: #f5f2ee; }
```

---

## 2 — Navbar (src/components/layout/Navbar.tsx)

Full rewrite. The new navbar is a single flat bar — no top utility bar.

**Layout (desktop):**
- Height: 72px, `bg-white border-b border-[#e0dbd4]`.
- **Left zone:** `<Link href="/">` containing:
  - `TOPPANEL` in `text-xl font-black tracking-tight text-[#111111]` (NOT the SVG logo)
  - Below it: `공간을 완성하는 화장실칸막이 솔루션` in `text-[10px] text-[#888880] tracking-wide`
- **Center zone:** Horizontal nav links. Use this exact list and hrefs:
  - `회사소개` → `/about`
  - `제품소개` → `/products`
  - `프로젝트` → `/project`
  - `기술력` → `/technology`
  - `자료실` → `/download`
  - `큐비클 유니버스` → `/story`
  - `고객지원` → `/contact`
  - Style each: `text-[13px] font-medium text-[#333333] hover:text-[#111111] px-3 py-1
    tracking-wide transition-colors`. Active link gets `font-semibold text-[#111111]`.
  - NO dropdown — remove the Products mega-dropdown entirely. Products links are now
    direct nav items.
- **Right zone:**
  - Language toggle: `KR | EN` in `text-xs text-[#888880]` with a thin `|` divider.
    KR is always active/bold. EN is a placeholder (no routing needed).
  - Thin vertical divider `|`
  - Hamburger icon (Lucide `Menu`, size 20) — only opens mobile drawer

**Mobile drawer:** Slide from right, white background. All nav links stacked. Close on
link click. Keep KakaoTalk CTA at bottom of drawer.

**Remove:** Top utility bar (phone/email/kakao strip), the 0.5px primary-color bottom
border that fades on scroll, the CTA button in the nav bar.

---

## 3 — Hero (src/components/home/Hero.tsx)

Full rewrite. This is the most important component.

### 3a — Layout

The hero is a **two-column split**, full viewport height minus navbar (72px):
```
height: calc(100svh - 72px); min-height: 620px;
background: #f5f2ee;
```

- **Left column (55% width):** Product photograph, flush to the section edges, no
  padding. Image fills the column completely (`object-cover object-center`).
  Use `HERO_SLIDES[current].image` as the source. Keep the 3-slide auto-advance with
  the same 6500ms interval and animated progress bars at the bottom-left corner.
  
  In the **bottom-left corner** of the image panel, overlay a small material-swatch
  indicator (absolute positioned, z-10):
  - A 56×56px thumbnail of the image (cropped square, rounded-none)
  - Next to it: `TAKIRON HPL` in `text-[9px] font-bold tracking-[0.4em] uppercase
    text-[#555555]` and `PREMIUM CUBICLE SYSTEM` in `text-[8px] text-[#888880]`
  - Background: `bg-white/85 backdrop-blur-sm` pill, padding `px-3 py-2`
  - Position: `bottom-6 left-6`

- **Right column (45% width):** The orbital diagram (see §3b). Background `#f5f2ee`.
  Centered both axes. No padding on outer edges — the diagram itself provides breathing
  room.

On mobile (< lg breakpoint): Stack vertically. Image takes 55vw height, diagram fills
remaining space below. Diagram scales down to fit.

### 3b — Orbital Diagram Component (src/components/home/OrbitalDiagram.tsx)

Create this as a separate client component and import it into Hero.

The diagram is an **SVG** rendered inside a `div` that fills the right column. It is
NOT animated with rotation — it is static but with Framer Motion entrance animations
(nodes fade + scale in with staggered delays).

**SVG canvas:** `viewBox="0 0 500 500"`, `width="100%"`, `height="100%"`,
`style="max-width: 520px; max-height: 520px"`. Centered in the right column.

**Center circle:**
- `cx=250 cy=250 r=72`
- `fill="white"` `stroke="#d4cfc9"` `strokeWidth="1"`
- Inside: `TOPPANEL` text at (250, 242) — `fontSize="13"` `fontWeight="700"` `fill="#111111"` `textAnchor="middle"` `letterSpacing="0.15em"`
- Below it: `공간을 완성하는` at (250, 258) and `화장실칸막이 솔루션` at (250, 272)
  both `fontSize="7"` `fill="#888880"` `textAnchor="middle"`

**Orbital rings (2 concentric dashed circles):**
- Inner ring: `r=130` `cx=250 cy=250` `fill="none"` `stroke="#d4cfc9"` `strokeWidth="0.8"` `strokeDasharray="3 5"`
- Outer ring: `r=200` `cx=250 cy=250` `fill="none"` `stroke="#d4cfc9"` `strokeWidth="0.8"` `strokeDasharray="3 5"`

**Connector lines (from center to each node, along the outer ring radius):**
- 6 lines from (250,250) to each node center
- `stroke="#d4cfc9"` `strokeWidth="0.8"` `strokeDasharray="3 5"`
- Stop line slightly before node edge (shorten by ~28px so it doesn't overlap the node)

**Decorative scatter dots:**
Place ~12 small dots (`r=2` `fill="#d4cfc9"`) at visually balanced positions around
the diagram — roughly between the rings, between nodes, creating a sense of depth.
Example positions (not exhaustive, distribute evenly):
(145,130), (360,125), (410,260), (355,395), (148,388), (100,250),
(195,92), (315,88), (415,180), (420,335), (192,415), (88,330)

**The 6 nodes** — positioned on the outer ring (`r=200`) at these angles:

| # | Angle | English label | Korean label | Description | Icon |
|---|-------|--------------|--------------|-------------|------|
| 1 | 270° (top) | PRODUCTS | 제품소개 | 다양한 프리미엄 제품군 | door-panel (2 vertical rectangles) |
| 2 | 330° (top-right) | AUTO DOOR | 자동문 시스템 | 슬라이딩·접이·센서 자동문 | sliding-door (rectangle with arrow) |
| 3 | 30° (bottom-right) | TECHNOLOGY | 기술력 | 검증된 제조 기술력 | document with lines |
| 4 | 90° (bottom) | CUBICLE UNIVERSE | 큐비클 유니버스 | 큐비클 소재·색상 탐색 | open book |
| 5 | 150° (bottom-left) | PROJECT | 프로젝트 | 시공 레퍼런스 갤러리 | building outline |
| 6 | 210° (top-left) | FIRE SYSTEM | 불연 시스템 | 화재 안전 칸막이 솔루션 | shield outline |

Angle math: node center = `(250 + 200·cos(θ), 250 + 200·sin(θ))` where 0° = right.
Top = 270° = `(250, 50)`, top-right = 330° = `(250+173, 250-100)` = `(423, 150)`, etc.

**Each node rendering:**
- Outer circle: `r=26` `fill="white"` `stroke="#d4cfc9"` `strokeWidth="1"`
- Icon: inline SVG path drawn inside the circle at ~14px size (centered on node). Use
  simple geometric paths — no external icon library inside SVG. Draw each icon with 1–2
  `<path>` elements, `stroke="#888880"` `strokeWidth="1.2"` `fill="none"`.
- Below node center: English label `fontSize="7.5"` `fontWeight="700"` `fill="#333333"` `letterSpacing="0.12em"` — positioned ~36px below node center
- Korean label: `fontSize="7"` `fill="#888880"` — 10px below English label
- Description: `fontSize="6.5"` `fill="#aaa9a4"` — 10px below Korean label (may wrap, use `<tspan>`)
- For nodes at top and bottom: center-align text. For left-side nodes (210°, 150°):
  right-align text (`textAnchor="end"`). For right-side nodes (330°, 30°): left-align
  (`textAnchor="start"`). Top (270°) and bottom (90°): center.

**Framer Motion entrance:** Wrap the entire SVG in a `motion.div`. Each node group
wrapped in `motion.g` (or wrap SVG items using `motion.circle` etc.) with:
- `initial={{ opacity: 0, scale: 0.7 }}`
- `animate={{ opacity: 1, scale: 1 }}`
- `transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}`

**Hover on nodes:** Each node group gets `className="cursor-pointer"` and wraps in a
`<Link>` component pointing to the relevant page. On hover (CSS `group-hover` via
wrapping `<g className="group">`): change node circle stroke to `#111111`.

**Node → page mapping:**
- PRODUCTS → `/products`
- AUTO DOOR → `/products/auto-door`
- TECHNOLOGY → `/technology`
- CUBICLE UNIVERSE → `/story`
- PROJECT → `/project`
- FIRE SYSTEM → `/products/non-combustible`

### 3c — Hero Bottom Bar

At the bottom of the left (image) column, show the slide progress indicators:
- Absolutely positioned: `bottom-6 right-6` within the image column
- 3 thin bars, current slide = 36px wide white, others = 12px white/40
- Animated fill progress bar on current slide (same logic as current implementation)

Remove: the SCROLL cue, the NEXT button on the right edge, the slide counter top-right,
the full-bleed overlay, the Ken Burns zoom, the cinematic overlay layers, the clip-path
logo reveal. The new design does not use these.

---

## 4 — Home Page (src/app/page.tsx)

Replace the current section order with:
```tsx
<main>
  <Hero />
  <SolutionStoryTeaser />   {/* restyled — see §5 */}
</main>
```

Remove: `<ProcessFlow />`, `<WhyToppanel />`, `<Stats />`, `<ContactCTA />` from the
home page import list. They still exist as files — just remove them from page.tsx.

---

## 5 — Solution Story Teaser (src/components/home/SolutionStoryTeaser.tsx)

Restyle to match the design reference. The section sits directly below the hero.

**Layout:** `bg-[#f5f2ee]` section, `py-0` (no top padding — butts directly against
hero). Use `border-t border-[#e0dbd4]`.

4-column grid of horizontal story cards. Each card:
- `bg-white border border-[#e0dbd4]` — no border-radius (sharp corners)
- Flex row: left text area + right image
- **Left:** `p-6` — category tag in `text-[9px] font-bold tracking-[0.4em] uppercase
  text-[#888880]`, then bold title `text-sm font-semibold text-[#111111] leading-snug
  mt-2 mb-4`, then `자세히 보기` link with `→` arrow in `text-[11px] text-[#888880]
  hover:text-[#111111]`
- **Right:** Fixed `w-32` image, fills full card height, `object-cover`
- Card height: `h-36`

Show 4 posts from `STORY_POSTS`. No section header/tagline above the cards.

---

## 6 — Footer (src/components/layout/Footer.tsx)

Full rewrite to a minimal 2-column layout.

```
bg-[#f5f2ee] border-t border-[#e0dbd4]
py-10 px-8 lg:px-16
max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12
```

**Left column:**
- `TOPPANEL` in `text-lg font-black tracking-tight text-[#111111]`
- Company address, phone, fax, email below in `text-xs text-[#888880] leading-relaxed mt-3`
  (pull from `COMPANY` data: address, phone, email)
- Copyright line: `© 2025 탑판넬 (TOPPANEL Co., Ltd.) All rights reserved.` in
  `text-[10px] text-[#aaa] mt-4`

**Right column:**
- 3 action links arranged horizontally (flex row, gap-8), each with a Lucide icon:
  - `Download` icon + `카탈로그 다운로드` → `/download`
  - `MessageCircle` icon + `견적문의` → `/contact`
  - `MapPin` icon + `찾아오시는 길` → `/contact#map`
- Style each: `flex flex-col items-center gap-2 text-[11px] text-[#888880]
  hover:text-[#111111] transition-colors`; icon at size 18, stroke-width 1.5
- Align the group to the right: `flex justify-end items-center`

Remove: the 4-column grid, the Products column, the "빠른 문의" column, the KakaoTalk
button from the footer, the bottom bar with business registration number.

---

## 7 — Globals (src/app/globals.css)

Add these rules:
```css
body {
  background-color: #f5f2ee;
  color: #111111;
}

/* Remove blue focus ring — use subtle outline */
:focus-visible {
  outline: 1.5px solid #888880;
  outline-offset: 2px;
}
```

---

## Constraints & Rules

- **Do NOT** change any page other than `page.tsx`. All inner pages (`/about`,
  `/products`, etc.) keep their current layout — only Navbar and Footer will update
  globally via layout.tsx.
- **Do NOT** modify `src/data/data.ts`.
- **Do NOT** add new npm packages — use only existing dependencies (Framer Motion,
  Lucide React, Next.js Image).
- **Do NOT** use `next/script` — static export incompatibility.
- Keep all `aria-label`, `role`, and accessibility attributes.
- Use `"use client"` only on components that need it (Hero, OrbitalDiagram, Navbar).
- This is early-stage local development — do NOT run `npm run build`. Use `npm run dev`
  to verify the result in the browser at localhost:3000. Fix any errors that break the
  dev server or cause visible issues, but do not worry about production-build warnings.

---

## File Change Summary

| File | Action |
|------|--------|
| `tailwind.config.ts` | Update color tokens |
| `src/app/globals.css` | Update body background + focus ring |
| `src/app/page.tsx` | Trim to Hero + SolutionStoryTeaser only |
| `src/components/layout/Navbar.tsx` | Full rewrite |
| `src/components/home/Hero.tsx` | Full rewrite (split layout) |
| `src/components/home/OrbitalDiagram.tsx` | Create new component |
| `src/components/home/SolutionStoryTeaser.tsx` | Restyle cards |
| `src/components/layout/Footer.tsx` | Full rewrite (minimal 2-col) |
