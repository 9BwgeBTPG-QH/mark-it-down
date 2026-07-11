import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import type { Lang } from '@/content/index';

// Defined locally rather than imported from content/clipper.ts's
// ClipperListItem so this component stays decoupled from any one content
// module — Clipper/RSS/Features all pass their own item arrays, and none of
// their content files need to change shape for the others' sake. `link` is
// optional: restored per #1593 Phase 3-3 review for the Features page's Web
// Clipper "Learn More", RSS Reader "Learn More", and Storage "OKF Export"
// items, each of which had an in-body <a> to another page in
// docs/features{,-ja}.html. Callers without a link (Clipper/RSS pages, most
// Features items) simply omit the field. Exported so
// components/features/FeatureCategoryAccordion.tsx (added in the #1593
// Phase 3-3 structural review that collapsed the Features page's 11
// categories behind <details>) can share the same item shape without
// duplicating it.
export interface FeatureSectionItem {
  title: string;
  body: string;
  link?: { label: string; slug: string };
}

interface FeatureSectionProps {
  lang: Lang;
  eyebrow: string;
  heading: string;
  intro?: string;
  items: FeatureSectionItem[];
  bg: 'paper' | 'paper-shade';
}

// Item-list rendering shared by FeatureSection (Clipper/RSS pages, always
// rendered flat/expanded) and FeatureCategoryAccordion (Features page,
// rendered inside a collapsed <details> body). Extracted per the #1593
// Phase 3-3 structural review so both callers stay pixel-identical for the
// item rows without copy-pasting this block.
export function FeatureItemsList({
  lang,
  items,
  className = 'mt-8',
}: {
  lang: Lang;
  items: FeatureSectionItem[];
  className?: string;
}) {
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <ul className={`divide-y divide-hairline border-y border-hairline ${className}`}>
      {items.map((item) => (
        <li key={item.title} className="py-6">
          <h3 className={`text-h3 text-ink ${headingFont}`}>{ja ? <Budoux text={item.title} /> : item.title}</h3>
          <p className={`mt-1 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={item.body} /> : item.body}</p>
          {item.link ? (
            <p className="mt-2">
              <a
                href={navHref(item.link.slug, lang)}
                className={`text-seal underline decoration-seal/40 underline-offset-2 transition-colors duration-instant ease-out hover:decoration-seal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal ${bodyFont}`}
              >
                {ja ? <Budoux text={item.link.label} /> : item.link.label}
              </a>
            </p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

// Shared layout for the Flow and Fidelity sections (old docs/clipper.html
// <section class="philosophy">, reused for both). Content ported verbatim;
// the old page's plain <ul><li><strong>...</strong> — desc</li></ul> list is
// rendered here as a hairline-divided title+body list (components/index/
// Workflow.tsx's pattern) rather than a Card grid, matching the old page's
// intent of a simple sequential list rather than a comparison grid.
//
// `intro` is optional. This component is no longer used by the Features page
// (its 11 categories moved to components/features/FeatureCategoryAccordion.tsx
// per the #1593 Phase 3-3 structural review — the old docs/features.html kept
// each category collapsed behind an accordion, which the earlier flat port
// had lost); FeatureSection now serves only Clipper/RSS, neither of which
// used a collapsed layout in the old site.
export function FeatureSection({ lang, eyebrow, heading, intro, items, bg }: FeatureSectionProps) {
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';
  const bgClass = bg === 'paper' ? 'bg-paper' : 'bg-paper-shade';

  return (
    <section className={`border-t border-hairline ${bgClass}`}>
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{eyebrow}</p>
        <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={heading} /> : heading}</h2>
        {intro ? (
          <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={intro} /> : intro}</p>
        ) : null}
        <FeatureItemsList lang={lang} items={items} />
      </div>
    </section>
  );
}
