---
title: チェンジログ
date:
tags: [changelog, release, versioning]
---

![開発](https://img.shields.io/badge/%E9%96%8B%E7%99%BA-blue) ![チェンジログ](https://img.shields.io/badge/%E3%83%81%E3%82%A7%E3%83%B3%E3%82%B8%E3%83%AD%E3%82%B0-grey)

# チェンジログ

> [!TIP]
> 新しいバージョンを上に追加してください。`Ctrl+;` で今日の日付を挿入。
> `Ctrl+Shift+P` でスニペットにアクセスし、一貫したフォーマットを維持。

> [!NOTE]
> このチェンジログは [Keep a Changelog](https://keepachangelog.com/) の規約に従っています。日付はすべてISO 8601形式（YYYY-MM-DD）を使用。

---

## リリースブランチモデル

> *全体像 ― 不要なら削除してください。*

```mermaid
gitGraph
    commit id: "v1.0.0"
    branch develop
    commit id: "feat: Xを追加"
    commit id: "fix: Yを修正"
    checkout main
    merge develop id: "v1.1.0" tag: "v1.1.0"
    branch develop2
    commit id: "feat: Zを追加"
    checkout main
    merge develop2 id: "v1.2.0" tag: "v1.2.0"
```

## [未リリース]

### 追加

- [新機能や新しい機能]

### 変更

- [既存機能への修正]

## [1.1.0] - 2026-03-15

### 追加

- すべてのページで**ダークモード**をサポート
- ダッシュボードビューからCSVエクスポート
- 認証エンドポイントにレート制限を追加

### 変更

- Node.jsの要件を18から20にアップグレード

### 修正

- ページ境界でページネーションが重複エントリを返す問題
- WebSocket接続ハンドラのメモリリーク

## [1.0.1] - [リリース日]

### 修正

- [バグ修正の説明]
- [バグ修正の説明]

## [1.0.0] - [リリース日]

### 追加

- [初期機能]
- [初期機能]
- [初期機能]

### 変更

- [マイグレーションまたは破壊的変更の説明]

### 削除

- [削除された非推奨機能]

---

*Mark It Downで作成*
