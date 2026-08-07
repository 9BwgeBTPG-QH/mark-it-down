#!/usr/bin/env node

// Locks the information architecture of the Features page: the four-stage
// carousel above the fold and the five-group ordering of the twelve accordion
// categories below it. Both are structure the reader is meant to navigate by,
// and both are easy to break silently — a reordered <FeatureCategoryAccordion>
// call, a dropped group heading, or a dot that stops matching its stage all
// still build, still typecheck, and still look plausible in a screenshot.
//
// It reads docs/, not out/ or the components: docs/ is the artifact GitHub
// Pages serves and the only rendering of the page that is committed, so the
// assertions hold against what visitors actually get. Running it after
// `node scripts/sync-docs.mjs --apply` therefore checks the deployment, not
// just the source. Same dependency-free style as the other audit-* scripts.
//
// Grouping and the three arguable placements (#notes and #note-graph under
// Move, #storage under Everywhere) come from
// $EXT/doc/research/features-page-ia-2026-08.md:340-357; the rationale lives in
// components/FeaturesPage.tsx. Deep links (#git-sync from the nav, #shortcuts
// from the changelog) depend on every id below continuing to exist.

import { readFileSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url);

const STAGES = ['entry', 'edit', 'move', 'exit'];

// Flow order, not the pre-2026-08 order. Group boundaries fall after
// repository-reader (3), view (6), note-graph (8) and git-sync (10).
const CATEGORY_IDS = [
  'web-clipper',
  'rss-reader',
  'repository-reader',
  'markdown',
  'modes',
  'view',
  'notes',
  'note-graph',
  'portability',
  'git-sync',
  'storage',
  'shortcuts',
];

const PAGES = [
  { file: 'docs/features.html', lang: 'en', groups: ['Entry', 'Edit', 'Move', 'Exit', 'Everywhere'] },
  { file: 'docs/features-ja.html', lang: 'ja', groups: ['Entry', 'Edit', 'Move', 'Exit', 'どの段でも'] },
];

let failures = 0;

function expect(condition, message) {
  if (!condition) {
    failures += 1;
    console.error(`[features-ia] ${message}`);
  }
}

function equal(actual, expected, message) {
  const a = JSON.stringify(actual);
  const b = JSON.stringify(expected);
  expect(a === b, `${message}\n  expected: ${b}\n  actual:   ${a}`);
}

function matchAll(html, pattern) {
  return [...html.matchAll(pattern)].map((match) => match[1]);
}

// BudouX injects <wbr/> into Japanese copy at build time; it must not change
// what a heading says.
function text(value) {
  return value.replace(/<wbr\s*\/?>/g, '').trim();
}

for (const page of PAGES) {
  const html = readFileSync(new URL(page.file, ROOT), 'utf8');
  const where = `${page.file}:`;

  // --- carousel -----------------------------------------------------------
  const track = html.match(/<div class="flow-track"[^>]*>/);
  expect(Boolean(track), `${where} .flow-track is missing`);
  if (track) {
    // A scroll container whose children are not focusable is unreachable by
    // keyboard in Chrome and Firefox unless it takes focus itself (WCAG 2.1.1).
    expect(track[0].includes('tabindex="0"'), `${where} .flow-track lost tabindex="0" (keyboard-unreachable)`);
    expect(track[0].includes('role="region"'), `${where} .flow-track lost role="region"`);
    expect(/aria-label="[^"]+"/.test(track[0]), `${where} .flow-track lost its aria-label`);
  }

  equal(matchAll(html, /data-flow-stage="([^"]+)"/g), STAGES, `${where} carousel stage order changed`);

  // One dot per stage, in the same order: the dots are the only visible
  // affordance that the track scrolls.
  equal(matchAll(html, /data-flow-dot="([^"]+)"/g), STAGES, `${where} dot order does not match stage order`);

  const dots = [...html.matchAll(/<button[^>]*class="flow-dot"[^>]*>/g)].map((m) => m[0]);
  equal(dots.length, STAGES.length, `${where} expected ${STAGES.length} .flow-dot buttons`);
  for (const dot of dots) {
    expect(/aria-label="[^"]+"/.test(dot), `${where} a .flow-dot has no aria-label (it has no text either)`);
  }
  // Progressive enhancement: the dots only do something once
  // FlowCarouselScript runs, so the first one is marked current server-side.
  equal(
    dots.filter((dot) => dot.includes('aria-current="true"')).length,
    1,
    `${where} exactly one .flow-dot must start aria-current="true"`,
  );

  // --- accordion grouping -------------------------------------------------
  equal(
    matchAll(html, /<h2 class="features-group">([\s\S]*?)<\/h2>/g).map(text),
    page.groups,
    `${where} group headings changed`,
  );

  equal(
    matchAll(html, /<details class="accordion-item"[^>]*id="([^"]+)"/g),
    CATEGORY_IDS,
    `${where} accordion order or ids changed (deep links break)`,
  );

  const open = [...html.matchAll(/<details class="accordion-item"[^>]*>/g)]
    .map((match) => match[0])
    .filter((tag) => /\sopen(=|\s|>)/.test(tag));
  equal(open.length, 1, `${where} exactly one category may start expanded`);
  expect(
    open.length === 1 && open[0].includes('id="web-clipper"'),
    `${where} the expanded category must be #web-clipper`,
  );

  // The stage titles and the group headings are all h2 by design, so a stray
  // h1 would mean the outline gained a second document title.
  equal((html.match(/<h1[\s>]/g) || []).length, 1, `${where} expected exactly one h1`);
}

if (failures > 0) {
  console.error(`[features-ia] ${failures} check(s) failed`);
  process.exit(1);
}

console.log(`[features-ia] OK — ${PAGES.length} pages, ${STAGES.length} stages, ${CATEGORY_IDS.length} categories`);
