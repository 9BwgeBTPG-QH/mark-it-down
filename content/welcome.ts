export type { Lang } from './index';
import type { Lang } from './index';

interface WelcomeCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  heroHeading: string;
  heroSubtitle: string;
}

// Copy ported verbatim from docs/welcome.html / docs/welcome-ja.html (#1593
// Phase 3-5, final group). h1 is outside the old page's `.welcome-hero`
// section in the source markup; heroHeading/heroSubtitle are that section's
// own h2+p, kept as a second heading level below h1 in the new page rather
// than merged into one heading.
//
// JA h1: the old markup separated "ワークスペースへ" from "ようこそ" with a
// manually inserted zero-width space (U+200B) for line-break hinting (same
// precedent as content/why.ts / content/troubleshooting.ts). Stripping it
// does not cause the two halves to run together (the boundary already sits
// at a natural word break), so no real space is reinserted — a known,
// accepted parity gap against the SEO baseline's firstH1 for the JA page
// (see final report).
export const welcomeContent: Record<Lang, WelcomeCopy> = {
  en: {
    lang: 'en',
    title: 'Welcome: Local Markdown Workspace — Mark It Down',
    description:
      'Set up Mark It Down, the free local Markdown workspace for New Tab writing, Side Panel editing, Web Clipper capture, RSS, and export.',
    h1: 'Welcome to your local Markdown workspace',
    heroHeading: 'Thanks for installing',
    heroSubtitle: 'A Markdown note-taking app that lives entirely in your browser.',
  },
  ja: {
    lang: 'ja',
    title: 'ようこそ: ローカルMarkdownワークスペース — Mark It Down',
    description:
      '無料・ローカル完結のMarkdownワークスペース、Mark It Downをセットアップ。New Tab、Side Panel、Web Clipper、RSS、書き出しを使い始める。',
    h1: 'ローカルMarkdownワークスペースへようこそ',
    heroHeading: 'インストールありがとうございます',
    heroSubtitle: 'ブラウザだけで完結する Markdown ノートアプリです。',
  },
};

// Inline run shapes shared by the fields below that carry a single <strong>
// span or a <kbd>+<kbd> pair inside a sentence (original-design rollback,
// #1593 Wave R2 — supersedes the prior Tailwind-era flattening precedent in
// content/faq.ts / content/troubleshooting.ts / content/features.ts: this
// page's app/original.css defines real `.welcome-cta kbd` / `.way-content
// kbd` / `.welcome-details .detail-content li strong` rules that only apply
// to actual <kbd>/<strong> elements, so the inline structure is restored
// instead of flattened). Rendered by components/welcome/InlineText.tsx.
export interface WelcomeStrongSegment {
  before: string;
  strong: string;
  after: string;
}

export interface WelcomeKbdPairSegment {
  before: string;
  kbd1: string;
  mid: string;
  kbd2: string;
  after: string;
}

// "First things first" block (Chrome's post-install confirmation dialog).
export interface WelcomeFirstAction {
  label: string;
  heading: string;
  body: WelcomeStrongSegment;
  screenshotSrc: string;
  screenshotAlt: string;
  fallbackText: WelcomeStrongSegment;
  subtleNote: WelcomeStrongSegment;
}

export const welcomeFirstAction: Record<Lang, WelcomeFirstAction> = {
  en: {
    label: 'First things first',
    heading: 'If you see this dialog',
    body: {
      before: 'Chrome may show a confirmation dialog right after installation. To use Mark It Down, click ',
      strong: '"Keep it"',
      after: '.',
    },
    screenshotSrc: '/screenshots/chrome-dialog-en.png',
    screenshotAlt: "Chrome dialog: Click 'Keep it'",
    fallbackText: { before: '"Did you mean to change this page?" → Click ', strong: 'Keep it', after: '' },
    subtleNote: {
      before: 'Want to go back to your previous extension? Just turn off Mark It Down at ',
      strong: 'chrome://extensions',
      after: '.',
    },
  },
  ja: {
    label: 'まず最初に',
    heading: 'このダイアログが表示されたら',
    body: {
      before: 'Chromeがインストール直後に確認ダイアログを表示することがあります。Mark It Downを使うには',
      strong: '「そのままにする」',
      after: 'を選んでください。',
    },
    screenshotSrc: '/screenshots/chrome-dialog-ja.png',
    screenshotAlt: 'Chrome ダイアログ：「そのままにする」をクリック',
    fallbackText: { before: '「このページを変更するつもりでしたか？」→ ', strong: '「そのままにする」', after: '' },
    subtleNote: {
      before: '元の拡張機能に戻したくなったら、',
      strong: 'chrome://extensions',
      after: ' で Mark It Down をオフにすれば OK です。',
    },
  },
};

// CTA block ("try it now"). The leading checkmark (old markup:
// <span class="success-marker">&#10003;</span>) is a meaningful inline mark,
// rendered as a literal prefix by components/welcome/Cta.tsx.
export interface WelcomeCta {
  instruction: WelcomeKbdPairSegment;
  successText: WelcomeStrongSegment;
}

export const welcomeCta: Record<Lang, WelcomeCta> = {
  en: {
    instruction: { before: 'Press ', kbd1: 'Ctrl', mid: ' + ', kbd2: 'T', after: ' to open a new tab' },
    successText: {
      before: 'You\'ll see a note called "',
      strong: 'Welcome to Mark It Down',
      after: '" — that means it\'s working',
    },
  },
  ja: {
    instruction: { before: '', kbd1: 'Ctrl', mid: ' + ', kbd2: 'T', after: ' で新しいタブを開いてみてください' },
    successText: { before: '「', strong: 'Mark It Downへようこそ', after: '」というノートが表示されたら成功です' },
  },
};

