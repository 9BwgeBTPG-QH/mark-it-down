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
// "See all features" link, since this already is the features page.
//
// This CTA used to end with an added (not ported) sentence pointing at /why's
// "what we don't build" list. That moved up the page into
// components/features/NotBuilt.tsx, where a reader meets it before the
// catalogue rather than after the buy button; its wording survives as that
// section's heading.
//
// data-ga-cta is a deliberate departure from the ground truth: eed65be's
// anchor had no analytics attribute, which left this page's only conversion
// point unmeasurable. Label follows the convention of the other pages'
// Cta.tsx (bare slug + "-ja"); index's "hero" is a page-local outlier and is
// not copied. Delegated listener lives in components/GoogleAnalytics.tsx.
export function Cta({ lang }: { lang: Lang }) {
  const copy = featuresSections[lang].cta;
  const ja = lang === 'ja';

  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <p>{ja ? <Budoux text={copy.body} /> : copy.body}</p>
      <div className="buttons">
        <SealButton
          href={CWS_URL}
          lang={lang}
          variant="primary"
          aria-label={copy.primaryAriaLabel}
          data-ga-cta={ja ? 'features-ja' : 'features'}
        >
          {copy.primaryLabel}
        </SealButton>
      </div>
    </section>
  );
}
