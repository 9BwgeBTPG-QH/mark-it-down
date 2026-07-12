import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import { faqCta, type Lang } from '@/content/faq';

// Old docs/faq.html/-ja.html closing CTA section, restored to the original
// plain markup (#1593 Wave R2 fidelity requirement): a bare
// `<section class="cta-section">` with a heading plus one sentence
// containing two inline links (`Check out <a>Troubleshooting</a> or
// <a>send us feedback</a>.`) — no SealButton, no Tailwind/M&I classes. The
// old HTML has no button element on this page at all, so this deliberately
// follows components/troubleshooting/Cta.tsx's bare two-inline-link
// pattern instead of the SealButton CTA used elsewhere (see final report
// for the rule-6-vs-old-HTML deviation note).
export function Cta({ lang }: { lang: Lang }) {
  const copy = faqCta[lang];
  const ja = lang === 'ja';

  return (
    <section className="cta-section" aria-labelledby="cta-heading">
      <h2 id="cta-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <p>
        {ja ? <Budoux text={copy.before} /> : copy.before}
        <a href={navHref(copy.firstSlug, lang)}>{ja ? <Budoux text={copy.firstLabel} /> : copy.firstLabel}</a>
        {ja ? <Budoux text={copy.between} /> : copy.between}
        <a href={navHref(copy.secondSlug, lang)}>{ja ? <Budoux text={copy.secondLabel} /> : copy.secondLabel}</a>
        {ja ? <Budoux text={copy.after} /> : copy.after}
      </p>
    </section>
  );
}
