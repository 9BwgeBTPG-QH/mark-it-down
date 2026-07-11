export type Lang = 'en' | 'ja';

interface IndexCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  heroLede: string;
  ctaPrimary: string;
  ctaSecondary: string;
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
    heroLede:
      'Some notes are not meant to live in the browser forever. Mark It Down gives them a quiet place to become your words before they leave for export, Git, or a long-term archive.',
    ctaPrimary: 'Get the extension',
    ctaSecondary: 'See how it works',
  },
  ja: {
    lang: 'ja',
    title: '無料・ローカル完結 Markdown エディタ & Web クリッパー — Mark It Down',
    description:
      'AI回答、Web記事、RSSをローカルで書き直す無料のChrome拡張Markdownエディタ。Web Clipper、Git同期、Obsidian風wikilinkに対応。',
    h1: '無料・ローカル完結 Markdown エディタ',
    heroLede:
      'すべてのノートがブラウザに住み続けるわけではありません。Mark It Down は、エクスポートや Git、長期アーカイブへ送り出す前に、自分の言葉へ書き直すための静かな場所です。',
    ctaPrimary: '拡張機能を入手',
    ctaSecondary: '機能を見る',
  },
};
