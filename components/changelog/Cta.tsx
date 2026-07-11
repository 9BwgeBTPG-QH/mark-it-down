import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { changelogCta } from '@/content/changelog';
import type { Lang } from '@/content/index';

// Same Chrome Web Store URL as every other Cta.tsx in this codebase;
// duplicated locally per that convention (none of them export a shared
// constant). The old JA source's CTA link had a literal "?hl=ja" query
// param appended to this same URL — dropped here, matching the existing
// non-branching CWS_URL precedent (see components/templates/Cta.tsx's own
// comment on this).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Closing CTA from docs/changelog.html (lines 1644-1652) /
// docs/changelog-ja.html (lines 1651-1659): heading + body paragraph +
// single button — byte-structurally identical to
// components/templates/Cta.tsx's variant, not the two-button
// okf/rss/clipper/why variant. No secondary link, no version caption line.
export function Cta({ lang }: { lang: Lang }) {
  const copy = changelogCta[lang];
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
