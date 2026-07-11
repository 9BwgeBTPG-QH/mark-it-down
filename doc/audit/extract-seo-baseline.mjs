#!/usr/bin/env node
// SEO surface snapshot extractor for Mark It Down website (docs/ GitHub Pages source).
//
// Usage:
//   node extract-seo-baseline.mjs [--docs-dir <dir>] [--out <file>] [--exclude <name.html>,...]
//
// Defaults: --docs-dir ../../docs (relative to this script), --out ./seo-baseline-<today>.json,
// --exclude slides-en.html,slides-ja.html
//
// Designed to be re-run against a future build to diff SEO surface drift (title/meta/canonical/
// hreflang/OGP/JSON-LD/h1) without hand-inspecting each HTML file.

import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function parseArgs(argv) {
  const args = { docsDir: join(__dirname, '..', '..', 'docs'), out: null, exclude: ['slides-en.html', 'slides-ja.html'] };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--docs-dir') args.docsDir = argv[++i];
    else if (argv[i] === '--out') args.out = argv[++i];
    else if (argv[i] === '--exclude') args.exclude = argv[++i].split(',').map((s) => s.trim()).filter(Boolean);
  }
  if (!args.out) {
    const today = new Date().toISOString().slice(0, 10);
    args.out = join(__dirname, `seo-baseline-${today}.json`);
  }
  return args;
}

function matchOne(re, html) {
  const m = re.exec(html);
  return m ? m[1].trim() : null;
}

function decodeEntities(s) {
  if (!s) return s;
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

function extractMetaContent(html, attrName, attrValue) {
  // Matches <meta name="X" content="Y"> or <meta content="Y" name="X"> in either attribute order,
  // with either quote style.
  const patterns = [
    new RegExp(`<meta[^>]*\\b${attrName}=["']${attrValue}["'][^>]*\\bcontent=["']([^"']*)["']`, 'i'),
    new RegExp(`<meta[^>]*\\bcontent=["']([^"']*)["'][^>]*\\b${attrName}=["']${attrValue}["']`, 'i'),
  ];
  for (const re of patterns) {
    const m = re.exec(html);
    if (m) return decodeEntities(m[1].trim());
  }
  return null;
}

function extractAllHreflang(html) {
  const results = [];
  const re = /<link[^>]*rel=["']alternate["'][^>]*>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    const tag = m[0];
    const hreflang = matchOne(/hreflang=["']([^"']*)["']/i, tag);
    const href = matchOne(/href=["']([^"']*)["']/i, tag);
    if (hreflang || href) results.push({ hreflang, href });
  }
  return results;
}

function extractJsonLd(html) {
  const results = [];
  const re = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let m;
  while ((m = re.exec(html)) !== null) {
    try {
      const parsed = JSON.parse(m[1].trim());
      const items = Array.isArray(parsed) ? parsed : [parsed];
      for (const item of items) {
        results.push({
          '@type': item['@type'] ?? null,
          softwareVersion: item.softwareVersion ?? null,
        });
      }
    } catch {
      results.push({ '@type': 'PARSE_ERROR', softwareVersion: null });
    }
  }
  return results;
}

function extractPage(filePath) {
  const html = readFileSync(filePath, 'utf8');
  const title = decodeEntities(matchOne(/<title[^>]*>([\s\S]*?)<\/title>/i, html));
  const metaDescription = extractMetaContent(html, 'name', 'description');
  const metaRobots = extractMetaContent(html, 'name', 'robots');
  const canonical = (() => {
    const m = /<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i.exec(html)
      || /<link[^>]*href=["']([^"']*)["'][^>]*rel=["']canonical["'][^>]*>/i.exec(html);
    return m ? m[1].trim() : null;
  })();
  const hreflang = extractAllHreflang(html);
  const ogTitle = extractMetaContent(html, 'property', 'og:title');
  const ogDescription = extractMetaContent(html, 'property', 'og:description');
  const ogImage = extractMetaContent(html, 'property', 'og:image');
  // Strip nested tags inside h1 for a cleaner text snapshot.
  const h1Match = /<h1[^>]*>([\s\S]*?)<\/h1>/i.exec(html);
  const h1Text = h1Match ? decodeEntities(h1Match[1].replace(/<[^>]+>/g, '').trim()) : null;
  const jsonLd = extractJsonLd(html);

  return {
    file: basename(filePath),
    title,
    metaDescription,
    metaRobots,
    canonical,
    hreflang,
    ogTitle,
    ogDescription,
    ogImage,
    firstH1: h1Text,
    jsonLd,
  };
}

function extractSitemap(docsDir) {
  const sitemapPath = join(docsDir, 'sitemap.xml');
  let xml;
  try {
    xml = readFileSync(sitemapPath, 'utf8');
  } catch {
    return null;
  }
  const urls = [];
  const urlBlockRe = /<url>([\s\S]*?)<\/url>/g;
  let m;
  while ((m = urlBlockRe.exec(xml)) !== null) {
    const block = m[1];
    const loc = matchOne(/<loc>([\s\S]*?)<\/loc>/i, block);
    const lastmod = matchOne(/<lastmod>([\s\S]*?)<\/lastmod>/i, block);
    urls.push({ loc, lastmod });
  }
  return urls;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const files = readdirSync(args.docsDir)
    .filter((f) => f.endsWith('.html'))
    .filter((f) => !args.exclude.includes(f))
    .sort();

  const pages = files.map((f) => extractPage(join(args.docsDir, f)));
  const sitemap = extractSitemap(args.docsDir);

  const output = {
    generatedAt: new Date().toISOString(),
    docsDir: args.docsDir,
    excluded: args.exclude,
    pageCount: pages.length,
    pages,
    sitemap,
  };

  writeFileSync(args.out, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${pages.length} pages + sitemap (${sitemap ? sitemap.length : 0} urls) to ${args.out}`);
}

main();
