#!/usr/bin/env node

// Keeps chromatic colour a rounding error on the page rather than a design element.
//
// The site is built on a warm neutral ramp; colour earns its place only where it
// carries meaning (status, category, callout severity, syntax). The rendered
// baseline in doc/audit/chroma-baseline-2026-08-07.md measured how little chromatic
// area that actually is. This audit is what keeps it that way: a token that reads as
// chromatic may only appear on a surface that is registered here, so adding colour
// is a deliberate edit to this file rather than a side effect of styling something.
//
// Chromatic means OKLCH chroma >= 0.07 after compositing the value onto its own
// theme's --bg-primary. Compositing matters: the *-bg tokens carry alpha 0.08-0.15
// and land near-neutral on the page even though their raw values are vivid.

import { readFileSync, readdirSync } from 'node:fs';
import { extname, join } from 'node:path';

const ROOT = new URL('..', import.meta.url);
const CSS_FILES = ['app/original.css', 'docs/style.src.css'];
const CODE_DIRS = ['components', 'content'];
const THEME_BLOCKS = [
  [':root', 'light'],
  ['html:not([data-theme])', 'dark'],
];
const CHROMA_THRESHOLD = 0.07;
const list = process.argv.includes('--list');

// The brand base is exempt from the budget on both sides of the ratio: it is the
// site's identity, not an accent applied to a surface. Light resolves to the Coffee
// Brown ramp (C 0.053, already under the threshold); dark lifts the same role to a
// blue that reads chromatic by the numbers but plays the identical structural part.
const BRAND_EXEMPT = new Set(['--accent-primary', '--accent-hover', '--accent-light']);

// Properties that can only ever paint a hairline or a glyph. Anything that fills a
// surface (background, background-color) is rejected unless the entry declares
// surface: 'small' -- see the allowlist shape check below.
const LOW_AREA_PROPERTIES = new Set([
  'color',
  'border',
  'border-color',
  'border-top-color',
  'border-right-color',
  'border-bottom-color',
  'border-left-color',
  'border-left',
  'outline',
  'outline-color',
  'fill',
  'stroke',
  'text-decoration-color',
  'caret-color',
]);
const SURFACE_PROPERTIES = new Set(['background', 'background-color']);

// Properties that paint glyphs. Their area is bounded by the text itself, so they need
// no size cap -- growing them means growing the copy, which is a visible editorial act.
const GLYPH_PROPERTIES = new Set(['color', 'fill', 'stroke', 'text-decoration-color', 'caret-color']);

// The allowlist says *where* chromatic colour may appear; these say *how much*. Without
// them a registered surface can grow without limit and the audit stays green the whole
// way: widen the category stripe from 2px to 40px, or stretch the copied-button fill
// across the card, and every allowlist row is still valid while the rendered chromatic
// area climbs past the baseline recorded in doc/audit/chroma-baseline-2026-08-07.md.
//
// Each key is the rule that actually sizes a registered chromatic surface -- often not
// the rule that colours it, since the category and callout stripes inherit their width
// from .template-card and from the blockquote the callout is built on. Every area-bearing
// allowlist entry names its sizing rule via sizedBy, so a new coloured surface cannot be
// registered without saying what bounds it.
const AREA_CAPS = {
  '.template-card': { border: 4 },
  '.template-viewer-content blockquote': { 'border-left': 6 },
  '.feature-badge': { padding: 16 },
  '.feature-badge.pending': { border: 2 },
  '.copy-btn': { padding: 24, 'min-height': 48 },
};

// A small surface stops being small if it is told to fill its container. The lookarounds
// are what keep `100%` matchable at all -- \b cannot anchor after a `%`.
const FULL_BLEED = /(?<![\d.])100(?:%|v[wh])(?![\w.])/;
const SIZING_PROPERTIES = new Set(['width', 'height', 'min-width', 'min-height']);

