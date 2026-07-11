import { Budoux } from '@/components/Budoux';
import { SealButton } from '@/components/SealButton';
import { navHref } from '@/content/shared';
import { clipperSections, type Lang } from '@/content/clipper';

// Same Chrome Web Store URL as components/index/Cta.tsx and
// components/hero/Hero.tsx; duplicated locally per those files' own
// convention (neither exports a site-wide constant).
const CWS_URL = 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke';

// Old docs/clipper.html closing CTA section, ported verbatim (#1593 Phase
// 3-2). Unlike the index page's CTA, the old clipper CTA has no note/version
// line — just heading + two buttons. The old primary button's inline
// gtag() cta_click is restored as data-ga-cta, fired by GoogleAnalytics'
// delegated listener (#1593 Phase 4). Secondary button
// targets features.html / features-ja.html, matching the old page.
export function Cta({ lang }: { lang: Lang }) {
  const copy = clipperSections[lang].cta;
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile text-center lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <SealButton
            href={CWS_URL}
            lang={lang}
            variant="primary"
            target="_blank"
            rel="noreferrer noopener"
            data-ga-cta={ja ? 'clipper-ja' : 'clipper'}
          >
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
