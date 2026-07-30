#!/usr/bin/env node

import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url);
const CSS_FILES = ['app/original.css', 'docs/style.src.css'];
const PHASE3A_LIGHT_TOKEN_HASHES = [
  '555eb64b33678ae6c6637f833aa8c05fa5b9042b8f5f67e5273f06ccf0160f9b',
  'faa866b3cafdbffd4bedb3428f5bdd48dae0dc54a1cbae7efbef94f34b2aaf9d',
];
const LOCKED_PREFIXES = [
  '--font',
  '--spacing-',
  '--line-height-',
  '--letter-spacing-',
  '--radius-',
  '--motion-',
  '--transition-',
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
const darkTokens = cssSources.map((source) => tokens(block(source, 'html[data-theme="dark"]')));
const fallbackTokens = cssSources.map((source) => tokens(block(source, 'html:not([data-theme])')));

for (const [index, path] of CSS_FILES.entries()) {
  expect(
    tokenHash(lightTokens[index]) === PHASE3A_LIGHT_TOKEN_HASHES[index],
    `${path} changed a Phase 3a light token`
  );
  const themeOwned = [...lightTokens[index].keys()].filter(
    (name) => !LOCKED_PREFIXES.some((prefix) => name.startsWith(prefix))
  );
  const missing = themeOwned.filter((name) => !darkTokens[index].has(name));
  const locked = [...darkTokens[index].keys()].filter((name) =>
    LOCKED_PREFIXES.some((prefix) => name.startsWith(prefix))
  );
  expect(missing.length === 0, `${path} dark block misses: ${missing.join(', ')}`);
  expect(locked.length === 0, `${path} dark block overrides locked tokens: ${locked.join(', ')}`);
  expect(
    JSON.stringify([...darkTokens[index]]) === JSON.stringify([...fallbackTokens[index]]),
    `${path} explicit dark and no-JS fallback tokens differ`
  );
  expect(sourceHasThemeUi(cssSources[index]), `${path} theme selector contract is incomplete`);
  expect(
    cssSources[index].includes('@media (forced-colors: active)'),
    `${path} forced-colors contract is missing`
  );
}

expect(
  JSON.stringify([...darkTokens[0]]) === JSON.stringify([...darkTokens[1]]),
  'production/static dark token parity failed'
);

function sourceHasThemeUi(source) {
  const selectorBlock = block(source, '.theme-selector');
  const optionBlock = block(source, '.theme-selector-option');
  return (
    source.includes('html[data-theme="light"]') &&
    source.includes('color-scheme: light') &&
    source.includes('color-scheme: dark') &&
    source.includes('.theme-selector-option:has(input[type="radio"]:checked)') &&
    source.includes('.theme-selector-option:has(input[type="radio"]:focus-visible)') &&
    selectorBlock.includes('border:') &&
    /min-height:\s*44px/.test(optionBlock)
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
const themeModule = read('lib/theme.ts');
const selector = read('components/ThemeSelector.tsx');
const siteNav = read('components/SiteNav.tsx');
const decisionRecord = read('doc/design-samples/2026-07-brushup/decision-record.md');
const staticTheme = read('docs/assets/theme.js');
const staticViewers = ['docs/templates/view.html', 'docs/templates/view-ja.html'].map(read);
const packageJson = JSON.parse(read('package.json'));
const exportFinalizer = read('scripts/finalize-static-export.mjs');

for (const [name, layout] of [
  ['EN layout', enLayout],
  ['JA layout', jaLayout],
]) {
  expect(layout.includes('THEME_BOOTSTRAP_SCRIPT'), `${name} misses the bootstrap`);
  expect(layout.includes('suppressHydrationWarning'), `${name} misses hydration suppression`);
  expect(layout.includes('name="color-scheme"'), `${name} misses color-scheme metadata`);
  expect(layout.includes('id="mid-theme-bootstrap"'), `${name} misses the bootstrap marker`);
}

for (const contract of [
  'mid-theme',
  '(prefers-color-scheme: dark)',
  'data-theme',
  'data-theme-preference',
  'localStorage.removeItem',
  'mid-theme-ready',
]) {
  expect(themeModule.includes(contract), `bootstrap contract missing ${contract}`);
}

for (const contract of [
  "['system', 'light', 'dark']",
  "localStorage.setItem",
  "localStorage.removeItem",
  "addEventListener?.('change'",
  "addEventListener('storage'",
  'mid-theme-change',
]) {
  expect(selector.includes(contract), `ThemeSelector contract missing ${contract}`);
}

expect(siteNav.includes('<ThemeSelector lang={lang} />'), 'SiteNav misses ThemeSelector');
expect(siteNav.includes('header-nav-theme-only'), 'welcome theme selector route is missing');
expect(
  decisionRecord.includes('## Phase 3 theme state machine record'),
  'state machine was not recorded before implementation'
);
expect(
  packageJson.scripts.build.includes('scripts/finalize-static-export.mjs'),
  'build does not enforce pre-CSS theme bootstrap placement'
);
for (const contract of [
  'id="mid-theme-bootstrap"',
  'rel="stylesheet"',
  'Theme bootstrap still follows CSS',
]) {
  expect(exportFinalizer.includes(contract), `static export finalizer misses ${contract}`);
}

for (const [index, viewer] of staticViewers.entries()) {
  expect(
    viewer.indexOf('id="mid-theme-bootstrap"') < viewer.indexOf('rel="stylesheet"'),
    `static viewer ${index} bootstrap is not before CSS`
  );
  expect(
    (viewer.match(/class="theme-selector-option"/g) ?? []).length === 3,
    `static viewer ${index} does not expose three theme options`
  );
  expect(viewer.includes('../assets/theme.js'), `static viewer ${index} misses theme.js`);
}

for (const contract of [
  'localStorage.getItem',
  'localStorage.setItem',
  'localStorage.removeItem',
  "addEventListener('change'",
  "addEventListener('storage'",
  'data-theme-preference',
]) {
  expect(staticTheme.includes(contract), `static theme controller misses ${contract}`);
}

console.log('[phase3-theme] PASS');
console.log(`- Phase 3a light token hashes: ${PHASE3A_LIGHT_TOKEN_HASHES.join(' / ')}`);
console.log(`- dark theme-owned overrides: ${darkTokens[0].size}`);
console.log(`- locked token overrides: 0`);
console.log(`- explicit/no-JS token parity: PASS`);
console.log(`- production/static dark token parity: PASS`);
console.log(`- state-machine source contracts: PASS`);
console.log(`- static export pre-CSS bootstrap finalizer: PASS`);
console.log(`- static viewer bootstrap/UI contracts: PASS`);
console.log(`- contrast checks: ${contrastResults.length + 1}`);
console.log(`- minimum contrast: ${Math.min(onAccentRatio, ...contrastResults.map(([, ratio]) => ratio)).toFixed(2)}:1`);
