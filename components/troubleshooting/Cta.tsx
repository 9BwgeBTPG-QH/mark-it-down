import { Budoux } from '@/components/Budoux';
import { navHref } from '@/content/shared';
import { troubleshootingCta, type Lang } from '@/content/troubleshooting';

// Old docs/troubleshooting.html/-ja.html closing CTA section, restored to
// the original plain markup (#1593 Wave R2 fidelity requirement): a bare
// `<section class="cta-section">` with no wrapping div, matching
// components/faq/Cta.tsx's restored shape.
export function Cta({ lang }: { lang: Lang }) {
  const copy = troubleshootingCta[lang];
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
