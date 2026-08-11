# TopPanel /admin CMS — developer manual

This is the complete reference for the `/admin` content-management system:
how it's built, why it's built that way, where every credential lives, and
how to fix it when something breaks. Read the whole "Big picture" section
before touching anything — most confusion comes from not knowing why this
setup looks the way it does.

A separate, non-technical manual for staff editors exists as a shared
Artifact page (ask the previous developer or check chat history for the
link) — this document is for whoever maintains the code.

## Big picture

The site is a **static export** (`next.config.ts` has `output: "export"`)
uploaded to a traditional shared-hosting FTP server (koreahosting). There is
no Node server running in production — nothing dynamic can execute there.
That one constraint explains every unusual piece of this setup:

```
non-technical staff
      │  opens https://toppanel.co.kr/admin, logs in with GitHub
      ▼
Decap CMS (public/admin/index.html + config.yml)
      │  "Login with GitHub" → popup opens the OAuth relay
      ▼
cms-oauth/ on Vercel (https://toppanel-one.vercel.app)      ← the ONLY
      │  the one piece of this whole system that runs server-side code       ← non-static
      │  (FTP hosting can't do OAuth token exchange itself)                  piece
      ▼
GitHub OAuth → popup gets a token → hands it back to Decap CMS
      │
      │  staff edits a field, clicks "Publish" → commits straight to
      │  src/content/*.json on GitHub's `main` branch (via GitHub's API,
      │  using the staff member's own GitHub account/permissions)
      ▼
GitHub Actions (.github/workflows/deploy.yml, self-hosted Windows runner)
      │  npm ci → npm run build (regenerates the static export in out/)
      ▼
scripts/deploy-ftp.mjs
      │  wipes the remote FTP dir (except .well-known/, see below)
      │  uploads out/ over FTP
      ▼
ftp.koreahosting → toppanel.co.kr (live in ~2–5 minutes after Publish)
```

Every piece above is a separate service with its own credentials. If
`/admin` breaks, the fastest way to find out *which* piece is broken is to
walk this diagram top to bottom and test each hop (see Troubleshooting).

## The pieces, in detail

### 1. Content data — `src/content/*.json` + `public/admin/config.yml`

Each editable "thing" on the site is a JSON file under `src/content/`,
imported by the page/component that renders it, and mapped field-by-field
in `public/admin/config.yml` as a Decap CMS **file collection** (not a
folder collection — every collection here edits one fixed file, not a set
of interchangeable entries).

| Collection (config.yml) | Data file | Consumed by |
|---|---|---|
| 홈페이지 | `src/content/homepage.json` | `src/components/home/Hero.tsx` |
| 회사소개 페이지 | `src/content/about.json` | `src/app/about/page.tsx` |
| 문의하기 페이지 | `src/content/contact.json` | `src/app/contact/page.tsx` |
| 제품 카탈로그 | `src/content/products.json` | `src/lib/products.ts` (see below) |
| 회사 정보 | `src/content/company.json` | `src/data/data.ts` (footer, contact page) |
| 다운로드 자료실 | `src/content/downloads.json` | `src/app/download/page.tsx` |

**To add a new editable field to an existing collection:** add the field to
the JSON file's shape, add the matching TypeScript type if the JSON is
imported typed, add the matching widget block in `config.yml` under that
collection's `fields:`, and use the field in whatever component reads that
JSON. All three must stay in sync by hand — Decap doesn't generate types
from the JSON or vice versa.

**To add a brand-new collection:** same pattern — new JSON file, new
`- name: "..."` block in `config.yml`'s `collections:` list, new import
somewhere in `src/`. Copy the shape of an existing collection in
`config.yml` rather than starting from Decap's docs from scratch; this repo
only uses `widget: string/text/object/list/image/file/select`, which
covers everything the site needs so far.

### 2. Product catalog — `src/content/products.json` + `src/lib/products.ts`

The product catalog is the one collection that isn't a flat set of fields —
it's `categories[] → models[] → images[]`, so it's worth understanding on
its own.

- **Every image field stores a full public path** (e.g.
  `/images/products/cubicle/metro/cubicle-metro-01.jpg`), not a filename
  relative to some folder. This is deliberate: Decap's `image` widget always
  returns a full path relative to its configured `public_folder`, and has
  no way to emit a path relative to a *dynamically computed* category
  folder. Don't try to "clean this up" back to relative filenames — it
  would fight the CMS.
