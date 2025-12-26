// System Notes - Language-aware content (Information Flow Philosophy)
// Entry → Work → Move → Exit
import { getUILanguage } from './i18n'

export const USER_MANUAL_ID = 'system-manual'      // はじめに (Entry)
export const DATA_GUIDE_ID = 'system-data-guide'   // 編集ガイド (Work)
export const NOTE_GUIDE_ID = 'system-note-guide'   // 整理と同期 (Move/Exit)

// Get system note title based on language
export function getSystemNoteTitle(id: string): string {
  const isJapanese = getUILanguage().startsWith('ja')

  switch (id) {
    case USER_MANUAL_ID:
      return isJapanese ? 'はじめに' : 'Getting Started'
    case DATA_GUIDE_ID:
      return isJapanese ? '編集ガイド' : 'Editing Guide'
    case NOTE_GUIDE_ID:
      return isJapanese ? '整理と同期' : 'Organize & Sync'
    default:
      return ''
  }
}

// ========== English Content ==========

// Guide 1: Getting Started (Entry)
const USER_MANUAL_CONTENT_EN = `# Getting Started

Last updated: 2025-12-25

---

> [!NOTE]
> This is a **system note** stored in the System folder.
> - **Read-only**: Cannot be edited, moved, or deleted
> - **Auto-updated**: Regenerated with latest content on startup
> - **Excluded from Git sync**: Not included in commits
> - **Toggle visibility**: Settings → Editor → Show System Notes

> **Difficulty Legend**
> 🟢 Basic — Essential for all users
> 🟡 Intermediate — For comfortable users
> 🔴 Advanced — Power users, developers

---

## 🟢 Basic: Quick Start

**New to Mark It Down? Start here:**

1. **Create a note**: Click toolbar "New Note" or press \`Alt+N\`
2. **Write in Markdown**: Type \`# My First Note\` for a heading
3. **Auto-saved**: Your work saves automatically every 0.5 seconds

> [!TIP]
> **Pro Tip**: Paste AI output (ChatGPT, Claude) directly — it renders instantly!

---

## 🟢 Basic: Information Flow

Mark It Down follows a simple flow: **Entry → Work → Move → Exit**

\`\`\`mermaid
flowchart LR
    subgraph Entry["① Entry"]
        A[New Note<br/>Alt+N]
        B[Import<br/>.md/.zip]
        C[Paste<br/>Clipboard]
        D[Drag & Drop]
    end

    A --> I[Inbox]
    B --> I
    C --> I
    D --> I

    I --> W["② Work<br/>Edit"]
    W --> M["③ Move<br/>Organize"]
    M --> E["④ Exit<br/>Export"]

    style Entry fill:#e3f2fd,stroke:#1976d2
    style W fill:#f3e5f5,stroke:#7b1fa2
    style M fill:#fff3e0,stroke:#f57c00
    style E fill:#e8f5e9,stroke:#388e3c
\`\`\`

---

## 🟢 Basic: Philosophy

### "A Place for Digestion"

Mark It Down is a place to **digest** information.
Not a place to store AI outputs as-is.
A place to rewrite in your own words and deepen understanding.

### "No Exit Lock-in"

Markdown is the most universal format.
You can take it anywhere. Any tool can read it.
No ecosystem lock-in.

### "Focus on Writing"

By removing features, you can focus on writing.
- No time spent on tagging
- No time lost on link management
- No confusion over export settings

---

## 🟢 Basic: Two Modes

| Feature | New Tab | Side Panel |
|---------|:-------:|:----------:|
| Full screen | ✅ | - |
| Parallel with web | - | ✅ |
| Table of Contents | Side panel | Dropdown |
| Zen mode | ✅ | - |
| Browser search (Ctrl+F) | ✅ | - |
| Sidebar resize | ✅ | ✅ (narrow) |
| How to open | New tab | Click icon |

> [!TIP]
> Both can be open simultaneously (Dual mode).
> Edit in the focused window; view the other as reference.
> Use \`Ctrl+K\` to search notes (works in both modes).

---

## 🟢 Basic: Entry — Getting Information In

### New Note (Alt+N)

Create a new note in Inbox. Start with \`# \` to set the title.

### Import

- Click **Import** button in toolbar
- Or drag & drop **.md** or **.zip** files

### Paste (Recommended)

> [!TIP]
> **Paste** is the fastest way to import content.
> Copy from AI chat, documentation, or any source → Paste button creates a new note.

- **Empty note**: Paste button is highlighted for quick access
- **Existing note**: Paste inserts at cursor position

### Drag & Drop

Drag .md or .zip files onto the app to import.

---

## What's Next?

- **Editing Guide** — Learn Markdown syntax and shortcuts
- **Organize & Sync** — Manage notes with folders and Git sync
`

