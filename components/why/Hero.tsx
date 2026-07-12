import { Budoux } from '@/components/Budoux';
import { BrokenLines } from '@/components/index/BrokenLines';
import { whyContent, type Lang } from '@/content/why';

// Old docs/why.html hero, restored verbatim from eed65be (original-design
// rollback, 2026-07-12): section-label eyebrow "Why" -> h1.hero-tagline
// (unlike index.html's hero, why.html has no separate h1.page-title +
// p.hero-tagline pair — its h1 itself carries the hero-tagline class) ->
// hero-subtitle (BrokenLines restores the old <br> between the two lines)
// -> decorative ~ ~ ~ ornament. No flow strip, no hero-fact, no buttons —
// the old hero has none of these; the closing CTA lives in its own
// cta-section (components/why/Cta.tsx).
export function Hero({ lang }: { lang: Lang }) {
  const copy = whyContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="why-hero-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h1 id="why-hero-heading" className="hero-tagline">
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <p className="hero-subtitle">
        <BrokenLines lines={copy.heroSubtitleLines} ja={ja} />
      </p>
      <span className="hero-ornament" aria-hidden="true">
        ~ ~ ~
      </span>
    </section>
  );
}
