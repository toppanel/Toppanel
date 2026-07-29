# Downloadable files (자료실)

Real files backing the 자료실 (Resources) page's file list, organized
one subfolder per category:

- `certifications/` — 인증 (환경표지인증서 등)
- `test-reports/` — 시험성적서

Add a new category's folder here the same way if one starts having
real files (e.g. `drawings/` for 도면).

## Wiring a file to a list entry

Unlike the product/certification image folders (which just take a
filename), each entry in `src/content/downloads.json` needs the
**full path** in its `file` field, since files live in different
category subfolders here:

```json
{ "category": "인증", "name": "...", "file": "/downloads/certifications/example.pdf" }
```

Entries with no `file` field show the same "다운로드" button as
before, just disabled — safe to leave any category's items unwired
until a real file exists for them.

Via `/admin` (CMS): 자료실 → 파일 목록 → pick the entry → upload/select
the file in the "다운로드 파일" field.
