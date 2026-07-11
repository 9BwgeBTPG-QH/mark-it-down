import { Budoux } from '@/components/Budoux';
import { whyContent, type Lang } from '@/content/why';

// Old docs/why.html hero, ported (#1593 Phase 3-3), same structure as
// components/rss/Hero.tsx. The old hero markup does carry a
// `<span class="section-label">Why</span>` above the h1 (confirmed by
// direct read of docs/why.html/why-ja.html, both langs use the same
// untranslated "Why" label), rendered here the same way okf/rss render
// their eyebrow. DESIGN.md's h1/h1-mobile scale (38px/30px), not the
// display scale reserved for the index hero only. The old hero's decorative
// "~ ~ ~" ornament (aria-hidden, no content) is intentionally dropped.
export function Hero({ lang }: { lang: Lang }) {
  const copy = whyContent[lang];
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
