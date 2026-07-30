#!/usr/bin/env node

import { readdir, readFile, writeFile } from 'node:fs/promises';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = fileURLToPath(new URL('../out', import.meta.url));
const BOOTSTRAP = /<script id="mid-theme-bootstrap">[\s\S]*?<\/script>/;
const STYLESHEET = /<link[^>]+rel="stylesheet"[^>]*>/;

async function htmlFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const nested = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? htmlFiles(path) : extname(entry.name) === '.html' ? [path] : [];
    })
  );
  return nested.flat();
}

const files = await htmlFiles(ROOT);
let finalized = 0;

for (const path of files) {
  const source = await readFile(path, 'utf8');
  const bootstrap = source.match(BOOTSTRAP)?.[0];
  const stylesheet = source.match(STYLESHEET)?.[0];

  if (!bootstrap && !stylesheet) {
    continue;
  }

  if (!bootstrap || !stylesheet) {
    throw new Error(`Missing bootstrap or stylesheet in ${path}`);
  }

  const withoutBootstrap = source.replace(BOOTSTRAP, '');
  const output = withoutBootstrap.replace(stylesheet, `${bootstrap}${stylesheet}`);

  if (output.indexOf('id="mid-theme-bootstrap"') > output.indexOf('rel="stylesheet"')) {
    throw new Error(`Theme bootstrap still follows CSS in ${path}`);
  }

  await writeFile(path, output);
  finalized += 1;
}

console.log(`[finalize-static-export] Theme bootstrap precedes CSS in ${finalized} HTML files.`);
