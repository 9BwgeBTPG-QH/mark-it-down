import { Budoux } from '@/components/Budoux';
import { changelogContent, type Lang } from '@/content/changelog';

// Old docs/changelog.html / docs/changelog-ja.html hero, restored to the
// original plain markup (#1593 Wave R2 Batch 3 fidelity requirement):
// `<h1 class="page-title">` comes before the `.hero-tagline` paragraph,
// followed by `.hero-subtitle` — no Tailwind/M&I classes, no separate
// eyebrow span. Same structure as components/troubleshooting/Hero.tsx /
// components/features/Hero.tsx.
export function Hero({ lang }: { lang: Lang }) {
  const copy = changelogContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="intro-heading">
      <h1 id="intro-heading" className="page-title">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-tagline">{ja ? <Budoux text={copy.eyebrow} /> : copy.eyebrow}</p>
      <p className="hero-subtitle">{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
    </section>
  );
}
