import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/templates/Hero';
import { Guide } from '@/components/templates/Guide';
import { TemplateGrid } from '@/components/templates/TemplateGrid';
import { Cta } from '@/components/templates/Cta';
import type { Lang } from '@/content/index';

// Shared skeleton for the EN/JA Templates page pair (#1593 Phase 3-3). Copy
// lives in content/templates.ts so app/(en)/templates/page.tsx and
// app/(ja)/templates-ja/page.tsx stay one-line wrappers. Information order
// follows docs/templates.html / docs/templates-ja.html: hero -> "Make it
// your own" guide -> 39-card template grid -> closing CTA. PageShell owns
// SiteNav/SiteFooter (see components/ClipperPage.tsx for the same pattern).
//
// No JsonLd here: doc/audit/seo-baseline-2026-07-11.json records no JSON-LD
// script tag for either docs/templates.html or docs/templates-ja.html.
//
// The old page's <input type="search"> + filter-tabs (with per-category
// counts) + tag-facets are client-JS-driven controls with no static-content
// equivalent to port; this static export site adds no new client JS beyond
// native <details>/<summary>, so they're dropped rather than reimplemented
// (see components/templates/TemplateGrid.tsx's own note on this).
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
