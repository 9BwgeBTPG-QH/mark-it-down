import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { repositorySections, type Lang } from '@/content/repository';

// Same Chrome Web Store URL as components/rss/Cta.tsx and
// components/clipper/Cta.tsx; duplicated locally per those files' own
// convention (neither exports a site-wide constant).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Same structure as components/rss/Cta.tsx: .cta-section -> h2 -> .buttons
// with a primary Chrome Web Store link and a secondary link back to the
// Features page. The primary opens in the same tab and carries
// data-ga-cta, fired by GoogleAnalytics' delegated listener.
export function Cta({ lang }: { lang: Lang }) {
  const copy = repositorySections[lang].cta;
  const ja = lang === 'ja';

  return (
    <section className="cta-section" aria-labelledby="repository-cta-heading">
      <h2 id="repository-cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <div className="buttons">
        <SealButton
          href={CWS_URL}
          lang={lang}
          variant="primary"
          aria-label={copy.primaryAriaLabel}
          data-ga-cta={ja ? 'repository-ja' : 'repository'}
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
