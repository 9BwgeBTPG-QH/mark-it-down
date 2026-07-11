import { Budoux } from '@/components/Budoux';
import { ArchivalAccordion, type ArchivalAccordionItem } from '@/components/ArchivalAccordion';
import { navHref } from '@/content/shared';
import { indexSections, type Lang } from '@/content/index';

const focusRing =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

// Old docs/index.html FAQ-preview section, ported verbatim (#1593 Phase
// 3-1). The old page already used a per-item <details class="accordion-item">
// structure for this exact section, so ArchivalAccordion (the same CSS-only
// <details> pattern, DESIGN.md §6) is a direct structural fit — no new
// disclosure widget needed.
export function FaqPreview({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  const items: ArchivalAccordionItem[] = copy.faqItems.map((item, i) => ({
    id: `faq-${i}`,
    index: String(i + 1).padStart(2, '0'),
    title: ja ? <Budoux text={item.question} /> : item.question,
    content: ja ? <Budoux text={item.answer} /> : item.answer,
  }));

  return (
    <section className="border-t border-hairline bg-paper-shade">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <p className={`text-caption text-ink-muted ${captionFont}`}>{copy.faqEyebrow}</p>
        <h2 className={`mt-2 text-h2 text-ink ${headingFont}`}>
          {ja ? <Budoux text={copy.faqHeading} /> : copy.faqHeading}
        </h2>
        <ArchivalAccordion items={items} lang={lang} className="mt-8" />
        <p className={`mt-6 ${bodyFont}`}>
          <a
            href={navHref('faq', lang)}
            className={`text-seal underline-offset-4 transition-colors duration-instant ease-out hover:underline ${focusRing}`}
          >
            {copy.faqMoreLabel} →
          </a>
        </p>
      </div>
    </section>
  );
}
