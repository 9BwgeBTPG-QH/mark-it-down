import { Budoux } from '@/components/Budoux';
import { indexSections, type Lang } from '@/content/index';

// Old docs/index.html Entry→Edit→Clear→Exit flow section, ported verbatim
// (#1593 Phase 3-1). Numbered hairline-divided list echoes the Quartz
// archival-index treatment DESIGN.md §6 already applies to the accordion
// (components/ArchivalAccordion.tsx), reused here for a non-collapsible,
// strictly sequential list.
export function Flow({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{copy.flowEyebrow}</p>
        <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>
          {ja ? <Budoux text={copy.flowHeading} /> : copy.flowHeading}
        </h2>
        <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.flowIntro} /> : copy.flowIntro}</p>
        <ol className="mt-8 divide-y divide-hairline border-y border-hairline">
          {copy.flowSteps.map((step, i) => (
            <li key={step.title} className="flex gap-6 py-6">
              <span className={`text-h3 text-ink-muted ${headingFont}`}>{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className={`text-h3 text-ink ${headingFont}`}>{step.title}</h3>
                <p className={`mt-1 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={step.body} /> : step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
