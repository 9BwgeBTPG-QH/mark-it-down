export type { Lang } from './index';
import type { Lang } from './index';

interface WhyCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitleLines: string[];
}

// Hero copy lifted verbatim from docs/why.html / docs/why-ja.html
// (title / meta description / h1 / hero subtitle). The old hero's decorative
// "~ ~ ~" ornament (hero-ornament span, aria-hidden) IS ported (original-design
// rollback, 2026-07-12) — see components/why/Hero.tsx.
//
// The old markup carries a visible `<span class="section-label">Why</span>`
// above the h1 in both languages (untranslated "Why", confirmed by direct
// read of docs/why.html / docs/why-ja.html) — kept here as `eyebrow`.
//
// heroSubtitleLines restores the old markup's hard `<br>` between the two
// hero-subtitle lines (same BrokenLines precedent as content/index.ts's
// heroTaglineLines/heroSubtitleLines).
//
// JA h1: the old markup separated phrases with manually inserted zero-width
// spaces (U+200B) for line-break control, which the new <Budoux> component
// replaces (same precedent as content/rss.ts / content/clipper.ts's JA h1
// handling). After stripping the zero-width spaces, "ローカルファーストな"
// and "Markdownを" would run together with no visual gap, so a real space is
// reinserted before "Markdown" — a known, accepted parity gap against the
// SEO baseline's firstH1 for the JA page (see final report).
export const whyContent: Record<Lang, WhyCopy> = {
  en: {
    lang: 'en',
    title: 'Why Local-First Markdown Writing — Mark It Down',
    description:
      'The philosophy behind Mark It Down: local-first Markdown, no AI writing, no account wall, and a browser workspace built for rewriting in your own words.',
    eyebrow: 'Why',
    h1: 'Why local-first Markdown writing',
    heroSubtitleLines: ['No matter how smart AI gets,', 'only you can write your own thoughts.'],
  },
  ja: {
    lang: 'ja',
    title: 'なぜローカルファーストなMarkdownを書くのか — Mark It Down',
    description:
      'Mark It Downの思想。AI生成を足さず、ローカルファーストなMarkdownで、自分の言葉に書き直すためのブラウザ作業場。',
    eyebrow: 'Why',
    h1: 'なぜ、ローカルファーストな Markdownを書くのか',
    heroSubtitleLines: ['AIがどんなに賢くなっても、', 'あなたの考えはあなたしか書けない。'],
  },
};

// Part 1 "The starting point" (docs/why.html <section aria-labelledby=
// "why-origin-heading">). Modeled as an ordered block array rather than a
// fixed set of paragraph fields because EN and JA structurally diverge here:
// the old EN markup merges two sentences into one <p> with a <br>, while the
// old JA markup keeps them as two separate <p> tags — EN has 5 blocks, JA
// has 7. Blocks are preserved 1:1 with the old markup's own block boundaries
// per language rather than harmonized.
//
// `emphasis` is used only for the one paragraph that is a single, fully
// <strong>-wrapped sentence acting as a standalone rhetorical beat
// ("Externalized structure is never internalized." / "外部化された構造は、
// 内部化されない。") — a block-level device, unlike the inline mid-sentence
// <strong> trailing clauses elsewhere in this section (e.g. "Saving feels
// like reading." / "保存して「読んだ気」になる。"), which are flattened to
// plain text within their paragraph, matching the inline-formatting
// precedent already set by content/features.ts's OKF Export item body.
// A `lines` entry is either a plain string, or a [before, strong, after]
// tuple for the one old inline <strong> span embedded within a line (rather
// than a whole-paragraph <strong>, which is the `emphasis` block type
// below) — same tuple shape as content/why.ts's WhyBeliefLine, reused here
// for <strong> instead of <em>. `after` is '' when the strong span runs to
// the end of the line (see components/why/Origin.tsx for the render side).
export type WhyOriginLine = string | [before: string, strong: string, after: string];

export type WhyOriginBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'paragraph'; lines: WhyOriginLine[] }
  | { type: 'emphasis'; text: string }
  | { type: 'blockquote'; text: string };

