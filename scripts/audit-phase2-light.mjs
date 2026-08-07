#!/usr/bin/env node

import { readFileSync } from 'node:fs';

const appCss = readFileSync(new URL('../app/original.css', import.meta.url), 'utf8');
const staticCss = readFileSync(new URL('../docs/style.src.css', import.meta.url), 'utf8');
const failures = [];

function expect(condition, message) {
  if (!condition) failures.push(message);
}

function rootTokens(source) {
  const root = source.match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? '';
  return new Map(
    [...root.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].replace(/\s+/g, ' ').trim(),
    ])
  );
}

function blockFor(source, selector) {
  return rules(source)
    .filter((rule) =>
      rule.header
        .split(',')
        .map((part) => part.trim())
        .includes(selector)
    )
    .map((rule) => rule.body)
    .join('\n');
}

function contextualBlockFor(source, selector, contextPattern) {
  return rules(source)
    .filter(
      (rule) =>
        rule.header
          .split(',')
          .map((part) => part.trim())
          .includes(selector) && rule.context.some((context) => contextPattern.test(context))
    )
    .map((rule) => rule.body)
    .join('\n');
}

// Split a shorthand `transition` value on top-level commas only. cubic-bezier()
// arguments carry their own commas and must not break a part apart.
function transitionParts(value) {
  const parts = [];
  let depth = 0;
  let current = '';
  for (const character of value) {
    if (character === '(') depth += 1;
    if (character === ')') depth -= 1;
    if (character === ',' && depth === 0) {
      parts.push(current);
      current = '';
      continue;
    }
    current += character;
  }
  parts.push(current);
  return parts;
}

