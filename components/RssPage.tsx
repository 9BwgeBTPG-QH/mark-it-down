import { PageShell } from '@/components/PageShell';
import { JsonLd } from '@/components/JsonLd';
import { Hero } from '@/components/rss/Hero';
import { PhilosophySection } from '@/components/rss/PhilosophySection';
import { Cta } from '@/components/rss/Cta';
import { rssJsonLd, rssSections, type Lang } from '@/content/rss';

// Shared skeleton for the EN/JA RSS Reader page pair, restored verbatim to
// eed65be original design (Wave R2 T1, #1593). Copy lives in content/rss.ts
// so app/(en)/rss/page.tsx and app/(ja)/rss-ja/page.tsx stay one-line
// wrappers. Section order follows docs/rss.html / docs/rss-ja.html: hero ->
// Workspace (id rss-workspace-heading) -> Subscriptions (id
// rss-sync-heading, matching the old page's own id even though its
// section-label reads "Subscriptions") -> closing CTA. The old page has no
// screenshot/image section, so none is added here. PageShell owns
// SiteNav/SiteFooter (see components/ClipperPage.tsx for the same pattern on
// the Web Clipper page).
//
// PhilosophySection is NOT reused from components/clipper/ — this codebase's
// established per-page-family convention (Hero and Cta already mirror rather
// than share; see the removed comment this replaces). components/rss/
// PhilosophySection.tsx duplicates components/clipper/PhilosophySection.tsx's
// structure with content/rss.ts as its copy source.
export function RssPage({ lang }: { lang: Lang }) {
  const copy = rssSections[lang];

  return (
    <PageShell lang={lang} slug="rss">
      <JsonLd data={rssJsonLd[lang]} />
      <Hero lang={lang} />
      <PhilosophySection
        lang={lang}
        headingId="rss-workspace-heading"
        eyebrow={copy.workspace.eyebrow}
        heading={copy.workspace.heading}
        intro={copy.workspace.intro}
        items={copy.workspace.items}
      />
      <PhilosophySection
        lang={lang}
        headingId="rss-sync-heading"
        eyebrow={copy.subscriptions.eyebrow}
        heading={copy.subscriptions.heading}
        intro={copy.subscriptions.intro}
        items={copy.subscriptions.items}
      />
      <Cta lang={lang} />
    </PageShell>
  );
}
