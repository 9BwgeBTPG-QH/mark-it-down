export type { Lang } from './index';
import type { Lang } from './index';

interface ClipperCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
}

// Hero copy lifted verbatim from docs/clipper.html / docs/clipper-ja.html
// (title / meta description / h1 / hero subtitle). The old hero's decorative
// "~ ~ ~" ornament (hero-ornament span, aria-hidden) is intentionally not
// ported — it carried no content, only a divider glyph the new design does
// not need.
//
// JA h1: the old markup separated phrases with manually inserted zero-width
// spaces (U+200B) for line-break control, which the new <Budoux> component
// replaces (same precedent as content/index.ts's indexContent.ja.h1). After
// stripping the zero-width spaces, "ための" and "Web Clipper" would run
// together with no visual gap, so a real space is reinserted before "Web
// Clipper" — the same treatment content/index.ts already applies around
// "Markdown" in its own JA h1. This is a known, accepted parity gap against
// the SEO baseline's firstH1 for the JA page (see final report).
export const clipperContent: Record<Lang, ClipperCopy> = {
  en: {
    lang: 'en',
    title: 'Web Clipper for Markdown and AI Chats — Mark It Down',
    description:
      'Right-click any page, AI chat, or selected text and turn it into clean Markdown in Mark It Down. Preview, trim, save to Inbox, and edit in Side Panel.',
    eyebrow: 'Web Clipper',
    h1: 'Web Clipper for pages, AI chats, and Markdown notes',
    heroSubtitle:
      'Right-click any page, AI chat, or selected text and turn it into clean Markdown in Mark It Down. Preview, trim, save to Inbox, and edit in Side Panel.',
  },
  ja: {
    lang: 'ja',
    title: 'Web Clipper: WebページとAIチャットをMarkdownへ — Mark It Down',
    description:
      'Webページ、AIチャット、選択テキストを右クリックでMarkdownに変換。プレビューして整え、Inboxへ保存し、Side Panelでそのまま編集できます。',
    eyebrow: 'Web Clipper',
    h1: 'Webページ、AIチャット、Markdownノートのための Web Clipper',
    heroSubtitle:
      'Webページ、AIチャット、選択テキストを右クリックでMarkdownに変換。プレビューして整え、Inboxへ保存し、Side Panelでそのまま編集できます。',
  },
};

export interface ClipperListItem {
  title: string;
  body: string;
}

interface ClipperSectionCopy {
  eyebrow: string;
  heading: string;
  intro: string;
  items: ClipperListItem[];
}

// Support sentence rendered under the CTA heading: plain prose with two
// inline links, mirroring content/faq.ts's FaqCtaCopy split-copy shape so
// components/clipper/Cta.tsx can reuse the same before/link/between/link/after
// rendering as components/faq/Cta.tsx. Slugs resolve through navHref() at
// render time per the internal-link convention.
interface ClipperCtaSupportCopy {
  before: string;
  firstLabel: string;
  firstSlug: string;
  between: string;
  secondLabel: string;
  secondSlug: string;
  after: string;
}

interface ClipperCtaCopy {
  heading: string;
  primaryLabel: string;
  primaryAriaLabel: string;
  secondaryLabel: string;
  support: ClipperCtaSupportCopy;
}

interface ClipperSectionsCopy {
  flow: ClipperSectionCopy;
  walkthrough: ClipperSectionCopy;
  fidelity: ClipperSectionCopy;
  sites: ClipperSectionCopy;
  cta: ClipperCtaCopy;
}

