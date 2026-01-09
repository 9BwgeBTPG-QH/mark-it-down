# Mark It Down v1.6.0 Release Notes

**リリース日**: 2026-01-09  
**開発期間**: 2026-01-07 〜 2026-01-09（3日間）  
**実装Phase**: Phase 91 〜 Phase 103（13 Phases）

---

## 🎯 v1.6.0 ハイライト

### ⚡ Core Web Vitals合格 — 起動時間95%改善

バンドル最適化により、起動時間が劇的に改善しました。

| 指標 | v1.5.0 | v1.6.0 | 改善率 |
|------|--------|--------|--------|
| INP (Interaction to Next Paint) | 2,446 ms | 109 ms | **-95.5%** |
| 初期バンドル（gzip） | 698 KB | 84 KB | **-88%** |
| 起動時間 | 1秒 | 0.1秒 | **-90%** |
| Google評価 | ❌ FAIL | ✅ **PASS** | - |

**最適化内容**:
- Mermaid遅延ロード（2.3MBを必要時のみロード）
- コード分割（vendor-milkdown, vendor-prosemirror等）
- Bundle Analyzer導入（dist/stats.html）

### 🎹 Command Palette — 50+コマンドに即アクセス

VS Code風のCommand Paletteを実装。`Ctrl+Shift+P` で全コマンドを検索・実行。

- **50+コマンド**を1箇所に集約
- **インクリメンタル検索** — コマンド名、説明、キーワード、ショートカットで検索
- **8カテゴリ分類** — Entry, Work, Move, Git, Exit, View, Settings, Help
- **キーボード完結** — マウス不要で全操作可能

### 📖 Archive軽量レンダラー — 70%高速化

Archiveノートの表示にProseMirrorをバイパスし、`marked`による静的HTMLレンダリングを採用。

| 指標 | v1.5.0 | v1.6.0 | 改善率 |
|------|--------|--------|--------|
| 100KB Archive読み込み | 3秒以上 | 1秒以下 | **-70%** |
| app.js サイズ | 1,350 KB | 372 KB | **-73%** |

**機能パリティ完全維持**: TOC連携、コードブロックコピー、Mermaid拡大、GitHub Alerts対応

### ✍️ Focus Mode — 書くことに集中

新しい集中執筆モードを追加。

- **3段階テキストdimming**: 現在の段落を強調、周辺は段階的に淡色化
- **タイプライタースクロール**: カーソルが常に画面中央
- **UI自動非表示**: 3秒後にツールバーが消え、マウス移動で復帰
- **ショートカット**: `Alt+F` でトグル

### 🔍 TOC大規模ドキュメント対応

100+見出しのドキュメントでもTOCが快適に。

- **階層折りたたみ**: h2をルートに、h3以下を折りたたみ（20見出し以上で自動有効）
- **TOC検索**: インクリメンタルフィルタリング（15見出し以上で表示）
- **キーボードナビゲーション**: PageUp/Down, Home/End
- **コードブロックバグ修正**: `#`が見出しと誤認識される問題を解消

---

## ✨ 新機能

### Command Palette（⭐ NEW）

| 機能 | 説明 |
|------|------|
| **50+コマンド統合** | Entry(8), Work(6), Move(6), Git(11), Exit(3), View(7), Settings(5), Help(4) |
| **インクリメンタル検索** | スペース区切りでAND検索、大文字小文字無視 |
| **キーボードナビゲーション** | Arrow Up/Down, Enter, Escape |
| **ショートカット表示** | コマンド横にキーボードショートカットを表示 |
| **カテゴリバッジ** | 色分けで視覚的にカテゴリ識別 |
| **条件付き実行** | ノート未選択時はMoveコマンド無効など |

### パフォーマンス

| 機能 | 説明 |
|------|------|
| **Mermaid遅延ロード** | Mermaid図を含まないノートでは2.3MBがロードされない |
| **コード分割** | vendor-milkdown, vendor-prosemirror等に分割、並列ロード |
| **ZIP並列インポート** | Promise.allSettledで並列抽出、API呼び出し90-98%削減 |
| **フォルダ変更最適化** | コンテンツ同一時は再マウントをスキップ |

### Focus Mode（集中執筆モード）

| 機能 | 説明 |
|------|------|
| **3段階dimming** | Focus Zone（通常）→ Intermediate（中間）→ Dimmed（淡色） |
| **タイプライタースクロール** | カーソルが常に画面中央に維持 |
| **UI自動非表示** | 3秒後にToolbarが消え、マウス/キー入力で復帰 |
| **Editing Badge** | Headerに「Editing」バッジ表示 |
| **Archive統合** | Archive移動時に自動無効化 |
| **100KB+対応** | 大規模ドキュメントではdimming無効（typewriter scrollは継続） |

