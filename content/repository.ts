export type { Lang } from './index';
import type { Lang } from './index';

interface RepositoryCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
}

// Repository Reader's own page, added 2026-08-07 so the Features page's Entry
// stage has a real destination to link to (content/features.ts featuresFlow
// only links stages that own a page — Web Clipper and RSS Reader already did,
// Repository Reader did not). Structure follows content/rss.ts: hero copy,
// three list sections, CTA, JSON-LD.
//
// Every claim below is a restatement of an already-shipped bullet in
// content/features.ts (repositoryReader), which in turn traces to
// $EXT/src/utils/repositoryReader.ts and repositoryReaderImport.ts. The three
// scoped ones are kept scoped on purpose: private repositories need a personal
// access token (repositoryReader.ts:68), and the link graph / Ctrl+K switcher
// see loaded files, not the whole tree.
export const repositoryContent: Record<Lang, RepositoryCopy> = {
  en: {
    lang: 'en',
    title: 'Repository Reader: browse GitHub in Markdown — Mark It Down',
    description:
      'Open a GitHub repository by URL inside Mark It Down, read its Markdown with the same renderer as your notes, and quote what you want to keep into Inbox.',
    eyebrow: 'Repository Reader',
    h1: 'Read the repository where you write',
    heroSubtitle:
      'Open a GitHub repository by URL inside Mark It Down, read its Markdown with the same renderer as your notes, and quote what you want to keep into Inbox.',
  },
  ja: {
    lang: 'ja',
    title: 'Repository Reader: GitHubをMarkdownで読む — Mark It Down',
    description:
      'Mark It DownでGitHubリポジトリをURLから開き、ノートと同じレンダラーでMarkdownを読み、残したい箇所だけInboxへ引用。',
    eyebrow: 'Repository Reader',
    h1: '書く場所で、リポジトリを読む',
    heroSubtitle:
      'Mark It DownでGitHubリポジトリをURLから開き、ノートと同じレンダラーでMarkdownを読み、残したい箇所だけInboxへ引用。',
  },
};

export interface RepositoryListItem {
  title: string;
  body: string;
}

interface RepositorySectionCopy {
  eyebrow: string;
  heading: string;
  intro: string;
  items: RepositoryListItem[];
}

interface RepositoryCtaCopy {
  heading: string;
  primaryLabel: string;
  primaryAriaLabel: string;
  secondaryLabel: string;
}

interface RepositorySectionsCopy {
  open: RepositorySectionCopy;
  navigate: RepositorySectionCopy;
  keep: RepositorySectionCopy;
  cta: RepositoryCtaCopy;
}

