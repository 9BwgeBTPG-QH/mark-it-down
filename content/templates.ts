export type { Lang } from './index';
import type { Lang } from './index';

interface TemplatesCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  heroTagline: string;
  heroSubtitle: string;
}

// Hero + meta copy lifted verbatim from docs/templates.html / docs/templates-ja.html
// (title / meta description / h1 / hero tagline / hero subtitle). JA hero
// subtitle had manually inserted zero-width spaces (U+200B) for line-break
// control, which the new <Budoux> component replaces (same precedent as
// content/clipper.ts's own note on this).
//
// The meta description says "38" templates in both languages even though the
// grid below has 39 cards (confirmed against doc/audit/seo-baseline-2026-07-11.json's
// stored metaDescription for this page) — a pre-existing inconsistency in the
// old source, ported verbatim rather than silently corrected (see final report).
export const templatesContent: Record<Lang, TemplatesCopy> = {
  en: {
    lang: 'en',
    title: 'Markdown Template Gallery — Mark It Down',
    description:
      '38 Markdown templates for Mark It Down: AI, productivity, journaling, development, content, and thinking templates for a local-first writing workflow.',
    h1: 'Markdown Template Gallery',
    heroTagline: 'Template Gallery',
    heroSubtitle: 'Start with structure, not a blank page.',
  },
  ja: {
    lang: 'ja',
    title: 'Markdownテンプレートギャラリー — Mark It Down',
    description:
      'Mark It Down用の38のMarkdownテンプレート。AI、生産性、ジャーナリング、開発、コンテンツ、思考の6カテゴリ。ローカルファーストな執筆ワークフローのために。',
    h1: 'Markdownテンプレートギャラリー',
    heroTagline: 'テンプレートギャラリー',
    heroSubtitle: '白紙からではなく、構造から始めよう。',
  },
};

// Inline run for paragraphs mixing plain text with <strong>/<code> emphasis
// — same shape as content/okf.ts's OkfInlineRun, duplicated locally since
// that type isn't exported for cross-page-family reuse (established
// per-page-family convention; see components/okf/InlineText.tsx). Rendered
// by components/templates/InlineText.tsx.
export type TemplateInlineRun = string | { strong: string } | { code: string };

export interface TemplateGuideCard {
  title: string;
  body: TemplateInlineRun[];
}

interface TemplateGuideCopy {
  heading: string;
  intro: TemplateInlineRun[];
  cards: TemplateGuideCard[];
}

// "Make it your own" guide section, ported verbatim from docs/templates.html /
// docs/templates-ja.html, including the old markup's inline <strong>/<code>
// emphasis (kept as TemplateInlineRun[] runs rather than flattened to plain
// text — restored per #1593 Wave R2 Batch 2's full-fidelity requirement).
// The old <code>#&nbsp;YYYY-MM-DD</code> / <code>YYYY-MM-DD&nbsp;HH:MM</code>
// spans keep their literal text with a plain space (the &nbsp; only
// prevented an awkward line break inside the old CSS layout).
export const templatesGuide: Record<Lang, TemplateGuideCopy> = {
  en: {
    heading: 'Make it your own',
    intro: [
      'Three ways to bring a template in. ',
      { strong: 'Copy Markdown' },
      ' grabs the whole thing; ',
      { strong: '↗ Raw' },
      ' lets you pick just the sections you need — for either, keep Mark It Down open in the ',
      { strong: 'Side Panel' },
      ' while you browse and paste straight in. Or use the ',
      { strong: 'Web Clipper' },
      ': clip the template view and Mark It Down opens automatically, no setup needed.',
    ],
    cards: [
      {
        title: 'Daily notes from a “Today” template',
        body: [
          'Create a note named ',
          { strong: 'Today' },
          ' (case-insensitive) in the ',
          { strong: 'Template' },
          ' folder. When you run ',
          { strong: 'Create today’s entry' },
          ' in the Side Panel or New Tab, its body is inserted beneath a ',
          { code: '# YYYY-MM-DD' },
          ' heading — so each day starts from your own structure. The template’s top heading is dropped; the date is the only thing filled in (no other placeholders).',
        ],
      },
      {
        title: 'Tip — timestamp headings for logs',
        body: [
          'Type ',
          { code: '/now' },
          ', or run ',
          { strong: 'Insert Timestamp Heading' },
          ' from the command palette, to drop a ',
          { code: 'YYYY-MM-DD HH:MM' },
          ' heading at the cursor. Pick H2 or H3 under ',
          { strong: 'Settings → Editor → Formatting → Timestamp Heading' },
          ' (default H2). The headings flow into the table of contents, turning a day’s log into a clickable timeline — pairs well with a Today template.',
        ],
      },
    ],
  },
  ja: {
    heading: '自分仕様にする',
    intro: [
      '取り込み方は3通り。',
      { strong: 'Copy Markdown' },
      ' でまるごとコピー、',
      { strong: '↗ Raw' },
      ' を開いて必要な部分だけコピー — どちらもサイドパネルで Mark It Down を横に開いておけば、見ながらそのまま貼り付けられます。',
      { strong: 'Web Clipper' },
      ' ならテンプレート表示画面をクリップすると同時にサイドパネルが開くので、事前の準備は不要です。',
    ],
    cards: [
      {
        title: '「Today」テンプレートで一日を始める',
        body: [
          { strong: 'Template' },
          ' フォルダに ',
          { strong: 'Today' },
          '（大文字小文字は問いません）という名前のノートを置きます。サイドパネルや新しいタブで ',
          { strong: '「今日のエントリーを作成」' },
          ' を実行すると、その本文が ',
          { code: '# YYYY-MM-DD' },
          ' 見出しの下に挿入され、毎日あなた自身のひな型から書き始められます。テンプレート先頭の見出しは取り除かれ、差し込まれるのは日付だけです（ほかの変数はありません）。',
        ],
      },
      {
        title: 'Tip — ログ向けのタイムスタンプ見出し',
        body: [
          { code: '/now' },
          ' と入力するか、コマンドパレットで ',
          { strong: '「タイムスタンプ見出しを挿入」' },
          ' を実行すると、',
          { code: 'YYYY-MM-DD HH:MM' },
          ' 形式の見出しがカーソル位置に挿入されます。見出しレベル（H2 / H3）は ',
          { strong: '設定 → エディタ → フォーマット → タイムスタンプ見出し' },
          ' で変更できます（デフォルト H2）。見出しは目次に並ぶので、その日のログがクリックできるタイムラインになります。Todayテンプレートと組み合わせると便利です。',
        ],
      },
    ],
  },
};

