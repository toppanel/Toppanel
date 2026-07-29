# Page header background photos

One shared folder for every page's top header banner photo — drop an
image here and point that page's `header.image` field at it (via
`/admin` or directly in the matching `src/content/*.json` file).

## Current files

- `about.png` — 회사소개 (`src/content/about.json` → `header.image`)

## Wiring a new page's header photo

Only pages whose header text is driven by a `src/content/*.json` file
support a background photo right now: **회사소개, 문의하기, 자료실**.
Set that file's `header.image` to the path here (e.g.
`/images/page-headers/contact.jpg`) and the page automatically
switches from its plain white header to the full-width photo banner
(dark overlay, white text) — no code changes needed.

Leave `header.image` empty (`""`) to keep the plain header — that's
the default today for 문의하기 and 자료실 until photos are set.

`제품소개` and `큐비클 유니버스` (자재/시공 이야기) don't have a
content file backing their headers yet, so they aren't wired up for a
background photo yet — ask if you want that added too.
