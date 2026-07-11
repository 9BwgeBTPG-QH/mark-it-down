import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { featuresSections, type Lang } from '@/content/features';

// Same Chrome Web Store URL as components/clipper/Cta.tsx,
// components/rss/Cta.tsx, and components/index/Cta.tsx; duplicated locally
// per those files' own convention (neither exports a site-wide constant).
// The old JA source's CTA link had a literal "?hl=ja" query param appended
// to this same URL — dropped here, matching the existing non-branching
// CWS_URL precedent already established in every other Cta.tsx in this
// codebase (none of them vary the URL by lang).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Old docs/features.html closing CTA section, ported verbatim
// (#1593 Phase 3-3). Unlike components/clipper/Cta.tsx and
// components/rss/Cta.tsx (heading + two buttons), the old Features CTA has
// only a single button — no secondary "See all features" link, since this
// already is the features page. Old CTA button's inline gtag() analytics
// call is dropped (no analytics wiring in this rebuild, same omission as
// every other Cta.tsx in this codebase).
export function Cta({ lang }: { lang: Lang }) {
  const copy = featuresSections[lang].cta;
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
        </div>
      </div>
    </section>
  );
}
