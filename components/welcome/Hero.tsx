import { Budoux } from '@/components/Budoux';
import { welcomeContent, type Lang } from '@/content/welcome';

// Old docs/welcome.html put the page's h1 outside the `.welcome-hero` box,
// with the box itself holding its own h2 ("Thanks for installing") + a
// subtitle paragraph (#1593 Phase 3-5, final group). Kept as two heading
// levels here (h1 then a nested h2) rather than merged into one, matching
// the old page's own hierarchy.
export function Hero({ lang }: { lang: Lang }) {
  const copy = welcomeContent[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
      <h1 className={`text-balance text-h1-mobile text-ink md:text-h1 ${headingFont}`}>
        {ja ? <Budoux text={copy.h1} /> : copy.h1}
      </h1>
      <div className="mt-6 rounded border border-hairline bg-paper-shade p-6">
        <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={copy.heroHeading} /> : copy.heroHeading}</h2>
        <p className={`mt-2 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.heroSubtitle} /> : copy.heroSubtitle}</p>
      </div>
    </section>
  );
}
