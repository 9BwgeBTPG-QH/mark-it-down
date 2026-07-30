# Phase 2 light-theme validation

- Date: 2026-07-30
- Issue: [#1663](https://github.com/9BwgeBTPG-QH/chorme_mark-it-down/issues/1663)
- Baseline: `b8821c1` (`chore(site): sync Phase 1 typography output (#1662)`)
- Candidate: Phase 2 paper neo-brutalism changes on `codex/issue-1660`

## Decision

**PASS.** The approved composite direction is reproduced across the production
light theme, the static template viewer, all 26 EN/JA routes, and the selected
mobile cohort. Independent style review finished with `ALLOW` and
`P0/P1/P2 = 0/0/0`.

The owner had already approved the composite and explicitly authorized
autonomous judgement through all #1660 children. The cohort introduced no new
visual direction beyond that approval, so the owner approval plus the
independent style gate is treated as the Phase 2 HITL gate.

## Contract and selector audit

`node scripts/audit-phase2-light.mjs`:

- production token parity: 23
- major framed surfaces: 13
- legacy radius/shadow tokens: 0
- raw box shadows/nonzero radii: 0
- unguarded hover motion: 0
- noninteractive press affordances: 0
- reduced-motion moving surfaces: 6
- mobile 44 px target contracts: 5
- interactive transition ceiling: 300 ms
- contrast checks: 8

The baseline declaration inventory and Phase 2 ownership split are recorded in
`phase2-shape-shadow-allowlist-2026-07-30.md`. Radius, spacing, typography, and
motion are locked for Phase 3; only shadow and colour tokens may be overridden.

`node scripts/audit-phase1-typography.mjs` also passes, preserving:

- one shared EN/JA font module
- 8 rendered Next.js mono selectors
- 2 static-viewer mono selectors
- 4 protected typography contracts
- 0 ad-hoc monospace declarations

## Visual evidence

Evidence root: `doc/audit/screenshots/phase2-light/`

| Cohort | Baseline | After | Capture contract |
| --- | ---: | ---: | --- |
| approved desktop/static cohort | 7 | 7 | 1280 x 900 viewport; desktop pages captured full-page |
| full desktop route matrix | - | 26 | 13 EN + 13 JA, 1280 x 900 |
| mobile cohort | - | 10 | 5 EN + 5 JA, 390 x 844 |

The final full-page captures force one-shot animations to completion and remove
all `.reveal-pending` states before capture. Final heights are:

- index: 6,662 px
- template gallery: 6,582 px
- API Documentation static viewer: 5,758 px
- welcome: 2,294 px
- changelog: 7,815 px
- FAQ: 5,643 px

All seven after captures report horizontal overflow `0`. The static viewer
capture uses
`/templates/view.html?t=dev/api-documentation`, verifies the
`API Documentation` heading, and is not a gallery-page substitute.

## Route and responsive matrix

Browser checks against both `out/` and the synchronized `docs/` output:

- desktop routes checked: 26
- HTTP status failures: 0
- EN/JA `<html lang>` mismatches: 0
- horizontal-overflow failures: 0
- mobile cohort routes checked: 10
- mobile HTTP/language/overflow failures: 0

The static template viewer was additionally checked at mobile width in EN and
JA. Preview/raw toggles, previous/next buttons, and both top/bottom page inputs
measure at least 44 x 44 px; raw mode remains visible and both modes have
horizontal overflow `0`.

Local screenshot sessions retain two baseline-only console-noise classes:
`favicon.ico` from the bare static server and `filesystem:` Google Slides font
URLs inside the pre-existing embedded slide export. Neither is introduced by
Phase 2, and the route/status/layout gates remain clean.

## Interaction, motion, and focus

- pointer: interactive buttons and accordions use the approved 120 ms press
  motion and semantic action/card shadows
- touch: no hover-only transform is retained before activation
- reduced motion: moving surfaces render with `transform: none` and zero
  transition duration; pressed-state shadow remains an instant state cue
- focus-visible: cream separation ring plus accent outer ring is visible without
  displacing the hard resting shadow
- noninteractive cards: no hover or active translation

## Performance and build

- `npm run build`: PASS, 29/29 static pages
- known warning only: optional `budoux -> linkedom -> canvas` dependency
- index CLS, three cold navigations: `0 / 0 / 0`
- font preload count: `2 / 2 / 2` (unchanged)
- index horizontal overflow: `0 / 0 / 0`

## Generated-output parity

`node scripts/sync-docs.mjs --apply`:

- export files: 126
- copied/deployable files: 97
- excluded RSC `.txt` payloads: 26
- excluded repository-internal files: 3

Post-sync SHA-256 and `_next` audit:

- eligible source/output mismatches: 0
- missing `_next` files: 0
- orphan `_next` files: 0

Three prior-build `_next` orphans were removed by exact path before the final
audit.

## Independent adversarial review

The first review blocked on five P1 items:

1. boxed/pill coming-soon status
2. press motion on noninteractive cards
3. incomplete transform transitions
4. incomplete reduced-motion coverage
5. sub-44 px static-viewer controls

All five were corrected. A second evidence review then caught and corrected two
capture defects: viewport-only after images and an incorrect gallery route used
for the viewer image. Final independent result:

> ALLOW — audit PASS, diff-check PASS, full-page evidence current, correct
> API Documentation viewer, P0/P1/P2 = 0/0/0.
