# Lighthouse Baseline — 2026-07-12（#1593 オリジナルデザイン回帰後）

計測条件: 従来と同一（`npx --yes lighthouse <本番URL> --only-categories=performance,accessibility,seo --output=json --chrome-flags="--headless --no-sandbox"`、WSL2 では `CHROME_PATH=/opt/google/chrome/chrome`）。デプロイ commit `dc93827`（eed65be デザイン完全忠実回帰 + LangRedirect + M&I 残骸削除）に対して本番 URL で計測。

## 結果（本番）

| ページ | Performance | Accessibility | SEO | 旧静的 (2026-07-11) | M&I (2026-07-12) | 判定 |
|---|---|---|---|---|---|---|
| /index.html | 89（5回中央値、range 66-96） | 96 | 100 | 87 / 96 | 97 / 100 | 下記分類 |
| /features.html | 93（単発） | 100 | 100 | 89 / 100 | 98 / 100 | PASS（旧静的比） |
| /clipper.html | 99（単発） | 96 | 100 | 89 / 96 | 97 / 100 | PASS |
| /rss.html | 99（3回中央値、79/99/99） | 96 | 100 | 100 / 96 | 99 / 100 | PASS |

## 退行の原因分類（DESIGN.md「移行中の注意」所定の切り分け）

- **Accessibility 100 → 96（index/clipper/rss）: デザイン起因・想定内**。ローカル検証で eed65be 旧静的サイトと**同一の fail セレクタ**（`.hero-ornament` / `.hero-fact` / `.footer-brand span` の color-contrast）を確認済み。オリジナルデザインの装飾要素固有のコントラストで、実装退行ではない。旧静的サイト自身の実測（96）と完全パリティ。features は該当要素が無く 100。`label-content-name-mismatch` も検出されるが weight 0 でスコア影響なし
- **Performance index 97(M&I) → 89: デザイン起因が主**。①render-blocking CSS が M&I のページ分割 Tailwind ~4KB gz から original.css 一枚岩 13KB gz へ増加（style.src.css 丸ごと移植 = ピクセル忠実性担保の採用方針そのもの）②旧デザイン index の重いマークアップ（Marp スライド iframe 等、iframe は loading="lazy"）。**同一デザインの旧静的サイト実測 87 は上回っており（+2）**、gtag の afterInteractive 化・next/font 等の基盤改善は維持されている
- **TTFB 二峰性は継続**（index range 66-96、rss 79→99/99）。Fastly edge revalidation 起因、従来どおり複数回中央値で判定

## ゲート値（次回リリースで下回らないこと・複数回中央値）

Performance: index 89 / features 93 / clipper 99 / rss 99。
Accessibility: index/clipper/rss 96・features 100（オリジナルデザイン維持中はこの値がパリティ基準。デザイン装飾のコントラストを変更する場合は忠実性方針とセットで再判断）。
SEO: 全ページ 100。

## 同時確認（同デプロイ）

- SEO パリティ: 全26ページ title / description / canonical / h1 が `seo-baseline-2026-07-12.json` と diff 0
- 言語自動リダイレクト + langOverride（eed65be から復元、`components/LangRedirect.tsx`）: 本番 URL に対する Playwright 7 シナリオ全 PASS（EN⇄JA 双方向 / override 残留 / switcher click）
