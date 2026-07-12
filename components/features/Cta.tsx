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

// Old docs/features.html closing CTA section, restored verbatim to eed65be's
// .cta-section / .buttons markup (#1593 Wave R2 Batch 2). Unlike
// components/clipper/Cta.tsx and components/rss/Cta.tsx (heading + two
// buttons), the old Features CTA has only a single button — no secondary
// "See all features" link, since this already is the features page. The
// ground-truth anchor has no target/rel/onclick attribute at all (opens in
// the same tab, no cta_click event), so no data-ga-cta conversion applies
// here unlike rss/clipper's Cta.
export function Cta({ lang }: { lang: Lang }) {
  const copy = featuresSections[lang].cta;
  const ja = lang === 'ja';

  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <p>{ja ? <Budoux text={copy.body} /> : copy.body}</p>
      <div className="buttons">
        <SealButton href={CWS_URL} lang={lang} variant="primary" aria-label={copy.primaryAriaLabel}>
          {copy.primaryLabel}
        </SealButton>
      </div>
    </section>
  );
}
