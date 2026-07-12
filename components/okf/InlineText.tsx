import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import type { OkfInlineRun } from '@/content/okf';

// Renders an OkfInlineRun[] — a mix of plain text runs and <strong>/<code>
// spans restored from docs/okf.html / docs/okf-ja.html's prose paragraphs
// and mid-section list-item bodies (original-design rollback, #1593 Wave
// R2). Parallels components/welcome/InlineText.tsx but takes a run array
// rather than a single before/mark/after segment, since OKF's paragraphs
// mix multiple <code> spans within one sentence.
export function OkfInline({ runs, ja }: { runs: OkfInlineRun[]; ja: boolean }) {
  return (
    <>
      {runs.map((run, i) => {
        if (typeof run === 'string') {
          return <Fragment key={i}>{ja ? <Budoux text={run} /> : run}</Fragment>;
        }
        if ('strong' in run) {
          return <strong key={i}>{ja ? <Budoux text={run.strong} /> : run.strong}</strong>;
        }
        return <code key={i}>{run.code}</code>;
      })}
    </>
  );
}
