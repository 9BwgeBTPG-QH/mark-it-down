export type { Lang } from './index';
import type { Lang } from './index';

interface ChangelogCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
}

// Copy for the EN/JA Changelog page pair (#1593 Phase 3-4). Ported verbatim
// from docs/changelog.html / docs/changelog-ja.html. The JA h1/description
// below have their zero-width spaces (U+200B) stripped, matching the same
// convention used in content/faq.ts / content/why.ts / content/troubleshooting.ts.
export const changelogContent: Record<Lang, ChangelogCopy> = {
  en: {
    lang: 'en',
    title: 'Changelog: RSS Reader, Web Clipper, Export — Mark It Down',
    description:
      'Version history for Mark It Down, including RSS Reader, Web Clipper, Repository Reader, export, Git sync, graph, and editor improvements.',
    eyebrow: "What's New",
    h1: 'Changelog for Mark It Down features',
    heroSubtitle: 'Version history and release notes.',
  },
  ja: {
    lang: 'ja',
    title: '更新履歴: RSS Reader・Web Clipper・書き出し — Mark It Down',
    description:
      'Mark It Downの更新履歴。RSS Reader、Web Clipper、Repository Reader、書き出し、Git同期、グラフ、エディタ改善を掲載。',
    eyebrow: '新機能',
    h1: 'Mark It Downの更新履歴',
    heroSubtitle: 'バージョン履歴とリリースノート。',
  },
};

// A single inline run inside a changelog term/description: plain text or a
// `<code>` span. The old markup's only other inline tag is `<strong>`, which
// always wraps the whole term (never partially), so it is not a run variant
// here — it is rendered as the wrapping element in components/changelog/
// VersionBlocks.tsx instead, matching components/troubleshooting/ItemBlocks.tsx's
// termList convention. `<em>`/`<kbd>`/`<br>` do not occur in this page's old
// markup (verified via full-file tag-frequency count against eed65be), so this
// type is intentionally narrower than content/troubleshooting.ts's `Run`.
export type ChangelogRun = string | { code: string };

export interface ChangelogTermItem {
  term: ChangelogRun[];
  description: ChangelogRun[];
}

export interface ChangelogSection {
  /** Omitted for the flat pre-2.0 releases that had no `.changelog-group` h3 wrapper. */
  title?: string;
  items: ChangelogTermItem[];
}

export interface ChangelogVersion {
  version: string;
  highlight: string;
  /** Verbatim status label ("Released" / "Under Review" / "リリース済" / "審査中"). */
  status: string;
  /** CSS modifier for `.accordion-status` — only these two occur in the old markup. */
  statusClass: 'under-review' | 'released';
  /** Only the single entry with `class="accordion-item latest"` in the old markup. */
  latest?: boolean;
  /** Only the single entry with the bare `open` attribute in the old markup. */
  defaultOpen?: boolean;
  /** Intro paragraph; omitted for releases whose old markup had no `.changelog-theme` <p>. */
  theme?: string;
  sections: ChangelogSection[];
}

