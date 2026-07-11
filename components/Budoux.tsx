import { Fragment } from 'react';
import { loadDefaultJapaneseParser } from 'budoux';

// Server Component (no 'use client'): the parser runs once at SSG time and
// its output is baked into static HTML, so this ships zero client JS.
const parser = loadDefaultJapaneseParser();

export function Budoux({ text }: { text: string }) {
  const phrases = parser.parse(text);
  return (
    <>
      {phrases.map((phrase, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {phrase}
        </Fragment>
      ))}
    </>
  );
}
