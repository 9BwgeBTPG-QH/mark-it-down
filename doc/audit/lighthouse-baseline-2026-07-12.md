# Lighthouse Baseline — 2026-07-12（#1593 Manuscript & Ink リデザイン後）

計測条件: 2026-07-11 版と同一（`npx --yes lighthouse <本番URL> --only-categories=performance,accessibility,seo --output=json --chrome-flags="--headless --no-sandbox"`、WSL2 では `CHROME_PATH=/opt/google/chrome/chrome` 必須）。デプロイ commit `d59ca99`（GA 復活 + a11y 修正 + hero fetchPriority 込み）に対して本番 URL で計測。

## 結果（本番、index は 5 回計測の中央値）

| ページ | Performance | Accessibility | SEO | 旧ゲート (2026-07-11) | 判定 |
|---|---|---|---|---|---|
| /index.html | 97（中央値、range 78-99） | 100 | 100 | 87 / 96 | PASS |
| /features.html | 98 | 100 | 100 | 89 / 100 | PASS |
| /clipper.html | 97 | 100 | 100 | 89 / 96 | PASS |
| /rss.html | 99（3 回とも 99） | 100 | 100 | 100 / 96 | Perf **-1**（既知、下記） |

## 計測メモ

- **TTFB 二峰性**: index の 5 回計測は Perf 78 / 97 / 98 / 78 / 99。78 の回は root document TTFB が ~160ms（Fastly edge revalidation）、97+ の回は 5-6ms（edge HIT）。Lighthouse の simulated throttling が TTFB を増幅し LCP 2.1s ↔ 4.7s に割れる。**サイト実装ではなく CDN キャッシュ状態起因**。旧サイト計測（単発）も同じ変動に晒されていた。ゲート比較は複数回計測の中央値で行うこと
- **rss 99 vs 旧 100**: React hydration（First Load JS ~102KB gzip）の TBT ~100ms による。#1593 で採用した Next.js スタックの固有コストで、1pt は許容と判断（index は旧 87 → 97 に改善、全ページ A11y 100）
- **A11y 100 達成**: 旧サイトの index 96 は color-contrast 起因。新サイトは全 4 ページ 100（SiteNav checkbox の aria-hidden 除去 `3b879df` 後）
- gtag.js は旧サイト（head 同期 async）から `next/script` afterInteractive に変更され、TBT が改善している（gzip 同条件 A/B で旧 index TBT 330ms → 新 80ms）

## ゲート値（次回リリースで下回らないこと）

Performance: index 97 / features 98 / clipper 97 / rss 99（複数回中央値・edge HIT 時）。
Accessibility: 全ページ 100。

## 同時更新

- SEO parity baseline も本日再生成: `seo-baseline-2026-07-12.json`（リデザイン後の canonical / og:image 全ページ付与 / ZWSP 除去を含む現行正）。以後のリリースはこちらと比較する