// Registered chromatic surfaces. Selectors are normalised by dropping the
// `html:not([data-theme])` theme prefix, so one entry covers a rule and its dark
// counterpart. Adding a row here is the moment to ask whether the colour is
// carrying meaning or just decorating.
const ALLOWLIST = [
  // Status words inside the changelog accordion -- a few characters of text each.
  { selector: '.accordion-status.released', property: 'color' },
  { selector: '.accordion-status.review, .accordion-status.under-review', property: 'color' },

  // Template category badges: the label text only, on a neutral chip.
  { selector: '.badge-ai', property: 'color' },
  { selector: '.badge-content', property: 'color' },
  { selector: '.badge-dev', property: 'color' },
  { selector: '.badge-journaling', property: 'color' },
  { selector: '.badge-productivity', property: 'color' },
  { selector: '.badge-thinking', property: 'color' },

  // Copy confirmation. The only chromatic fill on the site, and it is both tiny and
  // transient -- the button reverts once the confirmation lapses.
  { selector: '.copy-btn.copied', property: 'background', surface: 'small', sizedBy: '.copy-btn' },

  // Single glyphs.
  { selector: '.cta-success .success-marker', property: 'color' },
  { selector: '.icon-warn', property: 'color' },
  { selector: '.icon-yes', property: 'color' },
  { selector: '.first-action-label', property: 'color' },
  { selector: '.first-action-label svg', property: 'color' },

  // Roadmap status pill: label text plus its 2px outline.
  { selector: '.feature-badge.pending', property: 'color' },
  { selector: '.feature-badge.pending', property: 'border', sizedBy: '.feature-badge.pending' },

  // Category stripe down the left edge of a template card. The width lives on
  // .template-card; these rules only recolour the edge it already draws.
  { selector: '.template-card[data-category="ai"]', property: 'border-left-color', sizedBy: '.template-card' },
  { selector: '.template-card[data-category="content"]', property: 'border-left-color', sizedBy: '.template-card' },
  { selector: '.template-card[data-category="dev"]', property: 'border-left-color', sizedBy: '.template-card' },
  { selector: '.template-card[data-category="journaling"]', property: 'border-left-color', sizedBy: '.template-card' },
  { selector: '.template-card[data-category="productivity"]', property: 'border-left-color', sizedBy: '.template-card' },
  { selector: '.template-card[data-category="thinking"]', property: 'border-left-color', sizedBy: '.template-card' },

  // Callout severity stripe inside rendered template markdown. A callout is a
  // blockquote, so the stripe it recolours is the blockquote's own left border.
  { selector: '.template-viewer-content .callout-caution', property: 'border-left-color', sizedBy: '.template-viewer-content blockquote' },
  { selector: '.template-viewer-content .callout-important', property: 'border-left-color', sizedBy: '.template-viewer-content blockquote' },
  { selector: '.template-viewer-content .callout-note', property: 'border-left-color', sizedBy: '.template-viewer-content blockquote' },
  { selector: '.template-viewer-content .callout-tip', property: 'border-left-color', sizedBy: '.template-viewer-content blockquote' },
  { selector: '.template-viewer-content .callout-warning', property: 'border-left-color', sizedBy: '.template-viewer-content blockquote' },

  // Syntax highlighting inside template code blocks (dark theme only). Colour here
  // is the feature: it is how code reads.
  {
    selector:
      '.template-viewer-content .hljs-attr, .template-viewer-content .hljs-selector-class',
    property: 'color',
  },
  {
    selector:
      '.template-viewer-content .hljs-built_in, .template-viewer-content .hljs-variable, .template-viewer-content .hljs-template-variable',
    property: 'color',
  },
  {
    selector:
      '.template-viewer-content .hljs-keyword, .template-viewer-content .hljs-selector-tag, .template-viewer-content .hljs-subst',
    property: 'color',
  },
  {
    selector:
      '.template-viewer-content .hljs-number, .template-viewer-content .hljs-literal, .template-viewer-content .hljs-type',
    property: 'color',
  },
  {
    selector:
      '.template-viewer-content .hljs-string, .template-viewer-content .hljs-doctag, .template-viewer-content .hljs-regexp',
    property: 'color',
  },
  {
    selector:
      '.template-viewer-content .hljs-title, .template-viewer-content .hljs-section, .template-viewer-content .hljs-selector-id',
    property: 'color',
  },
];

// Chromatic literals hard-coded in TS/TSX. Kept separate from the CSS allowlist
// because these are third-party brand marks, not site surfaces.
const CODE_ALLOWLIST = [
  { file: 'components/features/GitSyncIcon.tsx', value: '#F05032' }, // Git's own brand orange
];

const failures = [];

function fail(message) {
  failures.push(message);
}

function read(path) {
  return readFileSync(new URL(path, ROOT), 'utf8');
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/.*$/gm, (comment, prefix) => `${prefix}${' '.repeat(comment.length - prefix.length)}`);
}

function lineAt(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function blockRange(source, marker) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`[chroma-budget] missing block: ${marker}`);
  const open = source.indexOf('{', markerIndex);
  let depth = 0;

  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) return [open, index];
    }
  }

  throw new Error(`[chroma-budget] unclosed block: ${marker}`);
}