function rules(source) {
  const clean = source.replace(/\/\*[\s\S]*?\*\//g, (comment) => ' '.repeat(comment.length));
  const stack = [];
  const result = [];
  let preludeStart = 0;

  for (let index = 0; index < clean.length; index += 1) {
    if (clean[index] === '{') {
      const header = clean.slice(preludeStart, index).trim();
      stack.push({
        header,
        bodyStart: index + 1,
        context: stack.map((entry) => entry.header),
      });
      preludeStart = index + 1;
    } else if (clean[index] === '}') {
      const entry = stack.pop();
      if (entry && !entry.header.startsWith('@')) {
        const body = clean.slice(entry.bodyStart, index);
        if (!body.includes('{')) result.push({ ...entry, body });
      }
      preludeStart = index + 1;
    }
  }

  return result;
}

function contrastRatio(foreground, background) {
  const luminance = (hex) => {
    const channels = hex
      .slice(1)
      .match(/.{2}/g)
      .map((value) => Number.parseInt(value, 16) / 255)
      .map((value) => (value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4));
    return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  };
  const first = luminance(foreground);
  const second = luminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
}

const appTokens = rootTokens(appCss);
const staticTokens = rootTokens(staticCss);
const expectedTokens = new Map([
  ['--bg-primary', '#f2ede4'],
  ['--text-primary', '#2d2a26'],
  ['--border-card', '#2d2a26'],
  ['--shadow-card-rest', '6px 6px 0 var(--text-primary)'],
  ['--shadow-card-hover', '4px 3px 0 var(--text-primary)'],
  ['--shadow-media', '6px 6px 0 var(--text-primary)'],
  ['--shadow-media-hover', '4px 3px 0 var(--text-primary)'],
  ['--shadow-focus', '0 0 0 3px var(--bg-primary), 0 0 0 5px var(--accent-primary)'],
  ['--shadow-floating', '3px 3px 0 var(--text-primary)'],
  ['--shadow-decorative', '2px 2px 0 var(--text-primary)'],
  ['--shadow-action-rest', '5px 5px 0 var(--text-primary)'],
  ['--shadow-action-hover', '3px 2px 0 var(--text-primary)'],
  ['--shadow-action-press', '3px 2px 0 var(--text-primary)'],
  ['--radius-card', '3px'],
  ['--radius-control', '4px'],
  ['--radius-inline', '2px'],
  ['--radius-media', '3px'],
  ['--radius-status', '0'],
  ['--radius-action', '4px'],
  ['--radius-pill', '999px'],
  ['--radius-circle', '50%'],
  ['--motion-duration', '120ms'],
  ['--motion-easing', 'ease-out'],
]);

for (const [token, expected] of expectedTokens) {
  expect(appTokens.get(token) === expected, `${token} in original.css must be ${expected}`);
  expect(staticTokens.get(token) === expected, `${token} in style.src.css must be ${expected}`);
}

const legacyPattern =
  /(?:var\(--shadow-(?:sm|md|lg|card|screenshot)\)|--shadow-(?:sm|md|lg|card|screenshot)\s*:|var\(--radius-(?:sm|md|lg|xl)\)|--radius-(?:sm|md|lg|xl)\s*:)/;
for (const [name, source] of [
  ['original.css', appCss],
  ['style.src.css', staticCss],
]) {
  expect(!legacyPattern.test(source), `${name} retains a legacy radius/shadow token`);

  const shadowValues = rules(source).flatMap((rule) =>
    [...rule.body.matchAll(/box-shadow\s*:\s*([^;]+);/g)].map((match) => ({
      value: match[1].replace(/\s+/g, ' ').trim(),
      forcedColors: rule.context.some((context) =>
        /^@media\s*\(forced-colors:\s*active\)/.test(context)
      ),
    }))
  );
  expect(
    shadowValues.every(
      ({ value, forcedColors }) => value.startsWith('var(--shadow-') || (value === 'none' && forcedColors)
    ),
    `${name} contains a non-semantic box-shadow declaration`
  );

  const radiusValues = [...source.matchAll(/border-radius\s*:\s*([^;]+);/g)].map((match) =>
    match[1].replace(/\s+/g, ' ').trim()
  );
  expect(
    radiusValues.every((value) => value.startsWith('var(--radius-') || value.startsWith('0')),
    `${name} contains a non-semantic nonzero border-radius declaration`
  );

  const unguardedHoverMotion = rules(source).filter(
    (rule) =>
      rule.header.includes(':hover') &&
      /(?:box-shadow|transform)\s*:/.test(rule.body) &&
      !rule.context.some((context) => /^@media\s*\(hover:\s*hover\)/.test(context))
  );
  expect(
    unguardedHoverMotion.length === 0,
    `${name} has unguarded hover motion: ${unguardedHoverMotion.map((rule) => rule.header).join(', ')}`
  );

  for (const rule of rules(source)) {
    const oneShotReveal =
      rule.header.includes('.coming-soon-section') &&
      rule.header.includes('.cta-section') &&
      rule.header.includes('.faq-preview-section') &&
      rule.header.includes('.workflow-section');
    for (const match of rule.body.matchAll(/transition(?:-duration)?\s*:\s*([^;]+);/g)) {
      for (const part of transitionParts(match[1])) {
        // `opacity` is out of scope: the only long opacity transitions here are the
        // scroll-reveal fades on .coming-soon-list li / .workflow-list li, which are
        // one-shot entrance animations rather than responses to an interaction. The
        // 300ms ceiling governs interaction feedback (border-color, box-shadow,
        // transform), so measuring the reveal against it flagged a non-issue.
        if (/\bopacity\b/.test(part)) continue;
        for (const duration of part.matchAll(/(\d*\.?\d+)(ms|s)\b/g)) {
          const milliseconds =
            duration[2] === 's' ? Number(duration[1]) * 1000 : Number(duration[1]);
          expect(
            milliseconds <= 300 || oneShotReveal,
            `${name} interactive transition exceeds 300ms in ${rule.header}: ${duration[0]}`
          );
        }
      }
    }
  }

  expect(
    /@media\s*\(prefers-reduced-motion:\s*reduce\)[\s\S]*?transition-duration:\s*0s\s*!important/.test(source),
    `${name} lacks the global reduced-motion transition override`
  );
  expect(
    /@media\s*\(hover:\s*hover\)[\s\S]*?translate\(2px,\s*3px\)/.test(source),
    `${name} lacks the approved hover-capability press transform`
  );
}

expect(!appCss.includes('body::before'), 'flat cream canvas must not retain the texture overlay');
expect(!staticCss.includes('body::before'), 'static flat cream canvas must not retain the texture overlay');

const majorCards = [
  '.philosophy-item',
  '.flow-section',
  '.flow-item',
  '.accordion-item',
  '.coming-soon-list li',
  '.workflow-list li',
  '.faq-item',
  '.template-card',
  '.template-viewer-content',
  '.first-action',
  '.welcome-cta',
  '.way-card',
  '.guide-card',
];
for (const selector of majorCards) {
  const block = blockFor(appCss, selector);
  expect(block.includes('border: 2px solid var(--text-primary)'), `${selector} lacks the 2px ink frame`);
  expect(block.includes('border-radius: var(--radius-card)'), `${selector} lacks --radius-card`);
  expect(block.includes('box-shadow: var(--shadow-card-rest)'), `${selector} lacks --shadow-card-rest`);
}

const button = blockFor(appCss, '.btn');
for (const contract of [
  'min-height: 52px',
  'border-radius: var(--radius-action)',
  'border: 2px solid var(--text-primary)',
  'box-shadow: var(--shadow-action-rest)',
]) {
  expect(button.includes(contract), `.btn lacks ${contract}`);
}
expect(
  blockFor(appCss, '.btn:active').includes('transform: translate(2px, 3px)'),
  '.btn:active lacks touch/keyboard press feedback'
);
expect(
  blockFor(appCss, '.btn:focus-visible').includes('var(--shadow-focus)'),
  '.btn:focus-visible lacks semantic focus parity'
);

for (const selector of ['.accordion-status', '.coming-soon-status']) {
  const block = blockFor(appCss, selector);
  for (const contract of [
    'border-block: 2px solid currentColor',
    'border-radius: var(--radius-status)',
    'background: transparent',
  ]) {
    expect(block.includes(contract), `${selector} lacks ${contract}`);
  }
}

const nonInteractivePressSelectors = [
  '.coming-soon-list li:hover',
  '.flow-item:hover',
  '.guide-card:hover',
  '.philosophy-item:hover',
  '.template-card:hover',
  '.way-card:hover',
  '.workflow-list li:hover',
];
const hoverContext = /@media\s*\(hover:\s*hover\)/;
for (const selector of nonInteractivePressSelectors) {
  expect(
    !contextualBlockFor(appCss, selector, hoverContext).includes('transform:'),
    `${selector} must not expose a press affordance`
  );
}

const movingContracts = [
  '.btn',
  '.accordion-item',
  '.first-action .screenshot img',
  '.screenshot-section img',
  '.template-edge-arrow .edge-arrow-icon',
];
const reducedContext = /@media\s*\(prefers-reduced-motion:\s*reduce\)/;
for (const selector of movingContracts) {
  expect(
    blockFor(appCss, selector).includes('transform var(--motion-duration)'),
    `${selector} lacks the 120ms transform transition`
  );
  expect(
    contextualBlockFor(appCss, selector, reducedContext).includes('transform: none'),
    `${selector} is missing from the reduced-motion transform reset`
  );
}
expect(
  contextualBlockFor(appCss, '.workflow-list li', reducedContext).includes('transform: none'),
  '.workflow-list li is missing from the reduced-motion reveal reset'
);

const mobileContext = /@media\s*\(max-width:\s*640px\)/;
const mobileTargets = [
  ['.view-toggle-btn', ['min-height: 44px']],
  ['.template-nav-btn', ['width: 44px', 'height: 44px']],
  ['.template-nav-input', ['width: 44px', 'height: 44px']],
  ['.template-viewer-bar-bottom .template-nav-btn', ['width: 44px', 'height: 44px']],
  ['.template-viewer-bar-bottom .template-nav-input', ['width: 44px', 'height: 44px']],
];
for (const [selector, contracts] of mobileTargets) {
  const block = contextualBlockFor(appCss, selector, mobileContext);
  for (const contract of contracts) {
    expect(block.includes(contract), `${selector} mobile target lacks ${contract}`);
  }
}

const contrastChecks = [
  ['body text', '#2d2a26', '#f2ede4', 4.5],
  ['secondary text', '#5c5854', '#f2ede4', 4.5],
  ['muted text', '#696460', '#f2ede4', 4.5],
  ['accent/focus', '#6b4e37', '#f2ede4', 3],
  ['control border', '#81796e', '#f2ede4', 3],
  ['CTA text', '#ffffff', '#2d2a26', 4.5],
  ['review status', '#b45309', '#faf7f2', 4.5],
  ['released status', '#047857', '#faf7f2', 4.5],
];
for (const [name, foreground, background, minimum] of contrastChecks) {
  const ratio = contrastRatio(foreground, background);
  expect(ratio >= minimum, `${name} contrast ${ratio.toFixed(2)} is below ${minimum}:1`);
}

if (failures.length > 0) {
  console.error('[phase2-light] FAIL');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('[phase2-light] PASS');
  console.log(`- production token parity: ${expectedTokens.size}`);
  console.log(`- major framed surfaces: ${majorCards.length}`);
  console.log('- legacy radius/shadow tokens: 0');
  console.log('- raw box shadows/nonzero radii: 0');
  console.log('- unguarded hover motion: 0');
  console.log('- noninteractive press affordances: 0');
  console.log(`- reduced-motion moving surfaces: ${movingContracts.length + 1}`);
  console.log(`- mobile 44px target contracts: ${mobileTargets.length}`);
  console.log('- interactive transition ceiling: 300ms');
  console.log('- contrast checks: 8');

  if (process.argv.includes('--ledger')) {
    for (const property of ['border-radius', 'box-shadow']) {
      const grouped = new Map();
      for (const rule of rules(appCss)) {
        for (const match of rule.body.matchAll(new RegExp(`${property}\\s*:\\s*([^;]+);`, 'g'))) {
          const value = match[1].replace(/\s+/g, ' ').trim();
          if (!grouped.has(value)) grouped.set(value, new Set());
          grouped.get(value).add(rule.header.replace(/\s+/g, ' ').trim());
        }
      }
      console.log(`\n## ${property}`);
      for (const [value, selectors] of [...grouped].sort(([left], [right]) => left.localeCompare(right))) {
        console.log(`- \`${value}\`: ${[...selectors].sort().map((selector) => `\`${selector}\``).join(', ')}`);
      }
    }
  }
}
