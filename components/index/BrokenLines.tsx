import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';

// Reproduces the old markup's hard `<br>` line breaks from a lines array
// (content/index.ts hero copy / IndexBrokenItem). JA lines render through
// <Budoux>, which supersedes the old ZWSP + word-break inline styles
// (DESIGN.md).
export function BrokenLines({ lines, ja }: { lines: string[]; ja: boolean }) {
  return (
    <>
      {lines.map((line, i) => (
        <Fragment key={i}>
          {i > 0 && <br />}
          {ja ? <Budoux text={line} /> : line}
        </Fragment>
      ))}
    </>
  );
}
