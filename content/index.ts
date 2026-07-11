export type Lang = 'en' | 'ja';

interface IndexCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
}

// Placeholder copy: lifted verbatim from the current production docs/index.html
// and docs/index-ja.html (title / meta description / h1). Visual design and
// full page content land in Phase 3 — this only proves the EN/JA page-pair
// structure with shared components.
export const indexContent: Record<Lang, IndexCopy> = {
  en: {
    lang: 'en',
    title: 'Free Local Markdown Editor & Web Clipper — Mark It Down',
    description:
      'Free local-first Chrome extension Markdown editor and Web Clipper for AI answers, web articles, RSS reading, and Git-friendly notes. Writing works offline.',
    h1: 'Free local Markdown editor and Web Clipper',
  },
  ja: {
    lang: 'ja',
    title: '無料・ローカル完結 Markdown エディタ & Web クリッパー — Mark It Down',
    description:
      'AI回答、Web記事、RSSをローカルで書き直す無料のChrome拡張Markdownエディタ。Web Clipper、Git同期、Obsidian風wikilinkに対応。',
    h1: '無料・ローカル完結 Markdown エディタ',
  },
};
