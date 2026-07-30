# Phase 1 typography validation

Issue: extension-repository #1662
Production baseline: `e399c522748caa48602c5a5aa2dc1cbf4aa09b85`
Phase 0 documentation commit: `75b7b2f`

## Environment

- Chrome 148.0.7778.96, headless
- Static export served from `out/` on `http://127.0.0.1:4175`
- Desktop viewport: 1280×720 unless a screenshot filename states otherwise
- Mobile viewport: 390×844
- Measurement waits for `networkidle`, `document.fonts.ready`, and two
  animation frames. No fixed timeout is used.

## Before baseline

The production source at the recorded baseline had one unrelated React 19 type
failure in `components/welcome/WayCards.tsx`: a global `JSX.Element` annotation.
The baseline export was generated after the type-only correction to
`ReactElement`; runtime markup and styling are unchanged.

| Run | Index CLS |
|---|---:|
| 1 | 0 |
| 2 | 0 |
| 3 | 0 |
| Maximum | **0** |

Cold-cache font result:

- preload links: 2
- loaded font resources: 4
- encoded body bytes: 127,428
- transfer bytes including response overhead: 128,628

| Asset | Encoded bytes |
|---|---:|
| `5c0c2bcbaa4149ca-s.p.woff2` | 37,792 |
| `630c17af355fa44e-s.p.woff2` | 43,120 |
| `36008747766f78c6-s.woff2` | 17,280 |
| `ab00a911ac2adf48-s.woff2` | 29,236 |

## After result

### Contract and build

- `node scripts/audit-phase1-typography.mjs`: pass
  - one shared EN/JA font module
  - loader variable `--font-space-mono`
  - semantic `--font-mono`
  - 8 rendered Next.js mono selectors
  - 2 rendered static-template-viewer mono selectors
  - 4 exact protected body/heading/navigation contracts
  - zero ad-hoc monospace declarations across both stylesheets
- `npm run build`: pass; 29/29 static pages generated
- Known pre-existing optional warning: `budoux` → `linkedom` cannot resolve the
  optional `canvas` package. Compilation and export complete successfully.

### CLS and font cost

| Run | Index CLS | Preload links | Encoded font bytes | Transfer bytes |
|---|---:|---:|---:|---:|
| 1 | 0 | 2 | 127,428 | 128,628 |
| 2 | 0 | 2 | 127,428 | 128,628 |
| 3 | 0 | 2 | 127,428 | 128,628 |
| Maximum | **0** | **2** | **127,428** | **128,628** |

Result: pass. CLS is ≤0.1 and the baseline delta is 0. Preload count and
index font transfer are unchanged because Space Mono uses `preload: false`.
The two weights remain self-hosted and load only where a mono surface renders:

| Route | Space Mono assets loaded | Added encoded bytes |
|---|---|---:|
| index | none | 0 |
| changelog | 700 (`9,552` bytes) | 9,552 |
| features | 400 + 700 (`9,464` + `9,552`) | 19,016 |
| FAQ before an accordion opens | none | 0 |

### Selector/component ledger

| Role | Production selector/component |
|---|---|
| Version number | `.accordion-version` in `ChangelogPage` |
| Changelog status | `.accordion-status` in `ChangelogPage` |
| Changelog date | not applicable: `ChangelogVersion` has no date field and no date is rendered; no copy was invented |
| Keyboard shortcuts | `.changelog-features kbd`, `.faq-accordion kbd`, `.welcome-cta kbd`, `.way-content kbd` |
| Markdown notation examples | `.changelog-features code` |
| Existing FAQ code | `.faq-accordion code`; `FaqPage` adds the scoping class to the existing accordion container |
| Existing template viewer code | `.template-viewer-content code` in the static viewer |
| Existing template raw source | `.template-raw-content` in the static viewer |

The previous `.faq-answer` selector no longer matched the restored FAQ markup.
Browser inspection found 21 code and 5 kbd nodes under `.accordion-content`;
the new `faq-accordion` scope reaches all 26 in both locales without broadening
to other accordions.

The historical `.shortcuts-table kbd` rule has no matching source or exported
markup and remains on the sans token; it is not counted as implementation
evidence. The audit instead verifies that every counted selector has a matching
exported surface.

The template viewer is a separate static surface under `docs/templates/`, so
its source stylesheet now self-hosts Space Mono 400/700 and defines the same
semantic token. Both EN and JA API-documentation templates render 38 code nodes
with Space Mono; raw view loads both weights on demand.

### Rendered font evidence

- EN changelog version/status: actual platform font `Space Mono`.
- EN features kbd/code: actual platform font `Space Mono`.
- JA version and Latin shortcut/notation glyphs: actual `Space Mono`.
- JA status glyphs: `WenQuanYi Zen Hei`, the environment's system Japanese
  fallback, because Space Mono intentionally has only the Latin subset.
- Protected negative assertion:
  - body and `.header-nav a` compute to the Raleway stack;
  - `h1`/`h2`/`h3` compute to the Lora stack;
  - JA glyphs continue through the system fallback.
- Changelog, features, and FAQ: zero horizontal overflow at 1280×900 and
  390×844 in EN and JA.
- Static template viewer: EN/JA code and raw surfaces compute to the Space Mono
  stack; body/navigation remain Raleway and headings remain Lora.

### Visual evidence

Sixteen element screenshots are stored in
[`screenshots/phase1-typography/`](./screenshots/phase1-typography/):

- version, status, shortcut, Markdown example
- EN and JA
- desktop and mobile

The JA capture sets the existing `sessionStorage.langOverride` before
navigation so the site's language auto-redirect cannot silently replace JA
evidence with EN.

### Generated output

- `node scripts/sync-docs.mjs --apply`: 97 files copied from 126 export files;
  26 RSC `.txt` files and 3 repository-internal files excluded by contract.
- Expected generated set:
  - 27 HTML files modified
  - 49 new build assets
  - 43 obsolete build assets removed
- Separate `_next` parity audit after removal:
  - `docs/_next` without `out/_next` counterpart: 0
  - `out/_next` without `docs/_next` counterpart: 0
- `CNAME`, `.nojekyll`, `sitemap.xml`, and `robots.txt` remain untouched.
