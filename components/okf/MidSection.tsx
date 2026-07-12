import { Budoux } from '@/components/Budoux';
import { OkfInline } from '@/components/okf/InlineText';
import type { Lang } from '@/content/index';
import type { OkfMidSectionItem } from '@/content/okf';

interface MidSectionProps {
  lang: Lang;
  eyebrow: string;
  heading: string;
  items: OkfMidSectionItem[];
}

// "Mark It Down x OKF" 8-item list (docs/okf.html "philosophy" section #2),
// restored verbatim as a `.philosophy` section wrapping a plain
// `<ul class="coming-soon-list coming-soon-list--spaced">` (original-design
// rollback, #1593 Wave R2). Replaces components/clipper/FeatureSection.tsx,
// whose hairline-divided card layout does not match this old markup — each
// old item is a single `<li><strong>Title</strong> — body</li>` line, not a
// card.
export function MidSection({ lang, eyebrow, heading, items }: MidSectionProps) {
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby="mid-okf-heading">
      <span className="section-label">{eyebrow}</span>
      <h2 id="mid-okf-heading">{ja ? <Budoux text={heading} /> : heading}</h2>
      <ul className="coming-soon-list coming-soon-list--spaced" role="list">
        {items.map((item) => (
          <li key={item.title}>
            <strong>{ja ? <Budoux text={item.title} /> : item.title}</strong>
            {' — '}
            <OkfInline runs={item.body} ja={ja} />
          </li>
        ))}
      </ul>
    </section>
  );
}