- Each category has its own `fallbackImages[]` — a pool of photos shown
  (picked deterministically by a hash of the model's slug, so the same
  model always shows the same fallback photo) for any model in that
  category that doesn't have its own `images[]` yet. This replaced an older
  in-code `PRODUCT_IMAGES` map so the CMS could edit it per-category.
- `src/lib/products.ts` just imports the JSON and re-exports the exact same
  functions it always had (`getModelImage`, `getCategoryImage`,
  `getModelGallery`, `getCategoryBySlug`, `getModelBySlug`) — no consuming
  component (`Sidebar`, `ProductsContent`, `ProductCatalogGrid`,
  `CategoryModelGrid`, `ModelGallery`, `ModelPopup`) needed to change when
  this moved from hardcoded TS to JSON.
- `FALLBACK_IMAGE` (`/images/products/placeholder.svg`) stays a hardcoded
  constant in `products.ts`, not in the CMS — it's a system default, not
  content.
- Every category/model has a `slug` field the CMS UI labels "절대 변경
  금지" (never change) — it drives `/products?cat=...&model=...` routing.
  Renaming one breaks bookmarked/shared links. There's no technical
  enforcement of this beyond the label; if it becomes a real problem,
  consider a read-only Decap widget or a build-time slug-stability check.

### 3. The OAuth relay — `cms-oauth/`

FTP hosting can't run server-side code, but completing a GitHub OAuth login
requires a server-side step (exchanging a code for a token using a client
secret that must never reach the browser). So this one piece runs
separately, as two tiny serverless functions on Vercel:

- **Currently deployed at `https://toppanel-one.vercel.app`** (Vercel
  project, Root Directory = `cms-oauth`). `public/admin/config.yml`'s
  `backend.base_url` points here.
- `api/auth.js` — redirects to GitHub's OAuth authorize page.
- `api/callback.js` — GitHub redirects back here with a code; exchanges it
  for a token, then hands the token back to the `/admin` window via
  `postMessage`, following Decap's documented popup handshake:
  1. Popup sends `"authorizing:github"` to `window.opener`.
  2. Decap's own code (in the `/admin` page) replies with the same string
     as an acknowledgment.
  3. **Only after receiving that specific acknowledgment**, the popup sends
     `"authorization:github:success:<token json>"` and closes itself.

  Step 3's filter (`if (e.data !== "authorizing:github") return;`) and the
  `window.close()` call are both things that were *missing* when this was
  first built and had to be fixed — see Troubleshooting if login "succeeds"
  but nothing happens, or the popup never closes.
- **Env vars** (Vercel project settings → Environment Variables):
  `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET` — from the GitHub OAuth App
  below.
- Vercel's "Root Directory" field, in whatever version of their dashboard
  you're looking at, may not be under Settings → General — it moves around
  across Vercel UI versions. If you can't find it, the reliable path is a
  **fresh import** at vercel.com/new, which always shows a Root Directory
  field on the pre-deploy "Configure Project" screen.
- **Redeploying**: this project auto-deploys on every push to `main`
  (standard Vercel Git integration), independently of the FTP pipeline
  below. If you ever redeploy it to a new URL, you must update **both**
  `config.yml`'s `base_url` and the GitHub OAuth App's callback URL to
  match, or login will 404/fail silently.

### 4. The GitHub OAuth App

GitHub → Settings → Developer settings → OAuth Apps. Two fields matter:

- **Client ID / Client Secret** → go into the Vercel project's env vars
  above. The secret is never visible again after creation — if lost,
  generate a new one and update Vercel.
- **Authorization callback URL** → must be *exactly*
  `https://toppanel-one.vercel.app/callback` (whatever the relay's current
  URL is, plus `/callback`). A mismatch here is the single most common
  cause of login failing with GitHub's "The redirect_uri MUST match..."
  error page.

### 5. GitHub Actions — `.github/workflows/deploy.yml`

Runs on **a self-hosted Windows runner** (`runs-on: [self-hosted, Windows,
X64]`) — not GitHub's hosted runners — on every push to `main`, whether
that push came from a staff member clicking Publish in `/admin` or a
developer pushing code normally. Steps: `npm ci` → `npm run build` →
`npm run deploy` (runs `scripts/deploy-ftp.mjs`). Secrets used (GitHub repo
→ Settings → Secrets and variables → Actions):

