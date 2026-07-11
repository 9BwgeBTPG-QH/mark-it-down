import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Budoux } from '@/components/Budoux';
import { ArchivalAccordion, type ArchivalAccordionItem } from '@/components/ArchivalAccordion';
import { Hero } from '@/components/faq/Hero';
import { QuestionBlocks } from '@/components/faq/QuestionBlocks';
import { Cta } from '@/components/faq/Cta';
import { faqJsonLd, faqCategories, type Lang } from '@/content/faq';

// Shared skeleton for the EN/JA FAQ page pair (#1593 Phase 3-4). Copy lives
// in content/faq.ts so app/(en)/faq/page.tsx and app/(ja)/faq-ja/page.tsx
// stay one-line wrappers. Information order follows docs/faq.html /
// docs/faq-ja.html: hero -> 9 category groups (25 questions total) -> closing
// CTA. PageShell owns SiteNav/SiteFooter (see components/ClipperPage.tsx for
// the same pattern).
//
// Each category header (`.faq-category-header` in the old markup) is a
// plain, always-visible div — never its own <details> — unlike the Features
// page's collapsed category accordions (components/features/
// FeatureCategoryAccordion.tsx). So each category here renders as a real
// always-visible <h2> followed by an ArchivalAccordion of that category's
// questions, matching the old two-level information structure (visible
// category, collapsible question) rather than nesting a third disclosure
// level.
export function FaqPage({ lang }: { lang: Lang }) {
  const categories = faqCategories[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';

  return (
    <PageShell lang={lang} slug="faq">
      <JsonLd data={faqJsonLd[lang]} />
      <Hero lang={lang} />
      {categories.map((category, ci) => {
        const items: ArchivalAccordionItem[] = category.items.map((item, ii) => ({
          id: `faq-${ci}-${ii}`,
          title: ja ? <Budoux text={item.question} /> : item.question,
          content: <QuestionBlocks lang={lang} blocks={item.blocks} />,
        }));
        const bgClass = ci % 2 === 0 ? 'bg-paper' : 'bg-paper-shade';

        return (
          <section key={category.heading} className={`border-t border-hairline ${bgClass}`}>
            <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
              <h2 className={`text-h2 text-ink ${headingFont}`}>
                {ja ? <Budoux text={category.heading} /> : category.heading}
              </h2>
              <ArchivalAccordion items={items} lang={lang} className="mt-6" />
            </div>
          </section>
        );
      })}
      <Cta lang={lang} />
    </PageShell>
  );
}
