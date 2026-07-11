import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/rss/Hero';
import { FeatureSection } from '@/components/clipper/FeatureSection';
import { Cta } from '@/components/rss/Cta';
import { rssJsonLd, rssSections, type Lang } from '@/content/rss';

// Shared skeleton for the EN/JA RSS Reader page pair (#1593 Phase 3-2).
// Copy lives in content/rss.ts so app/(en)/rss/page.tsx and
// app/(ja)/rss-ja/page.tsx stay one-line wrappers. Information order
// follows docs/rss.html / docs/rss-ja.html: hero → Workspace → Subscriptions
// → closing CTA. The old page has no screenshot/image section, so none is
// added here. PageShell owns SiteNav/SiteFooter (see components/ClipperPage.tsx
// for the same pattern on the Web Clipper page).
//
// FeatureSection is imported directly from components/clipper/FeatureSection
// rather than duplicated: its props ({ lang, eyebrow, heading, intro, items,
// bg }) are content-agnostic and RssListItem (content/rss.ts) is structurally
// identical to ClipperListItem ({ title, body }), so no props extension was
// needed. Hero and Cta are NOT reused from components/clipper/ — both of
// those components import their copy source directly (clipperContent /
// clipperSections) rather than accepting it as a prop, so reusing them
// as-is would have pointed the rss page at clipper's copy. Rather than
// widen their props for a single reuse, components/rss/Hero.tsx and
// components/rss/Cta.tsx mirror the same structure/classes with
// content/rss.ts as their copy source, matching this codebase's existing
// per-page Hero/Cta convention (components/index/Hero.tsx also does not
// take copy as a prop).
export function RssPage({ lang }: { lang: Lang }) {
  const copy = rssSections[lang];

  return (
    <PageShell lang={lang} slug="rss">
      <JsonLd data={rssJsonLd[lang]} />
      <Hero lang={lang} />
      <FeatureSection
        lang={lang}
        eyebrow={copy.workspace.eyebrow}
        heading={copy.workspace.heading}
        intro={copy.workspace.intro}
        items={copy.workspace.items}
        bg="paper"
      />
      <FeatureSection
        lang={lang}
        eyebrow={copy.subscriptions.eyebrow}
        heading={copy.subscriptions.heading}
        intro={copy.subscriptions.intro}
        items={copy.subscriptions.items}
        bg="paper-shade"
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
