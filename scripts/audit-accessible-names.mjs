#!/usr/bin/env node

// WCAG 2.5.3 "Label in Name" gate for the built pages.
//
// When an interactive control carries both visible text and an aria-label, the
// aria-label replaces the visible text as the accessible name. Speech-input
// users say what they see, so the accessible name has to *contain* the visible
// label; otherwise "click get the extension" matches nothing. Lighthouse
// reports this as label-content-name-mismatch — at weight 0, which is why the
// site's A11y score stayed at 100 while four CTAs violated it.
//
// Scope is <a> and <button> in docs/*.html: those are the controls whose label
// is their own text content. Landmark aria-labels (<nav>, <section>) and
// icon-only controls have no visible text label and are outside SC 2.5.3.
//
// Runs against docs/ rather than components/, because the accessible name is a
// property of the rendered pair (attribute + children) and only the build puts
// those two next to each other. A fix therefore has to be built and synced
// before this audit can see it.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const DOCS_DIR = fileURLToPath(new URL('../docs', import.meta.url));

// Non-greedy up to the first matching close tag. Neither <a> nor <button>
// nests inside itself in this codebase, so no balancing is needed.
const CONTROL = /<(a|button)\b([^>]*)>([\s\S]*?)<\/\1>/gi;
const ARIA_LABEL = /\saria-label="([^"]*)"/i;
const ARIA_LABELLEDBY = /\saria-labelledby="/i;

const ENTITIES = {
  '&amp;': '&',
  '&lt;': '<',
  '&gt;': '>',
  '&quot;': '"',
  '&#39;': "'",
  '&#x27;': "'",
  '&nbsp;': ' ',
};

// Budoux wraps CJK copy in <span> + <wbr>; stripping tags recovers the text a
// sighted reader sees. Zero-width characters are invisible, so they must not
// affect the comparison either.
function visibleText(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&[a-z#0-9x]+;/gi, (e) => ENTITIES[e.toLowerCase()] ?? e)
    .replace(/[​‌‍﻿]/g, '');
}

// Same normalisation Lighthouse applies before the substring test: collapse
// runs of whitespace, trim, case-fold. Whitespace is not removed outright —
// "Chrome ウェブストア" and "Chrome Web Store" differ in more than spacing and
// should stay distinguishable.
function normalize(text) {
  return text.replace(/\s+/g, ' ').trim().toLowerCase();
}

const files = readdirSync(DOCS_DIR)
  .filter((f) => f.endsWith('.html'))
  .sort();

const failures = [];
let checked = 0;

for (const file of files) {
  const html = readFileSync(join(DOCS_DIR, file), 'utf8');
  for (const [, , attrs, inner] of html.matchAll(CONTROL)) {
    const label = attrs.match(ARIA_LABEL);
    if (!label || ARIA_LABELLEDBY.test(attrs)) continue;

    const visible = normalize(visibleText(inner));
    if (!visible) continue; // icon-only control: no visible label to contain

    checked += 1;
    const accessible = normalize(label[1]);
    if (!accessible.includes(visible)) {
      failures.push({ file, visible: visibleText(inner).trim(), accessible: label[1] });
    }
  }
}

if (failures.length > 0) {
  for (const f of failures) {
    console.error(`[a11y-names] FAIL ${f.file}`);
    console.error(`  visible:    ${f.visible}`);
    console.error(`  aria-label: ${f.accessible}`);
  }
  console.error(
    `[a11y-names] FAIL — ${failures.length} of ${checked} labelled controls across ${files.length} pages`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `[a11y-names] PASS — ${checked} labelled controls across ${files.length} pages contain their visible text`,
  );
}
