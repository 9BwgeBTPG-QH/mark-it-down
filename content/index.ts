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

// SoftwareApplication JSON-LD, ported verbatim (field-for-field) from the
// current production docs/index.html and docs/index-ja.html
// `<script type="application/ld+json">` blocks. The SEO parity gate
// (chorme_mark-it-down#1593 Phase 4 / doc/audit/extract-seo-baseline-*.mjs)
// only diffs `@type` and `softwareVersion`, but the full object is kept
// intact rather than trimmed so each language page's structured data stays
// factually accurate (JA has its own description/featureList/currency, not
// an EN reuse). Update alongside CLAUDE.md's "Version Updates" step 3
// (`softwareVersion` / `dateModified`) on release.
export const indexJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mark It Down',
    alternateName: 'Mark It Down — Markdown Editor & Web Clipper',
    description:
      'Chrome extension Markdown editor & Web Clipper for digesting AI output and web articles into your own words. Built around the Entry → Edit → Clear → Exit workflow — a workshop for digestion, not a vault for storage. Side Panel and New Tab, Git sync, offline.',
    applicationCategory: 'Productivity',
    applicationSubCategory: 'Markdown Editor',
    browserRequirements: 'Chrome 116+ or Chromium-based browsers',
    audience: { '@type': 'Audience', audienceType: 'AI tool users, knowledge workers, engineers, researchers' },
    operatingSystem: 'Chrome',
    inLanguage: ['en', 'ja'],
    isAccessibleForFree: true,
    keywords:
      'Markdown editor, Chrome extension, Web Clipper, AI output, ChatGPT, Claude, Git sync, side panel, Obsidian compatible, Zenn, Hugo, EPUB export, LaTeX, Mermaid, offline, no telemetry',
    dateModified: '2026-07-04',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareVersion: '2.2.10',
    author: {
      '@type': 'Person',
      name: 'Mark It Down Developer',
    },
    sameAs: [
      'https://github.com/9BwgeBTPG-QH/mark-it-down',
      'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke',
    ],
    screenshot: 'https://markitdown.reduktion.dev/en-dark.png',
    url: 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke',
    installUrl: 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke',
    downloadUrl: 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke',
    featureList: [
      'Web Clipper — right-click to save any page or AI chat as Markdown',
      'RSS Reader — read feeds, open articles, and save selected items to Inbox',
      'OPML import/export for moving RSS subscriptions between readers',
      'RSS Git sync — keep feed lists and denylist settings across devices',
      'Markdown editing with live preview',
      'Dual mode: New Tab and Side Panel',
      'Git synchronization (GitHub, GitLab)',
      'Export to PDF (with page numbers and TOC), DOCX, PNG, standalone HTML, EPUB, and LaTeX',
      '4 themes: Light, Dark, Parchment, CandleLight',
      'Focus Mode with typewriter scroll',
      'Mermaid diagram and LaTeX math support',
      'Keyboard-first design',
      'Offline support',
      'Bilingual (English/Japanese)',
      'Portability Hub — convert to Obsidian, Hugo, Jekyll, Docusaurus, MkDocs, Zenn, or Qiita syntax',
      'Copy as CommonMark, GFM, Hugo, or Obsidian before publishing',
      'Chat Format Smart Paste — auto-convert Slack, Discord, and WhatsApp pastes',
      'Frontmatter support — manage metadata separately from note body',
      'Web Clipper CSS selector targeting for precise page section clipping',
      'Auto-hide UI — header and toolbar hide while writing',
      'Git sync status indicator in sidebar',
      'Table keyboard navigation — Excel-like Enter/Tab/Alt+Enter cell movement',
      'Hold-to-delete — deliberate press-and-hold to permanently remove notes',
      'Web Clipper preview — select sections before saving a clip',
      'Sidebar hover cards and preview panel for checking notes before opening',
      'Export presets — auto-attach YAML/TOML/JSON frontmatter on export',
    ],
  },
  ja: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mark It Down',
    alternateName: 'Mark It Down — Markdown エディタ & Web クリッパー',
    description:
      'Chrome 拡張の Markdown エディタ ＆ Web クリッパー。AI 出力や Web 記事を「咀嚼」して自分の言葉に変える作業場。Entry → Edit → Clear → Exit のワークフローで、保存ではなく消化を目的とする。Side Panel と New Tab、Git 同期、オフライン対応。',
    applicationCategory: 'Productivity',
    applicationSubCategory: 'Markdownエディタ',
    browserRequirements: 'Chrome 116以降またはChromiumベースブラウザ',
    audience: { '@type': 'Audience', audienceType: 'AIツールユーザー、ナレッジワーカー、エンジニア、研究者' },
    operatingSystem: 'Chrome',
    inLanguage: 'ja',
    isAccessibleForFree: true,
    keywords:
      'Markdownエディタ, Chrome拡張, Webクリッパー, AI出力, ChatGPT, Claude, Git同期, サイドパネル, Obsidian互換, Zenn, Hugo, EPUBエクスポート, LaTeX, Mermaid, オフライン, テレメトリなし',
    dateModified: '2026-07-04',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    softwareVersion: '2.2.10',
    author: {
      '@type': 'Person',
      name: 'Mark It Down Developer',
    },
    sameAs: [
      'https://github.com/9BwgeBTPG-QH/mark-it-down',
      'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke',
    ],
    downloadUrl: 'https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke',
    featureList: [
      'ライブプレビュー付きMarkdown編集',
      'RSS Reader（フィードを読み、必要な記事だけInboxへ保存）',
      'OPMLインポート/エクスポート（RSS購読リストを他のリーダーと移行）',
      'RSS Git同期（feeds / denylist設定を端末間で共有）',
      'デュアルモード：新しいタブとサイドパネル',
      'Web Clipper（右クリックでページをMarkdownに変換）',
      'Portability Hub（Zenn・Hugo・Obsidian 等8プラットフォームへの記法変換）',
      'CommonMark・GFM・Hugo・Obsidian向けコピー',
      'Chat Format Smart Paste（Slack・Discord・WhatsApp の自動正規化）',
      'Git同期（GitHub、GitLab対応）',
      'PDF（ページ番号・目次付き）・DOCX・PNG・HTML・EPUB・LaTeXエクスポート',
      '4テーマ：Light、Dark、Parchment、CandleLight',
      'Focus Mode（タイプライタースクロール）',
      'Mermaidダイアグラム・LaTeX数式対応',
      'キーボードファースト設計',
      'オフライン対応',
      '日英バイリンガル',
      'Frontmatter管理（メタデータを本文と分離・エクスポート時に自動合成）',
      'Web Clipper CSSセレクター指定（ページセクションを選んでクリップ）',
      '自動非表示UI（執筆中にヘッダーとツールバーが自動で隠れる）',
      'Git同期ステータスインジケーター',
      'テーブルキーボードナビゲーション（ExcelライクなEnter/Tab/Alt+Enter操作）',
      '長押し削除（Trashからの完全削除に意思確認）',
      'Web Clipperプレビュー（クリップ前にセクション選択）',
      'サイドバーのホバーカードとプレビューパネル',
      'エクスポートプリセット（YAML/TOML/JSONフロントマター自動付加）',
    ],
  },
};
