export type { Lang } from './index';
import type { Lang } from './index';
import type { FeatureSectionItem } from '@/components/clipper/FeatureSection';

interface OkfCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
}

// Hero copy lifted verbatim from docs/okf.html / docs/okf-ja.html
// (title / meta description / h1 / hero subtitle). The old hero's decorative
// "~ ~ ~" ornament (hero-ornament span, aria-hidden) is intentionally not
// ported — it carried no content, only a divider glyph the new design does
// not need (same precedent as content/clipper.ts's Hero).
//
// JA h1 "Open Knowledge Format 対応" has no zero-width spaces in the source
// markup at all (unlike rss-ja.html / clipper-ja.html), so there is no
// parity gap to document here — it ports unchanged.
export const okfContent: Record<Lang, OkfCopy> = {
  en: {
    lang: 'en',
    title: 'OKF Portable Markdown Bundles — Mark It Down',
    description:
      'How Mark It Down supports Open Knowledge Format: portable Markdown knowledge bundles, OKF import/export, Git-friendly files, and anti-lock-in workflows.',
    eyebrow: 'OKF',
    h1: 'Open Knowledge Format support',
    heroSubtitle: 'Mark It Down can read, write, and review OKF bundles without turning your knowledge into a private database.',
  },
  ja: {
    lang: 'ja',
    title: 'OKF ポータブルMarkdownバンドル — Mark It Down',
    description:
      'Mark It DownのOpen Knowledge Format対応。持ち運べるMarkdown knowledge bundle、OKF import/export、Gitで扱えるファイル、ロックインしない作業フロー。',
    eyebrow: 'OKF',
    h1: 'Open Knowledge Format 対応',
    heroSubtitle: 'Mark It Down は OKF バンドルを読み、書き、レビューできます。知識を独自データベースに閉じ込めません。',
  },
};

export interface OkfNarrativeLink {
  label: string;
  href: string;
}

// "What is OKF" narrative section (docs/okf.html "philosophy" section #1).
// Inline <strong>/<code> formatting within the prose paragraphs is
// flattened to plain text, following the same precedent as
// content/features.ts's "OKF Export" item body (which also drops inline
// <code> for technical terms like .okf.zip/index.html rather than carrying
// rich spans through a plain-string content shape).
//
// The closing paragraph's two external links are NOT part of that
// flattening: they are real navigation (OKF spec + Google Cloud's intro),
// not decorative inline styling, so they are preserved as structured
// fields and rendered as real <a> elements by components/okf/Narrative.tsx.
interface OkfNarrativeCopy {
  eyebrow: string;
  heading: string;
  paragraphs: string[];
  links?: {
    first: OkfNarrativeLink;
    joiner: string;
    second: OkfNarrativeLink;
    trailing: string;
  };
}

