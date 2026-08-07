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

// Flow order, not the pre-2026-08 order — and which categories sit under which
// heading, not just the two orders side by side. Membership is the invariant
// that carries meaning: heading order and id order can both be intact while a
// heading has drifted past a category, which silently reassigns it to the
// previous stage.
const GROUPS = [
  { en: 'Entry', ja: 'Entry', ids: ['web-clipper', 'rss-reader', 'repository-reader'] },
  { en: 'Edit', ja: 'Edit', ids: ['markdown', 'modes', 'view'] },
  { en: 'Move', ja: 'Move', ids: ['notes', 'note-graph'] },
  { en: 'Exit', ja: 'Exit', ids: ['portability', 'git-sync'] },
  { en: 'Everywhere', ja: 'どの段でも', ids: ['storage', 'shortcuts'] },
];

const CATEGORY_COUNT = GROUPS.reduce((total, group) => total + group.ids.length, 0);

const PAGES = [
  { file: 'docs/features.html', lang: 'en' },
  { file: 'docs/features-ja.html', lang: 'ja' },
];

// One pass over the document so headings and categories keep their relative
// order; matching them separately is what loses membership.
const OUTLINE = /<h2 class="features-group">([\s\S]*?)<\/h2>|<details class="accordion-item"[^>]*id="([^"]+)"/g;

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
  // Rebuild the outline as the browser sees it: each heading, then the
  // categories that follow it before the next heading. A category appearing
  // before any heading lands in the leading '' bucket and fails the comparison.
  const outline = [];
  let current = null;
  for (const match of html.matchAll(OUTLINE)) {
    if (match[1] !== undefined) {
      current = { heading: text(match[1]), ids: [] };
      outline.push(current);
    } else if (current) {
      current.ids.push(match[2]);
    } else {
      outline.push({ heading: '', ids: [match[2]] });
      current = outline[outline.length - 1];
    }
  }

  equal(
    outline,
    GROUPS.map((group) => ({ heading: group[page.lang], ids: group.ids })),
    `${where} accordion grouping changed — headings, order, or which stage a category belongs to (deep links break)`,
  );

  equal(
    outline.reduce((total, group) => total + group.ids.length, 0),
    CATEGORY_COUNT,
    `${where} expected ${CATEGORY_COUNT} categories`,
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

console.log(
  `[features-ia] OK — ${PAGES.length} pages, ${STAGES.length} stages, ${GROUPS.length} groups, ${CATEGORY_COUNT} categories`,
);
