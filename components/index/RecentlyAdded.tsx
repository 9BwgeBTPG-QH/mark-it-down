import { Budoux } from '@/components/Budoux';
import { indexSections, type Lang } from '@/content/index';

// Old docs/index.html "Coming Soon" / recently-added section, restored
// verbatim from eed65be (original-design rollback, 2026-07-12). The file
// keeps its RecentlyAdded name; the old class names are coming-soon-*.
export function RecentlyAdded({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';

  return (
    <section className="coming-soon-section" aria-labelledby="coming-soon-heading">
      <span className="section-label">{copy.recentEyebrow}</span>
      <h2 id="coming-soon-heading">{ja ? <Budoux text={copy.recentHeading} /> : copy.recentHeading}</h2>
      <p className="coming-soon-status">{ja ? <Budoux text={copy.recentStatus} /> : copy.recentStatus}</p>
      <ul className="coming-soon-list" role="list">
        {copy.recentItems.map((item) => (
          <li key={item.title}>
            <strong>{ja ? <Budoux text={item.title} /> : item.title}</strong>
            <span>{ja ? <Budoux text={item.body} /> : item.body}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
