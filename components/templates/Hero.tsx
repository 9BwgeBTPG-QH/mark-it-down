import { Budoux } from '@/components/Budoux';
import { templatesContent } from '@/content/templates';
import type { Lang } from '@/content/index';

// docs/templates.html / docs/templates-ja.html's hero, restored verbatim
// (original-design rollback, #1593 Wave R2 Batch 2): h1.page-title +
// p.hero-tagline + p.hero-subtitle inside section.hero. The JA subtitle had
// manually inserted zero-width spaces (U+200B) plus an inline
// word-break/overflow-wrap style for line-break control — both dropped here,
// replaced by <Budoux> (same precedent as every other already-rolled-back
// page's hero).
export function Hero({ lang }: { lang: Lang }) {
  const copy = templatesContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="gallery-heading">
      <h1 id="gallery-heading" className="page-title">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-tagline">{ja ? <Budoux text={copy.heroTagline} /> : copy.heroTagline}</p>
      <p className="hero-subtitle">{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
    </section>
  );
}