function blockStackAt(source, offset) {
  const stack = [];
  let segmentStart = 0;

  for (let index = 0; index < offset; index += 1) {
    if (source[index] === '{') {
      stack.push(source.slice(segmentStart, index).trim().replace(/\s+/g, ' '));
      segmentStart = index + 1;
    } else if (source[index] === '}') {
      stack.pop();
      segmentStart = index + 1;
    }
  }

  return stack;
}

function declarations(blockSource) {
  return new Map(
    [...blockSource.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim().replace(/\s+/g, ' '),
    ])
  );
}

// Throws rather than skipping: an unparseable value is a colour nobody is measuring,
// which is exactly how a budget stops being enforced. Extend this when the palette
// starts using a syntax it does not cover.
function parseColor(value) {
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i);
  if (hex) {
    const digits =
      hex[1].length === 3
        ? hex[1]
            .split('')
            .map((digit) => `${digit}${digit}`)
            .join('')
        : hex[1];
    return {
      r: Number.parseInt(digits.slice(0, 2), 16),
      g: Number.parseInt(digits.slice(2, 4), 16),
      b: Number.parseInt(digits.slice(4, 6), 16),
      a: digits.length === 8 ? Number.parseInt(digits.slice(6, 8), 16) / 255 : 1,
    };
  }
  const rgba = value.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+%?)\s*)?\)$/i
  );
  if (rgba) {
    const alpha = rgba[4] === undefined ? 1 : Number.parseFloat(rgba[4]) / (rgba[4].endsWith('%') ? 100 : 1);
    return { r: Number(rgba[1]), g: Number(rgba[2]), b: Number(rgba[3]), a: alpha };
  }
  throw new Error(`[chroma-budget] unsupported color syntax: ${value}`);
}

function composite(foreground, background) {
  return {
    r: foreground.r * foreground.a + background.r * (1 - foreground.a),
    g: foreground.g * foreground.a + background.g * (1 - foreground.a),
    b: foreground.b * foreground.a + background.b * (1 - foreground.a),
    a: 1,
  };
}

// OKLab chroma. Ottosson's sRGB -> OKLab matrices; C = hypot(a, b).
function chroma(color) {
  const toLinear = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  const red = toLinear(color.r);
  const green = toLinear(color.g);
  const blue = toLinear(color.b);
  const l = Math.cbrt(0.4122214708 * red + 0.5363325363 * green + 0.0514459929 * blue);
  const m = Math.cbrt(0.2119034982 * red + 0.6806995451 * green + 0.1073969566 * blue);
  const s = Math.cbrt(0.0883024619 * red + 0.2817188376 * green + 0.6299787005 * blue);
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const b = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
  return Math.hypot(a, b);
}

function normalizeSelector(selector) {
  return selector.replace(/html:not\(\[data-theme\]\)\s*/g, '').replace(/\s+/g, ' ').trim();
}

// The allowlist is data, so verify its own shape before trusting it: a surface-filling
// property may only be registered with an explicit small-surface tag.
for (const entry of ALLOWLIST) {
  if (SURFACE_PROPERTIES.has(entry.property) && entry.surface !== 'small') {
    fail(`allowlist entry ${entry.selector} { ${entry.property} } fills a surface without surface: 'small'`);
  }
  if (!SURFACE_PROPERTIES.has(entry.property) && !LOW_AREA_PROPERTIES.has(entry.property)) {
    fail(`allowlist entry ${entry.selector} uses unrecognised property ${entry.property}`);
  }
  // Anything that is not glyph-bound covers area, and area is what the 5% budget is
  // measured in. Such an entry has to name the rule that bounds it.
  if (GLYPH_PROPERTIES.has(entry.property)) continue;
  if (!entry.sizedBy) {
    fail(`allowlist entry ${entry.selector} { ${entry.property} } covers area without a sizedBy rule`);
  } else if (!AREA_CAPS[entry.sizedBy]) {
    fail(`allowlist entry ${entry.selector} is sized by ${entry.sizedBy}, which has no cap in AREA_CAPS`);
  }
}

const allowed = new Set(
  ALLOWLIST.map((entry) => `${normalizeSelector(entry.selector)}\t${entry.property}`)
);

