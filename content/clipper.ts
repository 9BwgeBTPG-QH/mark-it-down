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

interface ClipperCtaCopy {
  heading: string;
  primaryLabel: string;
  primaryAriaLabel: string;
  secondaryLabel: string;
}

interface ClipperSectionsCopy {
  flow: ClipperSectionCopy;
  fidelity: ClipperSectionCopy;
  cta: ClipperCtaCopy;
}

// Below-fold section copy, ported verbatim from docs/clipper.html /
// docs/clipper-ja.html (Flow section, Fidelity section, closing CTA). The
// old CTA button's inline gtag() analytics call is dropped — this rebuild
// has no analytics wiring, matching the same omission already made for the
// index page's CTA (components/index/Cta.tsx).
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
    cta: {
      heading: 'Clip less. Keep what matters.',
      primaryLabel: 'Get the extension',
      primaryAriaLabel: 'Get Mark It Down from Chrome Web Store',
      secondaryLabel: 'See all features',
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
    cta: {
      heading: '全部ではなく、必要な部分だけを残す。',
      primaryLabel: '拡張機能を入手する',
      primaryAriaLabel: 'Chrome ウェブストアから Mark It Down を入手',
      secondaryLabel: '機能を見る',
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
