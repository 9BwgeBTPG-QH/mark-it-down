import { Fragment } from 'react';
import { loadDefaultJapaneseParser } from 'budoux';

// Server Component (no 'use client'): the parser runs once at SSG time and
// its output is baked into static HTML, so this ships zero client JS.
const parser = loadDefaultJapaneseParser();

// A trailing phrase this short (e.g. 「ない。」) wrapping alone reads as a
// typographic widow — observed on the index-ja hero tagline. Merging it into
// the previous phrase removes that break opportunity; overflow-wrap: anywhere
// below still allows an emergency break if the merged phrase exceeds the line.
const WIDOW_MAX_CHARS = 3;

export function Budoux({ text }: { text: string }) {
  const phrases = parser.parse(text);
  if (phrases.length > 1 && phrases[phrases.length - 1].length <= WIDOW_MAX_CHARS) {
    const widow = phrases.pop() as string;
    phrases[phrases.length - 1] += widow;
  }
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
