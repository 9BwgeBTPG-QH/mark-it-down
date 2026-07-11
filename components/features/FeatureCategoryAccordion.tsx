import { Budoux } from '@/components/Budoux';
import { FeatureItemsList, type FeatureSectionItem } from '@/components/clipper/FeatureSection';
import { FeatureAccordionShell } from '@/components/features/FeatureAccordionShell';
import type { Lang } from '@/content/index';

interface FeatureCategoryAccordionProps {
  lang: Lang;
  index: string;
  eyebrow: string;
  heading: string;
  intro?: string;
  items: FeatureSectionItem[];
  bg: 'paper' | 'paper-shade';
}

// One of the Features page's 11 catalog categories, collapsed by default
// behind FeatureAccordionShell's <details>/<summary> (see that file's
// comment for why components/ArchivalAccordion.tsx doesn't fit directly).
// Renders the same title+body+optional-link item rows as
// components/clipper/FeatureSection.tsx via the shared FeatureItemsList, so
// Clipper/RSS (still flat/expanded, unrelated to this review) and Features
// stay pixel-identical for item rows.
export function FeatureCategoryAccordion({
  lang,
  index,
  eyebrow,
  heading,
  intro,
  items,
  bg,
}: FeatureCategoryAccordionProps) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <FeatureAccordionShell lang={lang} index={index} eyebrow={eyebrow} heading={heading} bg={bg}>
      {intro ? <p className={`text-ink-2 ${bodyFont}`}>{ja ? <Budoux text={intro} /> : intro}</p> : null}
      <FeatureItemsList lang={lang} items={items} className={intro ? 'mt-8' : ''} />
    </FeatureAccordionShell>
  );
}
