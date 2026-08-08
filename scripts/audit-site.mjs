#!/usr/bin/env node

// Runs every site audit and reports all of them.
//
// These used to be chained with `&&`, which stops at the first failure -- so a tree
// with two broken audits looked like a tree with one, and the second only appeared
// after the first was fixed. Each audit is independent, so run them all and summarise.
//
// Audits signal failure two different ways: most set process.exitCode, but
// audit-phase3-theme.mjs throws. Inheriting stdio and reading the exit status covers
// both, and keeps each audit's own output visible in order.

import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AUDITS = [
  'audit-features-ia.mjs',
  'audit-phase1-typography.mjs',
  'audit-phase2-light.mjs',
  'audit-phase3-colors.mjs',
  'audit-phase3-theme.mjs',
  'audit-chroma-budget.mjs',
  // Reads docs/ rather than the sources, so it reflects the last
  // sync-docs.mjs --apply, not the working tree.
  'audit-accessible-names.mjs',
  'audit-deploy-scripts.mjs',
];

const failed = [];

for (const audit of AUDITS) {
  console.log(`=== ${audit.replace(/^audit-|\.mjs$/g, '')} ===`);
  const result = spawnSync(process.execPath, [fileURLToPath(new URL(audit, import.meta.url))], {
    stdio: 'inherit',
  });
  if (result.status !== 0) failed.push(audit);
  console.log('');
}

if (failed.length > 0) {
  console.log(`[audit:site] FAIL — ${failed.length} of ${AUDITS.length}: ${failed.join(', ')}`);
  process.exitCode = 1;
} else {
  console.log(`[audit:site] PASS — ${AUDITS.length} audits`);
}
