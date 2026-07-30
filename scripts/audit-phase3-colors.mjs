#!/usr/bin/env node

import { readFileSync, readdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = new URL('..', import.meta.url);
const ROOT_PATH = fileURLToPath(ROOT);
const CSS_FILES = ['app/original.css', 'docs/style.src.css'];
const CODE_DIRS = ['components', 'content'];
const list = process.argv.includes('--list');
const refIndex = process.argv.indexOf('--ref');
const targetRef = refIndex >= 0 ? process.argv[refIndex + 1] : null;

if (targetRef && !/^[0-9a-f]{7,40}$/i.test(targetRef)) {
  throw new Error(`Invalid --ref value: ${targetRef}`);
}

const EXPECTED_THEME_TOKENS = [
  '--text-on-accent',
  '--surface-caution',
  '--status-pending',
  '--status-pending-bg',
  '--status-pending-border',
  '--status-review',
  '--status-released',
  '--status-success',
  '--status-warning',
  '--status-warning-strong',
  '--badge-new-bg',
  '--badge-new-border',
  '--inline-code-bg',
  '--category-ai',
  '--category-ai-bg',
  '--category-productivity',
  '--category-productivity-bg',
  '--category-journaling',
  '--category-journaling-bg',
  '--category-dev',
  '--category-dev-bg',
  '--category-content',
  '--category-content-bg',
  '--category-thinking',
  '--category-thinking-bg',
  '--callout-tip',
  '--callout-tip-bg',
  '--callout-note',
  '--callout-note-bg',
  '--callout-warning',
  '--callout-warning-bg',
  '--callout-important',
  '--callout-important-bg',
  '--callout-caution',
  '--callout-caution-bg',
];

function read(path) {
  if (targetRef) {
    return execFileSync('git', ['show', `${targetRef}:${path}`], {
      cwd: ROOT_PATH,
      encoding: 'utf8',
    });
  }
  return readFileSync(new URL(path, ROOT), 'utf8');
}

function lineAt(source, offset) {
  return source.slice(0, offset).split('\n').length;
}

function stripComments(source) {
  return source
    .replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '))
    .replace(/(^|[^:])\/\/.*$/gm, (comment, prefix) => `${prefix}${' '.repeat(comment.length - prefix.length)}`);
}

function blockRange(source, marker) {
  const markerIndex = source.indexOf(marker);
  const open = source.indexOf('{', markerIndex);
  let depth = 0;

  for (let index = open; index < source.length; index += 1) {
    if (source[index] === '{') depth += 1;
    if (source[index] === '}') {
      depth -= 1;
      if (depth === 0) return [open, index];
    }
  }

  throw new Error(`Unclosed block: ${marker}`);
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

function classifyCss(finding) {
  if (finding.value === 'transparent' || finding.value === 'currentColor') {
    return 'semantic-css-keyword';
  }
  if (
    finding.stack.some((header) => header === '@media print') &&
    ((finding.selector === 'body' && ['#fff', '#000'].includes(finding.value)) ||
      (finding.selector === 'a' && finding.value === '#000'))
  ) {
    return 'print-output-contract';
  }
  if (targetRef) return 'tokenize';
  return 'UNCLASSIFIED';
}

function cssInventory(path) {
  const source = stripComments(read(path));
  const [rootOpen, rootClose] = blockRange(source, ':root');
  const literalPattern =
    /(#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)|\b(?:transparent|currentColor)\b)/gi;
  const findings = [];

  for (const match of source.matchAll(literalPattern)) {
    if (match.index >= rootOpen && match.index <= rootClose) continue;
    const stack = blockStackAt(source, match.index);
    const selector = [...stack].reverse().find((header) => !header.startsWith('@')) ?? '(root)';
    const finding = {
      file: path,
      line: lineAt(source, match.index),
      selector,
      value: match[0],
      stack,
    };
    findings.push({ ...finding, decision: classifyCss(finding) });
  }

  return findings;
}

function rootTokens(path) {
  const source = stripComments(read(path));
  const [open, close] = blockRange(source, ':root');
  const block = source.slice(open + 1, close);
  return new Map(
    [...block.matchAll(/(--[\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
      match[1],
      match[2].trim().replace(/\s+/g, ' '),
    ])
  );
}

function walk(path) {
  const absolute = new URL(`${path}/`, ROOT);
  return readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const child = join(path, entry.name);
    return entry.isDirectory() ? walk(child) : [child];
  });
}

function classifyCode(finding) {
  if (['none', 'currentColor'].includes(finding.value)) return 'svg-semantic-keyword';
  if (
    finding.file === 'components/features/GitSyncIcon.tsx' &&
    finding.value.toUpperCase() === '#F05032'
  ) {
    return 'brand-color-preserve';
  }
  if (
    targetRef &&
    finding.file === 'components/welcome/icons.tsx' &&
    finding.value.toUpperCase() === '#92400E'
  ) {
    return 'tokenize-to-currentColor';
  }
  return 'UNCLASSIFIED';
}

function codeInventory() {
  const files = CODE_DIRS.flatMap(walk).filter((path) => ['.ts', '.tsx'].includes(extname(path)));
  const findings = [];

  for (const file of files) {
    const source = stripComments(read(file));
    const seen = new Set();
    const attributePattern = /\b(fill|stroke)\s*=\s*["']([^"']+)["']/g;
    const literalPattern = /(?<!&)#[0-9a-f]{3,8}\b|rgba?\([^)]*\)|hsla?\([^)]*\)/gi;

    for (const match of source.matchAll(attributePattern)) {
      const valueIndex = match.index + match[0].indexOf(match[2]);
      const key = `${valueIndex}:${match[2]}`;
      seen.add(key);
      const finding = {
        file,
        line: lineAt(source, match.index),
        selector: `svg ${match[1]}`,
        value: match[2],
      };
      findings.push({ ...finding, decision: classifyCode(finding) });
    }

    for (const match of source.matchAll(literalPattern)) {
      const key = `${match.index}:${match[0]}`;
      if (seen.has(key)) continue;
      const finding = {
        file,
        line: lineAt(source, match.index),
        selector: 'inline literal',
        value: match[0],
      };
      findings.push({ ...finding, decision: classifyCode(finding) });
    }
  }

  return findings;
}

function signature(finding) {
  return `${finding.selector}\t${finding.value}\t${finding.decision}`;
}

const cssFindings = CSS_FILES.map(cssInventory);
const codeFindings = codeInventory();
const appSignatures = cssFindings[0].map(signature).sort();
const staticSignatures = cssFindings[1].map(signature).sort();
const cssParity =
  appSignatures.length === staticSignatures.length &&
  appSignatures.every((value, index) => value === staticSignatures[index]);

const tokenMaps = CSS_FILES.map(rootTokens);
const tokenProblems = EXPECTED_THEME_TOKENS.flatMap((token) => {
  const values = tokenMaps.map((tokens) => tokens.get(token));
  if (values.some((value) => value === undefined)) return [`${token}: missing`];
  if (values[0] !== values[1]) return [`${token}: production/static mismatch`];
  return [];
});

const allFindings = [...cssFindings.flat(), ...codeFindings];
const unclassified = allFindings.filter((finding) => finding.decision === 'UNCLASSIFIED');

if (list) {
  for (const finding of allFindings) {
    console.log(
      [
        finding.file,
        finding.line,
        finding.selector,
        finding.value,
        finding.decision,
      ].join('\t')
    );
  }
}

console.log('[phase3-colors] inventory');
console.log(`- target commit: ${targetRef ?? 'working tree'}`);
console.log(`- production CSS literals outside :root: ${cssFindings[0].length}`);
console.log(`- static CSS literals outside :root: ${cssFindings[1].length}`);
console.log(`- TS/TSX SVG and inline color findings: ${codeFindings.length}`);
console.log(`- classified findings: ${allFindings.length - unclassified.length}`);
console.log(`- unclassified findings: ${unclassified.length}`);
console.log(`- production/static selector parity: ${cssParity ? 'PASS' : 'FAIL'}`);
console.log(`- semantic theme tokens: ${EXPECTED_THEME_TOKENS.length}`);
console.log(`- token parity problems: ${tokenProblems.length}`);

if (!cssParity || (!targetRef && tokenProblems.length > 0) || unclassified.length > 0) {
  for (const problem of tokenProblems) console.error(`[phase3-colors] ${problem}`);
  for (const finding of unclassified) {
    console.error(
      `[phase3-colors] unclassified ${finding.file}:${finding.line} ${finding.selector} ${finding.value}`
    );
  }
  process.exitCode = 1;
} else {
  console.log('[phase3-colors] PASS');
}
