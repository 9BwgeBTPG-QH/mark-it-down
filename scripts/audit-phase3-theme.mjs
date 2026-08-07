#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url);
const CSS_FILES = ['app/original.css', 'docs/style.src.css'];
// Scope: theme-owned light tokens only (colors and shadows). Tokens matching
// LOCKED_PREFIXES are excluded because they carry no theme meaning -- pinning them
// here made unrelated spacing/typography edits fail a check named "light token"
// (--spacing-section 6rem -> 8rem in 7eb6382 was the last false positive).
// Those tokens keep their own guarantee below: the dark block must never override
// them, so they stay single-sourced in :root.
const PHASE3A_LIGHT_TOKEN_HASHES = [
  '6f391d40cf47b57984535de2b818ac154a87e35a8e666f4d55d7b745c3f93132',
  '6f391d40cf47b57984535de2b818ac154a87e35a8e666f4d55d7b745c3f93132',
];
const LOCKED_PREFIXES = [
  '--font',
  '--spacing-',
  '--line-height-',
  '--letter-spacing-',
  '--radius-',
  '--motion-',
  '--transition-',
  '--content-max',
];

function read(path) {
  return readFileSync(new URL(path, ROOT), 'utf8');
}

function expect(condition, message) {
  if (!condition) throw new Error(`[phase3-theme] ${message}`);
}

function stripComments(source) {
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
}

function block(source, marker) {
  const markerIndex = source.indexOf(marker);
  expect(markerIndex >= 0, `${marker} block is missing`);
  const open = source.indexOf('{', markerIndex);
  let depth = 0;
  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(open + 1, index);
    }
  }
  throw new Error(`[phase3-theme] ${marker} block is unclosed`);
}

function tokens(blockSource) {
  return new Map(
    [...blockSource.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim().replace(/\s+/g, ' '),
    ])
  );
}

function tokenHash(tokenMap) {
  return createHash('sha256').update(JSON.stringify([...tokenMap])).digest('hex');
}

function parseColor(value) {
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
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
      a: 1,
    };
  }
  const rgba = value.match(
    /^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:\s*[,/]\s*([\d.]+))?\s*\)$/i
  );
  if (rgba) {
    return {
      r: Number(rgba[1]),
      g: Number(rgba[2]),
      b: Number(rgba[3]),
      a: rgba[4] === undefined ? 1 : Number(rgba[4]),
    };
  }
  throw new Error(`[phase3-theme] unsupported color syntax: ${value}`);
}

function composite(foreground, background) {
  const alpha = foreground.a + background.a * (1 - foreground.a);
  return {
    r: (foreground.r * foreground.a + background.r * background.a * (1 - foreground.a)) / alpha,
    g: (foreground.g * foreground.a + background.g * background.a * (1 - foreground.a)) / alpha,
    b: (foreground.b * foreground.a + background.b * background.a * (1 - foreground.a)) / alpha,
    a: alpha,
  };
}

