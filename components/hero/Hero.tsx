import { SealButton } from '@/components/SealButton';
import { Budoux } from '@/components/Budoux';
import { BrokenLines } from '@/components/index/BrokenLines';
import { navHref } from '@/content/shared';
import { indexContent, type Lang } from '@/content/index';

const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Hero structure: h1 → tagline → fact → subtitle → buttons → ornament.
// (The Entry→Edit→Move→Exit strip was dropped 2026-07-31 to bring the CTA
// above the fold; the flow still appears in components/index/Flow.tsx.)
// The tagline/fact copy itself was rewritten 2026-07-31
// (see content/index.ts) — the structure, not the wording, is the contract.
// No screenshot — the old page's only visual is the Marp
// slide iframe in the screenshot-section below (components/index/Screenshot).
// The primary CTA opens in the same tab and carries data-ga-cta="hero"
// (delegated GA listener), matching the old inline gtag onclick's placement —
// the closing cta-section button had no tracking, so it gets none here either.
export function Hero({ lang }: { lang: Lang }) {
  const copy = indexContent[lang];
  const ja = lang === 'ja';
  const cwsHref = ja ? `${CWS_URL}?hl=ja` : CWS_URL;

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <h1 id="hero-heading" className="page-title">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-tagline">
        <BrokenLines lines={copy.heroTaglineLines} ja={ja} />
      </p>
      <p className="hero-fact">{ja ? <Budoux text={copy.heroFact} /> : copy.heroFact}</p>
      <p className="hero-subtitle">
        <BrokenLines lines={copy.heroSubtitleLines} ja={ja} />
      </p>
      <div className="buttons">
        <SealButton
          href={cwsHref}
          lang={lang}
          variant="primary"
          aria-label={copy.ctaPrimaryAriaLabel}
          data-ga-cta="hero"
        >
          {copy.ctaPrimary}
        </SealButton>
        <SealButton href={navHref('features', lang)} lang={lang} variant="secondary">
          {copy.ctaSecondary}
        </SealButton>
      </div>
      <span className="hero-ornament" aria-hidden="true">
        ~ ~ ~
      </span>
    </section>
  );
}
