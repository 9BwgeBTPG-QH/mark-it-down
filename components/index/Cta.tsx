import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { indexContent, indexSections, type Lang } from '@/content/index';

// Same Chrome Web Store URL as the hero primary CTA (components/hero/Hero.tsx);
// duplicated locally rather than shared since neither file currently exports
// site-wide constants (Hero.tsx keeps its own copy of this URL too).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Old docs/index.html closing CTA section, ported verbatim (#1593 Phase
// 3-1), including the secondary button's changelog.html target.
export function Cta({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile text-center lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>
          {ja ? <Budoux text={copy.ctaHeading} /> : copy.ctaHeading}
        </h2>
        <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.ctaNote} /> : copy.ctaNote}</p>
        <p className={`mt-1 text-caption text-ink-muted ${captionFont}`}>{copy.ctaVersion}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SealButton
            href={CWS_URL}
            lang={lang}
            variant="primary"
            target="_blank"
            rel="noreferrer noopener"
          >
            {indexContent[lang].ctaPrimary}
          </SealButton>
          <SealButton href={navHref('changelog', lang)} lang={lang} variant="secondary">
            {copy.ctaSecondaryLabel}
          </SealButton>
        </div>
      </div>
    </section>
  );
}