// Guide 2: Editing Guide (Work)
const DATA_GUIDE_CONTENT_EN = `# Editing Guide

Last updated: 2025-12-25

---

> [!NOTE]
> This is a **system note** stored in the System folder.
> - **Read-only**: Cannot be edited, moved, or deleted
> - **Auto-updated**: Regenerated with latest content on startup
> - **Excluded from Git sync**: Not included in commits
> - **Toggle visibility**: Settings → Editor → Show System Notes

> **Difficulty Legend**
> 🟢 Basic — Essential for all users
> 🟡 Intermediate — For comfortable users
> 🔴 Advanced — Power users, developers

---

## 🟢 Basic: Work Phase Choices

Mark It Down supports three types of editing capabilities:

\`\`\`mermaid
flowchart TD
    subgraph Work["② Work: Edit & Digest"]
        direction TB

        subgraph Basic["🟢 Basic Editing"]
            W1[Text Formatting<br/>bold, italic, code]
            W2[Lists & Links<br/>bullets, numbered]
        end

        subgraph Control["Undo/Redo"]
            W3[Ctrl+Z / Ctrl+Y<br/>Version control]
        end

        subgraph Advanced["🟡 Advanced Input"]
            W4[Tables<br/>structured data]
            W5[Mermaid<br/>diagrams]
            W6[Math<br/>LaTeX/KaTeX]
        end
    end

    Work --> Next["Ready?"]
    Next -->|Yes| Move["③ Move"]
    Next -->|Keep Editing| Work

    style Work fill:#f3e5f5,stroke:#7b1fa2
    style Basic fill:#e8f5e9,stroke:#388e3e
    style Control fill:#fff3e0,stroke:#f57c00
    style Advanced fill:#e3f2fd,stroke:#1976d2
    style Next fill:#fce4ec,stroke:#c2185b
\`\`\`

> [!TIP]
> Start with basic editing, use Undo/Redo freely, and explore advanced features as needed.

---

## 🟢 Basic: Supported Markdown Syntax

Mark It Down supports all standard Markdown (GFM - GitHub Flavored Markdown).

> [!IMPORTANT]
> Start with \`# \` to create a heading. The first heading becomes your note's title.
> Use \`##\`, \`###\` for hierarchy.

### Text Formatting

\`\`\`markdown
**bold** *italic* ~~strikethrough~~ \`code\`
\`\`\`

**bold** *italic* ~~strikethrough~~ \`code\`

---

### Lists

\`\`\`markdown
- Bullet point
  - Nested item
1. Numbered
- [x] Checked
- [ ] Unchecked
\`\`\`

- Bullet point
  - Nested item
1. Numbered
- [x] Checked
- [ ] Unchecked

---

### Links

**External**: \`[text](URL)\`
**Internal**: \`[text](#heading)\` — jumps to heading

> [!NOTE]
> **Auto-generated heading IDs (GitHub compatible)**:
> - Converted to lowercase
> - Emojis/symbols removed
> - Spaces → hyphens

---

### Callouts (GitHub Alerts)

\`\`\`markdown
> [!NOTE]
> Additional information

> [!TIP]
> Helpful hints

> [!IMPORTANT]
> Key information

> [!WARNING]
> Caution needed

> [!CAUTION]
> Dangerous action
\`\`\`

> [!NOTE]
> Additional information

> [!TIP]
> Helpful hints

---

### 🟡 Intermediate: Tables

\`\`\`markdown
| Left | Center | Right |
|:-----|:------:|------:|
| A    | B      | C     |
\`\`\`

| Left | Center | Right |
|:-----|:------:|------:|
| A    | B      | C     |

---

### 🟡 Intermediate: Code Blocks

\`\`\`markdown
\\\`\\\`\\\`javascript
const hello = "world";
\\\`\\\`\\\`
\`\`\`

\`\`\`javascript
const hello = "world";
\`\`\`

---

### 🟡 Intermediate: Mermaid Diagrams

\`\`\`mermaid
graph TD
  A[Start] --> B{Decision}
  B -->|Yes| C[Process]
  B -->|No| D[End]
\`\`\`

> [!TIP]
> Click 🔍 button to enlarge diagram in new tab.
> Click ↻ button to redraw if diagram doesn't render.

---

### 🔴 Advanced: Math (LaTeX/KaTeX)

**Inline**: \`$E = mc^2$\` → $E = mc^2$

**Block**:
\`\`\`
$$
\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}
$$
\`\`\`

| Syntax | Result |
|--------|--------|
| \`$\\frac{a}{b}$\` | $\\frac{a}{b}$ |
| \`$x^2$\` | $x^2$ |
| \`$\\sqrt{x}$\` | $\\sqrt{x}$ |

---

## 🟢 Basic: Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| New note | \`Alt+N\` |
| Search | \`Ctrl+K\` |
| Toggle sidebar | \`Ctrl+Shift+D\` |
| Git sync | \`Ctrl+Shift+S\` |
| Zen mode (New Tab) | \`F11\` / \`Ctrl+Shift+Z\` |
| Exit Zen mode | \`Escape\` |
| Pin/Unpin | \`Alt+P\` |
| Move to Template | \`Alt+T\` |
| Move to Archive | \`Alt+A\` |
| Move to Trash | \`Alt+X\` |
| Undo | \`Ctrl+Z\` |
| Redo | \`Ctrl+Y\` |

---

## 🟢 Basic: Auto Pair (Settings → Editor)

Brackets, quotes, and backticks are auto-completed:

| Type | Auto-complete |
|------|---------------|
| \`(\` | \`()\` — cursor in middle |
| \`[\` | \`[]\` |
| \`{\` | \`{}\` |
| \`"\` | \`""\` |
| \`'\` | \`''\` |
| \`\\\`\` | \`\\\`\\\`\` |

**Features**:
- Select text + type \`(\` → wraps as \`(selected)\`
- Type \`)\` before \`)\` → skips (no duplicate)
- Backspace in \`()\` → deletes both

> [!TIP]
> Toggle ON/OFF in Settings → Editor tab.

---

## 🟡 Intermediate: Editing Tips

### Zen Mode (New Tab only)

Press \`F11\` or \`Ctrl+Shift+Z\` to hide all UI and focus on writing.
Press \`Escape\` to exit.

### 🔴 Advanced: Conflict Resolution

When editing the same note in both New Tab and Side Panel, **Merge Changes** button appears.
Click to compare side-by-side and choose which version to keep.

**Comparison tools:**
- **Sync Scroll** — Synchronize left/right pane scrolling
- **Highlight Diff** — Show added (+) / removed (−) lines
- **Quick Scroll** — Jump to top/bottom buttons
- **TOC** — Jump to headings (if present)

### Table of Contents

Click TOC button (top right) to navigate long documents.
- New Tab: Side panel TOC
- Side Panel: Dropdown TOC

---

## What's Next?

- **Getting Started** — Learn the philosophy and entry methods
- **Organize & Sync** — Manage notes with folders and Git sync
`

