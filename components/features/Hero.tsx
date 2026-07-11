import { Budoux } from '@/components/Budoux';
import { featuresContent, type Lang } from '@/content/features';

// Old docs/features.html hero, ported (#1593 Phase 3-3). Structurally
// different from components/clipper/Hero.tsx and components/rss/Hero.tsx:
// the old markup has no eyebrow/section-label span before its h1 at all
// (confirmed against docs/clipper.html's <span class="section-label">, which
// docs/features.html does not have), so no caption line is rendered here.
// It does have an extra "hero-tagline" paragraph between the h1 and the
// hero-subtitle paragraph that clipper/rss's hero does not have.
//
// Both hero-subtitle strings had a manual <br> in the old markup, dropped
// and joined into one reflowing string (same precedent as
// content/index.ts's own note on dropping presentational <br> line breaks).
export function Hero({ lang }: { lang: Lang }) {
  const copy = featuresContent[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
      <h1 className={`text-balance text-h1-mobile text-ink md:text-h1 ${headingFont}`}>
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.heroTagline} /> : copy.heroTagline}</p>
      <p className={`mt-2 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
    </section>
  );
}
