# Certification files

Upload each certificate here — photos/scans (`.jpg`, `.png`, `.webp`)
or the original PDF, whichever you have. Both are supported side by
side; the About page renders each one differently:

- **Image** (`.jpg`/`.jpeg`/`.png`/`.webp`) → shown as an actual
  thumbnail on the certification card, click to open full-size.
- **PDF** (`.pdf`) → shown with a document icon and a "PDF 보기" link
  that opens the file in a new tab.
- **Nothing uploaded yet** → card falls back to "이미지 준비 중"
  (unchanged from today), so it's safe to fill these in gradually.

## Naming

Lowercase, hyphens, no spaces — e.g. `patent-safety-screen.pdf`,
`iso-9001.jpg`.

## Wiring a file to a certification card

After uploading, set that certification's `file` field to the
filename here (just the filename, not the folder path):

- Via `/admin` (CMS): 회사소개 페이지 → 인증/특허 → pick the entry →
  upload/select the file in the new "인증서 파일" field.
- Directly in code: `src/content/about.json` → `certifications[].file`.

No other code changes needed — the About page picks up image vs. PDF
automatically from the file extension.
