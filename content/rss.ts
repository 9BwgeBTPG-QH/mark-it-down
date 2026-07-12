export type { Lang } from './index';
import type { Lang } from './index';

interface RssCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
}

// Hero copy lifted verbatim from docs/rss.html / docs/rss-ja.html
// (title / meta description / h1 / hero subtitle). The old hero's decorative
// "~ ~ ~" ornament (hero-ornament span, aria-hidden) is intentionally not
// ported — it carried no content, only a divider glyph the new design does
// not need (same precedent as content/clipper.ts's Hero).
//
// JA h1: the old markup separated phrases with manually inserted zero-width
// spaces (U+200B) for line-break control, which the new <Budoux> component
// replaces (same precedent as content/clipper.ts / content/index.ts's JA
// h1 handling). After stripping the zero-width spaces, "ための" and "RSS
// Reader" would run together with no visual gap, so a real space is
// reinserted before "RSS Reader" — the same treatment already applied to
// clipper's "のための Web Clipper". This is a known, accepted parity gap
// against the SEO baseline's firstH1 for the JA page (see final report).
export const rssContent: Record<Lang, RssCopy> = {
  en: {
    lang: 'en',
    title: 'RSS Reader for Local Markdown Notes — Mark It Down',
    description:
      'Read RSS feeds in a full-screen Mark It Down workspace, import OPML, inspect articles, and save selected items to local Markdown notes in Inbox.',
    eyebrow: 'RSS Reader',
    h1: 'RSS Reader for local Markdown notes',
    heroSubtitle:
      'Read RSS feeds in a full-screen Mark It Down workspace, import OPML, inspect articles, and save selected items to local Markdown notes in Inbox.',
  },
  ja: {
    lang: 'ja',
    title: 'RSS Reader: ローカルMarkdownノートへ保存 — Mark It Down',
    description:
      'Mark It Downの全画面RSS Readerでフィードを読み、OPMLを取り込み、記事を確認し、必要なものだけInboxのローカルMarkdownノートへ保存。',
    eyebrow: 'RSS Reader',
    h1: 'ローカルMarkdownノートのための RSS Reader',
    heroSubtitle:
      'Mark It Downの全画面RSS Readerでフィードを読み、OPMLを取り込み、記事を確認し、必要なものだけInboxのローカルMarkdownノートへ保存。',
  },
};

export interface RssListItem {
  title: string;
  body: string;
}

interface RssSectionCopy {
  eyebrow: string;
  heading: string;
  intro: string;
  items: RssListItem[];
}

interface RssCtaCopy {
  heading: string;
  primaryLabel: string;
  primaryAriaLabel: string;
  secondaryLabel: string;
}

interface RssSectionsCopy {
  workspace: RssSectionCopy;
  subscriptions: RssSectionCopy;
  cta: RssCtaCopy;
}

