import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import { indexSections, type Lang } from '@/content/index';

// Old docs/index.html FAQ-preview section, restored verbatim from eed65be
// (original-design rollback, 2026-07-12). The old accordion structure
// (changelog-accordion > details.accordion-item with an empty accordion-icon
// span drawn by CSS) does not match ArchivalAccordion's markup, so it is
// written out directly; disclosure stays native <details>, no JS. Answers
// bold only their leading sentence; the EN markup separates lead and rest
// with a space, the JA markup with a (stripped) ZWSP only.
export function FaqPreview({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';

  return (
    <section className="faq-preview-section" aria-labelledby="faq-preview-heading">
      <span className="section-label">{copy.faqEyebrow}</span>
      <h2 id="faq-preview-heading">{ja ? <Budoux text={copy.faqHeading} /> : copy.faqHeading}</h2>
      <div className="changelog-accordion">
        {copy.faqItems.map((item) => (
          <details key={item.question} className="accordion-item">
            <summary className="accordion-header">
              <div className="accordion-title">
                <span className="accordion-icon"></span>
                <span className="accordion-highlight">
                  {ja ? <Budoux text={item.question} /> : item.question}
                </span>
              </div>
            </summary>
            <div className="accordion-content">
              <p>
                <strong>{ja ? <Budoux text={item.answerLead} /> : item.answerLead}</strong>
                {!ja && ' '}
                {ja ? <Budoux text={item.answerRest} /> : item.answerRest}
              </p>
            </div>
          </details>
        ))}
      </div>
      <p className="faq-more-link">
        <a href={navHref('faq', lang)}>{ja ? <Budoux text={copy.faqMoreLabel} /> : copy.faqMoreLabel} →</a>
      </p>
    </section>
  );
}
