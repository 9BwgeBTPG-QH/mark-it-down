import { Budoux } from '@/components/Budoux';
import { featuresNotBuilt, type Lang } from '@/content/features';
import { navHref } from '@/content/shared';

// The refusals, between the flow carousel and the 167-item catalogue. Added,
// not ported: the old docs/features.html had no such section, and until now
// the only trace of it on this page was one sentence at the very bottom of the
// CTA — past the point where a reader has already formed a view of what the
// product is. Layer order follows
// $EXT/doc/research/features-page-ia-2026-08.md:198-215.
//
// Markup deliberately reuses classes app/original.css already defines
// (.philosophy, .section-label, .hero-subtitle, .coming-soon-list
// --spaced), so this component ships no <style> block of its own — unlike
// FeaturesPage.tsx or FlowSection.tsx, which each carry one. Two consequences
// worth keeping: four items land in .coming-soon-list's 2-column grid as a
// tidy 2x2 (collapsing to one column under 640px), and no new colour value
// enters the page, so scripts/audit-chroma-budget.mjs sees nothing new to
// account for. The .coming-soon-section-scoped `opacity: 0` reveal rule
// (original.css:778) does not reach a .philosophy-wrapped list, same as in
// components/why/NotBuilt.tsx.
//
// Item markup mirrors that component exactly — `<li><strong>Title</strong> —
// body</li>`, em-dash-joined inline text — because the two lists are the same
// list. This one is the short form; the link at the foot goes to the long one.
export function NotBuilt({ lang }: { lang: Lang }) {
  const copy = featuresNotBuilt[lang];
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby="features-notbuilt-heading">
      <span className="section-label">{copy.eyebrow}</span>
      {/* No features-group class here: that one is the catalogue's stage
          label, and scripts/audit-features-ia.mjs reads every
          h2.features-group as a catalogue group. */}
      <h2 id="features-notbuilt-heading">{ja ? <Budoux text={copy.heading} /> : copy.heading}</h2>
      <p className="hero-subtitle">{ja ? <Budoux text={copy.lead} /> : copy.lead}</p>
      <ul className="coming-soon-list coming-soon-list--spaced" role="list">
        {copy.items.map((item) => (
          <li key={item.title}>
            <strong>{ja ? <Budoux text={item.title} /> : item.title}</strong>
            {' — '}
            {ja ? <Budoux text={item.body} /> : item.body}
          </li>
        ))}
      </ul>
      {/* .faq-more-link is the site's existing "continue reading over there"
          affordance (components/index/FaqPreview.tsx:41 sets the pattern,
          arrow included). */}
      <p className="faq-more-link">
        <a href={`${navHref('why', lang)}#why-notbuilt-heading`}>
          {ja ? <Budoux text={copy.linkLabel} /> : copy.linkLabel} →
        </a>
      </p>
    </section>
  );
}
