# Phase 3 dark-theme validation

Date: 2026-07-30
Issue: #1664
Phase 3a checkpoint: `fff4b80` + `3cc3f5d`

## Scope

This report validates the explicit `System / Light / Dark` state machine, the
token-only dark palette, the static template viewer, and the EN/JA route
matrix. Phase 2 typography, geometry, spacing, radius, and motion contracts
remain locked.

## Implementation contract

- Storage key: `mid-theme`
- Stored values: `light` or `dark` only
- System preference: key absent
- Root state:
  - `data-theme="light|dark"`
  - `data-theme-preference="system|light|dark"`
  - inline `color-scheme`
- System mode follows `(prefers-color-scheme: dark)` live.
- An explicit override ignores subsequent OS changes.
- `storage` events synchronize open tabs.
- Invalid values are removed and storage exceptions fall back to System.
- A synchronous head bootstrap runs before the first stylesheet in all 26
  themed static-export HTML files.
- No-JS uses the same dark-token block through
  `@media (prefers-color-scheme: dark)`.

The complete pre-implementation transition table is in
`doc/design-samples/2026-07-brushup/decision-record.md`.

## Static audits

| Gate | Result |
| --- | --- |
| Phase 1 typography | PASS |
| Phase 2 light contract | PASS |
| Phase 3 color inventory | PASS |
| Phase 3 theme contract | PASS |
| Phase 3a light-token hashes | unchanged |
| Dark theme-owned overrides | 67 |
| Locked typography/spacing/radius/motion overrides | 0 |
| Explicit dark / no-JS token parity | PASS |
| Production / static dark-token parity | PASS |
| Contrast checks | 17; minimum 7.25:1 |
| TypeScript | PASS |
| Production build | PASS |
| Bootstrap before CSS | 26/26 themed HTML files |

The build retains the known optional `budoux -> linkedom -> canvas` warning;
compilation, type validation, static generation, and export all complete.

## Runtime state-machine results

Chromium was CPU-throttled 6x for the four boot cases.

| OS scheme | Stored value | Resolved | Preference | Bootstrap | First paint | Result |
| --- | --- | --- | --- | ---: | ---: | --- |
| Light | absent | Light | System | 55.7 ms | 304 ms | PASS |
| Dark | absent | Dark | System | 56.6 ms | 288 ms | PASS |
| Light | Dark | Dark | Dark | 48.1 ms | 268 ms | PASS |
| Dark | Light | Light | Light | 41.5 ms | 256 ms | PASS |

The bootstrap preceded first paint in 4/4 cases. Hydration errors and
hydration warnings were 0.

Additional state transitions:

- live OS Light -> Dark while System: PASS
- explicit Light ignores later Dark OS state: PASS
- return to System removes `mid-theme`: PASS
- cross-tab Light and System synchronization: PASS
- native-radio keyboard ArrowRight / ArrowLeft selection: PASS
- invalid stored value -> System and key removal: PASS
- storage `SecurityError` -> System: PASS
- no-JS + dark OS -> dark CSS with no managed root attribute: PASS
- forced-colors active, three visible 44 px options: PASS

## Route and engine matrix

| Matrix | Result |
| --- | --- |
| 13 routes x EN/JA x Light/Dark | 52/52 PASS |
| Light states | 26 |
| Dark states | 26 |
| EN states | 26 |
| JA states | 26 |
| Maximum document horizontal overflow | 0 px |
| Minimum theme-option target | 44 px |
| Static viewer EN/JA dark with asserted API Documentation h1 | 2/2 PASS |
| Mobile 390x844: EN/JA site + EN/JA API Documentation viewer | 4/4 PASS |
| Chromium: System Dark + saved Light | 2/2 PASS |
| Firefox: System Dark + saved Light | 2/2 PASS |
| WebKit: System Dark + saved Light | 2/2 PASS |

CLS was `0` in three Light runs and three Dark runs. Each site run retained
exactly two font preloads.

## Representative surface checks

- body: `rgb(10, 10, 9)`, `color-scheme: dark`
- primary text: `rgb(241, 236, 227)`
- SVG flow icons: accent stroke `rgb(96, 165, 250)`, fill `none`
- template cards: `rgba(255, 255, 255, 0.035)`
- form input: dark inherited scheme, semantic text/border
- primary button: blue surface with dark readable text
- welcome caution surface: `rgba(251, 191, 36, 0.08)`
- static viewer `pre`: `rgb(19, 19, 18)` with semantic text/border
- raster images retain their source rendering without an automatic inversion

## Adversarial findings resolved

1. Next.js emitted the theme bootstrap after blocking CSS even when authored
   in `<head>`. The build now runs `scripts/finalize-static-export.mjs`, which
   moves the bootstrap ahead of the first stylesheet and fails on incomplete
   themed HTML.
2. The new selector caused 341 px document overflow at 390 px width. The nav
   now contains its internal horizontal scroller; all four mobile checks
   report 0 px overflow.
3. Centered overflowing desktop nav content clipped the leading
   `Philosophy` link. `safe center` preserves centering when content fits and
   falls back to the leading edge when it does not; the theme selector remains
   sticky at the right edge.
4. The exported slide iframe referenced a logo present only in deployed
   `docs/assets`. The identical asset is now sourced from `public/assets`, so
   standalone `out/` has no site-owned resource 404.

The complete run saw 17 console resource errors, all from Google Forms'
cross-origin `filesystem:https://docs.google.com/persistent/docs/fonts/*.woff2`
cache inside the Feedback iframe. Site-owned resource errors were 0; these
external iframe messages are separated from the hydration gate.

## Visual evidence

- `doc/audit/screenshots/phase3-dark/cohort-composite-en.png`
- `doc/audit/screenshots/phase3-dark/matrix/light/` (26 full-page images)
- `doc/audit/screenshots/phase3-dark/matrix/dark/` (26 full-page images)
- `doc/audit/screenshots/phase3-dark/static/` (2 full-page images)
- `doc/audit/screenshots/phase3-dark/mobile/` (4 full-page images)

The five-page cohort is Home, Templates, Welcome, Changelog, and FAQ.
Static desktop and mobile evidence uses
`?t=dev/api-documentation` and asserts a rendered `#template-content h1`
before capture.

## Independent style-guide review

Final result: **ALLOW — P0: 0 / P1: 0 / P2: 0**

The first review correctly blocked four static-viewer screenshots that showed
only `Template not found.`. After recapture with the valid API Documentation
query, the reviewer confirmed EN/JA desktop/mobile rendering for Preview/Raw,
syntax-highlighted code, TIP/NOTE callouts, Mermaid, tables, the explicit
theme control, 44 px mobile targets, contained wide-content scrolling, and
dark-theme readability.
