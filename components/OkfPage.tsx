import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/okf/Hero';
import { Narrative } from '@/components/okf/Narrative';
import { MidSection } from '@/components/okf/MidSection';
import { Cta } from '@/components/okf/Cta';
import { okfJsonLd, okfWhatIsOkf, okfMidSection, okfWhyFits, type Lang } from '@/content/okf';

// Shared skeleton for the EN/JA OKF page pair, restored verbatim from
// docs/okf.html / docs/okf-ja.html (original-design rollback, #1593 Wave
// R2): `.hero` -> "What is OKF" `.philosophy` -> "Mark It Down x OKF"
// `.philosophy` (8-item list) -> "Why it fits" `.philosophy` -> closing
// `.cta-section`. PageShell owns SiteNav/SiteFooter.
//
// MidSection (components/okf/MidSection.tsx) replaces
// components/clipper/FeatureSection.tsx here: the old markup's 8-item list
// is a plain `<ul class="coming-soon-list coming-soon-list--spaced">`, not
// FeatureSection's hairline-divided card layout.
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
        id="what-is-okf-heading"
        eyebrow={whatIsOkf.eyebrow}
        heading={whatIsOkf.heading}
        paragraphs={whatIsOkf.paragraphs}
        links={whatIsOkf.links}
      />
      <MidSection lang={lang} eyebrow={midSection.eyebrow} heading={midSection.heading} items={midSection.items} />
      <Narrative
        lang={lang}
        id="why-fits-heading"
        eyebrow={whyFits.eyebrow}
        heading={whyFits.heading}
        paragraphs={whyFits.paragraphs}
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
