# Page header background photos

One shared folder for every page's top header banner photo — drop an
image here and point that page's `header.image` field at it (via
`/admin` or directly in the matching `src/content/*.json` file).

## Current files

- `about.jpg` — 회사소개 (`src/content/about.json` → `header.image`)
- `contact.jpg` — 문의하기 (`src/content/contact.json` → `header.image`)
- `resources.jpg` — 자료실 (`src/content/downloads.json` → `header.image`)
- `products.jpg` — 제품소개 (hardcoded in `src/app/products/page.tsx`, no content file backs this page's header)
- `color-chart.jpg` — 컬러차트 (hardcoded in `src/app/colors/page.tsx`, same reason)

All five render the same full-bleed, `object-cover` photo banner with a
dark overlay for text legibility. Use `.jpg`, not `.png` — these are
photos, and JPEG compresses them far better (a PNG of the same photo
easily runs 5-15x larger for no visual benefit).

## Wiring a new page's header photo

For 회사소개/문의하기/자료실 (JSON-backed headers): set that file's
`header.image` to the path here and the page automatically switches
from its plain white header to the photo banner — no code changes
needed. Leave `header.image` empty (`""`) to keep the plain header.

제품소개/컬러차트 don't have a content file backing their headers, so
their image path is hardcoded directly in the page file instead.

`큐비클 유니버스` (자재/시공 이야기) still isn't wired up for a
background photo — ask if you want that added too.
