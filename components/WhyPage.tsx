import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/why/Hero';
import { Origin } from '@/components/why/Origin';
import { Beliefs } from '@/components/why/Beliefs';
import { FeatureSection } from '@/components/clipper/FeatureSection';
import { Cta } from '@/components/why/Cta';
import { whyJsonLd, whyOrigin, whyBeliefs, whyNotBuilt, type Lang } from '@/content/why';

// Shared skeleton for the EN/JA Philosophy page pair (#1593 Phase 3-3). Copy
// lives in content/why.ts so app/(en)/why/page.tsx and app/(ja)/why-ja/
// page.tsx stay one-line wrappers. Information order follows docs/why.html /
// docs/why-ja.html: hero -> "The starting point" (narrative + blockquote) ->
// "What we believe" (4-item icon list) -> "What we don't build" (visible
// heading + 3-item list) -> closing CTA. The old page has no screenshot/
// image section, so none is added here. PageShell owns SiteNav/SiteFooter
// (see components/RssPage.tsx for the same pattern on the RSS page).
//
// "What we don't build" reuses FeatureSection (components/clipper/
// FeatureSection.tsx) as-is: unlike Part 1/2, its old <h2> IS visible, and
// its 3-item list plus intro sentence map directly onto FeatureSection's
// `{eyebrow, heading, intro, items}` props with no new component needed.
// Part 1 and Part 2 each need a new component (components/why/Origin.tsx,
// components/why/Beliefs.tsx) since neither is an item list in the old
// page — Part 1 is a narrative with an embedded blockquote and a
// whole-paragraph emphasis block, Part 2 is an icon-led belief list, and
// both old <h2>s are visually hidden rather than shown.
export function WhyPage({ lang }: { lang: Lang }) {
  const origin = whyOrigin[lang];
  const beliefs = whyBeliefs[lang];
  const notBuilt = whyNotBuilt[lang];

  return (
    <PageShell lang={lang} slug="why">
      <JsonLd data={whyJsonLd[lang]} />
      <Hero lang={lang} />
      <Origin lang={lang} eyebrow={origin.eyebrow} blocks={origin.blocks} />
      <Beliefs lang={lang} eyebrow={beliefs.eyebrow} items={beliefs.items} />
      <FeatureSection
        lang={lang}
        eyebrow={notBuilt.eyebrow}
        heading={notBuilt.heading}
        intro={notBuilt.subtitle}
        items={notBuilt.items}
        bg="paper"
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
