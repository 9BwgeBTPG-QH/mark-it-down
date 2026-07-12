import { Budoux } from '@/components/Budoux';
import type { RssListItem, Lang } from '@/content/rss';

interface PhilosophySectionProps {
  lang: Lang;
  headingId: string;
  eyebrow: string;
  heading: string;
  intro: string;
  items: RssListItem[];
}

// Old docs/rss.html "Workspace" and "Subscriptions" sections, restored
// verbatim to eed65be original design (Wave R2 T1, #1593), same structure as
// components/clipper/PhilosophySection.tsx: .philosophy -> section-label
// eyebrow -> h2 -> .why-narrative paragraph -> .coming-soon-list (spaced
// variant), each list item rendered as "<strong>title</strong> — body" plain
// text exactly as the old markup (no <span> wrapper around body, unlike the
// index page's coming-soon-list in components/index/RecentlyAdded.tsx). Both
// old sections share this exact structure, so one component renders both
// call sites in components/RssPage.tsx. Not shared with the clipper page's
// PhilosophySection — this codebase's established per-page-family
// duplication convention (see components/RssPage.tsx's Hero/Cta comment).
// Replaces the Tailwind M&I-token FeatureSection
// (components/clipper/FeatureSection.tsx) for this page only — that file
// stays in place (still used elsewhere, edits forbidden per task scope) and
// is intentionally no longer imported here.
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
