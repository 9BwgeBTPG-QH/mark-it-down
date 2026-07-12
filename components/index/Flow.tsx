import { Budoux } from '@/components/Budoux';
import { BrokenLines } from '@/components/index/BrokenLines';
import { EntryIcon, EditIcon, ClearIcon, ExitIcon } from '@/components/index/icons';
import { indexSections, type Lang } from '@/content/index';

// Same four icons as the hero flow strip — the old page reuses the set.
const icons = [EntryIcon, EditIcon, ClearIcon, ExitIcon];

// Old docs/index.html Entry→Edit→Clear→Exit flow section, restored verbatim
// from eed65be (original-design rollback, 2026-07-12). The old markup reuses
// philosophy-list / philosophy-item with a flow-item modifier class.
export function Flow({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';

  return (
    <section className="flow-section" aria-labelledby="flow-heading">
      <span className="section-label">{copy.flowEyebrow}</span>
      <h2 id="flow-heading">{copy.flowHeading}</h2>
      <p className="flow-description">{ja ? <Budoux text={copy.flowIntro} /> : copy.flowIntro}</p>
      <ul className="philosophy-list" role="list">
        {copy.flowSteps.map((step, i) => {
          const Icon = icons[i];
          return (
            <li key={step.title} className="philosophy-item flow-item" role="listitem">
              <div className="flow-icon" aria-hidden="true">
                <Icon />
              </div>
              <h3>{step.title}</h3>
              <p>
                <BrokenLines lines={step.bodyLines} ja={ja} />
              </p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
