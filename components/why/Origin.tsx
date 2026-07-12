import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import { whyOrigin, type WhyOriginBlock, type WhyOriginLine, type Lang } from '@/content/why';

// Old docs/why.html "The starting point" section (<section aria-labelledby=
// "why-origin-heading">), restored verbatim from eed65be (original-design
// rollback, 2026-07-12): section-label eyebrow, visually hidden h2, and a
// plain why-narrative wrapper div (no dedicated CSS rule for this class in
// either the old or new stylesheet — the old page relies on default block
// styling here) holding the ordered paragraph/blockquote/emphasis blocks
// 1:1 with the old markup's own block boundaries per language. A paragraph
// block can carry a `lines` array instead of `text` to restore the old
// markup's hard <br> within a single <p>, and an individual line can be a
// [before, strong, after] tuple to restore an old inline <strong> span
// embedded within that line (see WhyOriginLine in content/why.ts).
function OriginLine({ line, ja }: { line: WhyOriginLine; ja: boolean }) {
  if (Array.isArray(line)) {
    const [before, strong, after] = line;
    return (
      <>
        {ja ? <Budoux text={before} /> : before}
        <strong>{ja ? <Budoux text={strong} /> : strong}</strong>
        {after && (ja ? <Budoux text={after} /> : after)}
      </>
    );
  }
  return ja ? <Budoux text={line} /> : line;
}

function Block({ block, ja }: { block: WhyOriginBlock; ja: boolean }) {
  if (block.type === 'paragraph' && 'lines' in block)
    return (
      <p>
        {block.lines.map((line, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            <OriginLine line={line} ja={ja} />
          </Fragment>
        ))}
      </p>
    );
  const text = ja ? <Budoux text={block.text} /> : block.text;
  if (block.type === 'blockquote') return <blockquote>{text}</blockquote>;
  if (block.type === 'emphasis')
    return (
      <p>
        <strong>{text}</strong>
      </p>
    );
  return <p>{text}</p>;
}

export function Origin({ lang }: { lang: Lang }) {
  const copy = whyOrigin[lang];
  const ja = lang === 'ja';

  return (
    <section className="philosophy" aria-labelledby="why-origin-heading">
      <span className="section-label">{copy.eyebrow}</span>
      <h2 id="why-origin-heading" className="visually-hidden">
        {copy.eyebrow}
      </h2>
      <div className="why-narrative">
        {copy.blocks.map((block, i) => (
          <Fragment key={i}>
            <Block block={block} ja={ja} />
          </Fragment>
        ))}
      </div>
    </section>
  );
}
