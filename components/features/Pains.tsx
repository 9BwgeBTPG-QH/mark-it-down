import { Budoux } from '@/components/Budoux';
import { featuresPains, type Lang } from '@/content/features';

// The three situations, between the hero and the flow carousel. Added, not
// ported: the old docs/features.html went from the hero straight into the
// stages, so a reader met four verbs before meeting a reason to care about
// them. Layer order follows
// $EXT/doc/research/features-page-ia-2026-08.md:198-233.
//
// Like components/features/NotBuilt.tsx, this reuses classes app/original.css
// already defines (.philosophy, .section-label, .philosophy-list,
// .philosophy-item) and ships no <style> block, so no new colour value enters
// the page and scripts/audit-chroma-budget.mjs has nothing new to account for.
// Three items land in .philosophy-list's auto-fit grid as one row of three
// (original.css:825-830; the :has(> :nth-child(4)) 2x2 override is for the
// four-item lists on /why and does not apply here).
//
// The h2 carries an id but deliberately no features-group class:
// scripts/audit-features-ia.mjs:50 reads every h2.features-group as a
// catalogue group, same reason as NotBuilt.tsx.
//
// Each item is a bare <p> with no heading of its own. The axis names behind
// them (unchewed intake, tool bloat, filing cost) are analysis, not copy —
// naming them here would turn three observations into three accusations.
export function Pains({ lang }: { lang: Lang }) {
  const copy = featuresPains[lang];
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby="features-pains-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h2 id="features-pains-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <ul className="philosophy-list" role="list">
        {copy.items.map((item) => (
          <li className="philosophy-item" key={item}>
            <p>{ja ? <Budoux text={item} /> : item}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
