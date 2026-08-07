export type Lang = 'en' | 'ja';

interface IndexCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  // Hero copy. heroTaglineLines / heroFact were rewritten 2026-07-31 (#1660
  // review follow-up): the tagline now states what the product is, and the
  // three "No ..." claims moved down into heroFact — still the plain
  // `.hero-fact` paragraph, now a single middot-separated line set in
  // --font-mono. heroSubtitleLines remain verbatim from eed65be
  // docs/index.html / index-ja.html. Lines arrays reproduce hard `<br>`
  // breaks (JA with ZWSP stripped — <Budoux> supersedes them).
  heroTaglineLines: string[];
  heroFact: string;
  heroSubtitleLines: string[];
  ctaPrimary: string;
  ctaPrimaryAriaLabel: string;
  ctaSecondary: string;
}

// Copy originally lifted from eed65be docs/index.html and docs/index-ja.html;
// hero tagline/fact revised 2026-07-31 (see IndexCopy comment above).
// title / meta description / h1 are the SEO parity gate — do not edit.
export const indexContent: Record<Lang, IndexCopy> = {
  en: {
    lang: 'en',
    title: 'Free Local Markdown Editor & Web Clipper — Mark It Down',
    description:
      'Free local-first Chrome extension Markdown editor and Web Clipper for AI answers, web articles, RSS reading, and Git-friendly notes. Writing works offline.',
    h1: 'Free local Markdown editor and Web Clipper',
    heroTaglineLines: ['A local Markdown editor', 'for rewriting ideas in your own words.'],
    heroFact: 'No AI writing · No account · No auto-sync',
    heroSubtitleLines: [
      'Bring in AI output, web pages, RSS items, or a blank note.',
      'Rewrite what matters in your own words.',
      'When it is ready, export it or move it through Git.',
    ],
    ctaPrimary: 'Get the extension',
    ctaPrimaryAriaLabel: 'Get the extension for Mark It Down from Chrome Web Store',
    ctaSecondary: 'See how it works',
  },
  ja: {
    lang: 'ja',
    title: '無料・ローカル完結 Markdown エディタ & Web クリッパー — Mark It Down',
    description:
      'AI回答、Web記事、RSSをローカルで書き直す無料のChrome拡張Markdownエディタ。Web Clipper、Git同期、Obsidian風wikilinkに対応。',
    h1: '無料・ローカル完結 Markdown エディタ',
    heroTaglineLines: ['自分の言葉に書き直すための、', 'ローカル Markdown エディタ。'],
    heroFact: 'AI執筆なし · アカウント不要 · 自動同期なし',
    heroSubtitleLines: [
      'AI出力、Web記事、RSS、空白のノートを取り込む。',
      '必要な部分を、自分の言葉に書き直す。',
      'できあがったら、Export または Git で送り出す。',
    ],
    ctaPrimary: '拡張機能を入手',
    ctaPrimaryAriaLabel: 'Chrome Web StoreでMark It Downの拡張機能を入手',
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
// Below-fold index sections, ported verbatim from eed65be docs/index.html /
// docs/index-ja.html (Philosophy, Flow, Screenshot, Workflow, Recently Added,
// FAQ preview, CTA). Old hard `<br>` breaks inside philosophy/flow item
// bodies are reproduced as `bodyLines` arrays. JA zero-width spaces /
// `word-break: keep-all` inline styles are stripped — the <Budoux> component
// supersedes them (DESIGN.md).
export interface IndexListItem {
  title: string;
  body: string;
}

// List item whose old markup had a manual <br> mid-body (philosophy / flow).
export interface IndexBrokenItem {
  title: string;
  bodyLines: string[];
}

// The old FAQ answers bold only their leading sentence
// (`<p><strong>lead</strong> rest</p>`), so the split is content-level.
export interface IndexFaqItem {
  question: string;
  answerLead: string;
  answerRest: string;
}

interface IndexSectionsCopy {
  philosophyEyebrow: string;
  philosophyHeading: string;
  philosophyLedeLines: string[];
  philosophyItems: IndexBrokenItem[];
  flowEyebrow: string;
  flowHeading: string;
  flowIntro: string;
  flowSteps: IndexBrokenItem[];
  screenshotHeading: string;
  screenshotContext: string;
  screenshotIframeTitle: string;
  workflowEyebrow: string;
  workflowHeading: string;
  workflowItems: IndexListItem[];
  recentEyebrow: string;
  recentHeading: string;
  recentStatus: string;
  recentItems: IndexListItem[];
  faqEyebrow: string;
  faqHeading: string;
  faqItems: IndexFaqItem[];
  faqMoreLabel: string;
  ctaHeading: string;
  ctaNote: string;
  ctaVersion: string;
  ctaSecondaryLabel: string;
}

export const indexSections: Record<Lang, IndexSectionsCopy> = {
  en: {
    philosophyEyebrow: 'Philosophy',
    philosophyHeading: 'Philosophy',
    philosophyLedeLines: [
      'We left out AI writing, custom folders, and automatic note sync.',
      'What remains is a local workspace where you rewrite, choose what to keep, and send finished notes out.',
    ],
    philosophyItems: [
      {
        title: 'No AI writing. No automatic note sync.',
        bodyLines: [
          'Use AI beside the editor, not inside it.',
          'You run Git sync only when you decide the note is ready.',
        ],
      },
      {
        title: 'Not storage. Digestion.',
        bodyLines: ["Copy-pasting doesn't make it yours.", 'Rewriting does.'],
      },
      {
        title: 'Local, then intentional.',
        bodyLines: [
          'Autosave keeps the draft nearby.',
          'Export and Git sync happen when you decide the note is ready.',
        ],
      },
    ],
    flowEyebrow: 'Workflow',
    flowHeading: 'Entry → Edit → Move → Exit',
    flowIntro: 'Clipping notes that run in your browser.',
    flowSteps: [
      {
        title: 'Entry',
        bodyLines: ['Paste AI output.', 'Clip a page. Save an RSS item. Start from a blank note.'],
      },
      { title: 'Edit', bodyLines: ['In your own words.', 'Make it yours.'] },
      {
        title: 'Move',
        bodyLines: ['Archive finished work.', 'Template repeatable patterns. Trash what you no longer need.'],
      },
      {
        title: 'Exit',
        bodyLines: ['PDF, DOCX, HTML, EPUB, LaTeX, .md, or Git.', 'Send finished notes where they belong next.'],
      },
    ],
    screenshotHeading: 'Screenshot',
    screenshotContext: 'Explore Mark It Down — browse the slides at your own pace',
    screenshotIframeTitle: 'Mark It Down - Product Overview Slides',
    workflowEyebrow: 'Use Cases',
    workflowHeading: 'How it works in practice',
    workflowItems: [
      {
        title: 'Clip X — article or thread',
        body: 'Right-click an X / Twitter article or thread to capture it, converted to Markdown on the spot.',
      },
      {
        title: 'Daily logs across devices',
        body: 'Title a note with the date (YYYYMMDD) and add memos under /now timestamp headings. Edit it on another device and Git sync flags the conflict — Merge Both combines them into one.',
      },
      {
        title: 'Jot beside the web, focus in a tab',
        body: 'Take notes in the Side Panel while you read, then close it and open the same note in a New Tab to write.',
      },
      {
        title: 'Brain-dump, then reorder',
        body: 'Write a list as it comes to mind, then use Alt+↑ / ↓ to reorder lines into shape.',
      },
      {
        title: 'Language study with read-aloud',
        body: 'Paste study material and play it back — the sentence being read is highlighted as you listen. Want natural voices? Open the text in Microsoft Edge and its Read Aloud adds more high-quality choices.',
      },
    ],
    recentEyebrow: "What's New",
    recentHeading: 'Recently Added',
    recentStatus: 'v2.3.4 — Steadier selection, safer note updates, and reachable Focus controls.',
    recentItems: [
      {
        title: 'Selection stays smooth in link-heavy notes',
        body: 'The formatting toolbar no longer repeatedly repositions itself while text is selected.',
      },
      {
        title: 'Quote metadata survives formatting',
        body: 'Quote Selection keeps its status and quoted date after formatting changes while safe-write protection remains active.',
      },
      {
        title: 'Focus controls remain reachable',
        body: 'The visible Sidebar stays above the header, so Today Entry and other top controls receive normal pointer clicks.',
      },
      {
        title: 'Neighboring header controls stay clickable',
        body: 'After the Sidebar closes, Search and other neighboring header controls remain available.',
      },
    ],
    faqEyebrow: 'FAQ',
    faqHeading: 'Frequently Asked Questions',
    faqItems: [
      {
        question: 'Is Mark It Down free?',
        answerLead: 'Yes, completely free.',
        answerRest: 'No ads, no premium tier, no account required.',
      },
      {
        question: 'Can I use it offline?',
        answerLead: 'Yes, almost everything works offline.',
        answerRest:
          'Creating, editing, searching notes—all work without internet. Only Git sync requires a connection.',
      },
      {
        question: 'Will clearing browser cache delete my notes?',
        answerLead: 'No.',
        answerRest: 'Notes are stored in a dedicated extension storage, separate from browser cache. Your data is safe.',
      },
    ],
    faqMoreLabel: 'View all FAQ',
    ctaHeading: 'Ready to write?',
    ctaNote: 'Available as a Chrome extension. No account required.',
    ctaVersion: 'Latest version: v2.3.4',
    ctaSecondaryLabel: "What's new",
  },
  ja: {
    philosophyEyebrow: 'Philosophy',
    philosophyHeading: '哲学',
    philosophyLedeLines: [
      'AI執筆、カスタムフォルダ、ノートの自動同期は載せなかった。',
      '残したのは、自分で書き直し、残すものを決め、完成したノートを送り出すためのローカルな作業場。',
    ],
    philosophyItems: [
      {
        title: 'AIに書かせる機能も、ノートの自動同期も入れない。',
        bodyLines: [
          'AIはエディタの横で使う。中には入れない。',
          'ノートの準備ができたときだけ、自分で Git 同期を実行する。',
        ],
      },
      {
        title: '保存じゃなくて、咀嚼。',
        bodyLines: ['コピペでは自分のものにならない。', '書き直すことで自分の言葉になる。'],
      },
      {
        title: 'ローカルに保存し、意図して送り出す。',
        bodyLines: [
          '下書きは自動保存で手元に残ります。',
          'Export と Git 同期は、ノートの準備ができたときに実行します。',
        ],
      },
    ],
    flowEyebrow: 'Workflow',
    flowHeading: 'Entry → Edit → Move → Exit',
    flowIntro: 'ブラウザで動作する切り取りメモ。',
    flowSteps: [
      {
        title: 'Entry',
        bodyLines: ['AI出力を貼り付ける。', 'ページをクリップする。RSSを保存する。空白から書く。'],
      },
      { title: 'Edit', bodyLines: ['自分の言葉で。', '自分のものにする。'] },
      {
        title: 'Move',
        bodyLines: ['終わったものはArchiveへ。', '繰り返す型はTemplateへ。不要なものはTrashへ。'],
      },
      {
        title: 'Exit',
        bodyLines: ['PDF、DOCX、HTML、EPUB、LaTeX、.md、Git。', 'できあがったノートを、次の場所へ送ります。'],
      },
    ],
    screenshotHeading: 'スクリーンショット',
    screenshotContext: 'Mark It Downの全体像 — スライドを自分のペースでご覧ください',
    screenshotIframeTitle: 'Mark It Down - 製品紹介スライド',
    workflowEyebrow: 'Use Cases',
    workflowHeading: '実際の使い方',
    workflowItems: [
      {
        title: 'Xを記事でもスレッドでも取り込む',
        body: 'X / Twitterの記事でもスレッドでも、右クリックの取り込みで即Markdownに変換して保存。',
      },
      {
        title: '複数環境の日次ログ',
        body: 'ノートのタイトルを日付（例 YYYYMMDD）にして、メモは /now の時刻見出しで追記。別の端末で編集しても、Git同期が競合を検出し「両方を結合」で1つにまとめられる。',
      },
      {
        title: '横で読みながらメモ、タブで集中',
        body: 'Webを見ながらSide Panelでメモ。閉じてNew Tabで同じノートを開き、じっくり編集。',
      },
      {
        title: '思いつくまま書いて並べ替え',
        body: 'リストを思いつくまま書いて、Alt+↑ / ↓ で行を並べ替えて整える。',
      },
      {
        title: '読み上げとハイライトで語学学習',
        body: '教材を貼り付けて再生すると、読み上げ中の文がハイライトされる。Natural音声で聞きたいときは、Microsoft Edgeの読み上げ機能を使うと高品質な音声の選択肢が増える。',
      },
    ],
    recentEyebrow: "What's New",
    recentHeading: '最近の追加機能',
    recentStatus: 'v2.3.4 — 選択操作の安定化、安全なノート更新、Focus Modeの操作性改善。',
    recentItems: [
      {
        title: 'リンクの多いノートでも滑らかに選択',
        body: 'テキスト選択中に書式ツールバーが位置を繰り返し調整しない。',
      },
      {
        title: '書式変更後も引用メタデータを保持',
        body: 'Quote Selectionは安全な書き込み保護を保ちながら、状態と引用日を維持する。',
      },
      {
        title: 'Focus Modeの操作に届く',
        body: '表示中のSidebarがHeaderより前面に残り、Today Entryなど上部の操作を通常どおりクリックできる。',
      },
      {
        title: '隣接するHeader操作もクリック可能',
        body: 'Sidebarを閉じた後も、Searchなど隣接するHeader操作を使える。',
      },
    ],
    faqEyebrow: 'FAQ',
    faqHeading: 'よくある質問',
    faqItems: [
      {
        question: '無料で使えますか？',
        answerLead: 'はい、完全無料です。',
        answerRest: '広告なし、有料プランなし、アカウント登録も不要です。',
      },
      {
        question: 'オフラインで使えますか？',
        answerLead: 'はい、ほぼすべての機能がオフラインで動作します。',
        answerRest: 'ノートの作成、編集、検索はすべてオフラインで可能。Git同期のみインターネット接続が必要です。',
      },
      {
        question: 'ブラウザのキャッシュを消すとノートも消えますか？',
        answerLead: 'いいえ、消えません。',
        answerRest: 'ノートは拡張機能専用のストレージに保存されており、ブラウザキャッシュとは別です。データは安全です。',
      },
    ],
    faqMoreLabel: 'すべてのFAQを見る',
    ctaHeading: '書き始めませんか？',
    ctaNote: 'Chrome拡張機能で利用可能。アカウント不要。',
    ctaVersion: '最新版: v2.3.4',
    ctaSecondaryLabel: '更新履歴',
  },
};

export const indexJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Mark It Down',
    alternateName: 'Mark It Down — Markdown Editor & Web Clipper',
    description:
      'Chrome extension Markdown editor & Web Clipper for digesting AI output and web articles into your own words. Built around the Entry → Edit → Move → Exit workflow — a workshop for digestion, not a vault for storage. Side Panel and New Tab, Git sync, offline.',
    applicationCategory: 'Productivity',
    applicationSubCategory: 'Markdown Editor',
    browserRequirements: 'Chrome 116+ or Chromium-based browsers',
    audience: { '@type': 'Audience', audienceType: 'AI tool users, knowledge workers, engineers, researchers' },
    operatingSystem: 'Chrome',
    inLanguage: ['en', 'ja'],
    isAccessibleForFree: true,
    keywords:
      'Markdown editor, Chrome extension, Web Clipper, AI output, ChatGPT, Claude, Git sync, side panel, Obsidian compatible, Zenn, Hugo, EPUB export, LaTeX, Mermaid, offline, no telemetry',
    dateModified: '2026-08-06',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    softwareVersion: '2.3.4',
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
      'Reliable first-load rendering for Mermaid diagrams and math blocks',
      'Progressive scheduling keeps large notes responsive while background rendering continues',
      'Readable activity indicators for sync, save, import, and RSS fetch states',
      'Recovery-aware errors for startup, autosave, import/export, Git, RSS, Web Clipper, and editor initialization',
      'Accessible dialog foundation with focus trap, focus return, stacked modal priority, Enter confirmation guards, and theme-safe overlays',
      'Contextual guidance for Today Entry, Omnibox search, Smart Paste, backup status, and key settings',
      'Localized RSS background failure notifications',
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
      'Table grid editor — range selection, row and column operations, formatting, search, sort, and autofill for Markdown tables',
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
      'Chrome 拡張の Markdown エディタ ＆ Web クリッパー。AI 出力や Web 記事を「咀嚼」して自分の言葉に変える作業場。Entry → Edit → Move → Exit のワークフローで、保存ではなく消化を目的とする。Side Panel と New Tab、Git 同期、オフライン対応。',
    applicationCategory: 'Productivity',
    applicationSubCategory: 'Markdownエディタ',
    browserRequirements: 'Chrome 116以降またはChromiumベースブラウザ',
    audience: { '@type': 'Audience', audienceType: 'AIツールユーザー、ナレッジワーカー、エンジニア、研究者' },
    operatingSystem: 'Chrome',
    inLanguage: 'ja',
    isAccessibleForFree: true,
    keywords:
      'Markdownエディタ, Chrome拡張, Webクリッパー, AI出力, ChatGPT, Claude, Git同期, サイドパネル, Obsidian互換, Zenn, Hugo, EPUBエクスポート, LaTeX, Mermaid, オフライン, テレメトリなし',
    dateModified: '2026-08-06',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'JPY',
    },
    softwareVersion: '2.3.4',
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
      'Mermaid図と数式ブロックの初回表示レンダリング安定化',
      '大容量ノートでも裏側の描画を待たずに操作しやすい段階的処理',
      '同期、保存、インポート、RSS取得の読めるアクティビティ表示',
      '起動、auto-save、import/export、Git、RSS、Web Clipper、editor initializationの失敗時に復帰導線を表示',
      'focus trap、focus return、stacked modal priority、Enter confirmation guard、theme-safe overlayを備えた共通ダイアログ基盤',
      'Today Entry、Omnibox検索、Smart Paste、backup status、主要Settingsへ案内するcontextual guidance',
      'RSSバックグラウンド失敗通知の英語/日本語ローカライズ',
      'キーボードファースト設計',
      'オフライン対応',
      '日英バイリンガル',
      'Frontmatter管理（メタデータを本文と分離・エクスポート時に自動合成）',
      'Web Clipper CSSセレクター指定（ページセクションを選んでクリップ）',
      '自動非表示UI（執筆中にヘッダーとツールバーが自動で隠れる）',
      'Git同期ステータスインジケーター',
      'テーブルキーボードナビゲーション（ExcelライクなEnter/Tab/Alt+Enter操作）',
      'テーブルグリッド編集（範囲選択、行・列操作、書式設定、検索、並び替え、オートフィル）',
      '長押し削除（Trashからの完全削除に意思確認）',
      'Web Clipperプレビュー（クリップ前にセクション選択）',
      'サイドバーのホバーカードとプレビューパネル',
      'エクスポートプリセット（YAML/TOML/JSONフロントマター自動付加）',
    ],
  },
};
