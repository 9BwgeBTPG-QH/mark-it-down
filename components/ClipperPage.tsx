import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/clipper/Hero';
import { PhilosophySection } from '@/components/clipper/PhilosophySection';
import { Cta } from '@/components/clipper/Cta';
import { clipperJsonLd, clipperSections, type Lang } from '@/content/clipper';

// Shared skeleton for the EN/JA Web Clipper page pair, restored verbatim to
// eed65be original design (Wave R2 T1, #1593). Copy lives in content/clipper.ts
// so app/(en)/clipper/page.tsx and app/(ja)/clipper-ja/page.tsx stay one-line
// wrappers. Section order follows docs/clipper.html / docs/clipper-ja.html:
// hero -> Flow (id clipper-flow-heading) -> Fidelity (id
// clipper-quality-heading, matching the old page's own id even though its
// section-label reads "Fidelity") -> closing CTA. The old page has no
// screenshot/image section, so none is added here. PageShell owns
// SiteNav/SiteFooter (see components/IndexPage.tsx for the same pattern on
// the index page). Uses components/clipper/PhilosophySection.tsx instead of
// the Tailwind M&I-token FeatureSection (components/clipper/FeatureSection.tsx,
// left untouched — edits forbidden per task scope).
export function ClipperPage({ lang }: { lang: Lang }) {
  const copy = clipperSections[lang];

  return (
    <PageShell lang={lang} slug="clipper">
      <JsonLd data={clipperJsonLd[lang]} />
      <Hero lang={lang} />
      <PhilosophySection
        lang={lang}
        headingId="clipper-flow-heading"
        eyebrow={copy.flow.eyebrow}
        heading={copy.flow.heading}
        intro={copy.flow.intro}
        items={copy.flow.items}
      />
      <PhilosophySection
        lang={lang}
        headingId="clipper-quality-heading"
        eyebrow={copy.fidelity.eyebrow}
        heading={copy.fidelity.heading}
        intro={copy.fidelity.intro}
        items={copy.fidelity.items}
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
