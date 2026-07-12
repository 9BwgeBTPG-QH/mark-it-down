import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { templatesCta } from '@/content/templates';
import type { Lang } from '@/content/index';

// Same Chrome Web Store URL as every other Cta.tsx in this codebase;
// duplicated locally per that convention (none of them export a shared
// constant).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Closing CTA, restored verbatim from docs/templates.html / docs/templates-ja.html
// (original-design rollback, #1593 Wave R2 Batch 2): .cta-section -> h2 -> p
// -> .buttons with a single primary link, no version caption line. The old
// primary link opens in the SAME tab (no target/rel in the old markup) and
// has no onclick gtag (unlike okf/clipper/index's CTAs), so no
// data-ga-cta here. The JA link keeps the old source's literal "?hl=ja"
// query param on the CWS URL — same branch as components/index/Cta.tsx's
// cwsHref, not the earlier non-branching draft this file replaces.
export function Cta({ lang }: { lang: Lang }) {
  const copy = templatesCta[lang];
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
