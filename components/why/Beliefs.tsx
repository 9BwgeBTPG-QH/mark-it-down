import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import {
  whyBeliefs,
  whyBeliefsIcons,
  type Lang,
  type WhyBeliefLine,
  type WhyBeliefParagraph,
} from '@/content/why';

// Old docs/why.html "What we believe" section (<section aria-labelledby=
// "why-beliefs-heading">), restored verbatim from eed65be (original-design
// rollback, 2026-07-12): section-label eyebrow, visually hidden h2, and a
// philosophy-list of 4 philosophy-item cards. `.philosophy-list:has(>
// :nth-child(4))` in app/original.css already special-cases the 2x2 layout
// for exactly this 4-item list (see that rule's own comment). Each item's
// inline SVG icon comes from content/why.ts's whyBeliefsIcons (positional,
// language-independent path data); `.philosophy-icon`/`.philosophy-icon svg`
// own all sizing/color, so the <svg> itself carries no extra classes.
// `paragraphs` is an array because item index 2 ("Friction, on purpose." /
// "溜め込みには、あえて摩擦を。") has a different paragraph count per
// language (EN 1 / JA 2) — see content/why.ts's own comment. A paragraph can
// also be a WhyBeliefLine[] to restore the old markup's hard <br> within a
// single <p>; a line itself can be a [before, emphasized, after] tuple for
// the one old <em> in this section ("...cognitive processing <em>while you
// write it</em>.").
function Line({ line, ja }: { line: WhyBeliefLine; ja: boolean }) {
  if (Array.isArray(line)) {
    const [before, emphasized, after] = line;
    return (
      <>
        {ja ? <Budoux text={before} /> : before}
        <em>{ja ? <Budoux text={emphasized} /> : emphasized}</em>
        {ja ? <Budoux text={after} /> : after}
      </>
    );
  }
  return ja ? <Budoux text={line} /> : line;
}

function Paragraph({ paragraph, ja }: { paragraph: WhyBeliefParagraph; ja: boolean }) {
  if (typeof paragraph === 'string') return <p>{ja ? <Budoux text={paragraph} /> : paragraph}</p>;
  return (
    <p>
      {paragraph.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          <Line line={line} ja={ja} />
        </Fragment>
      ))}
    </p>
  );
}

export function Beliefs({ lang }: { lang: Lang }) {
  const copy = whyBeliefs[lang];
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby="why-beliefs-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h2 id="why-beliefs-heading" className="visually-hidden">
        {copy.eyebrow}
      </h2>
      <ul className="philosophy-list" role="list">
        {copy.items.map((item, i) => (
          <li key={item.title} className="philosophy-item" role="listitem">
            <div className="philosophy-icon" aria-hidden="true">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d={whyBeliefsIcons[i]} />
              </svg>
            </div>
            <h3>{ja ? <Budoux text={item.title} /> : item.title}</h3>
            {item.paragraphs.map((paragraph, j) => (
              <Paragraph key={j} paragraph={paragraph} ja={ja} />
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
