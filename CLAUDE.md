# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Overview

This is the **GitHub Pages website** for Mark It Down (Chrome extension Markdown editor).

The `ref/` folder contains the **source app documentation** (gitignore対象、ローカルのみ). Use `ref/README.md` as the authoritative source for app features and specifications.

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
└── style.css                            # Shared styles

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

### Design System
- **Glassmorphism Accordion**: All content pages (Features, Changelog, FAQ, Troubleshooting) use CSS-only `<details>` accordions. No JavaScript required.
- **Color Palette**: Notion-style warm palette
- **Icons**: Emoji + SVG (e.g., Git official logo)

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
- 既存デザインシステム（Glassmorphism Accordion）を維持
- 同一ファイルの並行編集を含むプランは拒否

### タスク完了基準
- タスク完了時は必ずステータスを completed に更新
- 成果物の概要をリーダーにメッセージで報告
- EN/JAの両方が更新されていることを確認

---

## Deployment

GitHub Pages from `/docs` on `main` branch.
URL: `https://9bwgebptg-qh.github.io/mark-it-down/`