export type TemplateCategory = 'ai' | 'productivity' | 'journaling' | 'dev' | 'content' | 'thinking';

export const templateCategoryLabels: Record<Lang, Record<TemplateCategory, string>> = {
  en: {
    ai: 'AI',
    productivity: 'Productivity',
    journaling: 'Journaling',
    dev: 'Dev',
    content: 'Content',
    thinking: 'Thinking',
  },
  ja: {
    ai: 'AI',
    productivity: '生産性',
    journaling: 'ジャーナリング',
    dev: '開発',
    content: 'コンテンツ',
    thinking: '思考',
  },
};

export interface TemplateCard {
  slug: string;
  category: TemplateCategory;
  title: string;
  description: string;
}

// 39-card catalog, ported verbatim from docs/templates.html / docs/templates-ja.html
// (category / title / description / slug). One source-level note:
//
// The EN and JA source pages order the Productivity category differently:
//    EN has "YWT Retrospective" last (after RACI Matrix), JA has "YWT振り返り"
//    third from top (right after KPT). This is a genuine pre-existing
//    inconsistency between the two old pages, preserved per-language as-is
//    rather than forcibly re-synced — see final report.
export const templateCards: Record<Lang, TemplateCard[]> = {
  en: [
    // AI (5)
    {
      slug: 'ai/llm-output-organizer',
      category: 'ai',
      title: 'LLM Output Organizer',
      description: 'Capture, rewrite, and act on LLM responses',
    },
    {
      slug: 'ai/prompt-library',
      category: 'ai',
      title: 'Prompt Library',
      description: 'Catalog and rate your most-used prompts',
    },
    {
      slug: 'ai/ai-conversation-archive',
      category: 'ai',
      title: 'AI Conversation Archive',
      description: 'Preserve multi-turn conversations with context',
    },
    {
      slug: 'ai/llm-output-rewrite',
      category: 'ai',
      title: 'LLM Output Rewrite',
      description: 'Rewrite AI output in your own words',
    },
    {
      slug: 'ai/ai-summary-knowledge-note',
      category: 'ai',
      title: 'AI Summary to Knowledge Note',
      description: 'Convert AI summaries into permanent notes',
    },
    // Productivity (13)
    {
      slug: 'productivity/daily-note',
      category: 'productivity',
      title: 'Daily Note',
      description: 'Daily journal with focus, tasks, and reflection',
    },
    {
      slug: 'productivity/today',
      category: 'productivity',
      title: 'Today',
      description: 'Auto-applies as your daily layout when saved as "Today" in the Template folder',
    },
    {
      slug: 'productivity/weekly-review',
      category: 'productivity',
      title: 'Weekly Review',
      description: 'Reflect on the week and plan ahead',
    },
    {
      slug: 'productivity/zettelkasten-atomic-note',
      category: 'productivity',
      title: 'Zettelkasten Atomic Note',
      description: 'One idea per note for knowledge building',
    },
    {
      slug: 'productivity/book-review',
      category: 'productivity',
      title: 'Book Review',
      description: 'Structured reading review with quotes and rating',
    },
    {
      slug: 'productivity/meeting-notes',
      category: 'productivity',
      title: 'Meeting Notes',
      description: 'Structured meeting capture with action items',
    },
    {
      slug: 'productivity/kpt-retrospective',
      category: 'productivity',
      title: 'KPT Retrospective',
      description: 'Keep, Problem, Try — structured sprint retrospective',
    },
    {
      slug: 'productivity/start-stop-continue',
      category: 'productivity',
      title: 'Start-Stop-Continue',
      description: 'Simple behavior change retrospective framework',
    },
    {
      slug: 'productivity/four-ls-retrospective',
      category: 'productivity',
      title: '4Ls Retrospective',
      description: 'Liked, Learned, Lacked, Longed for — positive reflection',
    },
    {
      slug: 'productivity/starfish-retrospective',
      category: 'productivity',
      title: 'Starfish Retrospective',
      description: 'Five-point deep analysis for team improvement',
    },
    {
      slug: 'productivity/okr',
      category: 'productivity',
      title: 'OKR',
      description: 'Objectives and Key Results for quarterly goal setting',
    },
    {
      slug: 'productivity/raci-matrix',
      category: 'productivity',
      title: 'RACI Matrix',
      description: 'Responsibility assignment matrix for role clarity',
    },
    {
      slug: 'productivity/ywt-retrospective',
      category: 'productivity',
      title: 'YWT Retrospective',
      description: 'Reflect on what you did, what you learned, and what to do next',
    },
    // Journaling (4)
    {
      slug: 'journaling/five-minute-journal',
      category: 'journaling',
      title: 'Five Minute Journal',
      description: 'Morning gratitude and evening reflection prompts',
    },
    {
      slug: 'journaling/stoic-journal',
      category: 'journaling',
      title: 'Stoic Journal',
      description: 'Set intentions and review actions with clarity',
    },
    {
      slug: 'journaling/daily-reflection',
      category: 'journaling',
      title: 'Daily Reflection',
      description: 'Three short prompts to close out the day',
    },
    {
      slug: 'journaling/cbt-thought-record',
      category: 'journaling',
      title: 'CBT Thought Record',
      description: 'Separate thoughts, emotions, and actions for reflection',
    },
    // Dev (5)
    {
      slug: 'dev/readme-template',
      category: 'dev',
      title: 'README Template',
      description: 'Project README with quick start and API reference',
    },
    {
      slug: 'dev/changelog',
      category: 'dev',
      title: 'Changelog',
      description: 'Keep a Changelog format version history',
    },
    {
      slug: 'dev/adr',
      category: 'dev',
      title: 'Architecture Decision Record',
      description: 'Lightweight ADR for technical decisions',
    },
    {
      slug: 'dev/api-documentation',
      category: 'dev',
      title: 'API Documentation',
      description: 'REST API endpoint documentation',
    },
    {
      slug: 'dev/rfc',
      category: 'dev',
      title: 'RFC (Request for Comments)',
      description: 'Design proposal with alternatives and review process',
    },
    // Content (2)
    {
      slug: 'content/blog-post-draft',
      category: 'content',
      title: 'Blog Post Draft',
      description: 'Outline and draft a blog post',
    },
    {
      slug: 'content/technical-article',
      category: 'content',
      title: 'Technical Article',
      description: 'Step-by-step technical tutorial',
    },
    // Thinking (10)
    {
      slug: 'thinking/problem-statement',
      category: 'thinking',
      title: 'Problem Statement',
      description: 'Define a problem with impact and constraints',
    },
    {
      slug: 'thinking/decision-log',
      category: 'thinking',
      title: 'Decision Log',
      description: 'Record decisions with context and rationale',
    },
    {
      slug: 'thinking/five-whys-analysis',
      category: 'thinking',
      title: 'Five Whys Analysis',
      description: 'Root cause analysis using the 5 Whys method',
    },
    {
      slug: 'thinking/project-brief',
      category: 'thinking',
      title: 'Project Brief',
      description: 'Project overview with scope, timeline, and risks',
    },
    {
      slug: 'thinking/fishbone-diagram',
      category: 'thinking',
      title: 'Fishbone Diagram',
      description: 'Ishikawa cause-and-effect root cause analysis',
    },
    {
      slug: 'thinking/eight-d-report',
      category: 'thinking',
      title: '8D Report',
      description: 'Eight-discipline structured problem-solving report',
    },
    {
      slug: 'thinking/fmea',
      category: 'thinking',
      title: 'FMEA',
      description: 'Failure mode and effects analysis with RPN scoring',
    },
    {
      slug: 'thinking/fta',
      category: 'thinking',
      title: 'FTA (Fault Tree Analysis)',
      description: 'Top-down failure decomposition with AND/OR gates',
    },
    {
      slug: 'thinking/is-is-not-analysis',
      category: 'thinking',
      title: 'Is / Is Not Analysis',
      description: 'Define problem boundaries by elimination',
    },
    {
      slug: 'thinking/decision-matrix',
      category: 'thinking',
      title: 'Decision Matrix',
      description: 'Weighted multi-criteria evaluation for structured decisions',
    },
  ],
  ja: [
    // AI (5)
    {
      slug: 'ai/llm-output-organizer',
      category: 'ai',
      title: 'LLM出力オーガナイザー',
      description: 'LLMの出力を整理・書き直し・アクションに変換',
    },
    {
      slug: 'ai/prompt-library',
      category: 'ai',
      title: 'プロンプトライブラリ',
      description: 'よく使うプロンプトをカタログ化・評価',
    },
    {
      slug: 'ai/ai-conversation-archive',
      category: 'ai',
      title: 'AI会話アーカイブ',
      description: 'マルチターン会話をコンテキストと共に保存',
    },
    {
      slug: 'ai/llm-output-rewrite',
      category: 'ai',
      title: 'LLM出力リライト',
      description: 'AIの出力を自分の言葉で書き直す',
    },
    {
      slug: 'ai/ai-summary-knowledge-note',
      category: 'ai',
      title: 'AI要約→ナレッジノート',
      description: 'AI要約を永続的なノートに変換',
    },
    // Productivity (13) — see file-level note: JA order differs from EN
    // (YWT振り返り sits right after KPT振り返り here, not last).
    {
      slug: 'productivity/daily-note',
      category: 'productivity',
      title: 'デイリーノート',
      description: 'フォーカス・タスク・振り返りのデイリージャーナル',
    },
    {
      slug: 'productivity/today',
      category: 'productivity',
      title: 'Today',
      description: 'Template フォルダに「Today」として保存すると、毎日のノートがこのレイアウトで自動的に始まる',
    },
    {
      slug: 'productivity/weekly-review',
      category: 'productivity',
      title: 'ウィークリーレビュー',
      description: '一週間を振り返り、次の計画を立てる',
    },
    {
      slug: 'productivity/zettelkasten-atomic-note',
      category: 'productivity',
      title: 'ツェッテルカステン',
      description: '知識構築のための1ノート1アイデア',
    },
    {
      slug: 'productivity/book-review',
      category: 'productivity',
      title: '読書レビュー',
      description: '引用と評価付きの構造化された読書レビュー',
    },
    {
      slug: 'productivity/meeting-notes',
      category: 'productivity',
      title: 'ミーティングノート',
      description: 'アクションアイテム付きの構造化された会議メモ',
    },
    {
      slug: 'productivity/kpt-retrospective',
      category: 'productivity',
      title: 'KPT振り返り',
      description: 'Keep・Problem・Tryのスプリント振り返り',
    },
    {
      slug: 'productivity/ywt-retrospective',
      category: 'productivity',
      title: 'YWT振り返り',
      description: 'やったこと・わかったこと・次にやることの振り返り',
    },
    {
      slug: 'productivity/start-stop-continue',
      category: 'productivity',
      title: 'Start-Stop-Continue',
      description: '始める・やめる・続けるの行動変容フレームワーク',
    },
    {
      slug: 'productivity/four-ls-retrospective',
      category: 'productivity',
      title: '4Ls振り返り',
      description: 'Liked・Learned・Lacked・Longed forのポジティブ振り返り',
    },
    {
      slug: 'productivity/starfish-retrospective',
      category: 'productivity',
      title: 'Starfish振り返り',
      description: '5つの観点による詳細なチーム改善分析',
    },
    {
      slug: 'productivity/okr',
      category: 'productivity',
      title: 'OKR',
      description: '四半期目標設定のためのObjectivesとKey Results',
    },
    {
      slug: 'productivity/raci-matrix',
      category: 'productivity',
      title: 'RACIマトリクス',
      description: '役割の明確化のための責任分担マトリクス',
    },
    // Journaling (4)
    {
      slug: 'journaling/five-minute-journal',
      category: 'journaling',
      title: '5分ジャーナル',
      description: '朝の感謝と夜の振り返りプロンプト',
    },
    {
      slug: 'journaling/stoic-journal',
      category: 'journaling',
      title: 'ストア派ジャーナル',
      description: '意図を設定し、自分の行動を静かに振り返る',
    },
    {
      slug: 'journaling/daily-reflection',
      category: 'journaling',
      title: 'デイリーリフレクション',
      description: '一日の終わりに答える3つの短い問い',
    },
    {
      slug: 'journaling/cbt-thought-record',
      category: 'journaling',
      title: 'CBT思考記録',
      description: '思考・感情・行動を分けて整理する振り返り',
    },
    // Dev (5)
    {
      slug: 'dev/readme-template',
      category: 'dev',
      title: 'READMEテンプレート',
      description: 'クイックスタートとAPIリファレンス付きプロジェクトREADME',
    },
    {
      slug: 'dev/changelog',
      category: 'dev',
      title: 'チェンジログ',
      description: 'Keep a Changelog形式のバージョン履歴',
    },
    {
      slug: 'dev/adr',
      category: 'dev',
      title: 'アーキテクチャ決定記録',
      description: '技術的な意思決定の軽量ADR',
    },
    {
      slug: 'dev/api-documentation',
      category: 'dev',
      title: 'APIドキュメント',
      description: 'REST APIエンドポイントのドキュメント',
    },
    {
      slug: 'dev/rfc',
      category: 'dev',
      title: 'RFC（設計提案書）',
      description: '代替案とレビュープロセスを含む設計提案',
    },
    // Content (2)
    {
      slug: 'content/blog-post-draft',
      category: 'content',
      title: 'ブログ記事の下書き',
      description: 'ブログ記事のアウトライン作成と下書き',
    },
    {
      slug: 'content/technical-article',
      category: 'content',
      title: '技術記事',
      description: 'ステップバイステップの技術チュートリアル',
    },
    // Thinking (10)
    {
      slug: 'thinking/problem-statement',
      category: 'thinking',
      title: '問題定義',
      description: '影響と制約条件を含む問題定義',
    },
    {
      slug: 'thinking/decision-log',
      category: 'thinking',
      title: '意思決定ログ',
      description: '文脈と根拠を含む意思決定の記録',
    },
    {
      slug: 'thinking/five-whys-analysis',
      category: 'thinking',
      title: 'なぜなぜ分析',
      description: '5つのなぜによる根本原因分析',
    },
    {
      slug: 'thinking/project-brief',
      category: 'thinking',
      title: 'プロジェクト概要',
      description: 'スコープ・タイムライン・リスクを含むプロジェクト概要',
    },
    {
      slug: 'thinking/fishbone-diagram',
      category: 'thinking',
      title: '特性要因図（フィッシュボーン）',
      description: '石川ダイアグラムによる根本原因分析',
    },
    {
      slug: 'thinking/eight-d-report',
      category: 'thinking',
      title: '8Dレポート',
      description: '8つのステップによる構造化された問題解決報告書',
    },
    {
      slug: 'thinking/fmea',
      category: 'thinking',
      title: 'FMEA（故障モード影響解析）',
      description: 'RPNスコアリングによる故障モード影響解析',
    },
    {
      slug: 'thinking/fta',
      category: 'thinking',
      title: 'FTA（故障の木解析）',
      description: 'AND/ORゲートによるトップダウンの故障展開',
    },
    {
      slug: 'thinking/is-is-not-analysis',
      category: 'thinking',
      title: 'Is / Is Not 分析',
      description: '消去法で問題の境界を定義する',
    },
    {
      slug: 'thinking/decision-matrix',
      category: 'thinking',
      title: '意思決定マトリクス',
      description: '重み付き多基準評価による構造化された意思決定',
    },
  ],
};

