import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { rssSections, type Lang } from '@/content/rss';

// Same Chrome Web Store URL as components/clipper/Cta.tsx and
// components/index/Cta.tsx; duplicated locally per those files' own
// convention (neither exports a site-wide constant).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Old docs/rss.html closing CTA section, ported verbatim (#1593 Phase 3-2),
// same structure as components/clipper/Cta.tsx. Unlike the index page's CTA,
// the old rss CTA has no note/version line — just heading + two buttons. The
// old primary button's inline gtag() analytics call is dropped (no analytics
// wiring in this rebuild, matching components/clipper/Cta.tsx's own
// omission). Secondary button targets features.html / features-ja.html,
// matching the old page.
export function Cta({ lang }: { lang: Lang }) {
  const copy = rssSections[lang].cta;
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile text-center lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SealButton href={CWS_URL} lang={lang} variant="primary" target="_blank" rel="noreferrer noopener">
            {copy.primaryLabel}
          </SealButton>
          <SealButton href={navHref('features', lang)} lang={lang} variant="secondary">
            {copy.secondaryLabel}
          </SealButton>
        </div>
      </div>
    </section>
  );
}
