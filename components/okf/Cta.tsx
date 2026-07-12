import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { okfCta, type Lang } from '@/content/okf';

// Same Chrome Web Store URL as components/rss/Cta.tsx and
// components/clipper/Cta.tsx; duplicated locally per those files' own
// convention (neither exports a site-wide constant).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// docs/okf.html closing `.cta-section`, restored verbatim (original-design
// rollback, #1593 Wave R2). The old primary button's inline gtag()
// cta_click is restored as data-ga-cta, fired by GoogleAnalytics' delegated
// listener. Unlike the Tailwind-era version, the old markup's CWS anchor
// has no `target`/`rel` at all (opens in the same tab), so neither prop is
// passed here. Secondary button targets features.html / features-ja.html,
// matching the old page's "See all features" / "機能を見る" link.
export function Cta({ lang }: { lang: Lang }) {
  const copy = okfCta[lang];
  const ja = lang === 'ja';

  return (
    <section className="cta-section" aria-labelledby="okf-cta-heading">
      <h2 id="okf-cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <div className="buttons">
        <SealButton
          href={CWS_URL}
          lang={lang}
          variant="primary"
          aria-label={copy.primaryAriaLabel}
          data-ga-cta={ja ? 'okf-ja' : 'okf'}
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
