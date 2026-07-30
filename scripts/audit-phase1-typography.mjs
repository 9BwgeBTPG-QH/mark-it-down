#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs';

const css = readFileSync(new URL('../app/original.css', import.meta.url), 'utf8');
const fonts = readFileSync(new URL('../app/fonts.ts', import.meta.url), 'utf8');
const enLayout = readFileSync(new URL('../app/(en)/layout.tsx', import.meta.url), 'utf8');
const jaLayout = readFileSync(new URL('../app/(ja)/layout.tsx', import.meta.url), 'utf8');
const staticCss = readFileSync(new URL('../docs/style.src.css', import.meta.url), 'utf8');
const staticViewerEn = readFileSync(new URL('../docs/templates/view.html', import.meta.url), 'utf8');
const staticViewerJa = readFileSync(new URL('../docs/templates/view-ja.html', import.meta.url), 'utf8');

const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function blockFor(source, selector) {
  const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`));
  return match?.[1] ?? '';
}

expect(fonts.includes("variable: '--font-space-mono'"), 'Space Mono loader variable is missing');
expect(!fonts.includes("variable: '--font-mono'"), 'semantic --font-mono must not be a loader variable');
expect(
  /weight:\s*\[['\"]400['"],\s*['"]700['"]\]/.test(fonts),
  'Space Mono must load exactly weights 400 and 700'
);
expect(/preload:\s*false/.test(fonts), 'Space Mono must not be preloaded on every route');
expect(
  css.includes('--font-mono: var(--font-space-mono), ui-monospace, SFMono-Regular, monospace;'),
  'semantic --font-mono token does not match the approved fallback contract'
);

for (const [name, source] of [
  ['EN layout', enLayout],
  ['JA layout', jaLayout],
]) {
  expect(source.includes("from '../fonts'"), `${name} does not import the shared font module`);
  expect(source.includes('className={fontVariables}'), `${name} does not use shared fontVariables`);
}

const renderedNextSelectors = [
  '.accordion-version',
  '.accordion-status',
  '.changelog-features kbd',
  '.faq-accordion kbd',
  '.faq-accordion code',
  '.changelog-features code',
  '.welcome-cta kbd',
  '.way-content kbd',
];

for (const selector of renderedNextSelectors) {
  expect(
    /font-family:\s*var\(--font-mono\)/.test(blockFor(css, selector)),
    `${selector} does not use var(--font-mono)`
  );
}

const generatedSurfaceContracts = [
  ['changelog', readFileSync(new URL('../docs/changelog.html', import.meta.url), 'utf8'), ['accordion-version', 'accordion-status']],
  ['features', readFileSync(new URL('../docs/features.html', import.meta.url), 'utf8'), ['<kbd', '<code']],
  ['FAQ', readFileSync(new URL('../docs/faq.html', import.meta.url), 'utf8'), ['faq-accordion', '<kbd', '<code']],
  ['welcome', readFileSync(new URL('../docs/welcome.html', import.meta.url), 'utf8'), ['welcome-cta', 'way-content', '<kbd']],
];

for (const [surface, html, needles] of generatedSurfaceContracts) {
  for (const needle of needles) {
    expect(html.includes(needle), `${surface} export does not contain ${needle}`);
  }
}

const staticViewerSelectors = ['.template-viewer-content code', '.template-raw-content'];
for (const selector of staticViewerSelectors) {
  expect(
    /font-family:\s*var\(--font-mono\)/.test(blockFor(staticCss, selector)),
    `${selector} does not use the static var(--font-mono) token`
  );
}

for (const [name, source] of [
  ['EN static viewer', staticViewerEn],
  ['JA static viewer', staticViewerJa],
]) {
  expect(source.includes('class="template-viewer-content"'), `${name} content surface is missing`);
  expect(source.includes('class="template-raw-content"'), `${name} raw surface is missing`);
}

expect(
  staticCss.includes('--font-mono: "Space Mono", ui-monospace, SFMono-Regular, monospace;'),
  'static viewer --font-mono token does not match the approved fallback contract'
);
for (const weight of ['400', '700']) {
  expect(
    staticCss.includes(`font-weight: ${weight};`) &&
      staticCss.includes(`fonts/space-mono-latin-${weight}.woff2`),
    `static viewer Space Mono ${weight} face is missing`
  );
  expect(
    existsSync(new URL(`../docs/fonts/space-mono-latin-${weight}.woff2`, import.meta.url)),
    `static viewer Space Mono ${weight} asset is missing`
  );
}

const protectedContracts = [
  ['body', 'var(--font-sans)'],
  ['h1/h2', 'var(--font-serif)', 'h1,\\s*h2'],
  ['h3', 'var(--font-serif)'],
  ['header navigation', 'var(--font-sans)', '\\.header-nav a'],
];
for (const [name, expected, selector = name] of protectedContracts) {
  const escaped = selector.includes('\\')
    ? selector
    : selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = css.match(new RegExp(`${escaped}\\s*\\{([^}]+)\\}`));
  expect(
    match && new RegExp(`font-family:\\s*${expected.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`).test(match[1]),
    `${name} must retain ${expected}`
  );
}

expect(
  !/font-family:\s*(?:ui-monospace|SFMono-Regular|Consolas|monospace)/.test(css),
  'an ad-hoc monospace font-family remains in original.css'
);
expect(
  !/font-family:\s*(?:ui-monospace|SFMono-Regular|Consolas|monospace)/.test(staticCss),
  'an ad-hoc monospace font-family remains in docs/style.src.css'
);

if (failures.length > 0) {
  console.error('[phase1-typography] FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('[phase1-typography] PASS');
  console.log(`- shared font module parity: EN/JA`);
  console.log(`- rendered Next.js mono selectors: ${renderedNextSelectors.length}`);
  console.log(`- static viewer mono selectors: ${staticViewerSelectors.length}`);
  console.log(`- exact protected typography contracts: ${protectedContracts.length}`);
  console.log('- ad-hoc monospace declarations: 0 across both stylesheets');
}
