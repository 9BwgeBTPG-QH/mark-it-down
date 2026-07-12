import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { changelogCta } from '@/content/changelog';
import type { Lang } from '@/content/index';

// Same Chrome Web Store URL as every other Cta.tsx in this codebase;
// duplicated locally per that convention (none of them export a shared
// constant).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Closing CTA from docs/changelog.html (lines 1644-1652) /
// docs/changelog-ja.html (lines 1651-1659), restored to the original plain
// markup (#1593 Wave R2 Batch 3 fidelity requirement): `.cta-section` ->
// h2 -> p -> `.buttons` with a single primary link — byte-structurally
// identical to components/templates/Cta.tsx's variant, not the two-button
// okf/rss/clipper/why variant. The old primary link opens in the SAME tab
// (no target/rel in the old markup) and has no onclick gtag, so no
// data-ga-cta here — matching components/templates/Cta.tsx. The JA link
// keeps the old source's literal "?hl=ja" query param on the CWS URL, same
// branch as components/templates/Cta.tsx's cwsHref.
export function Cta({ lang }: { lang: Lang }) {
  const copy = changelogCta[lang];
  const ja = lang === 'ja';
  const cwsHref = ja ? `${CWS_URL}?hl=ja` : CWS_URL;

  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <p>{ja ? <Budoux text={copy.body} /> : copy.body}</p>
      <div className="buttons">
        <SealButton href={cwsHref} lang={lang} variant="primary" aria-label={copy.buttonAriaLabel}>
          {copy.buttonLabel}
        </SealButton>
      </div>
    </section>
  );
}
