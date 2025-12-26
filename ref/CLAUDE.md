# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

**コンテキスト管理方針**: このファイルは全セッション共通で読み込まれるため、プロジェクト概要と重要な設計判断のみ記載。詳細な手順はslash commands、skills、subagentsで管理。

---

## Quick Navigation

- [Design Philosophy](#設計思想) - Core principles (咀嚼の場所, 出口は選ばない, 書くことに集中)
- [Tech Stack](#技術スタック) - Technologies (Preact, Milkdown, Zustand)
- [Project Structure](#プロジェクト構造) - File organization
- [Keyboard Shortcuts](#キーボードショートカット) - Quick reference table
- [Technical Decisions](#重要な技術的決定概要) - Data model, Git sync
- [Development Workflow](#開発ワークフロー) - Session start/end checklists
- [Documentation](#参考資料) - Where to find what

---

## Documentation Map

### For Users / ユーザー向け

| I want to... / やりたいこと | Read this / 読むドキュメント |
|----------------------------|------------------------------|
| Learn what Mark It Down is | [README.md](README.md) |
| Get started quickly | In-app: Getting Started guide |
| Learn Markdown syntax | In-app: Editing Guide |
| Set up Git backup | In-app: Organize & Sync guide |
| Find keyboard shortcuts | In-app: Help button (?) |

### For Developers / 開発者向け

| I want to... / やりたいこと | Read this / 読むドキュメント |
|----------------------------|------------------------------|
| Understand the project | [CLAUDE.md](CLAUDE.md) |
| Set up dev environment | [development-setup.md](doc/development-setup.md) |
| Learn architecture | [technical-decisions.md](doc/technical-decisions.md) |
| See implementation history | [implementation-history.md](doc/implementation-history.md) |
| Contribute code | [CONTRIBUTING.md](doc/CONTRIBUTING.md) |

### By Topic / トピック別

| Topic / トピック | Document / ドキュメント |
|-----------------|------------------------|
| Product vision | CLAUDE.md - Design Philosophy |
| Git sync internals | [git-sync-flowchart.md](doc/git-sync-flowchart.md) |
| Milkdown editor | [milkdown-technical-report.md](doc/milkdown-technical-report.md) |
| Market positioning | [competitor-analysis.md](doc/competitor-analysis.md) |

---

## Mark It Down

Markdownで書く。

AI機能なし。でもAI出力の貼り付けは完璧にレンダリング。
1ペイン。書いた瞬間に見える。

**New Tab** — 全画面で。
**Side Panel** — Webの横で。AIの横で。

貼る。見える。削る。書き換える。
テーブル、Mermaid、コードブロック、LaTeX。
貼った瞬間に、完成形。

フォルダにNoteをドラッグ&ドロップすると変わる。

- **Template** — 複製できるように。
- **Archive** — 間違えて編集しないようにロック。
- **Trash** — ゴミ箱にいれるだけ、あとで消すので安心。

Chrome拡張機能専用ストレージに保存。起動は一瞬。
Git連携でリモートにプッシュ。
プルしたらローカルと比較して差分を見ながらどちらを保存するか選択。
Note単位でmd型式のエクスポートをサポート。

書くことに集中しよう。

調べて、書く。自分の言葉にする。
その繰り返しが、自分になる。

## 設計思想

### 「咀嚼の場所」

Mark It Down は情報を「咀嚼する場所」である。
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

### 「整理はしない」（定位置管理）

Mark It Downは情報を**整理しない**。
フォルダは固定の5つのみ（Inbox, Template, Archive, Trash, System）。
カスタムフォルダは作れない。これは設計上の意図的な制限。

**移動の思想:**
- **Inbox** - 咀嚼の場所（情報を自分の言葉にする）
- **Template** - 再利用のため
- **Archive** - 完成品（編集ロック）
- **Trash** - 削除待ち
- **System** - ガイド（読み取り専用、編集・移動・削除不可）

「整理」ではなく「Move」（移動）。
決まった場所に置くだけ。深く考えない。

> 実装: Issue #84で「カスタムフォルダ作成機能の削除」を実施。
> 既存カスタムフォルダは自動的にInboxに移行される。

### 「情報フロー」（Entry → Work → Move → Exit）

ツールバーは情報の流れを反映（Issue #84、Phase 47で再編成）：

```
ツールバーの構成:
[Notes] [Import] [Paste] | [Undo] [Redo] | [Move] [Source Control] | [Export] [Copy]
   ↓         ↓               ↓                    ↓                       ↓
 Entry     Entry           Work                Move                     Exit
```

- **Entry**: 情報の入り口（Notes, Import, Paste）
- **Work**: 編集作業（Undo, Redo）
- **Move**: フォルダ間移動 + Git同期（Move, Source Control）
- **Exit**: 出口（Export, Copy）- 他ツールへ「卒業」

**「出口は選ばない」**: Markdownはどこにでも持っていける。
特定のツールに閉じ込めない。

### 設計原則

> 「複雑さは技術の敵である」
> 「機能の膨張は製品の死を意味する」

機能を追加する前に、既存の機能で代用できないか考える。
できるなら追加しない。

## 技術スタック

- **フレームワーク**: Preact（軽量React互換、約3KB）
- **エディタ**: Milkdown Crepe（ProseMirror + CodeMirror統合のWYSIWYGエディタ）
- **状態管理**: Zustand
- **スタイリング**: Tailwind CSS + Notion風カラーパレット
- **ダイアグラム**: Mermaid.js (DOMPurifyでサニタイズ)
- **i18n**: Chrome i18n API（英語/日本語対応）
- **ビルド**: Vite
- **言語**: TypeScript
- **テスト**: Vitest（150テスト）
- **プラットフォーム**: Chrome拡張機能（Manifest V3）

## プロジェクト構造

```
├── src/
│   ├── index.tsx        # New Tab エントリーポイント
│   ├── sidepanel-index.tsx  # Side Panel エントリーポイント
│   ├── app.tsx          # メインApp（viewMode: 'newtab' | 'sidepanel'）
│   ├── components/      # UI コンポーネント
│   │   ├── Editor.tsx   # Milkdown Crepe + カスタムペーストプラグイン
│   │   ├── ActivityBar.tsx  # Notes ボタン（Entry グループ）- ツールバー左端
│   │   ├── Sidebar.tsx  # ノート一覧 + Git Section
│   │   └── ...
│   ├── stores/          # Zustand 状態管理
│   ├── utils/           # storage, export, git (AES-GCM暗号化)
│   └── styles/          # Tailwind CSS + Notion theme + compact-mode
├── newtab.html          # New Tab HTML
├── sidepanel.html       # Side Panel HTML
├── public/
│   ├── manifest.json    # Chrome Extension設定
│   ├── background.js    # Service Worker
│   ├── icons/           # PNG 16/48/128
│   └── _locales/        # i18n翻訳ファイル
│       ├── en/messages.json  # 英語
│       └── ja/messages.json  # 日本語
├── site/                # GitHub Pages用サイト
└── dist/                # ビルド出力（Chrome拡張として読み込み）
```

## 開発コマンド

```bash
npm install          # 依存関係インストール
npm run dev          # 開発ビルド（ウォッチモード）
npm run build        # プロダクションビルド
npm run lint         # ESLintチェック
npm run type-check   # TypeScript型チェック
npm test             # テスト実行
```

## キーボードショートカット

ブラウザのデフォルトショートカットと衝突しないように設計：

| 機能 | ショートカット |
|------|------------|
| 新規ノート作成 | `Alt+N` |
| クイック検索 | `Ctrl+K` |
| サイドバー切り替え | `Ctrl+Shift+D` |
| Git同期 (Commit & Sync) | `Ctrl+Shift+S` |
| Zenモード切替 (New Tabのみ) | `F11` / `Ctrl+Shift+Z` |
| Zenモード解除 | `Escape` |
| Pin/Unpin（フォルダ内ピン留め切替） | `Alt+P` |
| Templateへ移動 | `Alt+T` |
| Archiveへ移動 | `Alt+A` |
| Trashへ移動 | `Alt+X` |

## 重要な技術的決定（概要）

詳細は [`doc/technical-decisions.md`](doc/technical-decisions.md) を参照。

### データモデル

```typescript
interface Note {
  id: string
  title: string
  content: string
  folderId: string
  createdAt: number
  updatedAt: number
  contentUpdatedAt: number  // Git変更検知用（コンテンツ変更時のみ更新）
  isPinned: boolean         // フォルダ内ピン留め
  isDeleted: boolean
  order: number
  lastPushedPath?: string   // ファイル追跡用（Phase 19で追加）
  lastConflictResolvedAt?: number  // 競合解決時のタイムスタンプ（Phase 43, 再検知防止用）
}

interface Settings {
  theme: 'dark' | 'light' | 'system'
  sidebarCollapsed: boolean  // 非推奨: activeTabを使用（後方互換性のため保持）
  sidebarWidth?: number
  editorFontSize: number
  gitConfig?: GitConfig
  onboardingCompleted?: boolean
  lastPushTime?: number
  gitSectionExpanded?: boolean
  zenMode?: boolean
  folderSortOrder?: 'name' | 'updated'
  autoPair?: boolean  // 括弧・引用符の自動補完（Phase 39）
  systemFolderVisible?: boolean  // Systemフォルダ表示/非表示（Issue #102）
  pendingSystemNoteDeletions?: string[]  // 古いシステムノートパス削除キュー（Phase 42）
  activeTab?: 'notes' | 'git' | null  // Activity Barのピン留めタブ（Phase 46）
}
```

### Git同期

- **ローカルファースト**: `chrome.storage.local`への自動保存（500msデバウンス）
- **Commit & Sync**: 真の同期（Commit → Pull → 競合解決 → Push）
- **変更検知**: `contentUpdatedAt > lastPushTime` でコンテンツ変更のみを検知
- **バッチコミット**: Git Trees API（GitHub）/ Commits API（GitLab）で1コミットに統合
- **Pull通知**: 現在開いているノートが更新された場合、自動反映またはコンフリクト解決
- **ファイル追跡**: `lastPushedPath`でフォルダ移動・タイトル変更時の古いファイルを自動削除
- **リモート削除**: Trashに移動したノートのリモートファイルを自動削除（Issue #83）
- **フェイルセーフ削除**: 同期済みノートは3段階（Trash→Sync→完全削除）、未同期は2段階
- **Discard Changes**: リモートの最後のPush時点に戻す（ローカル変更を破棄）
- **Open Changes (Diff)**: ローカルとリモートのside-by-side比較
- **Commit History**: 最新20件のコミット履歴を表示
- **競合解決**: 精度向上とUX改善（Phase 43）
  - コンテンツ正規化（CRLF→LF統一、空白削除）で誤検知を排除
  - ゼロ差分時は自動解決UIを表示（緑バナー + ワンクリック解決）
  - ファイル識別検証（タイトル照合）で誤比較を防止
  - 2秒デバウンス + 操作ロックで連続同期の失敗を防止
  - 解決済み競合の5分間グレースピリオドで再出現を防止
  - リスクレベルインジケーター（Low/Medium/High/Critical）
  - Myers差分アルゴリズムで正確な行単位比較
  - side-by-side比較、TOCナビゲーション、スクロール同期
- **削除通知**: リモートから削除されたファイルをトースト通知で表示
- **システムノート**: 新規作成・更新は除外、Trash移動時は削除可能（Phase 42）
- **自動クリーンアップ**: アップグレード時に古いシステムノートパスを自動削除（Phase 42）
- **フォルダ/ピン留め同期**: フロントマターでピン留め状態を保存、フォルダ変更も競合として検出（Phase 45）

詳細なフローチャートは [`doc/git-sync-flowchart.md`](doc/git-sync-flowchart.md) を参照。

### ストレージ

- `chrome.storage.local` + `unlimitedStorage`権限
- ブラウザキャッシュ削除 → データは保持される
- 拡張機能アンインストール → データは消去される

### セキュリティ

- Web Crypto API (PBKDF2 + AES-GCM) でGitトークン暗号化

## 開発ワークフロー

### セッション開始時

1. `gh run list --limit 5` でGitHub Actionsの最新状況を確認
2. 失敗しているワークフローがあれば優先対応
3. `npm run build` でビルド確認
4. `doc/implementation-history.md` で最新の設計判断を確認

### セッション終了時

1. 重要な判断を `doc/implementation-history.md` に追記
2. 必要に応じてREADME.mdを更新

## 参考資料

### プロジェクトドキュメント

| ファイル | 内容 |
|----------|------|
| [`doc/CONTRIBUTING.md`](doc/CONTRIBUTING.md) | コントリビューションガイド |
| [`doc/technical-decisions.md`](doc/technical-decisions.md) | 技術的決定の詳細 |
| [`doc/implementation-history.md`](doc/implementation-history.md) | 実装履歴 + 設計判断 |
| [`doc/mark-it-down-spec.md`](doc/mark-it-down-spec.md) | PRD（製品要求仕様書） |
| [`doc/competitor-analysis.md`](doc/competitor-analysis.md) | 競合比較表 |
| [`doc/development-setup.md`](doc/development-setup.md) | 開発環境セットアップ |
| [`doc/milkdown-technical-report.md`](doc/milkdown-technical-report.md) | Milkdown技術レポート |

### 外部リンク

- Milkdown Crepe: https://milkdown.dev/docs/guide/using-crepe
- Chrome Extension MV3: https://developer.chrome.com/docs/extensions/mv3/
- Mermaid.js: https://mermaid.js.org/

## ドキュメント一貫性の維持

ドキュメントを更新する際は、以下のファイルの一貫性を確認：

| ファイル | 対象 | 内容 |
|----------|------|------|
| `README.md` | 外部向け | インストール、使い方、機能紹介 |
| `CLAUDE.md` | AI/開発者 | 技術仕様、設計判断（簡潔に） |
| `doc/technical-decisions.md` | 開発者 | 技術的決定の詳細 |
| `doc/implementation-history.md` | 開発者 | 実装内容 + 技術的判断の履歴 |
| `src/components/HelpDropdown.tsx` | ユーザー | クイックリファレンス（オーバーレイ形式） |
| `src/utils/systemNotes.ts` | ユーザー | システムノート（3つのガイド） |

### システムノート構成（情報フロー哲学）

| ID | 名称 | 対応フェーズ | 内容 |
|----|------|-------------|------|
| `system-manual` | はじめに | Entry | 設計思想、2つのモード、情報の取り込み方法 |
| `system-data-guide` | 編集ガイド | Work | Markdown記法、ショートカット、編集のヒント |
| `system-note-guide` | 整理と同期 | Move/Exit | 定位置管理、自動保存、Git同期、卒業 |

> 2025-12-25: Issue #89で情報フロー哲学（Entry → Work → Move → Exit）に沿って再構成
> 2025-12-26: 各フェーズの選択肢を可視化するMermaid図を追加
> - Work: 基本編集/Undo/Redo/高度な入力の3カテゴリ
> - Move: "Inboxに残す"を明示的な選択肢として追加
> - Exit: Export/Copy/Git Syncの3つの卒業経路

### 更新時のチェックリスト

- [ ] 機能追加・変更時、該当するドキュメントを更新したか？
- [ ] キーボードショートカット変更時、Help/systemNotes/READMEを更新したか？
- [ ] 重要な設計判断をしたか？ → `doc/implementation-history.md`に追記