// Below-fold section copy, ported verbatim from docs/rss.html /
// docs/rss-ja.html (Workspace section, Subscriptions section, closing CTA).
// The old CTA button's inline gtag() analytics call is dropped — this
// rebuild has no analytics wiring, matching the same omission already made
// for the index page's CTA (components/index/Cta.tsx) and the clipper
// page's CTA (components/clipper/Cta.tsx).
export const rssSections: Record<Lang, RssSectionsCopy> = {
  en: {
    workspace: {
      eyebrow: 'Workspace',
      heading: 'A reader surface inside the editor, not another inbox to ignore.',
      intro:
        'RSS Reader gives feeds their own full-screen workspace: feed list on the left, article list and reading pane in the center, and metadata on the right.',
      items: [
        {
          title: 'Full-screen reading',
          body: 'Move from feed list to article view without opening another app or browser tab.',
        },
        {
          title: 'Article inspector',
          body: 'Review metadata, tags, and headings before deciding whether the article deserves a note.',
        },
        {
          title: 'Inbox save',
          body: 'Save only the article you choose, then rewrite it as a normal local Markdown note.',
        },
      ],
    },
    subscriptions: {
      eyebrow: 'Subscriptions',
      heading: 'Subscriptions stay portable. Article bodies stay intentional.',
      intro:
        'RSS settings can move with you, while article content is saved only when you explicitly clip it. That keeps the reader useful without turning it into a hidden bulk archive.',
      items: [
        {
          title: 'OPML import and export',
          body: 'Bring subscriptions from Feedly, Inoreader, NetNewsWire, and other OPML 2.0 readers.',
        },
        {
          title: 'Git sync for settings',
          body: 'Sync feeds and denylist settings across devices while keeping permissions device-local.',
        },
        {
          title: 'Web subscriptions',
          body: 'For sites without RSS, fetch article URLs and titles first; save body text only when you explicitly clip.',
        },
      ],
    },
    cta: {
      heading: 'Turn reading into notes, not a backlog.',
      primaryLabel: 'Get the extension',
      primaryAriaLabel: 'Get Mark It Down from Chrome Web Store',
      secondaryLabel: 'See all features',
    },
  },
  ja: {
    workspace: {
      eyebrow: 'Workspace',
      heading: '放置するInboxではなく、エディタ内の読む場所。',
      intro:
        'RSS Reader はフィード専用の全画面ワークスペースです。左にフィード、中央に記事一覧と本文、右にメタデータを置きます。',
      items: [
        {
          title: '全画面で読む',
          body: '別アプリや別タブを開かず、フィード一覧から記事表示へ移れます。',
        },
        {
          title: '記事インスペクタ',
          body: '保存する前に、メタデータ、タグ、見出しを確認できます。',
        },
        {
          title: 'Inboxへ保存',
          body: '選んだ記事だけを保存し、通常のローカルMarkdownノートとして書き直せます。',
        },
      ],
    },
    subscriptions: {
      eyebrow: 'Subscriptions',
      heading: '購読リストは持ち運べる。本文保存は意図したときだけ。',
      intro:
        'RSS設定は移動できますが、記事本文は明示的にクリップしたときだけ保存します。便利なReaderでありながら、見えない大量アーカイブにはしません。',
      items: [
        {
          title: 'OPML import / export',
          body: 'Feedly、Inoreader、NetNewsWireなどのOPML 2.0リーダーから購読リストを持ち込めます。',
        },
        {
          title: 'RSS設定のGit同期',
          body: 'フィードとdenylist設定をデバイス間で同期し、権限は各デバイスに分けて保持します。',
        },
        {
          title: 'Web subscription',
          body: 'RSSのないサイトでは記事URLとタイトルを先に取得し、本文は明示的にclipしたときだけ保存します。',
        },
      ],
    },
    cta: {
      heading: '読むことを、未処理リストではなくノートに変える。',
      primaryLabel: '拡張機能を入手する',
      primaryAriaLabel: 'Chrome ウェブストアから Mark It Down を入手',
      secondaryLabel: '機能を見る',
    },
  },
};

// WebPage JSON-LD, ported verbatim from docs/rss.html / docs/rss-ja.html
// (a distinct @type from the index page's SoftwareApplication schema, same
// shape as content/clipper.ts's clipperJsonLd).
export const rssJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'RSS Reader for Local Markdown Notes — Mark It Down',
    description:
      'Read RSS feeds in a full-screen Mark It Down workspace, import OPML, inspect articles, and save selected items to local Markdown notes in Inbox.',
    inLanguage: 'en',
    url: 'https://markitdown.reduktion.dev/rss.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
  ja: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'RSS Reader: ローカルMarkdownノートへ保存 — Mark It Down',
    description:
      'Mark It Downの全画面RSS Readerでフィードを読み、OPMLを取り込み、記事を確認し、必要なものだけInboxのローカルMarkdownノートへ保存。',
    inLanguage: 'ja',
    url: 'https://markitdown.reduktion.dev/rss-ja.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
};
