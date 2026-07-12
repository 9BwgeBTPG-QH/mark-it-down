import { Budoux } from '@/components/Budoux';
import { troubleshootingContent, type Lang } from '@/content/troubleshooting';

// Old docs/troubleshooting.html/-ja.html hero, restored to the original
// plain markup (#1593 Wave R2 fidelity requirement): `<h1 class="page-title">`
// comes before the `.hero-tagline` eyebrow paragraph, followed by
// `.hero-subtitle` — no Tailwind/M&I classes. See
// content/troubleshooting.ts's troubleshootingContent comment for why the JA
// h1 needs no zero-width-space reinsertion.
export function Hero({ lang }: { lang: Lang }) {
  const copy = troubleshootingContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="intro-heading">
      <h1 id="intro-heading" className="page-title">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-tagline">{copy.eyebrow}</p>
      <p className="hero-subtitle">{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
    </section>
  );
}
