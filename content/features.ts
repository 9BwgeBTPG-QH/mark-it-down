export type { Lang } from './index';
import type { Lang } from './index';

interface FeaturesCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  heroTagline: string;
  heroSubtitleLines: string[];
}

// Hero copy lifted verbatim from docs/features.html / docs/features-ja.html
// (title / meta description / h1 / hero-tagline / hero-subtitle). Unlike
// content/clipper.ts and content/rss.ts, the old Features hero has no
// eyebrow/section-label span before its h1 (confirmed against
// docs/clipper.html's "<span class=\"section-label\">Web Clipper</span>"
// counterpart, which docs/features.html does not have) — so this copy
// object intentionally omits an `eyebrow` field, and components/features/
// Hero.tsx renders no caption line. It does have an extra "hero-tagline"
// paragraph between the h1 and the hero-subtitle paragraph that clipper/rss
// don't have.
//
// Both hero-subtitle strings had a manual <br> in the old markup
// ("One pane. No distractions. <br>Write, see instantly." /
// "1ペイン。集中できる。<br>書いて、すぐ見る。"); restored here as
// heroSubtitleLines, rendered through components/index/BrokenLines.tsx
// (#1593 Wave R2 Batch 2 — inline-tag restoration), same pattern as
// content/why.ts's own lines[] fields.
//
// JA h1: the old markup separated phrases with manually inserted zero-width
// spaces (U+200B) for line-break control, replaced here by <Budoux>. Unlike
// clipper's/rss's JA h1, stripping the zero-width spaces here does not
// cause any words to run together, so no real space is reinserted.
export const featuresContent: Record<Lang, FeaturesCopy> = {
  en: {
    lang: 'en',
    title: 'Features: Web Clipper, RSS Reader, Git Sync — Mark It Down',
    description:
      'Explore Mark It Down features: Web Clipper, RSS Reader, Repository Reader, Obsidian-style wikilinks, Git sync, export, templates, and Focus Mode.',
    h1: 'Features for Web Clipper, RSS Reader, and portable Markdown',
    heroTagline: 'Write in Markdown.',
    heroSubtitleLines: ['One pane. No distractions.', 'Write, see instantly.'],
  },
  ja: {
    lang: 'ja',
    title: '機能: Web Clipper・RSS Reader・Git同期 — Mark It Down',
    description:
      'Mark It Downの機能一覧。Web Clipper、RSS Reader、Repository Reader、Obsidian風wikilink、Git同期、書き出し、テンプレートを掲載。',
    h1: 'Web Clipper、RSS Reader、ポータブルMarkdownの機能',
    heroTagline: 'Markdownで書く。',
    heroSubtitleLines: ['1ペイン。集中できる。', '書いて、すぐ見る。'],
  },
};

// Inline run for text mixing plain words with <code>/<kbd> spans, restored
// tag-for-tag from docs/features.html / docs/features-ja.html (original
// design rollback, #1593 Wave R2 Batch 2). Parallels content/okf.ts's
// OkfInlineRun. Keyboard Shortcuts items additionally use this shape for
// `title` — its old markup wraps <kbd> spans directly inside <strong>, not
// just plain text (e.g. `<strong><kbd>Ctrl</kbd>+<kbd>K</kbd></strong>`).
export type FeaturesInlineRun = string | { code: string } | { kbd: string };

export interface FeaturesListItem {
  title: string | FeaturesInlineRun[];
  body: string | FeaturesInlineRun[];
  // Optional trailing link, restored per #1593 Phase 3-3 review — the old
  // page's Web Clipper "Learn More", RSS Reader "Learn More", and Storage
  // "OKF Export" items had an in-body <a> to another page (clipper.html /
  // rss.html / okf.html). Rendered as a separate link line after the body
  // paragraph rather than as an inline mid-sentence anchor, so `body` does
  // not itself need to carry the anchor. `slug` is resolved through
  // navHref() so it flips between e.g. clipper.html/clipper-ja.html per lang
  // like every other internal link in this codebase; `label` is the old
  // page's exact anchor text.
  link?: { label: string; slug: string };
  // View category's "4 Themes" item only: restores the old markup's
  // trailing decorative <img src="wax-seal.png" alt="" class="wax-seal-accent"
  // aria-hidden="true"> after the body text (docs/features.html:310 /
  // docs/features-ja.html:308). Attributes are fixed across both items that
  // could ever use this (there is only one), so a boolean flag is enough;
  // components/features/FeatureItemRow.tsx renders the literal img tag.
  waxSealAccent?: boolean;
}

interface FeaturesSectionCopy {
  eyebrow: string;
  heading: string;
  // Decorative accordion glyph, restored from docs/features.html's
  // <span class="accordion-version">. gitSync's value is an unused ''
  // placeholder — the old markup uses an inline brand SVG there instead of a
  // glyph; that SVG is language-independent markup, so it lives as a
  // hardcoded component (components/features/GitSyncIcon.tsx) rather than
  // being duplicated as string content here.
  icon: string;
  items: FeaturesListItem[];
}

// Keyboard Shortcuts is the one category in docs/features.html /
// docs/features-ja.html with an extra nesting level (5 changelog-group
// divs, each with its own <h3 class="changelog-group-title">). Modeled as
// its own copy shape (not FeaturesSectionCopy) so components/features/
// ShortcutsSection.tsx can render each group's title as an h3 and its
// entries as non-heading text — keeping the page's heading hierarchy at
// h1 -> h2 -> h3 instead of introducing an h4 for individual shortcuts.
interface FeaturesShortcutGroupCopy {
  heading: string;
  items: FeaturesListItem[];
}

interface FeaturesShortcutsCopy {
  eyebrow: string;
  heading: string;
  icon: string;
  groups: FeaturesShortcutGroupCopy[];
}

interface FeaturesCtaCopy {
  heading: string;
  body: string;
  primaryLabel: string;
  primaryAriaLabel: string;
}

interface FeaturesSectionsCopy {
  webClipper: FeaturesSectionCopy;
  rssReader: FeaturesSectionCopy;
  repositoryReader: FeaturesSectionCopy;
  noteGraph: FeaturesSectionCopy;
  portability: FeaturesSectionCopy;
  modes: FeaturesSectionCopy;
  markdown: FeaturesSectionCopy;
  notes: FeaturesSectionCopy;
  view: FeaturesSectionCopy;
  storage: FeaturesSectionCopy;
  gitSync: FeaturesSectionCopy;
  shortcuts: FeaturesShortcutsCopy;
  cta: FeaturesCtaCopy;
}

