import { PageShell } from '@/components/PageShell';
import { Budoux } from '@/components/Budoux';
import { Hero } from '@/components/troubleshooting/Hero';
import { ItemBlocks } from '@/components/troubleshooting/ItemBlocks';
import { Cta } from '@/components/troubleshooting/Cta';
import { troubleshootingItems, type Lang } from '@/content/troubleshooting';

// Shared skeleton for the EN/JA Troubleshooting page pair, restored to
// docs/troubleshooting.html's/-ja.html's original plain markup (#1593 Wave
// R2 fidelity requirement): hero -> bare `.changelog-accordion` (6 flat
// `<details class="accordion-item">`, no wrapping section/div, only the
// first item carries the bare `open` attribute) -> closing CTA. The old
// accordion structure does not match ArchivalAccordion's markup, so it is
// written out directly, following the components/index/FaqPreview.tsx
// precedent — disclosure stays native `<details>`, no JS.
//
// No JsonLd here: unlike docs/faq.html, the old troubleshooting pages have
// no <script type="application/ld+json"> block to port (see
// content/troubleshooting.ts's own closing comment).
export function TroubleshootingPage({ lang }: { lang: Lang }) {
  const ja = lang === 'ja';
  const items = troubleshootingItems[lang];

  return (
    <PageShell lang={lang} slug="troubleshooting">
      <Hero lang={lang} />
      <div className="changelog-accordion">
        {items.map((item, i) => (
          <details key={i} className="accordion-item" open={item.defaultOpen || undefined}>
            <summary className="accordion-header">
              <div className="accordion-title">
                <span className="accordion-icon"></span>
                <span className="accordion-highlight">{ja ? <Budoux text={item.title} /> : item.title}</span>
              </div>
            </summary>
            <div className="accordion-content">
              <ItemBlocks lang={lang} blocks={item.blocks} />
            </div>
          </details>
        ))}
      </div>
      <Cta lang={lang} />
    </PageShell>
  );
}