function luminance(color) {
  const channel = (value) => {
    const normalized = value / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(color.r) + 0.7152 * channel(color.g) + 0.0722 * channel(color.b);
}

function contrast(foreground, background) {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  const lighter = Math.max(foregroundLuminance, backgroundLuminance);
  const darker = Math.min(foregroundLuminance, backgroundLuminance);
  return (lighter + 0.05) / (darker + 0.05);
}

function tokenColor(tokenMap, name) {
  const value = tokenMap.get(name);
  expect(value, `${name} is missing`);
  return parseColor(value);
}

const cssSources = CSS_FILES.map((path) => stripComments(read(path)));
const lightTokens = cssSources.map((source) => tokens(block(source, ':root')));
const darkTokens = cssSources.map((source) => tokens(block(source, 'html:not([data-theme])')));

for (const [index, path] of CSS_FILES.entries()) {
  const themeOwned = [...lightTokens[index].keys()].filter(
    (name) => !LOCKED_PREFIXES.some((prefix) => name.startsWith(prefix))
  );
  const themeOwnedTokens = new Map(themeOwned.map((name) => [name, lightTokens[index].get(name)]));
  expect(
    tokenHash(themeOwnedTokens) === PHASE3A_LIGHT_TOKEN_HASHES[index],
    `${path} changed a Phase 3a light theme token`
  );
  const missing = themeOwned.filter((name) => !darkTokens[index].has(name));
  const locked = [...darkTokens[index].keys()].filter((name) =>
    LOCKED_PREFIXES.some((prefix) => name.startsWith(prefix))
  );
  expect(missing.length === 0, `${path} dark block misses: ${missing.join(', ')}`);
  expect(locked.length === 0, `${path} dark block overrides locked tokens: ${locked.join(', ')}`);
  expect(sourceHasSystemTheme(cssSources[index]), `${path} system theme contract is incomplete`);
}

expect(
  JSON.stringify([...darkTokens[0]]) === JSON.stringify([...darkTokens[1]]),
  'production/static dark token parity failed'
);

function sourceHasSystemTheme(source) {
  return (
    source.includes('@media (prefers-color-scheme: dark)') &&
    source.includes('html:not([data-theme])') &&
    source.includes('color-scheme: light') &&
    source.includes('color-scheme: dark') &&
    !source.includes('html[data-theme=') &&
    !source.includes('.theme-selector') &&
    !source.includes('.theme-switcher')
  );
}

const background = tokenColor(darkTokens[0], '--bg-primary');
const card = composite(tokenColor(darkTokens[0], '--bg-card'), background);
const accent = tokenColor(darkTokens[0], '--accent-primary');
const contrastChecks = [
  ['--text-primary', background],
  ['--text-secondary', background],
  ['--text-muted', background],
  ['--accent-primary', background],
  ['--status-pending', card],
  ['--status-review', card],
  ['--status-released', card],
  ['--status-success', card],
  ['--status-warning', card],
  ['--status-warning-strong', card],
  ['--category-ai', composite(tokenColor(darkTokens[0], '--category-ai-bg'), card)],
  [
    '--category-productivity',
    composite(tokenColor(darkTokens[0], '--category-productivity-bg'), card),
  ],
  ['--category-journaling', composite(tokenColor(darkTokens[0], '--category-journaling-bg'), card)],
  ['--category-dev', composite(tokenColor(darkTokens[0], '--category-dev-bg'), card)],
  ['--category-content', composite(tokenColor(darkTokens[0], '--category-content-bg'), card)],
  ['--category-thinking', composite(tokenColor(darkTokens[0], '--category-thinking-bg'), card)],
];

const contrastResults = contrastChecks.map(([name, surface]) => {
  const ratio = contrast(tokenColor(darkTokens[0], name), surface);
  expect(ratio >= 4.5, `${name} contrast ${ratio.toFixed(2)} is below 4.5:1`);
  return [name, ratio];
});
const onAccentRatio = contrast(tokenColor(darkTokens[0], '--text-on-accent'), accent);
expect(onAccentRatio >= 4.5, `--text-on-accent contrast ${onAccentRatio.toFixed(2)} is below 4.5:1`);

const enLayout = read('app/(en)/layout.tsx');
const jaLayout = read('app/(ja)/layout.tsx');
const siteNav = read('components/SiteNav.tsx');
const decisionRecord = read('doc/design-samples/2026-07-brushup/decision-record.md');
const staticViewers = ['docs/templates/view.html', 'docs/templates/view-ja.html'].map(read);
const packageJson = JSON.parse(read('package.json'));

for (const [name, layout] of [
  ['EN layout', enLayout],
  ['JA layout', jaLayout],
]) {
  expect(layout.includes('name="color-scheme"'), `${name} misses color-scheme metadata`);
  expect(
    layout.includes('media="(prefers-color-scheme: light)"'),
    `${name} misses the light theme-color media query`
  );
  expect(
    layout.includes('media="(prefers-color-scheme: dark)"'),
    `${name} misses the dark theme-color media query`
  );
  expect(!layout.includes('THEME_BOOTSTRAP_SCRIPT'), `${name} still imports theme JavaScript`);
  expect(!layout.includes('suppressHydrationWarning'), `${name} still suppresses theme hydration`);
  expect(!layout.includes('mid-theme-bootstrap'), `${name} still emits a theme bootstrap`);
}

expect(!siteNav.includes('ThemeSelector'), 'SiteNav still renders ThemeSelector');
expect(!siteNav.includes('theme-switcher'), 'SiteNav still exposes a theme switcher');
expect(
  decisionRecord.includes('## Phase 3 browser-preference revision'),
  'browser-preference owner decision is not recorded'
);
expect(
  packageJson.scripts.build === 'next build',
  'build still carries theme-bootstrap post-processing'
);

for (const [index, viewer] of staticViewers.entries()) {
  expect(
    viewer.includes('name="color-scheme" content="light dark"'),
    `static viewer ${index} misses color-scheme metadata`
  );
  expect(
    viewer.includes('media="(prefers-color-scheme: light)"') &&
      viewer.includes('media="(prefers-color-scheme: dark)"'),
    `static viewer ${index} misses media-specific theme colors`
  );
  expect(!viewer.includes('mid-theme-bootstrap'), `static viewer ${index} still has theme JS`);
  expect(!viewer.includes('theme-selector'), `static viewer ${index} still exposes theme UI`);
  expect(!viewer.includes('../assets/theme.js'), `static viewer ${index} still loads theme.js`);
}

console.log('[phase3-theme] PASS');
console.log(`- Phase 3a light token hashes: ${PHASE3A_LIGHT_TOKEN_HASHES.join(' / ')}`);
console.log(`- dark theme-owned overrides: ${darkTokens[0].size}`);
console.log(`- locked token overrides: 0`);
console.log(`- explicit data-theme selectors absent: PASS`);
console.log(`- production/static dark token parity: PASS`);
console.log(`- system-only CSS/metadata contracts: PASS`);
console.log(`- theme UI/storage/bootstrap absent: PASS`);
console.log(`- static viewer system-theme contract: PASS`);
console.log(`- contrast checks: ${contrastResults.length + 1}`);
console.log(`- minimum contrast: ${Math.min(onAccentRatio, ...contrastResults.map(([, ratio]) => ratio)).toFixed(2)}:1`);
