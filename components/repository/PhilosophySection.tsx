import { Budoux } from '@/components/Budoux';
import type { RepositoryListItem, Lang } from '@/content/repository';

interface PhilosophySectionProps {
  lang: Lang;
  headingId: string;
  eyebrow: string;
  heading: string;
  intro: string;
  items: RepositoryListItem[];
}

// Same structure as components/rss/PhilosophySection.tsx: .philosophy ->
// section-label eyebrow -> h2 -> .why-narrative paragraph -> spaced
// .coming-soon-list, each item rendered as "<strong>title</strong> — body".
// Duplicated rather than shared with the rss/clipper copies, following this
// codebase's per-page-family duplication convention (see the comment in
// components/RssPage.tsx). One component renders all three call sites in
// components/RepositoryPage.tsx.
export function PhilosophySection({ lang, headingId, eyebrow, heading, intro, items }: PhilosophySectionProps) {
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby={headingId}>
      <span className="section-label">{eyebrow}</span>
      <h2 id={headingId}>{ja ? <Budoux text={heading} /> : heading}</h2>
      <div className="why-narrative">
        <p>{ja ? <Budoux text={intro} /> : intro}</p>
      </div>
      <ul className="coming-soon-list coming-soon-list--spaced" role="list">
        {items.map((item) => (
          <li key={item.title}>
            <strong>{ja ? <Budoux text={item.title} /> : item.title}</strong> —{' '}
            {ja ? <Budoux text={item.body} /> : item.body}
          </li>
        ))}
      </ul>
    </section>
  );
}
