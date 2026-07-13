import { Budoux } from '@/components/Budoux';
import { BrokenLines } from '@/components/index/BrokenLines';
import { PhilosophyCaptureIcon, PhilosophyDigestIcon, PhilosophyIntentIcon } from '@/components/index/icons';
import { indexSections, type Lang } from '@/content/index';

// One icon per philosophy-item, in old page order (eed65be docs/index.html).
const icons = [PhilosophyCaptureIcon, PhilosophyDigestIcon, PhilosophyIntentIcon];

// Old docs/index.html "Philosophy" section, restored verbatim from eed65be
// (original-design rollback, 2026-07-12): section-label eyebrow, visually
// hidden h2, three philosophy-item cards with stroke icons. philosophyLede
// reuses Flow.tsx's .flow-description pattern (landing refinement R4).
export function Philosophy({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby="philosophy-heading">
      <span className="section-label">{copy.philosophyEyebrow}</span>
      <h2 id="philosophy-heading" className="visually-hidden">
        {copy.philosophyHeading}
      </h2>
      <p className="flow-description">
        <BrokenLines lines={copy.philosophyLedeLines} ja={ja} />
      </p>
      <ul className="philosophy-list" role="list">
        {copy.philosophyItems.map((item, i) => {
          const Icon = icons[i];
          return (
            <li key={item.title} className="philosophy-item" role="listitem">
              <div className="philosophy-icon" aria-hidden="true">
                <Icon />
              </div>
              <h3>{ja ? <Budoux text={item.title} /> : item.title}</h3>
              <p>
                <BrokenLines lines={item.bodyLines} ja={ja} />
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
