import { Budoux } from '@/components/Budoux';
import { repositoryContent, type Lang } from '@/content/repository';

// Same structure as components/rss/Hero.tsx: .hero -> section-label eyebrow ->
// h1.hero-tagline -> hero-subtitle -> hero-ornament divider, so the page picks
// up app/original.css's hero rules unchanged.
export function Hero({ lang }: { lang: Lang }) {
  const copy = repositoryContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="repository-hero-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h1 id="repository-hero-heading" className="hero-tagline">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-subtitle">{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
      <span className="hero-ornament" aria-hidden="true">
        ~ ~ ~
      </span>
    </section>
  );
}
