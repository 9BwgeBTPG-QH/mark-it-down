import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/templates/Hero';
import { Guide } from '@/components/templates/Guide';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { Cta } from '@/components/templates/Cta';
import type { Lang } from '@/content/index';

// Shared skeleton for the EN/JA Templates page pair, restored verbatim from
// docs/templates.html / docs/templates-ja.html (original-design rollback,
// #1593 Wave R2 Batch 2). Copy lives in content/templates.ts so
// app/(en)/templates/page.tsx and app/(ja)/templates-ja/page.tsx stay
// one-line wrappers. Information order follows the old markup: hero ->
// "Make it your own" guide -> search input + category filter-tabs + tag
// facets + 39-card template grid (all as direct <main> children, no
// wrapping section — see components/templates/TemplateGrid.tsx) -> closing
// CTA. PageShell owns SiteNav/SiteFooter (see components/ClipperPage.tsx
// for the same pattern).
//
// No JsonLd here: doc/audit/seo-baseline-2026-07-11.json records no JSON-LD
// script tag for either docs/templates.html or docs/templates-ja.html.
//
// This is the only page in the migration with client-interactive JS: the
// old page's inline <script> (search input, category filter-tabs, tag
// facets, per-card clipboard copy) is restored as
// components/templates/TemplateGridClient.tsx, a 'use client' component
// scoped to just the grid — Hero/Guide/Cta and the BudouX segmentation stay
// server-side.
export function TemplatesPage({ lang }: { lang: Lang }) {
  return (
    <PageShell lang={lang} slug="templates">
      <Hero lang={lang} />
      <Guide lang={lang} />
      <TemplateGrid lang={lang} />
      <Cta lang={lang} />
    </PageShell>
  );
}
