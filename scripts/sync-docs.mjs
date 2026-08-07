#!/usr/bin/env node
// Syncs the Next.js static export (out/) into docs/ (the deployed GitHub
// Pages source). Copying is additive: files with no counterpart in out/
// (CNAME, .nojekyll, sitemap.xml, robots.txt, the legacy assets, templates/,
// slides, docs-only images) are preserved by construction.
//
// Pruning is the one exception, and it is deliberately narrow. Everything
// under docs/_next/ is Next build output keyed by a per-build hash, so a
// rebuild leaves the previous build's chunks behind forever; six orphan
// buildId directories and three orphan stylesheets had accumulated by
// 2026-08. Inside that one directory "not in out/" always means "stale", so
// it is safe to delete there — and only there. The same rule applied to
// docs/ at large would wipe the legacy assets the pages still link to.
// Default is a dry-run; pass --apply to actually write.
import { existsSync, readdirSync, mkdirSync, copyFileSync, rmSync, rmdirSync } from 'node:fs';
import { join, relative, extname, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const OUT_DIR = join(ROOT, 'out');
const DOCS_DIR = join(ROOT, 'docs');

// Only these docs/ subtrees are pruned against out/. Keep this list minimal:
// a directory belongs here only if every file in it is build output.
const PRUNE_DIRS = ['_next'];

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

function toPosix(f) {
  return f.split('\\').join('/');
}

// Files under docs/PRUNE_DIRS with no counterpart in out/ — previous builds'
// chunks. Also flags top-level docs/*.html with no counterpart, which would be
// a route that was renamed or removed; those are reported, never deleted,
// because docs/ legitimately holds hand-built pages (slides, templates).
function findStale(docsFiles, outFiles) {
  const live = new Set(outFiles.map(toPosix));
  const orphans = docsFiles.map(toPosix).filter((f) => !live.has(f));
  return {
    stale: orphans.filter((f) => PRUNE_DIRS.some((dir) => f.startsWith(`${dir}/`))),
    unmatchedPages: orphans.filter((f) => /^[^/]+\.html$/.test(f)),
  };
}

// After deleting files, walk the emptied directories out (buildId dirs leave
// their now-empty shell behind otherwise). rmdirSync fails on non-empty dirs,
// which is exactly the stop condition.
function pruneEmptyDirs(startDirs) {
  for (const dir of [...startDirs].sort((a, b) => b.length - a.length)) {
    let current = dir;
    while (current.startsWith(DOCS_DIR) && current !== DOCS_DIR) {
      try {
        rmdirSync(current);
      } catch {
        break;
      }
      current = dirname(current);
    }
  }
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
    `[sync-docs] docs/-only files are left untouched outside ${PRUNE_DIRS.map((d) => `${d}/`).join(', ')}: CNAME, .nojekyll, sitemap.xml, robots.txt, slides, templates/, legacy assets.`
  );

  const docsFiles = existsSync(DOCS_DIR) ? walk(DOCS_DIR) : [];
  // Compared against toCopy, not allFiles: anything sync refuses to copy
  // (RSC payloads, repo-internal files) has no business staying in docs/ either.
  const { stale, unmatchedPages } = findStale(docsFiles, toCopy);
  console.log(`[sync-docs]   stale build output to delete from docs/: ${stale.length}`);
  for (const f of unmatchedPages) {
    console.log(`[sync-docs] NOTE: docs/${f} has no counterpart in out/ (not deleted — check whether the route was renamed)`);
  }

  if (!apply) {
    console.log('\n[sync-docs] Dry-run only — no files written. Re-run with --apply to copy.');
    const preview = toCopy.slice(0, 20);
    for (const f of preview) console.log(`  would copy: ${f}`);
    if (toCopy.length > preview.length) {
      console.log(`  ... and ${toCopy.length - preview.length} more`);
    }
    for (const f of stale) console.log(`  would delete: ${f}`);
    return;
  }

  for (const f of toCopy) {
    const dest = join(DOCS_DIR, f);
    mkdirSync(join(dest, '..'), { recursive: true });
    copyFileSync(join(OUT_DIR, f), dest);
  }
  const emptiedDirs = new Set();
  for (const f of stale) {
    const target = join(DOCS_DIR, f);
    rmSync(target);
    emptiedDirs.add(dirname(target));
  }
  pruneEmptyDirs(emptiedDirs);
  console.log(`\n[sync-docs] Copied ${toCopy.length} files into docs/.`);
  console.log(`[sync-docs] Deleted ${stale.length} stale build files from docs/.`);
}

main();
