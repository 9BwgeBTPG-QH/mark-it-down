import { PageShell } from '@/components/PageShell';
import { Hero } from '@/components/features/Hero';
import { FlowSection } from '@/components/features/FlowSection';
import { FeatureCategoryAccordion } from '@/components/features/FeatureCategoryAccordion';
import { GitSyncIcon } from '@/components/features/GitSyncIcon';
import { ShortcutsSection } from '@/components/features/ShortcutsSection';
import { Cta } from '@/components/features/Cta';
import { JsonLd } from '@/components/JsonLd';
import { Budoux } from '@/components/Budoux';
import { featuresCatalog, featuresJsonLd, featuresSections, type Lang } from '@/content/features';

// Shared skeleton for the EN/JA Features page pair, restored verbatim to
// eed65be's docs/features.html / docs/features-ja.html structure (design-
// regression project #1593 Wave R2 Batch 2). Copy lives in
// content/features.ts so app/(en)/features/page.tsx and
// app/(ja)/features-ja/page.tsx stay one-line wrappers. PageShell owns
// SiteNav/SiteFooter (see components/ClipperPage.tsx for the same pattern).
//
// The JsonLd block is the one thing here that is added rather than ported:
// eed65be's docs/features.html had no JSON-LD script tag, so this page — the
// site's largest — was the only major one without structured data. Payload
// lives in content/features.ts as featuresJsonLd.
//
// FlowSection is the second addition: the old page went straight from the hero
// into the accordion, so nothing said what the twelve categories are for. It
// renders the extension's own Entry -> Edit -> Move -> Exit toolbar stages once,
// above the accordion, and does not otherwise touch it.
//
// All 12 categories sit in one <div class="changelog-accordion">, each as a
// native <details class="accordion-item">, matching the old page's own
// non-programmatic markup exactly — no per-category <section> wrapper, no
// archival index number, no background alternation (those were inventions of
// an earlier, since-reverted port; the old page has neither). Only the first
// item (Web Clipper) starts expanded via `open`, matching the old markup.
//
// The order is no longer docs/features.html's (Web Clipper -> RSS Reader ->
// Repository Reader -> Note Graph -> Portability -> Modes -> Markdown -> Notes
// -> View -> Storage -> Git Sync -> Keyboard Shortcuts), which followed nothing
// the reader could name. The twelve are now sorted under the same four stages
// FlowSection just showed, plus a fifth group for the two that belong to no
// single stage, so the list is an index into the flow rather than an inventory.
// Grouping and the placement of the three arguable cases (#notes under Move,
// #note-graph under Move, #storage under Everywhere) follow
// $EXT/doc/research/features-page-ia-2026-08.md:340-357.
//
// Only the sequence changes. Every id, every heading, every item body and the
// one `open` default are untouched, so existing deep links (#git-sync from the
// nav, #shortcuts from the changelog) still land on the same content.
//
// The group labels are h2, the same level as FlowSection's stage titles, and
// carry no id: they are signposts, not link targets. The lead paragraph above
// them has no heading at all — see content/features.ts (featuresCatalog) for
// why. Styling is a literal <style> element, following FlowSection.
export function FeaturesPage({ lang }: { lang: Lang }) {
  const copy = featuresSections[lang];
  const catalog = featuresCatalog[lang];
  const ja = lang === 'ja';

  return (
    <PageShell lang={lang} slug="features">
      <JsonLd data={featuresJsonLd[lang]} />
      <Hero lang={lang} />
      <FlowSection lang={lang} />
      <style>{`
        .features-catalog-lead {
          max-width: 800px;
          margin: 0 auto var(--spacing-lg);
          font-size: var(--font-size-base);
          line-height: var(--line-height-normal);
          color: var(--text-secondary);
        }
        .features-group {
          align-self: flex-start;
          font-family: var(--font-mono);
          font-size: var(--font-size-sm);
          font-weight: 600;
          letter-spacing: var(--letter-spacing-wide);
          text-transform: uppercase;
          color: var(--accent-primary);
          margin: var(--spacing-lg) 0 0;
        }
        .features-group:first-child { margin-top: 0; }
      `}</style>
      <p className="features-catalog-lead">{ja ? <Budoux text={catalog.lead} /> : catalog.lead}</p>
      <div className="changelog-accordion">
        <h2 className="features-group">{catalog.groups.entry}</h2>
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.webClipper.eyebrow}
          heading={copy.webClipper.heading}
          icon={copy.webClipper.icon}
          items={copy.webClipper.items}
          id="web-clipper"
          open
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.rssReader.eyebrow}
          heading={copy.rssReader.heading}
          icon={copy.rssReader.icon}
          items={copy.rssReader.items}
          id="rss-reader"
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.repositoryReader.eyebrow}
          heading={copy.repositoryReader.heading}
          icon={copy.repositoryReader.icon}
          items={copy.repositoryReader.items}
          id="repository-reader"
        />
        <h2 className="features-group">{catalog.groups.edit}</h2>
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.markdown.eyebrow}
          heading={copy.markdown.heading}
          icon={copy.markdown.icon}
          items={copy.markdown.items}
          id="markdown"
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.modes.eyebrow}
          heading={copy.modes.heading}
          icon={copy.modes.icon}
          items={copy.modes.items}
          id="modes"
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.view.eyebrow}
          heading={copy.view.heading}
          icon={copy.view.icon}
          items={copy.view.items}
          id="view"
        />
        <h2 className="features-group">{catalog.groups.move}</h2>
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.notes.eyebrow}
          heading={copy.notes.heading}
          icon={copy.notes.icon}
          items={copy.notes.items}
          id="notes"
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.noteGraph.eyebrow}
          heading={copy.noteGraph.heading}
          icon={copy.noteGraph.icon}
          items={copy.noteGraph.items}
          id="note-graph"
        />
        <h2 className="features-group">{catalog.groups.exit}</h2>
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.portability.eyebrow}
          heading={copy.portability.heading}
          icon={copy.portability.icon}
          items={copy.portability.items}
          id="portability"
        />
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.gitSync.eyebrow}
          heading={copy.gitSync.heading}
          icon={<GitSyncIcon />}
          iconIsSvg
          items={copy.gitSync.items}
          id="git-sync"
        />
        <h2 className="features-group">{catalog.groups.everywhere}</h2>
        <FeatureCategoryAccordion
          lang={lang}
          eyebrow={copy.storage.eyebrow}
          heading={copy.storage.heading}
          icon={copy.storage.icon}
          items={copy.storage.items}
          id="storage"
        />
        <ShortcutsSection
          lang={lang}
          eyebrow={copy.shortcuts.eyebrow}
          heading={copy.shortcuts.heading}
          icon={copy.shortcuts.icon}
          groups={copy.shortcuts.groups}
          id="shortcuts"
        />
      </div>
      <Cta lang={lang} />
    </PageShell>
  );
}