interface TemplatesCtaCopy {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonAriaLabel: string;
}

// Closing CTA, ported verbatim from docs/templates.html / docs/templates-ja.html,
// including the button's aria-label (SealButton passes it through) and the
// JA link's literal "?hl=ja" query param on the Chrome Web Store URL (see
// components/templates/Cta.tsx, which builds that URL per-language like
// components/index/Cta.tsx does).
export const templatesCta: Record<Lang, TemplatesCtaCopy> = {
  en: {
    heading: 'Ready to write?',
    body: 'Available as a Chrome extension. No account required.',
    buttonLabel: 'Get the extension',
    buttonAriaLabel: 'Get Mark It Down from Chrome Web Store',
  },
  ja: {
    heading: '書き始めよう',
    body: 'Chrome拡張機能として利用可能。アカウント不要。',
    buttonLabel: '拡張機能を入手',
    buttonAriaLabel: 'Chrome Web StoreからMark It Downを入手',
  },
};

interface TemplateCopyButtonLabels {
  idle: string;
  copied: string;
  failed: string;
}

interface TemplateActionLabels {
  copyButton: TemplateCopyButtonLabels;
  openButtonTitle: string;
}

// Per-card action labels, reused across all 39 cards. Ported verbatim from
// docs/templates.html / docs/templates-ja.html's copy-btn three text states
// (idle / copied / failed) — see components/templates/TemplateGridClient.tsx
// for the fetch-then-clipboard handler that swaps between them. The
// open-btn's visible text is the literal glyph "↗" in both languages
// (hardcoded directly in TemplateGridClient.tsx, not content-driven, same
// precedent as components/why/Hero.tsx's "~ ~ ~" ornament); only its title
// attribute differs per language, carried here as openButtonTitle.
export const templateActionLabels: Record<Lang, TemplateActionLabels> = {
  en: {
    copyButton: { idle: '📋 Copy Markdown', copied: '✓ Copied!', failed: '✗ Failed' },
    openButtonTitle: 'Open in new tab',
  },
  ja: {
    copyButton: { idle: '📋 コピー', copied: '✓ コピーしました！', failed: '✗ 失敗' },
    openButtonTitle: '新しいタブで開く',
  },
};