export const welcomeWaysLabel: Record<Lang, string> = {
  en: 'Three ways to use',
  ja: '3つの使い方',
};

export type WelcomeWayIcon = 'newTab' | 'sidePanel' | 'webClipper';

export interface WelcomeWayCard {
  icon: WelcomeWayIcon;
  heading: string;
  body: string | WelcomeStrongSegment | WelcomeKbdPairSegment;
}

// Three way-cards ("New Tab" / "Side Panel" / "Web Clipper"). New Tab's body
// carries a <kbd>+<kbd> pair, Side Panel's a <strong> span around the
// chrome:// URL (both real elements in app/original.css's `.way-content
// kbd` rule), Web Clipper's stays plain per the old markup.
export const welcomeWayCards: Record<Lang, WelcomeWayCard[]> = {
  en: [
    {
      icon: 'newTab',
      heading: 'New Tab',
      body: { before: 'Press ', kbd1: 'Ctrl', mid: ' + ', kbd2: 'T', after: ' anytime — the editor opens like a notepad.' },
    },
    {
      icon: 'sidePanel',
      heading: 'Side Panel',
      body: {
        before:
          'Click the Mark It Down icon in the toolbar (pin it via the Extensions puzzle icon). Opens the editor beside any webpage. Set up a keyboard shortcut at ',
        strong: 'chrome://extensions/shortcuts',
        after: '.',
      },
    },
    {
      icon: 'webClipper',
      heading: 'Web Clipper',
      body: 'Right-click → "Save selection" or "Save page" to clip any webpage as Markdown. The Side Panel opens automatically.',
    },
  ],
  ja: [
    {
      icon: 'newTab',
      heading: 'New Tab',
      body: { before: '', kbd1: 'Ctrl', mid: ' + ', kbd2: 'T', after: ' で開くたびにエディタが起動。メモ帳感覚で使えます。' },
    },
    {
      icon: 'sidePanel',
      heading: 'Side Panel',
      body: {
        before:
          'ツールバーの Mark It Down アイコンをクリック（Extensions のパズルピースアイコンからピン留め）。Web ページの横にエディタを開けます。ショートカットは ',
        strong: 'chrome://extensions/shortcuts',
        after: ' で登録できます。',
      },
    },
    {
      icon: 'webClipper',
      heading: 'Web Clipper',
      body: '右クリック →「Save selection」「Save page」で Web ページを Markdown として保存。サイドパネルが自動で開きます。',
    },
  ],
};

export const welcomeDetailsSummary: Record<Lang, { data: string; capability: string }> = {
  en: { data: 'About your data', capability: 'What else you can do' },
  ja: { data: 'データについて', capability: 'できること' },
};

// "About your data" — 4-item list, each with a leading yes/warn mark (old
// markup: <span class="icon-yes">✓</span> / <span class="icon-warn">⚠</span>,
// meaningful inline marks kept per pitfall #3, not flattened away). The 4th
// item's in-body link (docs/welcome.html: <a href="features.html">export
// feature</a>) is restored using the same before/link/after shape as
// components/clipper/FeatureSection.tsx's FeatureSectionItem `link` field.
export interface WelcomeDataItem {
  mark: 'yes' | 'warn';
  before: string;
  link?: { label: string; slug: string };
  after?: string;
}

export const welcomeDataItems: Record<Lang, WelcomeDataItem[]> = {
  en: [
    { mark: 'yes', before: 'All notes stored locally in your browser' },
    { mark: 'yes', before: 'No cloud sync by default (optional Git backup)' },
    { mark: 'yes', before: 'Clearing browser cache does not delete your notes' },
    {
      mark: 'warn',
      before: 'Removing the extension deletes all data — use the ',
      link: { label: 'export feature', slug: 'features' },
      after: ' first',
    },
  ],
  ja: [
    { mark: 'yes', before: 'すべてのノートはブラウザ内にローカル保存' },
    { mark: 'yes', before: 'クラウド同期はデフォルトで無効（Gitバックアップはオプション）' },
    { mark: 'yes', before: 'ブラウザのキャッシュ削除ではノートは消えません' },
    {
      mark: 'warn',
      before: '拡張機能を削除するとデータも消えます — ',
      link: { label: 'エクスポート機能', slug: 'features' },
      after: 'をご利用ください',
    },
  ],
};

// "What else you can do" — 5-item termList-style list (old markup:
// <strong>Term</strong> — description).
export interface WelcomeCapabilityItem {
  label: string;
  description: string;
}

export const welcomeCapabilityItems: Record<Lang, WelcomeCapabilityItem[]> = {
  en: [
    { label: 'Markdown Editor', description: 'Live preview, LaTeX math, Mermaid diagrams' },
    { label: 'Git Sync', description: 'Back up to GitHub / GitLab' },
    { label: 'Export', description: 'Save as PDF, DOCX, HTML, or PNG' },
    { label: '4 Themes', description: 'Light, Dark, Parchment, Candlelight' },
    { label: 'Focus Mode', description: 'Typewriter scroll for distraction-free writing' },
  ],
  ja: [
    { label: 'Markdownエディタ', description: 'ライブプレビュー、LaTeX数式、Mermaid図表に対応' },
    { label: 'Git同期', description: 'GitHub / GitLabにバックアップ' },
    { label: 'エクスポート', description: 'PDF・DOCX・HTML・PNGに書き出し' },
    { label: '4つのテーマ', description: 'Light・Dark・Parchment・Candlelight' },
    { label: 'フォーカスモード', description: 'タイプライター風スクロールで集中執筆' },
  ],
};
