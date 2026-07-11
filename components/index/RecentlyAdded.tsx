import { Budoux } from '@/components/Budoux';
import { indexSections, type Lang } from '@/content/index';

// Old docs/index.html "Coming Soon" / recently-added section, ported
// verbatim including the version status line (#1593 Phase 3-1).
export function RecentlyAdded({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{copy.recentEyebrow}</p>
        <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>
          {ja ? <Budoux text={copy.recentHeading} /> : copy.recentHeading}
        </h2>
        <p className={`mt-4 text-caption text-ink-muted ${captionFont}`}>
          {ja ? <Budoux text={copy.recentStatus} /> : copy.recentStatus}
        </p>
        <ul className="mt-8 divide-y divide-hairline border-y border-hairline">
          {copy.recentItems.map((item) => (
            <li key={item.title} className="py-6">
              <h3 className={`text-h3 text-ink ${headingFont}`}>
                {ja ? <Budoux text={item.title} /> : item.title}
              </h3>
              <p className={`mt-1 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={item.body} /> : item.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
