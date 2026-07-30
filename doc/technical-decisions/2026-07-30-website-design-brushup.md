# ADR: supersede the restored site visual grammar with the approved brush-up

Date: 2026-07-30

Status: accepted

Related: extension-repository #1593, #1660, #1661–#1664

## Context

Issue #1593 restored the public site to a known warm editorial design after an
earlier redesign failed its quality bar. That restoration remains the correct
production baseline: it is bilingual, readable, statically exported, and
belief-first. It was a recovery decision, not a permanent prohibition on
further visual development.

The #1660 plan addresses the failure mode that made an immediate redesign risky:
every visual axis was isolated, rendered with local assets at fixed viewports,
scored against a shared rubric, and reviewed as one recommended composite before
production changes.

## Decision

We intentionally supersede #1593's soft-card visual grammar while retaining its
content structure and warm editorial foundation.

- Keep Lora headings, Raleway body copy, and flat cream canvas.
- Add Space Mono only to defined metadata/code categories.
- Replace general soft depth with semantic hard-offset light-theme shadows.
- Use sharp framed surfaces, angular CTAs, and unboxed status labels.
- Add a dark theme whose colors and effects vary by theme while shape ownership
  remains shared.
- Expose System / Light / Dark explicitly; represent System as the absence of
  `localStorage["mid-theme"]`.

The exact chosen values and rejected alternatives live in
[`../design-samples/2026-07-brushup/decision-record.md`](../design-samples/2026-07-brushup/decision-record.md).

## Why this is safe to proceed

- The decision was made from 26 single-axis states, not from a coupled redesign.
- EN desktop and JA mobile evidence exists for every option.
- The chosen composite passed overflow, font loading/fallback, keyboard, touch,
  reduced-motion, target-size, and contrast gates.
- Production is split into independently reversible typography, light-theme,
  color-audit, and dark-theme checkpoints.
- Generated output and stale static assets are explicit release gates.

## Consequences

- #1593 remains the baseline and rollback reference, but not the active visual
  target.
- Phase 2 must classify existing radius/shadow exceptions; blanket replacement
  is prohibited.
- Phase 3a must produce a reproducible hard-coded-color inventory before dark
  variables are introduced.
- The theme bootstrap becomes critical inline code and requires deterministic
  FOUC and hydration tests.
- Future visual changes must preserve the semantic token boundaries introduced
  by this work.

## Rollback

Each production phase is reverted independently if it causes an AA failure,
reproducible FOUC, CLS regression beyond contract, unexpected generated files,
or production display failure. Reverting does not invalidate this ADR; it
returns the failed phase for correction while preserving earlier accepted work.
