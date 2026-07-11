export type { Lang } from './index';
import type { Lang } from './index';

interface FaqCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
}

// Hero copy lifted verbatim from docs/faq.html / docs/faq-ja.html (#1593
// Phase 3-4).
//
// JA h1: the old markup separated "エディタの" from "FAQ" with a manually
// inserted zero-width space (U+200B) for line-break hinting (same precedent
// as content/why.ts / content/clipper.ts / content/rss.ts). After stripping
// the zero-width space, "の" and "FAQ" would run together with no visual gap,
// so a real space is reinserted before "FAQ" — a known, accepted parity gap
// against the SEO baseline's firstH1 for the JA page (see final report).
export const faqContent: Record<Lang, FaqCopy> = {
  en: {
    lang: 'en',
    title: 'FAQ: Free Local Markdown Editor — Mark It Down',
    description:
      'Frequently asked questions about Mark It Down: free use, offline writing, local storage, Web Clipper behavior, Git sync, and export options.',
    eyebrow: 'Frequently Asked Questions',
    h1: 'FAQ for the free local Markdown editor',
    heroSubtitle: 'Common questions about Mark It Down.',
  },
  ja: {
    lang: 'ja',
    title: 'FAQ: 無料・ローカルMarkdownエディタ — Mark It Down',
    description:
      'Mark It Downのよくある質問。無料利用、オフライン執筆、ローカル保存、Web Clipper、Git同期、書き出しについて。',
    eyebrow: 'よくある質問',
    h1: '無料・ローカルMarkdownエディタの FAQ',
    heroSubtitle: 'Mark It Downに関するよくある質問。',
  },
};

// One `<details>` per question; `list` covers the answer body's real <ul>/<ol>
// bullet lists (e.g. "Works offline:" / "Requires internet:" in the offline
// question). Inline <strong>/<em>/<code>/<kbd> spans within paragraphs and list
// items are flattened to plain text, following the same precedent as
// content/why.ts's WhyOriginBlock / content/features.ts's OKF Export item body.
export type FaqBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] };

export interface FaqItem {
  question: string;
  blocks: FaqBlock[];
}

export interface FaqCategory {
  heading: string;
  items: FaqItem[];
}

