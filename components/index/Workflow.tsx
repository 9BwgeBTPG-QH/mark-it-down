import { Budoux } from '@/components/Budoux';
import { indexSections, type Lang } from '@/content/index';

// Old docs/index.html "How it works in practice" section, restored verbatim
// from eed65be (original-design rollback, 2026-07-12). The M&I-era "Go
// deeper" explore-links block is dropped — it does not exist in the old page.
export function Workflow({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';

  return (
    <section className="workflow-section" aria-labelledby="workflow-heading">
      <span className="section-label">{copy.workflowEyebrow}</span>
      <h2 id="workflow-heading">{ja ? <Budoux text={copy.workflowHeading} /> : copy.workflowHeading}</h2>
      <ul className="workflow-list" role="list">
        {copy.workflowItems.map((item) => (
          <li key={item.title}>
            <strong>{ja ? <Budoux text={item.title} /> : item.title}</strong>
            <span>{ja ? <Budoux text={item.body} /> : item.body}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
