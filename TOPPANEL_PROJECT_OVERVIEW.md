# TOPPANEL — Website Project Overview

> Last updated: 2026-06-02  
> Stack: Next.js 14 (App Router) · TypeScript · Tailwind CSS v3 · Framer Motion · Lucide React  
> Deploy: Static export (`output: "export"`) on Netlify — no server-side rendering

---

## What Is This Project?

**TOPPANEL (탑판넬 주식회사)** is a Korean B2B company specializing in bathroom cubicle and partition systems (화장실 큐비클). Their product range covers everything from budget LPM panels to premium HPM, stainless steel, and automated door systems, primarily serving public facilities, commercial spaces, industrial sites, and public transit (Seoul Metro METROCORE spec).

This website is their **primary corporate presence** — the place architects, contractors, and facility managers come to browse products, download specs, and make inquiries. It is not an e-commerce site. The conversion goal is a phone call or an inquiry form submission.

---

## Honest Assessment

### What's Working Well

The **design system** is genuinely strong. The warm off-white palette (`#f5f2ee`), sharp editorial typography, and Japanese-minimal aesthetic are consistent and professional. Pages that are built — About, Products, Story, Download, Contact — have a coherent look that would hold up against any mid-tier B2B Korean company website.

The **content architecture** is smart. The decision to put all site content in `src/data/data.ts` and all product data in `src/lib/products.ts` is clean and will make future edits easy without touching component code.

The **Download page** is a standout — well-organized, tabbed, covers every document type a contractor could need. This alone adds real business value.

### What's Honestly Missing or Broken

**1. Half the pages are stubs.**  
`/project` (프로젝트) and `/technology` (기술력) both show nothing but "준비 중입니다." — a placeholder. These are nav-level pages that visitors will absolutely click. Dead ends like this erode trust fast.

**2. All product photography is the same single image.**  
`HERO_SLIDES` has 3 slides but all three point to `/images/DRC-S01.jpg`. The slides `DRC-D20` and `DRC-D29` are referenced in alt text but the files either aren't in `/public/images/` or aren't wired up. Every story post, hero panel, and product category placeholder also uses the same image. The site looks unfinished the moment you look closely.

**3. No product detail pages have real content.**  
`/products/[category]` exists as a dynamic route but the actual per-model detail (specs, dimensions, images, finish options) is not visible in the codebase. Visitors who click a product category can't get the technical data they need to make a purchase decision.

**4. The orbital diagram (OrbitalDiagram.tsx) and Hero redesign are specified but not yet fully implemented.**  
The `REDESIGN_PROMPT.md` is a detailed brief for a major visual overhaul of the homepage — split-column hero, SVG orbital diagram, new navbar. This work is either in progress or not started. The hero as-is is functional but the planned redesign is significantly better.

**5. Story/blog post pages don't exist.**  
`STORY_POSTS` links to `/story/takiron-hpl`, `/story/gangnam-office`, etc. None of these individual article pages are built. Clicking "자세히 보기" will 404.

**6. Contact form is incomplete / unhooked.**  
The contact page has a well-designed structure but on a static export there is no form backend. No Formspree, Netlify Forms, or similar integration is visible. The form as-is can't submit.

**7. No real file downloads.**  
The Download page lists 25 documents with sizes and dates, but none of the actual files exist in `/public`. Every download button is a dead click.

**8. No SEO infrastructure.**  
No `sitemap.xml`, no `robots.txt`, no Open Graph metadata on most pages, no structured data. For a B2B company where search traffic from "화장실 큐비클 업체" matters, this is a real gap.

### Overall Verdict

The foundation is **better than average** for an early-stage project. The design decisions are sound, the component structure is clean, and the data architecture will scale. But right now roughly 50% of the site is either empty or non-functional. The priority before any further styling work should be: real images → stub pages → working contact form → individual product/story pages.

---

## Site Structure

### Pages (9 routes)