export const whyOrigin: Record<Lang, { eyebrow: string; blocks: WhyOriginBlock[] }> = {
  en: {
    eyebrow: 'The starting point',
    blocks: [
      {
        type: 'paragraph',
        lines: [
          'You search, get output, drop it into Obsidian or Notion. Feel like you understood it.',
          ['Click to save. Get the comfort of "I\'ve secured it." ', 'Saving feels like reading.', ''],
        ],
      },
      { type: 'paragraph', text: 'Someone once said:' },
      { type: 'blockquote', text: '"I was spending more time managing my second brain than using it."' },
      { type: 'emphasis', text: 'Externalized structure is never internalized.' },
      {
        type: 'paragraph',
        lines: [
          "Pulling everything straight in is easy — but it comes with noise, and without some digestion, you won't be able to recall any of it later.",
          'You need a place to rewrite things in your own words before you save them anywhere.',
        ],
      },
    ],
  },
  ja: {
    eyebrow: '起点',
    blocks: [
      { type: 'paragraph', text: '検索した結果、出力した結果を Obsidian や Notion に放り込む。それで「わかった気」になる。' },
      {
        type: 'paragraph',
        lines: [['クリックした瞬間に「確保した」という安心感が得られる。', '保存して「読んだ気」になる。', '']],
      },
      { type: 'paragraph', text: 'ある人はこう言っている。' },
      { type: 'blockquote', text: '"I was spending more time managing my second brain than using it."' },
      { type: 'emphasis', text: '外部化された構造は、内部化されない。' },
      {
        type: 'paragraph',
        text: 'セカンドブレインに情報を集めるのは、AIが読みやすいように整理する作業に似ている。そのまま取り込むのは簡単だがノイズが混じるし、少しは咀嚼しないと将来的にその情報を引き出せない。',
      },
      { type: 'paragraph', text: '保存する前に、自分の言葉で書き直す場所が必要だ。' },
    ],
  },
};

// Part 2 "What we believe" (docs/why.html <section aria-labelledby=
// "why-beliefs-heading">). Icon SVG path data is language-independent, so
// it is stored once per item index rather than duplicated per language.
// Item bodies are `paragraphs: WhyBeliefParagraph[]` (see that type below)
// because EN item 3 ("Friction, on purpose.") has 1 paragraph while JA's has
// 2 — same structural-divergence rationale as whyOrigin. The old markup's
// hard <br> within a paragraph and its one inline <em> span are restored via
// WhyBeliefParagraph/WhyBeliefLine below rather than flattened.
export const whyBeliefsIcons: string[] = [
  'M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z',
  'M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09Z',
  'M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z',
  'M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25',
];

// A belief paragraph is a single line (string), or an array of lines to be
// joined with the old markup's hard <br> (WhyBeliefLine[]). One line in the
// whole section — "the cognitive processing <em>while you write it</em>." —
// carries an old inline <em>; it is represented as a
// [before, emphasized, after] tuple rather than a generic inline-run system,
// since it is the only occurrence in this file (see components/why/
// Beliefs.tsx for the render side).
export type WhyBeliefLine = string | [before: string, emphasized: string, after: string];
export type WhyBeliefParagraph = string | WhyBeliefLine[];

export interface WhyBeliefItem {
  title: string;
  paragraphs: WhyBeliefParagraph[];
}

