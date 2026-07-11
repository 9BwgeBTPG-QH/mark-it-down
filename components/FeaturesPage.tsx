import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/features/Hero';
import { FeatureCategoryAccordion } from '@/components/features/FeatureCategoryAccordion';
import { ShortcutsSection } from '@/components/features/ShortcutsSection';
import { Cta } from '@/components/features/Cta';
import { featuresSections, type Lang } from '@/content/features';

// Shared skeleton for the EN/JA Features page pair (#1593 Phase 3-3). Copy
// lives in content/features.ts so app/(en)/features/page.tsx and
// app/(ja)/features-ja/page.tsx stay one-line wrappers. Information order
// follows docs/features.html / docs/features-ja.html: hero -> 11 catalog
// categories -> Keyboard Shortcuts (the one category with an extra nesting
// level) -> closing CTA. PageShell owns SiteNav/SiteFooter (see
// components/ClipperPage.tsx for the same pattern).
//
// No JsonLd here: unlike the index/clipper/rss pages, docs/features.html /
// docs/features-ja.html have no JSON-LD script tag to port.
//
// Structural review (post-launch): the first port rendered all 11 categories
// as an always-open FeatureSection, producing a 25,000px+ scroll wall. The
// old docs/features.html kept every category collapsed behind its own
// accordion — a deliberate old-design information structure for catalog
// content — so categories (including Keyboard Shortcuts, 28 items) now
// render via FeatureCategoryAccordion / ShortcutsSection, both collapsed by
// default via native <details>/<summary> (see
// components/features/FeatureAccordionShell.tsx for why
// components/ArchivalAccordion.tsx wasn't reused directly). Archival index
// numbers (01-12) run in the same top-to-bottom order as before. Hero and Cta
// are unchanged: Hero has no list content to collapse, and Cta is the
// page's single always-visible closing action, consistent with every other
// page's Cta.tsx in this codebase.
export function FeaturesPage({ lang }: { lang: Lang }) {
  const copy = featuresSections[lang];

  return (
    <PageShell lang={lang} slug="features">
      <Hero lang={lang} />
      <FeatureCategoryAccordion
        lang={lang}
        index="01"
        eyebrow={copy.webClipper.eyebrow}
        heading={copy.webClipper.heading}
        items={copy.webClipper.items}
        bg="paper"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="02"
        eyebrow={copy.rssReader.eyebrow}
        heading={copy.rssReader.heading}
        items={copy.rssReader.items}
        bg="paper-shade"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="03"
        eyebrow={copy.repositoryReader.eyebrow}
        heading={copy.repositoryReader.heading}
        items={copy.repositoryReader.items}
        bg="paper"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="04"
        eyebrow={copy.noteGraph.eyebrow}
        heading={copy.noteGraph.heading}
        items={copy.noteGraph.items}
        bg="paper-shade"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="05"
        eyebrow={copy.portability.eyebrow}
        heading={copy.portability.heading}
        items={copy.portability.items}
        bg="paper"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="06"
        eyebrow={copy.modes.eyebrow}
        heading={copy.modes.heading}
        items={copy.modes.items}
        bg="paper-shade"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="07"
        eyebrow={copy.markdown.eyebrow}
        heading={copy.markdown.heading}
        items={copy.markdown.items}
        bg="paper"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="08"
        eyebrow={copy.notes.eyebrow}
        heading={copy.notes.heading}
        items={copy.notes.items}
        bg="paper-shade"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="09"
        eyebrow={copy.view.eyebrow}
        heading={copy.view.heading}
        items={copy.view.items}
        bg="paper"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="10"
        eyebrow={copy.storage.eyebrow}
        heading={copy.storage.heading}
        items={copy.storage.items}
        bg="paper-shade"
      />
      <FeatureCategoryAccordion
        lang={lang}
        index="11"
        eyebrow={copy.gitSync.eyebrow}
        heading={copy.gitSync.heading}
        items={copy.gitSync.items}
        bg="paper"
      />
      <ShortcutsSection
        lang={lang}
        index="12"
        eyebrow={copy.shortcuts.eyebrow}
        heading={copy.shortcuts.heading}
        groups={copy.shortcuts.groups}
        bg="paper-shade"
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
