import { Budoux } from '@/components/Budoux';
import { faqContent, type Lang } from '@/content/faq';

// Old docs/faq.html/-ja.html hero, restored to the original plain markup
// (#1593 Wave R2 fidelity requirement): `<h1 class="page-title">` comes
// before the `.hero-tagline` eyebrow paragraph, followed by
// `.hero-subtitle` — no Tailwind/M&I classes. Same structure as
// components/troubleshooting/Hero.tsx. See content/faq.ts's faqContent
// comment for the JA h1 zero-width-space-stripping / space-reinsertion note.
export function Hero({ lang }: { lang: Lang }) {
  const copy = faqContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="intro-heading">
      <h1 id="intro-heading" className="page-title">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-tagline">{copy.eyebrow}</p>
      <p className="hero-subtitle">{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
    </section>
  );
}
