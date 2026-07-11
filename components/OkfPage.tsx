import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/okf/Hero';
import { Narrative } from '@/components/okf/Narrative';
import { FeatureSection } from '@/components/clipper/FeatureSection';
import { Cta } from '@/components/okf/Cta';
import { okfJsonLd, okfWhatIsOkf, okfMidSection, okfWhyFits, type Lang } from '@/content/okf';

// Shared skeleton for the EN/JA OKF page pair (#1593 Phase 3-3). Copy lives
// in content/okf.ts so app/(en)/okf/page.tsx and app/(ja)/okf-ja/page.tsx
// stay one-line wrappers. Information order follows docs/okf.html /
// docs/okf-ja.html: hero -> "What is OKF" -> "Mark It Down x OKF" (8-item
// list) -> "Why it fits" -> closing CTA. The old page has no screenshot/
// image section, so none is added here. PageShell owns SiteNav/SiteFooter
// (see components/RssPage.tsx for the same pattern on the RSS page).
//
// Backgrounds alternate paper/paper-shade/paper across the three body
// sections, matching components/RssPage.tsx's own alternation for its two
// FeatureSection blocks; Cta hardcodes bg-paper internally like
// components/rss/Cta.tsx.
//
// FeatureSection (components/clipper/FeatureSection.tsx) is reused as-is for
// the 8-item "Mark It Down x OKF" list — its props are content-agnostic and
// content/okf.ts's okfMidSection items use the same FeatureSectionItem shape
// as Clipper/RSS. Narrative (components/okf/Narrative.tsx) is a new
// component: neither "What is OKF" nor "Why it fits" is an item list in the
// old page, just heading + paragraphs (the first also closing with a
// two-link sentence), so FeatureSection's <ul> layout does not fit either.
export function OkfPage({ lang }: { lang: Lang }) {
  const whatIsOkf = okfWhatIsOkf[lang];
  const midSection = okfMidSection[lang];
  const whyFits = okfWhyFits[lang];

  return (
    <PageShell lang={lang} slug="okf">
      <JsonLd data={okfJsonLd[lang]} />
      <Hero lang={lang} />
      <Narrative
        lang={lang}
        eyebrow={whatIsOkf.eyebrow}
        heading={whatIsOkf.heading}
        paragraphs={whatIsOkf.paragraphs}
        links={whatIsOkf.links}
        bg="paper"
      />
      <FeatureSection
        lang={lang}
        eyebrow={midSection.eyebrow}
        heading={midSection.heading}
        items={midSection.items}
        bg="paper-shade"
      />
      <Narrative
        lang={lang}
        eyebrow={whyFits.eyebrow}
        heading={whyFits.heading}
        paragraphs={whyFits.paragraphs}
        bg="paper"
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
