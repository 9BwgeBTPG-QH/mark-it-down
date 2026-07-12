import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import type { ChangelogRun } from '@/content/changelog';

// Renders a ChangelogRun[] (string | {code}) as the matching inline tags,
// restoring docs/changelog.html's/-ja.html's original <code> spans instead
// of flattening them to plain text (#1593 Wave R2 Batch 3 fidelity
// requirement). Modeled on components/troubleshooting/Runs.tsx, narrowed to
// this page's only inline-run variant (see content/changelog.ts's
// ChangelogRun comment for why <strong>/<em>/<kbd>/<br> are not runs here).
export function Runs({ runs, ja }: { runs: ChangelogRun[]; ja: boolean }) {
  return (
    <>
      {runs.map((run, i) => {
        if (typeof run === 'string') {
          return <Fragment key={i}>{ja ? <Budoux text={run} /> : run}</Fragment>;
        }
        return <code key={i}>{run.code}</code>;
      })}
    </>
  );
}