// Guide 3: Organize & Sync (Move/Exit)
const NOTE_GUIDE_CONTENT_EN = `# Organize & Sync

Last updated: 2025-12-25

---

> [!NOTE]
> This is a **system note** stored in the System folder.
> - **Read-only**: Cannot be edited, moved, or deleted
> - **Auto-updated**: Regenerated with latest content on startup
> - **Excluded from Git sync**: Not included in commits
> - **Toggle visibility**: Settings → Editor → Show System Notes

> **Difficulty Legend**
> 🟢 Basic — Essential for all users
> 🟡 Intermediate — For comfortable users
> 🔴 Advanced — Power users, developers

---

## 🟢 Basic: Fixed Position Management

Mark It Down uses **5 fixed folders** — no custom folders.
This is intentional: organize by moving, not by thinking.

\`\`\`mermaid
flowchart TD
    subgraph Decision["After Editing"]
        Ready{Ready to organize?}
    end

    subgraph Move["③ Move: Fixed Position Management"]
        direction TB
        Ready -->|Keep in Inbox| Stay[📝 Stay in Inbox<br/>Continue editing]
        Ready -->|Organize| Organize

        Organize --> T[📋 Template<br/>Alt+T<br/>Reusable formats]
        Organize --> A[🔒 Archive<br/>Alt+A<br/>Completed & Locked]
        Organize --> X[🗑️ Trash<br/>Alt+X<br/>Mark for deletion]

        T -->|Duplicate| Back[← Back to Inbox]
        A -->|Restore| Back
        X -->|Restore| Back

        Stay --> Sync[🔄 Git Sync<br/>Ctrl+Shift+S]
        Organize --> Sync
    end

    subgraph Exit["④ Exit: Graduate Your Work"]
        direction LR
        Exit1[📄 Export .md<br/>Single file]
        Exit2[📋 Copy<br/>To clipboard]
    end

    Stay --> Exit1
    Stay --> Exit2

    T --> Exit1
    A --> Exit1

    X -->|Sync| Remote[☁️ Remote deleted]
    Remote -->|Delete Permanently| Gone[❌ Gone forever]

    style Move fill:#fff3e0,stroke:#f57c00
    style Exit fill:#e8f5e9,stroke:#388e3c
    style Decision fill:#f3e5f5,stroke:#7b1fa2
    style Stay fill:#e3f2fd,stroke:#1976d2
    style T fill:#e0f2f1,stroke:#00897b
    style A fill:#c8e6c9,stroke:#388e3c
    style X fill:#ffebee,stroke:#d32f2f
    style Remote fill:#ffcdd2,stroke:#c62828
    style Gone fill:#b71c1c,stroke:#b71c1c,color:#fff
\`\`\`

> [!IMPORTANT]
> **"Keep in Inbox" is a valid choice!**
> You don't need to move notes immediately. Stay in Inbox, continue editing, and sync to Git when ready.

| Folder | Purpose | When to Use |
|--------|---------|-------------|
| **Inbox** | Work area — edit, refine, and **sync from here** | Default workspace; Git sync works on all folders |
| **Template** | Reusable formats — click to duplicate | Common structures you use repeatedly |
| **Archive** | Completed — edit locked (Restore to Inbox to edit) | Finished work you want to preserve |
| **Trash** | Deleted — recoverable until permanent delete | Mistakes or outdated content |
| **System** | Getting Started guides — 🔵 blue background, ⓘ info icon, READ ONLY badge (bottom of sidebar) | Reference documentation |

---

## 🟢 Basic: Quick Actions (Move)

Use **Move dropdown** in toolbar or keyboard shortcuts:

| Action | Shortcut |
|--------|----------|
| Pin/Unpin | \`Alt+P\` |
| Move to Template | \`Alt+T\` |
| Move to Archive | \`Alt+A\` |
| Move to Trash | \`Alt+X\` |
| Restore to Inbox | (from menu) |

> [!TIP]
> Drag & drop notes between folders for quick organization.

---

## 🟢 Basic: Auto-Save

- **Saves 0.5 seconds after input** — no manual save needed
- Stored in **chrome.storage.local** (Chrome extension storage)
- ✅ Browser cache clear is safe — data preserved
- ⚠️ Extension uninstall deletes all data

> [!CAUTION]
> **Uninstalling the extension deletes all notes.**
> Use Git sync or Export for backup.

---

## 🟡 Intermediate: Git Sync

> [!IMPORTANT]
> **Organize first, then sync.**
> Git sync is intentional version control, not auto-sync like OneDrive.

### Workflow

1. Edit notes in Inbox
2. Move completed notes to Archive
3. Move unwanted notes to Trash
4. **Commit & Sync** (\`Ctrl+Shift+S\`)

> [!NOTE]
> **System Notes Git Sync Behavior**
>
> System notes are **excluded from commits** but can be deleted:
>
> | Action | Result |
> |--------|--------|
> | Edit system note | Local only (not synced) |
> | Move to Archive/Template | Not allowed (protected) |
> | Move to Trash | Local only |
> | **Move to Trash + Sync** | **Remote file deleted** ✅ |
>
> **Automatic cleanup**: If you upgraded from a version before System folder,
> old system note paths (e.g., \`notes/Archive/はじめに.md\`) are automatically
> queued for deletion and removed on your next Commit & Sync.

### Operations

| Action | Description |
|--------|-------------|
| Commit & Sync | Commit → Pull → Push (recommended) |
| Push | Local → Remote only |
| Pull | Remote → Local only |
| Discard Changes | Revert to last pushed state |
| Diff | Compare local vs remote |
| History | View commit history |

### 🟡 Intermediate: Two-Stage Deletion

Why two stages? **Failsafe** against accidental deletion.

\`\`\`mermaid
flowchart TD
    subgraph NeverSynced["Never Synced Notes"]
        N1[Note] -->|"Alt+X"| T1[Trash]
        T1 -->|"Delete Permanently"| G1[Gone]
    end

    subgraph Synced["Previously Synced Notes (Triple Failsafe)"]
        N2[Note] -->|"Alt+X"| T2[Trash]
        T2 -->|"Sync"| R[Remote deleted]
        R -->|"Delete Permanently"| G2[Gone]
    end

    style NeverSynced fill:#e3f2fd,stroke:#1976d2
    style Synced fill:#fff3e0,stroke:#f57c00
    style G1 fill:#ffebee,stroke:#d32f2f
    style G2 fill:#ffebee,stroke:#d32f2f
\`\`\`

| Scenario | Failsafe Levels |
|----------|-----------------|
| Never synced | 2 stages: Trash → Delete Permanently |
| Previously synced | **3 stages**: Trash → Sync → Delete Permanently |

> [!TIP]
> **Synced notes have extra protection.**
> If you skip Sync and Delete Permanently, the note will resurrect on next Sync.
> This is intentional — files you consciously synced are protected from accidental deletion.

---

## 🟢 Basic: Exit — Export Your Notes

Mark It Down is a **temporary workspace**.
Graduate notes to your permanent storage (Obsidian, Notion, etc.).

| Action | Result |
|--------|--------|
| **Export** | Current note as .md file |
| **Copy** | Note content to clipboard |
| **Export All** | All notes as .zip (from Settings) |

> [!TIP]
> **Don't keep notes longer than necessary.**
> Digest, organize, export — then clear your workspace.

---

## 🟡 Intermediate: Git Setup

### 1. Create Personal Access Token

**GitHub**: https://github.com/settings/tokens/new → Check \`repo\`
**GitLab**: https://gitlab.com/-/user_settings/personal_access_tokens → Check \`read_repository\` + \`write_repository\`

### 2. Create Repository

> [!IMPORTANT]
> **Use Private repository** — notes may contain sensitive information.

### 3. Configure in Settings

1. Open Settings (⚙️)
2. Select provider (GitHub/GitLab)
3. Enter token and repository URL
4. Test Connection → Save

---

## What's Next?

- **Getting Started** — Learn the philosophy and entry methods
- **Editing Guide** — Learn Markdown syntax and shortcuts
`

