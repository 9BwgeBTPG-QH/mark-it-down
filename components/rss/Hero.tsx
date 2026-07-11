import { Budoux } from '@/components/Budoux';
import { rssContent, type Lang } from '@/content/rss';

// Old docs/rss.html hero, ported (#1593 Phase 3-2), same structure as
// components/clipper/Hero.tsx. This is a standard content-page title —
// DESIGN.md's h1/h1-mobile scale (38px/30px), not the display scale reserved
// for the index hero only. The old hero's decorative "~ ~ ~" ornament
// (aria-hidden, no content) is intentionally dropped.
export function Hero({ lang }: { lang: Lang }) {
  const copy = rssContent[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';
  const captionFont = ja ? 'font-sans-ja' : 'font-sans';

  return (
    <section className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
      <p className={`text-caption text-ink-muted ${captionFont}`}>{copy.eyebrow}</p>
      <h1 className={`mt-2 text-balance text-h1-mobile text-ink md:text-h1 ${headingFont}`}>
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
    </section>
  );
}
