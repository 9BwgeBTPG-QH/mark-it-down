import { Fragment } from 'react';
import { SealButton } from '@/components/SealButton';
import { Budoux } from '@/components/Budoux';
import { BrokenLines } from '@/components/index/BrokenLines';
import { EntryIcon, EditIcon, ClearIcon, ExitIcon } from '@/components/index/icons';
import { navHref } from '@/content/shared';
import { indexContent, type Lang } from '@/content/index';

const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Entry → Edit → Clear → Exit strip. Labels are English in both languages,
// exactly as in the old page (the whole strip is aria-hidden decoration).
const flowSteps = [
  { label: 'Entry', Icon: EntryIcon },
  { label: 'Edit', Icon: EditIcon },
  { label: 'Clear', Icon: ClearIcon },
  { label: 'Exit', Icon: ExitIcon },
] as const;

// Old docs/index.html hero, restored verbatim from eed65be (original-design
// rollback, 2026-07-12): h1 → flow strip → tagline → fact → subtitle →
// buttons → ornament. No screenshot — the old page's only visual is the Marp
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
      <div className="hero-flow" aria-hidden="true">
        {flowSteps.map(({ label, Icon }, i) => (
          <Fragment key={label}>
            {i > 0 && <span className="hero-flow-arrow">→</span>}
            <div className="hero-flow-step">
              <div className="hero-flow-icon">
                <Icon />
              </div>
              <span className="hero-flow-label">{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
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
