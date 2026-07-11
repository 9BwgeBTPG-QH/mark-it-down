import { Budoux } from '@/components/Budoux';
import type { Lang } from '@/content/index';
import type { FaqBlock } from '@/content/faq';

interface QuestionBlocksProps {
  lang: Lang;
  blocks: FaqBlock[];
}

// Renders a single FAQ answer's block[] (#1593 Phase 3-4). Only `paragraph`
// and `list` block types exist in content/faq.ts's FaqBlock — no `termList`/
// `group` nesting, unlike components/troubleshooting/ItemBlocks.tsx's
// TroubleshootingBlock. No existing list-block component in this codebase
// renders inline bullet content (components/clipper/FeatureSection.tsx's
// FeatureItemsList renders a title+body item list, a different shape), so
// plain Tailwind list-disc/list-decimal styling is used here. Text color
// (text-ink-2) is inherited from ArchivalAccordion's content wrapper.
export function QuestionBlocks({ lang, blocks }: QuestionBlocksProps) {
  const ja = lang === 'ja';
  const bodyFont = ja ? 'font-sans-ja text-body-ja' : 'font-sans text-body';

  return (
    <div className="space-y-3">
      {blocks.map((block, i) => {
        if (block.type === 'list') {
          const items = block.items.map((item, j) => <li key={j}>{ja ? <Budoux text={item} /> : item}</li>);
          return block.ordered ? (
            <ol key={i} className={`list-decimal space-y-1 pl-6 ${bodyFont}`}>
              {items}
            </ol>
          ) : (
            <ul key={i} className={`list-disc space-y-1 pl-6 ${bodyFont}`}>
              {items}
            </ul>
          );
        }
        return (
          <p key={i} className={bodyFont}>
            {ja ? <Budoux text={block.text} /> : block.text}
          </p>
        );
      })}
    </div>
  );
}
