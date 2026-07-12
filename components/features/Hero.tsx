import { BrokenLines } from '@/components/index/BrokenLines';
import { Budoux } from '@/components/Budoux';
import { featuresContent, type Lang } from '@/content/features';

// Old docs/features.html hero, restored verbatim to eed65be's .hero /
// .page-title / .hero-tagline / .hero-subtitle markup (#1593 Wave R2
// Batch 2). No eyebrow/section-label span before the h1 (confirmed against
// docs/clipper.html's <span class="section-label">, which docs/features.html
// does not have). The hero-subtitle's old manual <br> is restored via
// BrokenLines from copy.heroSubtitleLines (same pattern as components/why/
// Origin.tsx's lines[] fields), not collapsed into one reflowing string.
export function Hero({ lang }: { lang: Lang }) {
  const copy = featuresContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="intro-heading">
      <h1 id="intro-heading" className="page-title">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-tagline">{ja ? <Budoux text={copy.heroTagline} /> : copy.heroTagline}</p>
      <p className="hero-subtitle">
        <BrokenLines lines={copy.heroSubtitleLines} ja={ja} />
      </p>
    </section>
  );
}
