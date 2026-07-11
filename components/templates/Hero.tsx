import { Budoux } from '@/components/Budoux';
import { templatesContent } from '@/content/templates';
import type { Lang } from '@/content/index';

// Same layout as components/features/Hero.tsx (h1 + tagline + subtitle, no
// eyebrow) — docs/templates.html / docs/templates-ja.html's hero has the
// same three-line shape.
export function Hero({ lang }: { lang: Lang }) {
  const copy = templatesContent[lang];
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
