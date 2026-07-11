# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Overview

This is the **GitHub Pages website** for Mark It Down (Chrome extension Markdown editor).

The `ref/` folder contains the **source app documentation** (gitignore対象、ローカルのみ). Use `ref/README.md` as the authoritative source for app features and specifications.

SEO キーワードの正本: `chorme_mark-it-down` リポジトリの `doc/technical-decisions/seo-keyword-map.md`（title / meta description / h1 を変更する前に必ず照合する）。

---

## Project Structure

```
docs/                    # GitHub Pages site (deployed)
├── index.html / index-ja.html           # Landing page
├── features.html / features-ja.html     # Features
├── changelog.html / changelog-ja.html   # Release notes
├── faq.html / faq-ja.html               # FAQ
├── troubleshooting.html / troubleshooting-ja.html
├── feedback.html / feedback-ja.html
├── privacy-policy.html / privacy-policy-ja.html
├── style.src.css                        # Shared styles, readable source (edit this)
└── style.css                            # Shared styles, generated/minified (deployed; do not hand-edit)

ref/                     # Source app docs (gitignore, local only)
├── README.md            # App README - authoritative source
├── release-notes-v*.md  # Detailed release notes per version
└── screenshot/          # Store screenshots
```

---

## Key Conventions

### Bilingual Pages
Every page has English (`*.html`) and Japanese (`*-ja.html`). **Always update both**.

### Version Updates
When releasing a new version:
1. `index.html` / `index-ja.html`: Update "Coming in vX.X.X" section
2. `changelog.html` / `changelog-ja.html`: Add new version (Under Review), change previous to "Released"
3. `index.html` / `index-ja.html`: Update `"softwareVersion"` and `"dateModified"` in the JSON-LD `<script type="application/ld+json">` block
4. `sitemap.xml`: Update `<lastmod>` for changed pages

### Design System

デザイン言語の正本はルート [`DESIGN.md`](DESIGN.md)（**Manuscript & Ink**、2026-07-11 策定、chorme_mark-it-down#1593）。トークン・タイポグラフィ・Do/Don't はすべてそちらを参照。

- 現行サイトは旧デザイン（Notion風クリーム + Glassmorphism Accordion）のまま。#1593 の Next.js 再構築で DESIGN.md 準拠に置き換える
- **旧クリーム `#f2ede4` と Glassmorphism は新規使用禁止**（DESIGN.md §8）
- アコーディオンは CSS-only `<details>` を維持（archival index スタイルへ移行予定）

### Redesign In Progress (#1593)

確定済みの技術方針（詳細は chorme_mark-it-down#1593 本文）:

- Next.js 15（App Router / SSG static export）+ Tailwind CSS + shadcn/ui + Framer Motion。3D 系ライブラリ禁止
- 既存 URL 構造（フラット `.html`）と CNAME / Pages 設定を維持（`trailingSlash: false`）
- デプロイ: ローカル `next build` → `docs/` 同期コミット（現行運用のまま）
- SEO パリティゲート: title / meta / h1 / hreflang / sitemap の新旧自動 diff 必須
- Lighthouse Performance / Accessibility を改善前ベースライン以上に維持
- 外部 CDN 禁止（フォント・スクリプト・画像のセルフホスト）

### CSS Workflow
- Edit `docs/style.src.css` (readable source). Never hand-edit `docs/style.css` — it's generated.
- Regenerate after editing: `npx --yes clean-css-cli docs/style.src.css -o docs/style.css`
- Commit both files together.

---

## Agent Teams 運用ガイドライン

### 使用判断
- **バイリンガル一括更新**（英語+日本語の同時編集）: Teammate推奨
- **単一ページの軽微な修正**: Subagentで十分
- **リリース更新**（4ファイル同時変更）: Teammate推奨

### チーム運用原則
- 各Teammateが異なるファイルセットを所有（**同一ファイルの並行編集禁止**）
- 1 Teammate あたり 5-6 タスクを目安に分割
- Teammateモデルは `sonnet` を使用（コスト管理）
- 作業完了後は速やかにシャットダウン（アイドル状態でもトークン消費が継続）

### ファイル所有権の分割例
```
リリース更新チーム:
  Teammate-EN: index.html, changelog.html, features.html
  Teammate-JA: index-ja.html, changelog-ja.html, features-ja.html
  Leader: style.css（共有リソース）, レビュー・統合
```

### プラン承認基準
- バイリンガルの整合性（EN/JAの内容が対応していること）を確認
- デザインは `DESIGN.md`（Manuscript & Ink）準拠を確認
- 同一ファイルの並行編集を含むプランは拒否

### タスク完了基準
- タスク完了時は必ずステータスを completed に更新
- 成果物の概要をリーダーにメッセージで報告
- EN/JAの両方が更新されていることを確認

---

## Deployment

GitHub Pages from `/docs` on `main` branch.
URL: `https://markitdown.reduktion.dev/`