### TOC改善

| 機能 | 説明 |
|------|------|
| **階層折りたたみ** | 20見出し以上で自動有効、デフォルトで最初の3つのh2を展開 |
| **TOC検索** | 15見出し以上で検索バー表示、位置表示（5/42形式） |
| **キーボードナビ** | PageUp/Down（前後移動）、Home/End（最初/最後） |
| **コンポーネント統合** | TOCDropdownを削除、21%コード削減 |

### 開発者向け

| 機能 | 説明 |
|------|------|
| **Git Hooks** | Pre-Push自動クリーンアップ（デバッグファイル削除） |
| **Bundle Analyzer** | `dist/stats.html`でバンドル構成を可視化 |
| **ドキュメント再編成** | archive/フォルダ構造の確立 |

---

## 🐛 バグ修正

### 重要な修正

| Issue | 問題 | 修正内容 |
|-------|------|----------|
| #132 | Sidebar検索でキーボードナビが効かない | Arrow Up/Down, Enter対応 |
| #131 | Sidebar検索結果の順序が不安定 | ソートロジック修正 |
| #133 | 初期ロード時に白画面 | ローディングスケルトン追加 |
| #136 | Focus Modeで文脈が見えない | 3段階dimmingに改善 |
| - | TOCがコードブロック内`#`を誤認識 | extractHeadingsFromMarkdown統一 |
| - | フォルダ変更で不要な再読み込み | コンテンツ比較チェック追加 |
| - | 競合解決モーダルの複数バグ | キーボードナビ、フォーカス管理改善 |

---

## ⚡ パフォーマンス改善サマリー

| 領域 | 改善内容 | 効果 |
|------|----------|------|
| **起動時間** | Mermaid遅延ロード + コード分割 | 95.5%高速化 |
| **Archive表示** | 軽量レンダラー（marked） | 70%高速化 |
| **ZIPインポート** | 並列抽出 + バッチ書き込み | API呼び出し98%削減 |
| **フォルダ変更** | 不要な再マウント防止 | 即座に反映 |
| **初期バンドル** | コード分割 | 88%削減 |

---

## ⌨️ 新しいキーボードショートカット

| ショートカット | 機能 |
|---------------|------|
| `Ctrl+Shift+P` | **Command Palette** ⭐ NEW |
| `Alt+F` | Focus Modeトグル |
| `PageUp` | TOC: 前の見出しへ |
| `PageDown` | TOC: 次の見出しへ |
| `Home` | TOC: 最初の見出しへ |
| `End` | TOC: 最後の見出しへ |
| `↑/↓` | Sidebar/TOC検索: 結果間移動 |
| `Enter` | 検索結果を選択/実行 |
| `Escape` | 検索/モーダルを閉じる |

---

## 📊 開発統計

| 指標 | v1.5.0 | v1.6.0 | 差分 |
|------|--------|--------|------|
| 累計Phase | 90 | 103 | +13 |
| 開発日数 | 21日 | 24日 | +3日 |
| テストケース | 150+ | 164+ | +14 |
| コマンド数 | - | 50+ | NEW |

---

## ⚠️ 既知の制限

### Focus Mode

- **100KB超のドキュメント**: dimmingが自動無効化（パフォーマンス優先）。タイプライタースクロールは継続
- **Archive**: Focus Modeは自動無効化（読み取り専用のため）

### Archive軽量レンダラー

- 編集機能なし（Inboxに戻すと通常エディタで編集可能）
- 一部のMilkdown固有機能は非対応（実用上問題なし）

---

## 🔄 アップグレードガイド

v1.5.0からのアップグレードに特別な操作は不要です。Chrome Web Storeから自動更新されます。

**新機能の使い方**:
1. **Command Palette**: `Ctrl+Shift+P` で開き、コマンドを検索
2. **Focus Mode**: `Alt+F` または Settings → Focus Mode をON
3. **TOC検索**: 15見出し以上のノートでTOCパネル上部に検索バーが表示
4. **TOC折りたたみ**: 20見出し以上で自動有効、▼/▶をクリックで展開/折りたたみ

---

## 🙏 謝辞

Mark It Down は以下のオープンソースプロジェクトを使用しています:

- [Milkdown](https://milkdown.dev/) - WYSIWYG markdown editor framework
- [marked](https://marked.js.org/) - Markdown parser (Archive軽量レンダラー)
- [highlight.js](https://highlightjs.org/) - Syntax highlighting
- [ProseMirror](https://prosemirror.net/) - Rich-text editor toolkit
- [Preact](https://preactjs.com/) - Fast 3kB React alternative

---

**Mark It Down** — 書くことに集中しよう。