// ========== Japanese Content ==========

// ガイド1: はじめに (Entry)
const USER_MANUAL_CONTENT_JA = `# はじめに

最終更新: 2025-12-25

---

> [!NOTE]
> これは**システムノート**です。Systemフォルダに保存されています。
> - **読み取り専用**: 編集・移動・削除はできません
> - **自動更新**: 起動時に最新内容で再生成されます
> - **Git同期除外**: コミットに含まれません
> - **表示切替**: 設定 → エディタ → システムノートを表示

> **難易度の見方**
> 🟢 Basic — 全ユーザー必須
> 🟡 Intermediate — 慣れたユーザー向け
> 🔴 Advanced — パワーユーザー/開発者向け

---

## 🟢 Basic: クイックスタート

**初めての方はここから:**

1. **ノート作成**: ツールバーの「新規ノート」または \`Alt+N\` を押す
2. **Markdownで書く**: \`# 最初のノート\` と入力すると見出しになります
3. **自動保存**: 0.5秒ごとに自動保存されます

> [!TIP]
> **プロのコツ**: AI出力（ChatGPT、Claude）を直接ペーストすると即座にレンダリングされます！

---

## 🟢 Basic: 情報フロー

Mark It Downはシンプルなフローに従います: **Entry → Work → Move → Exit**

\`\`\`mermaid
flowchart LR
    subgraph Entry["① Entry 入り口"]
        A[新規作成<br/>Alt+N]
        B[Import<br/>.md/.zip]
        C[Paste<br/>クリップボード]
        D[ドラッグ&ドロップ]
    end

    A --> I[Inbox]
    B --> I
    C --> I
    D --> I

    I --> W["② Work<br/>編集"]
    W --> M["③ Move<br/>整理"]
    M --> E["④ Exit<br/>卒業"]

    style Entry fill:#e3f2fd,stroke:#1976d2
    style W fill:#f3e5f5,stroke:#7b1fa2
    style M fill:#fff3e0,stroke:#f57c00
    style E fill:#e8f5e9,stroke:#388e3c
\`\`\`

---

## 🟢 Basic: 設計思想

### 「咀嚼の場所」

Mark It Down は情報を**咀嚼する場所**である。
AIの出力をそのまま保存する場所ではない。
自分の言葉で書き直し、理解を深める場所。

### 「出口は選ばない」

Markdown は最も汎用的なフォーマット。
どこにでも持っていける。どのツールでも読める。
特定のエコシステムに閉じ込めない。

### 「書くことに集中」

機能を削ることで、書くことに集中できる。
- タグ付けで悩まない
- リンク管理で時間を取られない
- エクスポート設定で迷わない

---

## 🟢 Basic: 2つのモード

| 機能 | New Tab | Side Panel |
|------|:-------:|:----------:|
| 全画面表示 | ✅ | - |
| Webページと並列 | - | ✅ |
| 目次（TOC） | サイドパネル | ドロップダウン |
| Zenモード | ✅ | - |
| ブラウザ検索（Ctrl+F） | ✅ | - |
| サイドバー幅調整 | ✅ | ✅（狭め） |
| 開き方 | 新しいタブ | アイコンクリック |

> [!TIP]
> 両方同時に開けます（デュアルモード）。
> 編集はフォーカスしたウィンドウで。もう片方を参照として使えます。
> ノート検索は \`Ctrl+K\` で（両モード共通）。

---

## 🟢 Basic: Entry — 情報の取り込み

### 新規ノート作成 (Alt+N)

Inboxに新規ノートを作成。\`# \` で始めるとタイトルになります。

### Import

- ツールバーの **Import** ボタンをクリック
- または **.md** や **.zip** ファイルをドラッグ&ドロップ

### Paste（おすすめ）

> [!TIP]
> **Paste** は最速の取り込み方法です。
> AIチャット、ドキュメント、どこからでもコピー → Pasteボタンで新規ノート作成。

- **空のノート**: Pasteボタンがハイライト表示
- **既存のノート**: カーソル位置に挿入

### ドラッグ&ドロップ

.md や .zip ファイルをアプリにドラッグして取り込み。

---

## 次のステップ

- **編集ガイド** — Markdown記法とショートカットを学ぶ
- **整理と同期** — フォルダとGit同期でノートを管理
`