// Tag taxonomy behind the old page's tag-facets filter, extracted verbatim
// from docs/templates/index.json (fetched at runtime by the old page's own
// script to build both the facet buttons and each card's hidden search
// dataset). Ported at build time instead of re-fetched at runtime: the tag
// data is static and small, and importing it into content avoids adding a
// page-load network request purely to populate facet buttons (Lighthouse
// Performance gate per #1593 Phase 3-3 review). Tag ids are language-neutral
// keys shared by both langs; only the label differs.
//
// docs/templates/index.json is untouched by this migration (read here only
// as a data source, matching the same read-only "copy FROM docs/" rule
// already applied to docs/templates.html / docs/templates-ja.html).
export const templateTagIdsBySlug: Record<string, string[]> = {
  'ai/llm-output-organizer': ['rewrite'],
  'ai/prompt-library': ['reference'],
  'ai/ai-conversation-archive': ['archive'],
  'ai/llm-output-rewrite': ['rewrite'],
  'ai/ai-summary-knowledge-note': ['knowledge'],
  'productivity/daily-note': ['daily'],
  'productivity/today': ['daily'],
  'productivity/weekly-review': ['weekly'],
  'productivity/zettelkasten-atomic-note': ['zettelkasten'],
  'productivity/book-review': ['review'],
  'productivity/meeting-notes': ['meeting'],
  'productivity/kpt-retrospective': ['retrospective'],
  'productivity/start-stop-continue': ['retrospective'],
  'productivity/four-ls-retrospective': ['retrospective'],
  'productivity/starfish-retrospective': ['retrospective'],
  'productivity/okr': ['goal-setting'],
  'productivity/raci-matrix': ['responsibility'],
  'productivity/ywt-retrospective': ['retrospective'],
  'journaling/five-minute-journal': ['daily'],
  'journaling/stoic-journal': ['stoic'],
  'journaling/daily-reflection': ['reflection'],
  'journaling/cbt-thought-record': ['cbt'],
  'dev/readme-template': ['readme'],
  'dev/changelog': ['changelog'],
  'dev/adr': ['architecture'],
  'dev/api-documentation': ['api'],
  'dev/rfc': ['design-proposal'],
  'content/blog-post-draft': ['blog'],
  'content/technical-article': ['tutorial'],
  'thinking/problem-statement': ['analysis'],
  'thinking/decision-log': ['decision'],
  'thinking/five-whys-analysis': ['root-cause'],
  'thinking/project-brief': ['planning'],
  'thinking/fishbone-diagram': ['root-cause', 'time'],
  'thinking/eight-d-report': ['quality'],
  'thinking/fmea': ['quality'],
  'thinking/fta': ['quality'],
  'thinking/is-is-not-analysis': ['problem-boundary'],
  'thinking/decision-matrix': ['decision'],
};