// Q&A content lifted verbatim from docs/faq.html / docs/faq-ja.html's 9
// category groups (25 questions total: 3+2+4+1+2+3+1+4+5). The old markup's
// `.faq-category-header` divs are plain, always-visible headers — never
// their own <details> — unlike the collapsed category accordions on the
// Features page (components/features/FeatureCategoryAccordion.tsx); each
// category here renders as a real always-visible heading followed by an
// ArchivalAccordion of that category's questions, matching the old
// information structure (see final report).
export const faqCategories: Record<Lang, FaqCategory[]> = {
  en: [
    {
      heading: 'Comparison',
      items: [
        {
          question: "How is this different from Obsidian's Web Clipper?",
          blocks: [
            { type: 'paragraph', text: "Obsidian's Web Clipper saves pages to your vault — great if storing is the goal. Mark It Down is built around a different workflow: clip a page, the Side Panel opens instantly, and you start rewriting right there. Capture and edit happen in a single flow." },
            { type: 'paragraph', text: 'The clipper uses Readability to extract article content and converts it to clean Markdown with proper headings, links, and code blocks preserved.' },
            { type: 'paragraph', text: "If you just want to save a page as-is, a generic clipper works fine. Mark It Down is for when you want to process what you've read — rewrite, restructure, then export to Markdown, PDF, HTML, or DOCX." },
          ],
        },
        {
          question: 'How does it compare to Heynote?',
          blocks: [
            { type: 'paragraph', text: 'Heynote is an excellent developer scratchpad — and a direct inspiration for Mark It Down\'s "temporary workspace" philosophy.' },
            { type: 'paragraph', text: "The key differences: Heynote is a desktop app you launch separately. Mark It Down lives in Chrome itself, so there's no URL to type, no app to open. Press the extension button (or a keyboard shortcut via chrome://extensions/shortcuts) and the Side Panel appears beside whatever you're reading. Or open a New Tab for full-screen distraction-free writing." },
            { type: 'paragraph', text: 'It also works fully offline — everything runs locally in the browser, no server involved. Different habitat, overlapping spirit.' },
          ],
        },
        {
          question: 'Why not just use Notion or Obsidian?',
          blocks: [
            { type: 'paragraph', text: "Mark It Down is meant to come before Notion or Obsidian in your workflow — not replace them. It's where you process raw material: rewrite an AI answer, restructure a clipped article, draft a note." },
            { type: 'paragraph', text: "Once it's clean, export it (Markdown, PDF, HTML, DOCX, or ZIP for batch export) and move it to wherever you store things long-term." },
            { type: 'paragraph', text: "Tool-specific syntax (Dataview queries, Notion databases, etc.) won't render here — but standard Markdown, LaTeX math, Mermaid diagrams, and GFM tables all work perfectly." },
          ],
        },
      ],
    },
    {
      heading: 'Data & Storage',
      items: [
        {
          question: "Will my data be deleted if I clear Chrome's cache?",
          blocks: [
            { type: 'paragraph', text: 'No. Notes are stored in a dedicated extension storage area, separate from browser cache.' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Browser cache cleared → Data is preserved ✓',
                'Extension uninstalled → Data is deleted ⚠️',
              ],
            },
            { type: 'paragraph', text: 'Tip: Use Git sync for external backup before uninstalling.' },
          ],
        },
        {
          question: 'Can I use Mark It Down offline?',
          blocks: [
            { type: 'paragraph', text: 'Yes — everyday writing is fully offline.' },
            { type: 'paragraph', text: 'Works offline:' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Editing, saving, and note management (chrome.storage.local)',
                'Mermaid diagrams, KaTeX math, and syntax highlighting (all bundled)',
                'Export: PDF, PNG, DOCX, .md, EPUB, LaTeX — all processed locally',
                'Themes, Find & Replace, TOC, Command Palette',
                'Cross-Instance Compare & Edit',
              ],
            },
            { type: 'paragraph', text: 'Requires internet:' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Web Clipper (needs a live page to clip)',
                'AI Chat Extraction (Claude, ChatGPT, Grok, Gemini)',
                'Git sync (Push, Pull, Fetch)',
                'HTML export (non-self-contained) and math zoom — CDN for KaTeX CSS',
              ],
            },
          ],
        },
      ],
    },
    {
      heading: 'Notes Management',
      items: [
        {
          question: 'How do I delete notes?',
          blocks: [
            { type: 'paragraph', text: 'Deletion is a 2-step process for safety.' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Step 1: Move to Trash — Delete button moves notes to Trash (can be restored)',
                'Step 2: Permanent delete — Delete from Trash to remove permanently',
              ],
            },
            { type: 'paragraph', text: 'With Git sync: Synced notes require a Sync after moving to Trash to delete from remote. The Trash badge (Synced/Pending/Local) shows the sync status.' },
            { type: 'paragraph', text: 'Note: System notes (guides in the System folder) are protected and cannot be deleted or edited.' },
          ],
        },
        {
          question: 'How do I rename a note?',
          blocks: [
            { type: 'paragraph', text: 'The title is automatically extracted from your note content.' },
            {
              type: 'list',
              ordered: false,
              items: [
                'First # Heading or ## Heading becomes the title',
                'If no heading, the first line is used (max 50 characters)',
              ],
            },
            { type: 'paragraph', text: 'With Git sync: Filenames on remote may differ from titles. Special characters like : or / are converted to _ for safe file paths.' },
            { type: 'paragraph', text: 'Simply edit the first heading to rename your note.' },
          ],
        },
        {
          question: 'Where can I find templates?',
          blocks: [
            { type: 'paragraph', text: 'Hover over the Template folder header to reveal a gallery link icon.' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Opens the Template Gallery page with 20+ templates in 5 categories',
                'You can also visit the gallery page directly from the website',
                'Templates are ready-to-use Markdown files for notes, meetings, dev docs, and more',
              ],
            },
          ],
        },
        {
          question: 'What is Frontmatter?',
          blocks: [
            { type: 'paragraph', text: "Frontmatter is YAML metadata placed at the top of a file (between --- delimiters) that platforms like Hugo, Jekyll, and Docusaurus use to read a note's title, tags, date, and other properties." },
            { type: 'paragraph', text: 'Since v2.1.5, Frontmatter is managed separately from the note body — the editor stays clean, and Frontmatter is automatically merged on export. Edit it in the sidebar Detail Panel under the Frontmatter tab; array values like tags use a chip UI.' },
            { type: 'paragraph', text: 'Supported export formats: Markdown, HTML, EPUB, LaTeX, DOCX.' },
          ],
        },
      ],
    },
    {
      heading: 'Images & Media',
      items: [
        {
          question: 'Can I paste images into notes?',
          blocks: [
            { type: 'paragraph', text: 'Image files cannot be saved as attachments. Mark It Down is a text-based Markdown editor.' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Image URLs: You can include image links like ![](https://...)',
                'Pasting from web: May insert the image URL as a Markdown link',
                'Screenshot paste: Some apps include image data as data:image/... which appears in your note as text',
              ],
            },
            { type: 'paragraph', text: 'If an image "worked": Check your note source — it\'s either an external URL or a base64 data URL embedded as text. Data URLs work offline but make notes very large.' },
            { type: 'paragraph', text: 'For images, use external hosting and link to them in your notes.' },
          ],
        },
      ],
    },
    {
      heading: 'Archive & Large Files',
      items: [
        {
          question: 'What is Archive and how does it work?',
          blocks: [
            { type: 'paragraph', text: 'Archive is a read-only folder for completed or reference notes.' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Notes in Archive open in a lightweight viewer (faster loading)',
                'To edit an archived note, click Unlock to move it back to Inbox',
                'Great for storing completed notes you want to reference but not accidentally edit',
                'Bulk export: Pin (★) notes in Archive, then use Export → "Pinned as ZIP" to download them together',
              ],
            },
          ],
        },
        {
          question: 'What happens with large files (100KB+)?',
          blocks: [
            { type: 'paragraph', text: 'Large files are handled with optimized settings.' },
            {
              type: 'list',
              ordered: false,
              items: [
                '100KB+: Code editor and LaTeX equation editor are disabled for performance',
                '150KB+: Slash menu and drag handle are disabled',
                '300KB+: A dialog appears with options to open as read-only in Archive',
              ],
            },
            { type: 'paragraph', text: 'Mark It Down is designed for editing, not storing large raw files. Consider exporting very large files.' },
          ],
        },
      ],
    },
    {
      heading: 'Technical',
      items: [
        {
          question: "What's the storage limit?",
          blocks: [
            { type: 'paragraph', text: "Mark It Down uses chrome.storage.local with the unlimitedStorage permission — there's no hard cap from Chrome." },
            { type: 'paragraph', text: 'The sidebar shows a stacked bar with your note counts by folder (Inbox, Template, Archive, Trash) along with total notes and size, so you can see at a glance where things are accumulating.' },
            { type: 'paragraph', text: 'Performance tiers by document size:' },
            {
              type: 'list',
              ordered: false,
              items: [
                '100KB+: Cosmetic decorations simplified; code editor and math disabled',
                '150KB+: Slash menu and drag handles disabled; longer debounce',
                '300KB+: Maximum optimization mode (800ms debounce)',
              ],
            },
            { type: 'paragraph', text: 'Archived notes use a lightweight read-only renderer. Mark It Down is designed as a workspace, not a storage system — for long-term archiving, use Git sync or Export.' },
          ],
        },
        {
          question: 'Why a Chrome extension instead of an Electron app?',
          blocks: [
            { type: 'paragraph', text: 'Electron apps are heavy. More importantly, the work happens in the browser — AI chats, research, reading.' },
            { type: 'paragraph', text: "A Side Panel that stays open beside whatever tab you're on is architecturally the right fit. No context switch, no separate window to manage. The entire app is built on Preact (3KB), so it loads instantly." },
          ],
        },
        {
          question: 'What export formats are supported?',
          blocks: [
            { type: 'paragraph', text: 'Single note: Markdown (.md), PDF, HTML, DOCX (Word), PNG, EPUB (ebook), LaTeX (.tex).' },
            { type: 'paragraph', text: 'You can also copy as rich text (Ctrl+Shift+C) and paste into Word, Notion, or Google Docs with formatting preserved.' },
            { type: 'paragraph', text: 'Batch export: Select multiple notes and export as a ZIP archive (Markdown/HTML/DOCX). If non-standard syntax is found, a dialog lets you choose: output as-is / normalize all / confirm one-by-one.' },
            { type: 'paragraph', text: 'PDF export supports table of contents, page numbers, and proper pagination via Paged.js.' },
          ],
        },
      ],
    },
    {
      heading: 'Portability',
      items: [
        {
          question: 'Can I convert notes for Hugo, Obsidian, or other platforms?',
          blocks: [
            { type: 'paragraph', text: 'Yes. Use the Portability Hub to select a target platform — it detects problematic syntax and lets you convert it before exporting.' },
            { type: 'paragraph', text: 'Supported targets: CommonMark, Obsidian, Hugo/Jekyll, Docusaurus, MkDocs, GFM, Zenn, Qiita (8 total).' },
            { type: 'paragraph', text: 'On batch export, if non-standard syntax is detected you get a 3-choice dialog: output as-is / normalize all / confirm one-by-one.' },
          ],
        },
      ],
    },
    {
      heading: 'Git & Tools',
      items: [
        {
          question: 'How do I set up Git sync?',
          blocks: [
            { type: 'paragraph', text: 'Connect to GitHub or GitLab in a few steps.' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Open Git Settings (Command Palette → "Git Settings")',
                'Select provider (GitHub or GitLab)',
                'Enter your token, repository URL, and branch',
                'Click Test Connection, then Save',
              ],
            },
            { type: 'paragraph', text: 'Your token is encrypted and stored securely.' },
          ],
        },
        {
          question: 'What can I do with the Command Palette?',
          blocks: [
            { type: 'paragraph', text: 'Quick access to most features via Cmd/Ctrl + Shift + P.' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Notes: New note, search, import',
                'Edit: Undo/Redo, Find & Replace, format tables',
                'Move: Pin, move to Archive/Template/Trash',
                'Git: Sync, Pull, Push, settings',
                'View: Toggle sidebar, TOC, focus mode, themes',
                'Insert: Mermaid diagrams, code blocks, math equations, TOC (/toc), timestamps (/now, Ctrl+Alt+;)',
              ],
            },
          ],
        },
        {
          question: 'What are the paste modes?',
          blocks: [
            { type: 'paragraph', text: 'Ctrl+Shift+V activates Smart Paste.' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Markdown mode: Converts HTML and JSON to clean Markdown (default)',
                'Plain text mode: Strips all formatting',
                'Default mode: Standard browser paste behavior',
              ],
            },
            { type: 'paragraph', text: 'JSON arrays auto-convert to tables, objects to lists, and nested structures to bullet hierarchies. Change the default in Settings.' },
            { type: 'paragraph', text: 'Auto-conversion from Slack / Discord / WhatsApp:' },
            { type: 'paragraph', text: 'Pasting from these apps automatically converts app-specific syntax to standard Markdown — no Ctrl+Shift+V needed. Covered: <url|text> links, ||spoiler||, and >>> quote blocks.' },
          ],
        },
        {
          question: 'Is the Git tab in the sidebar gone?',
          blocks: [
            { type: 'paragraph', text: 'Yes — the Source Control sidebar tab was removed in v2.1.5. All Git operations (Push, Pull, Fetch, Settings, History) are still available from the Git menu at the top of the screen. Nothing was removed functionally.' },
          ],
        },
      ],
    },
    {
      heading: 'Design Philosophy',
      items: [
        {
          question: "Why only 4 folders? Isn't that too restrictive?",
          blocks: [
            { type: 'paragraph', text: 'The fixed structure (Inbox / Template / Archive / Trash) comes from a manufacturing principle called fixed-position management (定位置管理): everything has a designated place, and you always know where to look.' },
            { type: 'paragraph', text: 'When you can create unlimited folders, things accumulate without intention. You end up with an organizational system you have to maintain rather than a tool you use. The constraint is the feature.' },
            { type: 'paragraph', text: "There's also a hidden System folder for built-in reference notes (Getting Started, Markdown Reference, etc.) — you don't manage it; it's just there when you need it." },
          ],
        },
        {
          question: 'What does "intentional commits" mean for Git sync?',
          blocks: [
            { type: 'paragraph', text: 'Auto-sync tools (like Google Drive or iCloud) sync every change automatically. Mark It Down auto-saves locally every second — but pushing to Git is a deliberate action.' },
            { type: 'paragraph', text: 'You can even select specific notes to push, rather than pushing everything at once. The idea is that you tidy up first, then commit. Your remote history stays readable and meaningful, not a log of every keystroke.' },
            { type: 'paragraph', text: 'Pull is also manual, with conflict resolution built in (including a Compare & Edit mode for manual merging).' },
          ],
        },
        {
          question: 'Why is there no AI feature built in?',
          blocks: [
            { type: 'paragraph', text: 'By design. Mark It Down is a writing tool, not a generating tool. The philosophy is "digestion" (咀嚼) — you take AI-generated output from ChatGPT, Claude, Gemini, or wherever, paste it in, and rewrite it in your own words.' },
            { type: 'paragraph', text: 'The editor renders AI output perfectly (LaTeX math, Mermaid diagrams, code blocks with syntax highlighting, GFM tables), but it never generates content for you. The thinking happens in your head, not in the tool.' },
          ],
        },
        {
          question: 'How do I get notified when new RSS articles arrive?',
          blocks: [
            { type: 'paragraph', text: 'Open RSS settings (gear icon in the RSS modal) and enable Desktop notifications. You also need to enable Scheduled refresh — notifications are sent when a background fetch finds new items.' },
            { type: 'paragraph', text: "If notifications don't appear after enabling both, check that Chrome has permission to show notifications from this extension: go to chrome://settings/content/notifications and make sure the extension's origin is allowed. Also verify that your OS notification settings allow Chrome notifications." },
          ],
        },
        {
          question: 'How often does automatic RSS polling run?',
          blocks: [
            { type: 'paragraph', text: "You set the interval in RSS settings > Polling interval. The minimum is 30 minutes. Polling uses Chrome's built-in alarm API and runs even when Mark It Down tabs are closed — as long as Chrome itself is running." },
            { type: 'paragraph', text: 'Disabling scheduled refresh cancels the alarm immediately. Re-enabling it re-registers the alarm. The alarm is also re-registered automatically each time the extension starts up.' },
          ],
        },
      ],
    },
  ],
  ja: [
    {
      heading: '他ツールとの比較',
      items: [
        {
          question: 'ObsidianのWeb Clipperとの違いは？',
          blocks: [
            { type: 'paragraph', text: 'ObsidianのWeb Clipperはページをvaultに保存します。保存が目的なら最適です。Mark It Downは違うワークフローを想定しています。ページをクリップするとSide Panelが即座に開き、その場で書き直しを始められます。取り込みと編集が一つの流れになっています。' },
            { type: 'paragraph', text: 'クリッパーはReadabilityでページの本文を抽出し、見出し・リンク・コードブロックを保持したクリーンなMarkdownに変換します。' },
            { type: 'paragraph', text: 'ページをそのまま保存したいだけなら汎用クリッパーで十分。Mark It Downは読んだものを咀嚼したいとき — 書き直し、構成変更、そしてMarkdown・PDF・HTML・DOCXへのエクスポートまで一気に行いたいときのためのツールです。' },
          ],
        },
        {
          question: 'Heynoteとの比較は？',
          blocks: [
            { type: 'paragraph', text: 'HeynoteはMark It Downの「一時的なワークスペース」という思想に直接インスピレーションを与えた、優れた開発者向けスクラッチパッドです。' },
            { type: 'paragraph', text: '大きな違いは、Heynoteは別途起動するデスクトップアプリである点。Mark It DownはChromeの中に住んでいるので、URLを入力する必要も、アプリを開く手間もありません。拡張機能ボタンを押すか、chrome://extensions/shortcutsで設定したキーボードショートカットを叩けば、閲覧中のページの横にSide Panelがすぐ開きます。全画面で集中して書きたいときはNew Tabモードも使えます。' },
            { type: 'paragraph', text: 'さらに完全オフライン対応 — すべてブラウザ内でローカル処理されるため、インターネット接続なしでも動作します。棲む場所は違いますが、精神は重なっています。' },
          ],
        },
        {
          question: 'NotionやObsidianを使えばいいのでは？',
          blocks: [
            { type: 'paragraph', text: 'Mark It Downはワークフローの中でNotionやObsidianの前に来るツールです。置き換えるものではありません。生の素材を加工する場所：AIの回答を書き直す、クリップした記事を再構成する、ノートの下書きを作る。' },
            { type: 'paragraph', text: 'きれいになったらエクスポート（Markdown・PDF・HTML・DOCX、一括エクスポートはZIP）して、長期保存する場所に移します。' },
            { type: 'paragraph', text: 'ツール固有の構文（Dataviewクエリ、Notionデータベースなど）はレンダリングされませんが、標準Markdown、LaTeX数式、Mermaidダイアグラム、GFMテーブルは完璧に動作します。' },
          ],
        },
      ],
    },
    {
      heading: 'データ & ストレージ',
      items: [
        {
          question: 'Chromeのキャッシュを削除してもデータは消えませんか？',
          blocks: [
            { type: 'paragraph', text: '消えません。 ノートは拡張機能専用のストレージに保存されており、ブラウザのキャッシュとは別の場所です。' },
            {
              type: 'list',
              ordered: false,
              items: [
                'ブラウザキャッシュ削除 → データは保持 ✓',
                '拡張機能アンインストール → データは消去 ⚠️',
              ],
            },
            { type: 'paragraph', text: 'ヒント: アンインストール前にGit同期で外部バックアップを取っておくと安心です。' },
          ],
        },
        {
          question: 'オフラインでも使えますか？',
          blocks: [
            { type: 'paragraph', text: 'はい — 日常の執筆作業は完全オフラインで動作します。' },
            { type: 'paragraph', text: 'オフラインで使える機能:' },
            {
              type: 'list',
              ordered: false,
              items: [
                '編集・保存・ノート管理（chrome.storage.local完結）',
                'Mermaid図・KaTeX数式・シンタックスハイライト（全てバンドル済み）',
                'エクスポート: PDF / PNG / DOCX / .md / EPUB / LaTeX — ローカル処理',
                'テーマ切り替え・Find & Replace・TOC・コマンドパレット',
                'Cross-Instance Compare & Edit',
              ],
            },
            { type: 'paragraph', text: 'インターネット接続が必要:' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Web Clipper（対象Webページへのアクセスが前提）',
                'AI会話抽出（Claude、ChatGPT、Grok、Gemini）',
                'Git同期（Push、Pull、Fetch）',
                'HTMLエクスポート（非Self-Contained）・数式の拡大表示 — KaTeX CSSのCDN参照',
              ],
            },
          ],
        },
      ],
    },
    {
      heading: 'ノート管理',
      items: [
        {
          question: 'ノートを削除するには？',
          blocks: [
            { type: 'paragraph', text: '安全のため、2段階の削除プロセスになっています。' },
            {
              type: 'list',
              ordered: true,
              items: [
                'ステップ1: ゴミ箱へ移動 — 削除ボタンでゴミ箱に移動（復元可能）',
                'ステップ2: 完全削除 — ゴミ箱内で削除すると完全に消去',
              ],
            },
            { type: 'paragraph', text: 'Git同期時: 同期済みノートはゴミ箱に移動後、Syncを実行して初めてリモートから削除されます。ゴミ箱のバッジ（Synced/Pending/Local）で同期状態を確認できます。' },
            { type: 'paragraph', text: '※ Systemフォルダのガイド（システムノート）は保護されており、削除・編集できません。' },
          ],
        },
        {
          question: 'ノートのタイトルを変更するには？',
          blocks: [
            { type: 'paragraph', text: 'タイトルはノートの内容から自動的に抽出されます。' },
            {
              type: 'list',
              ordered: false,
              items: [
                '最初の # 見出し または ## 見出し がタイトルになります',
                '見出しがない場合は、最初の行がタイトルになります（最大50文字）',
              ],
            },
            { type: 'paragraph', text: 'Git同期時: リモートのファイル名はタイトルと異なる場合があります。: や / などの特殊文字は _ に変換されます。' },
            { type: 'paragraph', text: '最初の見出しを編集するだけでタイトルが変わります。' },
          ],
        },
        {
          question: 'テンプレートはどこで入手できる？',
          blocks: [
            { type: 'paragraph', text: 'Templateフォルダのヘッダーにホバーすると、ギャラリーリンクアイコンが表示されます。' },
            {
              type: 'list',
              ordered: false,
              items: [
                '5カテゴリ・20種類以上のテンプレートが揃ったテンプレートギャラリーページが開きます',
                'Webサイトから直接ギャラリーページにアクセスすることもできます',
                'ノート、議事録、開発ドキュメントなど、すぐに使えるMarkdownテンプレートが揃っています',
              ],
            },
          ],
        },
        {
          question: 'Frontmatter（フロントマター）とは何ですか？',
          blocks: [
            { type: 'paragraph', text: 'Hugo・Zenn・Jekyllなどのプラットフォームが記事のタイトル・タグ・日付などを読み取るために使うYAML形式のメタデータです（ノートの冒頭に --- で囲んで書くもの）。' },
            { type: 'paragraph', text: 'v2.1.5ではFrontmatterをノート本文とは別のフィールドで管理できるようになりました。エディタ本文はクリーンに保たれ、エクスポート時に先頭へ自動合成されます。サイドバーのDetail Panel「Frontmatter」タブで直接編集でき、タグなどの配列型はチップUIで操作できます。' },
            { type: 'paragraph', text: '対応エクスポート形式: Markdown・HTML・EPUB・LaTeX・DOCX。' },
          ],
        },
      ],
    },
    {
      heading: '画像 & メディア',
      items: [
        {
          question: '画像を貼り付けられますか？',
          blocks: [
            { type: 'paragraph', text: '画像ファイルを添付として保存することはできません。 Mark It Downはテキストベースのマークダウンエディタです。' },
            {
              type: 'list',
              ordered: false,
              items: [
                '画像URL: ![](https://...) のようなリンクは使用可能',
                'Webからの貼り付け: 画像URLがMarkdownリンクとして挿入される場合があります',
                'スクリーンショット: 一部のアプリでは data:image/... 形式でテキストとして挿入されます',
              ],
            },
            { type: 'paragraph', text: '画像が「貼れた」場合: ノートのソースを確認すると、外部URLかbase64のdata URLがテキストとして埋め込まれています。data URLはオフラインでも表示されますが、ノートが非常に重くなります。' },
            { type: 'paragraph', text: '画像を使いたい場合は、外部のホスティングサービスにアップロードしてリンクを貼り付けてください。' },
          ],
        },
      ],
    },
    {
      heading: 'Archive & 大きいファイル',
      items: [
        {
          question: 'Archiveとは何ですか？どう使いますか？',
          blocks: [
            { type: 'paragraph', text: 'Archiveは完成したノートや参照用ノートのための読み取り専用フォルダです。' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Archive内のノートは軽量ビューアで開きます（読み込みが高速）',
                '編集したい場合は、UnlockをクリックしてInboxに戻せます',
                '参照したいが誤って編集したくないノートの保管に最適です',
                '一括エクスポート: Archive内でピン留め（★）したノートは、Export →「Pinned as ZIP」でまとめてダウンロードできます',
              ],
            },
          ],
        },
        {
          question: '大きなファイル（100KB以上）はどうなりますか？',
          blocks: [
            { type: 'paragraph', text: '最適化された設定で読み込まれます。' },
            {
              type: 'list',
              ordered: false,
              items: [
                '100KB以上: コードエディタとLaTeX数式エディタがパフォーマンスのため無効化されます',
                '150KB以上: スラッシュメニューとドラッグハンドルが無効化されます',
                '300KB以上: Archiveで読み取り専用として開くオプションが表示されます',
              ],
            },
            { type: 'paragraph', text: 'Mark It Downは編集用のツールです。大きな生データはエクスポートして別の場所に保存することをおすすめします。' },
          ],
        },
      ],
    },
    {
      heading: '技術的な質問',
      items: [
        {
          question: 'ストレージの上限は？',
          blocks: [
            { type: 'paragraph', text: 'Mark It Downはchrome.storage.localにunlimitedStorage権限を付けて使用しているため、Chrome側のハードリミットはありません。' },
            { type: 'paragraph', text: 'サイドバーにはフォルダ別（Inbox / Template / Archive / Trash）のノート数を積み上げバーで表示し、合計件数とサイズも確認できます。どこにノートが溜まっているか一目でわかります。' },
            { type: 'paragraph', text: 'ドキュメントサイズに応じたパフォーマンス最適化:' },
            {
              type: 'list',
              ordered: false,
              items: [
                '100KB以上: 装飾の簡略化・コードエディタと数式エディタを無効化',
                '150KB以上: スラッシュメニューとドラッグハンドルを無効化・debounce延長',
                '300KB以上: 最大最適化モード（debounce 800ms）',
              ],
            },
            { type: 'paragraph', text: 'Archiveフォルダのノートは軽量な読み取り専用レンダラーで表示されます。Mark It Downはワークスペースであり、ストレージシステムではありません。長期保存にはGit同期やエクスポートを使ってください。' },
          ],
        },
        {
          question: 'Electronアプリではなく、なぜChrome拡張機能？',
          blocks: [
            { type: 'paragraph', text: 'Electronアプリは重い。それ以上に、作業はブラウザの中で起きています — AIチャット、リサーチ、読書。' },
            { type: 'paragraph', text: '開いているタブの横に常駐するSide Panelが、アーキテクチャとして正しい形です。コンテキストスイッチなし、別ウィンドウの管理なし。アプリ全体はPreact（3KB）で構築されているので、一瞬で起動します。' },
          ],
        },
        {
          question: '対応エクスポート形式は？',
          blocks: [
            { type: 'paragraph', text: '単体: Markdown (.md)、PDF、HTML、DOCX（Word）、PNG、EPUB（電子書籍）、LaTeX (.tex)。' },
            { type: 'paragraph', text: 'リッチテキストとしてクリップボードにコピーも可能（Ctrl+Shift+C）。Word・Notion・Google Docsに書式を保ったまま貼り付けできます。' },
            { type: 'paragraph', text: '一括エクスポート: 複数ノートを選択してMarkdown・HTML・DOCXのZIPアーカイブとして出力できます。非標準記法が含まれる場合は「そのまま出力 / 全て正規化 / 1件ずつ確認」のダイアログが表示されます。' },
            { type: 'paragraph', text: 'PDFエクスポートは目次、ページ番号、Paged.jsによる適切なページ分割に対応しています。' },
          ],
        },
      ],
    },
    {
      heading: 'ポータビリティ',
      items: [
        {
          question: '書いたノートをZennやHugo向けに変換できますか？',
          blocks: [
            { type: 'paragraph', text: 'はい。「Portability Hub」機能で出力先のプラットフォームを選ぶと、記法の問題箇所が検出されて変換できます。' },
            { type: 'paragraph', text: '対応ターゲット: CommonMark・Obsidian・Hugo/Jekyll・GFM・Zenn・Qiita・Docusaurus・MkDocs（8種類）。' },
            { type: 'paragraph', text: '複数のノートを一括エクスポートする際、非標準の記法が含まれていれば「そのまま出力 / 全て正規化 / 1件ずつ確認」のダイアログが表示されます。' },
          ],
        },
      ],
    },
    {
      heading: 'Git & ツール',
      items: [
        {
          question: 'Git同期を設定するには？',
          blocks: [
            { type: 'paragraph', text: 'GitHubまたはGitLabに数ステップで接続できます。' },
            {
              type: 'list',
              ordered: true,
              items: [
                'Git Settingsを開く（コマンドパレット → 「Git Settings」）',
                'プロバイダーを選択（GitHub または GitLab）',
                'トークン、リポジトリURL、ブランチを入力',
                'Test Connectionで確認、Saveで保存',
              ],
            },
            { type: 'paragraph', text: 'トークンは暗号化されて安全に保存されます。' },
          ],
        },
        {
          question: 'コマンドパレットで何ができますか？',
          blocks: [
            { type: 'paragraph', text: 'Cmd/Ctrl + Shift + P でほとんどの機能に素早くアクセスできます。' },
            {
              type: 'list',
              ordered: false,
              items: [
                'ノート: 新規作成、検索、インポート',
                '編集: 元に戻す/やり直し、検索と置換、テーブル整形',
                '移動: ピン留め、Archive/Template/Trashへ移動',
                'Git: 同期、Pull、Push、設定',
                '表示: サイドバー、目次、フォーカスモード、テーマ切替',
                '挿入: Mermaid図、コードブロック、数式、目次（/toc）、タイムスタンプ（/now、Ctrl+Alt+;）',
              ],
            },
          ],
        },
        {
          question: 'ペーストモードの違いは？',
          blocks: [
            { type: 'paragraph', text: 'Ctrl+Shift+VでSmart Pasteが起動します。' },
            {
              type: 'list',
              ordered: false,
              items: [
                'Markdownモード: HTMLやJSONをクリーンなMarkdownに変換（デフォルト）',
                'プレーンテキストモード: すべての書式を除去',
                'デフォルトモード: ブラウザ標準のペースト動作',
              ],
            },
            { type: 'paragraph', text: 'JSON配列はテーブルに、オブジェクトはリストに、ネスト構造は箇条書き階層に自動変換されます。デフォルトは設定で変更できます。' },
            { type: 'paragraph', text: 'Slack / Discord / WhatsApp からの自動変換:' },
            { type: 'paragraph', text: 'これらのアプリからコピーしたテキストを貼り付けると、各アプリ固有の記法が自動で標準Markdownに変換されます（Ctrl+Shift+V の操作は不要）。<url|テキスト> 形式のリンク、||スポイラー||、>>> 引用ブロックなどが対象です。' },
          ],
        },
        {
          question: 'サイドバーのGitタブがなくなりましたか？',
          blocks: [
            { type: 'paragraph', text: 'はい、v2.1.5でSource Control専用のサイドバータブを廃止しました。Git操作（Push・Pull・Fetch・設定・履歴）は引き続き画面上部のGitメニューから行えます。機能は変わっていません。' },
          ],
        },
      ],
    },
    {
      heading: '設計思想',
      items: [
        {
          question: 'フォルダが4つだけ？ 少なすぎない？',
          blocks: [
            { type: 'paragraph', text: '固定構造（Inbox / Template / Archive / Trash）は、製造業の「定位置管理」から来ています。すべてに決まった場所があり、どこを見ればいいか常に分かります。' },
            { type: 'paragraph', text: '無制限にフォルダを作れると、意図なくものが溜まっていきます。ツールを使うのではなく、整理のための仕組みを維持する羽目になる。制約こそが機能です。' },
            { type: 'paragraph', text: 'なお、組み込みリファレンスノート（Getting Started、Markdown Referenceなど）用の非表示Systemフォルダもあります。管理する必要はなく、必要なときにそこにあるだけです。' },
          ],
        },
        {
          question: 'Git同期の「意図的なコミット」とは？',
          blocks: [
            { type: 'paragraph', text: 'Google DriveやiCloudのような自動同期ツールは、あらゆる変更を自動的に同期します。Mark It Downはローカルへのオートセーブは毎秒行いますが、Gitへのpushは意識的なアクションです。' },
            { type: 'paragraph', text: '全ノートを一括ではなく、特定のノートだけを選んでpushすることもできます。まず整理して、それからコミットする。リモートの履歴は読みやすく意味のあるものになり、キーストロークごとのログにはなりません。' },
            { type: 'paragraph', text: 'Pullも手動で、コンフリクト解決機能（手動マージ用のCompare & Editモード含む）を内蔵しています。' },
          ],
        },
        {
          question: 'AI機能が内蔵されていないのはなぜ？',
          blocks: [
            { type: 'paragraph', text: '意図的な設計です。Mark It Downは書くためのツールであり、生成するツールではありません。思想は「咀嚼」 — ChatGPT、Claude、Geminiなどから生成されたAI出力を貼り付けて、自分の言葉で書き直します。' },
            { type: 'paragraph', text: 'エディタはAI出力を完璧にレンダリングしますが（LaTeX数式、Mermaidダイアグラム、構文ハイライト付きコードブロック、GFMテーブル）、コンテンツの生成は一切しません。思考はツールの中ではなく、あなたの頭の中で起きるものです。' },
          ],
        },
        {
          question: 'RSS新着記事の通知を受け取るには？',
          blocks: [
            { type: 'paragraph', text: 'RSSモーダルの設定（歯車アイコン）を開き、デスクトップ通知を有効にします。また定期取得も有効にする必要があります — バックグラウンド取得で新着が見つかったときに通知が送られます。' },
            { type: 'paragraph', text: '両方を有効にしても通知が届かない場合は、Chromeの通知設定（chrome://settings/content/notifications）でこの拡張機能からの通知が許可されているか確認してください。またOSの通知設定でChromeの通知が有効になっているかも確認してください。' },
          ],
        },
        {
          question: 'RSS自動取得はどのくらいの頻度で動きますか？',
          blocks: [
            { type: 'paragraph', text: 'RSS設定 > 取得間隔で設定した間隔（最小30分）で動作します。Chromeの内蔵アラームAPIを使用するため、Mark It Downのタブを閉じていても、Chromeが起動している間はバックグラウンドで取得が行われます。' },
            { type: 'paragraph', text: '定期取得を無効にするとアラームはすぐに解除されます。再度有効にすると再登録されます。拡張機能の起動時にも自動で再登録されます。' },
          ],
        },
      ],
    },
  ],
};

