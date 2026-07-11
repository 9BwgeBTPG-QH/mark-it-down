import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/clipper/Hero';
import { FeatureSection } from '@/components/clipper/FeatureSection';
import { Cta } from '@/components/clipper/Cta';
import { clipperJsonLd, clipperSections, type Lang } from '@/content/clipper';

// Shared skeleton for the EN/JA Web Clipper page pair (#1593 Phase 3-2).
// Copy lives in content/clipper.ts so app/(en)/clipper/page.tsx and
// app/(ja)/clipper-ja/page.tsx stay one-line wrappers. Information order
// follows docs/clipper.html / docs/clipper-ja.html: hero → Flow → Fidelity
// → closing CTA. The old page has no screenshot/image section, so none is
// added here. PageShell owns SiteNav/SiteFooter (see components/IndexPage.tsx
// for the same pattern on the index page).
export function ClipperPage({ lang }: { lang: Lang }) {
  const copy = clipperSections[lang];

  return (
    <PageShell lang={lang} slug="clipper">
      <JsonLd data={clipperJsonLd[lang]} />
      <Hero lang={lang} />
      <FeatureSection
        lang={lang}
        eyebrow={copy.flow.eyebrow}
        heading={copy.flow.heading}
        intro={copy.flow.intro}
        items={copy.flow.items}
        bg="paper"
      />
      <FeatureSection
        lang={lang}
        eyebrow={copy.fidelity.eyebrow}
        heading={copy.fidelity.heading}
        intro={copy.fidelity.intro}
        items={copy.fidelity.items}
        bg="paper-shade"
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
