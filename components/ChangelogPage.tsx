import { PageShell } from '@/components/PageShell';
import { Budoux } from '@/components/Budoux';
import { ArchivalAccordion, type ArchivalAccordionItem } from '@/components/ArchivalAccordion';
import { Hero } from '@/components/changelog/Hero';
import { VersionBlocks } from '@/components/changelog/VersionBlocks';
import { Cta } from '@/components/changelog/Cta';
import { changelogVersions, type Lang } from '@/content/changelog';

// Shared skeleton for the EN/JA Changelog page pair (#1593 Phase 3-4). Copy
// lives in content/changelog.ts so app/(en)/changelog/page.tsx and
// app/(ja)/changelog-ja/page.tsx stay one-line wrappers. Information order
// follows docs/changelog.html / docs/changelog-ja.html: hero -> 48
// version entries (newest first, only the newest expanded by default) ->
// closing CTA. PageShell owns SiteNav/SiteFooter (see
// components/TroubleshootingPage.tsx for the same pattern).
//
// The version number doubles as the archival-index annotation (DESIGN.md §6
// "version number IS the index annotation, à la Quartz"), passed as
// ArchivalAccordionItem.index. The status label ("Released" / "Under
// Review" / JA equivalents) has no dedicated slot in ArchivalAccordion, so
// it is composed as a small trailing caption inside the `title` node rather
// than adding a new prop to the shared component (which faq/troubleshooting
// also depend on).
//
// No JsonLd here: the SEO baseline for both changelog.html / changelog-ja.html
// records an empty jsonLd array — the old pages have no
// <script type="application/ld+json"> block to port.
export function ChangelogPage({ lang }: { lang: Lang }) {
  const ja = lang === 'ja';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';
  const items: ArchivalAccordionItem[] = changelogVersions[lang].map((version, i) => ({
    id: `changelog-${i}`,
    index: version.version,
    title: (
      <span className="flex items-baseline gap-2">
        <span>{ja ? <Budoux text={version.highlight} /> : version.highlight}</span>
        <span className={`shrink-0 text-caption text-ink-muted ${captionFont}`}>{version.status}</span>
      </span>
    ),
    content: <VersionBlocks lang={lang} theme={version.theme} sections={version.sections} />,
    defaultOpen: version.defaultOpen,
  }));

  return (
    <PageShell lang={lang} slug="changelog">
      <Hero lang={lang} />
      <section className="border-t border-hairline bg-paper">
        <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
          <ArchivalAccordion items={items} lang={lang} />
        </div>
      </section>
      <Cta lang={lang} />
    </PageShell>
  );
}
