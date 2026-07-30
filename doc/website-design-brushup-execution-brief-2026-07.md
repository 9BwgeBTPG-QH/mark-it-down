# Website design brush-up execution brief

Status: approved for implementation on 2026-07-30

Tracking: extension-repository Epic #1660 and children #1661–#1664

Production baseline: `e399c522748caa48602c5a5aa2dc1cbf4aa09b85`

## Purpose

Evolve the bilingual public site from its restored warm editorial baseline into
a more recognizable Mark It Down system without weakening readability,
accessibility, static-export integrity, or the site's belief-first message.

The implementation is driven by the approved Phase 0 evidence in
[`design-samples/2026-07-brushup/decision-record.md`](./design-samples/2026-07-brushup/decision-record.md).
The cross-repository canonical plan is
`chorme_mark-it-down/doc/specs/website-design-brushup-plan-2026-07.md`.

## Fixed visual decisions

| Concern | Approved direction |
|---|---|
| Metadata/code face | Space Mono 400/700 |
| Heading face | Retain Lora |
| Light depth | 6 px hard offset shadows, split by semantic surface |
| Light frames | 2 px solid ink borders; 3 px card radius |
| Light canvas | Flat `#f2ede4`, no grid |
| Dark accent | Extension blue `#60a5fa` |
| Status | Unboxed label with top/bottom rules |
| CTA | 4 px corner, minimum 52 px height |
| Motion | 120 ms physical press; no movement under reduced motion |
| Theme control | Explicit System / Light / Dark options |

## Phase contracts

### Phase 1 — #1662: monospace accent

- Add Space Mono as a loader variable and expose it through a separately owned
  semantic `--font-mono` token.
- Share EN/JA font configuration.
- Migrate the three existing ad-hoc monospace surfaces and apply the token to
  version, shortcut, changelog metadata, and Markdown-example categories.
- Prove body, headings, and navigation remain non-monospace.
- Gate on build, generated-file scope, EN/JA responsive evidence, fallback,
  transfer/preload accounting, and index CLS ≤ 0.1 and ≤ baseline + 0.01.

### Phase 2 — #1663: light visual grammar

- Record shape/shadow ownership before changing values.
- Split shared shadows by card rest/hover, media, focus, floating, and decorative
  use; do not global-replace unrelated geometry.
- Apply the approved flat cream, sharp frames, hard shadows, angular CTA,
  unboxed status, and Lora headings across all 13 EN and 13 JA routes.
- Preserve visible focus, 44 px targets, hover capability guards, and
  reduced-motion behavior.
- Gate on representative cohort review, then full bilingual responsive coverage,
  AA, generated-file scope, and CLS.

### Phase 3 — #1664: dark theme

- Phase 3a first inventories every non-token color at an exact commit and moves
  color ownership to semantic variables without changing light output.
- Phase 3b implements the recorded `system | light | dark` state machine,
  pre-paint bootstrap, explicit accessible options, and dark-only color/shadow
  overrides.
- Gate on 52 route/theme/locale states, three engines, deterministic four-case
  FOUC tests, no hydration warning, AA, dark media/form/code coverage, forced
  colors, generated-file scope, and CLS.

## Route matrix

Thirteen page concepts exist in both English and Japanese:

`index`, `changelog`, `clipper`, `faq`, `features`, `feedback`, `okf`,
`privacy-policy`, `rss`, `templates`, `troubleshooting`, `welcome`, `why`.

All final-phase matrices use this set. Representative cohorts may reduce breadth
only where the canonical plan explicitly permits it.

## Static export and release contract

1. Run `npm run build`.
2. Run `node scripts/sync-docs.mjs --apply`.
3. Compare the scoped `docs/` diff to an explicit expected generated-file set.
4. Separately detect `docs/_next` files with no counterpart under `out/_next`;
   the sync script deliberately does not delete stale files.
5. Revert the phase if AA, FOUC, CLS, generated scope, or production smoke fails.
6. After deployment, smoke-test the public index and the phase's representative
   pages in both locales where applicable.

## Non-goals

- No change to product positioning, SEO titles, or page information architecture.
- No hand editing of generated `docs/` without a preceding `out/` build.
- No rounded-everything or animated-decoration expansion beyond approved tokens.
- No theme preference synchronization beyond same-origin `localStorage`.
