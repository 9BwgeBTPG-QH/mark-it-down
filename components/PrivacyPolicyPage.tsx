import { PageShell } from '@/components/PageShell';
import { Budoux } from '@/components/Budoux';
import { SectionBlocks } from '@/components/privacy/SectionBlocks';
import { privacyContent, privacySections, type Lang } from '@/content/privacy';

// Shared skeleton for the EN/JA Privacy Policy page pair (#1593 Phase 3-5,
// final group). This is a legal document, so layout stays deliberately
// plain (pitfall #5): a single h1, a lastUpdated line, then each section's
// h2 stacked in the page's own original order inside one max-w-content
// column — no cards, no grids, no accordion. docs/privacy-policy.html and
// docs/privacy-policy-ja.html order their h2 sections differently (EN:
// Overview -> Data Collection -> Data Storage -> Web Clipper -> RSS -> ...;
// JA: Overview -> Web Clipper -> RSS -> Data Collection -> Data Storage ->
// ...), which content/privacy.ts's privacySections preserves per language
// rather than reconciling into one shared order.
export function PrivacyPolicyPage({ lang }: { lang: Lang }) {
  const copy = privacyContent[lang];
  const sections = privacySections[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <PageShell lang={lang} slug="privacy-policy">
      <section className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <h1 className={`text-balance text-h1-mobile text-ink md:text-h1 ${headingFont}`}>
          {ja ? <Budoux text={copy.h1} /> : copy.h1}
        </h1>
        <p className={`mt-2 text-caption text-ink-muted ${bodyFont}`}>{ja ? <Budoux text={copy.lastUpdated} /> : copy.lastUpdated}</p>

        <div className="mt-8 space-y-8">
          {sections.map((section) => (
            <div key={section.id}>
              <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={section.heading} /> : section.heading}</h2>
              <div className="mt-3">
                <SectionBlocks lang={lang} blocks={section.blocks} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
