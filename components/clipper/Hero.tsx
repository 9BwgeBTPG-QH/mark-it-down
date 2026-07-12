import { Budoux } from '@/components/Budoux';
import { clipperContent, type Lang } from '@/content/clipper';

// Old docs/clipper.html hero, restored verbatim to eed65be original design
// (Wave R2 T1, #1593): .hero -> section-label eyebrow -> h1.hero-tagline ->
// hero-subtitle -> hero-ornament divider. Replaces the previous Tailwind
// M&I-token version; the ornament span (dropped in the earlier port) is
// restored to match components/hero/Hero.tsx's treatment on the index page.
export function Hero({ lang }: { lang: Lang }) {
  const copy = clipperContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="clipper-hero-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h1 id="clipper-hero-heading" className="hero-tagline">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-subtitle">{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
      <span className="hero-ornament" aria-hidden="true">
        ~ ~ ~
      </span>
    </section>
  );
}