export const templateTagLabels: Record<Lang, Record<string, string>> = {
  en: {
    analysis: 'Analysis',
    api: 'API',
    architecture: 'Architecture',
    archive: 'Archive',
    blog: 'Blog',
    cbt: 'CBT',
    changelog: 'Changelog',
    daily: 'Daily',
    decision: 'Decision',
    'design-proposal': 'Design Proposal',
    'goal-setting': 'Goal Setting',
    knowledge: 'Knowledge',
    meeting: 'Meeting',
    planning: 'Planning',
    'problem-boundary': 'Problem Boundary',
    quality: 'Quality',
    readme: 'README',
    reference: 'Reference',
    reflection: 'Reflection',
    responsibility: 'Responsibility',
    retrospective: 'Retrospective',
    review: 'Review',
    rewrite: 'Rewrite',
    'root-cause': 'Root Cause',
    stoic: 'Stoic',
    time: 'Time',
    tutorial: 'Tutorial',
    weekly: 'Weekly',
    zettelkasten: 'Zettelkasten',
  },
  ja: {
    analysis: '分析',
    api: 'API',
    architecture: 'アーキテクチャ',
    archive: 'アーカイブ',
    blog: 'ブログ',
    cbt: '認知行動療法',
    changelog: 'チェンジログ',
    daily: 'デイリー',
    decision: '意思決定',
    'design-proposal': '設計提案',
    'goal-setting': '目標設定',
    knowledge: 'ナレッジ',
    meeting: 'ミーティング',
    planning: '計画',
    'problem-boundary': '問題境界',
    quality: '品質',
    readme: 'README',
    reference: 'リファレンス',
    reflection: '内省',
    responsibility: '責任分担',
    retrospective: '振り返り',
    review: 'レビュー',
    rewrite: 'リライト',
    'root-cause': '根本原因',
    stoic: 'ストア派',
    time: '時間',
    tutorial: 'チュートリアル',
    weekly: 'ウィークリー',
    zettelkasten: 'ツェッテルカステン',
  },
};