// Closing cross-link CTA, ported verbatim from docs/faq.html / docs/faq-ja.html
// (`#cta-heading` + its following <p>, 2 inline links: Troubleshooting and
// Feedback). `firstSlug` / `secondSlug` are resolved through navHref() at
// render time rather than storing literal hrefs, per this codebase's internal
// link convention.
export interface FaqCtaCopy {
  heading: string;
  before: string;
  firstLabel: string;
  firstSlug: string;
  between: string;
  secondLabel: string;
  secondSlug: string;
  after: string;
}

export const faqCta: Record<Lang, FaqCtaCopy> = {
  en: {
    heading: 'Still have questions?',
    before: 'Check out ',
    firstLabel: 'Troubleshooting',
    firstSlug: 'troubleshooting',
    between: ' or ',
    secondLabel: 'send us feedback',
    secondSlug: 'feedback',
    after: '.',
  },
  ja: {
    heading: 'まだ質問がありますか？',
    before: '',
    firstLabel: 'トラブルシューティング',
    firstSlug: 'troubleshooting',
    between: 'を確認するか、',
    secondLabel: 'フィードバックを送信',
    secondSlug: 'feedback',
    after: 'してください。',
  },
};

// FAQPage JSON-LD, ported verbatim from docs/faq.html / docs/faq-ja.html's
// <script type="application/ld+json"> block. The old page's own JSON-LD has
// only 23 Question entries while the rendered body has 25 (the last 2 items
// in the Design Philosophy category — the RSS notification questions — are
// present in the body but absent from this schema in both languages). This
// is a pre-existing inconsistency in the old production site itself, not
// introduced by this migration; it is preserved verbatim (23 entries) rather
// than "fixed" by expanding it to 25, per the verbatim-port requirement (see
// final report).
export const faqJsonLd: Record<Lang, Record<string, unknown>> = {
  en: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: "How is this different from Obsidian's Web Clipper?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Obsidian's Web Clipper saves pages to your vault — great if storing is the goal. Mark It Down is built around a different workflow: clip a page, the Side Panel opens instantly, and you start rewriting right there. Capture and edit happen in a single flow. The clipper uses Readability to extract article content and converts it to clean Markdown with proper headings, links, and code blocks preserved. Mark It Down is for when you want to process what you've read — rewrite, restructure, then export to Markdown, PDF, HTML, or DOCX.",
        },
      },
      {
        '@type': 'Question',
        name: 'How does it compare to Heynote?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Heynote is an excellent developer scratchpad — and a direct inspiration for Mark It Down's 'temporary workspace' philosophy. Heynote is a desktop app you launch separately. Mark It Down lives in Chrome itself — press the extension button and the Side Panel appears beside whatever you're reading, or open a New Tab for full-screen writing. It works fully offline. Different habitat, overlapping spirit.",
        },
      },
      {
        '@type': 'Question',
        name: 'Why not just use Notion or Obsidian?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Mark It Down is meant to come before Notion or Obsidian in your workflow — not replace them. It's where you process raw material: rewrite an AI answer, restructure a clipped article, draft a note. Once it's clean, export it (Markdown, PDF, HTML, DOCX, or ZIP for batch export) and move it to wherever you store things long-term.",
        },
      },
      {
        '@type': 'Question',
        name: "Will my data be deleted if I clear Chrome's cache?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'No. Notes are stored in a dedicated extension storage area, separate from browser cache. Browser cache cleared → Data is preserved. Extension uninstalled → Data is deleted. Use Git sync for external backup before uninstalling.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I use Mark It Down offline?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — everyday writing is fully offline. Editing, saving, note management, Mermaid diagrams, KaTeX math, syntax highlighting, and all export formats (PDF, PNG, DOCX, .md, EPUB, LaTeX) work offline. Requires internet: Web Clipper, AI Chat Extraction, Git sync, and CDN-based HTML export.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I delete notes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Deletion is a 2-step process for safety. Step 1: Delete button moves notes to Trash (can be restored). Step 2: Delete from Trash to remove permanently. With Git sync: Synced notes require a Sync after moving to Trash to delete from remote. System notes in the System folder are protected and cannot be deleted.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I rename a note?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The title is automatically extracted from your note content. The first # Heading or ## Heading becomes the title. If no heading, the first line is used (max 50 characters). Simply edit the first heading to rename your note.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find templates?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hover over the Template folder header to reveal a gallery link icon. It opens the Template Gallery page with 20+ templates in 5 categories. Templates are ready-to-use Markdown files for notes, meetings, dev docs, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Frontmatter?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Frontmatter is YAML metadata placed at the top of a file (between --- delimiters) that platforms like Hugo, Jekyll, and Docusaurus use to read a note's title, tags, date, and other properties. Since v2.1.5, Frontmatter is managed separately from the note body — edit it in the sidebar Detail Panel under the Frontmatter tab. It is automatically merged on export. Supported formats: Markdown, HTML, EPUB, LaTeX, DOCX.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I paste images into notes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Image files cannot be saved as attachments — Mark It Down is a text-based Markdown editor. You can include image links like ![](https://...) or embed base64 data URLs (these work offline but make notes large). For images, use external hosting and link to them in your notes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is Archive and how does it work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Archive is a read-only folder for completed or reference notes. Notes in Archive open in a lightweight viewer for faster loading. To edit an archived note, click Unlock to move it back to Inbox. Pin (★) notes in Archive and use Export → 'Pinned as ZIP' for bulk download.",
        },
      },
      {
        '@type': 'Question',
        name: 'What happens with large files (100KB+)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Large files are handled with optimized settings. 100KB+: Code editor and LaTeX equation editor are disabled. 150KB+: Slash menu and drag handle are disabled. 300KB+: A dialog appears with options to open as read-only in Archive. Mark It Down is designed for editing, not storing large raw files.',
        },
      },
      {
        '@type': 'Question',
        name: "What's the storage limit?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Mark It Down uses chrome.storage.local with the unlimitedStorage permission — there's no hard cap from Chrome. The sidebar shows your note counts and total size by folder. Mark It Down is designed as a workspace, not a storage system — for long-term archiving, use Git sync or Export.",
        },
      },
      {
        '@type': 'Question',
        name: 'Why a Chrome extension instead of an Electron app?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Electron apps are heavy. More importantly, the work happens in the browser — AI chats, research, reading. A Side Panel that stays open beside whatever tab you're on is architecturally the right fit. No context switch, no separate window to manage. The entire app is built on Preact (3KB), so it loads instantly.",
        },
      },
      {
        '@type': 'Question',
        name: 'What export formats are supported?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Single note: Markdown (.md), PDF, HTML, DOCX (Word), PNG, EPUB (ebook), LaTeX (.tex). You can also copy as rich text (Ctrl+Shift+C) and paste into Word, Notion, or Google Docs with formatting preserved. Batch export: Select multiple notes and export as a ZIP archive. PDF export supports table of contents and page numbers.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I convert notes for Hugo, Obsidian, or other platforms?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Use the Portability Hub to select a target platform — it detects problematic syntax and lets you convert it before exporting. Supported targets: CommonMark, Obsidian, Hugo/Jekyll, Docusaurus, MkDocs, GFM, Zenn, Qiita (8 total).',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I set up Git sync?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Open Git Settings (Command Palette → 'Git Settings'). Select provider (GitHub or GitLab). Enter your token, repository URL, and branch. Click Test Connection, then Save. Your token is encrypted and stored securely.",
        },
      },
      {
        '@type': 'Question',
        name: 'What can I do with the Command Palette?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Quick access to most features via Cmd/Ctrl + Shift + P. Notes: New note, search, import. Edit: Undo/Redo, Find & Replace, format tables. Move: Pin, move to Archive/Template/Trash. Git: Sync, Pull, Push, settings. View: Toggle sidebar, TOC, focus mode, themes. Insert: Mermaid diagrams, code blocks, math equations, TOC (/toc), timestamps.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the paste modes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ctrl+Shift+V activates Smart Paste. Markdown mode: Converts HTML and JSON to clean Markdown (default). Plain text mode: Strips all formatting. Default mode: Standard browser paste behavior. JSON arrays auto-convert to tables, objects to lists. Auto-conversion from Slack, Discord, and WhatsApp pastes app-specific syntax to standard Markdown automatically.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is the Git tab in the sidebar gone?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — the Source Control sidebar tab was removed in v2.1.5. All Git operations (Push, Pull, Fetch, Settings, History) are still available from the Git menu at the top of the screen. Nothing was removed functionally.',
        },
      },
      {
        '@type': 'Question',
        name: "Why only 4 folders? Isn't that too restrictive?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The fixed structure (Inbox / Template / Archive / Trash) comes from a manufacturing principle called fixed-position management: everything has a designated place, and you always know where to look. When you can create unlimited folders, things accumulate without intention. The constraint is the feature. There is also a hidden System folder for built-in reference notes.',
        },
      },
      {
        '@type': 'Question',
        name: "What does 'intentional commits' mean for Git sync?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Auto-sync tools (like Google Drive or iCloud) sync every change automatically. Mark It Down auto-saves locally every second — but pushing to Git is a deliberate action. You can select specific notes to push rather than pushing everything at once. The idea is to tidy up first, then commit. Your remote history stays readable and meaningful.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why is there no AI feature built in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "By design. Mark It Down is a writing tool, not a generating tool. The philosophy is 'digestion' (咀嚼) — you take AI-generated output from ChatGPT, Claude, Gemini, or wherever, paste it in, and rewrite it in your own words. The editor renders AI output perfectly (LaTeX math, Mermaid diagrams, code blocks, GFM tables), but it never generates content for you. The thinking happens in your head, not in the tool.",
        },
      },
    ],
  },
  ja: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'ObsidianのWeb Clipperとの違いは？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'ObsidianのWeb Clipperはページをvaultに保存します。Mark It Downは違うワークフローを想定しています。ページをクリップするとSide Panelが即座に開き、その場で書き直しを始められます。取り込みと編集が一つの流れになっています。クリッパーはReadabilityでページの本文を抽出し、見出し・リンク・コードブロックを保持したクリーンなMarkdownに変換します。Mark It Downは読んだものを咀嚼したいとき — 書き直し、構成変更、エクスポートまで一気に行いたいときのためのツールです。',
        },
      },
      {
        '@type': 'Question',
        name: 'Heynoteとの比較は？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'HeynoteはMark It Downの「一時的なワークスペース」という思想に直接インスピレーションを与えた優れた開発者向けスクラッチパッドです。Heynoteは別途起動するデスクトップアプリである一方、Mark It DownはChromeの中に住んでいます。拡張機能ボタンを押すかショートカットを叩けば、閲覧中のページの横にSide Panelがすぐ開きます。全画面で集中して書きたいときはNew Tabモードも使えます。完全オフライン対応で、すべてブラウザ内でローカル処理されます。',
        },
      },
      {
        '@type': 'Question',
        name: 'NotionやObsidianを使えばいいのでは？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mark It Downはワークフローの中でNotionやObsidianの前に来るツールです。置き換えるものではありません。生の素材を加工する場所：AIの回答を書き直す、クリップした記事を再構成する、ノートの下書きを作る。きれいになったらエクスポートして、長期保存する場所に移します。',
        },
      },
      {
        '@type': 'Question',
        name: 'Chromeのキャッシュを削除してもデータは消えませんか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '消えません。ノートは拡張機能専用のストレージに保存されており、ブラウザのキャッシュとは別の場所です。ブラウザキャッシュ削除 → データは保持。拡張機能アンインストール → データは消去。アンインストール前にGit同期で外部バックアップを取っておくと安心です。',
        },
      },
      {
        '@type': 'Question',
        name: 'オフラインでも使えますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい — 日常の執筆作業は完全オフラインで動作します。編集・保存・ノート管理、Mermaid図・KaTeX数式・シンタックスハイライト、PDF / PNG / DOCX / .md / EPUB / LaTeX エクスポートがオフラインで使えます。インターネット接続が必要なもの: Web Clipper、AI会話抽出、Git同期、CDN参照のHTMLエクスポート。',
        },
      },
      {
        '@type': 'Question',
        name: 'ノートを削除するには？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '安全のため、2段階の削除プロセスになっています。ステップ1: 削除ボタンでゴミ箱に移動（復元可能）。ステップ2: ゴミ箱内で削除すると完全に消去。Git同期時: 同期済みノートはゴミ箱に移動後、Syncを実行して初めてリモートから削除されます。Systemフォルダのシステムノートは保護されており削除できません。',
        },
      },
      {
        '@type': 'Question',
        name: 'ノートのタイトルを変更するには？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'タイトルはノートの内容から自動的に抽出されます。最初の# 見出しまたは## 見出しがタイトルになります。見出しがない場合は最初の行がタイトルになります（最大50文字）。最初の見出しを編集するだけでタイトルが変わります。',
        },
      },
      {
        '@type': 'Question',
        name: 'テンプレートはどこで入手できる？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Templateフォルダのヘッダーにホバーすると、ギャラリーリンクアイコンが表示されます。5カテゴリ・20種類以上のテンプレートが揃ったテンプレートギャラリーページが開きます。ノート、議事録、開発ドキュメントなどすぐに使えるMarkdownテンプレートが揃っています。',
        },
      },
      {
        '@type': 'Question',
        name: 'Frontmatter（フロントマター）とは何ですか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Hugo・Zenn・Jekyllなどのプラットフォームが記事のタイトル・タグ・日付などを読み取るために使うYAML形式のメタデータです。v2.1.5ではFrontmatterをノート本文とは別のフィールドで管理できるようになりました。エクスポート時に先頭へ自動合成されます。サイドバーのDetail Panel「Frontmatter」タブで編集できます。対応エクスポート形式: Markdown・HTML・EPUB・LaTeX・DOCX。',
        },
      },
      {
        '@type': 'Question',
        name: '画像を貼り付けられますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '画像ファイルを添付として保存することはできません。Mark It Downはテキストベースのマークダウンエディタです。![](https://...) のような画像URLリンクは使用可能です。base64のdata URLも使えますが、ノートが非常に重くなります。画像を使いたい場合は外部のホスティングサービスにアップロードしてリンクを貼り付けてください。',
        },
      },
      {
        '@type': 'Question',
        name: 'Archiveとは何ですか？どう使いますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Archiveは完成したノートや参照用ノートのための読み取り専用フォルダです。Archive内のノートは軽量ビューアで開きます。編集したい場合はUnlockをクリックしてInboxに戻せます。Archive内でピン留め（★）したノートは、Export → 'Pinned as ZIP' でまとめてダウンロードできます。",
        },
      },
      {
        '@type': 'Question',
        name: '大きなファイル（100KB以上）はどうなりますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '最適化された設定で読み込まれます。100KB以上: コードエディタとLaTeX数式エディタが無効化されます。150KB以上: スラッシュメニューとドラッグハンドルが無効化されます。300KB以上: Archiveで読み取り専用として開くオプションが表示されます。Mark It Downは編集用のツールです。大きな生データはエクスポートして別の場所に保存することをおすすめします。',
        },
      },
      {
        '@type': 'Question',
        name: 'ストレージの上限は？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Mark It Downはchrome.storage.localにunlimitedStorage権限を付けて使用しているため、Chrome側のハードリミットはありません。サイドバーにはフォルダ別のノート数と合計サイズを表示します。Mark It Downはワークスペースであり、ストレージシステムではありません。長期保存にはGit同期やエクスポートを使ってください。',
        },
      },
      {
        '@type': 'Question',
        name: 'Electronアプリではなく、なぜChrome拡張機能？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Electronアプリは重い。それ以上に、作業はブラウザの中で起きています — AIチャット、リサーチ、読書。開いているタブの横に常駐するSide Panelが、アーキテクチャとして正しい形です。コンテキストスイッチなし、別ウィンドウの管理なし。アプリ全体はPreact（3KB）で構築されているので、一瞬で起動します。',
        },
      },
      {
        '@type': 'Question',
        name: '対応エクスポート形式は？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '単体: Markdown (.md)、PDF、HTML、DOCX（Word）、PNG、EPUB（電子書籍）、LaTeX (.tex)。リッチテキストとしてクリップボードにコピーも可能（Ctrl+Shift+C）。一括エクスポート: 複数ノートを選択してMarkdown・HTML・DOCXのZIPアーカイブとして出力。PDFエクスポートは目次・ページ番号・Paged.jsによるページ分割に対応。',
        },
      },
      {
        '@type': 'Question',
        name: '書いたノートをZennやHugo向けに変換できますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい。「Portability Hub」機能で出力先のプラットフォームを選ぶと、記法の問題箇所が検出されて変換できます。対応ターゲット: CommonMark・Obsidian・Hugo/Jekyll・GFM・Zenn・Qiita・Docusaurus・MkDocs（8種類）。',
        },
      },
      {
        '@type': 'Question',
        name: 'Git同期を設定するには？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'コマンドパレット → 「Git Settings」でGit設定を開きます。プロバイダー（GitHub または GitLab）を選択。トークン、リポジトリURL、ブランチを入力。Test Connectionで確認、Saveで保存。トークンは暗号化されて安全に保存されます。',
        },
      },
      {
        '@type': 'Question',
        name: 'コマンドパレットで何ができますか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cmd/Ctrl + Shift + P でほとんどの機能に素早くアクセスできます。ノート: 新規作成、検索、インポート。編集: 元に戻す/やり直し、検索と置換、テーブル整形。移動: ピン留め、Archive/Template/Trashへ移動。Git: 同期、Pull、Push、設定。表示: サイドバー、目次、フォーカスモード、テーマ切替。挿入: Mermaid図、コードブロック、数式、目次（/toc）、タイムスタンプ。',
        },
      },
      {
        '@type': 'Question',
        name: 'ペーストモードの違いは？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ctrl+Shift+VでSmart Pasteが起動します。Markdownモード: HTMLやJSONをクリーンなMarkdownに変換（デフォルト）。プレーンテキストモード: すべての書式を除去。デフォルトモード: ブラウザ標準のペースト動作。JSON配列はテーブルに、オブジェクトはリストに自動変換されます。Slack・Discord・WhatsAppからのテキストは自動で標準Markdownに変換されます。',
        },
      },
      {
        '@type': 'Question',
        name: 'サイドバーのGitタブがなくなりましたか？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'はい、v2.1.5でSource Control専用のサイドバータブを廃止しました。Git操作（Push・Pull・Fetch・設定・履歴）は引き続き画面上部のGitメニューから行えます。機能は変わっていません。',
        },
      },
      {
        '@type': 'Question',
        name: 'フォルダが4つだけ？ 少なすぎない？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '固定構造（Inbox / Template / Archive / Trash）は、製造業の「定位置管理」から来ています。すべてに決まった場所があり、どこを見ればいいか常に分かります。無制限にフォルダを作れると、意図なくものが溜まっていきます。制約こそが機能です。組み込みリファレンスノート用の非表示Systemフォルダもあります。',
        },
      },
      {
        '@type': 'Question',
        name: 'Git同期の「意図的なコミット」とは？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Google DriveやiCloudのような自動同期ツールとは違い、Mark It DownはローカルへのオートセーブはしますがGitへのpushは意識的なアクションです。全ノートを一括ではなく、特定のノートだけを選んでpushすることもできます。まず整理して、それからコミットする。リモートの履歴は読みやすく意味のあるものになります。Pullも手動で、コンフリクト解決機能を内蔵しています。',
        },
      },
      {
        '@type': 'Question',
        name: 'AI機能が内蔵されていないのはなぜ？',
        acceptedAnswer: {
          '@type': 'Answer',
          text: '意図的な設計です。Mark It Downは書くためのツールであり、生成するツールではありません。思想は「咀嚼」 — ChatGPT、Claude、Geminiなどから生成されたAI出力を貼り付けて、自分の言葉で書き直します。エディタはAI出力を完璧にレンダリングしますが（LaTeX数式、Mermaidダイアグラム、構文ハイライト付きコードブロック、GFMテーブル）、コンテンツの生成は一切しません。思考はツールの中ではなく、あなたの頭の中で起きるものです。',
        },
      },
    ],
  },
};
