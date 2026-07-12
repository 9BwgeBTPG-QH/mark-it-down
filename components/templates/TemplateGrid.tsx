import { Budoux } from '@/components/Budoux';
import { templateCards } from '@/content/templates';
import type { Lang } from '@/content/index';
import { TemplateGridClient, type TemplateGridCardData } from '@/components/templates/TemplateGridClient';

// Absolute origin for the templates/ subtree, which lives only under docs/
// (raw *.md files + view.html/view-ja.html viewers) and is untouched by this
// migration (#1593 Phase 3-3) — see lib/seo.ts's SITE_URL for the same
// deployed-domain constant, duplicated here since this file has no reason to
// import lib/seo.ts otherwise.
const TEMPLATES_BASE = 'https://markitdown.reduktion.dev/templates';

// Server Component: prepares the 39-card catalog (docs/templates.html /
// docs/templates-ja.html) and hands it to the client-interactive half
// (TemplateGridClient — search/filter/tags/copy). Kept server-side
// specifically so Budoux (JA phrase-segmentation) runs at build time and its
// heavy `budoux`/`linkedom` dependency never enters the client bundle — an
// earlier version imported Budoux directly inside the 'use client' grid and
// that alone doubled the route's First Load JS (103 kB -> 212 kB), so the
// segmented title/description are precomputed here as ReactNode and passed
// down as plain props instead.
//
// No wrapping element here (original-design rollback, #1593 Wave R2 Batch
// 2): the old markup's search input / filter-tabs nav / tag-facets div /
// template-grid div sit directly inside <main>, with no enclosing <section>
// — TemplateGridClient's own top-level Fragment is returned as-is.
export function TemplateGrid({ lang }: { lang: Lang }) {
  const cards = templateCards[lang];
  const ja = lang === 'ja';

  const cardData: TemplateGridCardData[] = cards.map((card) => ({
    slug: card.slug,
    category: card.category,
    title: card.title,
    description: card.description,
    titleNode: ja ? <Budoux text={card.title} /> : card.title,
    descriptionNode: ja ? <Budoux text={card.description} /> : card.description,
    mdHref: ja ? `${TEMPLATES_BASE}/${card.slug}-ja.md` : `${TEMPLATES_BASE}/${card.slug}.md`,
    viewHref: ja
      ? `${TEMPLATES_BASE}/view-ja.html?t=${card.slug}`
      : `${TEMPLATES_BASE}/view.html?t=${card.slug}`,
  }));

  return <TemplateGridClient lang={lang} cards={cardData} />;
}
