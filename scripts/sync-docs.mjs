#!/usr/bin/env node
// Syncs the Next.js static export (out/) into docs/ (the deployed GitHub
// Pages source). Never deletes anything in docs/ — it only copies files that
// exist in out/, so files with no counterpart in out/ (CNAME, .nojekyll,
// sitemap.xml, robots.txt, docs-only assets, etc.) are preserved by
// construction. Default is a dry-run; pass --apply to actually write.
import { existsSync, readdirSync, mkdirSync, copyFileSync } from 'node:fs';
import { join, relative, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT_DIR = join(ROOT, 'out');
const DOCS_DIR = join(ROOT, 'docs');

// Defensive skip-list: never overwrite these even if a same-named file were
// ever produced under out/ by accident (e.g. via a stray public/ asset).
const PRESERVE_NAMES = new Set(['CNAME', '.nojekyll', 'sitemap.xml', 'robots.txt']);

// Repo-internal files that live under public/ (claude-mem generated, cannot be
// moved or deleted) get copied into out/ by Next.js but must never be deployed.
const INTERNAL_PATTERNS = [/^CLAUDE\.md$/, /^_locales\//];

function isInternal(f) {
  const posix = f.split('\\').join('/');
  return INTERNAL_PATTERNS.some((re) => re.test(posix));
}

const apply = process.argv.includes('--apply');

function walk(dir, base = dir) {
  const files = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full, base));
    } else {
      files.push(relative(base, full));
    }
  }
  return files;
}

function main() {
  if (!existsSync(OUT_DIR)) {
    console.error(`[sync-docs] out/ not found at ${OUT_DIR}. Run "next build" first.`);
    process.exitCode = 1;
    return;
  }

  const allFiles = walk(OUT_DIR);
  const rscPayloads = allFiles.filter((f) => extname(f) === '.txt');
  const preserved = allFiles.filter((f) => PRESERVE_NAMES.has(f));
  const internal = allFiles.filter((f) => isInternal(f));
  const toCopy = allFiles.filter(
    (f) => extname(f) !== '.txt' && !PRESERVE_NAMES.has(f) && !isInternal(f)
  );

  console.log(`[sync-docs] mode: ${apply ? 'APPLY' : 'DRY-RUN'}`);
  console.log(`[sync-docs] out/ total files: ${allFiles.length}`);
  console.log(`[sync-docs]   to copy into docs/: ${toCopy.length}`);
  console.log(`[sync-docs]   excluded (.txt RSC payload): ${rscPayloads.length}`);
  console.log(`[sync-docs]   excluded (repo-internal: CLAUDE.md / _locales): ${internal.length}`);
  if (preserved.length > 0) {
    console.log(`[sync-docs]   excluded (preserve-list match found inside out/, unexpected): ${preserved.length}`);
  }
  console.log(
    '[sync-docs] docs/-only files are left untouched (never deleted): CNAME, .nojekyll, sitemap.xml, robots.txt, and anything else with no counterpart in out/.'
  );

  if (!apply) {
    console.log('\n[sync-docs] Dry-run only — no files written. Re-run with --apply to copy.');
    const preview = toCopy.slice(0, 20);
    for (const f of preview) console.log(`  would copy: ${f}`);
    if (toCopy.length > preview.length) {
      console.log(`  ... and ${toCopy.length - preview.length} more`);
    }
    return;
  }

  for (const f of toCopy) {
    const dest = join(DOCS_DIR, f);
    mkdirSync(join(dest, '..'), { recursive: true });
    copyFileSync(join(OUT_DIR, f), dest);
  }
  console.log(`\n[sync-docs] Copied ${toCopy.length} files into docs/.`);
}

main();
