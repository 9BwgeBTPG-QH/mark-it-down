# Phase 3a color-token audit

- Date: 2026-07-30
- Issue: [#1664](https://github.com/9BwgeBTPG-QH/chorme_mark-it-down/issues/1664)
- Audit baseline: `65f50b1`
- Phase 2 light baseline: `doc/audit/screenshots/phase2-light/after/`

## Reproduction

Baseline inventory:

```bash
node scripts/audit-phase3-colors.mjs --ref 65f50b1 --list
```

Working-tree acceptance:

```bash
node scripts/audit-phase3-colors.mjs --list
```

The script reads `app/original.css`, `docs/style.src.css`,
`components/**/*.{ts,tsx}`, and `content/**/*.{ts,tsx}`. CSS literals inside
`:root` are token definitions and are excluded from the root-external
inventory. Block/line comments and HTML numeric entities are excluded from
code-literal matching.

## Baseline inventory

| Surface | Findings | Decision |
| --- | ---: | --- |
| production CSS outside `:root` | 60 | 50 tokenize, 7 semantic keywords, 3 print-output contract |
| static CSS outside `:root` | 60 | exact selector/value/decision parity with production |
| TS/TSX SVG and inline colors | 25 | 23 semantic SVG keywords, 1 brand preserve, 1 tokenize |
| unclassified | 0 | acceptance met |

### Production CSS selectors

Tokenized selectors:

- access/action:
  `.skip-to-content`, `.btn-primary`, `.btn-primary:hover`,
  `.btn-primary:active`, `.accordion-item[open] .accordion-icon::*`,
  `.filter-btn.active`, `.copy-btn`, `.copy-btn.copied`,
  `.tag-facet-btn.active`, `.template-edge-arrow:hover .edge-arrow-icon`,
  `.template-swipe-hint.active`
- status/badge:
  `.feature-badge.pending`, `.feature-badge.new`,
  `.accordion-status.review`, `.accordion-status.under-review`,
  `.accordion-status.released`, `.cta-success .success-marker`,
  `.icon-yes`, `.icon-warn`
- template categories:
  `.template-card[data-category="ai|productivity|journaling|dev|content"]`,
  `.badge-ai`, `.badge-productivity`, `.badge-journaling`, `.badge-dev`,
  `.badge-content`, `.badge-thinking`
- viewer callouts:
  `.template-viewer-content .callout-tip`,
  `.template-viewer-content .callout-note`,
  `.template-viewer-content .callout-warning`,
  `.template-viewer-content .callout-important`,
  `.template-viewer-content .callout-caution`
- special surfaces:
  `.changelog-features code`, `.first-action`, `.first-action-label`

Preserved semantic-keyword selectors:

- `.btn` (`transparent`)
- `.accordion-status` (`currentColor`, `transparent`)
- `.coming-soon-status` (`currentColor`, `transparent`)
- `.tab-nav label` (`transparent`)
- `.tab-nav-wrapper::after` (`transparent`)

Preserved print-output selectors:

- `@media print` `body` (`#fff`, `#000`)
- `@media print` `a` (`#000`)

### TS/TSX decisions

- preserve brand color:
  `components/features/GitSyncIcon.tsx` `fill="#F05032"`
- tokenize:
  `components/welcome/icons.tsx` `stroke="#92400E"` becomes
  `currentColor`; `.first-action-label svg` resolves the semantic
  `--status-warning-strong` token
- preserve semantic SVG values:
  `none` and `currentColor` in `components/index/icons.tsx`,
  `components/welcome/icons.tsx`, and `components/why/Beliefs.tsx`
- `content/**/*.ts`: no color literal findings

The exact file, line, selector, value, and decision list is emitted by the
reproduction command and was copied into the #1664 Phase 3a checkpoint comment.

## Token result

Thirty-five light values now have semantic ownership:

- text/surfaces: `--text-on-accent`, `--surface-caution`
- status/state: pending, review, released, success, warning, strong warning
- badges/code: new badge and inline-code surfaces
- template categories: foreground/background pairs for six categories
- callouts: foreground/background pairs for tip, note, warning, important,
  caution

Production and static-viewer token names and values are identical. After
tokenization:

- production CSS literals outside `:root`: 10
- static CSS literals outside `:root`: 10
- classified findings: 45
- unclassified findings: 0
- token parity problems: 0

The remaining ten CSS literals per file are exactly the seven semantic CSS
keywords and three print-output values listed above.

## Light-theme zero-regression gate

The five EN cohort pages were rebuilt and captured at the Phase 2 contract:
1280 x 900 viewport, full-page, fonts ready, one-shot animations completed,
`.reveal-pending` removed, and horizontal overflow zero.

| Page | Dimensions | Phase 2 SHA-256 | Phase 3a SHA-256 | Result |
| --- | --- | --- | --- | --- |
| index | 1280 x 6662 | `c83ef3e7…f16d53` | `c83ef3e7…f16d53` | exact |
| templates | 1280 x 6582 | `64d2d0f4…6b52ac` | `64d2d0f4…6b52ac` | exact |
| welcome | 1280 x 2294 | `afad518a…8b087` | `afad518a…8b087` | exact |
| changelog | 1280 x 7815 | `d1d92700…410b34` | `d1d92700…410b34` | exact |
| FAQ | 1280 x 5643 | `cf58841c…3a195` | `cf58841c…3a195` | exact |

Evidence:
`doc/audit/screenshots/phase3a-color-audit/light-after/`.

## Validation

- `node scripts/audit-phase3-colors.mjs`: PASS
- `node scripts/audit-phase1-typography.mjs`: PASS
- `node scripts/audit-phase2-light.mjs`: PASS
- `npm run build`: PASS, 29/29 static pages
- known warning only: optional `budoux -> linkedom -> canvas`
- five-page light cohort: HTTP 200, overflow 0, exact screenshot hashes

Phase 3b may now override the color and effect tokens. Phase 2 radius, spacing,
typography, and motion tokens remain locked.
