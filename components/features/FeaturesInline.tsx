import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import type { FeaturesInlineRun } from '@/content/features';

// Restores the old docs/features.html inline tags (<code>, <kbd>) that a
// plain-string content model would collapse. Mirrors components/okf/
// InlineText.tsx's OkfInline, but Features' inline runs carry {code} / {kbd}
// instead of {strong} (the old markup never bolds inline text mid-sentence
// here — <strong> is reserved for the leading item title).
export function FeaturesInline({ runs, ja }: { runs: FeaturesInlineRun[]; ja: boolean }) {
  return (
    <>
      {runs.map((run, i) => {
        if (typeof run === 'string') {
          return <Fragment key={i}>{ja ? <Budoux text={run} /> : run}</Fragment>;
        }
        if ('code' in run) {
          return <code key={i}>{run.code}</code>;
        }
        return <kbd key={i}>{run.kbd}</kbd>;
      })}
    </>
  );
}
