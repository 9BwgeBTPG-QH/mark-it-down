import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { rssSections, type Lang } from '@/content/rss';

// Same Chrome Web Store URL as components/clipper/Cta.tsx and
// components/index/Cta.tsx; duplicated locally per those files' own
// convention (neither exports a site-wide constant).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Old docs/rss.html closing CTA section, restored verbatim to eed65be
// original design (Wave R2 T1, #1593), same structure as
// components/clipper/Cta.tsx: .cta-section -> h2 -> .buttons with two links,
// no note/version line. The old primary link opens in the SAME tab (no
// target="_blank" in the old markup) and carries the old aria-label text;
// its inline gtag() cta_click is restored as data-ga-cta, fired by
// GoogleAnalytics' delegated listener (#1593 Phase 4). Secondary button
// targets features.html / features-ja.html, matching the old page.
export function Cta({ lang }: { lang: Lang }) {
  const copy = rssSections[lang].cta;
  const ja = lang === 'ja';

  return (
    <section className="cta-section" aria-labelledby="rss-cta-heading">
      <h2 id="rss-cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <div className="buttons">
        <SealButton
          href={CWS_URL}
          lang={lang}
          variant="primary"
          aria-label={copy.primaryAriaLabel}
          data-ga-cta={ja ? 'rss-ja' : 'rss'}
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
