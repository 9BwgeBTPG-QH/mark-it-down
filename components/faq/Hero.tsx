import { Budoux } from '@/components/Budoux';
import { faqContent, type Lang } from '@/content/faq';

// Old docs/faq.html hero, ported (#1593 Phase 3-4). Same structure as
// components/why/Hero.tsx: a visible eyebrow caption above the h1, then a
// hero-subtitle paragraph. See content/faq.ts's faqContent comment for the
// JA h1 zero-width-space-stripping / space-reinsertion note.
export function Hero({ lang }: { lang: Lang }) {
  const copy = faqContent[lang];
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
