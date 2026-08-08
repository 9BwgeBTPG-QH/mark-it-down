#!/usr/bin/env node

// Guards the deploy path's one silent failure mode.
//
// sync-docs.mjs defaults to a dry-run and only writes with --apply, so the npm
// script that wraps it decides whether `npm run sync` deploys or merely prints
// a preview. It shipped without the flag: `npm run sync` built the export, said
// nothing was written, and exited 0 -- while CLAUDE.md named it as the way to
// regenerate docs/. Following the documentation produced an unchanged docs/,
// and the run looked successful, so the gap survived until a stale docs/ was
// noticed downstream. A 2026-05-25 session hit it, saw the build succeed, and
// re-ran `node scripts/sync-docs.mjs --apply` by hand.
//
// Nothing about that failure is observable from the outside: both modes exit 0
// and print a file list. These assertions are the detector. They are static on
// purpose -- a behavioural test would have to run the real sync against the
// real docs/ (sync-docs.mjs derives both directories from its own module URL
// and takes no overrides), which is not something an audit should do.

import { readFileSync } from 'node:fs';

const ROOT = new URL('..', import.meta.url);
const failures = [];

function check(condition, message) {
  if (!condition) failures.push(message);
}

const packageJson = JSON.parse(readFileSync(new URL('package.json', ROOT), 'utf8'));
const syncDocs = readFileSync(new URL('scripts/sync-docs.mjs', ROOT), 'utf8');

const sync = packageJson.scripts.sync;
const syncDry = packageJson.scripts['sync:dry'];

check(typeof sync === 'string', 'package.json has no "sync" script');
check(typeof syncDry === 'string', 'package.json has no "sync:dry" script');

// The deploying script must pass --apply. This is the assertion the original
// bug would have failed.
check(
  /sync-docs\.mjs\b[^&|]*--apply/.test(sync ?? ''),
  '"sync" runs sync-docs.mjs without --apply, so it previews instead of deploying'
);
// ...and the preview script must not, or `sync:dry` writes to docs/ behind a
// name that promises otherwise.
check(
  syncDry !== undefined && !syncDry.includes('--apply'),
  '"sync:dry" passes --apply, so the preview writes to docs/'
);
// Both must build *before* syncing: an out/ from an earlier run deploys the
// previous content, and it is the ordering that matters, not the presence of
// the two commands. Compare positions rather than matching a pattern -- a
// membership test passes on "sync-docs.mjs && npm run build", which builds
// after the deploy has already happened. Require && between them too, so a
// failed build stops the sync instead of ; letting it run anyway.
for (const [name, script] of [
  ['sync', sync],
  ['sync:dry', syncDry],
]) {
  const source = script ?? '';
  const buildAt = source.search(/\b(npm run build|next build)\b/);
  const syncAt = source.search(/\bsync-docs\.mjs\b/);
  check(buildAt >= 0, `"${name}" does not build, so it would deploy a stale out/`);
  check(syncAt >= 0, `"${name}" does not run sync-docs.mjs`);
  if (buildAt >= 0 && syncAt >= 0) {
    const ordered = buildAt < syncAt;
    check(ordered, `"${name}" builds after syncing, so it would deploy the previous build's out/`);
    // Only meaningful once the order is right; otherwise it restates the above.
    if (ordered) {
      check(
        source.slice(buildAt, syncAt).includes('&&'),
        `"${name}" does not chain build to sync with &&, so a failed build would still sync`
      );
    }
  }
}

// The flag only means anything if sync-docs.mjs keeps deriving its mode from
// it. If the default ever flips to writing, "sync:dry" silently deploys.
check(
  /const apply = process\.argv\.includes\('--apply'\)/.test(syncDocs),
  'sync-docs.mjs no longer derives apply mode from --apply'
);
check(
  /if \(!apply\)/.test(syncDocs) && /Dry-run only/.test(syncDocs),
  'sync-docs.mjs no longer short-circuits into a dry-run without --apply'
);

if (failures.length > 0) {
  console.log(`[deploy-scripts] FAIL — ${failures.length}`);
  for (const failure of failures) console.log(`- ${failure}`);
  process.exitCode = 1;
} else {
  console.log('[deploy-scripts] PASS');
  console.log(`- sync deploys: ${sync}`);
  console.log(`- sync:dry previews: ${syncDry}`);
  console.log('- sync-docs.mjs default remains dry-run: PASS');
}
