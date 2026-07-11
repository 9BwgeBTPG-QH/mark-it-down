import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { templatesCta } from '@/content/templates';
import type { Lang } from '@/content/index';

// Same Chrome Web Store URL as every other Cta.tsx in this codebase;
// duplicated locally per that convention (none of them export a shared
// constant). The old JA source's CTA link had a literal "?hl=ja" query
// param appended to this same URL — dropped here, matching the existing
// non-branching CWS_URL precedent (see components/features/Cta.tsx's own
// comment on this).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Closing CTA from docs/templates.html / docs/templates-ja.html: heading +
// body paragraph (like components/index/Cta.tsx) + a single button (like
// components/features/Cta.tsx, since this already is a dedicated page with
// no "see all templates" secondary link to add) — no version caption line.
// Old CTA button's aria-label and inline gtag() analytics call are both
// dropped, matching every other Cta.tsx in this codebase (SealButton's prop
// type has no aria-label slot; there is no analytics wiring in this rebuild).
export function Cta({ lang }: { lang: Lang }) {
  const copy = templatesCta[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile text-center lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
        <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.body} /> : copy.body}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SealButton href={CWS_URL} lang={lang} variant="primary" target="_blank" rel="noreferrer noopener">
            {copy.buttonLabel}
          </SealButton>
        </div>
      </div>
    </section>
  );
}