interface TemplateFilterCopy {
  searchPlaceholder: string;
  searchAriaLabel: string;
  filterNavAriaLabel: string;
  tagFacetsAriaLabel: string;
  allLabel: string;
}

// Search input / filter-tabs nav / tag-facets group copy, ported verbatim
// from docs/templates.html / docs/templates-ja.html's static markup
// (placeholder / aria-label text) — restored per #1593 Phase 3-3 review
// (search + category filter + tag facets are genuine old-page functionality,
// not decorative chrome; Next.js + client components are an accepted part
// of this stack, so the earlier all-server implementation was overly
// conservative). Per-category counts are computed from templateCards at
// render time instead of hardcoded, so they can't drift from the catalog.
export const templateFilterCopy: Record<Lang, TemplateFilterCopy> = {
  en: {
    searchPlaceholder: 'Search templates...',
    searchAriaLabel: 'Search templates',
    filterNavAriaLabel: 'Filter templates by category',
    tagFacetsAriaLabel: 'Filter by tag',
    allLabel: 'All',
  },
  ja: {
    searchPlaceholder: 'テンプレートを検索...',
    searchAriaLabel: 'テンプレートを検索',
    filterNavAriaLabel: 'カテゴリでフィルター',
    tagFacetsAriaLabel: 'タグで絞り込む',
    allLabel: 'すべて',
  },
};