| Route | Korean Name | Status | Notes |
|---|---|---|---|
| `/` | 홈 | ✅ Built | Hero + SolutionStoryTeaser |
| `/about` | 회사소개 | ✅ Built | Philosophy, history timeline, certs, equipment |
| `/products` | 제품소개 | ✅ Built | Grid of 9 product categories |
| `/products/[category]` | 제품 상세 | ⚠️ Partial | Route exists; detail content TBD |
| `/project` | 프로젝트 | ❌ Stub | "준비 중" placeholder only |
| `/technology` | 기술력 | ❌ Stub | "준비 중" placeholder only |
| `/story` | 큐비클 유니버스 | ✅ Built | Material stories, construction stories, failure cases |
| `/download` | 자료실 | ✅ Built | 25 documents listed (files not yet uploaded) |
| `/contact` | 고객지원 | ⚠️ Partial | 6 contact cards; form not connected |

### Components

```
src/
├── app/
│   ├── layout.tsx                  — Root layout (Navbar + Footer wrapper)
│   ├── globals.css                 — Global styles, body background
│   ├── page.tsx                    — Home page
│   ├── about/page.tsx
│   ├── products/page.tsx
│   ├── products/[category]/page.tsx
│   ├── project/page.tsx
│   ├── technology/page.tsx
│   ├── story/page.tsx
│   ├── download/page.tsx
│   └── contact/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx              — Global navigation bar
│   │   └── Footer.tsx              — Global footer
│   ├── home/
│   │   ├── Hero.tsx                — Homepage hero (redesign in progress)
│   │   ├── OrbitalDiagram.tsx      — SVG orbital nav diagram (to be built)
│   │   ├── SolutionStoryTeaser.tsx — 4-card story strip below hero
│   │   └── MobileNavGrid.tsx       — Mobile navigation grid
│   ├── about/
│   │   └── HistoryTimeline.tsx     — Company history timeline
│   └── ui/
│       ├── badge.tsx
│       ├── button.tsx
│       ├── card.tsx
│       ├── carousel.tsx
│       ├── circular-testimonials.tsx
│       ├── gallery4.tsx
│       └── radial-orbital-timeline.tsx
│
├── data/
│   └── data.ts                     — All site content (HERO_SLIDES, STORY_POSTS, COMPANY)
│
└── lib/
    ├── products.ts                 — Product categories + model data (9 categories, 30+ models)
    └── utils.ts                    — Tailwind utility helpers
```

### Navigation Structure

```
TOPPANEL
├── 회사소개       /about
├── 제품소개       /products
│   ├── LPM 큐비클           /products/lpm
│   ├── HPM 큐비클           /products/hpm
│   ├── 디자인 큐비클         /products/design
│   ├── 메탈릭 큐비클         /products/metallic
│   ├── 텍스처 큐비클         /products/texture
│   ├── 스탠 큐비클           /products/steel
│   ├── 칼라강판 큐비클        /products/colorsteel
│   ├── 특수/주문제작          /products/special
│   └── 도어 시스템           /products/door
├── 프로젝트       /project         ← STUB
├── 기술력         /technology      ← STUB
├── 자료실         /download
├── 큐비클 유니버스  /story
└── 고객지원        /contact
```

---

## Product Catalog Summary

9 product categories, each with 3 standard variants (기본형 / 전면천정형 / 전체천정형):

| Slug | Label | Material |
|---|---|---|
| `lpm` | LPM 큐비클 | Low-pressure melamine — economical standard |
| `hpm` | HPM 큐비클 | High-pressure melamine — durable general purpose |
| `design` | 디자인 큐비클 | Premium design line |
| `metallic` | 메탈릭 큐비클 | Metallic surface finish |
| `texture` | 텍스처 큐비클 | Textured pattern surface |
| `steel` | 스탠 큐비클 | Stainless steel (SUS 304/316L) |
| `colorsteel` | 칼라강판 큐비클 | Color-coated steel panel |
| `special` | 특수/주문제작 | Children's (CUBEE), custom-order, METROCORE (Seoul Metro spec) |
| `door` | 도어 시스템 | OPENEASY sliding/folding/sensor auto-door |

---

## Design Tokens

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#111111` | Text, buttons, active borders |
| `primary-bg` | `#f5f2ee` | Page background (warm off-white) |
| `surface` | `#faf8f5` | Card / panel background |
| `surface-2` | `#f0ece6` | Dividers, subtle section bg |
| `muted` | `#888880` | Captions, labels, secondary text |
| `border` | `#e0dbd4` | Default border — warm gray |
| `gold` | `#c8a96e` | Select CTAs and accent elements |

### Typography