function chromaticTokens(path) {
  const source = stripComments(read(path));
  const perTheme = new Map();

  for (const [marker, theme] of THEME_BLOCKS) {
    const [open, close] = blockRange(source, marker);
    const tokens = declarations(source.slice(open + 1, close));
    const background = parseColor(tokens.get('--bg-primary'));

    for (const [name, value] of tokens) {
      if (!/^(#|rgba?\()/i.test(value)) continue;
      const color = parseColor(value);
      const level = chroma(color.a === 1 ? color : composite(color, background));
      if (level < CHROMA_THRESHOLD) continue;
      const existing = perTheme.get(name) ?? {};
      existing[theme] = level;
      perTheme.set(name, existing);
    }
  }

  return perTheme;
}

function usages(path, tokenLevels) {
  const source = stripComments(read(path));
  const definitionRanges = THEME_BLOCKS.map(([marker]) => blockRange(source, marker));
  const found = [];

  for (const match of source.matchAll(/([-a-z]+)\s*:\s*([^;{}]*var\(\s*--[\w-]+[^;{}]*)/g)) {
    if (definitionRanges.some(([open, close]) => match.index >= open && match.index <= close)) {
      continue;
    }
    const tokens = [...match[2].matchAll(/var\(\s*(--[\w-]+)/g)]
      .map((reference) => reference[1])
      .filter((name) => tokenLevels.has(name) && !BRAND_EXEMPT.has(name));
    if (tokens.length === 0) continue;

    const stack = blockStackAt(source, match.index);
    const selector = [...stack].reverse().find((header) => !header.startsWith('@')) ?? '(root)';
    found.push({
      file: path,
      line: lineAt(source, match.index),
      selector: normalizeSelector(selector),
      property: match[1],
      tokens,
    });
  }

  return found;
}

// Rule bodies keyed by their normalised selector. A selector can be declared more than
// once (base rule plus a media-query override), so every body is kept and checked.
function ruleBodies(source) {
  const bodies = new Map();

  for (const match of source.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
    const selector = normalizeSelector(match[1]);
    if (!selector || selector.startsWith('@')) continue;
    const existing = bodies.get(selector) ?? [];
    existing.push({ body: match[2], line: lineAt(source, match.index) });
    bodies.set(selector, existing);
  }

  return bodies;
}

function lengthsIn(value) {
  // rem/em are resolved at the 16px root the site never overrides; a cap is an upper
  // bound, so an approximation that errs on the large side is the safe direction.
  return [...value.matchAll(/(-?[\d.]+)(px|rem|em)\b/g)].map(([, amount, unit]) =>
    unit === 'px' ? Number(amount) : Number(amount) * 16
  );
}

function checkAreaCaps(paths) {
  const bodiesByFile = paths.map((path) => [path, ruleBodies(stripComments(read(path)))]);
  let checked = 0;

  for (const [selector, caps] of Object.entries(AREA_CAPS)) {
    const matches = bodiesByFile.flatMap(([path, bodies]) =>
      (bodies.get(selector) ?? []).map((rule) => ({ path, ...rule }))
    );
    if (matches.length === 0) {
      fail(`AREA_CAPS names ${selector}, which no rule declares -- the surface it bounded has moved`);
      continue;
    }

    for (const [property, maxPx] of Object.entries(caps)) {
      const declared = matches.flatMap((rule) => {
        const found = [...rule.body.matchAll(/([-a-z]+)\s*:\s*([^;]+)/g)].filter(
          (declaration) => declaration[1].trim() === property
        );
        return found.map((declaration) => ({ ...rule, value: declaration[2].trim() }));
      });

      if (declared.length === 0) {
        fail(`AREA_CAPS caps ${selector} { ${property} }, but that rule no longer declares it`);
        continue;
      }

      for (const declaration of declared) {
        checked += 1;
        const over = lengthsIn(declaration.value).filter((length) => length > maxPx);
        if (over.length > 0) {
          fail(
            `${declaration.path}:${declaration.line} ${selector} { ${property}: ${declaration.value} } exceeds its ${maxPx}px chromatic-area cap`
          );
        }
      }
    }

    // Only the surfaces registered with surface: 'small' are allowed a chromatic fill,
    // and a fill that stretches to its container is no longer small.
    const fillsContainer = ALLOWLIST.some(
      (entry) => entry.sizedBy === selector && SURFACE_PROPERTIES.has(entry.property)
    );
    if (!fillsContainer) continue;

    for (const rule of matches) {
      for (const [, property, value] of rule.body.matchAll(/([-a-z]+)\s*:\s*([^;]+)/g)) {
        if (!SIZING_PROPERTIES.has(property.trim())) continue;
        if (!FULL_BLEED.test(value)) continue;
        fail(
          `${rule.path}:${rule.line} ${selector} { ${property.trim()}: ${value.trim()} } stretches a chromatic fill to its container`
        );
      }
    }
  }

  return checked;
}

function walk(path) {
  return readdirSync(new URL(`${path}/`, ROOT), { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });
}

function codeLiterals() {
  const files = CODE_DIRS.flatMap(walk).filter((path) => ['.ts', '.tsx'].includes(extname(path)));
  const found = [];

  for (const file of files) {
    const source = stripComments(read(file));
    for (const match of source.matchAll(/(?<!&)#[0-9a-f]{3,8}\b|rgba?\([^)]*\)/gi)) {
      const color = parseColor(match[0]);
      // No surface is known for an inline literal, so measure it at full strength.
      if (chroma({ ...color, a: 1 }) < CHROMA_THRESHOLD) continue;
      found.push({ file, line: lineAt(source, match.index), value: match[0] });
    }
  }

  return found;
}

const tokenLevels = CSS_FILES.map(chromaticTokens);
const cssUsages = CSS_FILES.map((path, index) => usages(path, tokenLevels[index]));
const cappedDeclarations = checkAreaCaps(CSS_FILES);

for (const [index, path] of CSS_FILES.entries()) {
  const budgeted = [...tokenLevels[index].keys()].filter((name) => !BRAND_EXEMPT.has(name));
  if (budgeted.length === 0) fail(`${path} found no chromatic tokens -- the parser is not measuring anything`);

  for (const usage of cssUsages[index]) {
    if (allowed.has(`${usage.selector}\t${usage.property}`)) continue;
    fail(
      `${path}:${usage.line} chromatic ${usage.tokens.join(', ')} on an unregistered surface: ${usage.selector} { ${usage.property} }`
    );
  }

  // A chromatic token nothing consumes is the shape a new colour arrives in: declared
  // first, applied in a later edit. Rejecting it here puts the budget conversation at
  // the moment the token is written rather than after it is already on the page.
  const consumed = new Set(cssUsages[index].flatMap((usage) => usage.tokens));
  for (const name of budgeted) {
    if (consumed.has(name)) continue;
    fail(`${path} declares chromatic ${name} but no rule uses it -- drop it or register the surface it belongs to`);
  }
}

const unusedEntries = [...allowed].filter(
  (key) => !cssUsages.flat().some((usage) => `${usage.selector}\t${usage.property}` === key)
);
for (const key of unusedEntries) {
  fail(`allowlist entry no longer matches any rule: ${key.replace('\t', ' { ')} }`);
}

const literals = codeLiterals();
for (const literal of literals) {
  const registered = CODE_ALLOWLIST.some(
    (entry) => entry.file === literal.file && entry.value.toLowerCase() === literal.value.toLowerCase()
  );
  if (registered) continue;
  fail(`${literal.file}:${literal.line} unregistered chromatic literal ${literal.value}`);
}

if (list) {
  for (const [index, path] of CSS_FILES.entries()) {
    for (const [name, levels] of [...tokenLevels[index]].sort()) {
      const measured = Object.entries(levels)
        .map(([theme, level]) => `${theme} ${level.toFixed(3)}`)
        .join(' / ');
      console.log(`${path}\ttoken\t${name}\t${measured}${BRAND_EXEMPT.has(name) ? '\tbrand-exempt' : ''}`);
    }
    for (const usage of cssUsages[index]) {
      console.log(`${path}:${usage.line}\tusage\t${usage.selector}\t${usage.property}\t${usage.tokens.join(',')}`);
    }
  }
}

const budgetedTokens = new Set(
  tokenLevels.flatMap((levels) => [...levels.keys()]).filter((name) => !BRAND_EXEMPT.has(name))
);

if (failures.length > 0) {
  console.log('[chroma-budget] FAIL');
  for (const failure of failures) console.log(`- ${failure}`);
  console.error(failures.map((failure) => `[chroma-budget] ${failure}`).join('\n'));
  process.exitCode = 1;
} else {
  console.log('[chroma-budget] PASS');
}

console.log(`- chroma threshold: C >= ${CHROMA_THRESHOLD} (OKLab, composited on --bg-primary)`);
console.log(`- chromatic tokens under budget: ${budgetedTokens.size}`);
console.log(`- brand-exempt tokens: ${BRAND_EXEMPT.size}`);
console.log(`- registered chromatic surfaces: ${ALLOWLIST.length}`);
console.log(
  `- area caps enforced: ${cappedDeclarations} declarations across ${Object.keys(AREA_CAPS).length} sizing rules`
);
console.log(`- chromatic usages in CSS: ${cssUsages.flat().length}`);
console.log(`- chromatic literals in ${CODE_DIRS.join('/')}: ${literals.length}`);