// ガイド2: 編集ガイド (Work)
const DATA_GUIDE_CONTENT_JA = `# 編集ガイド

最終更新: 2025-12-25

---

> [!NOTE]
> これは**システムノート**です。Systemフォルダに保存されています。
> - **読み取り専用**: 編集・移動・削除はできません
> - **自動更新**: 起動時に最新内容で再生成されます
> - **Git同期除外**: コミットに含まれません
> - **表示切替**: 設定 → エディタ → システムノートを表示

> **難易度の見方**
> 🟢 Basic — 全ユーザー必須
> 🟡 Intermediate — 慣れたユーザー向け
> 🔴 Advanced — パワーユーザー/開発者向け

---

## 🟢 Basic: Work段階の選択肢

Mark It Downは3種類の編集機能をサポートしています：

\`\`\`mermaid
flowchart TD
    subgraph Work["② Work: 編集・咀嚼"]
        direction TB

        subgraph Basic["🟢 基本編集"]
            W1[テキスト装飾<br/>太字・斜体・コード]
            W2[リスト・リンク<br/>箇条書き・番号]
        end

        subgraph Control["元に戻す/やり直し"]
            W3[Ctrl+Z / Ctrl+Y<br/>バージョン管理]
        end

        subgraph Advanced["🟡 高度な入力"]
            W4[テーブル<br/>構造化データ]
            W5[Mermaid<br/>図表]
            W6[数式<br/>LaTeX/KaTeX]
        end
    end

    Work --> Next["準備完了？"]
    Next -->|Yes| Move["③ Move"]
    Next -->|編集継続| Work

    style Work fill:#f3e5f5,stroke:#7b1fa2
    style Basic fill:#e8f5e9,stroke:#388e3e
    style Control fill:#fff3e0,stroke:#f57c00
    style Advanced fill:#e3f2fd,stroke:#1976d2
    style Next fill:#fce4ec,stroke:#c2185b
\`\`\`

> [!TIP]
> まずは基本編集から始め、元に戻す/やり直しを自由に使い、必要に応じて高度な機能を試してみましょう。

---

## 🟢 Basic: 対応Markdown記法

Mark It DownはGFM（GitHub Flavored Markdown）に完全対応しています。

> [!IMPORTANT]
> まずは、\`# \` で見出しを作成してください。最初の見出しがノートのタイトルになります。
> \`##\`、\`###\` と増やして階層化。

### テキスト装飾

\`\`\`markdown
**太字** *斜体* ~~取消線~~ \`コード\`
\`\`\`

**太字** *斜体* ~~取消線~~ \`コード\`

---

### リスト

\`\`\`markdown
- 箇条書き
  - ネスト
1. 番号付き
- [x] チェック済み
- [ ] 未チェック
\`\`\`

- 箇条書き
  - ネスト
1. 番号付き
- [x] チェック済み
- [ ] 未チェック

---

### リンク

**外部リンク**: \`[テキスト](URL)\`
**内部リンク**: \`[テキスト](#見出し)\` — 見出しにジャンプ

> [!NOTE]
> **見出しIDの自動生成（GitHub互換）**:
> - 小文字に変換
> - 絵文字・記号は削除
> - スペース → ハイフン

---

### コールアウト（GitHub Alerts）

\`\`\`markdown
> [!NOTE]
> 補足情報

> [!TIP]
> ヒント

> [!IMPORTANT]
> 重要

> [!WARNING]
> 警告

> [!CAUTION]
> 危険
\`\`\`

> [!NOTE]
> 補足情報

> [!TIP]
> ヒント

---

### 🟡 Intermediate: テーブル

\`\`\`markdown
| 左寄せ | 中央 | 右寄せ |
|:-------|:----:|-------:|
| A      | B    | C      |
\`\`\`

| 左寄せ | 中央 | 右寄せ |
|:-------|:----:|-------:|
| A      | B    | C      |

---

### 🟡 Intermediate: コードブロック

\`\`\`markdown
\\\`\\\`\\\`javascript
const hello = "world";
\\\`\\\`\\\`
\`\`\`

\`\`\`javascript
const hello = "world";
\`\`\`

---

### 🟡 Intermediate: Mermaid図

\`\`\`mermaid
graph TD
  A[開始] --> B{判断}
  B -->|Yes| C[処理]
  B -->|No| D[終了]
\`\`\`

> [!TIP]
> 🔍ボタンで図を別タブに拡大表示。
> ↻ボタンで再描画（表示されない場合）。

---

### 🔴 Advanced: 数式（LaTeX/KaTeX）

**インライン**: \`$E = mc^2$\` → $E = mc^2$

**ブロック**:
\`\`\`
$$
\\sum_{n=1}^{\\infty} \\frac{1}{n^2} = \\frac{\\pi^2}{6}
$$
\`\`\`

| 記法 | 結果 |
|------|------|
| \`$\\frac{a}{b}$\` | $\\frac{a}{b}$ |
| \`$x^2$\` | $x^2$ |
| \`$\\sqrt{x}$\` | $\\sqrt{x}$ |

---

## 🟢 Basic: キーボードショートカット

| 操作 | ショートカット |
|------|--------------|
| 新規ノート | \`Alt+N\` |
| 検索 | \`Ctrl+K\` |
| サイドバー切替 | \`Ctrl+Shift+D\` |
| Git同期 | \`Ctrl+Shift+S\` |
| Zenモード（New Tab） | \`F11\` / \`Ctrl+Shift+Z\` |
| Zenモード解除 | \`Escape\` |
| Pin/Unpin | \`Alt+P\` |
| Templateへ移動 | \`Alt+T\` |
| Archiveへ移動 | \`Alt+A\` |
| Trashへ移動 | \`Alt+X\` |
| 元に戻す | \`Ctrl+Z\` |
| やり直し | \`Ctrl+Y\` |

---

## 🟢 Basic: 自動ペア入力（設定 → エディタ）

括弧・引用符・バッククォートが自動補完されます:

| 入力 | 自動補完 |
|------|----------|
| \`(\` | \`()\` — カーソルは中央 |
| \`[\` | \`[]\` |
| \`{\` | \`{}\` |
| \`"\` | \`""\` |
| \`'\` | \`''\` |
| \`\\\`\` | \`\\\`\\\`\` |

**機能**:
- テキスト選択 + \`(\` → \`(選択テキスト)\` でラップ
- \`)\` の前で \`)\` → スキップ（重複なし）
- \`()\` の中央で Backspace → 両方削除

> [!TIP]
> 設定 → エディタタブでON/OFF切替可能。

---

## 🟡 Intermediate: 編集のヒント

### Zenモード（New Tabのみ）

\`F11\` または \`Ctrl+Shift+Z\` で全UIを非表示にして執筆に集中。
\`Escape\` で解除。

### 🔴 Advanced: 競合の解決

New TabとSide Panelで同じノートを編集すると、**Merge Changes** ボタンが表示されます。
クリックして並べて比較し、どちらを採用するか選択。

**比較ツール:**
- **Sync Scroll** — 左右ペインのスクロール同期
- **Highlight Diff** — 追加(+)/削除(−)行のハイライト
- **Quick Scroll** — 先頭/末尾へジャンプ
- **TOC** — 見出しへジャンプ（見出しがある場合）

### 目次（TOC）

TOCボタン（右上）で長いドキュメントをナビゲート。
- New Tab: サイドパネルTOC
- Side Panel: ドロップダウンTOC

---

## 次のステップ

- **はじめに** — 設計思想と取り込み方法を学ぶ
- **整理と同期** — フォルダとGit同期でノートを管理
`

