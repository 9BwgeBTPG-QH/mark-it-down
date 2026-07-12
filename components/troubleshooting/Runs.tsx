import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import type { Run } from '@/content/troubleshooting';

// Renders a Run[] (string | {strong} | {em} | {code}) as the matching inline
// tags, restoring docs/troubleshooting.html's/-ja.html's original
// <strong>/<em>/<code> spans instead of flattening them to plain text
// (#1593 Wave R2 fidelity requirement). Modeled on
// components/okf/InlineText.tsx's OkfInline, extended with an `em` branch.
export function Runs({ runs, ja }: { runs: Run[]; ja: boolean }) {
  return (
    <>
      {runs.map((run, i) => {
        if (typeof run === 'string') {
          return <Fragment key={i}>{ja ? <Budoux text={run} /> : run}</Fragment>;
        }
        if ('strong' in run) {
          return <strong key={i}>{ja ? <Budoux text={run.strong} /> : run.strong}</strong>;
        }
        if ('em' in run) {
          return <em key={i}>{ja ? <Budoux text={run.em} /> : run.em}</em>;
        }
        return <code key={i}>{run.code}</code>;
      })}
    </>
  );
}
