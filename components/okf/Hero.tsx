import { BrokenLines } from '@/components/index/BrokenLines';
import { Budoux } from '@/components/Budoux';
import { okfContent, type Lang } from '@/content/okf';

// docs/okf.html / docs/okf-ja.html hero, restored verbatim (original-design
// rollback, #1593 Wave R2): `.hero` section with `.section-label` eyebrow,
// `.hero-tagline` h1, `.hero-subtitle` (BrokenLines restores the old <br>
// between the two lines), and the decorative `.hero-ornament` "~ ~ ~" span
// (aria-hidden, no translatable content, hardcoded here).
export function Hero({ lang }: { lang: Lang }) {
  const copy = okfContent[lang];
  const ja = lang === 'ja';

  return (
    <section className="hero" aria-labelledby="okf-hero-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h1 id="okf-hero-heading" className="hero-tagline">
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