export const okfWhatIsOkf: Record<Lang, OkfNarrativeCopy> = {
  en: {
    eyebrow: 'What is OKF',
    heading: 'Markdown knowledge that can travel.',
    paragraphs: [
      'Open Knowledge Format is a lightweight way to package knowledge as ordinary Markdown files with YAML frontmatter. A bundle can include concept documents, optional index.md files for navigation, and optional log.md files for history.',
      'The format is intentionally small: readable by people, diffable in Git, and tolerant when a bundle is incomplete or evolving. The official OKF v0.1 draft defines the basic rules, including the required type field for concept files.',
    ],
    links: {
      first: { label: 'Read the OKF spec', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md' },
      joiner: ' or ',
      second: { label: "Google Cloud's introduction", href: 'https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/' },
      trailing: '.',
    },
  },
  ja: {
    eyebrow: 'What is OKF',
    heading: '持ち運べる Markdown knowledge。',
    paragraphs: [
      'Open Knowledge Format は、知識を YAML フロントマター付きの通常の Markdown ファイルとしてまとめる軽量フォーマットです。concept document、ナビゲーション用の任意の index.md、履歴用の任意の log.md を含められます。',
      '形式は意図的に小さく、人間が読めて、Git で差分が見え、不完全または成長途中のバンドルにも寛容です。公式 OKF v0.1 draft は、concept file に必須の type フィールドなど、最小限の規則を定めています。',
    ],
    links: {
      first: { label: 'OKF spec を読む', href: 'https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md' },
      joiner: ' / ',
      second: { label: 'Google Cloud の紹介を読む', href: 'https://cloud.google.com/blog/products/data-analytics/how-the-open-knowledge-format-can-improve-data-sharing/' },
      trailing: '',
    },
  },
};

// "Mark It Down x OKF" 8-item list (docs/okf.html "philosophy" section #2).
// Reuses components/clipper/FeatureSection.tsx's FeatureSectionItem shape
// directly (no intro paragraph in the old page, so `intro` is simply
// omitted when rendering). Inline <code> spans in each item's body
// (.okf.zip, index.html, citations, type, _folder) are flattened to plain
// text — same precedent as content/features.ts's own OKF Export item.
interface OkfMidSectionCopy {
  eyebrow: string;
  heading: string;
  items: FeatureSectionItem[];
}

export const okfMidSection: Record<Lang, OkfMidSectionCopy> = {
  en: {
    eyebrow: 'Mark It Down x OKF',
    heading: 'A review layer for portable knowledge.',
    items: [
      {
        title: 'Export OKF bundles',
        body: 'Write notes out as .okf.zip with generated frontmatter, flat concept layout, folder indexes, and a self-contained static viewer. Source URLs are preserved as OKF resources. The activity log groups entries by date and labels each item as Creation or Update.',
      },
      {
        title: 'Static viewer',
        body: 'Each export includes a single index.html you can open directly — no server needed. Three-column layout with concept list, Markdown body, TOC, and a concept graph. Use the [+][−] buttons to zoom in on dense clusters or pull back for an overview.',
      },
      {
        title: 'Citations round-trip',
        body: 'Frontmatter citations fields survive export and import unchanged. The viewer renders them as a dedicated section per concept.',
      },
      {
        title: 'Edit on-ramp',
        body: 'The viewer footer shows how to edit the bundle in any text editor or Markdown app. No lock-in.',
      },
      {
        title: 'Import OKF bundles',
        body: 'Import a bundle explicitly from the Entry menu, including bundles without a version marker. Relative links are restored as wikilinks, and original concept paths are preserved for lossless re-export.',
      },
      {
        title: 'Keep bundle shape',
        body: 'Concept files export flat at the bundle root. Folder information travels as _folder frontmatter and restores on re-import.',
      },
      {
        title: 'Preview conformance',
        body: 'Use Portability Hub to see OKF-related findings before a note leaves the workspace.',
      },
      {
        title: 'Sync through Git',
        body: 'Push OKF-compatible note files and generated indexes as plain repository content.',
      },
    ],
  },
  ja: {
    eyebrow: 'Mark It Down x OKF',
    heading: 'ポータブルな知識のレビュー層。',
    items: [
      {
        title: 'OKF バンドルを書き出す',
        body: 'ノートを .okf.zip として出力。フラットな concept レイアウト、folder index、self-contained 静的 viewer を含みます。ソース URL は OKF resource として保持。activity log は日付ごとにグループ化し、各項目を Creation または Update としてラベル付けします。',
      },
      {
        title: '静的 Viewer',
        body: 'エクスポートには直接開ける単一の index.html が含まれます。サーバー不要。concept リスト・Markdown 本文・TOC・概念グラフの3カラムレイアウト。[+][−] ボタンで概念グラフをズームし、密集したクラスタを拡大したり全体を俯瞰できます。',
      },
      {
        title: 'Citations の往復',
        body: 'フロントマターの citations フィールドはエクスポートとインポートを通じて変化しません。Viewer では各 concept に専用の引用セクションとして表示されます。',
      },
      {
        title: 'Edit on-ramp',
        body: 'Viewer のフッターに、外部のテキストエディタや Markdown アプリでバンドルを編集するためのガイドを表示します。ロックインなし。',
      },
      {
        title: 'OKF バンドルを取り込む',
        body: 'エントリメニューから明示的にバンドルをインポートできます。version marker のないバンドルも対応。相対リンクはウィキリンクとして復元し、元の concept パスを保持するため loss-less で再エクスポートできます。',
      },
      {
        title: 'バンドルの形を保つ',
        body: 'concept ファイルはバンドルルートにフラットで出力されます。フォルダ情報は _folder フロントマターとして持ち運ばれ、再インポート時に復元されます。',
      },
      {
        title: 'conformance を確認する',
        body: 'Portability Hub で、ノートが外へ出る前に OKF 関連の findings を確認できます。',
      },
      {
        title: 'Git で同期する',
        body: 'OKF 互換の note file と生成 index を、普通の repository content として push できます。',
      },
    ],
  },
};

// "Why it fits" narrative section (docs/okf.html "philosophy" section #3).
// Plain prose, no inline formatting or links in the old page.
export const okfWhyFits: Record<Lang, OkfNarrativeCopy> = {
  en: {
    eyebrow: 'Why it fits',
    heading: 'No hostages means no hidden format.',
    paragraphs: [
      'Mark It Down is built around the idea that notes should graduate. OKF points in the same direction: knowledge remains visible as Markdown, metadata remains visible as frontmatter, and history remains visible in Git.',
      'That makes Mark It Down a good place to inspect and rewrite OKF content. It is not a managed catalog, enrichment agent, or hosted integration. It is the human review step between an incoming bundle and the next place that bundle needs to go.',
    ],
  },
  ja: {
    eyebrow: 'Why it fits',
    heading: 'No hostages は、隠れた形式を持たないこと。',
    paragraphs: [
      'Mark It Down は、ノートがいつでも卒業できることを前提に作っています。OKF も同じ方向を向いています。知識は Markdown として見え、メタデータは frontmatter として見え、履歴は Git で見えます。',
      'だから Mark It Down は OKF content を点検し、書き直し、整える場所に向いています。これは managed catalog でも enrichment agent でも hosted integration でもありません。入ってきたバンドルと次の行き先の間に置く、人間のレビュー工程です。',
    ],
  },
};

interface OkfCtaCopy {
  heading: string;
  primaryLabel: string;
  secondaryLabel: string;
}

// Closing CTA, ported verbatim from docs/okf.html / docs/okf-ja.html. The
// old primary button's inline gtag() analytics call is dropped — this
// rebuild has no analytics wiring, matching the same omission already made
// for content/rss.ts / content/clipper.ts's CTA copy.
export const okfCta: Record<Lang, OkfCtaCopy> = {
  en: {
    heading: 'Bring knowledge in. Rewrite it. Let it leave.',
    primaryLabel: 'Get the extension',
    secondaryLabel: 'See all features',
  },
  ja: {
    heading: '知識を取り込み、書き直し、外へ出す。',
    primaryLabel: '拡張機能を入手する',
    secondaryLabel: '機能を見る',
  },
};

// WebPage JSON-LD, ported verbatim from docs/okf.html / docs/okf-ja.html
// (same shape as content/rss.ts's rssJsonLd / content/clipper.ts's
// clipperJsonLd).
export const okfJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Open Knowledge Format (OKF) — Mark It Down',
    description: 'How Mark It Down supports Open Knowledge Format as portable Markdown knowledge bundles.',
    inLanguage: 'en',
    url: 'https://markitdown.reduktion.dev/okf.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
  ja: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Open Knowledge Format（OKF） — Mark It Down',
    description: 'Mark It Down の Open Knowledge Format 対応。ポータブルな Markdown knowledge bundle として OKF を扱います。',
    inLanguage: 'ja',
    url: 'https://markitdown.reduktion.dev/okf-ja.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
};