// Ported verbatim from the 48 <details class="accordion-item"> entries in
// docs/changelog.html / docs/changelog-ja.html (newest first, matching the
// old page's DOM order), mechanically extracted from eed65be and cross-checked
// against this file's prior text (#1593 Wave R2 Batch 3). Only the single
// newest entry carries `latest`/`defaultOpen`; all other entries
// omit both fields rather than writing them out as `false` (see
// content/troubleshooting.ts's own `defaultOpen` convention). Inline
// <code> formatting inside the old <li> markup is restored as ChangelogRun[]
// (rendered by components/changelog/Runs.tsx) instead of being flattened to
// plain text.
//
// Known pre-existing EN/JA content divergence (preserved as-is, not
// reconciled): v2.0.0's JA entry has an extra "New Features" group (5 items)
// with no EN counterpart, and its group boundaries differ from the EN
// entry's for the same release. This mirrors content/faq.ts's own documented
// 23-vs-25 JSON-LD/question-count mismatch — the old production site itself
// was inconsistent between languages for this one release, and this port
// keeps that inconsistency rather than silently padding or trimming either
// side to force parity.
export const changelogVersions: Record<Lang, ChangelogVersion[]> = {
  en: [
    {
      version: 'v2.3.0',
      highlight: 'A spreadsheet-style editor for tables, and a steadier workspace.',
      status: 'Under Review',
      statusClass: 'under-review',
      latest: true,
      defaultOpen: true,
      theme: 'This release adds a dedicated grid editor for Markdown tables, so editing a table can feel like editing a spreadsheet instead of wrestling with pipes and cursor positions. The grid view supports range selection, row and column operations, copy and paste from spreadsheets, sorting, autofill, search, and inline formatting while the underlying note stays plain Markdown. It also fixes several quiet workflow problems around table widths, pasted list code blocks, multi-tab saves, and Archive browsing.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Spreadsheet-style table editor'], description: ['Open a Markdown table in a full-screen grid view from the table toolbar, a right-click, or the Command Palette. Drag to select cells, click gutters to select rows or columns, copy, cut, paste, insert, delete, move, duplicate, sort, and use familiar spreadsheet shortcuts.'] },
            { term: ['Table formatting, search, and autofill'], description: ['Apply Bold, Italic, or Code formatting to selected cells, search within the table with ', { code: 'Ctrl/Cmd+F' }, ', and drag a fill handle to copy values or extend simple series. Every grid change applies back to the note as a single plain Markdown edit.'] },
          ],
        },
        {
          title: 'Improvements',
          items: [
            { term: ['Archive opens faster'], description: ['Opening archived notes is faster when browsing through several older notes in one session.'] },
            { term: ['Tables take up less vertical space'], description: ['Table rows are tighter across the reading and writing styles, so more of a table fits on screen at once.'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['Code blocks inside lists'], description: ['Multi-line code blocks inside bulleted or numbered lists no longer lose lines when pasted or clipped.'] },
            { term: ['Table column widths'], description: ['Manually resized table columns no longer reset after adding or removing rows or columns.'] },
            { term: ['Multi-tab note editing'], description: ['Saves are coordinated across New Tab and Side Panel so an older version of the same note can no longer silently overwrite newer changes.'] },
            { term: ['Command Palette selection'], description: ['Pressing Enter right after typing now runs the visible highlighted command instead of an earlier stale selection.'] },
            { term: ['Table toolbar and Tab navigation'], description: ['The floating table toolbar no longer gets stuck hidden, and Tab reliably moves to the next table cell.'] },
            { term: ['Tabular paste header detection'], description: ['Numeric or date-like header rows from spreadsheet data are recognized more accurately as headers.'] },
            { term: ['Japanese export fonts'], description: ['PDF, HTML, and EPUB exports now fall back to standard Japanese system fonts where needed.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.10',
      highlight: 'New reading surfaces and a richer knowledge graph.',
      status: 'Released',
      statusClass: 'released',
      theme: 'This release adds two entirely new reading surfaces and reworks how notes connect. GitHub Repository Reader lets you browse repositories without leaving Mark It Down: navigate the file tree, follow links between files, and import what you want into your notes. RSS Reader grows from a small modal into a full-screen workspace with the same Markdown rendering quality as your own notes. The note graph replaces the shifting force-directed layout with a consistent outline tree and an interactive radial view with zoom and pan.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['GitHub Repository Reader'], description: ['Browse any public GitHub repository without leaving Mark It Down. Open a repository by URL, navigate the file tree, and view Markdown files with full rendering: code blocks, diagrams, math, callouts, and images. Pin a repository so it reopens next time. Private repositories work with a personal access token. Any file can be imported into your Inbox with one click.'] },
            { term: ['RSS Reader becomes a full-screen workspace'], description: ['A left feed and filter sidebar, a central article list and reading pane, and a right inspector showing metadata, tags, and headings. Filter by tag, search inline, dismiss articles with Undo, and save articles to Inbox in one step. Ctrl+Shift+R opens the surface directly.'] },
            { term: ['Note graph: outline tree and radial view'], description: ['The outline view shows your notes as a navigable tree you can expand, collapse, and re-root. The radial view arranges linked notes around a center node with wheel zoom, drag pan, and a Reset button. A graph view is also available inside Repository Reader, showing how files in a repository link to each other.'] },
            { term: ['Frontmatter editor modal'], description: ['Editing note metadata now opens a dedicated modal. Suggested values from the note itself and from the clipped page appear as chips you can click to apply. Copy as YAML and Clear all are available from the header menu.'] },
          ],
        },
        {
          title: 'Improvements',
          items: [
            { term: ['RSS articles render like your notes'], description: ['Article previews use the same rendering engine as the main editor: the same fonts, heading styles, code blocks, and Markdown formatting.'] },
            { term: ['RSS article inspector'], description: ['The right panel shows the article\'s heading structure as a table of contents with scroll tracking. Click a heading to jump to that section.'] },
            { term: ['Repository Reader: wikilinks and Obsidian vaults'], description: ['Wikilinks between files in the same repository work as navigation. Obsidian highlights, comments, and callout types render with their full styling, including collapsible sections.'] },
            { term: ['Repository Reader: navigation history'], description: ['Back and Forward buttons in the header, Alt+Left / Alt+Right shortcuts, and a heading-level quick switcher (Ctrl+K) for jumping to any file by name.'] },
            { term: ['Repository Reader: backlinks panel'], description: ['The right panel lists other files that link to the one you are reading, with hover previews. Click to navigate.'] },
            { term: ['Quieter sidebar rows'], description: ['Status details (unprocessed marker, Git pending state, note size) move from every note row into a hover card. Git pending is indicated only by a subtle title color change.'] },
            { term: ['Japanese text wraps naturally'], description: ['Japanese UI text (sidebar titles, modal labels, tooltips) now wraps at natural phrase boundaries rather than mid-word.'] },
            { term: ['Filename becomes the note title on import'], description: ['Markdown files without a title field or top-level heading now use their filename as the note title, preventing a wave of untitled notes after a bulk import.'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['Large Markdown tables'], description: ['Files made up entirely of large tables now open correctly instead of appearing blank or truncated.'] },
            { term: ['Appearance panel during Focus Mode'], description: ['The Appearance and theme panel can now be opened and used while Focus Mode is active.'] },
            { term: ['Frontmatter with leading blank lines'], description: ['Files with blank lines or whitespace before the opening frontmatter block now import their metadata correctly.'] },
            { term: ['Git sync with spaces in filenames'], description: ['Pulling from Git now correctly matches notes whose filenames contain spaces, instead of creating duplicate notes.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.9',
      highlight: 'OKF bundles carry their references forward, and the knowledge graph becomes easier to explore.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Knowledge stays connected when it leaves the editor. OKF bundles now carry their sources as a numbered reference list, and links between notes resolve correctly inside the exported bundle. The concept graph got a round of usability work: labels that don\'t overlap, amber highlights on selection, a persistent Reset button, and first-time guidance. The Portability Hub adds heading-structure warnings, and the frontmatter panel suggests standard values for confidence and source fields.',
      sections: [
        {
          title: 'Improvements',
          items: [
            { term: ['OKF bundle references'], description: ['External links in your notes are automatically collected and appended as a numbered References list when you export as an OKF bundle. Sources stay visible when you hand off the package.'] },
            { term: ['Note links in bundles'], description: ['Links between your own notes now resolve correctly inside an exported OKF bundle. Connections that existed in the editor stay intact after export.'] },
            { term: ['OKF export type field guidance'], description: ['The export panel now explains how the type field is assigned automatically based on which folder a note lives in. The Portability Hub flags notes with no type set so you can review them before export.'] },
            { term: ['Link graph improvements'], description: ['Node labels appear below each node and no longer overlap. Selecting a node or edge highlights it in amber. A Reset view button is always visible and returns the graph to a full overview. All four color themes now carry through into the graph correctly.'] },
            { term: ['Concept graph new-user guidance'], description: ['If your graph has only one note or none at all, a short guide explains how to create connections using the [[note name]] syntax. A one-time hint also explains that clicking a node opens the table of contents for that note.'] },
            { term: ['Note log raw status tooltip'], description: ['Hovering over the raw chip in the note activity log now shows a tooltip that explains what raw status means and how to clear it.'] },
            { term: ['Portability Hub heading-level warnings'], description: ['The Hub now flags notes where heading levels jump unexpectedly — helping you catch structural problems before exporting to EPUB or document converters.'] },
            { term: ['Frontmatter value suggestions'], description: ['When editing the confidence or source fields in the metadata panel, a short list of standard values appears. You can still type anything — the suggestions keep values consistent across notes.'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['Toolbar menu collapsing while open'], description: ['Opening a toolbar menu and keeping it open no longer caused the menu to collapse unexpectedly due to the editor\'s auto-hide behavior.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.8',
      highlight: 'More of what you wrote stays with what you wrote.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Mark It Down can now work more faithfully with OKF bundles. External bundles keep more of their original structure when imported, source links are carried into the portable metadata, and exported bundles include a browser-readable overview — making OKF a clean review and curation loop without losing the shape of the original knowledge package.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Note Log'], description: ['Record why a note changed — Creation, Update, Deprecation, or any verb you choose — right inside the note. Alt+L opens the log; entries flow into OKF exports and Git commits automatically.'] },
            { term: ['Link graph'], description: ['The right panel now shows which notes point here and which this note points to. Click a node to jump. [+][−] buttons zoom the graph — same controls appear in OKF bundle exports.'] },
            { term: ['Raw Markdown toggle'], description: ['Switch the right panel between rendered view and raw Markdown source to check syntax without opening the editor.'] },
            { term: ['OKF bundle improvements'], description: ['Import OKF bundles from the Entry menu with links restored as wikilinks. Exports include a browser-readable index.html — open the bundle in any browser without extra tools. Source URLs are preserved as OKF resources. Git sync keeps the same OKF structure.'] },
            { term: ['Semantic markup everywhere'], description: ['figure/figcaption, scope-attributed table headers, and article/nav landmarks now apply across HTML exports, OKF viewer, in-app preview, and EPUB. Your Markdown source is not modified.'] },
            { term: ['EPUB chapter navigation'], description: ['EPUB exports now include chapter sections and a landmarks navigation block. Screen readers and e-readers can jump between chapters.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.7',
      highlight: 'When something fails, you now know why.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Git sync, Web Clipper, and RSS now tell you why they failed — authentication, access denied, or network issue — instead of a generic error. Plus a fix for TOC navigation buttons going unresponsive right after a note loads.',
      sections: [
        {
          title: 'Improvements',
          items: [
            { term: ['Git sync failure reasons'], description: ['Sync errors now name the cause: authentication, access denied, or network failure.'] },
            { term: ['Web Clipper & RSS failure reasons'], description: ['When a clip or feed fetch fails, the reason is shown instead of a generic message.'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['TOC navigation fix'], description: ['Top / bottom / prev / next-heading buttons no longer go dead right after a note loads.'] },
            { term: ['Git sync reliability'], description: ['Fixed cases where notes were not synced correctly.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.6',
      highlight: 'Open from the address bar, zoom diagrams, grow notes into a series.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.2.5 cleaned up what goes out. v2.2.6 makes it worth taking out: diagrams you can inspect at full resolution, notes you can grow by splitting, clips you can actually read. The tools for shaping information — zoom, divide, convert — now feel as capable as the tools for bringing it in.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Open notes from Chrome\'s address bar'], description: ['Type ', { code: 'mid' }, ' and press Space in the address bar to search notes by title. Press Enter to open in a new tab — keyboard only, no mouse required.'] },
            { term: ['Today template'], description: ['Place a note named "Today" in the Template folder and every new daily note starts from that layout. One note, applied automatically each day.'] },
            { term: ['Mermaid diagrams: zoom, fullscreen, save as SVG'], description: ['Click any Mermaid diagram to open an enlarged viewer. Zoom from 25% to 400% with Ctrl+scroll, switch to fullscreen, or save the rendered diagram as an SVG file.'] },
            { term: ['Split long notes into a series'], description: ['Divide a note by heading into a linked series. The series groups in the sidebar for easy navigation. Use Alt+PageUp/PageDown to move between parts, merge them back, or export the whole series at once.'] },
            { term: ['Web Clipper: ruby text → Aozora notation'], description: ['Pages with ', { code: '<ruby>' }, ' annotations now convert to ', { code: '漢字《かんじ》' }, ' notation automatically. Long articles with footnotes, tables, code blocks, and images also clip more accurately.'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['Web Clipper: footnote symbols in note titles'], description: ['Footnote reference markers were appearing in note titles and exported filenames when clipping pages with citations. This is now fixed; the H1 is always a clean title.'] },
            { term: ['Web Clipper: long article accuracy'], description: ['Clipping long pages that mix footnotes, tables, code blocks, and images now produces cleaner Markdown with fewer structural breaks.'] },
            { term: ['Mermaid: black-fill rendering bug'], description: ['Diagrams rendered as solid black in the enlarged viewer and archive preview. Fixed across all four themes and all diagram types.'] },
            { term: ['Mermaid: font inconsistency in Japanese diagrams'], description: ['Diagrams containing Japanese text were using a mix of fonts. Font rendering is now uniform.'] },
            { term: ['Git sync: write conflict guard'], description: ['Concurrent writes during sync could corrupt the stored state. A write-conflict guard now prevents this, and any sync interruption after conflict resolution recovers cleanly on the next operation.'] },
            { term: ['Settings sync: field-level 3-way merge'], description: ['When settings differed across devices, sync previously picked one side wholesale. It now merges at the field level, preserving each device\'s intentional changes.'] },
            { term: ['Custom export presets now sync via Git'], description: ['User-defined export presets were excluded from Git sync. They are now included, so presets created on one device appear on all others.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.5',
      highlight: 'Cleaner handoff, sharper command flow.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.2.4 sharpened the entry point — how things get in. v2.2.5 cleans up what comes after: where clips trace back to, how commands flow, and how exports reach their destination. The editor and security surface tighten quietly alongside.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['RSS clip source URL in frontmatter'], description: ['Saved RSS articles now include ', { code: 'source_url' }, ' in frontmatter automatically. The save success toast also includes an Undo action to back out without losing the trail.'] },
            { term: ['Web Subscription recipes'], description: ['Pre-built RSS recipes for Hacker News, Lobsters, Hashnode, freeCodeCamp, Smashing Magazine, CSS-Tricks, Stack Overflow Blog, GitHub Blog, GitLab Blog, Vercel Blog, Cloudflare Blog, and Mozilla Hacks — subscribe with one click.'] },
            { term: ['Command Palette: Recently Used'], description: ['The three most recently invoked commands appear at the top of the palette, so your most common actions are always one keystroke away.'] },
            { term: ['Command Palette: Snippet preview'], description: ['Snippets show a live preview before insertion. Mermaid snippets render as an actual diagram so you can confirm the shape before committing.'] },
            { term: ['Command Palette: Settings commands'], description: ['Common settings — theme, font size, Git sync toggle — are now reachable directly from the Command Palette.'] },
            { term: ['Markdown target presets'], description: ['Save a target format (Zenn, Hugo, Obsidian, plain Markdown) as a preset and reuse it across exports without reconfiguring each time.'] },
            { term: ['Notion ZIP import'], description: ['Drop a Notion export ZIP into Mark It Down to import the contained Markdown files directly. Internal links and frontmatter are preserved where possible.'] },
            { term: ['Shift-JIS export opt-in'], description: ['Markdown and ZIP exports can write files in Shift-JIS encoding — useful for workflows that target tools or scripts expecting that encoding.'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['Export consistency across scope and options'], description: ['Folder, selected-notes, and all-notes export paths now apply the same set of options and correctly exclude system notes.'] },
            { term: ['Portability cache isolation'], description: ['Running portability checks against multiple targets in the same session no longer mixes cached results between targets.'] },
            { term: ['Copy failure notification'], description: ['When a clipboard write fails, an error toast now appears instead of silently succeeding.'] },
            { term: ['Sidebar overlay close routing'], description: ['Closing the sidebar in Side Panel or narrow overlay mode now also closes any open note detail panel, so the two panels close together as expected.'] },
            { term: ['Highlight color per theme'], description: ['The ', { code: '==highlight==' }, ' background color is now correctly tuned for each of the four themes.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.4',
      highlight: 'Web Clipper, your gateway for what matters.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.2.3 deepened notes as a place for thinking. v2.2.4 sharpens the entry point: centered on the Web Clipper, it raises the quality of how things get captured. Pick which metadata goes into frontmatter, switch how content is captured before saving, and write to Markdown that opens cleanly in Obsidian. The scrollbar appears only when you need it, keeping the editor quiet. A small but important fix lands too — a Git sync deadlock involving RSS has been resolved.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Web Clipper metadata to frontmatter'], description: ['Author, date, category, and other metadata from the captured page appear in the note detail side panel. Click any item to add it to frontmatter; existing frontmatter is never overwritten.'] },
            { term: ['Choose how content is captured'], description: ['The clip preview lets you switch between article text only, full page, and a custom CSS selector before saving. The preview updates instantly so you can confirm the result. The right-click menu is unified to "Save page," with every mode reachable from the preview.'] },
            { term: ['Custom fields via CSS selector'], description: ['Pair a CSS selector with a key name to extract site-specific data — price, author, tags — as metadata. Extracted values can be added to frontmatter from the side panel after saving.'] },
            { term: ['Move to Trash after copy'], description: ['A "Move to Trash after copy" toggle in the copy menu clears template notes or memos you have already forwarded elsewhere. An Undo toast restores the original folder if needed.'] },
            { term: ['Export to a chosen folder'], description: ['Single Markdown and ZIP exports can target a folder you pick in advance (New Tab only). Up to five recent folders are remembered.'] },
            { term: ['Obsidian-compatible line breaks'], description: ['Markdown exports convert line breaks to Obsidian-compatible syntax, so trailing backslashes no longer appear when opened in Obsidian.'] },
            { term: ['Correct timestamps in ZIP exports'], description: ['Files in a ZIP export now carry the note\'s last modified time instead of the time the export ran.'] },
            { term: ['Slash command hint on empty notes'], description: ['A new note shows a "Type / for slash commands" hint on the first line. It disappears once you start writing.'] },
            { term: ['Block handles on hover only'], description: ['Drag handles at the left edge no longer stay visible after you type a heading. They appear only when the pointer is near the block.'] },
            { term: ['Scrollbar only while scrolling'], description: ['The scrollbar disappears when the editor is idle; a thin bar appears only while scrolling, keeping the screen quiet.'] },
            { term: ['Locale-aware date and time'], description: ['Dates and times in note details, commit history, and similar places now follow your browser\'s language setting.'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['Git sync deadlock with RSS changes'], description: ['Syncing with both RSS feeds and regular notes changed at the same time could leave the push stuck without completing. This deadlock is resolved.'] },
            { term: ['Conflict notice for RSS-only changes'], description: ['A conflict that occurred with only RSS changes pending sometimes failed to surface a notification.'] },
            { term: ['Wrong note in hover preview'], description: ['The hover preview could show an unintended note.'] },
            { term: ['Hover card timing'], description: ['The hover card in the right side panel area could appear and dismiss at unintended times.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.3',
      highlight: 'Your notes and your reading, connected.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.2.2 made RSS proactive. v2.2.3 connects the reading layer to the writing layer: tags from the reading pane land directly in Inbox notes, spreadsheet data pastes as editable tables, and a journaling flow brings today\'s note to the front automatically. Settings and snippets now travel with you across devices via Git sync.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['RSS tag management'], description: ['Add and remove tags from the reading pane. Click a tag to attach it to an Inbox note. Multiple tags AND-filter the article list. Type new tags by hand; remove with the ✕ button.'] },
            { term: ['CSV paste to table'], description: ['Paste spreadsheet data and it becomes an editable Markdown table instantly. No reformatting needed — resize columns and edit cells right away.'] },
            { term: ['Twitter / X thread import'], description: ['Paste a thread URL and Mark It Down pulls the thread into a Markdown block quote with source attribution. Falls back to the URL if the fetch fails.'] },
            { term: ['Bear note paste'], description: ['Content copied from Bear pastes with headings and highlights correctly converted to Markdown.'] },
            { term: ['Journaling entry flow'], description: ['Opening the Side Panel selects today\'s dated note automatically. If none exists, one-click creates it. Can be disabled in settings.'] },
            { term: ['Journaling templates'], description: ['Four templates added to the Template Gallery: Five Minute Journal, Stoic Journal, Daily Reflection, CBT Thought Record (EN & JA).'] },
            { term: ['Settings and snippets in Git sync'], description: ['Theme, editor settings, and custom snippets are now included in Git sync. Changes on one device appear on others automatically.'] },
            { term: ['Paragraph block link copy'], description: ['Select text in the floating toolbar and choose "Copy block link" to copy a direct link to that paragraph (', { code: '[[Note#^id]]' }, ').'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['Wikilinks not rendering on input'], description: ['Typing ', { code: '[[note name]]' }, ' now renders the link decoration immediately without requiring a page reload.'] },
            { term: ['Horizontal rule not inserting on sequential input'], description: ['Typing ', { code: '---' }, ' one character at a time now correctly inserts a horizontal rule. Paste was unaffected; keyboard entry was broken.'] },
            { term: ['/now date off by one in non-UTC timezones'], description: ['The timestamp heading used UTC date, causing yesterday\'s date to appear for late-night sessions in JST and similar zones. Fixed to use local date.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.2',
      highlight: 'Read in the background. Catch up on your terms.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.2.1 added web subscriptions and wikilinks. v2.2.2 makes the RSS layer proactive: feeds refresh while you\'re away, notifications surface new articles when they arrive, and your read state follows you across devices. The editor gains a scratchpad, deeper knowledge connections between notes, and polished Mermaid diagrams.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Background RSS polling'], description: ['Enable scheduled refresh in RSS settings and feeds update automatically in the background at your configured interval. No need to keep the tab open.'] },
            { term: ['Desktop notifications for new articles'], description: ['Opt in to desktop notifications from RSS settings. When a scheduled fetch finds new items, a local notification lists the titles — generated from feed data already in your browser, nothing sent externally.'] },
            { term: ['Cross-device read-state sync'], description: ['Articles marked as read on one device show up as read on every device signed into the same Chrome profile. Article content stays local; only the read identifiers sync.'] },
            { term: ['RSS quote toolbar'], description: ['Select text in an RSS article preview to reveal a floating toolbar. One click quotes the selection to Inbox with source URL and timestamp attached.'] },
            { term: ['RSS storage footprint display'], description: ['The RSS modal header now shows how much local storage your feeds occupy, with a tooltip breakdown. Helps you manage retention settings with real numbers.'] },
            { term: ['RSS Welcome Panel'], description: ['First-time RSS users see an onboarding panel that walks through adding a feed, enabling notifications, and understanding the reading flow.'] },
            { term: ['Scratchpad workspace'], description: ['A persistent scratchpad lives alongside your notes for rough thinking, scratch calculations, and temporary outlines — separate from your note list.'] },
            { term: ['Knowledge connection layer'], description: ['The right panel and TOC now show backlink counts. A connection layer visualises which notes reference each other without leaving the editor.'] },
            { term: ['Export action presets'], description: ['Save frequently used export configurations as named presets. Presets appear in the export menu for one-click reuse.'] },
          ],
        },
        {
          title: 'Polish',
          items: [
            { term: ['Dead feed cleanup suggestions'], description: ['When a feed fails repeatedly, Mark It Down surfaces a prompt to remove it or update the URL — keeping your subscription list healthy without manual audits.'] },
            { term: ['Mermaid rendering v2'], description: ['Diagram rendering is more reliable across complex graph types and large charts, with better error recovery when syntax is incomplete.'] },
            { term: ['OPML robustness'], description: ['Import and export handle edge-case feed structures, dead feeds, and duplicate entries more gracefully.'] },
            { term: ['Retention split'], description: ['Set separate retention periods for read and unread articles — keep unread items longer, prune read ones sooner.'] },
          ],
        },
        {
          title: 'Speed & Robustness',
          items: [
            { term: ['RSS Conditional GET'], description: ['Feeds now send ', { code: 'If-None-Match' }, ' / ', { code: 'If-Modified-Since' }, ' headers. Unchanged feeds return a 304 and skip parsing entirely — less bandwidth, faster refresh cycles.'] },
            { term: ['Service worker alarm reliability'], description: ['Background alarms survive browser restarts and extension updates. The polling schedule is re-registered automatically on startup.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.1',
      highlight: 'Polish. Extend. Speed up.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.2.0 added the RSS skeleton. v2.2.1 fills it out and removes small daily friction points one by one — subscribing to sites without feeds, writing Obsidian-style wikilinks, editing note metadata in the right panel, managing custom export presets, and making startup faster than before.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Web Subscription (RSS-free sites)'], description: ['Subscribe to Qiita, Zenn, or any site without a public feed. Article URLs and titles are fetched automatically; body text saves only on explicit clip — no bulk ingestion.'] },
            { term: ['Obsidian Wikilinks + Autocomplete'], description: ['Write ', { code: '[[Note Title]]' }, ' or ', { code: '[[Title|Alias]]' }, '. Resolved links are green, unresolved red, ambiguous amber. Ctrl+Click navigates directly to the target note. Type ', { code: '[[' }, ' to open a fuzzy-search autocomplete popover — Arrow/Enter/Tab to confirm, Esc to dismiss.'] },
            { term: ['Backlink Panel'], description: ['Inbound ', { code: '[[links]]' }, ' pointing to the current note appear at the bottom of the TOC and in the Right Panel. Click or press Enter to jump to the source note. Hidden when there are no backlinks.'] },
            { term: ['RSS Allow-Keywords (Google Alerts Mode)'], description: ['Set per-feed keyword filters to let through only articles whose title, URL, or RSS description matches your terms. Chip editor in the Feeds row, Any / All toggle, and input suggestions from past allow-keywords.'] },
            { term: ['Obsidian Properties + Logseq Export Presets'], description: ['New built-in presets for Obsidian Properties format and Logseq ', { code: '::' }, ' notation, alongside the existing CommonMark / GFM / Hugo / Obsidian copy targets.'] },
            { term: ['Custom Export Preset Manager'], description: ['Create, edit, duplicate, and delete custom export presets from a dedicated UI — accessible from the right panel and the Markdown export menu.'] },
            { term: ['Line Number Jump'], description: ['Command Palette → "Go to line" jumps the cursor to any line number in a single keystroke — useful in long technical notes.'] },
            { term: ['TOC Reading Progress + Keyboard Jump'], description: ['The table of contents shows your scroll progress as a percentage. Press a number key (1–9) while the TOC is open to jump directly to that heading.'] },
            { term: ['Note Details and Frontmatter Edit in Right Panel'], description: ['Hover a note name in the list to see creation date, size, Git status, and frontmatter. Right-click to edit frontmatter, drag fields to reorder, add and remove tags — without opening the note. Archive notes show read-only.'] },
            { term: ['RSS Auto-Tagging on Clip'], description: ['After clipping an RSS article, tags are auto-generated from its title, URL, and feed name. Can be turned off in settings.'] },
          ],
        },
        {
          title: 'Polish',
          items: [
            { term: ['Quote Format Unified'], description: ['Save Selection and RSS Quote Selection now always produce frontmatter (source URL + timestamp) + blockquote + attribution link + disclaimer footer — regardless of which path was used.'] },
            { term: ['New Tab / Side Panel Interface Parity'], description: ['Header actions, panel pin vs. overlay behavior, and search preview availability are now determined by screen role rather than code path, removing subtle inconsistencies between the two views.'] },
            { term: ['RSS Permission Badge'], description: ['When feeds need host permissions, the extension icon badge shows the pending count and the fetch button shows a toast — making permission gaps visible without diving into settings.'] },
            { term: ['Larger Document Thresholds'], description: ['Code block assistance and math stay enabled up to 100 KB (was 50 KB). Slash menu and drag handles stay enabled up to 150 KB (was 100 KB).'] },
          ],
        },
        {
          title: 'Speed & Fixes',
          items: [
            { term: ['Startup Faster Than v2.2.0'], description: ['RSS code is now lazy-loaded after startup, recovering the +21% regression introduced in v2.2.0. All 13 benchmark scenarios are faster than v2.2.0.'] },
            { term: ['YouTube Transcript Detection Fixed'], description: ['The CC subtitle button was being misidentified as the transcript button on some videos. The correct button is now prioritized.'] },
            { term: ['Dark Theme Static Preview Colors'], description: ['Note previews in dark, parchment, and candlelight themes now apply theme colors correctly.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.0',
      highlight: 'Read. Save. Carry.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.1.9 made paste and search smoother. v2.2.0 turns Mark It Down into a place to read incoming information, keep only what matters, and carry your writing to the next tool without losing structure. RSS becomes a first-class entry point, Web Clipper covers more real-world sites, and export/copy paths preserve more of the work you already did.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['RSS Reader'], description: ['Read feeds in Mark It Down, move through items with ', { code: 'j' }, '/', { code: 'k' }, ', open with ', { code: 'Enter' }, ', and save selected articles to Inbox as Markdown.'] },
            { term: ['OPML Import / Export'], description: ['Move subscriptions from Feedly, Inoreader, NetNewsWire, or another RSS reader using standard OPML 2.0.'] },
            { term: ['RSS Git Sync'], description: ['Sync RSS feeds and denylist settings across devices. Dedicated conflict resolution handles renamed, deleted, or duplicated feed entries.'] },
            { term: ['Copy as CommonMark / GFM / Hugo / Obsidian'], description: ['Choose the Markdown dialect before copying so published notes need less cleanup later.'] },
            { term: ['Sidebar Preview and Triage'], description: ['Hover cards, preview panel, and I/A/T/M shortcuts make it faster to inspect notes and move them to Inbox, Archive, Trash, or Template.'] },
          ],
        },
        {
          title: 'Web Clipper Improvements',
          items: [
            { term: ['YouTube Transcripts'], description: ['Save available captions as timestamped Markdown links so video notes stay navigable.'] },
            { term: ['Comments and Threads'], description: ['Reddit and Hacker News extraction preserves conversation structure, authors, and context more reliably.'] },
            { term: ['More Site-Specific Extractors'], description: ['LinkedIn, Bluesky, Threads, Medium, and Discourse now get dedicated extraction paths instead of generic cleanup.'] },
            { term: ['RSS Clip Footnotes'], description: ['Hatena Blog footnotes are converted into Markdown footnotes when saved through RSS clipping.'] },
          ],
        },
        {
          title: 'Portability and Fixes',
          items: [
            { term: ['Table Column Widths in Export'], description: ['Column widths are preserved in Markdown attr-list data and reflected in HTML, PDF, and DOCX export.'] },
            { term: ['Pin / Star Frontmatter Round Trip'], description: ['Pinned and starred state can survive export and import instead of disappearing at the boundary.'] },
            { term: ['RSS Reliability'], description: ['Fixed empty editor display after RSS clipping, keyboard race conditions in the viewer, and permission drift after sync.'] },
            { term: ['Footnote and Editor Polish'], description: ['Table-cell footnote references, multi-paragraph footnote popovers, code block line-number toggles, and Ctrl+Enter around hard blocks were tightened.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.9',
      highlight: 'Find. Return. Paste.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.1.8 tuned how Japanese renders and how the TOC moves. v2.1.9 takes aim at two moments: the instant you paste something into a note, and the moments you move between notes. Smart Paste covers more ground (LaTeX environments, JSON on plain Ctrl+V, HTML formatting tags). Search grew a live preview pane. Alt+←/→ walks back through the notes you just visited.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Note History Navigation'], description: ['Alt+← and Alt+→ move through previously visited notes, like browser back/forward. Tooltip shows the title of the note you\'ll land on.'] },
            { term: ['Search Two-Column Preview'], description: ['Hit list on the left, full note preview on the right. Inline keyword highlighting lets you decide before you open. Arrow keys move, Enter jumps. Side Panel keeps the compact 1-column layout.'] },
            { term: ['LaTeX Environment Paste'], description: ['Paste ', { code: '\\begin{equation|align|aligned|gather|cases}' }, ' and it becomes ', { code: '$$...$$' }, ' automatically. Pure LaTeX (no surrounding Markdown) now converts on plain Ctrl+V too.'] },
            { term: ['JSON on Plain Ctrl+V'], description: ['JSON → Markdown was Ctrl+Shift+V only. Now plain paste works. Arrays become tables, objects become key-value lists. Objects nested 3+ deep fall back to a ', { code: '```json' }, ' fenced block.'] },
            { term: ['HTML Formatting Tags'], description: [{ code: '<strong>' }, '/', { code: '<b>' }, '/', { code: '<em>' }, '/', { code: '<i>' }, '/', { code: '<code>' }, ' now convert to ', { code: '**' }, '/', { code: '*' }, '/', { code: '`' }, ' instead of being stripped. Web and AI clips keep their emphasis.'] },
            { term: ['Hunk-Level Conflict Navigation'], description: ['In the Conflict Resolution modal, ', { code: 'j' }, '/', { code: 'k' }, ' move between hunks and ', { code: 'Shift+←' }, '/', { code: 'Shift+→' }, ' cherry-pick the focused hunk as local or remote. Partial merges stay keyboard-only.'] },
          ],
        },
        {
          title: 'Improvements',
          items: [
            { term: ['Web Clipper Adaptive Engine'], description: ['When the default Readability + toMd extraction scores below threshold, Clipper automatically falls back to Defuddle + toMd. Adaptive average score stays at 99+.'] },
            { term: ['Code-Block Paste Protection'], description: ['Smart Table / JSON / LaTeX conversions skip when the target is inside a code block and defer to CodeMirror\'s native paste. Code stays as code.'] },
            { term: ['Open in Editor Unified'], description: ['Conflict Resolution Modal\'s dropdown collapsed into a single button — Local opens in New Tab (editable), Remote opens in Side Panel (reference).'] },
            { term: ['Smart Typography Performance'], description: ['Cut ', { code: 'state.doc.resolve(from)' }, ' calls from twice-per-keystroke to once, and folded ancestor checks into an inline loop. A small fix on a hot path.'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Double Paste Processing'], description: ['Fixed Crepe\'s internal handler consuming paste events before Smart Paste ran. Resolved by promoting to a capture-phase window listener.'] },
            { term: ['Math Block Placeholder'], description: ['Fixed math blocks displaying as raw placeholders after ', { code: '```math' }, ' fence conversion, by re-detecting the converted string and scheduling CodeMirror init.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.8',
      highlight: 'Better Japanese. Smoother focus.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.1.7 refined how controls feel. v2.1.8 focuses on Japanese text quality and the small moments between keystrokes — a redesigned TOC panel, smoother focus mode, and startup time cut nearly in half.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Auto Text Conversion'], description: ['Type ', { code: '->' }, ' for ', { code: '→' }, ' and ', { code: '--' }, ' for ', { code: '—' }, '. Conversion is skipped inside code blocks.'] },
            { term: ['Mermaid Semantic Colors'], description: ['Use ', { code: ':::frontend' }, ', ', { code: ':::backend' }, ', ', { code: ':::database' }, ', and other class names in Mermaid diagrams for theme-matched colors.'] },
            { term: ['Table Cell Editing Badge'], description: ['An "Editing" badge appears when you start typing in a table cell — helpful for orientation in wide tables.'] },
            { term: ['Tag Tab Navigation'], description: ['Tab through Key → Value → next row in frontmatter tag input. Full keyboard workflow, no mouse needed.'] },
          ],
        },
        {
          title: 'Improvements',
          items: [
            { term: ['TOC Panel Redesign'], description: ['Navigation buttons always visible. Click the position counter (e.g. "3/12") to jump directly to any heading. Style unified with Notes sidebar.'] },
            { term: ['Pin Icon Indicator'], description: ['Notes and TOC pin buttons show a pin icon when the panel is pinned — visible at a glance without clicking.'] },
            { term: ['Settings Button Merge'], description: ['Appearance and mode settings merged into one button. Cleaner header.'] },
            { term: ['Focus Mode Animation'], description: ['Header and toolbar now slide up and fade out together — consistent with sidebar behavior.'] },
            { term: ['Japanese Text Rendering'], description: ['Improved line-breaking rules, letter spacing in headings, and font display. Academic theme on Windows now uses system fonts correctly.'] },
            { term: ['Startup Speed'], description: ['Parallel initialization cut startup time ~45% (189ms → 104ms).'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['TOC Navigation Highlight'], description: ['Fixed highlight jumping to wrong heading after using navigation buttons.'] },
            { term: ['Focus Mode Progress Bar'], description: ['Fixed progress bar disappearing in focus mode.'] },
            { term: ['Table Cell Cursor'], description: ['Fixed cursor visibility in some themes.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.7',
      highlight: 'Smarter controls.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.1.6 made startup faster. v2.1.7 refines how things feel — table editing that follows your hands, deletions that require intent, and clips you can preview before saving.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Table Keyboard Navigation'], description: ['Enter moves down a cell, Tab moves right, Alt+Enter inserts a line break inside a cell. Click a cell and press Enter to start typing. Last-row Enter exits the table.'] },
            { term: ['Hold-to-Delete'], description: ['Permanently removing a note from Trash now requires a deliberate hold. Release to cancel — no accidental deletions.'] },
            { term: ['Web Clipper Preview'], description: ['Preview and select sections before saving a web clip. Exclude ads, navigation, or anything you don\'t need.'] },
            { term: ['Export Presets'], description: ['Attach YAML, TOML, or JSON frontmatter automatically when exporting Markdown. Set title, date, and tags once — reuse on every export.'] },
          ],
        },
        {
          title: 'Improvements',
          items: [
            { term: ['Startup Speed'], description: ['Download size reduced from 136KB to 129KB (−5%). Cumulative optimizations continue to shrink the app.'] },
            { term: ['Table Toolbar'], description: ['Row action buttons reordered to match spreadsheet conventions.'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Nested List Blockquote'], description: ['Fixed blockquotes inside nested lists breaking layout.'] },
            { term: ['Slash Commands'], description: ['Fixed ', { code: '/' }, ' commands becoming unresponsive after editor re-display.'] },
            { term: ['Web Clipper Session'], description: ['Fixed session data corruption that could occur when saving a clip.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.6',
      highlight: 'Faster. Smoother.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.1.5 rebuilt the foundation. v2.1.6 polishes it — faster startup, smarter paste, and a UI that gets out of your way.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Web Clipper CSS Selector Targeting'], description: ['Dropdown to select page sections (', { code: 'main' }, ', ', { code: 'article' }, ', ', { code: '#content' }, ') before clipping. Grab just the part you need from long pages.'] },
            { term: ['Auto-Hide UI'], description: ['Header and toolbar auto-hide while writing. Scroll down to hide, move mouse near the top to reveal. More room to focus on your words.'] },
            { term: ['Git Sync Status Indicator'], description: ['Real-time sync status shown at the bottom of the sidebar — syncing, done, offline, or error at a glance.'] },
          ],
        },
        {
          title: 'Improvements',
          items: [
            { term: ['Startup Speed'], description: ['Download size reduced from 143KB to 136KB (−5%). Large notes (100KB+) open up to 29% faster.'] },
            { term: ['AI Paste: Table + Code Block'], description: ['Code blocks inside table cells now auto-format correctly when pasting from Claude, ChatGPT, or other AI output.'] },
            { term: ['AI HTML Tag Auto-Removal'], description: ['Leftover HTML tags from AI output are automatically stripped on paste.'] },
            { term: ['Sidebar Detail Panel'], description: ['Unified into 3 tabs — Preview, Info, and Frontmatter. Remembers which tab you last used.'] },
            { term: ['Sidebar Rendering'], description: ['Optimized DOM updates for faster sidebar list rendering.'] },
            { term: ['Animation Polish'], description: ['Drawer open/close, tooltip appearance, and hover responses refined for a smoother feel.'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Callout + List Display'], description: ['Fixed rendering issue when callouts and lists are mixed together.'] },
          ],
        },
        {
          title: 'Changed',
          items: [
            { term: ['Archive Move Message'], description: ['Improved wording when moving notes to Archive.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.5',
      highlight: 'Take your writing anywhere.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Markdown has dialects. Obsidian syntax breaks in Hugo. Slack pastes leave behind raw symbols. v2.1.5 fixes that — with platform conversion for 8 targets, smart paste from chat apps, and a fully redesigned sidebar.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Portability Hub'], description: ['Convert notes to CommonMark, Obsidian, Hugo, Jekyll, Docusaurus, MkDocs, GFM, Zenn, or Qiita syntax. On batch export, non-standard markup is flagged: keep as-is, normalize all, or review one by one.'] },
            { term: ['Chat Format Smart Paste'], description: ['Pastes from Slack, Discord, and WhatsApp auto-convert to standard Markdown. Handles ', { code: '<url|text>' }, ' links, ', { code: '||spoiler||' }, ', and ', { code: '>>>' }, ' blockquotes.'] },
            { term: ['EPUB Export'], description: ['Export notes as EPUB 3.0 with Mermaid diagrams, math, and code highlighting included. Single note and batch export supported.'] },
            { term: ['LaTeX Export'], description: ['Convert Markdown to LaTeX and output as a ', { code: '.tex' }, ' file. Designed for academic writing and reports.'] },
            { term: ['Frontmatter Support'], description: ['Manage note metadata (title, tags, date, etc.) separately from the body. Edit in the Detail Panel\'s Frontmatter tab; auto-merged on export.'] },
            { term: ['Sidebar Redesign'], description: ['Note list simplified to title-only. Preview button opens Detail Panel with Preview, Frontmatter, and Info tabs. Pinned notes get a dedicated "★ Pinned" area. Remote Sidebar lets you browse and pull notes from your Git repository.'] },
            { term: ['Web Clipper Enhancements'], description: ['Clip YouTube subtitles as timestamped Markdown. Shadow DOM and same-site iframe content now supported. Dedicated extraction for Zenn, Qiita, and Hatena Blog (Japanese blogging platforms).'] },
            { term: ['Writer Mode Typography Preset'], description: ['18px font, 1.8 line height, 720px centered layout for long-form writing. Toggle from the slash menu.'] },
            { term: ['Heading Auto-Numbering'], description: ['Automatically number H2–H6 headings with CSS counters. Toggle with ', { code: '/num' }, ' in the slash menu.'] },
            { term: ['LaTeX Autocomplete in Math Blocks'], description: ['Type ', { code: '\\' }, ' inside a math block to see 108 LaTeX command suggestions — Greek letters, operators, arrows, and more.'] },
            { term: ['TOC Enhancements'], description: ['Collapsible headings in the TOC for long documents. Navigation button bar at the bottom: first, last, previous heading, next heading, page up, page down.'] },
            { term: ['Cross-Note Find & Replace'], description: [{ code: 'Ctrl+Shift+H' }, ' to search and replace across all notes. Folder filter chips, match counter ("3 / 17"), and ', { code: 'Ctrl+F' }, ' for search-only mode.'] },
          ],
        },
        {
          title: 'Changed',
          items: [
            { term: ['Font changed to system-ui'], description: ['Replaced Inter with the OS system font stack. Improves CJK (Japanese, Chinese, Korean) display. San Francisco on Mac, Segoe UI on Windows.'] },
          ],
        },
        {
          title: 'Removed',
          items: [
            { term: ['Source Control sidebar tab removed'], description: ['Git operations are now consolidated in the Git menu at the top. Sidebar minimum width reduced to 256px.'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.4',
      highlight: 'A clear first step for new users.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Installing an extension that replaces your New Tab can feel uncertain. This release makes the first 30 seconds clear.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Welcome page on install'], description: ['A dedicated welcome page opens automatically after installation — confirms setup, explains the Chrome dialog, introduces the three ways to use Mark It Down, and covers data safety'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.3',
      highlight: 'Clip smarter, not harder.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Web Clipper is only useful when you can trust it. This release focuses on that trust.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Copy selection for LLM'], description: ['Select text, then use "Copy for LLM" to copy just the selection — with title and source metadata included automatically'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['GitHub Issue & PR comments captured again'], description: ['GitHub moved to React-based Issue pages, breaking the old selectors. Both old and new DOM structures are now handled'] },
            { term: ['Tooltip positioning fixed'], description: ['Tooltips in nested toolbars no longer drift — reverted from CSS Anchor Positioning to reliable JS-based placement'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.2',
      highlight: 'Big files, no freeze.',
      status: 'Released',
      statusClass: 'released',
      theme: 'This update focuses on one thing: making large notes feel smooth in daily use.',
      sections: [
        {
          title: 'Highlights',
          items: [
            { term: ['Large notes no longer freeze'], description: ['Archive opens heavy notes much more smoothly, even when switching repeatedly'] },
            { term: ['Faster note switching'], description: ['Recently opened Archive notes load quickly when you come back to them'] },
            { term: ['Cleaner block editing UI'], description: ['Block toolbars are now outside the content area for better readability'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Web Clipper on GitHub/GitLab'], description: ['Clipping now captures the page itself instead of generic platform descriptions'] },
            { term: ['Git conflict flow polish'], description: ['Commit messages are preserved, and the input field stays visible on screen'] },
            { term: ['Code block language selector'], description: ['Focus outline now appears correctly across themes'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.1',
      highlight: 'Lighter, faster, and ready to reorganize.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.1.0 expanded what the editor can do. v2.1.1 makes the whole app a step lighter — faster startup from trimming what\'s unused, consistent UX from unifying the details, and note splitting and merging from rethinking how long notes should work.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['20% Lighter App'], description: ['Code highlighting bundle reduced from 192 languages to a custom set of 34, cutting app size by ~193KB. Markdown, JavaScript, Python, HTML, SQL and all commonly used languages are still covered'] },
            { term: ['Split Note by Heading'], description: ['Break a long note into two parts at any heading. Filter by keyword or heading level, preview split sizes before confirming. Original goes to Trash, parts are auto-named'] },
            { term: ['Merge Selected Notes'], description: ['Ctrl+click to select multiple notes, then combine into one. Drag to reorder, edit the title, and preview the merged size before confirming'] },
            { term: ['Rich Tooltips'], description: ['All buttons now show custom tooltips with keyboard shortcuts. Unified across 12 components and ~40 locations — sidebar, toolbar, and modal actions'] },
            { term: ['Note Info on Hover'], description: ['Hover a note name in the sidebar to see file size and last updated date. Large notes show a colored dot warning'] },
            { term: ['Mermaid Theme Unification'], description: ['Flowcharts and sequence diagrams now match the app\'s neutral color system instead of Mermaid\'s default blue/pink palette. Consistent across all 4 themes'] },
            { term: ['Git Conflict "Merge Both" Reorder'], description: ['When remote and local notes conflict, "Merge Both" now opens a modal where you can drag to reorder before confirming. Merged note goes to Inbox, originals to Trash'] },
            { term: ['Rename on Title Collision'], description: ['When Git pull, Split, or Merge creates a duplicate title, a new "Rename" option lets you enter a new name with real-time duplicate checking'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Math Paste Broken'], description: ['Inline math ($...$) in pasted Markdown was not recognized as math. Fixed Smart Paste conversion logic to detect math patterns'] },
            { term: ['System Notes Overwritten on Git Pull'], description: ['Getting Started and Markdown Reference could be overwritten by remote pull. Added symmetric exclusion to match the push-side filter'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.0',
      highlight: 'More room to work. Smarter clipping.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.0.8 made big files open fast. v2.0.9 eliminated freezes. v2.1.0 expands what the editor can do and fixes what the Web Clipper was missing.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Template Gallery Link'], description: ['Hover the Template folder header to open an external gallery page with 20+ ready-to-use templates'] },
            { term: ['Insert Table of Contents'], description: ['Type /toc or use the command palette to auto-generate a TOC from your headings at the cursor position'] },
            { term: ['Slash Menu up to 100KB'], description: ['Slash menu and drag handle threshold raised from 50KB to 100KB for larger documents'] },
            { term: ['Blockquote Hover Delete'], description: ['Remove blockquotes with the hover trash icon, same pattern as alerts, tables, and footnotes'] },
            { term: ['JSON to Markdown Paste'], description: ['Ctrl+Shift+V auto-converts JSON — arrays become tables, objects become lists, nested structures become bullets'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Web Clipper Heading Loss'], description: ['H2+ headings disappeared on certain sites. Fixed preprocessing to preserve heading elements'] },
            { term: ['Web Clipper Mermaid Loss'], description: ['Mermaid diagrams (SVG) vanished during clipping. 3-stage source recovery implemented'] },
            { term: ['Selection Toolbar Off-Screen'], description: ['Toolbar buttons rendered off-screen on 100KB+ documents. Fixed optimization scope'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.9',
      highlight: 'No more freezes. That\'s the whole point.',
      status: 'Released',
      statusClass: 'released',
      theme: 'v2.0.8 made big files open fast in the Editor. v2.0.9 finishes the job — Archive and drag-and-drop no longer freeze.',
      sections: [
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Archive Freeze on Large Files'], description: ['Opening 200KB+ Markdown in Archive no longer freezes the browser. Progressive rendering applied to the read-only viewer'] },
            { term: ['Drag & Drop Freeze'], description: ['Moving notes between folders via drag-and-drop no longer causes UI freezes'] },
            { term: ['Batch Storage for Multi-Note Operations'], description: ['Moving or deleting multiple notes at once is now a single storage write instead of one per note'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.8',
      highlight: 'Big files, instant editing. UI feels alive.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Progressive Crepe Initialization loads only the first 5KB to start the editor instantly — the rest streams in behind the scenes. 100KB docs open 19.8x faster. Toast notifications, checkbox interactions, and the selection toolbar all got a tactile redesign.',
      sections: [
        {
          title: 'Highlights',
          items: [
            { term: ['Progressive Editor Loading'], description: ['First 5KB loads the editor instantly; remaining content streams via requestIdleCallback. 50KB: 271ms (5.7x), 100KB: 263ms (19.8x), 200KB: 519ms (36.6x faster)'] },
            { term: ['Toast Stacking Redesign'], description: ['Multiple toasts stack with depth and perspective. Hover pauses the timer. Progress bar shows time remaining. Larger corner radius, theme-aware buttons'] },
            { term: ['Checkbox Micro-Interactions'], description: ['Spring animation on check, fade on completed text, hover hint. Respects prefers-reduced-motion'] },
          ],
        },
        {
          title: 'New Features',
          items: [
            { term: ['Glassmorphism Selection Toolbar'], description: ['Blur 12px backdrop, 28x28 square buttons, custom tooltips. L2 tools layer above L1. Heading dropdown opens upward. All 4 themes'] },
            { term: ['HelpModal Reorganized'], description: ['4 tabs → 3 tabs (Settings / Guide / About). Guide now covers Slash Commands, Selection Toolbar, and Command Palette with collapsible sections'] },
            { term: ['Footnote Multi-Reference Backlinks'], description: ['When the same footnote is referenced multiple times, the back-link returns to the exact reference you clicked — not always the first one'] },
            { term: ['Timestamp Headings'], description: ['/now inserts current time as H2 or H3. Ctrl+Alt+; inserts inline HH:MM. Combine with TOC for a timeline view'] },
            { term: ['HTML → Markdown Paste'], description: ['Ctrl+Shift+V converts clipboard HTML to Markdown. Three paste modes (markdown / plain text / default) in Settings'] },
            { term: ['Copy as Markdown'], description: ['New button in L1 selection toolbar. Copies selected text as Markdown with estimated token count in toast'] },
            { term: ['Copy for LLM Normalization'], description: ['3-stage pipeline: heading hierarchy fix, auto language tags on code blocks (13 languages), excess blank line compression'] },
            { term: ['Spellcheck Control'], description: ['auto (disabled above 50KB) / always / never. Set to "never" to hide red squiggles for non-English writing'] },
            { term: ['Code Language Auto-Detection'], description: ['16 languages detected from shebang, DOCTYPE, and keyword patterns. Feeds into Copy for LLM normalization'] },
          ],
        },
        {
          title: 'Performance',
          items: [
            { term: ['Lazy Component Loading'], description: ['13 components (including Editor modals) load on demand. app.js reduced from 836KB to 729KB (-13%)'] },
            { term: ['Visibility Fix'], description: ['Editor uses visibility:hidden instead of display:none when note list is shown — prevents Progressive Loading queue from being cancelled'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Background Texture Atomicity'], description: ['Texture image data and flag now saved atomically via setStorageMulti() — no more half-written state on browser crash'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.7',
      highlight: 'Big files load fast. Clipper gets smarter.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Set a size threshold and large notes automatically open in Archive\'s read-only view. When you unlock to edit, the transition is smoother than opening in the editor from the start.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Auto-Archive Threshold'], description: ['Set a threshold (100/200/300KB) in Settings. Oversized notes open in read-only Archive mode instantly. Unlock to edit anytime'] },
            { term: ['Copy for LLM'], description: ['YAML frontmatter (title/source/date) prepended on copy. Web Clip metadata included automatically. Available from Copy dropdown and command palette'] },
            { term: ['Token Count on Copy/Export'], description: ['Estimated token count shown in toast notifications (e.g. "Copied! (~1,234 tokens)"). Heuristic: ~4 chars/token for Latin, ~1.5 for CJK'] },
            { term: ['llms.txt Auto-Detection'], description: ['Web Clipper checks /llms-full.txt and /llms.txt before Readability extraction. 24h session cache, 5s timeout, 500KB limit'] },
            { term: ['Progressive Code Highlighting'], description: ['Files with 30+ code blocks highlight viewport-first, then batch the rest via requestIdleCallback. 8s → 1.1s for 226 blocks'] },
          ],
        },
        {
          title: 'Web Clipper Improvements',
          items: [
            { term: ['Quality Benchmark'], description: ['19 sites, 35 fixtures, 8-dimension scoring. Adaptive pipeline (Readability → Defuddle fallback) achieves avg 99'] },
            { term: ['Heading Protection'], description: ['h2-h6 preserved through Readability extraction. Substack score: 77 → 98'] },
            { term: ['Adaptive Fallback'], description: ['Quality gate auto-switches from Readability to Defuddle when heading ratio is low. Zero cost for normal cases'] },
            { term: ['Lazy Image Extraction'], description: ['data-src, data-original, data-lazy-src attributes and srcset now captured'] },
            { term: ['Noise Reduction'], description: ['30 → 41 selectors. GitHub and Reddit-specific noise elements removed'] },
            { term: ['Dynamic Fence'], description: ['Code blocks with backticks inside auto-adjust fence length. No more broken syntax'] },
          ],
        },
        {
          title: 'UI Improvements',
          items: [
            { term: ['Code Block Language Selector'], description: ['Improved visibility across all 4 themes: background, border, hover/selected states, and z-index/containment fixes'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Footnote Clipping'], description: ['Superscript footnote references no longer clipped at paragraph top edge'] },
            { term: [{ code: 'x.com' }, ' Callouts'], description: ['Grok\'s [!NOTE]/[!WARNING] callouts now preserved when clipping from ', { code: 'x.com' }] },
            { term: ['Sidebar Flickering'], description: ['Fixed 3 re-render paths triggered by editor input: batched setImmediateContent, removed useEffect dependency, split Zustand selectors'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.6',
      highlight: 'Polished, piece by piece.',
      status: 'Released',
      statusClass: 'released',
      theme: 'No new workflows. Just a smoother experience — tooltips that show shortcuts, better sorting, loading indicators, and a theme system with no gaps.',
      sections: [
        {
          title: 'UI Improvements',
          items: [
            { term: ['Loading Indicator'], description: ['Large documents now show a shimmer placeholder so you know content is still loading'] },
            { term: ['Tooltips with Shortcuts'], description: ['Hover any button to see what it does — and its keyboard shortcut displayed visually'] },
            { term: ['Toast Notifications'], description: ['Redesigned with icons, slide animations, and dismissible with ESC'] },
            { term: ['Sort Control'], description: ['Two clear segments (Name / Updated) replace the old 4-click cycle. Click again to reverse'] },
            { term: ['Empty Folder Guide'], description: ['Template, Archive, and Trash folders explain their purpose when empty'] },
            { term: ['Notes in Command Palette'], description: ['Find and open any note by name from ', { code: 'Ctrl+Shift+P' }] },
          ],
        },
        {
          title: 'Theme & Design',
          items: [
            { term: ['Theme Consistency'], description: ['187 missing color definitions filled across all 4 themes — Parchment and CandleLight fully covered'] },
            { term: ['Frosted Glass UI'], description: ['Toolbars, toasts, and panels now use a frosted glass effect for a more layered feel'] },
            { term: ['Storage View'], description: ['The old progress bar is gone. Now you see note counts per folder at a glance'] },
          ],
        },
        {
          title: 'Performance',
          items: [
            { term: ['Math Font Size'], description: ['KaTeX font bundle reduced by 876KB — math-heavy notes load noticeably faster'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Sidebar Drag'], description: ['Fixed flickering when dragging notes between folders'] },
            { term: ['Side Panel Icons'], description: ['Fixed icons collapsing in Side Panel view'] },
            { term: ['TOC Click-Outside'], description: ['Fixed table of contents closing unexpectedly'] },
            { term: ['Badge Preview'], description: ['Fixed low contrast in badge preview on warm themes'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.5',
      highlight: 'GitHub PAT support, fixed.',
      status: 'Released',
      statusClass: 'released',
      theme: 'GitHub\'s default token format was silently rejected. Now it works.',
      sections: [
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Fine-grained PAT'], description: ['Fine-grained personal access tokens (github_pat_xxx) are now accepted for Git sync authentication'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.4',
      highlight: 'Big documents, no lag.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Typed 300KB and it didn\'t stutter. That\'s the difference.',
      sections: [
        {
          title: 'Performance',
          items: [
            { term: ['INP Optimization'], description: ['300KB doc typing: 272ms → 120ms. Slash menu: 184ms → 24ms. Command palette: 200ms → 32ms. First click in 50KB docs: 160ms → 24ms. All measured and verified in CI'] },
            { term: ['Decoration Rebuild'], description: ['300KB Presentation Delay: 105ms → 68ms (-35%). Autolink and trailing space decorations skipped in large docs'] },
          ],
        },
        {
          title: 'New Features',
          items: [
            { term: ['Batch Note Selection'], description: ['Shift+Click range select, Ctrl+Click toggle. Drag-and-drop, Delete, and Stage multiple notes at once'] },
            { term: ['Selective Git Push'], description: ['Push only staged notes with per-note lastPushedAt tracking. Sync (Ctrl+Shift+S) still pushes everything'] },
            { term: ['Git Conflict Merge in Editor'], description: ['"Merge in Editor" opens Compare & Edit with WYSIWYG diff highlighting. Resolve conflicts manually, then auto-push'] },
            { term: ['Diff Navigation'], description: ['▲2/5▼ nav controls in Compare & Edit banner. F5/Shift+F5 keyboard navigation. WYSIWYG reference view'] },
            { term: ['List Type Toggle'], description: ['Switch between Bullet, Ordered, and Task lists from selection toolbar L2. Active state highlighting'] },
            { term: ['Sort 4-State Cycle'], description: ['Name↑, Name↓, Updated↑, Updated↓. Fixed order field override bug'] },
            { term: ['Badge Double-Click Copy'], description: ['Double-click a shields.io badge to copy its Markdown'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['False Conflict Detection'], description: ['Fixed false conflicts between New Tab and Side Panel caused by tight/loose list serialization differences'] },
            { term: ['Sidebar Flickering'], description: ['Fixed 3-4 unnecessary re-renders per click when selecting notes'] },
            { term: ['Reference Mode'], description: ['Fixed diff highlighting mismatch with code fences'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.3',
      highlight: 'Refine the writing rhythm.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Small tools that stay out of your way while you write.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Footnote Insert Modal'], description: ['Insert footnotes from the command palette or slash menu. Labels auto-numbered, reference and definition inserted in one transaction. Edit and delete from hover toolbar'] },
            { term: ['Custom Snippets'], description: ['Save your own Markdown templates. 3 built-in presets (YAML Frontmatter, Details, Definition List). Manage from command palette, toolbar, or Settings'] },
            { term: ['Toggle Line Breaks'], description: ['Switch between paragraph breaks and hard breaks in selected text. Direction auto-detected'] },
            { term: ['Code Block Copy'], description: ['ProseMirror-first 3-layer fallback for reliable extraction. 4+ backtick fences supported. Copy as Markdown promoted to always-visible'] },
            { term: ['Badge Insert Modal'], description: ['Generate shields.io badge Markdown from the command palette. 8 color presets + custom. Live preview before insert'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['HTML Export Alerts'], description: ['GitHub Alerts (callouts) now render with correct styling in HTML export'] },
            { term: ['Debug Log Leak'], description: ['Fixed debug log that leaked link URLs to console on every keystroke'] },
            { term: ['HTML Sanitization'], description: ['Expanded sanitization rules for clipped web content'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.2',
      highlight: 'Clip the web. Capture AI.',
      status: 'Released',
      statusClass: 'released',
      theme: 'Right-click any page or AI chat and save it as clean Markdown — directly into your notes.',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['Web Clipper'], description: ['Right-click to save or copy any page or selected text as Markdown. Saved notes open automatically in Side Panel'] },
            { term: ['AI Chat Extraction'], description: ['Captures output from Claude, ChatGPT, Grok, and Gemini as clean Markdown. Math, code, tables, and artifacts all preserved'] },
            { term: ['Comment Thread Extraction'], description: ['Structured Markdown from Hacker News, Reddit, and GitHub. Preserves nesting, authors, and timestamps'] },
            { term: ['Table Export: TSV Format'], description: ['Switched from CSV to TSV (tab-separated) for better paste compatibility with Excel, Google Sheets, and Slack'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Task List Conversion'], description: ['Converting selection to task list from toolbar no longer produces bullet lists instead'] },
            { term: ['Compare & Edit'], description: ['No longer shows false positives caused by invisible line break differences'] },
            { term: ['Table Toolbar'], description: ['Actions now target the correct table when multiple tables are present'] },
            { term: ['List Markers'], description: ['Parchment and CandleLight theme list markers are now visible'] },
            { term: ['Table Cell Backgrounds'], description: ['Light and Dark theme table cells are no longer transparent'] },
            { term: ['Find & Replace'], description: ['Fixed Japanese mistranslation and crash when replacing with empty text'] },
            { term: ['Security'], description: ['Stricter host validation, innerHTML sanitization, regex DoS protection, cookie value validation'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.1',
      highlight: 'Small fix, big compatibility',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['DOCX Task Lists'], description: ['DOCX export now renders task lists with checkbox symbols (☐/☑) instead of plain bullets'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.0',
      highlight: 'Write it, then ship it',
      status: 'Released',
      statusClass: 'released',
      theme: 'Everything you need to take your Markdown out of the browser — PDF, DOCX, PNG, HTML. Plus cleaner toolbars, smarter tables, and cross-window conflict resolution.',
      sections: [
        {
          title: 'Export Suite',
          items: [
            { term: ['PDF Export'], description: ['Page numbers, clickable table of contents, custom paper size (A4/Letter/A3) and margin presets — powered by Paged.js'] },
            { term: ['DOCX Export'], description: ['Images, Mermaid diagrams, math equations, and syntax highlighting all embedded. Open in Word and it just works'] },
            { term: ['PNG Export'], description: ['Capture any note as a high-resolution 2x Retina image'] },
            { term: ['HTML Export'], description: ['3 CSS templates (GitHub / Compact / Academic). Self-contained: KaTeX and highlight.js inlined, no internet needed'] },
            { term: ['New Export Panel'], description: ['Pick format, scope (single note / archive / all notes), and settings in one place. Trash after export option included'] },
          ],
        },
        {
          title: 'Toolbar Redesign',
          items: [
            { term: ['L1 / L2 Structure'], description: ['Common actions up front, advanced actions behind ', { code: '···' }, ' — less clutter, same power'] },
            { term: ['Unified Icon System'], description: ['All icons migrated to Lucide — ~200 inline SVGs replaced with one consistent library'] },
            { term: ['22 New Commands'], description: ['Word count, heading transforms, table operations, callout cycling — all accessible from the Command Palette'] },
            { term: ['Callout Type Switcher'], description: ['Cycle through NOTE/TIP/IMPORTANT/WARNING/CAUTION with ', { code: 'Ctrl+Shift+A' }, ' or the hover toolbar'] },
          ],
        },
        {
          title: 'Tables & UX',
          items: [
            { term: ['Table Toolbar Expanded'], description: ['Sort columns, copy as CSV or Markdown, prettify alignment, and switch layout (Auto / Full Width / Equal Columns)'] },
            { term: ['Row & Column Highlight'], description: ['Active cell row and column both tinted — you always know where you are'] },
            { term: ['Footnotes'], description: ['Click a reference to jump to its definition, click back to return. Rebuilt with 4-layer guard against false positives in code blocks'] },
            { term: ['Appearance Popover'], description: ['Color theme and Typography (Standard / Compact / Academic) now in one popover — what you see is what exports'] },
            { term: ['Mode Popover'], description: ['Focus Mode, Fullscreen, Compare & Edit, and Open Side Panel unified into one header button'] },
            { term: ['Learn by Touch'], description: ['Empty notes show random tips, toolbar buttons show keyboard shortcuts on hover'] },
          ],
        },
        {
          title: 'Cross-Instance Compare',
          items: [
            { term: ['Conflict Detection'], description: ['New Tab and Side Panel editing the same note? Changes are compared automatically when either window closes'] },
            { term: ['Visual Diff'], description: ['Inline green highlights for additions, side-by-side modal with character/word count and change-rate statistics'] },
            { term: ['Smart Normalization'], description: ['Trailing whitespace, line endings, and blank lines normalized — no false positives'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Strikethrough Typing'], description: [{ code: '~~text~~' }, ' now converts immediately as you type, including after IME input'] },
            { term: ['PDF Warm Theme Borders'], description: ['Parchment/CandleLight themes no longer show stray borders in PDF output'] },
            { term: ['Mermaid Labels in HTML Export'], description: ['Diagram text labels no longer vanish after DOMPurify sanitization'] },
            { term: ['Syntax Highlighting in Export'], description: ['Code block colors now render correctly in all 3 HTML templates'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.9',
      highlight: 'Export your writing, paste your data',
      status: 'Released',
      statusClass: 'released',
      theme: 'Structure inside, exits outside — PDF and HTML export, Excel table paste, and a color system rebuilt from the ground up.',
      sections: [
        {
          title: 'Export Suite',
          items: [
            { term: ['PDF Export'], description: ['Print to PDF via browser dialog — auto page breaks at H1, ', { code: '---' }, ' converted to page breaks'] },
            { term: ['HTML Export'], description: ['Standalone HTML with GitHub-style CSS, embedded Mermaid SVGs, KaTeX math, syntax highlighting — zero external dependencies'] },
            { term: ['Batch HTML ZIP'], description: ['Export Archive notes or all notes as HTML in a single ZIP download'] },
            { term: ['Dark Mode'], description: ['Exported HTML auto-adapts to OS dark/light preference'] },
            { term: ['Ctrl+Shift+E'], description: ['Jump directly to the Export menu'] },
          ],
        },
        {
          title: 'Smart Table Paste',
          items: [
            { term: ['Excel & Sheets'], description: ['Paste from Excel or Google Sheets — auto-detected as Markdown table'] },
            { term: ['Format Detection'], description: ['TSV, pipe-delimited, and RFC 4180 CSV with quoted fields supported'] },
            { term: ['Preview Modal'], description: ['Confirm before inserting — Enter to accept, Esc for plain text'] },
          ],
        },
        {
          title: 'Color System',
          items: [
            { term: ['CSS Variable Migration'], description: ['48 semantic color tokens in OKLCH replace hundreds of hardcoded branches — adding a 5th theme now means editing one file'] },
            { term: ['Warm Theme Polish'], description: ['Parchment/CandleLight Mermaid diagrams and syntax highlighting now use warm palette consistently'] },
            { term: ['WCAG AA Verified'], description: ['4.5:1 contrast ratio confirmed across all 4 themes'] },
          ],
        },
        {
          title: 'UI & UX',
          items: [
            { term: ['Tab Title'], description: ['Shows "Folder (count) | Mark It Down" — updates automatically'] },
            { term: ['Favicon'], description: ['Extension icon now visible in browser tab bar'] },
            { term: ['Paste as Table'], description: ['Command Palette command for direct clipboard-to-table conversion'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['Header Scroll'], description: ['Fixed scroll position jumping when editing H1 headings'] },
            { term: ['Focus Mode'], description: ['Fixed first heading not reaching typewriter position and rAF scroll conflicts'] },
            { term: ['ESC Key'], description: ['Modals now close with ESC even during IME input or when unfocused'] },
            { term: ['PDF Title'], description: ['Tab title no longer overwritten during PDF export'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.8',
      highlight: 'Redefining the moment you open',
      status: 'Released',
      statusClass: 'released',
      theme: 'Eliminating friction before you start writing — faster loading, warmer themes, smarter palette, and a place you can make your own.',
      sections: [
        {
          title: 'Themes & Customization',
          items: [
            { term: ['Parchment Theme'], description: ['Warm-tone palette (WCAG AAA) with tracing paper effect — the editor as a room, not just a tool'] },
            { term: ['CandleLight Theme'], description: ['Dark warm-tone companion — Mermaid and KaTeX also render in warm palette'] },
            { term: ['Background Texture'], description: ['Tile your own PNG/JPEG/WebP as editor background (Settings > Display)'] },
            { term: ['Wax Seal'], description: ['Full-screen animation on first launch (click to skip). Theme switching uses smooth CSS transitions'] },
          ],
        },
        {
          title: 'Performance & Focus',
          items: [
            { term: ['Progressive Loading'], description: ['50KB+ docs open instantly — first ~5KB renders, rest loads in background (89-96% faster)'] },
            { term: ['Focus Mode Polish'], description: ['Glassmorphism toolbar, 2px scrollbar, smoother header transitions'] },
            { term: ['TOC UI'], description: ['Drag handles appear on hover, heading-level font sizing (H1 14px → H4+ 11px)'] },
          ],
        },
        {
          title: 'Command Palette',
          items: [
            { term: ['Smart Search'], description: ['Fuse.js scoring with 20% snippet boost — "Table" now finds Insert Table first'] },
            { term: ['Alert Indicators'], description: ['Color dots for NOTE/TIP/WARNING/IMPORTANT/CAUTION before you insert'] },
            { term: ['Syntax Previews'], description: ['Descriptions show what gets inserted: ', { code: 'graph TD' }, ' — Decision flows with arrows'] },
            { term: ['Settings in Palette'], description: ['Switch themes, toggle Inline Math / Trailing Spaces without opening Settings'] },
          ],
        },
        {
          title: 'Editor & Diagrams',
          items: [
            { term: ['Settings + Help Unified'], description: ['Gear + ? merged into one 4-tab modal: Settings / Shortcuts / Markdown / Tips'] },
            { term: ['Mermaid All 19 Types'], description: ['5 missing types fixed, 10 new snippets: ER, Journey, Pie, GitGraph, Mindmap, Timeline, Sankey, XY, C4, Packet'] },
            { term: ['Math PNG Export'], description: ['Save KaTeX blocks as Retina 2x PNG from hover toolbar'] },
            { term: ['Mermaid Hover Toolbar'], description: ['Auto-hide in separate tab — 28px trigger zone at viewport top'] },
            { term: ['Crepe Menu Polish'], description: ['Dark mode selection fix, backdrop-blur, icon tooltips (i18n)'] },
          ],
        },
        {
          title: 'Onboarding',
          items: [
            { term: ['Welcome Note'], description: ['First launch shows a sample note with Mermaid diagram, shortcuts, checklist — auto EN/JA'] },
            { term: ['Contextual Hints'], description: ['3 progressive hints: Command Palette (5 min), Side Panel (3 sessions), folder tips'] },
            { term: ['Import Highlight'], description: ['Imported notes glow teal in sidebar until opened'] },
          ],
        },
        {
          title: 'Bug Fixes',
          items: [
            { term: ['TOC on Windows'], description: ['Fixed heading extraction failing on ', { code: '\\r\\n' }, ' line endings'] },
            { term: ['Copy as Text'], description: ['LaTeX ', { code: '$...$' }, ' and escape characters now stripped correctly'] },
            { term: ['Dollar Amounts'], description: [{ code: '$50' }, ' no longer misidentified as LaTeX'] },
            { term: ['Multi-file Import'], description: ['All files now import correctly (fixed live FileList reference)'] },
            { term: ['Light Theme Toolbar'], description: ['Floating toolbar icons now visible on light backgrounds'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.7',
      highlight: 'Note navigation & inline code',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Note Navigation'], description: [{ code: 'Ctrl+Alt+PgUp/PgDn' }, ' to jump between notes in the same folder'] },
            { term: ['Inline Code Copy'], description: ['Double-click backtick code to copy to clipboard'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.6',
      highlight: 'Footnotes & emoji shortcodes',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Footnotes'], description: ['Academic-style ', { code: '[^label]' }, ' with click-to-jump'] },
            { term: ['Emoji Shortcodes'], description: ['Type ', { code: ':smile:' }, ' to insert 😄'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.5',
      highlight: 'Copy options & version restore',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Copy Dropdown'], description: ['"Copy as MD" and "Copy as Text" in one menu'] },
            { term: ['Version Restore'], description: ['Restore notes to previous versions from Git history'] },
            { term: ['Git Status Dots'], description: ['Green for new, yellow for modified, with diff button'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.4',
      highlight: 'TOC reordering & breadcrumbs',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['TOC Reordering'], description: ['Drag & drop or keyboard shortcuts to restructure headings'] },
            { term: ['Breadcrumbs'], description: ['See current heading path, click to jump to any ancestor'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.3',
      highlight: 'Fuzzy search & word count',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Fuzzy Search'], description: ['Typo-tolerant, single CJK character search'] },
            { term: ['Timestamp'], description: ['Last modified date/time on each note'] },
            { term: ['Selection Word Count'], description: ['Characters and words for selected text (CJK-aware)'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.2',
      highlight: 'Table editing',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Tables'], description: ['Insert, sort, CSV export, drag to reorder rows'] },
            { term: ['Keyboard Navigation'], description: ['Heading jump (', { code: 'Ctrl+↑/↓' }, '), page scroll'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.1',
      highlight: 'Word count & large files',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Word Count'], description: ['Characters, words (CJK-aware), reading time'] },
            { term: ['Large Files'], description: ['300KB+ shows choice dialog'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.0',
      highlight: 'Math (LaTeX) support',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Math Rendering'], description: ['Inline ', { code: '$...$' }, ', block ', { code: '$$...$$' }, ', with enlarge button'] },
            { term: ['Cross-Platform Keys'], description: ['Mac vs Windows/Linux shortcut symbols'] },
          ],
        },
      ],
    },
    {
      version: 'v1.8.0',
      highlight: 'Find & Replace, auto-linking',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Find & Replace'], description: ['Search and replace across your note'] },
            { term: ['Auto-Linking'], description: ['URLs and emails become clickable automatically'] },
          ],
        },
      ],
    },
    {
      version: 'v1.7.0',
      highlight: 'Keyboard-first & Git sync status',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Keyboard-First'], description: ['Panel shortcuts and arrow key navigation'] },
            { term: ['Git Sync Status'], description: ['Auto-fetch on startup, remote update banner'] },
          ],
        },
      ],
    },
    {
      version: 'v1.6.0',
      highlight: 'Command Palette & 95% faster startup',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Command Palette'], description: ['VS Code-style with 50+ commands'] },
            { term: ['Focus Mode'], description: ['Typewriter scroll and 3-level dimming'] },
            { term: ['95% Faster Startup'], description: ['Bundle: 698KB → 84KB'] },
          ],
        },
      ],
    },
    {
      version: 'v1.5.0',
      highlight: 'Large docs & Mermaid',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Large Docs'], description: ['57% faster loading for 100KB+ files'] },
            { term: ['Rich Content'], description: ['Callouts, anchors, LaTeX, Mermaid zoom'] },
          ],
        },
      ],
    },
    {
      version: 'v1.4.0',
      highlight: 'Smart TOC & data safety',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Smart TOC'], description: ['Highlights current section while scrolling'] },
            { term: ['Data Safety'], description: ['3-layer auto-save protection'] },
          ],
        },
      ],
    },
    {
      version: 'v1.3.0',
      highlight: 'Git fetch & multi-keyword search',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Git Fetch'], description: ['Check remote state without modifying local'] },
            { term: ['Multi-keyword Search'], description: ['AND search with highlights'] },
          ],
        },
      ],
    },
    {
      version: 'v1.2.0',
      highlight: 'Conflict detection & wide screen',
      status: 'Released',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Conflict Detection'], description: ['4-level risk indicators for Git sync'] },
            { term: ['Wide Screen'], description: ['Sidebar/TOC outside content on 1600px+'] },
          ],
        },
      ],
    },
  ],
  ja: [
    {
      version: 'v2.3.0',
      highlight: 'テーブルをスプレッドシートのように編集し、作業場をより安定させる。',
      status: '審査中',
      statusClass: 'under-review',
      latest: true,
      defaultOpen: true,
      theme: 'Markdown テーブルを専用のグリッドで編集できるようになった。パイプ記号やカーソル位置と格闘せず、表をスプレッドシートのように扱える。グリッドでは範囲選択、行・列操作、スプレッドシートからの貼り付け、並び替え、オートフィル、検索、一括書式設定に対応し、ノート本体は plain Markdown のまま保たれる。あわせて、列幅保持、リスト内コードブロックの貼り付け、複数タブ保存、Archive 閲覧まわりの静かな不具合も修正した。',
      sections: [
        {
          title: 'New Features',
          items: [
            { term: ['スプレッドシート風テーブルエディタ'], description: ['Markdown テーブルを、テーブルツールバー、右クリック、またはコマンドパレットから全画面グリッドで開ける。セル範囲のドラッグ選択、行・列ガター選択、コピー、切り取り、貼り付け、挿入、削除、移動、複製、並び替え、よく使うスプレッドシート風ショートカットに対応。'] },
            { term: ['テーブル書式、検索、オートフィル'], description: ['選択セルに太字、斜体、コード書式を適用できる。', { code: 'Ctrl/Cmd+F' }, ' でテーブル内検索を開き、フィルハンドルで値のコピーや簡単な連番入力もできる。グリッドでの変更は、1 回の plain Markdown 編集としてノートへ戻る。'] },
          ],
        },
        {
          title: 'Improvements',
          items: [
            { term: ['Archive の表示高速化'], description: ['同じセッションで複数のアーカイブ済みノートを閲覧するとき、表示までの待ち時間が短くなった。'] },
            { term: ['テーブル行間のコンパクト化'], description: ['各読み書きスタイルでテーブル行の高さを抑え、同じ画面内により多くの表データを表示できるようにした。'] },
          ],
        },
        {
          title: 'Fixed',
          items: [
            { term: ['リスト内コードブロック'], description: ['箇条書きや番号付きリスト内の複数行コードブロックが、ペーストやクリップ時に途中で欠けなくなった。'] },
            { term: ['テーブル列幅'], description: ['手動で調整した列幅が、行や列の追加・削除後もリセットされなくなった。'] },
            { term: ['複数タブでの同一ノート編集'], description: ['New Tab と Side Panel で同じノートを開いている場合も保存が調整され、古い内容が新しい変更を静かに上書きしなくなった。'] },
            { term: ['コマンドパレットの選択'], description: ['入力直後に Enter を押したとき、古い選択ではなく画面上でハイライトされているコマンドが実行されるようになった。'] },
            { term: ['テーブルツールバーと Tab 移動'], description: ['フローティングのテーブルツールバーが非表示のまま固まらなくなり、Tab キーで次のセルへ安定して移動できるようになった。'] },
            { term: ['表データ貼り付けのヘッダー判定'], description: ['数値や日付に見えるヘッダー行を含むスプレッドシートデータを、より正確にヘッダーとして認識するようになった。'] },
            { term: ['日本語エクスポートフォント'], description: ['PDF、HTML、EPUB 書き出しで、必要に応じて標準的な日本語システムフォントへフォールバックするようになった。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.10',
      highlight: '新しい読書面と、より深まるナレッジグラフ。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'まったく新しい読書面が2つ追加され、ノートのつながり方が再設計された。GitHub Repository Reader では、Mark It Down を離れずにリポジトリを閲覧できる。ファイルツリーをたどり、ファイル間のリンクを追い、必要なファイルをノートに取り込める。RSS リーダーは小さなモーダルから、自分のノートと同じ Markdown 品質で表示する全画面ワークスペースに成長した。ノートグラフは開くたびに配置が変わるレイアウトをやめ、一定の並びで読めるアウトラインツリーと、ズーム・パン対応の Radial ビューに置き換わった。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['GitHub Repository Reader'], description: ['Mark It Down を離れずに GitHub リポジトリを閲覧できる。URL でリポジトリを開き、ファイルツリーをたどり、Markdown ファイルをコードブロック・図・数式・コールアウト・画像まで完全レンダリングで表示。リポジトリをピン留めすると次回自動で開く。プライベートリポジトリは個人アクセストークンで対応。任意のファイルをワンクリックで Inbox に取り込める。'] },
            { term: ['RSS リーダーが全画面ワークスペースに'], description: ['左のフィードとフィルタのサイドバー、中央の記事一覧と閲覧ペイン、右のインスペクタ（メタデータ・タグ・見出し）で構成される。タグで絞り込み、インライン検索、Undo 付きの記事削除、ワンステップの Inbox 保存に対応。Ctrl+Shift+R で直接開ける。'] },
            { term: ['ノートグラフ: アウトラインツリーと Radial ビュー'], description: ['アウトラインビューはノートを展開・折りたたみ・ルート変更できるツリーで表示する。Radial ビューはリンク先のノートを中心ノードの周囲に配置し、ホイールズーム・ドラッグパン・Reset ボタンに対応。Repository Reader 内でもグラフが使え、リポジトリ内のファイルのつながりを確認できる。'] },
            { term: ['フロントマター専用モーダル'], description: ['ノートのメタデータ編集が専用モーダルになった。ノート本文やクリップ元ページから候補が提示され、チップをクリックして適用できる。YAML としてコピーや一括クリアもヘッダメニューから操作できる。'] },
          ],
        },
        {
          title: '改善',
          items: [
            { term: ['RSS 記事が自分のノートと同じ品質で表示'], description: ['記事プレビューがメインエディタと同じレンダリングエンジンを使うようになった。フォント・見出しスタイル・コードブロック・Markdown 整形が統一される。'] },
            { term: ['RSS 記事のインスペクタ'], description: ['右パネルに記事の見出し構造が目次として表示され、スクロールに追従する。見出しをクリックするとそのセクションへジャンプする。'] },
            { term: ['Repository Reader: wikilink と Obsidian Vault 対応'], description: ['同一リポジトリ内のファイル間 wikilink がナビゲーションとして機能する。Obsidian のハイライト・コメント・コールアウトも折りたたみを含めて完全なスタイルで表示される。'] },
            { term: ['Repository Reader: ナビゲーション履歴'], description: ['ヘッダの戻る/進むボタン、Alt+Left / Alt+Right ショートカット、ファイル名で直接ジャンプできるクイックスイッチャー（Ctrl+K）を追加。'] },
            { term: ['Repository Reader: バックリンクパネル'], description: ['開いているファイルにリンクしている他のファイルを右パネルに一覧表示。ホバーでプレビュー、クリックで移動できる。'] },
            { term: ['サイドバーのノート行が静かに'], description: ['未処理マーカーや Git 保留状態、ノートサイズなどのステータス表示をホバーカードに移動。Git 保留はタイトル色のわずかな変化だけで示される。'] },
            { term: ['日本語テキストの改行最適化'], description: ['サイドバーのタイトルやモーダルのラベル、ツールチップなどの日本語 UI テキストが、単語の途中ではなく自然な文節の区切りで折り返されるようになった。'] },
            { term: ['インポート時にファイル名をタイトルに'], description: ['title フィールドも先頭見出しもない Markdown ファイルをインポートすると、ファイル名がノートタイトルとして使われる。一括インポート後に無題ノートが並ぶことがなくなる。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['大きなテーブルだけの Markdown'], description: ['大きなテーブルのみで構成されたファイルが、空白や途切れた表示にならず正しく開くようになった。'] },
            { term: ['Focus Mode 中の外観パネル'], description: ['Focus Mode 中でも右上の外観・テーマパネルを開いて操作できるようになった。'] },
            { term: ['先頭に空白行があるフロントマター'], description: ['フロントマターの開始区切りの前に空白行やスペースがあるファイルでも、メタデータが正しくインポートされるようになった。'] },
            { term: ['ファイル名にスペースがある場合の Git 同期'], description: ['Git からのプル時に、スペースを含むファイル名のノートが既存ノートに正しくマッチするようになり、重複ノートが作られなくなった。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.9',
      highlight: 'OKFバンドルが参照元を一緒に持ち出せるようになり、ナレッジグラフが読みやすくなった。',
      status: 'リリース済',
      statusClass: 'released',
      theme: '知識がエディタを離れてもつながりを保てるようになった。OKF バンドルが参照元を番号付きリストとして持ち出せ、ノート間リンクもバンドル内で正しく機能する。コンセプトグラフはラベルが重ならず、選択時にアンバーでハイライトされ、Reset ボタンが常に表示される。初めて開いたときのガイダンスも追加された。Portability Hub は見出し構造の警告を追加し、フロントマターパネルは confidence・source の標準値を候補表示するようになった。',
      sections: [
        {
          title: '改善',
          items: [
            { term: ['OKF バンドルの参照リスト'], description: ['OKF バンドルとしてエクスポートすると、本文中の外部リンクが自動的に収集され、番号付きの参照リストとしてファイル末尾に追加される。バンドルを渡した後も参照元が見えるようになる。'] },
            { term: ['バンドル内のノートリンク'], description: ['自分のノート同士のリンクが、エクスポート後のバンドル内でも正しく機能するようになった。エディタ上でのつながりがバンドルの中でも保たれる。'] },
            { term: ['OKF エクスポートの type フィールド説明'], description: ['エクスポートパネルに、type フィールドがどのフォルダのノートにどの値として自動設定されるかの説明が表示されるようになった。Portability Hub では type が未設定のノートを確認できる。'] },
            { term: ['リンクグラフの改善'], description: ['ノードラベルがノードの下に表示されて重ならなくなった。ノードやエッジを選択するとアンバーでハイライト。Reset view ボタンが常に表示され、グラフ全体を一望できる。4テーマすべてがグラフに正しく反映される。'] },
            { term: ['コンセプトグラフの初回ガイダンス'], description: ['グラフにノートがほとんどない場合は、[[ノート名]] 記法でつながりを作る方法を案内するガイダンスが表示される。ノードをクリックすると目次が開くことを伝えるヒントも初回のみ表示される。'] },
            { term: ['Note Log の raw ステータス tooltip'], description: ['ノートアクティビティログの raw チップにホバーすると、raw ステータスの意味と解除方法を説明する tooltip が表示されるようになった。'] },
            { term: ['Portability Hub の見出しレベル警告'], description: ['見出しレベルが飛んでいるノートを警告するようになった。EPUB や文書変換ツールへの出力前に構造の問題を把握できる。'] },
            { term: ['フロントマターの値候補'], description: ['confidence や source フィールドを編集するとき、標準的な値の候補が表示されるようになった。自由な値も引き続き入力できる。複数のノートで値を揃えて、あとで絞り込みや並べ替えがしやすくなる。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['ツールバーメニューが開いた状態で折りたたまれる問題を修正'], description: ['ツールバーのメニューを開いたまま保持すると、エディタの自動非表示ロジックによってメニューが予期せず閉じる問題を修正した。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.8',
      highlight: '書いたことが、書いたものと一緒に残る。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'OKF バンドルとの往復がより忠実になった。外部バンドルを取り込んだときに元の構造が保たれ、ソースリンクはポータブルなメタデータとして引き継がれ、エクスポートにはブラウザで開ける概要ページが含まれる。知識パッケージの形を失わずに、レビューと咀嚼のループを回せるようになった。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['Note Log'], description: ['ノートの変更理由を — Creation・Update・Deprecation、または自分で決めた動詞で — ノート内に書き留められる。Alt+L でログを開く。記録は OKF エクスポートと Git コミットに自動反映。'] },
            { term: ['リンクグラフ'], description: ['右パネルに「このノートへのリンク」「このノートからのリンク」をグラフ表示。ノードをクリックでジャンプ。[+][−] でグラフをズームできる（OKF バンドルの Viewer も同様）。'] },
            { term: ['生 Markdown トグル'], description: ['右パネルで整形表示と生 Markdown 記法を切り替えられる。エディタを開かずに構文を確認できる。'] },
            { term: ['OKF バンドル改善'], description: ['エントリメニューから OKF バンドルを明示インポート。リンクはウィキリンクとして復元。エクスポートにはブラウザで開ける index.html を同梱（サーバー不要）。ソース URL は OKF resource として保持。Git 同期も同じ OKF 構造を維持。'] },
            { term: ['セマンティックマークアップ全面適用'], description: ['figure/figcaption・scope 属性・article/nav ランドマークが HTML エクスポート・OKF Viewer・アプリ内プレビュー・EPUB すべてに適用。Markdown ソースは変更されない。'] },
            { term: ['EPUB 章ナビゲーション'], description: ['EPUB エクスポートに章区切りとランドマークナビゲーションを追加。スクリーンリーダーや電子書籍リーダーで章ごとに移動できる。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.7',
      highlight: 'エラーが出たとき、何が起きているかわかるようになった。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'Git 同期・Web Clipper・RSS が失敗した理由（認証エラー・アクセス拒否・ネットワーク障害）を具体的に表示するようになった。あわせて、ノート読み込み直後に目次ナビゲーションボタンが無反応になる問題を修正した。',
      sections: [
        {
          title: '改善',
          items: [
            { term: ['Git 同期の失敗理由を表示'], description: ['認証エラー・アクセス権限エラー・ネットワーク障害を区別して表示。'] },
            { term: ['Web Clipper / RSS の失敗理由を表示'], description: ['取り込み・取得に失敗した理由を具体的に表示。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['目次ナビボタンの修正'], description: ['ノート読み込み直後にボタンが無反応になる問題を修正。'] },
            { term: ['Git 同期の整合性改善'], description: ['一部状況でノートが正しく同期されない問題を修正。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.6',
      highlight: '取り込みを丁寧に、図を使いやすく、ノートを育てる。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.2.5 が「出す」体験を整えたなら、v2.2.6 は「出す価値のあるもの」を作る体験を引き上げるバージョンだ。図を拡大して確かめ、長文を分割して育て、ルビ付きの文章をそのまま取り込む。情報を自分のものにするまでのサイクルが、また一歩速くなった。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['アドレスバーからノートを開く（omnibox 連携）'], description: ['Chrome のアドレスバーで ', { code: 'mid' }, ' と入力してスペースを押すと、ノートをタイトルで検索できる。Enter を押すと新規タブで開く。マウス不要。'] },
            { term: ['Today テンプレート'], description: ['Template フォルダに「Today」というノートを置くと、今日のノートがそのひな型で始まる。毎日自動で適用される。'] },
            { term: ['Mermaid 図の拡大・ズーム・全画面・SVG 保存'], description: ['Mermaid 図をクリックすると拡大ビューアが開く。Ctrl+スクロールで 25〜400% ズームでき、全画面表示や SVG ファイルとしての保存も可能。'] },
            { term: ['見出しベースのノート分割（シリーズ機能）'], description: ['長いノートを見出し単位で分割してシリーズにまとめられる。サイドバーでグループ表示され、Alt+PageUp/PageDown で移動、結合、シリーズ全体のエクスポートも可能。'] },
            { term: ['Web Clipper：ルビ付き文章を青空文庫記法に変換'], description: [{ code: '<ruby>' }, ' タグを含むページを取り込むと、', { code: '漢字《かんじ》' }, ' 形式に自動変換される。脚注・表・コードブロック・画像を含む長文ページの取り込み品質も改善した。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['Web Clipper：タイトルへの脚注記号混入を修正'], description: ['引用・出典付きのページをクリップすると、脚注参照記号がノートタイトルやファイル名に混入する問題があった。H1 は常にクリーンなタイトルになるよう修正。'] },
            { term: ['Web Clipper：長文ページの取り込み品質を改善'], description: ['脚注・表・コードブロック・画像が混在する長文ページを取り込んだとき、Markdown の構造が崩れにくくなった。'] },
            { term: ['Mermaid：黒塗り問題を修正'], description: ['拡大ビューアやアーカイブプレビューで図が真っ黒に塗りつぶされる問題を修正。全テーマ・全図タイプで確認済み。'] },
            { term: ['Mermaid：日本語を含む図のフォント不揃いを修正'], description: ['日本語テキストを含む図でフォントが混在していた問題を修正。フォント描画が統一された。'] },
            { term: ['Git 同期：書き込み競合ガードを追加'], description: ['同期中の並行書き込みが保存データを破損することがあった。書き込み競合ガードを追加し、衝突解決後の同期途切れも次回操作で確実に回復するようにした。'] },
            { term: ['設定同期：field レベルの 3-way merge に改善'], description: ['設定がデバイス間で異なる場合、以前は一方をまるごと選んでいた。フィールドごとに判断する 3-way merge により、各デバイスの意図した変更が保たれるようになった。'] },
            { term: ['カスタム Export プリセットを Git 同期対象に追加'], description: ['ユーザーが作成したエクスポートプリセットが Git 同期の対象外だった。対象に加えることで、あるデバイスで作成したプリセットが他のデバイスにも反映される。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.5',
      highlight: '受け渡しをきれいに、操作を速く。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.2.4 が「取り込む」体験を引き上げたなら、v2.2.5 は「残す」と「渡す」を整えるバージョンだ。RSSクリップに出典が残り、コマンドパレットが速さを取り戻し、エクスポートが相手先と噛み合う。エディタの落ち着きとセキュリティの地固めも同時に進んだ。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['RSSクリップに出典 URL を自動記録'], description: ['RSS記事を保存すると frontmatter に ', { code: 'source_url' }, ' が自動的に入るようになった。保存トーストには Undo アクションも追加され、すぐ取り消せる。'] },
            { term: ['Web Subscription レシピを追加'], description: ['Hacker News、Lobsters、Hashnode、freeCodeCamp、Smashing Magazine、CSS-Tricks、Stack Overflow Blog、GitHub/GitLab/Vercel/Cloudflare Blog、Mozilla Hacks のプリセットを追加。ワンクリックで購読できる。'] },
            { term: ['コマンドパレット: 最近使ったコマンドを優先表示'], description: ['直近3件のコマンドがパレット上部に常に表示されるようになり、よく使う操作がすぐ呼び出せる。'] },
            { term: ['コマンドパレット: スニペットのプレビュー表示'], description: ['スニペットを挿入する前にプレビューが表示される。Mermaid スニペットは実際の図としてレンダリングされるので、形を確認してから選べる。'] },
            { term: ['コマンドパレット: 設定コマンドを追加'], description: ['テーマ切り替え・フォントサイズ・Git同期トグルなど、よく使う設定がコマンドパレットから直接操作できるようになった。'] },
            { term: ['Markdown target preset'], description: ['Zenn・Hugo・Obsidian・plain Markdown など、書き出し先の設定をプリセットとして保存し使い回せる。エクスポートのたびに設定し直す必要がなくなった。'] },
            { term: ['Notion ZIP import'], description: ['Notion のエクスポート ZIP をそのまま読み込んで Markdown ファイルを取り込める。内部リンクと frontmatter は可能な範囲で保持される。'] },
            { term: ['Shift-JIS エクスポート opt-in'], description: ['Markdown / ZIP を Shift-JIS エンコーディングで書き出すオプションを追加した。Shift-JIS を期待するツールやスクリプトに渡すワークフローに対応する。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['エクスポートの一貫性を修正'], description: ['フォルダ・選択ノート・全ノートのいずれのエクスポートでも同じオプションが適用され、システムノートが正しく除外されるようになった。'] },
            { term: ['Portability キャッシュの分離を修正'], description: ['同一セッションで複数の target に対して portability チェックを実行したとき、キャッシュが混在する問題を修正した。'] },
            { term: ['コピー失敗時にエラートーストを表示'], description: ['クリップボードへの書き込みが失敗したとき、無音で成功扱いになっていた問題を修正した。エラートーストが表示される。'] },
            { term: ['サイドバーのオーバーレイ閉じるルートを統一'], description: ['Side Panel や narrow overlay でサイドバーを閉じると、ノート詳細パネルも同時に閉じるように修正した。'] },
            { term: ['ハイライト色をテーマ別に調整'], description: [{ code: '==ハイライト==' }, ' の背景色が4テーマそれぞれで適切に表示されるよう調整した。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.4',
      highlight: 'Web Clipper が、取り込みの入口になる。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.2.3 でメモ帳を「思考の場所」として深化させた。v2.2.4 はその入口——Web Clipper を中心に、「取り込む」体験を一段引き上げるバージョンだ。サイトから取得したメタデータを frontmatter に選んで追加でき、保存前にコンテンツの取り込み方を切り替えられ、Markdown に書き出すときに Obsidian で開いてそのまま読める。スクロールバーは使うときだけ現れ、エディタの静けさを邪魔しない。地味だが重要な修正もした——Git 同期で RSS が絡んだときにプッシュが止まるデッドロックが解消された。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['サイトのメタデータを frontmatter に選んで追加'], description: ['取得したページの著者名・公開日・カテゴリなどの情報が、ノート詳細のサイドパネルに一覧表示されるようになった。気に入った項目だけクリックすれば frontmatter に追加できる。既存の frontmatter は上書きされない。'] },
            { term: ['保存前にコンテンツの取り込み方を選択'], description: ['Clip のプレビュー画面で「本文のみ（記事抽出）」「ページ全体」「CSS セレクタ指定」の3択を切り替えられるようになった。切り替えるとその場でプレビューが更新されるので、保存前に仕上がりを確認できる。右クリックメニューは「Save page」のみに統一し、プレビューから全モードにアクセスできる。'] },
            { term: ['CSS セレクタで独自フィールドを取り込む'], description: ['CSS セレクタとキー名のペアを指定すると、サイト固有の情報（価格・著者・タグなど）をメタデータとして抽出できる。抽出された値は保存後にサイドパネルから frontmatter に追加できる。'] },
            { term: ['コピー後にノートを Trash へ移動'], description: ['コピーメニューに「コピー後に Trash へ移動」トグルを追加した。テンプレートとして使ったノートや、他のツールへ転送し終えたメモをその場で片付けられる。誤操作時は Undo トーストで元のフォルダに戻せる。'] },
            { term: ['保存先フォルダを指定して書き出す'], description: ['Markdown 単体 / ZIP エクスポートで、保存先フォルダをあらかじめ指定できるようになった（New Tab のみ）。最近使ったフォルダは最大5件まで履歴に残る。'] },
            { term: ['Obsidian で開いたときに改行が正しく表示される'], description: ['Markdown に書き出す際、改行の記法を Obsidian 互換の形式に自動変換するようになった。これまでバックスラッシュが文末に残って見えることがあった。'] },
            { term: ['ZIP 内のファイルに正しい日時が記録される'], description: ['ZIP エクスポートでファイルのタイムスタンプがノートの最終更新日時に揃うよう修正した。これまでエクスポートを実行した日時が入っていた。'] },
            { term: ['空のエディタにスラッシュコマンドの案内を表示'], description: ['新しいノートを開いたとき、「「/」でスラッシュコマンド」というヒントが先頭行に表示されるようになった。文章を書き始めると消える。'] },
            { term: ['ブロック操作ハンドルをホバー時のみ表示'], description: ['見出しを入力した直後に画面左端のハンドルが常時表示されていた問題を解消した。マウスをブロックに近づけたときだけ現れる。'] },
            { term: ['スクロールバーをスクロール中だけ表示'], description: ['エディタを操作していないときはスクロールバーが消え、画面が静かになった。スクロール中だけ細いバーが現れる。'] },
            { term: ['日時の表示がブラウザの言語設定に合う'], description: ['ノート詳細やコミット履歴などで表示される日時が、ブラウザに設定した言語（日本語 / 英語など）に合わせた形式で表示されるようになった。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['Git 同期で RSS が絡んだときにプッシュが止まる問題を修正'], description: ['RSS フィードと通常ノートが同時に変更された状態で同期すると、プッシュが完了せずに止まってしまうことがあった。このデッドロックを解消した。'] },
            { term: ['RSS 変更のみの場合も同期の競合メッセージが表示されるよう修正'], description: ['RSS の変更だけが残っている状態で競合が起きても、通知が画面に出ないことがあった。'] },
            { term: ['ノートにカーソルを合わせたとき正しいノートが表示されるよう修正'], description: ['ホバープレビューで意図しないノートが表示されることがあった。'] },
            { term: ['ホバーカードの表示・非表示タイミングを改善'], description: ['サイドパネル右エリアのホバーカードが意図しないタイミングで出入りすることがあった。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.3',
      highlight: 'ノートと読書が、つながった。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.2.2 で RSS を能動的にした。v2.2.3 は読書レイヤーと執筆レイヤーをつなぐバージョンだ。記事のタグがそのまま Inbox ノートに入り、スプレッドシートのデータが貼るだけでテーブルになり、今日の日記エントリが自動で開く。設定とスニペットも Git 経由で端末間を移動するようになった。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['RSSタグ管理'], description: ['記事を読みながらタグを追加・削除できる。タグをクリックするとInboxノートに付与され、複数タグのANDフィルタで記事を絞り込める。手入力でも追加でき、✕ボタンで外せる。'] },
            { term: ['CSVをそのままテーブルに'], description: ['スプレッドシートからコピーした内容を貼り付けると、すぐに編集できるMarkdownテーブルになる。列のリサイズやセル編集もすぐに行える。'] },
            { term: ['Twitter / Xスレッドの取り込み'], description: ['スレッドURLを貼ると、スレッド内容がMarkdownのブロック引用として取り込まれる。取得失敗時はURLがそのまま挿入される。'] },
            { term: ['BearメモのMarkdown変換'], description: ['Bearからコピーした内容を貼ると、見出しやハイライトがMarkdownとして正しく変換される。'] },
            { term: ['日記エントリーフロー'], description: ['サイドパネルを開くと今日の日付のノートが自動で選択される。未作成の場合はワンクリックで作成できる（設定でオフにできる）。'] },
            { term: ['日記テンプレート'], description: ['テンプレートギャラリーに「Journaling」カテゴリが追加。Five Minute Journal、Stoic Journal、Daily Reflection、CBT Thought Recordの4種類（日英対応）。'] },
            { term: ['設定とスニペットのGit同期'], description: ['テーマ、エディタ設定、カスタムスニペットがGit同期の対象になった。1台で変えれば他の端末にも反映される。'] },
            { term: ['段落ブロックリンクのコピー'], description: ['フローティングツールバーから「ブロックリンクをコピー」を選ぶと、その段落への直接リンク（', { code: '[[ノート名#^id]]' }, '）がクリップボードに入る。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['ウィキリンクが入力後すぐに表示されない問題'], description: [{ code: '[[ノート名]]' }, 'を入力した直後にリンクの装飾が反映されず、リロードが必要だったバグを修正。'] },
            { term: ['逐次入力での水平線挿入不具合'], description: [{ code: '-' }, 'を3回連続して入力しても水平線が挿入されなかった問題を修正。ペーストでは問題なかったが、キーボードからの入力が壊れていた。'] },
            { term: ['/now の日付ズレ修正'], description: ['タイムスタンプ見出しがUTC日付を使っていたため、日本時間などで深夜帯に前日の日付が入ることがあった。ローカル日付で挿入するよう修正。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.2',
      highlight: '読み続ける。気づかせる。整える。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.2.1 でウェブ購読とウィキリンクを追加した。v2.2.2 は RSS レイヤーを能動的にするバージョンだ。離れている間もフィードが更新され、新着が来たら知らせてくれ、既読状態がデバイスをまたいで引き継がれる。エディタにはスクラッチパッドと、ノート間のつながりを可視化する接続レイヤーが加わった。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['バックグラウンドRSS定期取得'], description: ['RSS設定で定期取得を有効にすると、設定した間隔でフィードがバックグラウンドで自動更新される。タブを開いたままにしなくていい。'] },
            { term: ['新着記事のデスクトップ通知'], description: ['RSS設定でオプトインすると、定期取得で新着記事が見つかったときにローカル通知でタイトル一覧を表示。通知内容はブラウザ内で生成され、外部には何も送らない。'] },
            { term: ['既読状態のデバイス間同期'], description: ['あるデバイスで読んだ記事が、同じChromeプロファイルの別デバイスでも既読として表示される。同期されるのは既読識別子のみ、本文はローカルのまま。'] },
            { term: ['RSS引用ツールバー'], description: ['記事プレビューでテキストを選択するとフローティングツールバーが現れる。ワンクリックで選択範囲を引用ノートとしてInboxへ送信（出典URLとタイムスタンプ付き）。'] },
            { term: ['RSSストレージ占有量の表示'], description: ['RSSモーダルのヘッダーに、フィードが使用しているローカルストレージの合計サイズを常時表示。ホバーで内訳を確認でき、保持期間設定の見直しに役立つ。'] },
            { term: ['RSSウェルカムパネル'], description: ['初めてRSS機能を使うユーザー向けに、フィード追加・通知設定・読み方フローをガイドするオンボーディングパネルを表示。'] },
            { term: ['スクラッチパッドワークスペース'], description: ['ノートリストとは別に、思考の粗削り・計算メモ・一時的なアウトラインを書くための常駐スクラッチパッドが追加された。'] },
            { term: ['ナレッジ接続レイヤー'], description: ['右パネルと目次にバックリンク数が表示される。接続レイヤーによりどのノートが参照し合っているかを、エディタを離れずに把握できる。'] },
            { term: ['エクスポートアクションプリセット'], description: ['よく使うエクスポート設定を名前付きプリセットとして保存。エクスポートメニューにプリセットが並び、ワンクリックで再利用できる。'] },
          ],
        },
        {
          title: '改善',
          items: [
            { term: ['死んだフィードのクリーンアップ提案'], description: ['フィードが連続して失敗すると、削除またはURL更新を促すプロンプトを表示。購読リストを手動でチェックしなくても健全に保てる。'] },
            { term: ['Mermaidレンダリングv2'], description: ['複雑なグラフや大きなチャートでの描画安定性を向上。構文が不完全なときのエラー回復も改善した。'] },
            { term: ['OPMLの堅牢化'], description: ['エッジケースなフィード構造・死んだフィード・重複エントリを含むOPMLのインポート/エクスポートを改善。'] },
            { term: ['保持期間の分割設定'], description: ['既読記事と未読記事の保持期間を個別に設定できるようになった。未読は長く、既読は短くといった運用が可能。'] },
          ],
        },
        {
          title: '高速化と堅牢化',
          items: [
            { term: ['RSS Conditional GET'], description: ['フィードリクエストに ', { code: 'If-None-Match' }, ' / ', { code: 'If-Modified-Since' }, ' ヘッダーを送信するようになった。更新のないフィードは 304 を返しパースをスキップ——通信量削減、取得サイクル高速化。'] },
            { term: ['サービスワーカーのアラーム信頼性向上'], description: ['バックグラウンドアラームがブラウザ再起動や拡張機能アップデートを経ても失われないよう、起動時に自動で再登録するようにした。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.1',
      highlight: '整える、広げる、速くする。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.2.0 で RSS の骨格を作った。v2.2.1 はその骨格に肉をつけ、使いながら感じていた小さな摩擦を一つひとつ取り除くバージョンだ。RSS のないサイトも購読できるようになった。Obsidian との往き来がよりスムーズになった。エディタのどこにいるかがわかるようになった。ノートの情報を右パネルから直接編集できるようになった。New Tab と Side Panel のインターフェースが統一された。起動が速くなった。YouTube の文字起こしが正確に取れるようになった。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['Web Subscription（RSS なしサイトの購読）'], description: ['Qiita や Zenn など RSS フィードを公開していないサイトを購読リストに追加し、記事一覧を取得できる。本文保存は明示的なクリップ操作のみ——自動で大量の本文を取り込まない設計。'] },
            { term: ['Obsidian Wikilink ＋ オートコンプリート'], description: [{ code: '[[タイトル]]' }, ' / ', { code: '[[タイトル|表示名]]' }, ' で書ける。', { code: '[[' }, ' と入力するとファジー検索のオートコンプリートポップオーバーが開き、矢印/Enter/Tab で確定、Esc でキャンセル。resolved は緑、unresolved は赤、ambiguous は黄色で表示。Ctrl+Click でリンク先ノートに移動。'] },
            { term: ['バックリンクパネル'], description: ['現在のノートへの被リンク（', { code: '[[links]]' }, '）が目次下部と右パネルに表示される。クリックまたは Enter でリンク元ノートへジャンプ。バックリンクが 0 件のときは非表示。'] },
            { term: ['RSS Allow-Keywords（Google アラート風）'], description: ['フィードごとにキーワードフィルターを設定し、title・URL・RSS description に一致する記事だけを通す。フィード行のチップエディター、Any / All 切り替え、入力候補サジェスト機能付き。'] },
            { term: ['Obsidian / Logseq エクスポートプリセット'], description: ['Obsidian の Properties 形式と Logseq の ', { code: '::' }, ' 記法に対応したプリセットを追加。既存の CommonMark / GFM / Hugo / Obsidian コピーと合わせて使える。'] },
            { term: ['カスタムエクスポートプリセット UI'], description: ['カスタムプリセットの作成・編集・削除・組み込み複製を UI から管理できる。右パネルと Markdown export メニューから導線を追加。'] },
            { term: ['行番号ジャンプ（Command Palette）'], description: ['コマンドパレットから「指定行へ移動」で任意の行に一発でカーソルを飛ばせる。3,000 行のドキュメントでも目的の場所に素早くたどり着ける。'] },
            { term: ['目次スクロール進捗とキーボードジャンプ'], description: ['目次に読み進めた割合（パーセンテージ）を表示。目次を開いた状態でキーボードの数字キー（1–9）を押すと、その番号の見出しに直接ジャンプできる。'] },
            { term: ['右パネル ノート詳細と frontmatter 編集'], description: ['ノート一覧でノート名にカーソルを合わせると、作成日時・更新日時・サイズ・Git 状態・frontmatter の中身が右パネルに表示される。右クリックで frontmatter 編集、フィールドのドラッグで並び替え、tags の追加・削除も右パネルから直接できる。Archive のノートは読み取り専用。'] },
            { term: ['記事への自動タグ付け（オプション）'], description: ['RSS クリップ後に title / URL / フィード名からタグを自動生成する。設定でオフにできる。'] },
          ],
        },
        {
          title: '改善',
          items: [
            { term: ['引用ノートのフォーマット統一'], description: ['Save Selection と RSS Quote Selection の出力形式を統一した。どの経路で保存しても frontmatter（保存元 URL・日時）+ blockquote + 出典リンク + フッター免責文の形になる。'] },
            { term: ['New Tab / Side Panel のインターフェース統一'], description: ['ヘッダーのボタン配置、検索プレビューの表示可否、ノート詳細の開き方を「画面の広さ」と「その画面で何ができるか」に基づいて整理し直した。細かなズレを解消。'] },
            { term: ['RSS 権限不足のお知らせ改善'], description: ['権限が必要なフィードがある場合に、取得ボタンのトースト通知と拡張機能アイコンバッジで件数を表示するようにした。'] },
            { term: ['大容量ドキュメントの機能制限を緩和'], description: ['コードブロック入力支援・数式の無効化境界を 50KB → 100KB に、スラッシュメニュー・ドラッグハンドルを 100KB → 150KB に引き上げた。'] },
          ],
        },
        {
          title: '高速化と修正',
          items: [
            { term: ['起動が v2.2.0 より速くなった'], description: ['v2.2.0 で RSS 機能を追加したとき起動時に読み込まれるようになっていたコード（最大 +21%）を、起動後の空き時間に遅延読み込みするよう変更した。全 13 シナリオで v2.2.0 より高速化。'] },
            { term: ['YouTube 文字起こし取得の失敗を修正'], description: ['CC（字幕）ボタンを文字起こしボタンと誤検出していた問題を修正。正しいボタンを優先的に探すよう改善した。'] },
            { term: ['ダークテーマの静的プレビュー表示を修正'], description: ['dark / parchment / candlelight のノートプレビューで色が適用されない箇所を修正した。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.2.0',
      highlight: '読む、残す、運ぶ。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.1.9 は貼る瞬間と探す瞬間を整えた。v2.2.0 はそこから一歩進めて、日々流れてくる情報を読み、必要な部分だけをノートに残し、別の場所へ持ち出すためのバージョンだ。RSS が入口になり、Web Clipper の守備範囲が広がり、コピーやエクスポートで構造が壊れにくくなった。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['RSS Reader'], description: ['Mark It Down の中でフィードを読み、', { code: 'j' }, '/', { code: 'k' }, ' で移動、', { code: 'Enter' }, ' で開き、必要な記事だけ Inbox に Markdown として保存できる。'] },
            { term: ['OPML インポート / エクスポート'], description: ['Feedly、Inoreader、NetNewsWire などの購読リストを OPML 2.0 で移行できる。'] },
            { term: ['RSS Git同期'], description: ['RSS feeds と denylist 設定を端末間で同期。名前変更、削除、重複したフィードは専用の conflict resolution UI で解決できる。'] },
            { term: ['CommonMark / GFM / Hugo / Obsidian 向けコピー'], description: ['公開先の Markdown 方言に合わせてからコピーできるので、持ち出した後の手直しを減らせる。'] },
            { term: ['サイドバープレビューと振り分け'], description: ['ホバーカード、プレビューパネル、I/A/T/M ショートカットで、ノートを開く前に確認して Inbox / Archive / Trash / Template へ素早く移動できる。'] },
          ],
        },
        {
          title: 'Web Clipper改善',
          items: [
            { term: ['YouTube字幕'], description: ['利用できる字幕をタイムスタンプ付き Markdown リンクとして保存できる。'] },
            { term: ['コメントとスレッド'], description: ['Reddit と Hacker News の会話構造、著者、文脈をより確実に Markdown として残せる。'] },
            { term: ['対応サイトの拡大'], description: ['LinkedIn、Bluesky、Threads、Medium、Discourse に専用の抽出経路を追加し、汎用変換よりきれいに取り込める。'] },
            { term: ['RSSクリップの脚注'], description: ['Hatena Blog の脚注を RSS clip 時に Markdown footnote へ変換する。'] },
          ],
        },
        {
          title: 'ポータビリティと修正',
          items: [
            { term: ['テーブル列幅のエクスポート反映'], description: ['列幅を Markdown attr-list として保持し、HTML / PDF / DOCX export に反映する。'] },
            { term: ['Pin / Star の frontmatter round-trip'], description: ['ピン留めやスター状態を export/import の境界で失いにくくした。'] },
            { term: ['RSSの安定性'], description: ['RSS clip 後に editor が空表示になる問題、Viewer のキーボード競合、sync 後の permission drift を修正。'] },
            { term: ['脚注と編集体験の細部'], description: ['テーブル内脚注参照、複数段落の脚注 popover、コードブロック行番号トグル、hard block 前後の Ctrl+Enter 挿入を整えた。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.9',
      highlight: '貼る、探す、戻る。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.1.8 で「日本語の見え方」と「目次の動き」を整えた。v2.1.9 は、ノートに情報を入れる瞬間と、ノート間を動き回る瞬間に向き合ったバージョンだ。Smart Paste の守備範囲を広げ（LaTeX 環境、通常 Ctrl+V での JSON、HTML 書式タグ）、検索にはプレビュー、ノート間移動には履歴を加えた。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['ノート履歴ナビゲーション'], description: ['Alt+← / Alt+→ で直前に見ていたノートを行き来。ブラウザの戻る／進むと同じ感覚。次に移動するノートのタイトルがツールチップで出る。'] },
            { term: ['検索 2 カラムプレビュー'], description: ['左にヒット一覧、右にノート本文プレビュー。キーワードがインラインでハイライトされ、開く前に中身を確かめられる。矢印キーで移動、Enter で開く。Side Panel は従来通り 1 カラム。'] },
            { term: ['LaTeX 環境形式のペースト'], description: [{ code: '\\begin{equation|align|aligned|gather|cases}' }, ' が自動で ', { code: '$$...$$' }, ' に変換され数式レンダリング。Markdown を含まない純粋な LaTeX も通常 Ctrl+V で変換されるように。'] },
            { term: ['JSON 通常 Ctrl+V 対応'], description: ['JSON → Markdown 変換が通常ペーストでも動作。配列はテーブル、オブジェクトは Key-Value リストに。3 階層以上の深ネストは ', { code: '```json' }, ' フェンスブロックにフォールバック。'] },
            { term: ['HTML 書式タグの Markdown 変換'], description: [{ code: '<strong>' }, '/', { code: '<b>' }, '/', { code: '<em>' }, '/', { code: '<i>' }, '/', { code: '<code>' }, ' を除去せず ', { code: '**' }, '/', { code: '*' }, '/', { code: '`' }, ' に変換。Web や AI 出力の書式情報が失われなくなった。'] },
            { term: ['ハンクレベルのコンフリクト解決'], description: ['ConflictResolutionModal で ', { code: 'j' }, '/', { code: 'k' }, ' によるハンク移動、', { code: 'Shift+←' }, '/', { code: 'Shift+→' }, ' でフォーカス中のハンクを cherry-pick（ローカル／リモート採用）。'] },
          ],
        },
        {
          title: '改善',
          items: [
            { term: ['Web Clipper Adaptive Engine'], description: ['既定の Readability + toMd 抽出スコアが閾値未満のとき Defuddle + toMd に自動フォールバック。Adaptive 平均スコア 99+ を維持。'] },
            { term: ['コードブロック内ペーストの保護'], description: ['Smart Table / JSON / LaTeX 変換はコードブロック内ではスキップし CodeMirror ネイティブペーストに委譲。コードはコードのまま貼れる。'] },
            { term: ['Open in Editor の統一'], description: ['ConflictResolutionModal のドロップダウンを 1 ボタンに集約。ローカル = New Tab（編集可）、リモート = Side Panel（参照用）で固定。'] },
            { term: ['Smart Typography パフォーマンス改善'], description: ['入力イベント毎の ', { code: 'state.doc.resolve(from)' }, ' 呼び出しを 2 回から 1 回に。全祖先チェックをインラインループに畳み込み。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['ペーストのダブル処理'], description: ['Crepe 内部ハンドラに先行消費される問題を capture-phase window listener への昇格で解消。'] },
            { term: ['math block が placeholder のまま表示'], description: [{ code: '```math' }, ' フェンス変換後に converted 文字列で再判定して CodeMirror init をスケジュールする形に修正。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.8',
      highlight: '日本語を、もっと美しく。操作を、もっと気持ちよく。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.1.7で操作の確かさを磨いた。v2.1.8は、日本語テキストの表示品質と、細部の使い心地を仕上げるバージョンだ。目次パネルの全面刷新、なめらかなフォーカスモード、そして起動時間のほぼ半減。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['矢印・em-dash 自動変換'], description: [{ code: '->' }, ' で ', { code: '→' }, '、', { code: '--' }, ' で ', { code: '—' }, ' に変換。コードブロック内は変換されない。'] },
            { term: ['Mermaid セマンティックカラー'], description: [{ code: ':::frontend' }, '、', { code: ':::backend' }, '、', { code: ':::database' }, ' などのクラス名でテーマに合わせた色が自動付与。'] },
            { term: ['テーブルセル編集バッジ'], description: ['入力を開始したセルに「Editing」バッジが表示。列数の多いテーブルで現在位置が一目でわかる。'] },
            { term: ['タグ入力 Tab ナビゲーション'], description: ['Tab で Key → Value → 次の行へ移動。マウスに触れずにタグをまとめて入力できる。'] },
          ],
        },
        {
          title: '改善',
          items: [
            { term: ['目次パネル全面刷新'], description: ['ナビゲーションボタンを常に表示。位置カウンター（「3/12」など）をクリックして任意の見出しに直接ジャンプ。Notes サイドバーとスタイル統一。'] },
            { term: ['固定表示インジケーター'], description: ['Notes / TOC パネルを固定しているとき、ボタンがピン留めアイコンに切り替わる。クリックせずに確認できる。'] },
            { term: ['設定ボタン統合'], description: ['外観設定とモード設定を 1 ボタンに統合。ヘッダーがすっきり。'] },
            { term: ['フォーカスモードアニメーション'], description: ['ヘッダーとツールバーが上方向にスライドしながらフェードアウト。サイドバーの動きと統一。'] },
            { term: ['日本語テキスト表示改善'], description: ['禁則処理・見出しの字間・フォント表示を改善。Windows の Academic テーマでシステムフォントを正しく利用。'] },
            { term: ['起動速度'], description: ['並列初期化で起動時間約 45% 短縮（189ms → 104ms）。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['目次ナビゲーションハイライト'], description: ['ナビゲーションボタン使用後にハイライトが意図しない見出しに飛ぶバグを修正。'] },
            { term: ['フォーカスモードプログレスバー'], description: ['フォーカスモード中にプログレスバーが消える問題を修正。'] },
            { term: ['テーブルセルのカーソル'], description: ['一部テーマでカーソルが見えにくかった問題を修正。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.7',
      highlight: '操作が、手に馴染む。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.1.6で起動を速くした。v2.1.7は操作の「確かさ」を磨く — テーブル編集がキーボードで完結し、削除には意思を求め、クリップは中身を確認してから保存する。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['テーブルキーボードナビゲーション'], description: ['Enterで下のセルへ移動、Tabで右へ、Alt+Enterでセル内改行。セルをクリックしてEnterを押すだけで入力開始。最終行でEnterを押すとテーブルの外へ。'] },
            { term: ['長押し削除'], description: ['Trashからの完全削除は長押しで意思確認。途中で離せばキャンセル。うっかり削除を防ぐ設計。'] },
            { term: ['Web Clipperプレビュー'], description: ['クリップ前にセクションをプレビューして選択。広告やナビゲーションなど不要な要素を除外して保存できる。'] },
            { term: ['エクスポートプリセット'], description: ['MarkdownエクスポートにYAML・TOML・JSONフロントマターを自動付加。タイトル・日付・タグを一度設定すれば毎回の手入力が不要に。'] },
          ],
        },
        {
          title: '改善',
          items: [
            { term: ['起動速度の最適化'], description: ['ダウンロードサイズ 136KB→129KB（−5%）。継続的な最適化でアプリがさらに軽く。'] },
            { term: ['テーブルツールバー'], description: ['行操作ボタンの順序をスプレッドシートの慣例に合わせて見直し。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['ネストリスト内の引用ブロック'], description: ['ネストしたリスト内のblockquoteが崩れる問題を修正。'] },
            { term: ['スラッシュコマンド'], description: ['エディタ再表示後に', { code: '/' }, 'コマンドが反応しなくなる問題を修正。'] },
            { term: ['Web Clipperセッション'], description: ['クリップ保存時にセッション情報が壊れることがあった問題を修正。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.6',
      highlight: '速く、滑らかに。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.1.5で土台を作り直した。v2.1.6はその仕上げ — 起動を速く、ペーストを賢く、UIは邪魔にならないように。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['Web Clipper CSSセレクター指定'], description: ['ドロップダウンでページセクション（', { code: 'main' }, '、', { code: 'article' }, '、', { code: '#content' }, '）を選んでクリップ。長いページから必要な部分だけを正確に取り込める。'] },
            { term: ['自動非表示UI'], description: ['執筆中はヘッダーとツールバーが自動で非表示に。スクロールすると消え、マウスを上端に近づけると再表示。画面を広く使って書くことに集中できる。'] },
            { term: ['Git同期ステータスインジケーター'], description: ['サイドバー下部にリアルタイム同期状態を表示 — 同期中・完了・オフライン・エラーがひと目でわかる。'] },
          ],
        },
        {
          title: '改善',
          items: [
            { term: ['起動速度の最適化'], description: ['ダウンロードサイズ 143KB→136KB（−5%）。大きなノート（100KB以上）の表示が最大29%高速化。'] },
            { term: ['AIペースト：テーブル+コードブロック'], description: ['Claude、ChatGPTなどのAI出力をペーストした際、テーブルセル内のコードブロックが自動整形されるように。'] },
            { term: ['AI残留HTMLタグの自動除去'], description: ['AI出力に紛れ込む不要なHTMLタグをペースト時に自動除去。'] },
            { term: ['サイドバーDetail Panel'], description: ['プレビュー・情報・Frontmatterの3タブに統合。最後に開いていたタブを記憶。'] },
            { term: ['サイドバー描画パフォーマンス'], description: ['DOM更新を最適化し、サイドバーリストの描画が高速化。'] },
            { term: ['アニメーション改善'], description: ['ドロワーの開閉、ツールチップの表示、ホバー時の反応が自然で滑らかに。'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['コールアウト+リスト混在表示'], description: ['コールアウトとリストを併用した際の表示崩れを修正。'] },
          ],
        },
        {
          title: '変更',
          items: [
            { term: ['アーカイブ移動メッセージ'], description: ['ノートをアーカイブに移動する際のメッセージ文言を改善。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.5',
      highlight: '書いたものを、どこへでも。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'Markdownには方言がある。Zennで書いた記法はHugoでは動かない。Slackからコピーしたテキストはアスタリスクがそのまま残る。v2.1.5はその問題を解決する。主要プラットフォームへの記法変換、チャットアプリからのスマートペーストに対応し、サイドバーも全面再設計した。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['Portability Hub'], description: ['CommonMark・Obsidian・Hugo・Jekyll・GFM・Zenn・Qiita・Docusaurus・MkDocs の8ターゲットに対応する記法変換。バッチエクスポート時に非標準記法が含まれる場合は「そのまま / 全正規化 / 1件ずつ確認」の3択で対処できる。'] },
            { term: ['Chat Format Smart Paste'], description: ['Slack・Discord・WhatsApp からのペーストで、固有記法（', { code: '<url|テキスト>' }, '、', { code: '||スポイラー||' }, '、', { code: '>>>' }, ' 引用など）を標準 Markdown に自動変換。'] },
            { term: ['EPUBエクスポート'], description: ['Mermaid図・数式・コードハイライトを含む EPUB 3.0 形式で出力。単一ノートとバッチ出力に対応。'] },
            { term: ['LaTeXエクスポート'], description: ['Markdown を LaTeX に変換して ', { code: '.tex' }, ' ファイルとして出力。学術文書・論文の下書きに。'] },
            { term: ['Frontmatter対応'], description: ['ノートのメタデータ（タイトル・タグ・日付など）を本文と分離して管理。Detail Panel の「Frontmatter」タブで編集し、エクスポート時に自動合成される。'] },
            { term: ['サイドバー全面再設計'], description: ['NoteItem をタイトルのみの表示にシンプル化。Previewボタンで Detail Panel（Preview・Frontmatter・Info の3タブ）を開く。ピン留めノートは「★ Pinned」エリアに表示。Remote Sidebar でリモートリポジトリのノートを直接閲覧・取り込み可能。'] },
            { term: ['Web Clipper強化'], description: ['YouTube字幕をタイムスタンプ付き Markdown として取り込み。Shadow DOM・同一サイト iframe のコンテンツも取り込み対応。Zenn・Qiita・はてなブログの専用抽出ロジックを追加。'] },
            { term: ['Writer Modeタイポグラフィプリセット'], description: ['フォントサイズ18px・行間1.8・最大幅720px中央揃えの長文執筆向けレイアウト。スラッシュメニューから切替可能。'] },
            { term: ['見出し自動番号付け'], description: ['H2〜H6 に CSS カウンターで自動連番を付ける。スラッシュメニュー ', { code: '/num' }, ' でオン/オフを切替。'] },
            { term: ['数学ブロック内LaTeXコマンド補完'], description: ['数式ブロック内で ', { code: '\\' }, ' を入力すると108種類のコマンド候補を表示。ギリシャ文字・演算子・矢印など。'] },
            { term: ['TOC強化'], description: ['子見出しを持つ見出しに折りたたみボタンを追加。TOC下部に「先頭・末尾・前後見出し・ページアップ/ダウン」の6ナビゲーションボタンを設置。'] },
            { term: ['全ノート横断 Find & Replace'], description: [{ code: 'Ctrl+Shift+H' }, ' で全ノートを横断して検索・置換。フォルダフィルターチップ、「3 / 17」形式の現在位置表示、', { code: 'Ctrl+F' }, ' で検索専用モードを追加。'] },
          ],
        },
        {
          title: '変更',
          items: [
            { term: ['フォントをsystem-uiに変更'], description: ['本文フォントを Inter から OS 標準のフォントスタック（system-ui）に変更。日本語・CJK 文字の表示が改善される。'] },
          ],
        },
        {
          title: '削除',
          items: [
            { term: ['Source Control サイドバータブを廃止'], description: ['Git 操作は画面上部の Git メニューに一本化。サイドバーの最小幅が 256px になりすっきりした。'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.4',
      highlight: 'はじめて使う人が、迷わない一歩目を。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'New Tabを上書きする拡張機能のインストールは、何が起きるかわからず不安になる。このリリースは、最初の30秒を明確にする。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['インストール直後にウェルカムページを表示'], description: ['インストール完了と同時に専用ページが開き、セットアップの確認、Chromeダイアログの説明、3つの使い方の紹介、データの安全性について案内する'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.3',
      highlight: '欲しいところだけ、賢くクリップ。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'Web Clipperは、信頼できて初めて使えるツールになる。今回はその信頼性に集中した。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['選択範囲をLLM用にコピー'], description: ['テキストを選択して「Copy for LLM」を実行すると、選択部分だけがタイトル・出典情報付きでコピーされる'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['GitHub Issue・PRのコメント取得を修正'], description: ['GitHubがReactベースに移行した影響でコメントが取り込めなくなっていた問題を修正。新旧両方のDOM構造に対応'] },
            { term: ['ツールチップの位置ずれを修正'], description: ['CSS Anchor PositioningからJS配置に戻し、ネストしたツールバーでも正確に表示されるよう修正'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.2',
      highlight: '大きなファイルも、固まらない。',
      status: 'リリース済',
      statusClass: 'released',
      theme: '今回の更新は「大きなノートでも止まらず書けること」に集中した。',
      sections: [
        {
          title: 'ハイライト',
          items: [
            { term: ['大きなノートが固まりにくくなった'], description: ['Archive表示の体感速度を改善し、切り替え時もスムーズに'] },
            { term: ['ノート切り替えが速くなった'], description: ['一度開いたArchiveノートは再表示が軽く、往復作業がしやすい'] },
            { term: ['ブロック操作UIを整理'], description: ['ツールバーを本文外に出し、内容が見やすい配置に改善'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['GitHub/GitLabのWeb Clipper修正'], description: ['プラットフォーム説明ではなく、ページ本文を正しく取得'] },
            { term: ['Git競合フローの改善'], description: ['競合解決後もコミットメッセージが保持され、入力欄も見切れないよう修正'] },
            { term: ['コード言語セレクタの枠線修正'], description: ['フォーカス時の枠線表示を全テーマで統一'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.1',
      highlight: '軽く、速く、まとめて。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.1.0でエディタの使える範囲を広げた。v2.1.1では、アプリ全体をもう一段軽くした。起動が速くなるのは不要なものを削ったから。操作が一貫しているのは細部を統一したから。ノートを分けてまとめられるのは、長いノートをどう扱うかをずっと考えていたから。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['アプリが20%軽くなった'], description: ['コードハイライトを192言語フルセットから34言語のカスタム構成に絞り込み、読み込みサイズを約193KB削減。Markdown、JavaScript、Python、HTML、SQLなどよく使う言語はすべてカバー'] },
            { term: ['長いノートを見出しで分割'], description: ['見出し単位でノートを2つに分割。キーワード絞り込み、見出しレベルフィルタ、分割後サイズプレビュー付き。元ノートはゴミ箱に移動し、自動で名前が付く'] },
            { term: ['複数ノートを1つに結合'], description: ['Ctrl+クリックで選択した複数ノートを結合。ドラッグで並び替え、タイトル編集、結合後サイズを確認してから確定'] },
            { term: ['リッチツールチップ'], description: ['すべてのボタンに独自ツールチップを表示。キーボードショートカット付き。サイドバー、ツールバー、モーダル内の約40箇所を統一'] },
            { term: ['ノート情報のホバー表示'], description: ['サイドバーでノート名にホバーするとファイルサイズと更新日時を表示。大きなノートはカラードットで警告'] },
            { term: ['Mermaidダイアグラムの配色統一'], description: ['フロー図やシーケンス図の色をアプリのニュートラルなカラーシステムに統一。4テーマすべてで一貫した見た目に'] },
            { term: ['Git競合「両方を結合」にドラッグ並び替え'], description: ['リモートとローカルがぶつかったとき、結合モーダルでドラッグ並び替えしてから確定。結合後はInboxに、元の2ノートはゴミ箱に'] },
            { term: ['タイトル重複をRenameで解消'], description: ['GitプルやSplit・Mergeで重複タイトルが発生した場合、「Rename」で新しい名前を入力。リアルタイム重複チェック付き'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['数式の貼り付けが正しくなかった'], description: ['$...$形式のインライン数式を含むMarkdownの貼り付けで数式として認識されない問題を修正。Smart Pasteの変換ロジックに数式パターン検出を追加'] },
            { term: ['Gitプルでシステムノートが上書きされた'], description: ['Getting StartedやMarkdown Referenceがリモートからのプルで上書きされる可能性があった。プッシュ側と対称的な除外処理を追加して修正'] },
          ],
        },
      ],
    },
    {
      version: 'v2.1.0',
      highlight: 'エディタは広く、クリッパーは正確に。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.0.8で「速く開く」、v2.0.9で「フリーズしない」を実現。v2.1.0では、エディタで使える機能の範囲を広げ、Web Clipperが取りこぼしていたものを修正。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['テンプレートギャラリーリンク'], description: ['Templateフォルダのヘッダーにホバーすると、20種類以上のテンプレートを閲覧できる外部ギャラリーページへのリンクが表示'] },
            { term: ['目次の自動生成'], description: ['/tocまたはコマンドパレットで、見出しからカーソル位置にTOCを自動生成'] },
            { term: ['スラッシュメニュー100KB対応'], description: ['スラッシュメニューとドラッグハンドルの対応上限を50KBから100KBに引き上げ'] },
            { term: ['引用ブロックのホバー削除'], description: ['アラート・テーブル・脚注と同様、ホバー時のゴミ箱アイコンで引用ブロックを削除'] },
            { term: ['JSON → Markdownペースト'], description: ['Ctrl+Shift+VでJSONを自動変換 — 配列はテーブル、オブジェクトはリスト、ネスト構造は箇条書きに'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['Web Clipper見出し消失'], description: ['特定サイトでH2以降の見出しが消える問題を修正。前処理で見出し要素を保持するよう改善'] },
            { term: ['Web Clipper Mermaid消失'], description: ['クリップ時にMermaid図（SVG）が消える問題を修正。3段階のソース復元を実装'] },
            { term: ['選択ツールバーの画面外表示'], description: ['100KB超ドキュメントでツールバーボタンが画面外に描画される問題を修正'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.9',
      highlight: 'フリーズしない。それだけのバージョン。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'v2.0.8でEditorの大容量ファイル対応を完了。v2.0.9ではArchiveとドラッグ&ドロップのフリーズを修正。',
      sections: [
        {
          title: 'バグ修正',
          items: [
            { term: ['Archiveで大容量ファイルを開くとフリーズ'], description: ['200KB超のMarkdownをArchiveで開いてもブラウザが固まらなくなった。読み取り専用ビューアにProgressive Renderingを適用'] },
            { term: ['ドラッグ&ドロップでUIがフリーズ'], description: ['ノートをフォルダ間でドラッグ移動してもUIが固まらなくなった'] },
            { term: ['複数ノート一括操作の効率化'], description: ['複数ノートの移動・削除がノートごとではなく1回のStorage書き込みで完了するようになった'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.8',
      highlight: '大きなファイルでも、指は止まらない。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'Progressive Crepe Initializationで最初の5KBだけでエディタを即座に起動。残りはバックグラウンドで流し込む。100KBで19.8倍高速。Toast、チェックボックス、選択ツールバーの触り心地も一新。',
      sections: [
        {
          title: 'ハイライト',
          items: [
            { term: ['エディタ段階的読み込み'], description: ['最初の5KBでエディタ起動、残りをrequestIdleCallbackでバックグラウンド読み込み。50KB: 271ms（5.7倍）、100KB: 263ms（19.8倍）、200KB: 519ms（36.6倍高速）'] },
            { term: ['Toast通知リデザイン'], description: ['複数Toastが奥行き効果で積み重なる。ホバーでタイマー停止。プログレスバーで残り時間表示。大きな角丸、テーマ対応ボタン'] },
            { term: ['チェックボックスのマイクロインタラクション'], description: ['スプリングアニメーション、完了テキストのフェード、ホバーヒント。prefers-reduced-motion対応'] },
          ],
        },
        {
          title: '新機能',
          items: [
            { term: ['選択ツールバー刷新'], description: ['Glassmorphism風blur 12pxの半透明背景、28x28正方形ボタン、カスタムツールチップ。L2ツールはL1上に配置。見出しドロップダウンは上方向展開。全4テーマ対応'] },
            { term: ['HelpModal再編'], description: ['4タブ→3タブ（Settings / Guide / About）。GuideにSlash Commands・Selection Toolbar・Command Paletteセクション新設。アコーディオン形式'] },
            { term: ['脚注の複数参照バックリンク'], description: ['同一脚注の複数参照から、クリックした参照元に正確に戻れるようになった'] },
            { term: ['タイムスタンプ見出し'], description: ['/nowで現在時刻をH2/H3見出しとして挿入。Ctrl+Alt+;でインラインHH:MM挿入。TOCと組み合わせてタイムライン表示'] },
            { term: ['HTML → Markdownペースト'], description: ['Ctrl+Shift+VでクリップボードのHTMLをMarkdownに変換。3つのペーストモード（markdown/プレーンテキスト/通常）を設定で選択'] },
            { term: ['Markdownとしてコピー'], description: ['L1選択ツールバーに新ボタン。選択範囲のMarkdownをコピー、Toastにトークン数概算を表示'] },
            { term: ['LLMコピー正規化パイプライン'], description: ['3段階: 見出し階層の正規化、コードブロック言語自動付与（13言語）、過剰空行の圧縮'] },
            { term: ['スペルチェック制御'], description: ['auto（50KB超で自動無効）/ always / never。日本語で書く場合はneverで赤波線を非表示に'] },
            { term: ['コードブロック言語自動検出'], description: ['16言語対応。shebang・DOCTYPE・キーワードパターンで判定。LLMコピー正規化と連携'] },
          ],
        },
        {
          title: 'パフォーマンス',
          items: [
            { term: ['コンポーネント遅延読み込み'], description: ['13コンポーネント（Editorモーダル含む）をオンデマンド読み込み。app.jsが836KB→729KB（-13%）'] },
            { term: ['表示方式の修正'], description: ['ノートリスト表示時のEditorをdisplay:noneからvisibility:hiddenに変更。Progressive Loadingキューのキャンセルを防止'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['背景テクスチャのアトミック保存'], description: ['テクスチャ画像データとフラグをsetStorageMulti()で一括保存。ブラウザクラッシュ時の不完全状態を防止'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.7',
      highlight: '大きなファイルも速く。Clipperも賢く。',
      status: 'リリース済',
      statusClass: 'released',
      theme: '閾値を設定すると、大きなノートが自動的にArchiveの読み取り専用ビューで開く。Unlockして編集に切り替えるときも、最初からエディタで開くよりスムーズに始められる。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['大容量ノート自動アーカイブ'], description: ['設定で閾値（100/200/300KB）を指定。超過ノートを自動的に読み取り専用Archiveで表示。Unlockでいつでも編集再開'] },
            { term: ['LLM向けコピー'], description: ['YAML frontmatter（title/source/date）を自動付与してコピー。Web Clipメタデータも自動含有。コマンドパレットからも操作可能'] },
            { term: ['コピー/エクスポート時にトークン数表示'], description: ['Toast通知に推定トークン数を表示（例: 「Copied! (~1,234 tokens)」）。Latin約4文字/token、CJK約1.5文字/token'] },
            { term: ['llms.txt自動検出'], description: ['Web Clipperがクリップ時に/llms-full.txt・/llms.txtを自動検出。24時間キャッシュ、5秒タイムアウト、500KB上限'] },
            { term: ['コードハイライト段階的適用'], description: ['30個超のコードブロックでビューポート内を優先ハイライト。残りをidle時にバッチ処理。226ブロックで8秒→1.1秒'] },
          ],
        },
        {
          title: 'Web Clipper改善',
          items: [
            { term: ['品質ベンチマーク'], description: ['19サイト・35フィクスチャで8次元スコアリング。Adaptiveパイプライン（Readability→Defuddle自動切替）で平均99'] },
            { term: ['見出し保護'], description: ['Readability抽出でh2-h6が失われなくなった。Substackスコア: 77→98'] },
            { term: ['Adaptiveフォールバック'], description: ['heading ratioが低い場合のみDefuddleに自動切替。通常ケースへの追加コストゼロ'] },
            { term: ['遅延読み込み画像の抽出改善'], description: ['data-src・data-original・data-lazy-src属性とsrcsetを確実にキャプチャ'] },
            { term: ['ノイズ除去拡充'], description: ['30→41セレクタ。GitHub・Reddit固有のノイズ要素を除去'] },
            { term: ['動的フェンス'], description: ['コード内にバッククォートがある場合、フェンス長を自動調整。構文が壊れなくなった'] },
          ],
        },
        {
          title: 'UI改善',
          items: [
            { term: ['コードブロック言語セレクタ'], description: ['全4テーマで背景色・ボーダー・ホバー/選択状態の視認性を改善。z-index/containment問題を修正'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['脚注のクリッピング'], description: ['上付き文字の脚注参照が段落上端で切れなくなった'] },
            { term: [{ code: 'x.com' }, 'のCallout'], description: ['Grokの[!NOTE]/[!WARNING]等のCalloutが', { code: 'x.com' }, 'からのクリップで保持されるようになった'] },
            { term: ['サイドバーのちらつき'], description: ['エディタ入力時の3つの不要再レンダリング経路を修正: setImmediateContentのバッチ化、useEffect依存配列修正、Zustandセレクタ分離'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.6',
      highlight: '見た目も、中身も、整えた。',
      status: 'リリース済',
      statusClass: 'released',
      theme: '新しいワークフローはない。使い心地の改善だ。ツールチップにショートカット表示、ソート操作の直感化、読み込み表示、テーマの抜けを全て補完。',
      sections: [
        {
          title: 'UI改善',
          items: [
            { term: ['読み込み表示'], description: ['大きな文書を開いたとき、まだ読み込み中であることがアニメーションで分かるようになった'] },
            { term: ['ショートカット付きツールチップ'], description: ['ボタンにカーソルを合わせると、操作説明とキーボードショートカットが表示される'] },
            { term: ['トースト通知'], description: ['アイコン・スライドアニメーション付きにリデザイン。ESCキーで閉じられる'] },
            { term: ['ソート操作'], description: ['名前/更新日の2セグメントに変更。もう一度クリックで昇順・降順を切り替え'] },
            { term: ['空フォルダガイド'], description: ['Template・Archive・Trashが空のとき、そのフォルダの使い方を表示'] },
            { term: ['コマンドパレットでノート検索'], description: [{ code: 'Ctrl+Shift+P' }, 'からノート名で検索して直接開ける'] },
          ],
        },
        {
          title: 'テーマ & デザイン',
          items: [
            { term: ['テーマ統一'], description: ['全4テーマで抜けていた187件の色定義を補完。ParchmentとCandleLightが完全カバーに'] },
            { term: ['すりガラスUI'], description: ['ツールバー・トースト・パネルにすりガラス効果を適用し、奥行きのある見た目に'] },
            { term: ['ストレージ表示'], description: ['プログレスバーを廃止。フォルダごとのノート数がひと目で分かる表示に変更'] },
          ],
        },
        {
          title: 'パフォーマンス',
          items: [
            { term: ['数式フォント軽量化'], description: ['KaTeXフォントを876KB削減。数式を多用するノートの表示が速くなった'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['サイドバーのドラッグ'], description: ['フォルダ間でノートをドラッグ中にちらつく問題を修正'] },
            { term: ['Side Panelアイコン'], description: ['Side Panel表示でアイコンが潰れる問題を修正'] },
            { term: ['目次の閉じ動作'], description: ['目次が意図せず閉じてしまう問題を修正'] },
            { term: ['バッジプレビュー'], description: ['暖色テーマでバッジプレビューのコントラストが不足する問題を修正'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.5',
      highlight: 'GitHub PAT認証、修正。',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'Fine-grained personal access tokenに対応。',
      sections: [
        {
          title: '修正',
          items: [
            { term: ['Fine-grained PAT'], description: ['Fine-grained personal access token（github_pat_xxx）がGit同期認証で正常に受け付けられるようになった'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.4',
      highlight: '大きな文書が、重くなくなった。',
      status: 'リリース済',
      statusClass: 'released',
      theme: '300KBの文書でも、タイピングが詰まらない。',
      sections: [
        {
          title: 'パフォーマンス',
          items: [
            { term: ['INP最適化'], description: ['300KB文書タイピング: 272ms→120ms。スラッシュメニュー: 184ms→24ms。コマンドパレット: 200ms→32ms。50KB初回クリック: 160ms→24ms。すべてCIで自動検証'] },
            { term: ['Decoration再構築最適化'], description: ['300KB文書のPresentation Delay: 105ms→68ms（-35%）。大きな文書でオートリンク・トレーリングスペースのdecorationをスキップ'] },
          ],
        },
        {
          title: '新機能',
          items: [
            { term: ['ノート一括選択'], description: ['Shift+Clickで範囲選択、Ctrl+Clickで個別トグル。まとめてD&D、削除、ステージング'] },
            { term: ['選択的Git Push'], description: ['ステージしたノートだけPush。ノート単位のlastPushedAtで変更追跡。Sync（Ctrl+Shift+S）は従来通り全件Push'] },
            { term: ['Git競合をエディタで手動マージ'], description: ['「Merge in Editor」でCompare & Editモードを起動。WYSIWYG差分ハイライト付きで手動編集→自動Push'] },
            { term: ['Diffナビゲーション'], description: ['Compare & Editバナーに▲2/5▼ナビコントロール。F5/Shift+F5キーボードナビ。参照ビューWYSIWYG化'] },
            { term: ['リスト種別トグル'], description: ['選択ツールバーL2からBullet/Ordered/Taskリストを切り替え。アクティブ表示付き'] },
            { term: ['ソート4状態サイクル'], description: ['名前↑、名前↓、更新↑、更新↓。orderフィールド上書きバグも同時修正'] },
            { term: ['バッジダブルクリックコピー'], description: ['shields.ioバッジをダブルクリックでMarkdownをコピー'] },
          ],
        },
        {
          title: '修正',
          items: [
            { term: ['偽衝突検出'], description: ['New TabとSide Panel間のtight/looseリスト差異による偽衝突を修正'] },
            { term: ['サイドバーのちらつき'], description: ['ノート選択時にクリックごとに3-4回の不要再レンダーが発生する問題を修正'] },
            { term: ['Reference Mode'], description: ['コードフェンスを含む差分ハイライト表示ズレを修正'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.3',
      highlight: '執筆のリズムを整える。',
      status: 'リリース済',
      statusClass: 'released',
      theme: '書く手を止めない、小さなツールの積み重ね。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['脚注挿入モーダル'], description: ['コマンドパレットやスラッシュメニューから脚注を挿入。ラベル自動採番、参照と定義を1トランザクションで同時挿入。ホバーツールバーで編集・削除'] },
            { term: ['カスタムスニペット'], description: ['よく使う記法をテンプレートとして保存・挿入。ビルトイン3種（YAML Frontmatter・折りたたみ・定義リスト）。コマンドパレット・ツールバー・設定から管理'] },
            { term: ['改行タイプ切り替え'], description: ['選択テキストの段落改行と行内改行を一括変換。変換方向を自動検出'] },
            { term: ['コードブロックコピー改善'], description: ['ProseMirror優先の3層フォールバックで確実に抽出。4+バッククォート対応。Copy as Markdownを常時表示に昇格'] },
            { term: ['バッジ挿入モーダル'], description: ['コマンドパレットからshields.ioバッジのMarkdownを生成・挿入。8色プリセット+カスタムカラー。リアルタイムプレビュー'] },
          ],
        },
        {
          title: '修正',
          items: [
            { term: ['HTMLエクスポート'], description: ['GitHub Alerts（コールアウト）が正しいスタイルで描画されるように修正'] },
            { term: ['デバッグログ漏洩'], description: ['キー入力のたびにリンクURLがコンソールに出力されるデバッグログの漏洩を修正'] },
            { term: ['HTMLサニタイズ'], description: ['クリップしたコンテンツのHTMLサニタイズルールを拡充'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.2',
      highlight: 'Webの情報をMarkdownに取り込む',
      status: 'リリース済',
      statusClass: 'released',
      theme: 'ページやAIチャットを右クリック→きれいなMarkdownでノートに保存。',
      sections: [
        {
          title: '新機能',
          items: [
            { term: ['Web Clipper'], description: ['右クリックでページやテキスト選択をMarkdownとして保存・コピー。保存後はSide Panelに自動遷移'] },
            { term: ['AIチャット抽出'], description: ['Claude・ChatGPT・Grok・Geminiの出力をMarkdownで取得。数式・コード・テーブル・Artifactをそのまま保持'] },
            { term: ['コメントスレッド抽出'], description: ['HackerNews・Reddit・GitHubから構造化Markdownを生成。ネスト・著者・日時を保持'] },
            { term: ['テーブル出力形式変更'], description: ['CSV→TSV（タブ区切り）に変更。Excel・Google Sheets・Slackへの貼り付けがスムーズに'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['選択ツールバー'], description: ['タスクリスト変換が箇条書きになる問題を修正'] },
            { term: ['Compare & Edit'], description: ['改行差異によるfalse positive検出を修正'] },
            { term: ['複数テーブル'], description: ['ツールバーが間違ったテーブルに操作する問題を修正'] },
            { term: ['Parchment・CandleLightテーマ'], description: ['リストマーカーが見えない問題を修正'] },
            { term: ['Light・Darkテーマ'], description: ['テーブルセル背景が透明になる問題を修正'] },
            { term: ['検索置換'], description: ['日本語訳の誤りと空文字置換時のクラッシュを修正'] },
            { term: ['セキュリティ'], description: ['ホスト検証の厳格化、HTMLサニタイズ、正規表現DoS対策、Cookie値バリデーション'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.1',
      highlight: '小さな修正、大きな互換性',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['DOCXエクスポート'], description: ['タスクリストがチェックボックス記号（☐/☑）で出力されるように改善'] },
          ],
        },
      ],
    },
    {
      version: 'v2.0.0',
      highlight: '書いたものを、ちゃんと外に出す',
      status: 'リリース済',
      statusClass: 'released',
      theme: '出力と表現力の拡張 — Export Suite 4フォーマット、ツールバー全面リデザイン、Cross-Instance Compare、脚注復活。',
      sections: [
        {
          title: 'Export Suite — 4フォーマットで「外に出す」を完成させる',
          items: [
            { term: ['PDFエクスポート'], description: ['iframe + blob URL方式でエディタCSSの漏れを根本解決。Paged.jsでページ番号・目次を自動生成。用紙サイズ（A4/Letter/A3）と余白プリセットをカスタマイズ可能'] },
            { term: ['DOCXエクスポート'], description: ['画像・Mermaid図・数式・シンタックスハイライトをすべて埋め込み。Pre-processing Patternで非同期レンダリングを並列実行し、Wordで開いてそのまま使える'] },
            { term: ['PNGエクスポート'], description: ['ノートを2x Retina品質の画像としてキャプチャ。srcdoc iframeでCSS隔離、10,000px超にはメモリガード'] },
            { term: ['HTMLエクスポート拡張'], description: ['3テンプレート（GitHub/Compact/Academic）、Self-Contained（CDN依存ゼロ）、バッチDOCX ZIPも対応'] },
            { term: ['新しいエクスポートパネル'], description: ['Format × Scope × Settings のパネルUIに再構成。フォーマットをチップで選択、対象（1ノート／Archive／全ノート）を指定。Trash after exportも可能'] },
          ],
        },
        {
          title: 'ツールバー全面リデザイン',
          items: [
            { term: ['L1/L2の2層構造'], description: ['L1（基本操作）は日常的なボタンのみ。L2（詳細操作）は', { code: '···' }, 'で展開 — すっきりしたまま、機能はそのまま'] },
            { term: ['ボタン順序の統一'], description: ['全ツールバーで「機能ボタン → Copy → Delete（赤）」に統一。重複していたDeleteを1つに整理'] },
            { term: ['コマンドパレット拡張'], description: ['22コマンド追加 — Word Count、ブロック変換（H1–H6）、リスト変換、テーブル操作、Callout Cycleなど'] },
            { term: ['Lucideアイコン統一'], description: ['~200個のインラインSVGを', { code: 'lucide-preact' }, 'ライブラリに統一。バンドルサイズ10.44KB削減'] },
          ],
        },
        {
          title: 'Cross-Instance Compare & Edit',
          items: [
            { term: ['ウィンドウ間の衝突を検知'], description: ['New TabとSide Panelで同じノートを開いても、片方の編集が消えない。', { code: 'chrome.storage.session' }, 'にスナップショットを自動保存（3秒throttle）'] },
            { term: ['ConflictResolutionModal'], description: ['差分を左右に並べて表示。矢印キー＋Enterでどちらの内容を採用するか選択できる'] },
            { term: ['変更統計'], description: ['文字数・単語数・変更率をCJK対応でカウント。増加は緑、減少は赤で色分け'] },
          ],
        },
        {
          title: 'テーブルUX全面改善',
          items: [
            { term: ['ツールバー拡張（9→17ボタン）'], description: ['列ソート（昇順/降順）、CSV/Markdownコピー、テーブル整形（Prettify）、削除をツールバーから直接実行'] },
            { term: ['行/列クロスハイライト'], description: ['カーソル位置の行と列を薄い背景色で明示。4テーマ対応'] },
            { term: ['Layout Toggle'], description: ['テーブルごとにAuto→全幅→均等列の3モードを循環切り替え'] },
            { term: ['Smart Defaults'], description: [{ code: 'max-width: 400px' }, 'で長文自動折り返し、', { code: 'min-width: 3ch/4ch' }, 'でセルの潰れ防止'] },
          ],
        },
        {
          title: '新機能',
          items: [
            { term: ['脚注プラグイン復活'], description: ['4層ガード（code_block、fence、codeプレフィックス、spec.code）で堅牢にスキップ。参照クリックで定義へ、定義ラベルクリックで参照へ戻れる'] },
            { term: ['Appearance Popover'], description: ['テーマ選択をColor（4テーマ）とTypography（Standard/Compact/Academic）の2セクション構成に拡張'] },
            { term: ['Mode Popover'], description: ['Focus Mode・Fullscreen・Compare & Edit・Open Side Panelを1つのポップオーバーに統合'] },
            { term: ['Calloutタイプ切り替え'], description: [{ code: 'Ctrl+Shift+A' }, 'でNOTE→TIP→IMPORTANT→WARNING→CAUTIONを循環。ツールバーとコマンドパレットからも操作可能'] },
            { term: ['使い方を自然に学べる'], description: ['空のノートにランダムTipsを表示。Contextual Hints、ツールバーショートカット表示、テーブル挿入モーダル改善'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['取り消し線'], description: [{ code: '~~text~~' }, 'が入力中にすぐ反映されるように。IMEでも対応'] },
            { term: ['PDFの余分な枠線'], description: ['暖色テーマでPDF出力時に枠線が表示される問題を根本解決（iframe + blob URL方式）'] },
            { term: ['PDFファイル名'], description: ['ノート名でPDFが保存されるように修正'] },
            { term: ['Mermaid図のラベル消失'], description: ['HTMLエクスポート時にDOMPurifyがforeignObjectを除去する問題を修正'] },
            { term: ['コードシンタックスハイライト'], description: ['3テンプレートの', { code: 'color: inherit !important' }, 'がCodeMirrorのスタイルを上書きする問題を修正'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.9',
      highlight: '書いたものを外に出す、データを貼り付ける',
      status: 'リリース済',
      statusClass: 'released',
      theme: '中身を整えて、外に出せるようにする — PDF・HTMLエクスポート、Excelテーブル貼り付け、カラーシステムの全面再構築。',
      sections: [
        {
          title: 'エクスポートスイート',
          items: [
            { term: ['PDF出力'], description: ['ブラウザの印刷ダイアログからPDFへ — H1で自動改ページ、', { code: '---' }, 'を改ページに変換'] },
            { term: ['HTML出力'], description: ['GitHub風CSSを埋め込んだスタンドアロンHTML。Mermaid SVG、KaTeX数式、シンタックスハイライト込み — 外部依存ゼロ'] },
            { term: ['一括HTML ZIP'], description: ['Archiveノートや全ノートをHTMLに変換してZIPダウンロード'] },
            { term: ['ダークモード対応'], description: ['エクスポートしたHTMLがOS設定に応じてダーク/ライトに自動対応'] },
            { term: ['Ctrl+Shift+E'], description: ['エクスポートメニューへ直接アクセス'] },
          ],
        },
        {
          title: 'スマートテーブル貼り付け',
          items: [
            { term: ['Excel & Sheets対応'], description: ['ExcelやGoogle Sheetsから貼り付け — 自動でMarkdownテーブルに変換'] },
            { term: ['形式自動検出'], description: ['TSV、パイプ区切り、RFC 4180準拠CSVをサポート'] },
            { term: ['プレビューモーダル'], description: ['挿入前に確認 — Enterで挿入、Escでテキスト貼り付け'] },
          ],
        },
        {
          title: 'カラーシステム',
          items: [
            { term: ['CSS変数移行'], description: ['48のセマンティックカラートークン（OKLCH）でハードコードを一掃 — 5つ目のテーマ追加が1ファイルで完結'] },
            { term: ['暖色テーマ統一'], description: ['Parchment/CandleLightのMermaid図・シンタックスハイライトが暖色パレットに統一'] },
            { term: ['WCAG AA検証'], description: ['全4テーマで4.5:1コントラスト比を確認'] },
          ],
        },
        {
          title: 'UI & UX',
          items: [
            { term: ['タブタイトル'], description: ['「Folder (count) | Mark It Down」形式で自動更新'] },
            { term: ['Favicon'], description: ['ブラウザのタブバーに拡張機能アイコンを表示'] },
            { term: ['Paste as Table'], description: ['コマンドパレットからクリップボードを直接テーブルに変換'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['ヘッダースクロール'], description: ['H1編集時のスクロール位置ジャンプを修正'] },
            { term: ['Focus Mode'], description: ['文書先頭の見出しがタイプライター位置に来ない問題とrAF競合を修正'] },
            { term: ['ESCキー'], description: ['IME入力中やフォーカス外でもモーダルがESCで閉じるように修正'] },
            { term: ['PDFタイトル'], description: ['PDF出力時にタブタイトルが上書きされる問題を修正'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.8',
      highlight: '「開いた瞬間」の体験を変える',
      status: 'リリース済',
      statusClass: 'released',
      theme: '書き始めるまでの摩擦を削る — 高速読み込み、暖色テーマ、賢いパレット、自分の場所にできるエディタ。',
      sections: [
        {
          title: 'テーマ & カスタマイズ',
          items: [
            { term: ['Parchmentテーマ'], description: ['WCAG AAA準拠の暖色パレットにトレーシングペーパー効果 — エディタは道具であり「部屋」'] },
            { term: ['CandleLightテーマ'], description: ['Parchmentと対をなすダーク暖色 — Mermaid図・KaTeX数式も暖色で描画'] },
            { term: ['背景テクスチャ'], description: ['自分のPNG/JPEG/WebP画像をエディタ背景にタイル敷き詰め（設定 > 表示設定）'] },
            { term: ['Wax Seal'], description: ['初回起動時に全画面アニメーション（クリックでスキップ）。テーマ変更はCSSトランジションでスムーズに'] },
          ],
        },
        {
          title: 'パフォーマンス & 集中',
          items: [
            { term: ['段階的読み込み'], description: ['50KB超が一瞬で開く — 先頭~5KBを即座描画、残りはバックグラウンド（89-96%高速化）'] },
            { term: ['Focus Mode改善'], description: ['Glassmorphismツールバー、スクロールバー2px化、ヘッダー連動の滑らかな表示'] },
            { term: ['TOC UI改善'], description: ['ドラッグハンドルのホバー表示、見出しレベル別フォントサイズ（H1 14px → H4+ 11px）'] },
          ],
        },
        {
          title: 'コマンドパレット',
          items: [
            { term: ['スマート検索'], description: ['Fuse.jsスコア順 + スニペット20%ブースト — "Table"で即座にInsert Tableが先頭に'] },
            { term: ['アラート色インジケーター'], description: ['NOTE/TIP/WARNING等5種にテーマ別カラードットを表示'] },
            { term: ['構文プレビュー'], description: ['スニペット説明を構文例に変更: ', { code: 'graph TD' }, ' — Decision flows with arrows'] },
            { term: ['設定操作'], description: ['テーマ個別切替・エディタ設定トグルをパレットから直接操作'] },
          ],
        },
        {
          title: 'エディタ & 図表',
          items: [
            { term: ['Settings + Help統合'], description: ['歯車と？を統合、4タブモーダル: 設定 / ショートカット / Markdown / Tips'] },
            { term: ['Mermaid全19種対応'], description: ['未対応5種を修正、10種の新スニペット追加: ER図、ジャーニー、円グラフ、GitGraph、マインドマップ等'] },
            { term: ['数式PNG保存'], description: ['KaTeXブロックをRetina 2x解像度のPNGで保存（ホバーツールバー）'] },
            { term: ['Mermaidホバーツールバー'], description: ['別タブで自動非表示 — ビューポート上端28pxのトリガーゾーン'] },
            { term: ['Crepeメニュー改善'], description: ['ダークモードの選択色修正、backdrop-blur、アイコンtooltip（i18n対応）'] },
          ],
        },
        {
          title: 'オンボーディング',
          items: [
            { term: ['Welcome Note'], description: ['初回起動時にMermaid図・ショートカット表・チェックリスト付きサンプルノートを自動配置（EN/JA自動判定）'] },
            { term: ['段階的ヒント'], description: ['3つの初回ヒント: コマンドパレット（5分後）、Side Panel（3セッション後）、フォルダ整理'] },
            { term: ['インポートハイライト'], description: ['インポートしたノートが開くまでサイドバーでティール色にハイライト'] },
          ],
        },
        {
          title: 'バグ修正',
          items: [
            { term: ['Windows TOC修正'], description: [{ code: '\\r\\n' }, '改行で見出し抽出が失敗する問題を修正'] },
            { term: ['テキストコピー修正'], description: ['LaTeX ', { code: '$...$' }, ' やエスケープ文字を正しく除去'] },
            { term: ['ドル金額の誤検出'], description: [{ code: '$50' }, 'がLaTeX数式として除去されなくなった'] },
            { term: ['複数ファイルインポート'], description: ['一括インポートで全ファイルが正しく取り込まれるように修正'] },
            { term: ['ライトテーマツールバー'], description: ['フローティングツールバーのアイコンがライト背景で見えるように修正'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.7',
      highlight: 'ノート移動 & インラインコード',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['ノート移動'], description: [{ code: 'Ctrl+Alt+PgUp/PgDn' }, 'で同フォルダ内のノート間をジャンプ'] },
            { term: ['インラインコードコピー'], description: ['バッククォートのコードをダブルクリックでコピー'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.6',
      highlight: '脚注 & 絵文字ショートコード',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['脚注'], description: ['学術スタイルの', { code: '[^label]' }, '構文、クリックでジャンプ'] },
            { term: ['絵文字ショートコード'], description: [{ code: ':smile:' }, 'で😄に変換'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.5',
      highlight: 'コピーオプション & バージョン復元',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['コピードロップダウン'], description: ['「MDでコピー」「テキストでコピー」を1つのメニューで'] },
            { term: ['バージョン復元'], description: ['Gitコミット履歴からワンクリックで復元'] },
            { term: ['Git状態ドット'], description: ['新規は緑、変更ありは黄色、差分ボタン付き'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.4',
      highlight: 'TOC並び替え & パンくずナビ',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['TOC並び替え'], description: ['ドラッグ&ドロップやショートカットで見出しを構造化'] },
            { term: ['パンくずナビ'], description: ['現在の見出しパスを表示、クリックで祖先にジャンプ'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.3',
      highlight: 'あいまい検索 & 文字数カウント',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['あいまい検索'], description: ['タイポ許容、CJK1文字検索対応'] },
            { term: ['タイムスタンプ'], description: ['ノートの最終更新日時を表示'] },
            { term: ['選択範囲カウント'], description: ['文字数・単語数を表示（CJK対応）'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.2',
      highlight: 'テーブル編集',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['テーブル'], description: ['挿入、ソート、CSVエクスポート、行ドラッグ並び替え'] },
            { term: ['キーボードナビゲーション'], description: ['見出しジャンプ（', { code: 'Ctrl+↑/↓' }, '）、ページスクロール'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.1',
      highlight: '文字数カウント & 大ファイル',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Word Count'], description: ['文字数・単語数（CJK対応）・読了時間'] },
            { term: ['大ファイル'], description: ['300KB以上で選択ダイアログ表示'] },
          ],
        },
      ],
    },
    {
      version: 'v1.9.0',
      highlight: '数式（LaTeX）サポート',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['数式レンダリング'], description: ['インライン', { code: '$...$' }, '、ブロック', { code: '$$...$$' }, '、拡大ボタン付き'] },
            { term: ['クロスプラットフォーム'], description: ['Mac / Windows / Linuxでショートカット記号を切替'] },
          ],
        },
      ],
    },
    {
      version: 'v1.8.0',
      highlight: '検索・置換 & 自動リンク',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['検索・置換'], description: ['ノート内の文字列を検索して一括置換'] },
            { term: ['自動リンク化'], description: ['URL/メールアドレスが自動でリンクに'] },
          ],
        },
      ],
    },
    {
      version: 'v1.7.0',
      highlight: 'キーボードファースト & Git同期状態',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['キーボードファースト'], description: ['パネル切替と矢印キーナビゲーション'] },
            { term: ['Git同期状態'], description: ['起動時自動Fetch、更新バナー'] },
          ],
        },
      ],
    },
    {
      version: 'v1.6.0',
      highlight: 'Command Palette & 起動95%高速化',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Command Palette'], description: ['VS Code風パレット、50+コマンド'] },
            { term: ['Focus Mode'], description: ['タイプライタースクロールと3段階dimming'] },
            { term: ['起動時間95%改善'], description: ['バンドル: 698KB → 84KB'] },
          ],
        },
      ],
    },
    {
      version: 'v1.5.0',
      highlight: '大規模ドキュメント & Mermaid',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['大規模ドキュメント'], description: ['100KB超の読み込みが57%高速化'] },
            { term: ['リッチコンテンツ'], description: ['コールアウト、アンカー、LaTeX、Mermaid拡大'] },
          ],
        },
      ],
    },
    {
      version: 'v1.4.0',
      highlight: 'スマートTOC & データ安全性',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['目次（TOC）'], description: ['スクロール中に現在セクションをハイライト'] },
            { term: ['データ安全性'], description: ['自動保存の3層防御'] },
          ],
        },
      ],
    },
    {
      version: 'v1.3.0',
      highlight: 'Git Fetch & 複数キーワード検索',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['Git Fetch'], description: ['ローカルを変更せずにリモート状態を確認'] },
            { term: ['複数キーワード検索'], description: ['AND検索、ハイライト付き'] },
          ],
        },
      ],
    },
    {
      version: 'v1.2.0',
      highlight: '競合検出 & ワイドスクリーン',
      status: 'リリース済',
      statusClass: 'released',
      sections: [
        {
          items: [
            { term: ['競合検出'], description: ['Git同期の4段階リスクインジケーター'] },
            { term: ['ワイドスクリーン'], description: ['1600px以上でサイドバー・TOCがコンテンツ外に'] },
          ],
        },
      ],
    },
  ],
};

interface ChangelogCtaCopy {
  heading: string;
  body: string;
  buttonLabel: string;
  buttonAriaLabel: string;
}

// The old CTA markup (docs/changelog.html lines 1644-1652 /
// docs/changelog-ja.html lines 1651-1659) is the single-button + subtitle
// variant also used by content/templates.ts's CTA — not the two-button
// variant used by okf/rss/clipper/why. The Chrome Web Store URL itself lives
// in components/changelog/Cta.tsx (matching components/templates/Cta.tsx).
// The old JA CTA link DOES have a literal '?hl=ja' query param appended to
// the same URL (confirmed against eed65be:docs/changelog-ja.html line 1657)
// — components/changelog/Cta.tsx branches on `lang` for this, matching
// components/templates/Cta.tsx's `cwsHref`. (This corrects a prior comment
// here that incorrectly claimed a non-branching precedent.) Neither the EN
// nor the JA anchor carries an onclick gtag handler in the old markup, so no
// `data-ga-cta` conversion applies here, matching components/templates/Cta.tsx.
export const changelogCta: Record<Lang, ChangelogCtaCopy> = {
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
