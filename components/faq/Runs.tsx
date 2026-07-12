import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import type { Run } from '@/content/faq';

// Renders a Run[] (string | {strong} | {em} | {code} | {kbd}) as the
// matching inline tags, restoring docs/faq.html's/-ja.html's original
// <strong>/<em>/<code>/<kbd> spans instead of flattening them to plain text
// (#1593 Wave R2 fidelity requirement). Modeled on
// components/troubleshooting/Runs.tsx, extended with a `kbd` branch for
// keyboard-shortcut spans (not Budoux-wrapped — kbd content is literal
// key-combo text, not prose). `strong`'s payload can itself be a Run[]
// (the Command Palette question wraps 3 <kbd> spans in one <strong>), so
// that case recurses into <Runs> instead of rendering a plain string.
export function Runs({ runs, ja }: { runs: Run[]; ja: boolean }) {
  return (
    <>
      {runs.map((run, i) => {
        if (typeof run === 'string') {
          return <Fragment key={i}>{ja ? <Budoux text={run} /> : run}</Fragment>;
        }
        if ('strong' in run) {
          return (
            <strong key={i}>
              {typeof run.strong === 'string' ? (
                ja ? (
                  <Budoux text={run.strong} />
                ) : (
                  run.strong
                )
              ) : (
                <Runs runs={run.strong} ja={ja} />
              )}
            </strong>
          );
        }
        if ('em' in run) {
          return <em key={i}>{ja ? <Budoux text={run.em} /> : run.em}</em>;
        }
        if ('kbd' in run) {
          return <kbd key={i}>{run.kbd}</kbd>;
        }
        return <code key={i}>{run.code}</code>;
      })}
    </>
  );
}
