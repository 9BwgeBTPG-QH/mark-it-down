import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import { faqCta, type Lang } from '@/content/faq';

const linkClass =
  'text-seal underline decoration-seal/40 underline-offset-2 transition-colors duration-instant ease-out hover:decoration-seal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

// Old docs/faq.html closing CTA section, ported verbatim (#1593 Phase 3-4):
// a heading plus one sentence with two inline links (`Check out
// <a>Troubleshooting</a> or <a>send us feedback</a>.`) — not the button-pair
// CTA used by components/why/Cta.tsx / components/rss/Cta.tsx. No existing
// component in this codebase renders this two-inline-link-sentence shape
// (grep for `.before`/`.between`/`.after` found no consumer), so it's
// composed directly here from content/faq.ts's faqCta fields.
export function Cta({ lang }: { lang: Lang }) {
  const copy = faqCta[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile text-center lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
        <p className={`mt-4 text-ink-2 ${bodyFont}`}>
          {copy.before}
          <a href={navHref(copy.firstSlug, lang)} className={linkClass}>
            {ja ? <Budoux text={copy.firstLabel} /> : copy.firstLabel}
          </a>
          {copy.between}
          <a href={navHref(copy.secondSlug, lang)} className={linkClass}>
            {ja ? <Budoux text={copy.secondLabel} /> : copy.secondLabel}
          </a>
          {copy.after}
        </p>
      </div>
    </section>
  );
}