export const whyBeliefs: Record<Lang, { eyebrow: string; items: WhyBeliefItem[] }> = {
  en: {
    eyebrow: 'What we believe',
    items: [
      {
        title: 'Not storage. Digestion.',
        paragraphs: [
          [
            'Information can be copied. Experience cannot.',
            [
              "The value of a note isn't in rereading it — it's in the cognitive processing ",
              'while you write it',
              '.',
            ],
          ],
          'High-resolution content fills in the imaginative gaps. Filling those gaps yourself — reaching for the words, building the picture — is what creates memory and understanding.',
          [
            'Reread, rewrite, find your own words — only then does it become knowledge.',
            'That "click" of connection, that moment things settle — it only happens when you write it yourself.',
          ],
        ],
      },
      {
        title: 'A tool should reinforce your will — not replace it.',
        paragraphs: [
          "AI's comfort is seductive. It also quietly stops your thinking. That's why there is no AI built into this tool. Use AI next to it, but the thinking is yours. Choose to take the detour.",
        ],
      },
      {
        title: 'Friction, on purpose.',
        paragraphs: [
          "Writing should be frictionless. Hoarding should not. You can't add custom folders. Sync is manual. That small resistance is time to pause and think — not a bug, a feature.",
        ],
      },
      {
        title: 'No hostages — everything here can leave.',
        paragraphs: [
          'Everything in Mark It Down can be taken out. Export as .md via Git, and never come back — your notes will survive. No tracking, no login, no server, no lock-in.',
        ],
      },
    ],
  },
  ja: {
    eyebrow: '信じていること',
    items: [
      {
        title: '保存じゃなくて、咀嚼。',
        paragraphs: [
          ['情報はコピーできるけど、経験はコピーできない。', 'ノートの価値は、後で読み返すことにあるのではなく、「書いている最中の認知処理」にある。'],
          ['解像度が高いものは、想像の余白を埋めてしまう。', '自分で余白を埋める、情景を想像する、それが記憶と理解を生む。'],
          [
            '読み直し、書き直し、自分の言葉になったとき、はじめてそれは自分の知識になる。',
            '「点と点がつながる瞬間」「腑に落ちた感じ」——それは、自分で書いた先にしかない。',
          ],
        ],
      },
      {
        title: '道具は、意志を補強する。代替しない。',
        paragraphs: [
          // "この道具に AIは内蔵しない。" — a real space is reinserted before
          // "AIは" after stripping the old markup's zero-width spaces (same
          // treatment as the h1; see whyContent's JA h1 comment above).
          [
            'AIは便利だ。だからこそ、AIの答えを鵜呑みにせず、自分の言葉で摩擦をかけられるかどうかが、これからの分水嶺になる。',
            'この道具に AIは内蔵しない。AIと一緒に使うが、考えるのはあなただ。意識的に寄り道をする。',
          ],
        ],
      },
      {
        title: '溜め込みには、あえて摩擦を。',
        paragraphs: [
          [
            '書くことは、限りなく滑らかに。でも「溜め込む」ことには、わざと摩擦をかける。フォルダは増やせない。同期は手動。',
            '「どこに保存するか」を考えさせる構造にすることで、無意識の衝動を「本当にしたい行動か」に変換する。',
          ],
          '書くことを滑らかにするツールは数えきれない。でも、溜め込む行為に摩擦をかけるツールは、ここ以外に知らない。',
        ],
      },
      {
        title: '持ち物は、いつでも出ていける。',
        paragraphs: [
          'ここにあるものは、すべて持ち出せる。Git で .md として丸ごと取り出して、二度と戻ってこなくても、あなたのノートは生き続ける。トラッキングなし、ログインなし、サーバーなし、縛りなし。',
        ],
      },
    ],
  },
};

// Part 3 "What we don't build" (docs/why.html <section aria-labelledby=
// "why-notbuilt-heading">). Old markup: <h2> is VISIBLE here (unlike Parts
// 1/2's visually-hidden headings), and the list uses the shared
// `.coming-soon-list.coming-soon-list--spaced` class with plain
// `<li><strong>Title</strong> — body</li>` items (em-dash-joined inline
// text, no <span>) — a different literal pattern from
// components/index/RecentlyAdded.tsx's `<li><strong>/<span></li>` markup,
// so a local WhyNotBuiltItem replaces the borrowed FeatureSectionItem type
// (components/clipper/FeatureSection.tsx is not reused; see
// components/why/NotBuilt.tsx).
// `subtitleLines` restores the old markup's hard <br> breaks between
// sentences (EN 2 lines, JA 3 — the JA copy has an extra
// monetization-tradeoff sentence with no EN equivalent); preserved verbatim
// per language rather than harmonized.
export interface WhyNotBuiltItem {
  title: string;
  body: string;
}

