# Phase 3 browser-preference dark-theme validation

Date: 2026-07-30

Issue: #1664

Phase 3a checkpoint: `fff4b80` + `3cc3f5d`

Initial Phase 3b checkpoint: `b556866` + `dd0af29`

## Final scope

The first Phase 3b implementation exposed an explicit
`System / Light / Dark` selector. The repository owner subsequently chose the
simpler final contract: the public site shows no theme control and follows the
user's browser/OS color-scheme preference.

This report validates that final CSS-only contract across the EN/JA route
matrix, static template viewers, mobile layouts, and three browser engines.
Phase 2 typography, geometry, spacing, radius, and motion contracts remain
locked.

## Final implementation contract

- Light semantic tokens are the root default.
- Dark tokens apply through `@media (prefers-color-scheme: dark)`.
- EN/JA layouts and static viewers publish `color-scheme: light dark`.
- Paired `theme-color` metadata uses light/dark media queries.
- The website renders no theme selector, button, or preference status.
- No theme code reads or writes `localStorage`.
- A stale `mid-theme` key is ignored and does not override browser preference.
- No bootstrap script mutates root attributes before paint.
- No React client component or hydration suppression is required for theme.
- Browser preference changes are handled by native media-query reevaluation.
- The explicit `html[data-theme="dark"]` token block remains only as a
  non-user-facing deterministic visual-regression hook; production code never
  writes the attribute, and its tokens are audited for exact parity with the
  browser-media block.

The owner override and superseded state-machine decision are recorded in
`doc/design-samples/2026-07-brushup/decision-record.md`.

## Static audits

| Gate | Result |
| --- | --- |
| Phase 1 typography | PASS |
| Phase 2 light contract | PASS |
| Phase 3 color inventory | PASS |
| Phase 3 browser-preference contract | PASS |
| Phase 3a light-token hashes | unchanged |
| Dark theme-owned overrides | 67 |
| Locked typography/spacing/radius/motion overrides | 0 |
| Explicit regression hook / browser-media token parity | PASS |
| Production / static dark-token parity | PASS |
| Unclassified color findings | 0 |
| Contrast checks | 17; minimum 7.25:1 |
| Theme UI / storage / bootstrap references | 0 |
| TypeScript | PASS |
| Production build | PASS |
| `docs/` sync | 98 files copied |
| Missing output / SHA mismatch / `_next` orphan | 0 / 0 / 0 |

The build retains the known optional `budoux -> linkedom -> canvas` warning;
compilation, type validation, static generation, and export all complete.
Removing the bootstrap also removes the former
`scripts/finalize-static-export.mjs` post-processing step.

## Runtime browser-preference results

Every run preloaded the opposite former `mid-theme` value to prove that stale
storage no longer affects rendering.

| Matrix | Result |
| --- | --- |
| 13 routes x EN/JA x browser Light/Dark | 52/52 PASS |
| Light states | 26 |
| Dark states | 26 |
| EN states | 26 |
| JA states | 26 |
| Maximum document horizontal overflow | 0 px |
| Visible theme controls | 0 |
| Root `data-theme` / `data-theme-preference` attributes | absent |
| Static viewer EN/JA x Light/Dark | 4/4 PASS |
| Mobile 390x844: EN/JA site + EN/JA static viewer | 4/4 PASS |
| Chromium: Dark -> Light -> Dark live preference | 2/2 PASS |
| Firefox: Dark -> Light -> Dark live preference | 2/2 PASS |
| WebKit: Dark -> Light -> Dark live preference | 2/2 PASS |
| Site-owned resource errors | 0 |
| Hydration errors/warnings | 0 |

CLS was `0` in three Light runs and three Dark runs. The system-only path has
no JavaScript theme transition, so the browser selects the matching token
block during CSS evaluation instead of correcting the theme after paint.

## Representative surface checks

- Light body: `rgb(242, 237, 228)`, `color-scheme: light`
- Dark body: `rgb(10, 10, 9)`, `color-scheme: dark`
- Dark primary text: `rgb(241, 236, 227)`
- SVG flow icons: accent stroke `rgb(96, 165, 250)`, fill `none`
- template cards: `rgba(255, 255, 255, 0.035)`
- form input: dark inherited scheme with semantic text/border
- primary button: blue surface with dark readable text
- welcome caution surface: `rgba(251, 191, 36, 0.08)`
- static viewer `pre`: dark semantic background/text/border
- raster images retain their source rendering without automatic inversion

## Adversarial findings resolved

1. The explicit selector duplicated browser settings and added a second
   preference model, persistent storage, cross-tab synchronization, bootstrap
   ordering, and hydration ownership. The final contract removes all five.
2. The selector also increased desktop/mobile navigation density and required a
   special theme-only navigation row on Welcome. Both UI paths are removed;
   Welcome again renders its intended logo-only banner.
3. The first implementation required moving a script ahead of blocking CSS
   after static export. Pure CSS preference handling eliminates that
   post-processing and the associated FOUC failure mode.
4. Static template viewers had a separate controller and three-option markup.
   They now use the same CSS media contract and paired metadata as Next pages.
5. A prior saved `mid-theme` value could otherwise preserve an obsolete
   override. Runtime checks seeded the opposite value in every matrix state and
   confirmed it remains ignored.
6. Regenerating the static export produced 31 obsolete `_next` artifacts. They
   were removed, leaving zero files under deployed `docs/_next` without an
   `out/_next` counterpart.

## Visual evidence

- `doc/audit/screenshots/phase3-dark/cohort-composite-en.png`
- `doc/audit/screenshots/phase3-dark/matrix/light/` (26 full-page images)
- `doc/audit/screenshots/phase3-dark/matrix/dark/` (26 full-page images)
- `doc/audit/screenshots/phase3-dark/static/` (2 full-page images)
- `doc/audit/screenshots/phase3-dark/mobile/` (4 full-page images)

The five-page composite mixes browser Light and Dark evidence for Home,
Templates, Welcome, Changelog, and FAQ. All captures show the final navigation
without a site-level theme control. Static desktop and mobile evidence uses
`?t=dev/api-documentation` and asserts a rendered `#template-content h1`
before capture.

Final manual inspection of the composite, mobile Home, and mobile static viewer
found no clipped leading navigation, theme-control remnants, horizontal
document overflow, or broken content state.
