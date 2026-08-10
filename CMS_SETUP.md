# Content CMS + auto-deploy setup

This lets non-technical staff edit homepage/about/contact/downloads copy
through a form UI at `/admin`, without touching code. Saving in that UI
commits straight to GitHub, which triggers a GitHub Actions job that
rebuilds the site and uploads it to `ftp.toppanel.co.kr` automatically.

Everything below is a one-time setup. Once it's done, day-to-day editing
is just: open `/admin`, log in with GitHub, edit, save. No FTP client, no
code, no rebuild step for staff to run.

## How it fits together

```
staff → /admin (Decap CMS) → commits to GitHub (main branch)
                                      │
                                      ▼
                      GitHub Actions: npm run build + FTP upload
                                      │
                                      ▼
                          ftp.toppanel.co.kr (live site)
```

Two pieces need to be deployed once, by you:

1. **The GitHub repo** — holds the code + content JSON files.
2. **The OAuth relay** (`cms-oauth/`) — a tiny serverless app on Vercel
   that lets `/admin` verify a GitHub login. FTP hosting can't run this
   itself (no server), so it lives separately, for free, on Vercel.

## Setup steps

### 1. Push this repo to GitHub

Create a new GitHub repo (public or private, either works), then:

```bash
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin master:main
```

### 2. Create a GitHub OAuth App

GitHub → Settings → Developer settings → OAuth Apps → New OAuth App:

- **Homepage URL**: anything, e.g. `https://toppanel.co.kr`
- **Authorization callback URL**: `https://<your-vercel-app>.vercel.app/callback`
  (you'll know the exact Vercel URL after step 3 — you can come back and
  edit this field afterward)

Save the generated **Client ID** and **Client Secret**.

### 3. Deploy `cms-oauth/` to Vercel

This folder is a separate mini-project from the main site (the main site
stays a static export uploaded via FTP; only this OAuth relay runs on
Vercel).

- Go to vercel.com → New Project → import the same GitHub repo
- Set **Root Directory** to `cms-oauth`
- Add environment variables: `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`
  (from step 2)
- Deploy. Note the resulting URL, e.g. `https://toppanel-cms-oauth.vercel.app`
- Go back to the GitHub OAuth App (step 2) and make sure the callback URL
  exactly matches `https://<that-url>/callback`

### 4. Point the CMS config at your repo + relay

Edit `public/admin/config.yml`:

```yaml
backend:
  name: github
  repo: <you>/<repo>              # e.g. mirzadjanovboburjon/toppanel-home
  branch: main
  base_url: https://<your-vercel-app>.vercel.app
```

Commit and push.

### 5. Add FTP secrets to GitHub Actions

Repo → Settings → Secrets and variables → Actions → New repository secret,
add all of:

- `FTP_HOST` — `ftp.toppanel.co.kr`
- `FTP_USER`
- `FTP_PASSWORD`
- `FTP_REMOTE_DIR` — the web root on the server (e.g. `/`)
- `FTP_SECURE` — `true` if the host requires FTPS, otherwise `false`

The workflow at `.github/workflows/deploy.yml` reads these and runs on
every push to `main`.

### 6. Give staff access

Add each staff editor as a GitHub collaborator on the repo (Settings →
Collaborators). They log into `/admin` with their own GitHub account —
Decap CMS never needs a password of its own.

## What's editable right now

- **Homepage** — hero slide images/titles
- **회사소개 (About)** — header text, brand philosophy, space-solution
  copy, certifications list, equipment list
- **문의하기 (Contact)** — header text, hours, emails, directions, FAQ
- **다운로드 (Downloads)** — header text, full file list
- **회사 정보 (Company)** — phone, address, email, business number
  (used across the site's footer/contact page)
- **제품 카탈로그 (Products)** — every category (label, description, cover
  photo, fallback photo pool) and every model within it (name, code,
  photos). Backed by `src/content/products.json`, read by
  `src/lib/products.ts`.

  One caveat: each category and model has a `슬러그` (slug) field marked
  "절대 변경 금지" (don't change) — it drives the site's
  `/products?cat=...&model=...` URLs. Renaming one breaks any bookmarked
  or shared links to that category/model. Adding new categories/models,
  or editing everything else, is safe.

## Local testing before any of the above is deployed

You can preview the CMS UI locally without GitHub/Vercel set up yet:

```bash
npm run dev
```

Then visit `http://localhost:3000/admin` — it'll show the form UI, but
"Login" won't work until `config.yml` points at a real backend. This is
just to sanity-check the fields/layout.