// Per-template hidden `summary` field, extracted verbatim from
// docs/templates/index.json's `summary.en`/`summary.ja` (fetched at runtime
// by the old page's own script and stashed on each card as
// `data-summary` — see the old script's injectTagChips()/filterCards()).
// Restored per #1593 Wave R2 Batch 2's full-fidelity requirement: the old
// search input matches this field in addition to the visible title and
// description, so a template can be found by summary text that never
// appears on the card itself. Ported at build time rather than re-fetched
// at runtime, same precedent as templateTagIdsBySlug above.
//
// Several `thinking/*` entries have literally-untranslated English text in
// the `ja` bucket in the source JSON (e.g. thinking/problem-statement) —
// preserved as-is per this project's truth-seeking rule against silently
// "fixing" pre-existing source-data inconsistencies; see final report.
export const templateSummariesBySlug: Record<Lang, Record<string, string>> = {
  en: {
    'ai/llm-output-organizer': 'Capture, rewrite, and act on LLM responses.',
    'ai/prompt-library': 'Catalog and rate your most-used prompts.',
    'ai/ai-conversation-archive': 'Preserve multi-turn conversations with context.',
    'ai/llm-output-rewrite': 'Rewrite AI output in your own words.',
    'ai/ai-summary-knowledge-note': 'Convert AI summaries into permanent notes.',
    'productivity/daily-note': 'Daily journal with focus, tasks, and reflection.',
    'productivity/today':
      'A daily layout that auto-applies when you name it "Today" — place this note in the Template folder and every new daily note starts from this structure.',
    'productivity/weekly-review': 'Reflect on the week and plan ahead.',
    'productivity/zettelkasten-atomic-note': 'One idea per note for knowledge building.',
    'productivity/book-review': 'Structured reading review with quotes and rating.',
    'productivity/meeting-notes': 'Structured meeting capture with action items.',
    'productivity/kpt-retrospective': 'Keep, Problem, Try — structured sprint retrospective.',
    'productivity/start-stop-continue': 'Simple behavior change retrospective framework.',
    'productivity/four-ls-retrospective': 'Liked, Learned, Lacked, Longed for — positive reflection framework.',
    'productivity/starfish-retrospective': 'Five-point deep analysis for team improvement.',
    'productivity/okr': 'Objectives and Key Results for quarterly goal setting.',
    'productivity/raci-matrix': 'Responsibility assignment matrix for role clarity.',
    'productivity/ywt-retrospective': 'Reflect on what you did, what you learned, and what to do next.',
    'journaling/five-minute-journal': 'Morning gratitude and evening reflection prompts.',
    'journaling/stoic-journal': 'Set intentions and review actions with clarity.',
    'journaling/daily-reflection': 'Three short prompts to close out the day.',
    'journaling/cbt-thought-record': 'Separate thoughts, emotions, and actions for reflection.',
    'dev/readme-template': 'Project README with quick start and API reference.',
    'dev/changelog': 'Keep a Changelog format version history.',
    'dev/adr': 'Lightweight ADR for technical decisions.',
    'dev/api-documentation': 'REST API endpoint documentation.',
    'dev/rfc': 'Design proposal with alternatives and review process.',
    'content/blog-post-draft': 'Outline and draft a blog post.',
    'content/technical-article': 'Step-by-step technical tutorial structure.',
    'thinking/problem-statement': 'Define a problem with impact and constraints.',
    'thinking/decision-log': 'Record decisions with context and rationale.',
    'thinking/five-whys-analysis': 'Root cause analysis using the 5 Whys method.',
    'thinking/project-brief': 'Project overview with scope, timeline, and risks.',
    'thinking/fishbone-diagram': 'Ishikawa cause-and-effect root cause analysis.',
    'thinking/eight-d-report': 'Eight-discipline structured problem-solving report.',
    'thinking/fmea': 'Failure mode and effects analysis with RPN scoring.',
    'thinking/fta': 'Top-down failure decomposition with AND/OR gates.',
    'thinking/is-is-not-analysis': 'Define problem boundaries by elimination.',
    'thinking/decision-matrix': 'Weighted multi-criteria evaluation for structured decisions.',
  },
  ja: {
    'ai/llm-output-organizer': 'LLMの出力を `Ctrl+Shift+V` で貼り付け（自動でMarkdownに変換）。',
    'ai/prompt-library': 'すべてのプロンプトを `Ctrl+K` で横断検索。',
    'ai/ai-conversation-archive': 'LLMの回答を `Ctrl+Shift+V` で貼り付け（HTMLを自動でMarkdownに変換）。',
    'ai/llm-output-rewrite': '元のLLM出力を `Ctrl+Shift+V` で貼り付けると、HTMLがクリーンなMarkdownに自動変換されます。',
    'ai/ai-summary-knowledge-note': '関連ノートは `Ctrl+K` で検索。',
    'productivity/daily-note': '毎日、フォーカスとタスクを記入して始めましょう。',
    'productivity/today': 'Template フォルダに「Today」という名前で保存すると、毎日のノートがこのレイアウトで始まる。',
    'productivity/weekly-review': '毎週末に記入してください。',
    'productivity/zettelkasten-atomic-note': '1ノートにつき1アイデア。',
    'productivity/book-review': 'まずメタデータを記入。',
    'productivity/meeting-notes': '`Ctrl+Shift+;` で会議の日時を挿入。',
    'productivity/kpt-retrospective': '`Ctrl+;` で今日の日付を挿入。',
    'productivity/start-stop-continue': 'スプリントや期間の終わりに記入しましょう。',
    'productivity/four-ls-retrospective': 'スプリントやプロジェクト期間の終わりに実施してください。',
    'productivity/starfish-retrospective': 'スプリントやフェーズの終わりに実施してください。',
    'productivity/okr': '`Ctrl+;` で今日の日付を挿入。',
    'productivity/raci-matrix': '`Ctrl+;` で日付を挿入。',
    'productivity/ywt-retrospective': 'スプリントや期間の終わりに記入してください。',
    'journaling/five-minute-journal': '朝と夜に分けて使います。',
    'journaling/stoic-journal': '自分でコントロールできることと、できないことを分けて書きます。',
    'journaling/daily-reflection': '夜に軽く振り返りたいときに使います。',
    'journaling/cbt-thought-record': '状況・思考・感情・行動を分けて整理するセルフリフレクション用テンプレートです。',
    'dev/readme-template': 'プロジェクトに合わせて各セクションを記入してください。',
    'dev/changelog': '新しいバージョンを上に追加してください。',
    'dev/adr': '重要な技術的決定ごとに1つのADRを作成。',
    'dev/api-documentation': '各エンドポイントをH2セクションとしてドキュメント化してください。',
    'dev/rfc': '1つのRFCに1つの設計提案。',
    'content/blog-post-draft': 'まずフックから始め、ポイントを展開し、最後にCTA（行動喚起）でまとめましょう。',
    'content/technical-article': 'まず問題を定義し、次に解決策をステップバイステップで解説しましょう。',
    // Untranslated in the old source JSON — see file-level note above.
    'thinking/problem-statement': 'Define a problem with impact and constraints.',
    'thinking/decision-log': 'Record decisions with context and rationale.',
    'thinking/five-whys-analysis': 'Root cause analysis using the 5 Whys method.',
    'thinking/project-brief': 'Project overview with scope, timeline, and risks.',
    'thinking/fishbone-diagram': '石川図（特性要因図）で根本原因を構造的に分析する。',
    'thinking/eight-d-report': 'Eight-discipline structured problem-solving report.',
    'thinking/fmea': 'Failure mode and effects analysis with RPN scoring.',
    'thinking/fta': 'Top-down failure decomposition with AND/OR gates.',
    'thinking/is-is-not-analysis': 'Define problem boundaries by elimination.',
    'thinking/decision-matrix': 'Weighted multi-criteria evaluation for structured decisions.',
  },
};