- Font: **Geist** (via Next.js `next/font`)
- Body: `text-[#111111]`, `text-sm` / `text-xs` for content
- Labels/tags: `text-[10px]–text-[11px]` uppercase, `tracking-[0.2em]` or wider
- Headings: `font-bold` or `font-black`, `tracking-tight`

---

## Key Work Remaining

### Priority 1 — Content (Blocking Everything)

- [ ] Add real product photography for all 9 categories and hero slides (DRC-S01, DRC-D20, DRC-D29 should each be distinct images)
- [ ] Build `/project` page — reference gallery of completed installations (4+ projects visible in story data)
- [ ] Build `/technology` page — manufacturing equipment, patents, certifications, process flow
- [ ] Build individual story/blog pages (`/story/[slug]`) for all 4 STORY_POSTS entries
- [ ] Upload actual downloadable files to `/public/downloads/` and wire up download buttons
- [ ] Fill in real phone number and contact details in `COMPANY` data (currently placeholder `031-000-0000`)

### Priority 2 — Homepage Redesign (Per REDESIGN_PROMPT.md)

- [ ] Implement split-column Hero (55% image / 45% orbital diagram)
- [ ] Build `OrbitalDiagram.tsx` — SVG with 6 nodes, concentric dashed rings, Framer Motion entrance
- [ ] Rewrite `Navbar.tsx` — flat single bar, no utility strip, no mega-dropdown
- [ ] Restyle `SolutionStoryTeaser.tsx` — 4-column horizontal card grid
- [ ] Rewrite `Footer.tsx` — minimal 2-column layout

### Priority 3 — Functional Gaps

- [ ] Connect contact form to a backend (Netlify Forms is the simplest choice given static deploy)
- [ ] Add `sitemap.xml` and `robots.txt` to `/public`
- [ ] Add Open Graph metadata (`og:title`, `og:description`, `og:image`) to all pages
- [ ] Add individual product detail content to `/products/[category]` — specs table, finish options, dimension diagram
- [ ] Add map embed or directions to `/contact#map`

### Priority 4 — Polish

- [ ] Verify mobile layout across all built pages
- [ ] Add loading states / skeletons for `"use client"` interactive pages (Download, Contact)
- [ ] Add 404 page (`src/app/not-found.tsx`)
- [ ] Confirm KakaoTalk link in mobile drawer points to real channel
- [ ] Add favicon and `manifest.json` with brand icon (currently default Next.js favicon)

---

## Data Files

### `src/data/data.ts`
Contains three exports — do not edit unless content is changing:
- `HERO_SLIDES` — 3 slides for homepage hero (images + alt text)
- `STORY_POSTS` — 4 story card entries for homepage teaser strip
- `COMPANY` — company name, address, phone, fax, email, kakao link, business registration number

### `src/lib/products.ts`
Contains full product catalog as typed TypeScript:
- `Model` type — `{ code, codeS?, name, nameKo }`
- `ProductCategory` type — `{ slug, label, labelSub, description, models[] }`
- `PRODUCT_CATEGORIES` array — 9 categories, each with 3+ models

---

## Available Images (`/public/images/`)

| File | Used In |
|---|---|
| `DRC-S01.jpg` | Hero slide 1, all placeholder images site-wide |
| `DRC-D20.jpg` | Referenced in HERO_SLIDES alt text — not yet wired to slide 2 |
| `DRC-D29.jpg` | Referenced in HERO_SLIDES alt text — not yet wired to slide 3 |
| `TopPanel logo.svg` | Light background contexts |
| `TopPanel logo white.svg` | Dark background contexts |

---

## Development Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build (do not run during active development)
npm run lint     # ESLint check
```

> ⚠️ This is a static export project. Do not use `next/script`, server components with dynamic data fetching, or any Node.js-only APIs. All interactivity must be client-side.

---

## Company Reference

| Field | Value |
|---|---|
| Company | 탑판넬 주식회사 (TOPPANEL Co., Ltd.) |
| Address | 경기도 화성시 팔탄면 제암공단로 28 |
| Phone | 031-000-0000 *(placeholder)* |
| Fax | 031-000-0001 *(placeholder)* |
| Email | info@toppanel.co.kr |
| Business No. | 123-45-67890 *(placeholder)* |
| KakaoTalk | https://pf.kakao.com/ *(placeholder link)* |
