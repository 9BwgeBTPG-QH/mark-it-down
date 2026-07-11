import { Budoux } from '@/components/Budoux';
import { FeatureItemsList } from '@/components/clipper/FeatureSection';
import { templatesGuide } from '@/content/templates';
import type { Lang } from '@/content/index';

// "Make it your own" guide section from docs/templates.html /
// docs/templates-ja.html. The old markup has no eyebrow caption above this
// heading (unlike Clipper/RSS/Features sections), so this renders a bespoke
// heading+intro block rather than components/clipper/FeatureSection.tsx's
// full FeatureSection (which always renders an eyebrow). It reuses that
// module's exported FeatureItemsList for the two guide cards, since that
// part of the layout (hairline-divided title+body list) is identical.
export function Guide({ lang }: { lang: Lang }) {
  const copy = templatesGuide[lang];
  const ja = lang === 'ja';
  const headingFont = ja ? 'font-serif-ja' : 'font-serif';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <section className="border-t border-hairline bg-paper">
      <div className="mx-auto max-w-content px-4 py-section-mobile lg:px-8 lg:py-section">
        <h2 className={`text-h2 text-ink ${headingFont}`}>{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
        <p className={`mt-4 text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={copy.intro} /> : copy.intro}</p>
        <FeatureItemsList lang={lang} items={copy.cards} />
      </div>
    </section>
  );
}