interface WhyNotBuiltCopy {
  eyebrow: string;
  heading: string;
  subtitleLines: string[];
  items: WhyNotBuiltItem[];
}

export const whyNotBuilt: Record<Lang, WhyNotBuiltCopy> = {
  en: {
    eyebrow: "What we don't build",
    heading: 'Sharpening means cutting away.',
    subtitleLines: [
      'Adding features is easy. Building the courage to leave them out is the hard part.',
      'These are absent.',
    ],
    items: [
      {
        title: 'AI generation (summarise / generate / proofread)',
        body: 'This is a place to write, not to outsource thinking.',
      },
      {
        title: 'Custom folders',
        body: 'The act of creating folders pulls you away from writing. Five folders, fixed.',
      },
      {
        title: 'Auto cloud sync',
        body: '"Tidy up, then push." That extra step is thinking time.',
      },
    ],
  },
  ja: {
    eyebrow: 'あえて、作らないもの',
    heading: '引き算が、人間中心の証明になる。',
    subtitleLines: [
      '機能を足すのは簡単だ。削る勇気を持つほうがずっと難しい。',
      'マネタイズを最優先にするなら逆の設計が正解だろう——留まらせる、溜め込ませる、依存させる。それをやるつもりはない。',
      '以下のものはここにない。',
    ],
    items: [
      {
        title: 'AI生成機能（要約・生成・校正）',
        body: 'ここは書く場所であって、考えを外注する場所ではない。',
      },
      {
        title: 'カスタムフォルダ',
        body: 'フォルダを作る行為自体が、書くことから離れていく。だから 5 つに固定。',
      },
      {
        title: '自動クラウド同期',
        body: '「片付けてからプッシュ」のリズムを守りたい。その手間が考える時間になる。',
      },
    ],
  },
};

interface WhyCtaCopy {
  heading: string;
  primaryLabel: string;
  primaryAriaLabel: string;
  secondaryLabel: string;
}

// Closing CTA, ported verbatim from docs/why.html / docs/why-ja.html. The
// old primary button's inline gtag() analytics call is dropped in favor of
// a `data-ga-cta` attribute (see components/why/Cta.tsx) — same precedent
// as content/rss.ts / content/clipper.ts's CTA copy. `primaryAriaLabel`
// restores the old primary <a>'s aria-label verbatim (the old secondary
// button carries no aria-label). Secondary button targets features.html /
// features-ja.html, matching the old page. Neither button had
// target="_blank" in the old markup.
export const whyCta: Record<Lang, WhyCtaCopy> = {
  en: {
    heading: 'Study, then write. Find your own words. Repeat.',
    primaryLabel: 'Get the extension',
    primaryAriaLabel: 'Get Mark It Down from Chrome Web Store',
    secondaryLabel: 'See how it works',
  },
  ja: {
    heading: '調べて、書く。自分の言葉にする。その繰り返しが、自分になる。',
    primaryLabel: '拡張機能を入手する',
    primaryAriaLabel: 'Chrome ウェブストアから Mark It Down を入手',
    secondaryLabel: '使い方を見る',
  },
};

// WebPage JSON-LD, ported verbatim from docs/why.html / docs/why-ja.html
// (same shape as content/rss.ts's rssJsonLd / content/clipper.ts's
// clipperJsonLd).
export const whyJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Philosophy — Mark It Down',
    description: 'The beliefs behind Mark It Down: a browser Markdown editor built for digestion, not storage.',
    inLanguage: 'en',
    url: 'https://markitdown.reduktion.dev/why.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
  ja: {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'MIDとは — Mark It Down',
    description: 'Mark It Down とは何か。保存ではなく咀嚼のために作られたブラウザ用 Markdown エディタの信念。',
    inLanguage: 'ja',
    url: 'https://markitdown.reduktion.dev/why-ja.html',
    isPartOf: {
      '@type': 'WebSite',
      name: 'Mark It Down',
      url: 'https://markitdown.reduktion.dev/',
    },
  },
};
