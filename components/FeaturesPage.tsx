import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/features/Hero';
import { FeatureCategoryAccordion } from '@/components/features/FeatureCategoryAccordion';
import { GitSyncIcon } from '@/components/features/GitSyncIcon';
import { ShortcutsSection } from '@/components/features/ShortcutsSection';
import { Cta } from '@/components/features/Cta';
import { featuresSections, type Lang } from '@/content/features';

// Shared skeleton for the EN/JA Features page pair, restored verbatim to
// eed65be's docs/features.html / docs/features-ja.html structure (design-
// regression project #1593 Wave R2 Batch 2). Copy lives in
// content/features.ts so app/(en)/features/page.tsx and
// app/(ja)/features-ja/page.tsx stay one-line wrappers. PageShell owns
// SiteNav/SiteFooter (see components/ClipperPage.tsx for the same pattern).
//
// No JsonLd here: unlike the index/clipper/rss pages, docs/features.html /
// docs/features-ja.html have no JSON-LD script tag to port.
//
// All 12 categories sit in one flat <div class="changelog-accordion">, each
// as a native <details class="accordion-item">, matching the old page's own
// non-programmatic markup exactly — no per-category <section> wrapper, no
// archival index number, no background alternation (those were inventions of
// an earlier, since-reverted port; the old page has neither). Only the first
// item (Web Clipper) starts expanded via `open`, matching the old markup.
// Order follows docs/features.html: Web Clipper -> RSS Reader -> Repository
// Reader -> Note Graph -> Portability -> Modes -> Markdown -> Notes -> View
// -> Storage -> Git Sync -> Keyboard Shortcuts (the one category with an
// extra nesting level) -> closing CTA.
export function FeaturesPage({ lang }: { lang: Lang }) {
  const copy = featuresSections[lang];

  return (
    <PageShell lang={lang} slug="features">
      <Hero lang={lang} />
      <div className="changelog-accordion">
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.webClipper.eyebrow}
          heading={copy.webClipper.heading}
          icon={copy.webClipper.icon}
          items={copy.webClipper.items}
          open
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.rssReader.eyebrow}
          heading={copy.rssReader.heading}
          icon={copy.rssReader.icon}
          items={copy.rssReader.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.repositoryReader.eyebrow}
          heading={copy.repositoryReader.heading}
          icon={copy.repositoryReader.icon}
          items={copy.repositoryReader.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.noteGraph.eyebrow}
          heading={copy.noteGraph.heading}
          icon={copy.noteGraph.icon}
          items={copy.noteGraph.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.portability.eyebrow}
          heading={copy.portability.heading}
          icon={copy.portability.icon}
          items={copy.portability.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.modes.eyebrow}
          heading={copy.modes.heading}
          icon={copy.modes.icon}
          items={copy.modes.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.markdown.eyebrow}
          heading={copy.markdown.heading}
          icon={copy.markdown.icon}
          items={copy.markdown.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.notes.eyebrow}
          heading={copy.notes.heading}
          icon={copy.notes.icon}
          items={copy.notes.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.view.eyebrow}
          heading={copy.view.heading}
          icon={copy.view.icon}
          items={copy.view.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.storage.eyebrow}
          heading={copy.storage.heading}
          icon={copy.storage.icon}
          items={copy.storage.items}
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.gitSync.eyebrow}
          heading={copy.gitSync.heading}
          icon={<GitSyncIcon />}
          iconIsSvg
          items={copy.gitSync.items}
        />
        <ShortcutsSection
          lang={lang}
          eyebrow={copy.shortcuts.eyebrow}
          heading={copy.shortcuts.heading}
          icon={copy.shortcuts.icon}
          groups={copy.shortcuts.groups}
        />
      </div>
      <Cta lang={lang} />
    </PageShell>
  );
}
