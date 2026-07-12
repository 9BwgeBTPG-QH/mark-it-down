import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { whyCta, type Lang } from '@/content/why';

// Same Chrome Web Store URL as components/why/Origin.tsx's sibling sections
// and components/rss/Cta.tsx / components/clipper/Cta.tsx; duplicated
// locally per those files' own convention (neither exports a site-wide
// constant). The old why.html/why-ja.html CTA link carries no `?hl=ja` query
// param (confirmed by direct read of both old pages — unlike docs/index.html's
// hero CTA), so neither does this one.
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Old docs/why.html closing CTA section (<section aria-labelledby=
// "why-cta-heading">), restored verbatim from eed65be (original-design
// rollback, 2026-07-12). The old primary button's inline gtag() cta_click
// onclick is dropped in favor of data-ga-cta (delegated GA listener); it
// opens in the same tab (no target="_blank") and keeps the old
// aria-label verbatim via primaryAriaLabel. Secondary button targets
// features.html / features-ja.html, matching the old page's "See how it
// works" / "使い方を見る" link, and carries no aria-label (matching old
// markup).
export function Cta({ lang }: { lang: Lang }) {
  const copy = whyCta[lang];
  const ja = lang === 'ja';

  return (
    <section className="cta-section" aria-labelledby="why-cta-heading">
      <h2 id="why-cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <div className="buttons">
        <SealButton
          href={CWS_URL}
          lang={lang}
          variant="primary"
          aria-label={copy.primaryAriaLabel}
          data-ga-cta={ja ? 'why-ja' : 'why'}
        >
          {copy.primaryLabel}
        </SealButton>
        <SealButton href={navHref('features', lang)} lang={lang} variant="secondary">
          {copy.secondaryLabel}
        </SealButton>
      </div>
    </section>
  );
}