export const repositorySections: Record<Lang, RepositorySectionsCopy> = {
  en: {
    open: {
      eyebrow: 'Opening',
      heading: 'A repository you read, not a folder you download',
      intro:
        'Documentation lives in repositories, and reading it usually means a browser tab, a clone, or both. Repository Reader opens one from the header book icon and renders it in the workspace you were already writing in.',
      items: [
        {
          title: 'Browse Any GitHub Repository',
          body: 'Open a public repository by URL from the header book icon. Private repositories work with a personal access token',
        },
        {
          title: 'File Tree Search',
          body: 'Filter the file tree by path or filename; folders containing a match expand automatically',
        },
        {
          title: 'Unified Renderer',
          body: 'Markdown files render with the same engine as your notes: math, diagrams, code highlighting, GitHub Alerts, and images',
        },
      ],
    },
    navigate: {
      eyebrow: 'Moving around',
      heading: 'Follow the links, not the file list',
      intro:
        'A repository is a set of documents that point at each other. The reader shows those connections while you read, so you can follow an argument through the tree instead of guessing at filenames.',
      items: [
        {
          title: 'Backlinks + Hover Preview',
          body: "The right panel lists files that link to the one you're viewing. Hovering a link shows the target file's title and an excerpt",
        },
        {
          title: 'Link Graph',
          body: 'Outline or radial view of how loaded files link to each other, in the file sidebar panel — same engine as Note Graph',
        },
        {
          title: 'Ctrl+K File Switcher',
          body: 'Jump to any loaded file by name without leaving the keyboard',
        },
      ],
    },
    keep: {
      eyebrow: 'Keeping',
      heading: 'Take the paragraph, leave the repository',
      intro:
        'Reading is Entry, not the end of it. What you quote lands in Inbox as an ordinary Markdown note with its origin attached, ready to be rewritten in your own words.',
      items: [
        {
          title: 'Quote to Inbox',
          body: 'Select text in the preview and save it as a note, with the source URL, repository, branch, and file path recorded in frontmatter',
        },
        {
          title: 'Back/Forward Navigation',
          body: "Header buttons and Alt + arrow keys retrace files you've already opened in the session",
        },
        {
          title: 'Pinned Repository Auto-Load',
          body: 'Pin a repository from the history dropdown and it reopens automatically the next time you open Repository Reader',
        },
      ],
    },
    cta: {
      heading: 'Read the source. Write it down in your own words.',
      primaryLabel: 'Get the extension',
      primaryAriaLabel: 'Get Mark It Down from Chrome Web Store',
      secondaryLabel: 'See all features',
    },
  },
  ja: {
    open: {
      eyebrow: 'Opening',
      heading: 'ダウンロードするフォルダではなく、読むリポジトリ',
      intro:
        'ドキュメントはリポジトリの中にある。読むにはブラウザのタブか、cloneか、その両方が要る。Repository Readerはヘッダーの本アイコンからリポジトリを開き、いま書いている作業画面の中にそのまま表示する。',
      items: [
        {
          title: '任意のGitHubリポジトリを閲覧',
          body: 'ヘッダーの本アイコンからURLで公開リポジトリを開ける。プライベートリポジトリはPersonal Access Tokenで利用可能',
        },
        {
          title: 'ファイルツリー検索',
          body: 'パス・ファイル名でファイルツリーを絞り込める。一致したファイルを含むフォルダは自動的に展開される',
        },
        {
          title: '統一レンダラー',
          body: 'Markdownファイルをノートと同じレンダリングエンジンで表示。数式、図、コードハイライト、GitHub Alerts、画像に対応',
        },
      ],
    },
    navigate: {
      eyebrow: 'Moving around',
      heading: 'ファイル一覧ではなく、リンクをたどる',
      intro:
        'リポジトリは互いを指し合うドキュメントの集まり。読んでいる最中にそのつながりを見せるので、ファイル名を推測せずに議論の筋をたどれる。',
      items: [
        {
          title: 'バックリンク + ホバープレビュー',
          body: '右パネルに、閲覧中のファイルへリンクしているファイルの一覧を表示。リンクにカーソルを乗せるとリンク先のタイトルと冒頭を確認できる',
        },
        {
          title: 'リンクグラフ',
          body: '読み込み済みファイル間のリンクをアウトラインまたは放射状表示で確認できる、ファイルサイドバー内のグラフパネル。Note Graphと同じ表示エンジン',
        },
        {
          title: 'Ctrl+K ファイル切り替え',
          body: '読み込み済みファイルを名前で検索し、キーボードだけで即座に移動できる',
        },
      ],
    },
    keep: {
      eyebrow: 'Keeping',
      heading: '段落だけ持ち帰り、リポジトリは置いていく',
      intro:
        '読むことはEntryであって、終わりではない。引用した箇所は出典付きの普通のMarkdownノートとしてInboxに入り、自分の言葉に書き直されるのを待つ。',
      items: [
        {
          title: 'Quote to Inbox',
          body: 'プレビュー内のテキストを選択してノートとして保存。出典URL・リポジトリ・ブランチ・ファイルパスをfrontmatterに記録',
        },
        {
          title: 'Back/Forward ナビゲーション',
          body: 'ヘッダーのボタンと Alt + 矢印キーで、セッション内で開いたファイルを前後にたどれる',
        },
        {
          title: 'ピン留めリポジトリの自動読み込み',
          body: '履歴ドロップダウンからリポジトリをピン留めすると、次回Repository Readerを開いたときに自動で読み込まれる',
        },
      ],
    },
    cta: {
      heading: '読んだものを、自分の言葉で書き直す。',
      primaryLabel: '拡張機能を入手する',
      primaryAriaLabel: 'Chrome ウェブストアから Mark It Down を入手',
      secondaryLabel: '機能を見る',
    },
  },
};

export const repositoryJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: repositoryContent.en.title,
    description: repositoryContent.en.description,
    inLanguage: 'en',
    url: 'https://markitdown.reduktion.dev/repository.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
  ja: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: repositoryContent.ja.title,
    description: repositoryContent.ja.description,
    inLanguage: 'ja',
    url: 'https://markitdown.reduktion.dev/repository-ja.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
};
