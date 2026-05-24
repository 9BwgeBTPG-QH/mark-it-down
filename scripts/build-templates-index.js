'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const TEMPLATES_DIR = path.join(ROOT, 'docs', 'templates');
const TAXONOMY_PATH = path.join(TEMPLATES_DIR, 'taxonomy.json');
const OUTPUT_PATH = path.join(TEMPLATES_DIR, 'index.json');
const PARSER_PATH = path.join(ROOT, 'docs', 'assets', 'template-frontmatter.js');

// Load isomorphic parser
const { parseFrontmatter } = require(PARSER_PATH);

const CATEGORIES = ['ai', 'content', 'dev', 'journaling', 'productivity', 'thinking'];

// ─── Self-test mode ──────────────────────────────────────────────────────────
function runSelfTest() {
  let passed = 0;
  let failed = 0;

  function assert(label, condition) {
    if (condition) {
      console.log('  PASS ' + label);
      passed++;
    } else {
      console.error('  FAIL ' + label);
      failed++;
    }
  }

  function eq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

  // Flat key: value
  var r1 = parseFrontmatter('---\ntitle: Hello World\n---\nbody');
  assert('flat string', eq(r1.data, { title: 'Hello World' }) && r1.body === 'body');

  // Number coercion
  var r2 = parseFrontmatter('---\ntime: 15\n---\n');
  assert('number coercion', r2.data.time === 15);

  // Flat array
  var r3 = parseFrontmatter('---\ntags: [a, b, c]\n---\n');
  assert('flat array', eq(r3.data.tags, ['a', 'b', 'c']));

  // Empty array
  var r4 = parseFrontmatter('---\ntags: []\n---\n');
  assert('empty array', eq(r4.data.tags, []));

  // Quoted value
  var r5 = parseFrontmatter('---\nsummary: "Hello: World"\n---\n');
  assert('quoted value with colon', r5.data.summary === 'Hello: World');

  // Single-quoted value
  var r6 = parseFrontmatter('---\nsummary: \'test value\'\n---\n');
  assert('single-quoted value', r6.data.summary === 'test value');

  // No frontmatter
  var r7 = parseFrontmatter('# Title\nbody text');
  assert('no frontmatter', eq(r7.data, {}) && r7.body === '# Title\nbody text');

  // Empty frontmatter
  var r8 = parseFrontmatter('---\n---\nbody');
  assert('empty frontmatter block', eq(r8.data, {}) && r8.body === 'body');

  // Multi-field
  var r9 = parseFrontmatter('---\ntitle: ADR\ncategory: dev\ntags: [architecture, decision]\ntime: 5\n---\nbody content');
  assert('multi-field', eq(r9.data, { title: 'ADR', category: 'dev', tags: ['architecture', 'decision'], time: 5 }) && r9.body === 'body content');

  // Quoted array elements
  var r10 = parseFrontmatter("---\ntags: [\"foo\", 'bar']\n---\n");
  assert('quoted array elements', eq(r10.data.tags, ['foo', 'bar']));

  console.log('\n' + passed + ' passed, ' + failed + ' failed');
  process.exit(failed > 0 ? 1 : 0);
}

if (process.argv.includes('--check')) {
  console.log('Running parser self-test...');
  runSelfTest();
  process.exit(0);
}

// ─── Build ────────────────────────────────────────────────────────────────────
const taxonomy = JSON.parse(fs.readFileSync(TAXONOMY_PATH, 'utf8'));
const errors = [];
const templates = [];

for (const cat of CATEGORIES) {
  const catDir = path.join(TEMPLATES_DIR, cat);
  if (!fs.existsSync(catDir)) { errors.push(`Category directory missing: ${cat}`); continue; }

  const enFiles = fs.readdirSync(catDir)
    .filter(f => f.endsWith('.md') && !f.endsWith('-ja.md') && f !== 'CLAUDE.md')
    .sort();

  for (const enFile of enFiles) {
    const slug = enFile.replace('.md', '');
    const fullSlug = `${cat}/${slug}`;
    const enPath = path.join(catDir, enFile);
    const jaPath = path.join(catDir, `${slug}-ja.md`);

    // Parse EN
    const enText = fs.readFileSync(enPath, 'utf8');
    const enParsed = parseFrontmatter(enText);
    if (Object.keys(enParsed.data).length === 0) {
      errors.push(`${fullSlug}: missing frontmatter in EN file`);
      continue;
    }

    // Parse JA
    let jaTitle = null, jaSummary = null;
    if (fs.existsSync(jaPath)) {
      const jaText = fs.readFileSync(jaPath, 'utf8');
      const jaParsed = parseFrontmatter(jaText);
      if (Object.keys(jaParsed.data).length === 0) {
        errors.push(`${fullSlug}: missing frontmatter in JA file`);
      } else {
        jaTitle = jaParsed.data.title || null;
        jaSummary = jaParsed.data.summary || null;
      }
    } else {
      errors.push(`${fullSlug}: missing JA file (${slug}-ja.md)`);
    }

    // Validate slug fields against taxonomy
    const d = enParsed.data;
    if (!taxonomy.categories[d.category]) {
      errors.push(`${fullSlug}: unknown category slug "${d.category}"`);
    }
    for (const tag of (d.tags || [])) {
      if (!taxonomy.tags[tag]) errors.push(`${fullSlug}: unknown tag slug "${tag}"`);
    }
    for (const uc of (d['use-case'] || [])) {
      if (!taxonomy.useCases[uc]) errors.push(`${fullSlug}: unknown use-case slug "${uc}"`);
    }

    templates.push({
      slug: fullSlug,
      category: d.category || cat,
      tags: d.tags || [],
      useCases: d['use-case'] || [],
      time: typeof d.time === 'number' ? d.time : null,
      title: { en: d.title || slug, ja: jaTitle || d.title || slug },
      summary: { en: d.summary || '', ja: jaSummary || d.summary || '' }
    });
  }
}

if (errors.length > 0) {
  console.error('Build errors:');
  errors.forEach(e => console.error('  ' + e));
  process.exit(1);
}

const output = {
  generatedAt: new Date().toISOString(),
  templates,
  taxonomy
};

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(output, null, 2) + '\n', 'utf8');
console.log(`Generated ${OUTPUT_PATH} with ${templates.length} templates.`);