// Category copy ported verbatim from docs/features.html / docs/features-ja.html
// (11 flat accordion categories + the nested Keyboard Shortcuts category +
// closing CTA). Each category's eyebrow/heading pair is the old
// accordion-highlight text split on its em dash ("Category — Subtitle").
//
// JA eyebrows are transcribed independently per category rather than reused
// from the EN eyebrow string — several categories use a JA-localized
// eyebrow instead of the literal English name: Portability -> "ポータビリティ",
// Modes -> "モード", Git Sync -> "Git同期", Notes -> "ノート", View -> "表示",
// Storage -> "保存", Keyboard Shortcuts -> "キーボードショートカット". The
// remaining categories (Web Clipper, RSS Reader, Repository Reader, Note
// Graph, Markdown) keep the literal English name as both EN and JA eyebrow,
// matching the product's existing English loanword usage in JA marketing.
//
// Restored per #1593 Wave R2 Batch 2 (original-design rollback): every
// category's decorative accordion icon glyph (`icon` field — note RSS
// Reader's glyph is language-cased, "rss" in EN vs "RSS" in JA, confirmed
// against both old HTML files) and every <code>/<kbd> inline tag, tag-for-tag,
// as FeaturesInlineRun[] on the affected `title`/`body` fields. The Web
// Clipper / RSS Reader "Learn More" trailing item and the inline hyperlink in
// Storage's "OKF Export" item were restored per #1593 Phase 3-3 review (see
// `link` on FeaturesListItem above) — docs/features.html links these to
// clipper.html / rss.html / okf.html respectively.
//
// <kbd> tag shape is NOT uniform across the old page: the Keyboard Shortcuts
// category wraps each physical key in its own <kbd> (e.g.
// `<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>E</kbd>`), while Storage's "Export"
// item wraps the whole combo in one <kbd> (`<kbd>Ctrl+Shift+E</kbd>`) — EN
// only. The JA "Export" / "Rich Text Copy" items have NO <kbd> at all around
// their "Ctrl+Shift+E" / "Ctrl+Shift+C" text in docs/features-ja.html (a
// genuine EN/JA asymmetry in the old markup, preserved here rather than
// "fixed").
//
// The View category's "4 Themes" item carries `waxSealAccent: true` to
// restore the old markup's trailing <img src="wax-seal.png"> (see
// FeaturesListItem.waxSealAccent above); public/wax-seal.png was restored
// from commit eed65be by the team lead (outside this task's original file
// ownership) so the asset now exists.
export const featuresSections: Record<Lang, FeaturesSectionsCopy> = {
  en: {
    webClipper: {
      eyebrow: 'Web Clipper',
      heading: 'Clip the web, capture AI',
      icon: '✂',
      items: [
        {
          title: 'Web Clipper',
          body: 'Right-click any page or selected text to save or copy it as clean Markdown. Saved notes open automatically in Side Panel',
        },
        {
          title: 'AI Chat Extraction',
          body: 'Captures output from Claude, ChatGPT, Grok, and Gemini as clean Markdown. Math, code, tables, and artifacts all preserved',
        },
        {
          title: 'Comment Thread Extraction',
          body: 'Structured Markdown from Hacker News, Reddit, and GitHub. Preserves nesting, authors, timestamps, and conversation context',
        },
        {
          title: 'llms.txt Detection',
          body: 'Auto-checks /llms-full.txt and /llms.txt before Readability fallback. 24h cache, 5s timeout',
        },
        {
          title: 'Mermaid Preservation',
          body: [
            'Mermaid.js diagram source code recovered and saved as ',
            { code: '```mermaid' },
            ' code blocks',
          ],
        },
        {
          title: 'YouTube Transcripts',
          body: 'Clips available YouTube captions as timestamped Markdown links — useful for returning to exact moments in a video',
        },
        {
          title: 'Shadow DOM / iframe Support',
          body: 'Extracts content from Shadow DOM internals and same-site iframes, reducing failures on modern SPAs',
        },
        {
          title: 'Social and Publishing Sites',
          body: 'Dedicated extractors for LinkedIn, Bluesky, Threads, Medium, and Discourse reduce cleanup after clipping',
        },
        {
          title: 'Zenn / Qiita / Hatena Blog',
          body: 'Japanese blogging platform embed syntax recognized and converted to standard Markdown. Hatena Blog footnotes become Markdown footnotes when clipped from RSS',
        },
        {
          title: 'Save Selection — Unified Quote Format',
          body: 'Saving selected text via right-click or RSS Quote Selection always produces the same structure: frontmatter (source URL + timestamp) + blockquote + attribution link + disclaimer footer',
        },
        {
          title: 'Ruby text → Aozora notation',
          body: [
            'Pages with ',
            { code: '<ruby>' },
            ' annotations (common in Japanese content) convert automatically to ',
            { code: '漢字《かんじ》' },
            ' notation. Long articles that mix footnotes, tables, code blocks, and images also clip more accurately',
          ],
        },
        {
          title: 'Learn More',
          body: 'See the Web Clipper page for the full walkthrough',
          link: { label: 'Web Clipper page', slug: 'clipper' },
        },
      ],
    },
    rssReader: {
      eyebrow: 'RSS Reader',
      heading: 'Read, save, and sync feeds',
      icon: 'rss',
      items: [
        {
          title: 'Feed Viewer',
          body: [
            'Open RSS from the sidebar, command palette, or ',
            { kbd: 'Ctrl' },
            '+',
            { kbd: 'Shift' },
            '+',
            { kbd: 'R' },
            '. Move with ',
            { kbd: 'j' },
            '/',
            { kbd: 'k' },
            ', open with ',
            { kbd: 'Enter' },
            ' or ',
            { kbd: 'o' },
            ', save with ',
            { kbd: 'i' },
            '',
          ],
        },
        {
          title: 'Full-Screen Workspace',
          body: 'RSS Reader is an independent workspace, not a modal — left feed sidebar, center article list and reading pane, right inspector panel',
        },
        {
          title: 'Reading Pane',
          body: 'Articles render with the same engine as your notes — math, diagrams, and code highlighting included. Track read and saved state, and view the saved Markdown immediately after clipping',
        },
        {
          title: 'Article TOC',
          body: "Right panel shows the article's heading structure with scroll-spy; click a heading to jump to that section",
        },
        {
          title: 'OPML Import / Export',
          body: 'Bring subscription lists from Feedly, Inoreader, NetNewsWire, and other OPML 2.0 readers',
        },
        {
          title: 'Git Sync for RSS Settings',
          body: 'Sync feeds and denylist settings across devices while keeping per-device permissions separate',
        },
        {
          title: 'Feed Health Indicators',
          body: 'See last fetch time, failed fetches, permission needs, and saved state before deciding what to read next',
        },
        {
          title: 'Web Subscription (RSS-free Sites)',
          body: 'Subscribe to Qiita, Zenn, or any site without a public feed. Article URLs and titles are fetched automatically; body text saves only when you explicitly clip — no bulk ingestion',
        },
        {
          title: 'Auto-Tagging on Clip',
          body: "After clipping an RSS article, tags are auto-generated from its title, URL, and feed name. Can be turned off in settings",
        },
        {
          title: 'Allow-Keywords Filter',
          body: "Set per-feed keyword filters (Google Alerts–style) to let through only articles whose title, URL, or RSS description matches your terms. Chip editor in the Feeds row, Any / All toggle",
        },
        {
          title: 'Permission Badge',
          body: 'When feeds need host permissions, the extension icon badge shows the pending count and the fetch button shows a toast notification',
        },
        {
          title: 'Background Polling',
          body: [
            "Enable scheduled refresh in RSS settings and feeds update automatically at your configured interval — no need to keep the tab open. Uses Chrome's ",
            { code: 'alarms' },
            ' API; the schedule survives browser restarts',
          ],
        },
        {
          title: 'Desktop Notifications',
          body: 'Opt in from RSS settings to receive a desktop notification listing new article titles when a scheduled fetch finds fresh items. Content is generated locally — nothing sent externally',
        },
        {
          title: 'Cross-Device Read Sync',
          body: 'Articles marked as read on one device appear as read on every device in the same Chrome profile. Only read identifiers sync; article content stays local',
        },
        {
          title: 'Quote Toolbar',
          body: 'Select text in the article reading pane to reveal a floating toolbar. One click quotes the selection to Inbox with source URL and timestamp',
        },
        {
          title: 'Storage Footprint Display',
          body: 'The RSS modal header shows how much local storage your feeds occupy, with a hover tooltip breakdown. Helps calibrate retention settings',
        },
        {
          title: 'Dead Feed Cleanup',
          body: 'When a feed fails repeatedly, a prompt surfaces to remove it or update the URL — keeping your subscription list healthy without manual audits',
        },
        {
          title: 'Conditional GET (ETag / Last-Modified)',
          body: [
            'Feed requests include ',
            { code: 'If-None-Match' },
            ' and ',
            { code: 'If-Modified-Since' },
            ' headers. Unchanged feeds return 304 and skip parsing — less bandwidth, faster cycles',
          ],
        },
        {
          title: 'Retention Split',
          body: 'Set separate retention periods for read and unread articles. Keep unread items longer, prune read ones sooner',
        },
        {
          title: 'Learn More',
          body: 'See the RSS Reader page for the full walkthrough',
          link: { label: 'RSS Reader page', slug: 'rss' },
        },
      ],
    },
    repositoryReader: {
      eyebrow: 'Repository Reader',
      heading: 'Browse GitHub without leaving the app',
      icon: '📖',
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
        {
          title: 'Quote to Inbox',
          body: 'Select text in the preview and save it as a note, with source URL and timestamp recorded in frontmatter',
        },
        {
          title: 'Back/Forward Navigation',
          body: [
            'Header buttons and ',
            { kbd: 'Alt' },
            '+',
            { kbd: '←' },
            '/',
            { kbd: '→' },
            " retrace files you've already opened in the session",
          ],
        },
        {
          title: 'Pinned Repository Auto-Load',
          body: 'Pin a repository from the history dropdown and it reopens automatically the next time you open Repository Reader',
        },
      ],
    },
    noteGraph: {
      eyebrow: 'Note Graph',
      heading: 'Outline & radial views',
      icon: '🕸',
      items: [
        {
          title: 'Outline View',
          body: 'Default tree view of note links. Click any node to re-root the tree, with breadcrumb navigation and collapsible branches',
        },
        {
          title: 'Radial View',
          body: [
            'Linked notes arranged around a center node. Zoom with the mouse wheel or ',
            { kbd: 'Ctrl' },
            '+wheel, pan by dragging, and reset with the overlay Reset/+/− buttons',
          ],
        },
        {
          title: 'Keyboard Navigation',
          body: 'Move focus between graph nodes without a mouse',
        },
        {
          title: 'CJK-Aware Labels',
          body: 'Long Japanese and Chinese note titles truncate and position by angle to avoid overlapping in the radial view',
        },
        {
          title: 'Shared with Repository Reader',
          body: "The same graph view is available inside Repository Reader's file sidebar, showing links between loaded files",
        },
      ],
    },
    portability: {
      eyebrow: 'Portability',
      heading: 'Solve Markdown "dialects"',
      icon: '🔀',
      items: [
        {
          title: 'Portability Hub',
          body: 'Convert notes to the syntax of any target platform. Supported: CommonMark, Obsidian, Hugo/Jekyll, Docusaurus, MkDocs, GFM, Zenn, Qiita (8 targets)',
        },
        {
          title: 'Copy as CommonMark / GFM / Hugo / Obsidian',
          body: 'Choose a target dialect from the export menu before copying. Notes arrive closer to the format your publishing tool expects',
        },
        {
          title: 'Batch Conversion',
          body: 'On ZIP export, non-standard syntax triggers a 3-choice dialog: output as-is / normalize all / confirm one-by-one',
        },
        {
          title: 'Table Width Preservation',
          body: 'Table column widths are stored in Markdown attr-list data and reflected in HTML, PDF, and DOCX export',
        },
        {
          title: 'Pin / Star Frontmatter',
          body: 'Pinned and starred state can round-trip through export/import instead of being lost at the boundary',
        },
        {
          title: 'Chat Format Smart Paste',
          body: 'Paste from Slack, Discord, or WhatsApp — app-specific syntax auto-converts to standard Markdown. Covers links, spoilers, and quote blocks',
        },
        {
          title: 'Obsidian Wikilinks + Autocomplete',
          body: [
            'Write ',
            { code: '[[Note Title]]' },
            ' or ',
            { code: '[[Title|Alias]]' },
            '. Type ',
            { code: '[[' },
            ' for a fuzzy-search autocomplete popover. Resolved links are green, unresolved red, ambiguous amber. Ctrl+Click to navigate',
          ],
        },
        {
          title: 'Obsidian Properties + Logseq Export Presets',
          body: [
            'Built-in presets for Obsidian Properties format and Logseq ',
            { code: '::' },
            ' notation, alongside the existing CommonMark / GFM / Hugo / Obsidian copy targets',
          ],
        },
        {
          title: 'Custom Export Preset Manager',
          body: 'Create, edit, duplicate, and delete custom export presets from a dedicated UI — accessible from the right panel and the Markdown export menu',
        },
      ],
    },
    modes: {
      eyebrow: 'Modes',
      heading: 'New Tab & Side Panel',
      icon: '◐',
      items: [
        {
          title: 'New Tab',
          body: 'Full screen workspace with Focus Mode (Alt+F)',
        },
        {
          title: 'Side Panel',
          body: 'Write alongside AI or while browsing',
        },
        {
          title: 'Focus Mode',
          body: 'Typewriter scroll, cursor-aware highlighting',
        },
        {
          title: 'Command Palette',
          body: 'Fuzzy search with snippet boost, alert color indicators, syntax previews',
        },
        {
          title: 'Sticky Toolbar',
          body: 'Always visible in Side Panel',
        },
        {
          title: 'Dual Mode',
          body: 'Open both simultaneously, independent windows',
        },
        {
          title: 'Cross-Instance Compare',
          body: 'Edit the same note in New Tab and Side Panel — conflicts detected automatically when either closes, resolved with a visual diff modal',
        },
        {
          title: 'Diff Navigation',
          body: '▲2/5▼ nav controls in Compare & Edit banner. F5/Shift+F5 keyboard navigation. WYSIWYG reference view',
        },
        {
          title: 'New Tab / Side Panel Interface Parity',
          body: 'Header actions, panel pin vs. overlay behavior, and search preview availability are determined by screen role — removing subtle inconsistencies between the two views',
        },
      ],
    },
    markdown: {
      eyebrow: 'Markdown',
      heading: 'GFM + Mermaid + LaTeX',
      icon: '#',
      items: [
        {
          title: 'GitHub Flavored',
          body: 'Tables, task lists, syntax highlighting',
        },
        {
          title: 'Mermaid',
          body: 'All 19 diagram types — flowcharts, ER, mind maps, Gantt, and more. Click to enlarge, zoom 25–400% with Ctrl+scroll, fullscreen, SVG export',
        },
        {
          title: 'Math (LaTeX)',
          body: ['Inline ', { code: '$...$' }, ', block ', { code: '$$...$$' }, '. Open in new tab, save as Retina 2x PNG'],
        },
        {
          title: 'Callouts',
          body: 'NOTE, TIP, IMPORTANT, WARNING, CAUTION',
        },
        {
          title: 'Auto-Linking',
          body: 'URLs and emails become clickable',
        },
        {
          title: 'Page Links',
          body: ['Internal navigation with ', { code: '[Text](#heading)' }],
        },
        {
          title: 'Footnotes',
          body: [
            'Academic-style ',
            { code: '[^label]' },
            ' — insert via modal with auto-numbering, or type directly. Edit and delete from hover toolbar',
          ],
        },
        {
          title: 'Emoji Shortcodes',
          body: ['Type ', { code: ':smile:' }, ' to insert 😄'],
        },
        {
          title: 'Tables',
          body: 'Insert, sort columns, copy as CSV or Markdown, layout toggle (Auto / Full Width / Equal Columns), drag to reorder rows. Paste from Excel/Google Sheets',
        },
        {
          title: 'Custom Snippets',
          body: 'Save and insert your own Markdown templates. 3 built-in presets (YAML, Details, Definition List)',
        },
        {
          title: 'Insert TOC',
          body: '/toc generates table of contents from headings at cursor position',
        },
        {
          title: 'Smart Paste',
          body: 'Ctrl+Shift+V converts HTML→Markdown, JSON→tables/lists, auto-cleans LLM output HTML tags',
        },
        {
          title: 'Slash Menu',
          body: '/now, /toc, /h1–h6, /list, /task, /quote, /code, /table, /hr, /image, /mermaid, /math, /alert, /footnote. Works under 150KB',
        },
        {
          title: 'Code Language Detection',
          body: '16 languages auto-detected from shebang, DOCTYPE, and keywords',
        },
        {
          title: 'Timestamp Headings',
          body: '/now for H2/H3 timestamp, Ctrl+Alt+; for inline HH:MM',
        },
        {
          title: 'Collapsible Blocks',
          body: [
            { code: '<details>/<summary>' },
            ' click-to-expand. Insert via slash menu ',
            { code: '/details' },
            '',
          ],
        },
        {
          title: 'Heading Auto-Numbering',
          body: 'Auto-number H2–H6 with CSS counters. Toggle from the slash menu — great for academic documents',
        },
        {
          title: 'LaTeX Autocomplete',
          body: [
            'Type ',
            { code: '\\' },
            ' inside a math block for 108 LaTeX command suggestions (Greek letters, operators, arrows, etc.)',
          ],
        },
        {
          title: 'All-Notes Find & Replace',
          body: 'Search and replace across every note (Ctrl+Shift+H). Match position shown (3/17), folder filter chips, before/after preview',
        },
      ],
    },
    notes: {
      eyebrow: 'Notes',
      heading: '5 folders, fixed structure',
      icon: '📁',
      items: [
        {
          title: '5 Folders',
          body: 'Inbox / Template / Archive / Trash / System',
        },
        {
          title: 'Pinned Area',
          body: 'Pinned notes grouped in a dedicated "★ Pinned" area at the top. Hidden when empty (Alt+P)',
        },
        {
          title: 'Frontmatter',
          body: 'Manage Hugo/Jekyll/Obsidian metadata separately from note body. Edit in the dedicated Frontmatter modal — apply suggested values as chips, Copy as YAML, or Clear all. Auto-merged on export',
        },
        {
          title: 'Detail Panel',
          body: 'Preview, Frontmatter, and Info tabs inside the sidebar — inspect and edit without opening a note. Drag to resize',
        },
        {
          title: 'Hover Cards and Preview Panel',
          body: 'Check note content and metadata from the sidebar before opening the note',
        },
        {
          title: 'NoteItem Simplification',
          body: 'Each note row shows only checkbox and title. Actions consolidated in the Detail Panel',
        },
        {
          title: 'Remote Sidebar',
          body: 'Local/Remote toggle in Notes tab when Git is connected. Browse remote notes with folder grouping and Pull',
        },
        {
          title: 'Drag & Drop',
          body: 'Move notes between folders',
        },
        {
          title: 'Search',
          body: 'Fuzzy, typo-tolerant with CJK single-character support',
        },
        {
          title: 'Batch Selection',
          body: 'Shift+Click range select, Ctrl+Click toggle. Drag-and-drop, Delete, and Stage multiple notes at once',
        },
        {
          title: 'Sort',
          body: 'Name↑, Name↓, Updated↑, Updated↓ — 4-state cycle',
        },
        {
          title: 'Duplicate Detection',
          body: 'Side-by-side comparison to choose',
        },
        {
          title: 'Template Gallery',
          body: 'Browse 20+ templates from the gallery page. Link appears on Template folder hover',
        },
        {
          title: 'Note Series',
          body: 'Split a long note by heading into a linked series. Parts group in the sidebar, navigate with Alt+PageUp/PageDown, merge back anytime, or export the whole series at once',
        },
        {
          title: 'Merge Notes',
          body: 'Ctrl+Click to select, drag to reorder, combine into one',
        },
        {
          title: 'Right Panel Note Details',
          body: 'Hover a note name in the list to see its creation date, modification date, file size, and Git status in the right panel — without opening the note',
        },
        {
          title: 'Frontmatter Edit from Right Panel',
          body: 'Right-click a note name to open the Frontmatter modal. Drag fields to reorder, add and remove tags, apply export presets. Archive notes show read-only',
        },
      ],
    },
    view: {
      eyebrow: 'View',
      heading: 'TOC & themes',
      icon: '👁',
      items: [
        {
          title: 'TOC',
          body: 'Auto-generated, highlights current section. Collapsible child headings, 6 navigation buttons (top, prev/next heading, PgUp/PgDn, bottom)',
        },
        {
          title: 'Backlink Panel — Links Here',
          body: [
            'Inbound ',
            { code: '[[links]]' },
            ' pointing to the current note appear in a collapsible "Links here" list at the bottom of the TOC and in the Right Panel. Each entry shows the source note title, line number, and a preview of the surrounding text. Click or Enter to jump to the source note. Hidden when there are no backlinks',
          ],
        },
        {
          title: 'TOC Reordering',
          body: 'Drag & drop or keyboard shortcuts to restructure headings',
        },
        {
          title: 'Breadcrumbs',
          body: 'Current heading path with click-to-jump ancestors',
        },
        {
          title: 'Word Count',
          body: 'Characters, words (CJK-aware), reading time',
        },
        {
          title: '4 Themes',
          body: 'Light / Dark / Parchment / CandleLight — the editor is a room, not just a tool',
          waxSealAccent: true,
        },
        {
          title: 'Typography Presets',
          body: 'Standard / Compact / Academic / Writer — Writer is 18px, 1.8 line height, 720px centered layout for long-form writing',
        },
        {
          title: 'system-ui Font',
          body: 'Body font switched to the OS default stack. CJK rendering improved (Mac: San Francisco, Windows: Segoe UI)',
        },
        {
          title: 'Background Texture',
          body: 'Bring your own texture to make the space feel personal',
        },
        {
          title: 'Auto Pair',
          body: 'Brackets, quotes auto-complete',
        },
        {
          title: 'Code Blocks',
          body: 'Scrollable (20+ lines), reliable copy with ProseMirror-first extraction, Copy Code / Copy as Markdown. Hover delete',
        },
        {
          title: 'Inline Code',
          body: 'Double-click to copy, backtick toggle input',
        },
        {
          title: 'Blockquote Hover Delete',
          body: 'Remove blockquotes with hover trash icon, same pattern as alerts/tables/footnotes',
        },
      ],
    },
    storage: {
      eyebrow: 'Storage',
      heading: 'Auto-save, 300KB+ support',
      icon: '💾',
      items: [
        {
          title: 'Auto-save',
          body: '0.5s debounce, no save button needed',
        },
        {
          title: 'Progressive Loading',
          body: '20KB+ opens instantly — start writing while the rest loads silently',
        },
        {
          title: 'Smart Loading',
          body: '300KB+ shows choice dialog, Archive for fast read-only view',
        },
        {
          title: 'Chrome Storage',
          body: 'Survives cache clear',
        },
        {
          title: 'Import/Export',
          body: '.md, .zip, Archive Pinned',
        },
        {
          title: 'Export',
          body: [
            'PDF (page numbers, TOC, custom margins), DOCX (images, diagrams, math embedded), PNG (2x Retina), HTML (3 templates, self-contained), EPUB (Mermaid, math, code highlighting), LaTeX (.tex, heading→\\section mapping) — ',
            { kbd: 'Ctrl+Shift+E' },
            '',
          ],
        },
        {
          title: 'OKF Export',
          body: [
            'Open Knowledge Format — export notes as ',
            { code: '.okf.zip' },
            ' with generated frontmatter, a self-contained concept graph viewer, and an activity log. A citations section is auto-generated from links in the note body, and relative Markdown links between notes convert to bundle-relative OKF paths. Git sync also writes OKF-compatible files',
          ],
          link: { label: 'Open Knowledge Format', slug: 'okf' },
        },
        {
          title: 'Semantic HTML output',
          body: [
            'HTML and EPUB export render captioned images as ',
            { code: '<figure><figcaption>' },
            ', table headers as ',
            { code: '<th scope="col">' },
            ', and the TOC as a labeled ',
            { code: '<nav>' },
            ' — Markdown source unchanged',
          ],
        },
        {
          title: 'Portable Copy Targets',
          body: 'Copy as CommonMark, GFM, Hugo, or Obsidian when you need Markdown shaped for a specific destination',
        },
        {
          title: 'Rich Text Copy',
          body: [
            'Copy entire note or selection as rich text (',
            { kbd: 'Ctrl+Shift+C' },
            '). Paste into Word, Notion, or Google Docs with formatting intact',
          ],
        },
        {
          title: 'Frontmatter Auto-Merge',
          body: 'When Frontmatter is set, it is automatically prepended on export to MD, HTML, EPUB, LaTeX, and DOCX',
        },
        {
          title: 'Copy for LLM',
          body: 'YAML frontmatter (title/source/date) prepended. From Copy dropdown or command palette',
        },
        {
          title: 'Token Count',
          body: 'Estimated token count shown in toast on copy/export',
        },
        {
          title: 'Batch Export',
          body: 'Select multiple notes → ZIP archive (Markdown/HTML/DOCX). Non-standard syntax triggers a 3-choice Portability dialog',
        },
      ],
    },
    gitSync: {
      eyebrow: 'Git Sync',
      heading: 'GitHub / GitLab',
      icon: '',
      items: [
        {
          title: 'Connect',
          body: 'Personal Access Token, encrypted storage',
        },
        {
          title: 'Manual Commits',
          body: 'Meaningful snapshots, not auto-sync',
        },
        {
          title: 'Conflict Resolution',
          body: 'Side-by-side risk indicators, or "Merge in Editor" for manual WYSIWYG conflict resolution',
        },
        {
          title: 'Selective Push',
          body: 'Stage specific notes and push only those. Per-note tracking with lastPushedAt timestamps',
        },
        {
          title: 'Git Fetch',
          body: 'Check remote without changing local',
        },
        {
          title: 'History',
          body: 'View past 20 commits, diff view',
        },
        {
          title: 'Version Restore',
          body: 'Restore notes to previous versions with one click',
        },
      ],
    },
    shortcuts: {
      eyebrow: 'Keyboard Shortcuts',
      heading: 'Power user essentials',
      icon: '⌨',
      groups: [
        {
          heading: 'Navigation',
          items: [
            {
              title: [{ kbd: 'mid' }, ' + Space (address bar)'],
              body: [
                'Type ',
                { code: 'mid' },
                " in Chrome's address bar and press Space to search notes by title. Press Enter to open the note in a new tab — keyboard only, no mouse required",
              ],
            },
            {
              title: 'Line Number Jump',
              body: 'Command Palette → "Go to line" — jump the cursor to any line number. Useful in long technical notes',
            },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'K' }], body: 'Search' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'P' }], body: 'Command Palette' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: '1' }], body: 'Notes panel' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: '2' }], body: 'TOC panel' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'F' }], body: 'Sidebar search focus' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'G' }], body: 'TOC search focus' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'E' }], body: 'Export menu' },
            {
              title: [{ kbd: 'I' }, '/', { kbd: 'A' }, '/', { kbd: 'T' }, '/', { kbd: 'M' }],
              body: 'Triage selected notes to Inbox, Archive, Trash, or Template',
            },
          ],
        },
        {
          heading: 'Editing',
          items: [
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'N' }], body: 'New note' },
            { title: [{ kbd: 'Alt' }, '+', { kbd: '↑' }, '/', { kbd: '↓' }], body: 'Move line' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: ';' }], body: 'Insert date' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'F' }], body: 'Search (no replace)' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'H' }], body: 'Find & Replace (current note)' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'H' }], body: 'All-notes Find & Replace' },
          ],
        },
        {
          heading: 'View',
          items: [
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'F' }], body: 'Focus Mode' },
            { title: [{ kbd: 'F11' }], body: 'Fullscreen' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: '↑' }, '/', { kbd: '↓' }], body: 'Jump headings (read-only)' },
            { title: [{ kbd: 'PgUp' }, '/', { kbd: 'PgDn' }], body: 'Page scroll' },
          ],
        },
        {
          heading: 'TOC & Structure',
          items: [
            {
              title: 'TOC Reading Progress + Number Key Jump',
              body: 'TOC shows scroll progress as a percentage. Press 1–9 while the TOC is open to jump directly to that numbered heading',
            },
            {
              title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: '↑' }, '/', { kbd: '↓' }],
              body: 'Reorder headings in TOC (same level)',
            },
            {
              title: [{ kbd: 'Tab' }, ' / ', { kbd: 'Shift' }, '+', { kbd: 'Tab' }],
              body: 'Demote / promote heading level in TOC',
            },
          ],
        },
        {
          heading: 'Notes',
          items: [
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'P' }], body: 'Pin note' },
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'T' }], body: 'Move to Template' },
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'A' }], body: 'Move to Archive' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'S' }], body: 'Git sync' },
            {
              title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Alt' }, '+', { kbd: 'PgUp' }, '/', { kbd: 'PgDn' }],
              body: 'Previous/next note in folder',
            },
          ],
        },
      ],
    },
    cta: {
      heading: 'Ready to write?',
      body: 'Available as a Chrome extension. No account required.',
      primaryLabel: 'Get the extension',
      primaryAriaLabel: 'Get Mark It Down from Chrome Web Store',
    },
  },
  ja: {
    webClipper: {
      eyebrow: 'Web Clipper',
      heading: 'Webを切り取る。AIを取り込む。',
      icon: '✂',
      items: [
        {
          title: 'Web Clipper（コンテキストメニュー）',
          body: 'ページやテキスト選択を右クリック→Markdownとして保存またはコピー。保存後はSide Panelに自動遷移',
        },
        {
          title: 'AIチャット抽出',
          body: 'Claude・ChatGPT・Grok・Geminiの出力をMarkdownで取得。数式・コード・テーブル・Artifactをそのまま保持',
        },
        {
          title: 'コメントスレッド抽出',
          body: 'HackerNews・Reddit・GitHubから構造化Markdownを生成。ネスト・著者・日時・会話の文脈を保持',
        },
        {
          title: 'llms.txt検出',
          body: 'Readabilityフォールバック前に /llms-full.txt と /llms.txt を自動チェック。24時間キャッシュ、5秒タイムアウト',
        },
        {
          title: 'Mermaid保持',
          body: [
            'Mermaid.jsの図のソースコードを復元し、',
            { code: '```mermaid' },
            ' コードブロックとして保存',
          ],
        },
        {
          title: 'YouTube字幕取り込み',
          body: '利用できる字幕をタイムスタンプ付きMarkdownリンクとして保存。動画の該当箇所へ戻りやすい形で残せる',
        },
        {
          title: 'Shadow DOM / iframe対応',
          body: 'モダンWebアプリの内部DOM構造や同一サイトiframeのコンテンツも取り込み可能',
        },
        {
          title: 'ソーシャル / パブリッシングサイト',
          body: 'LinkedIn、Bluesky、Threads、Medium、Discourse に専用抽出を追加。クリップ後の手直しを減らせる',
        },
        {
          title: 'Zenn・Qiita・はてなブログ',
          body: 'プラットフォーム固有の埋め込み構文を認識し標準Markdownに変換。RSS経由のはてなブログ脚注はMarkdown footnoteに変換',
        },
        {
          title: 'Save Selection — 引用フォーマット統一',
          body: '右クリック「選択テキストを保存」と RSS Quote Selection はどちらも同じ形で出力される。frontmatter（保存元URL・日時）+ blockquote + 出典リンク + フッター免責文',
        },
        {
          title: 'ルビ → 青空文庫記法に変換',
          body: [
            { code: '<ruby>' },
            ' タグを含むページを取り込むと ',
            { code: '漢字《かんじ》' },
            ' 形式に自動変換される。脚注・表・コードブロック・画像を含む長文ページの取り込み品質も改善した',
          ],
        },
        {
          title: '詳しく見る',
          body: '詳しくはWeb Clipperのページへ。',
          link: { label: 'Web Clipperのページ', slug: 'clipper' },
        },
      ],
    },
    rssReader: {
      eyebrow: 'RSS Reader',
      heading: '読む、残す、同期する',
      icon: 'RSS',
      items: [
        {
          title: 'フィードビューア',
          body: [
            'サイドバー、コマンドパレット、',
            { kbd: 'Ctrl' },
            '+',
            { kbd: 'Shift' },
            '+',
            { kbd: 'R' },
            ' からRSSを開ける。',
            { kbd: 'j' },
            '/',
            { kbd: 'k' },
            'で移動、',
            { kbd: 'Enter' },
            'または',
            { kbd: 'o' },
            'で開き、',
            { kbd: 'i' },
            'で保存',
          ],
        },
        {
          title: 'フルスクリーンワークスペース',
          body: 'RSS Readerはモーダルではなく独立したワークスペース。左にフィードサイドバー、中央に記事一覧とReading Pane、右にインスペクタパネル',
        },
        {
          title: 'Reading Pane',
          body: '記事はノートと同じレンダリングエンジンで表示。数式・図・コードハイライトに対応。既読/保存済み状態を追跡し、クリップ後は保存されたMarkdownの全文を表示',
        },
        {
          title: '記事TOC',
          body: '右パネルに記事の見出し一覧をスクロール連動付きで表示。見出しをクリックすると該当箇所へジャンプする',
        },
        {
          title: 'OPMLインポート / エクスポート',
          body: 'Feedly、Inoreader、NetNewsWire など OPML 2.0 対応リーダーから購読リストを移行できる',
        },
        {
          title: 'RSS設定のGit同期',
          body: 'feeds と denylist を端末間で同期。権限状態は端末ごとに扱うため、同期で壊れにくい',
        },
        {
          title: 'Feed Health Indicator',
          body: '最終取得時刻、取得失敗、権限要否、保存済み状態を見て、次に読むものを判断できる',
        },
        {
          title: 'Web Subscription（RSSなしサイトの購読）',
          body: 'Qiita や Zenn など RSS フィードを公開していないサイトを購読リストに追加し、記事一覧を取得できる。本文保存は明示的なクリップ操作のみ',
        },
        {
          title: 'クリップ時の自動タグ付け',
          body: 'RSS 記事をクリップすると title・URL・フィード名からタグを自動生成する。設定でオフにできる',
        },
        {
          title: 'Allow-Keywords フィルター',
          body: 'フィードごとにキーワードを設定し、title・URL・RSS description に一致する記事だけを通す（Google アラート風）。フィード行のチップエディター、Any / All 切り替え対応',
        },
        {
          title: '権限バッジ通知',
          body: '権限が必要なフィードがある場合に、拡張機能アイコンバッジに件数を表示し、取得ボタンにトーストを出す',
        },
        {
          title: 'バックグラウンド定期取得',
          body: [
            'RSS設定で定期取得を有効にすると、設定した間隔でフィードがバックグラウンドで自動更新される。タブを開いたままにしなくていい。Chromeの',
            { code: 'alarms' },
            ' APIを使用。ブラウザ再起動後も自動で再登録される',
          ],
        },
        {
          title: 'デスクトップ通知',
          body: 'RSS設定でオプトインすると、定期取得で新着記事が見つかったときにタイトル一覧をローカル通知で表示。外部への送信なし',
        },
        {
          title: '既読状態のデバイス間同期',
          body: 'あるデバイスで読んだ記事が、同じChromeプロファイルの別デバイスでも既読になる。同期されるのは既読識別子のみ、本文はローカルのまま',
        },
        {
          title: '引用ツールバー',
          body: 'Reading Paneでテキストを選択するとフローティングツールバーが現れる。ワンクリックで出典URL・タイムスタンプ付き引用ノートとしてInboxへ送信',
        },
        {
          title: 'ストレージ占有量表示',
          body: 'RSSモーダルヘッダーにフィードが使用しているローカルストレージサイズを常時表示。ホバーで内訳確認でき保持期間設定の調整に役立つ',
        },
        {
          title: '死んだフィードのクリーンアップ',
          body: 'フィードが連続して失敗すると削除またはURL更新を促すプロンプトを表示。購読リストを手動で監視しなくても健全に保てる',
        },
        {
          title: 'Conditional GET（ETag / Last-Modified）',
          body: [
            'フィードリクエストに ',
            { code: 'If-None-Match' },
            ' / ',
            { code: 'If-Modified-Since' },
            ' ヘッダーを送信。未更新フィードは 304 を返しパースをスキップ——通信量削減、取得サイクル高速化',
          ],
        },
        {
          title: '保持期間の分割設定',
          body: '既読記事と未読記事の保持期間を個別に設定できる。未読は長く、既読は短くといった運用が可能',
        },
        {
          title: '詳しく見る',
          body: '詳しくはRSS Readerのページへ。',
          link: { label: 'RSS Readerのページ', slug: 'rss' },
        },
      ],
    },
    repositoryReader: {
      eyebrow: 'Repository Reader',
      heading: 'アプリを離れずGitHubを閲覧',
      icon: '📖',
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
          body: '名前でファイルを検索し、キーボードだけで即座に移動できる',
        },
        {
          title: 'Quote to Inbox',
          body: 'プレビュー内のテキストを選択してノートとして保存。出典URLとタイムスタンプをfrontmatterに記録',
        },
        {
          title: 'Back/Forward ナビゲーション',
          body: [
            'ヘッダーのボタンと',
            { kbd: 'Alt' },
            '+',
            { kbd: '←' },
            '/',
            { kbd: '→' },
            'で、セッション内で開いたファイルを前後にたどれる',
          ],
        },
        {
          title: 'ピン留めリポジトリの自動読み込み',
          body: '履歴ドロップダウンからリポジトリをピン留めすると、次回Repository Readerを開いたときに自動で読み込まれる',
        },
      ],
    },
    noteGraph: {
      eyebrow: 'Note Graph',
      heading: 'アウトライン表示と放射状表示',
      icon: '🕸',
      items: [
        {
          title: 'アウトライン表示',
          body: 'ノート間リンクのデフォルトのツリー表示。任意のノードをクリックしてツリーの起点を切り替えられる。パンくずナビゲーションと折りたたみに対応',
        },
        {
          title: '放射状表示',
          body: [
            '中心ノートを軸にリンクしたノートを放射状に配置。マウスホイールまたは',
            { kbd: 'Ctrl' },
            '+ホイールでズーム、ドラッグでパン、オーバーレイのReset/+/−ボタンで元に戻せる',
          ],
        },
        {
          title: 'キーボードナビゲーション',
          body: 'マウスを使わずグラフのノード間でフォーカスを移動できる',
        },
        {
          title: 'CJK対応ラベル',
          body: '長い日本語・中国語のノートタイトルは、放射状表示で重ならないよう省略表示され、角度に応じて配置される',
        },
        {
          title: 'Repository Readerと共通',
          body: '同じグラフ表示はRepository Readerのファイルサイドバー内でも利用でき、読み込んだファイル間のリンクを表示する',
        },
      ],
    },
    portability: {
      eyebrow: 'ポータビリティ',
      heading: 'Markdownの「方言」を解決する',
      icon: '🔀',
      items: [
        {
          title: 'Portability Hub',
          body: '出力先を選んで記法を変換。対応: CommonMark・Obsidian・Hugo/Jekyll・GFM・Zenn・Qiita・Docusaurus・MkDocs（8種類）',
        },
        {
          title: 'CommonMark / GFM / Hugo / Obsidian向けコピー',
          body: 'エクスポートメニューから出力先の方言を選んでコピー。公開先での手直しを減らせる',
        },
        {
          title: 'バッチ変換',
          body: 'ZIP一括エクスポート時、非標準記法を含むノートに「そのまま / 全正規化 / 1件ずつ確認」の3択ダイアログ',
        },
        {
          title: 'テーブル列幅の保持',
          body: '列幅をMarkdown attr-listとして保存し、HTML / PDF / DOCX exportに反映',
        },
        {
          title: 'Pin / Star frontmatter',
          body: 'ピン留めやスター状態をexport/importの境界で失いにくくする',
        },
        {
          title: 'Chat Format Smart Paste',
          body: 'Slack・Discord・WhatsAppからのペーストを自動で標準Markdownに変換。リンク・スポイラー・引用ブロック等が対象',
        },
        {
          title: 'Obsidian Wikilink ＋ オートコンプリート',
          body: [
            { code: '[[タイトル]]' },
            ' / ',
            { code: '[[タイトル|表示名]]' },
            ' で書ける。',
            { code: '[[' },
            ' と入力するとファジー検索のポップオーバーが開く。resolved は緑、unresolved は赤、ambiguous は黄色で表示。Ctrl+Click でリンク先ノートに移動',
          ],
        },
        {
          title: 'Obsidian Properties + Logseq エクスポートプリセット',
          body: [
            'Obsidian の Properties 形式と Logseq の ',
            { code: '::' },
            ' 記法に対応したプリセットを追加。既存の CommonMark / GFM / Hugo / Obsidian コピーと組み合わせて使える',
          ],
        },
        {
          title: 'カスタムエクスポートプリセットマネージャー',
          body: 'カスタムプリセットの作成・編集・削除・組み込み複製を専用UIで管理できる。右パネルと Markdown export メニューから導線を追加',
        },
      ],
    },
    modes: {
      eyebrow: 'モード',
      heading: 'New Tab & Side Panel',
      icon: '◐',
      items: [
        { title: 'New Tab', body: '全画面ワークスペース、Focus Mode (Alt+F)' },
        { title: 'Side Panel', body: 'AIやブラウジングの横で書く' },
        { title: 'Focus Mode', body: 'タイプライタースクロール、カーソル追従ハイライト' },
        {
          title: 'コマンドパレット',
          body: 'あいまい検索、アラート色インジケーター、構文プレビュー、設定操作',
        },
        { title: '固定ツールバー', body: 'Side Panelで常に表示' },
        { title: 'デュアルモード', body: '両方同時に開ける、独立したウィンドウ' },
        {
          title: 'Cross-Instance Compare & Edit',
          body: 'New TabとSide Panelで同じノートを編集しても衝突しない。差分を並べて比較・統合できる',
        },
        {
          title: 'Diffナビゲーション',
          body: 'Compare & Editバナーに▲2/5▼ナビコントロール。F5/Shift+F5キーボードナビ。参照ビューWYSIWYG化',
        },
        {
          title: 'New Tab / Side Panel のインターフェース統一',
          body: 'ヘッダーのボタン配置、パネルの固定/オーバーレイ、検索プレビューの可否を「画面の役割」に基づいて整理し直した。2つのビュー間の細かなズレを解消',
        },
      ],
    },
    markdown: {
      eyebrow: 'Markdown',
      heading: 'GFM + Mermaid + LaTeX',
      icon: '#',
      items: [
        { title: 'GitHub Flavored', body: 'テーブル、タスクリスト、シンタックスハイライト' },
        {
          title: 'Mermaid',
          body: '全19種対応 — フローチャート、ER図、マインドマップ、ガントチャート等。クリックで拡大、Ctrl+スクロールで25〜400%ズーム、全画面表示、SVG保存',
        },
        {
          title: '数式 (LaTeX)',
          body: ['インライン ', { code: '$...$' }, '、ブロック ', { code: '$$...$$' }, '。別タブで開いてRetina 2x PNGで保存'],
        },
        { title: 'コールアウト', body: 'NOTE、TIP、IMPORTANT、WARNING、CAUTION' },
        { title: '自動リンク化', body: 'URLとメールアドレスが自動でリンクに' },
        {
          title: 'ページ内リンク',
          body: [{ code: '[テキスト](#見出し)' }, ' で内部ナビゲーション'],
        },
        {
          title: '脚注',
          body: [
            '学術記法 ',
            { code: '[^label]' },
            ' — モーダルで自動採番挿入、直接入力も可。ホバーツールバーで編集・削除',
          ],
        },
        {
          title: '絵文字ショートコード',
          body: [{ code: ':smile:' }, 'で😄に変換'],
        },
        {
          title: 'テーブル',
          body: '挿入、ソート（昇順/降順）、CSV/Markdownコピー、Prettify、行ドラッグ並び替え、Layout Toggle（自動/全幅/均等）。Excel/Google Sheetsから貼り付けで自動変換。行/列クロスハイライト付き',
        },
        {
          title: 'カスタムスニペット',
          body: 'よく使う記法をテンプレート保存・挿入。ビルトイン3種（YAML、折りたたみ、定義リスト）',
        },
        { title: '目次挿入', body: '/tocで見出しからカーソル位置に目次を生成' },
        {
          title: 'Smart Paste',
          body: 'Ctrl+Shift+VでHTML→Markdown、JSON→テーブル/リスト変換。LLM出力のHTMLタグも自動クリーン',
        },
        {
          title: 'スラッシュメニュー',
          body: '/now、/toc、/h1–h6、/list、/task、/quote、/code、/table、/hr、/image、/mermaid、/math、/alert、/footnote。150KB未満で対応',
        },
        { title: 'コード言語検出', body: 'shebang・DOCTYPE・キーワードから16言語を自動判定' },
        { title: 'タイムスタンプ見出し', body: '/nowでH2/H3タイムスタンプ、Ctrl+Alt+;でインラインHH:MM' },
        {
          title: '折りたたみブロック',
          body: [
            { code: '<details>/<summary>' },
            ' をクリックで開閉。スラッシュメニュー ',
            { code: '/details' },
            ' で挿入',
          ],
        },
        {
          title: '見出し自動番号付け',
          body: 'H2〜H6に自動連番。スラッシュメニューからオン/オフ切替。論文・レポート向け',
        },
        {
          title: 'LaTeXコマンド補完',
          body: [
            '数学ブロック内で ',
            { code: '\\' },
            ' を入力すると108種類のコマンド候補を表示（ギリシャ文字・演算子・矢印等）',
          ],
        },
        {
          title: '全ノート横断 Find & Replace',
          body: '全ノートを横断して検索・置換（Ctrl+Shift+H）。マッチ位置表示（3/17）、フォルダフィルターチップ、置換前後プレビュー対応',
        },
      ],
    },
    notes: {
      eyebrow: 'ノート',
      heading: '5フォルダ固定',
      icon: '📁',
      items: [
        { title: '5フォルダ', body: 'Inbox / Template / Archive / Trash / System' },
        {
          title: 'Pinned Area',
          body: 'ピン留めノートを「★ Pinned」エリアに集約表示。0件時は非表示 (Alt+P)',
        },
        {
          title: 'Frontmatter管理',
          body: 'Hugo・Zenn・Jekyll向けメタデータを本文と分離。専用のFrontmatterモーダルで編集。候補値をチップとして適用、Copy as YAML、Clear all。エクスポート時に自動合成',
        },
        {
          title: 'Detail Panel',
          body: 'サイドバー内でPreview・Frontmatter・Infoの3タブ。ノートを開かずに確認・編集。高さドラッグ調整可能',
        },
        {
          title: 'ホバーカードとプレビューパネル',
          body: 'ノートを開く前に、サイドバー上で本文やメタ情報を確認できる',
        },
        {
          title: 'NoteItemシンプル化',
          body: '各ノート行をチェックボックスとタイトルのみに。アクションはDetail Panelに集約',
        },
        {
          title: 'Remote Sidebar',
          body: 'Git連携時にLocal/Remoteトグル。リモートノート一覧の閲覧・フォルダグループ化・Pull取り込み',
        },
        { title: 'ドラッグ&ドロップ', body: 'フォルダ間でノートを移動' },
        { title: '検索', body: 'あいまい検索、タイポ許容、CJK1文字検索対応' },
        {
          title: '一括選択',
          body: 'Shift+Clickで範囲選択、Ctrl+Clickで個別トグル。まとめてD&D、削除、ステージング',
        },
        { title: 'ソート', body: '名前↑、名前↓、更新↑、更新↓ — 4状態サイクル' },
        { title: '重複検出', body: 'side-by-side比較で選択' },
        {
          title: 'テンプレートギャラリー',
          body: 'ギャラリーページから20種類以上のテンプレートを閲覧。Templateフォルダのホバーでリンク表示',
        },
        {
          title: 'ノートシリーズ',
          body: '見出し単位でノートを分割してシリーズにまとめられる。サイドバーにグループ表示され、Alt+PageUp/PageDown で移動、結合、シリーズ全体のエクスポートも可能',
        },
        { title: 'ノート結合', body: 'Ctrl+クリックで選択、ドラッグで並び替え、1つに結合' },
        {
          title: '右パネル ノート詳細',
          body: 'ノート一覧でノート名にカーソルを合わせると、作成日時・更新日時・サイズ・Git 状態が右パネルに表示される。ノートを開かずに確認できる',
        },
        {
          title: '右パネルから frontmatter 編集',
          body: 'ノート名を右クリックしてFrontmatterモーダルを開く。フィールドのドラッグで並び替え、tags の追加・削除、エクスポートプリセットの適用もここから。Archive のノートは読み取り専用',
        },
      ],
    },
    view: {
      eyebrow: '表示',
      heading: 'TOC & テーマ',
      icon: '👁',
      items: [
        {
          title: '目次 (TOC)',
          body: '自動生成、現在セクションをハイライト。子見出しの折りたたみ、6ナビゲーションボタン（先頭・前後見出し・PgUp/PgDn・末尾）',
        },
        {
          title: 'バックリンクパネル — Links here',
          body: [
            '現在のノートへの被リンク（',
            { code: '[[links]]' },
            '）が「Links here」として目次下部と右パネルに折りたたみ表示される。各項目にリンク元のタイトル・行番号・前後の文脈プレビューを表示。クリックまたは Enter でリンク元ノートへジャンプ。バックリンクが0件のときは非表示',
          ],
        },
        { title: 'TOC並び替え', body: 'ドラッグ&ドロップやショートカットで見出しを構造化' },
        { title: 'パンくずナビ', body: '現在の見出しパスを表示、クリックで祖先にジャンプ' },
        { title: 'Word Count', body: '文字数、単語数（CJK対応）、読了時間' },
        {
          title: '4テーマ',
          body: 'ライト / ダーク / Parchment / CandleLight — エディタは道具であり「部屋」',
          waxSealAccent: true,
        },
        {
          title: 'タイポグラフィプリセット',
          body: 'Standard / Compact / Academic / Writer — Writerは18px・行間1.8・720px中央揃えの長文向け',
        },
        {
          title: 'system-uiフォント',
          body: '本文フォントをOS標準（system-ui）に変更。CJK文字の表示が改善（Mac: San Francisco、Windows: Segoe UI）',
        },
        { title: '背景テクスチャ', body: '自分で選んだ画像で「自分の場所」にする' },
        { title: 'Auto Pair', body: '括弧、引用符を自動補完' },
        {
          title: 'コードブロック',
          body: 'スクロール対応（20行超）、ProseMirror優先の確実なコピー、Copy Code / Copy as Markdown。ホバーで削除',
        },
        { title: 'インラインコード', body: 'ダブルクリックでコピー、バッククォートで入力' },
        {
          title: '引用ホバー削除',
          body: 'ホバー時のゴミ箱アイコンで引用ブロックを削除。アラート・テーブル・脚注と同じパターン',
        },
      ],
    },
    storage: {
      eyebrow: '保存',
      heading: '自動保存、300KB+対応',
      icon: '💾',
      items: [
        { title: '自動保存', body: '0.5秒デバウンス、保存ボタン不要' },
        { title: '段階的読み込み', body: '20KB超でも一瞬で開く — 書き始めるまでの摩擦をゼロに' },
        { title: 'Smart Loading', body: '300KB+で選択ダイアログ表示、Archiveで高速読み取り専用表示' },
        { title: 'Chrome Storage', body: 'キャッシュクリアでも残る' },
        { title: 'インポート/エクスポート', body: '.md、.zip、Archiveピン留め' },
        {
          title: 'エクスポート',
          body: 'PDF（ページ番号・目次・用紙サイズカスタム）、DOCX（画像・Mermaid図・数式・シンタックスハイライト埋め込み）、PNG（2x Retina）、HTML（3テンプレート・Self-Contained）、EPUB（Mermaid・数式・コードハイライト含む電子書籍）、LaTeX（.tex、見出し→\\section等にマッピング） — Ctrl+Shift+E',
        },
        {
          title: 'OKF エクスポート',
          body: [
            'Open Knowledge Format — ノートを ',
            { code: '.okf.zip' },
            ' として出力。frontmatter の自動生成、self-contained な概念グラフ viewer、activity log を含む。本文中のリンクから自動生成される citations セクションと、ノート間の相対 Markdown リンクをバンドル内の相対パスに変換する機能を追加。Git 同期でも OKF 互換ファイルを出力',
          ],
          link: { label: 'Open Knowledge Format', slug: 'okf' },
        },
        {
          title: 'セマンティック HTML 出力',
          body: [
            'HTML・EPUB エクスポートはキャプション付き画像を ',
            { code: '<figure><figcaption>' },
            '、テーブルヘッダを ',
            { code: '<th scope="col">' },
            '、TOC を named ',
            { code: '<nav>' },
            ' として出力。Markdown ソースは変更なし',
          ],
        },
        {
          title: '出力先別コピー',
          body: 'CommonMark、GFM、Hugo、Obsidian 向けに、用途に合わせたMarkdownとしてコピー',
        },
        {
          title: 'リッチテキストコピー',
          body: 'Ctrl+Shift+Cでノート全体または選択テキストをリッチテキスト形式でコピー。Word・Notion・Google Docsに書式を保ったまま貼り付け',
        },
        {
          title: 'Frontmatter自動合成',
          body: 'Frontmatter設定時、MD・HTML・EPUB・LaTeX・DOCXエクスポートで本文先頭に自動合成',
        },
        {
          title: 'LLMコピー',
          body: 'YAMLフロントマター（タイトル/ソース/日付）を先頭に付与。コピードロップダウンまたはコマンドパレットから',
        },
        { title: 'トークンカウント', body: 'コピー/エクスポート時に推定トークン数をtoastで表示' },
        {
          title: '一括エクスポート',
          body: '複数ノートを選択 → ZIPアーカイブ（Markdown/HTML/DOCX）。非標準記法検出時は「そのまま / 全正規化 / 1件ずつ確認」の3択ダイアログ',
        },
      ],
    },
    gitSync: {
      eyebrow: 'Git同期',
      heading: 'GitHub / GitLab',
      icon: '',
      items: [
        { title: '接続', body: 'Personal Access Token、暗号化保存' },
        { title: '手動コミット', body: '意味のあるスナップショット、自動同期ではない' },
        {
          title: '競合解決',
          body: 'side-by-sideリスクインジケーター、または「Merge in Editor」でWYSIWYG手動マージ',
        },
        { title: '選択的Push', body: 'ステージしたノートだけPush。ノート単位のlastPushedAtで変更追跡' },
        { title: 'Git Fetch', body: 'ローカル変更なしでリモート確認' },
        { title: '履歴', body: '過去20件のコミット、差分ビュー' },
        { title: 'バージョン復元', body: 'ワンクリックで過去のバージョンに復元' },
      ],
    },
    shortcuts: {
      eyebrow: 'キーボードショートカット',
      heading: 'パワーユーザー向け',
      icon: '⌨',
      groups: [
        {
          heading: 'ナビゲーション',
          items: [
            {
              title: [{ kbd: 'mid' }, ' + Space（アドレスバー）'],
              body: [
                'Chrome のアドレスバーで ',
                { code: 'mid' },
                ' と入力してスペースを押すとノートをタイトルで検索できる。Enter で新規タブに開く。マウス不要',
              ],
            },
            {
              title: '行番号ジャンプ',
              body: 'コマンドパレット →「指定行へ移動」で任意の行にカーソルを飛ばせる。長い技術メモで便利',
            },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'K' }], body: '検索' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'P' }], body: 'コマンドパレット' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: '1' }], body: 'Notesパネル' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: '2' }], body: 'TOCパネル' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'F' }], body: 'サイドバー検索にフォーカス' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'G' }], body: 'TOC検索にフォーカス' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'E' }], body: 'エクスポートメニュー' },
            {
              title: [{ kbd: 'I' }, '/', { kbd: 'A' }, '/', { kbd: 'T' }, '/', { kbd: 'M' }],
              body: '選択中のノートを Inbox / Archive / Trash / Template へ振り分け',
            },
          ],
        },
        {
          heading: '編集',
          items: [
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'N' }], body: '新規ノート' },
            { title: [{ kbd: 'Alt' }, '+', { kbd: '↑' }, '/', { kbd: '↓' }], body: '行移動' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: ';' }], body: '日付挿入' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'F' }], body: '検索（置換欄なし）' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'H' }], body: '検索・置換（現在のノート）' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'H' }], body: '全ノート横断 Find & Replace' },
          ],
        },
        {
          heading: '表示',
          items: [
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'F' }], body: 'Focus Mode' },
            { title: [{ kbd: 'F11' }], body: '全画面' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: '↑' }, '/', { kbd: '↓' }], body: '見出しジャンプ（読取専用）' },
            { title: [{ kbd: 'PgUp' }, '/', { kbd: 'PgDn' }], body: 'ページスクロール' },
          ],
        },
        {
          heading: 'TOC & 構造',
          items: [
            {
              title: '目次スクロール進捗とキーボードジャンプ',
              body: '目次に読み進めた割合（%）を表示。目次を開いた状態で数字キー（1–9）を押すと、その番号の見出しに直接ジャンプできる',
            },
            {
              title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: '↑' }, '/', { kbd: '↓' }],
              body: 'TOC内の見出しを並び替え（同レベルのみ）',
            },
            {
              title: [{ kbd: 'Tab' }, ' / ', { kbd: 'Shift' }, '+', { kbd: 'Tab' }],
              body: 'TOC内の見出しレベルを降格 / 昇格',
            },
          ],
        },
        {
          heading: 'ノート',
          items: [
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'P' }], body: 'ピン' },
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'T' }], body: 'Templateへ移動' },
            { title: [{ kbd: 'Alt' }, '+', { kbd: 'A' }], body: 'Archiveへ移動' },
            { title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Shift' }, '+', { kbd: 'S' }], body: 'Git同期' },
            {
              title: [{ kbd: 'Ctrl' }, '+', { kbd: 'Alt' }, '+', { kbd: 'PgUp' }, '/', { kbd: 'PgDn' }],
              body: '前後のノートへ移動',
            },
          ],
        },
      ],
    },
    cta: {
      heading: '書き始めよう',
      body: 'Chrome拡張機能として利用可能。アカウント不要。',
      primaryLabel: '拡張機能を入手',
      primaryAriaLabel: 'Chrome Web StoreからMark It Downを入手',
    },
  },
};