// Below-fold section copy, ported from docs/clipper.html /
// docs/clipper-ja.html (Flow section, Fidelity section, closing CTA); the JA
// CTA heading was rephrased 2026-07-31 to match the EN affirmative form
// (slop review — the negation existed only in JA). Everything else is
// verbatim. The
// old CTA button's inline gtag() analytics call is dropped — this rebuild
// has no analytics wiring, matching the same omission already made for the
// index page's CTA (components/index/Cta.tsx).
//
// The `walkthrough` and `sites` sections plus `cta.support` are ADDED, not
// ported (2026-08-26) — same precedent as components/features/FlowSection.tsx
// ("added, not ported"). Reason: content/features.ts's webClipper section
// links here promising the full walkthrough, but the old page never had one.
// Both new sections render through the existing PhilosophySection component
// (no new CSS). Every claim is verified against the extension source
// (chorme_mark-it-down): context-menu items src/background.ts:990-1039;
// preview-before-save flow src/background.ts:1117-1123 + AppMain.tsx;
// section toggles + article/full-page/CSS-selector re-extraction
// ClipPreviewModal.tsx + clipEngine.ts; site-metadata-to-frontmatter
// FrontmatterModal.tsx; failure-retains-preview background.ts:1288-1325
// (save actions except YouTube transcripts then fall back to saving plain
// text without confirmation, background.ts:1298-1312 — the walkthrough copy
// hedges with "usually"/"may" instead of promising confirmation-only saves);
// neither fallback is universal — background.ts:1196-1249 skips the
// retry-preview/plain-text path entirely on an empty YouTube transcript or
// AI digest, background.ts:1290-1298's own plain-text guard no-ops when
// selectionText and pageTitle are both empty, and the save call itself can
// throw (background.ts:1300-1312) — so the walkthrough copy also hedges the
// failure-recovery claim with "though neither fallback catches every
// failure" / "常に働くとは限らず" instead of promising the clip is never lost;
// per-site extractors + Shadow DOM/iframe traversal + llms.txt detection +
// ruby-to-Aozora conversion src/background/clipper.ts.
export const clipperSections: Record<Lang, ClipperSectionsCopy> = {
  en: {
    flow: {
      eyebrow: 'Flow',
      heading: 'Right-click, preview, then keep the part worth rewriting.',
      intro:
        'Web Clipper is the Entry surface for web pages and AI output. It turns selected text or full pages into ordinary Markdown notes, then hands them to the same local editor as everything else.',
      items: [
        {
          title: 'Page and selection clipping',
          body: 'Save the current page or selected text as clean Markdown, with the source URL preserved.',
        },
        {
          title: 'AI chat extraction',
          body: 'Capture useful output from Claude, ChatGPT, Grok, and Gemini without adding AI writing inside the editor.',
        },
        {
          title: 'Side Panel editing',
          body: 'Open saved clips next to the page or chat they came from, so cleanup starts in context.',
        },
      ],
    },
    walkthrough: {
      eyebrow: 'Walkthrough',
      heading: 'Three steps from right-click to an editable note.',
      intro:
        'Clipping usually takes the same three steps: pick an action from the context menu, check the result in a preview, and keep it as an ordinary note in Inbox.',
      items: [
        {
          title: '1. Pick from the right-click menu',
          body: 'Four save actions: selected text, the full page, a YouTube transcript, or an AI response digest. Three copy actions skip saving entirely — selection as Markdown, page link as Markdown, and a selection formatted for pasting into an LLM.',
        },
        {
          title: '2. Shape it in the preview',
          body: 'The Side Panel opens with a preview of the extracted Markdown. Include or exclude sections one by one, or switch the extraction mode between article, full page, and CSS selector. If extraction fails, the Side Panel usually keeps what it has so you can retry, and a save action may fall back to plain text instead — though neither fallback catches every failure, so a clip can still be lost in rare cases.',
        },
        {
          title: '3. Save to Inbox',
          body: 'Clips always land in Inbox — no filing decision at save time. Site details like the title and URL are stored with the clip and can be pulled into frontmatter later. The note stays open next to its source page, so rewriting starts immediately.',
        },
      ],
    },
    fidelity: {
      eyebrow: 'Fidelity',
      heading: 'Markdown that keeps structure instead of flattening it.',
      intro:
        'The clipper chooses extraction paths for the page shape, then keeps the result readable as plain Markdown. The goal is not bulk ingestion; it is a clean handoff into your own words.',
      items: [
        {
          title: 'Readable article structure',
          body: 'Headings, lists, code, tables, and links stay editable after capture.',
        },
        {
          title: 'Specialized extractors',
          body: 'Social threads, publishing sites, YouTube transcripts, Mermaid blocks, and Japanese ruby annotations have dedicated handling.',
        },
        {
          title: 'Local review step',
          body: 'Preview and clip filters let you trim the result before it becomes a note.',
        },
      ],
    },
    sites: {
      eyebrow: 'Coverage',
      heading: 'Dedicated extractors where generic extraction falls apart.',
      intro:
        'Most pages go through general article extraction. For page shapes that flatten badly, the clipper switches to dedicated extractors — reaching into Shadow DOM and same-origin iframes when the content lives there.',
      items: [
        {
          title: 'AI chats',
          body: 'Dedicated extraction for Claude, ChatGPT, Gemini, Grok, and Perplexity conversations — including UIs rendered inside Shadow DOM, like Gemini.',
        },
        {
          title: 'Comment threads',
          body: 'Hacker News, Reddit, and GitHub issues, pull requests, and discussions come through as readable threads.',
        },
        {
          title: 'Social posts',
          body: 'X threads, LinkedIn, Bluesky, and Threads.',
        },
        {
          title: 'Publishing sites',
          body: 'Medium, Discourse forums, Zenn, Qiita, and Hatena.',
        },
        {
          title: 'And beyond',
          body: 'YouTube transcripts, automatic llms.txt detection when a site publishes one, Mermaid diagrams kept as diagrams, and Japanese ruby annotations converted to Aozora-style 《reading》 notation.',
        },
      ],
    },
    cta: {
      heading: 'Clip less. Keep what matters.',
      primaryLabel: 'Get the extension',
      primaryAriaLabel: 'Get the extension for Mark It Down from Chrome Web Store',
      secondaryLabel: 'See all features',
      support: {
        before: 'Questions about permissions or a page that will not clip? See the ',
        firstLabel: 'FAQ',
        firstSlug: 'faq',
        between: ' or ',
        secondLabel: 'Troubleshooting',
        secondSlug: 'troubleshooting',
        after: '.',
      },
    },
  },
  ja: {
    flow: {
      eyebrow: 'Flow',
      heading: '右クリック。プレビュー。書き直す価値のある部分だけを残す。',
      intro:
        'Web Clipper は、WebページやAI出力を受け取るための Entry 面です。選択テキストやページ全体を通常のMarkdownノートに変換し、同じローカルエディタへ渡します。',
      items: [
        {
          title: 'ページと選択範囲のクリップ',
          body: '現在のページや選択テキストをMarkdownとして保存し、source URLも残します。',
        },
        {
          title: 'AIチャット抽出',
          body: 'Claude、ChatGPT、Grok、Geminiの出力を取り込めます。エディタ自体にAI執筆機能は足しません。',
        },
        {
          title: 'Side Panel編集',
          body: '保存したクリップを元ページやチャットの隣で開き、文脈を保ったまま整えられます。',
        },
      ],
    },
    walkthrough: {
      eyebrow: 'Walkthrough',
      heading: '右クリックからノートになるまで、3ステップ。',
      intro:
        'クリップは基本、同じ3ステップです。右クリックメニューで選び、プレビューで確認し、Inboxに通常のノートとして保存する。',
      items: [
        {
          title: '1. 右クリックメニューで選ぶ',
          body: '保存は4種類：選択テキスト、ページ全体、YouTubeの文字起こし、AI応答の咀嚼用ダイジェスト。保存せずMarkdownとしてコピーする操作も3種類あります（選択範囲、ページリンク、LLM貼り付け用）。',
        },
        {
          title: '2. プレビューで整える',
          body: 'Side Panelが自動で開き、抽出されたMarkdownをプレビューします。セクション単位で取捨選択でき、抽出方法も記事・ページ全体・CSSセレクタから切り替えられます。抽出に失敗しても、多くの場合はSide Panelに内容が残ってリトライできます。保存操作では、取れた分がその場でプレーンテキストとして保存されることもありますが、どちらの救済も常に働くとは限らず、まれにクリップが失われることもあります。',
        },
        {
          title: '3. Inboxへ保存',
          body: '保存先は常にInboxで、保存時に分類は求めません。タイトルやURLなどのサイト情報はクリップと一緒に保存され、あとからfrontmatterに取り込めます。ノートは元ページの隣で開いたままなので、そのまま書き直しを始められます。',
        },
      ],
    },
    fidelity: {
      eyebrow: 'Fidelity',
      heading: '構造をつぶさず、Markdownとして読める形で渡す。',
      intro:
        'ページの形に応じて抽出経路を選び、結果をプレーンなMarkdownとして扱えるようにします。目的は大量取り込みではなく、自分の言葉へ移すためのきれいな受け渡しです。',
      items: [
        {
          title: '記事構造を保持',
          body: '見出し、リスト、コード、テーブル、リンクを編集可能な形で残します。',
        },
        {
          title: '専用抽出',
          body: 'SNSスレッド、投稿サイト、YouTube字幕、Mermaid、青空文庫系のruby注記などを個別に処理します。',
        },
        {
          title: 'ローカルのレビュー工程',
          body: 'プレビューとクリップフィルターで、ノート化する前に不要部分を削れます。',
        },
      ],
    },
    sites: {
      eyebrow: 'Coverage',
      heading: '一般的な抽出が崩れる場所に、専用の抽出器を。',
      intro:
        '多くのページは一般的な記事抽出で処理します。それが崩れやすいページの形には専用抽出器へ切り替えます。Shadow DOMや同一オリジンのiframeの中にあるコンテンツも対象です。',
      items: [
        {
          title: 'AIチャット',
          body: 'Claude、ChatGPT、Gemini、Grok、Perplexityの会話を専用に抽出します。GeminiのようにShadow DOMの内側で描画されるUIにも対応します。',
        },
        {
          title: 'コメントスレッド',
          body: 'Hacker News、Reddit、GitHubのissue・pull request・discussionを、読めるスレッドの形で取り込みます。',
        },
        {
          title: 'SNS投稿',
          body: 'Xのスレッド、LinkedIn、Bluesky、Threads。',
        },
        {
          title: '記事・投稿サイト',
          body: 'Medium、Discourse系フォーラム、Zenn、Qiita、はてな。',
        },
        {
          title: 'その他',
          body: 'YouTubeの文字起こし、サイトが公開していればllms.txtの自動検出、Mermaid図をそのまま保持、ruby注記の青空文庫式《ルビ》変換。',
        },
      ],
    },
    cta: {
      heading: '少なくクリップして、大事な部分だけを残す。',
      primaryLabel: '拡張機能を入手する',
      primaryAriaLabel: 'Chrome ウェブストアで Mark It Down の拡張機能を入手する',
      secondaryLabel: '機能を見る',
      support: {
        before: '権限や、うまくクリップできないページについては、',
        firstLabel: 'FAQ',
        firstSlug: 'faq',
        between: 'または',
        secondLabel: 'トラブルシューティング',
        secondSlug: 'troubleshooting',
        after: 'を参照してください。',
      },
    },
  },
};

// WebPage JSON-LD, ported verbatim from docs/clipper.html / docs/clipper-ja.html
// (a distinct @type from the index page's SoftwareApplication schema).
export const clipperJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Web Clipper for Markdown and AI Chats — Mark It Down',
    description:
      'Right-click any page, AI chat, or selected text and turn it into clean Markdown in Mark It Down. Preview, trim, save to Inbox, and edit in Side Panel.',
    inLanguage: 'en',
    url: 'https://markitdown.reduktion.dev/clipper.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
  ja: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Web Clipper: WebページとAIチャットをMarkdownへ — Mark It Down',
    description:
      'Webページ、AIチャット、選択テキストを右クリックでMarkdownに変換。プレビューして整え、Inboxへ保存し、Side Panelでそのまま編集できます。',
    inLanguage: 'ja',
    url: 'https://markitdown.reduktion.dev/clipper-ja.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
};
