# Mark It Down - Website

Mark It Down の紹介サイト（GitHub Pages）

## サイト構成

| ページ | 英語 | 日本語 | デザイン |
|--------|------|--------|----------|
| ランディング | [index.html](docs/index.html) | [index-ja.html](docs/index-ja.html) | Hero + Philosophy |
| 機能一覧 | [features.html](docs/features.html) | [features-ja.html](docs/features-ja.html) | アコーディオン |
| 更新履歴 | [changelog.html](docs/changelog.html) | [changelog-ja.html](docs/changelog-ja.html) | アコーディオン |
| よくある質問 | [faq.html](docs/faq.html) | [faq-ja.html](docs/faq-ja.html) | アコーディオン |
| トラブルシューティング | [troubleshooting.html](docs/troubleshooting.html) | [troubleshooting-ja.html](docs/troubleshooting-ja.html) | アコーディオン |
| フィードバック | [feedback.html](docs/feedback.html) | [feedback-ja.html](docs/feedback-ja.html) | フォーム |
| プライバシーポリシー | [privacy-policy.html](docs/privacy-policy.html) | [privacy-policy-ja.html](docs/privacy-policy-ja.html) | テキスト |

## デザインシステム

- **アコーディオン**: Glassmorphism + CSS-only `<details>` (JavaScript不要)
- **カラー**: Notion風ウォームパレット
- **アイコン**: 絵文字 + SVG (Git公式ロゴなど)

## 公開URL

https://9bwgebptg-qh.github.io/mark-it-down/

## デプロイ

GitHub Pages で `main` ブランチの `/docs` フォルダから自動デプロイ。

## バージョン更新手順

新バージョンのリリース時：

1. **index.html / index-ja.html**
   - 「Coming in vX.X.X」セクションを新バージョンに更新

2. **changelog.html / changelog-ja.html**
   - 新バージョンを「Under Review / 審査中」で追加
   - 前バージョンを「Released / リリース済」に変更

## 関連リンク

- [Chrome Web Store](https://chromewebstore.google.com/detail/mark-it-down/ibhjiobelalhjehbdbdejlohjnhbgfke)
- [GitHub Issues](https://github.com/9bwgebptg-qh/mark-it-down/issues)