// ガイド3: 整理と同期 (Move/Exit)
const NOTE_GUIDE_CONTENT_JA = `# 整理と同期

最終更新: 2025-12-25

---

> [!NOTE]
> これは**システムノート**です。Systemフォルダに保存されています。
> - **読み取り専用**: 編集・移動・削除はできません
> - **自動更新**: 起動時に最新内容で再生成されます
> - **Git同期除外**: コミットに含まれません
> - **表示切替**: 設定 → エディタ → システムノートを表示

> **難易度の見方**
> 🟢 Basic — 全ユーザー必須
> 🟡 Intermediate — 慣れたユーザー向け
> 🔴 Advanced — パワーユーザー/開発者向け

---

## 🟢 Basic: 定位置管理

Mark It Downは**固定5フォルダ**を使用 — カスタムフォルダはありません。
これは意図的な設計: 考えずに移動するだけ。

\`\`\`mermaid
flowchart TD
    subgraph Decision["編集後"]
        Ready{整理する？}
    end

    subgraph Move["③ Move: 定位置管理"]
        direction TB
        Ready -->|Inboxに残す| Stay[📝 Inboxに残す<br/>編集継続]
        Ready -->|整理する| Organize

        Organize --> T[📋 Template<br/>Alt+T<br/>再利用フォーマット]
        Organize --> A[🔒 Archive<br/>Alt+A<br/>完成・ロック済み]
        Organize --> X[🗑️ Trash<br/>Alt+X<br/>削除マーク]

        T -->|複製| Back[← Inboxに戻す]
        A -->|復元| Back
        X -->|復元| Back

        Stay --> Sync[🔄 Git Sync<br/>Ctrl+Shift+S]
        Organize --> Sync
    end

    subgraph Exit["④ Exit: 作業の卒業"]
        direction LR
        Exit1[📄 Export .md<br/>単一ファイル]
        Exit2[📋 Copy<br/>クリップボードへ]
    end

    Stay --> Exit1
    Stay --> Exit2

    T --> Exit1
    A --> Exit1

    X -->|Sync| Remote[☁️ リモート削除]
    Remote -->|完全削除| Gone[❌ 永久削除]

    style Move fill:#fff3e0,stroke:#f57c00
    style Exit fill:#e8f5e9,stroke:#388e3c
    style Decision fill:#f3e5f5,stroke:#7b1fa2
    style Stay fill:#e3f2fd,stroke:#1976d2
    style T fill:#e0f2f1,stroke:#00897b
    style A fill:#c8e6c9,stroke:#388e3c
    style X fill:#ffebee,stroke:#d32f2f
    style Remote fill:#ffcdd2,stroke:#c62828
    style Gone fill:#b71c1c,stroke:#b71c1c,color:#fff
\`\`\`

> [!IMPORTANT]
> **「Inboxに残す」は有効な選択肢です！**
> すぐに移動する必要はありません。Inboxに残したまま編集を続け、準備ができたらGitに同期してください。

| フォルダ | 役割 | 使用タイミング |
|----------|------|--------------|
| **Inbox** | 作業場 — 編集・咀嚼し、**ここから同期も可能** | デフォルト作業場；Git同期は全フォルダで動作 |
| **Template** | 再利用 — クリックで複製 | 繰り返し使用する共通構造 |
| **Archive** | 完成品 — 編集ロック（Inboxに復元で編集再開） | 保存したい完成作品 |
| **Trash** | 削除済み — 完全削除まで復元可能 | 間違いや古いコンテンツ |
| **System** | はじめにガイド — 🔵 青背景、ⓘ アイコン、READ ONLYバッジ（サイドバー最下部） | リファレンスドキュメント |

---

## 🟢 Basic: クイックアクション（Move）

ツールバーの **Moveドロップダウン** またはショートカット:

| 操作 | ショートカット |
|------|--------------|
| Pin/Unpin | \`Alt+P\` |
| Templateへ移動 | \`Alt+T\` |
| Archiveへ移動 | \`Alt+A\` |
| Trashへ移動 | \`Alt+X\` |
| Inboxに復元 | （メニューから） |

> [!TIP]
> ドラッグ&ドロップでフォルダ間を素早く移動。

---

## 🟢 Basic: 自動保存

- **入力後0.5秒で自動保存** — 手動保存は不要
- **chrome.storage.local** に保存（Chrome拡張機能専用ストレージ）
- ✅ ブラウザキャッシュ削除は安全 — データは保持
- ⚠️ 拡張機能を削除するとデータも消失

> [!CAUTION]
> **拡張機能をアンインストールすると、すべてのノートが削除されます。**
> Git同期またはExportでバックアップを取りましょう。

---

## 🟡 Intermediate: Git同期

> [!IMPORTANT]
> **整理してから同期する。**
> Git同期は意図的なバージョン管理です。OneDriveのような自動同期ではありません。

### ワークフロー

1. Inboxでノートを編集
2. 完成したノートをArchiveへ
3. 不要なノートをTrashへ
4. **Commit & Sync** (\`Ctrl+Shift+S\`)

> [!NOTE]
> **システムノートのGit同期動作**
>
> システムノートは**コミットから除外**されますが削除は可能です：
>
> | 操作 | 結果 |
> |------|------|
> | システムノートを編集 | ローカルのみ（同期されない） |
> | Archive/Templateへ移動 | 不可（保護されています） |
> | Trashへ移動 | ローカルのみ |
> | **Trashへ移動 + 同期** | **リモートファイルが削除されます** ✅ |
>
> **自動クリーンアップ**: Systemフォルダ以前のバージョンからアップグレードした場合、
> 古いシステムノートパス（例: \`notes/Archive/はじめに.md\`）は自動的に
> 削除キューに追加され、次回のCommit & Syncで削除されます。

### 操作

| 操作 | 説明 |
|------|------|
| Commit & Sync | Commit → Pull → Push（推奨） |
| Push | ローカル → リモートのみ |
| Pull | リモート → ローカルのみ |
| Discard Changes | 最後のPush時点に戻す |
| Diff | ローカルとリモートを比較 |
| History | コミット履歴を表示 |

### 🟡 Intermediate: 2段階削除

なぜ2段階？ 誤削除の**フェイルセーフ**。

\`\`\`mermaid
flowchart TD
    subgraph NeverSynced["同期したことがないノート"]
        N1[ノート] -->|"Alt+X"| T1[Trash]
        T1 -->|"完全削除"| G1[消去]
    end

    subgraph Synced["同期したことがあるノート（3重フェイルセーフ）"]
        N2[ノート] -->|"Alt+X"| T2[Trash]
        T2 -->|"Sync"| R[リモート削除]
        R -->|"完全削除"| G2[消去]
    end

    style NeverSynced fill:#e3f2fd,stroke:#1976d2
    style Synced fill:#fff3e0,stroke:#f57c00
    style G1 fill:#ffebee,stroke:#d32f2f
    style G2 fill:#ffebee,stroke:#d32f2f
\`\`\`

| シナリオ | フェイルセーフ |
|----------|----------------|
| 同期したことがない | 2段階: Trash → 完全削除 |
| 同期したことがある | **3段階**: Trash → Sync → 完全削除 |

> [!TIP]
> **同期済みノートは追加の保護あり。**
> Syncせず完全削除しても、次回Syncでノートが復活します。
> これは仕様 — 意識的に同期したファイルは誤削除から保護されます。

---

## 🟢 Basic: Exit — ノートを卒業させる

Mark It Downは**一時的な作業場**です。
恒久的な保存先（Obsidian、Notionなど）にノートを卒業させましょう。

| 操作 | 結果 |
|------|------|
| **Export** | 現在のノートを.mdファイルに |
| **Copy** | ノート内容をクリップボードに |
| **Export All** | 全ノートを.zipに（設定画面から） |

> [!TIP]
> **必要以上にノートを置かない。**
> 咀嚼 → 整理 → エクスポート → ワークスペースをクリアに。

---

## 🟡 Intermediate: Git設定

### 1. Personal Access Token の作成

**GitHub**: https://github.com/settings/tokens/new → \`repo\` にチェック
**GitLab**: https://gitlab.com/-/user_settings/personal_access_tokens → \`read_repository\` + \`write_repository\`

### 2. リポジトリの作成

> [!IMPORTANT]
> **Privateリポジトリを使用** — ノートには機密情報が含まれる可能性があります。

### 3. 設定で接続

1. 設定（⚙️）を開く
2. プロバイダー（GitHub/GitLab）を選択
3. トークンとリポジトリURLを入力
4. 接続テスト → 保存

---

## 次のステップ

- **はじめに** — 設計思想と取り込み方法を学ぶ
- **編集ガイド** — Markdown記法とショートカットを学ぶ
`

// ========== Export Functions ==========

export function getUserManualContent(): string {
  const isJapanese = getUILanguage().startsWith('ja')
  return isJapanese ? USER_MANUAL_CONTENT_JA : USER_MANUAL_CONTENT_EN
}

export function getDataGuideContent(): string {
  const isJapanese = getUILanguage().startsWith('ja')
  return isJapanese ? DATA_GUIDE_CONTENT_JA : DATA_GUIDE_CONTENT_EN
}

export function getNoteGuideContent(): string {
  const isJapanese = getUILanguage().startsWith('ja')
  return isJapanese ? NOTE_GUIDE_CONTENT_JA : NOTE_GUIDE_CONTENT_EN
}
