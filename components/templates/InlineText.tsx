import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import type { TemplateInlineRun } from '@/content/templates';

// Renders a TemplateInlineRun[] as the old <strong>/<code> markup it was
// extracted from (docs/templates.html / docs/templates-ja.html's guide-intro
// and guide-card bodies) — local equivalent of components/okf/InlineText.tsx,
// duplicated per that file's own per-page-family convention.
export function TemplateInline({ runs, ja }: { runs: TemplateInlineRun[]; ja: boolean }) {
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
