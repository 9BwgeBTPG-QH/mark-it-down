import { PageShell } from '@/components/PageShell';
import { Budoux } from '@/components/Budoux';
import { ArchivalAccordion, type ArchivalAccordionItem } from '@/components/ArchivalAccordion';
import { Hero } from '@/components/troubleshooting/Hero';
import { ItemBlocks } from '@/components/troubleshooting/ItemBlocks';
import { Cta } from '@/components/troubleshooting/Cta';
import { troubleshootingItems, type Lang } from '@/content/troubleshooting';

// Shared skeleton for the EN/JA Troubleshooting page pair (#1593 Phase 3-4).
// Copy lives in content/troubleshooting.ts so app/(en)/troubleshooting/
// page.tsx and app/(ja)/troubleshooting-ja/page.tsx stay one-line wrappers.
// Information order follows docs/troubleshooting.html /
// docs/troubleshooting-ja.html: hero -> 6 flat accordion items (no
// categories, unlike the FAQ page) -> closing CTA. PageShell owns
// SiteNav/SiteFooter (see components/ClipperPage.tsx for the same pattern).
//
// No JsonLd here: unlike docs/faq.html, the old troubleshooting pages have
// no <script type="application/ld+json"> block to port (see
// content/troubleshooting.ts's own closing comment).
export function TroubleshootingPage({ lang }: { lang: Lang }) {
  const ja = lang === 'ja';
  const items: ArchivalAccordionItem[] = troubleshootingItems[lang].map((item, i) => ({
    id: `troubleshooting-${i}`,
    title: ja ? <Budoux text={item.title} /> : item.title,
    content: <ItemBlocks lang={lang} blocks={item.blocks} />,
    defaultOpen: item.defaultOpen,
  }));

  return (
    <PageShell lang={lang} slug="troubleshooting">
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
