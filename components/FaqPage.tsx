import { Fragment } from 'react';
import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Budoux } from '@/components/Budoux';
import { Hero } from '@/components/faq/Hero';
import { QuestionBlocks } from '@/components/faq/QuestionBlocks';
import { Cta } from '@/components/faq/Cta';
import { faqJsonLd, faqCategories, faqContent, type Lang } from '@/content/faq';

// Shared skeleton for the EN/JA FAQ page pair, restored to the original
// docs/faq.html/-ja.html plain markup (#1593 Wave R2 fidelity requirement).
// Copy lives in content/faq.ts so app/(en)/faq/page.tsx and
// app/(ja)/faq-ja/page.tsx stay one-line wrappers. PageShell owns
// SiteNav/SiteFooter (see components/ClipperPage.tsx for the same pattern).
//
// The old markup wraps every category header (`.faq-category-header`) and
// every question's <details class="accordion-item"> together as flat
// document-order siblings inside a single `.changelog-accordion` div under
// one `<section aria-labelledby="faq-heading">` — not one <section> per
// category, and not an ArchivalAccordion. `<details>` is written natively
// per question here, matching components/index/FaqPreview.tsx's precedent.
export function FaqPage({ lang }: { lang: Lang }) {
  const categories = faqCategories[lang];
  const copy = faqContent[lang];
  const ja = lang === 'ja';

  return (
    <PageShell lang={lang} slug="faq">
      <JsonLd data={faqJsonLd[lang]} />
      <Hero lang={lang} />
      <section aria-labelledby="faq-heading">
        <h2 id="faq-heading" className="visually-hidden">
          {copy.sectionHeading}
        </h2>
        <div className="changelog-accordion">
          {categories.map((category) => (
            <Fragment key={category.heading}>
              <div className="faq-category-header">{ja ? <Budoux text={category.heading} /> : category.heading}</div>
              {category.items.map((item) => (
                <details key={item.question} className="accordion-item">
                  <summary className="accordion-header">
                    <div className="accordion-title">
                      <span className="accordion-icon"></span>
                      <span className="accordion-highlight">{ja ? <Budoux text={item.question} /> : item.question}</span>
                    </div>
                  </summary>
                  <div className="accordion-content">
                    <QuestionBlocks lang={lang} blocks={item.blocks} />
                  </div>
                </details>
              ))}
            </Fragment>
          ))}
        </div>
      </section>
      <Cta lang={lang} />
    </PageShell>
  );
}