- `FTP_HOST` — currently `110.10.129.180` (a direct IP — see
  Troubleshooting for why this isn't `toppanel.co.kr` or
  `ftp.toppanel.co.kr`).
- `FTP_USER`, `FTP_PASSWORD`
- `FTP_REMOTE_DIR` — the web root on the server.
- `FTP_SECURE` — `"true"`/`"false"`.

`gh secret set <NAME>` (GitHub CLI) can update any of these without going
through GitHub's web UI, if `gh auth status` shows you're logged in with
`repo` scope.

### 6. The FTP deploy script — `scripts/deploy-ftp.mjs`

Before uploading, it wipes everything currently in `FTP_REMOTE_DIR` so
stale/removed pages don't linger — **except** `.well-known/`, which it
explicitly skips. That folder is owned and managed by the host's own SSL
certificate auto-renewal (ACME/Let's Encrypt), not the FTP account, and
attempting to delete it fails the whole deploy (see Troubleshooting). If
you ever see other host-managed top-level folders show up in a directory
listing, add them to the `PRESERVE` set in this script rather than letting
the wipe fail on them.

## Local development

`npm run dev`, then **`http://localhost:3000/admin/index.html`** — not
`/admin` or `/admin/`. Next's dev server doesn't auto-serve `index.html`
for a bare directory request the way the production Apache-style host
does, so the trailing-slash/directory form 404s locally even though it
works fine once actually deployed. Login will work locally too, since the
OAuth relay is a real deployed service independent of where `/admin` is
being viewed from.

## Giving staff access

Repo → Settings → Collaborators → add each staff editor's GitHub account.
They need a GitHub account (free) but never need a password of their own
inside Decap — login is entirely "Login with GitHub."

## Troubleshooting

**Login button leads to a GitHub "invalid redirect_uri" error page.**
The GitHub OAuth App's callback URL doesn't exactly match
`<relay-url>/callback`. Fix it in the OAuth App settings (see §4).

**Login "succeeds" (GitHub authorizes fine) but the popup never closes, or
it closes but `/admin` still shows the login screen.**
Two distinct historical bugs in `cms-oauth/api/callback.js`, both fixed —
if this recurs, check that the fix is still in place:
1. It must call `window.close()` after posting the success message (it
   originally displayed "this window will close automatically" but had no
   code that actually did so).
2. Its message listener must ignore anything that isn't exactly
   `"authorizing:github"` before sending the real token (it originally
   reacted to *any* `message` event — dev tooling, analytics scripts,
   browser extensions can all fire stray `postMessage`s — which could
   fire the handshake early with the wrong target origin, silently
   dropping the real token before Decap's main window ever received it).

**GitHub Actions deploy fails at "Deploy to FTP" with `ETIMEDOUT`
connecting to some `104.21.x.x` / `172.67.x.x` address.**
Those are Cloudflare's edge IPs. `toppanel.co.kr` (and any subdomain of it)
is proxied through Cloudflare, and Cloudflare's proxy does not forward raw
FTP (port 21) at all — so *any* client, not just the CI runner, times out
connecting to it. This isn't fixable from this repo; it needs a direct
server address from the host that bypasses their Cloudflare proxy. Ask
koreahosting support for "a direct FTP address/IP that doesn't go through
Cloudflare" — hosts that put SSL behind Cloudflare almost always have one.
Verify a candidate address actually has port 21 open before spending a
full CI cycle on it:
```bash
# bash / git-bash
timeout 8 bash -c "cat < /dev/null > /dev/tcp/<ip>/21" && echo reachable
```
Once confirmed, `gh secret set FTP_HOST --body "<ip>"` and re-run the
workflow (`gh run rerun <run-id>`).

**Deploy connects fine but fails with `550 Delete operation failed` on
something under `.well-known/`.**
The wipe step tried to delete a file it doesn't own (see §6). Confirm
`scripts/deploy-ftp.mjs` still preserves `.well-known/` — if this error
reappears for a *different* top-level path, that path likely also needs
adding to the `PRESERVE` set.

**Everything above looks fine, but edits made in `/admin` never appear on
the live site.**
Check the most recent GitHub Actions run
(`gh run list --limit 5` / the repo's Actions tab) — a successful commit to
`main` doesn't mean the build+deploy succeeded. Decap CMS's job ends at
"committed to GitHub"; everything after that is this same Actions pipeline,
which can fail for reasons unrelated to the CMS itself.
