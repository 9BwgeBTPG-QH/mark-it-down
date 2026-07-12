import { Runs } from '@/components/faq/Runs';
import type { Lang } from '@/content/index';
import type { FaqBlock } from '@/content/faq';

interface QuestionBlocksProps {
  lang: Lang;
  blocks: FaqBlock[];
}

// Renders a single FAQ answer's block[], restored to docs/faq.html's/
// -ja.html's original plain markup (#1593 Wave R2 fidelity requirement): no
// Tailwind/M&I classes, no flattened inline tags. Only `paragraph` and
// `list` block types exist in content/faq.ts's FaqBlock. Inline
// <strong>/<em>/<code>/<kbd> spans are restored via components/faq/Runs.tsx,
// matching components/troubleshooting/ItemBlocks.tsx's pattern.
export function QuestionBlocks({ lang, blocks }: QuestionBlocksProps) {
  const ja = lang === 'ja';

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === 'list') {
          const items = block.items.map((item, j) => (
            <li key={j}>
              <Runs runs={item} ja={ja} />
            </li>
          ));
          return block.ordered ? <ol key={i}>{items}</ol> : <ul key={i}>{items}</ul>;
        }
        return (
          <p key={i}>
            <Runs runs={block.runs} ja={ja} />
          </p>
        );
      })}
    </>
  );
}
