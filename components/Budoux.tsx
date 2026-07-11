import { Fragment } from 'react';
import { loadDefaultJapaneseParser } from 'budoux';

// Server Component (no 'use client'): the parser runs once at SSG time and
// its output is baked into static HTML, so this ships zero client JS.
const parser = loadDefaultJapaneseParser();

export function Budoux({ text }: { text: string }) {
  const phrases = parser.parse(text);
  return (
    // word-break: keep-all is required for <wbr> to matter: CJK text is
    // otherwise breakable between any two characters, so browsers ignore the
    // BudouX boundaries (observed as a mid-word "ノー/ト" break in the rss-ja
    // h1). overflow-wrap: anywhere keeps a phrase longer than the line from
    // overflowing. Scoped to this span so non-Budoux text keeps defaults.
    <span className="break-keep [overflow-wrap:anywhere]">
      {phrases.map((phrase, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {phrase}
        </Fragment>
      ))}
    </span>
  );
}
