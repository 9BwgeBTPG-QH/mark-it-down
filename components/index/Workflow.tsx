import { Budoux } from '@/components/Budoux';
import { Card } from '@/components/Card';
import { navHref } from '@/content/shared';
import { indexSections, type Lang } from '@/content/index';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

// Old docs/index.html "How it works in practice" section, ported verbatim
// (#1593 Phase 3-1), plus a new "Go deeper" sub-block (not in the old page)
// linking to Web Clipper / RSS Reader / Features — the discoverability gap
// #1593 was opened for. Labels/body reuse phrasing already present in
// indexJsonLd's featureList entries rather than inventing new copy.
export function Workflow({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="border-t border-hairline bg-paper-shade">
      <div className="mx-auto max-w-section px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{copy.workflowEyebrow}</p>
        <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>
          {ja ? <Budoux text={copy.workflowHeading} /> : copy.workflowHeading}
        </h2>
        <ul className="mt-8 max-w-content divide-y divide-hairline border-y border-hairline">
          {copy.workflowItems.map((item) => (
            <li key={item.title} className="py-6">
              <h3 className={`text-h3 text-ink ${headingFont}`}>
                {ja ? <Budoux text={item.title} /> : item.title}
              </h3>
              <p className={`mt-1 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={item.body} /> : item.body}</p>
            </li>
          ))}
        </ul>

        <h3 className={`mt-12 text-h3 text-ink ${headingFont}`}>
          {ja ? <Budoux text={copy.exploreHeading} /> : copy.exploreHeading}
        </h3>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {copy.exploreLinks.map((link) => (
            <Card key={link.slug} variant="outline">
              <h4 className={`text-h3 text-ink ${headingFont}`}>{link.label}</h4>
              <p className={`mt-2 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={link.body} /> : link.body}</p>
              <a
                href={navHref(link.slug, lang)}
                className={`mt-4 inline-block text-seal underline-offset-4 transition-colors duration-instant ease-out hover:underline ${bodyFont} ${focusRing}`}
              >
                {link.linkLabel} →
              </a>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
