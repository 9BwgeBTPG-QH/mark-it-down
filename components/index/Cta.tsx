import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { indexContent, indexSections, type Lang } from '@/content/index';

// Same Chrome Web Store URL as the hero primary CTA (components/hero/Hero.tsx);
// duplicated locally rather than shared since neither file currently exports
// site-wide constants (Hero.tsx keeps its own copy of this URL too).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Old docs/index.html closing CTA section, restored verbatim from eed65be
// (original-design rollback, 2026-07-12): note + <small> version share one
// <p> split by <br>, buttons open in the same tab, and — unlike the hero —
// the old markup has no gtag onclick here, so no data-ga-cta.
export function Cta({ lang }: { lang: Lang }) {
  const copy = indexSections[lang];
  const ja = lang === 'ja';
  const cwsHref = ja ? `${CWS_URL}?hl=ja` : CWS_URL;

  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading">{ja ? <Budoux text={copy.ctaHeading} /> : copy.ctaHeading}</h2>
      <p>
        {ja ? <Budoux text={copy.ctaNote} /> : copy.ctaNote}
        <br />
        <small>{copy.ctaVersion}</small>
      </p>
      <div className="buttons">
        <SealButton
          href={cwsHref}
          lang={lang}
          variant="primary"
          aria-label={indexContent[lang].ctaPrimaryAriaLabel}
        >
          {indexContent[lang].ctaPrimary}
        </SealButton>
        <SealButton href={navHref('changelog', lang)} lang={lang} variant="secondary">
          {copy.ctaSecondaryLabel}
        </SealButton>
      </div>
    </section>
  );
}
