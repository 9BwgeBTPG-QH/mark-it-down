# Lighthouse Baseline — 2026-07-11

計測条件: `npx --yes lighthouse <url> --only-categories=performance,accessibility,seo --output=json --chrome-flags="--headless --no-sandbox"`。WSL2 環境では既定の Chrome 自動検出が Windows 側 Chrome を掴んで `ECONNREFUSED` になったため、`CHROME_PATH=/opt/google/chrome/chrome`（WSL2 内 Linux ネイティブ Chrome）を明示指定して回避した。

## 結果

| ページ | Performance | Accessibility | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|
| /index.html | 87 | 96 | 100 | 3.9 s | 0 | 120 ms |
| /features.html | 89 | 100 | 100 | 3.8 s | 0 | 80 ms |
| /clipper.html | 89 | 96 | 100 | 3.7 s | 0 | 50 ms |
| /rss.html | 100 | 96 | 100 | 1.4 s | 0 | 60 ms |

## 計測メモ

- /index.html, /features.html: 2026-07-11 初回計測。
- /clipper.html, /rss.html: 初回計測時は `eed65be` 未push のため本番 404 で実行不可だった。push 後（Pages 反映確認: HTTP 200）に同条件で再計測し追記（2026-07-11）。

## ゲート値（Phase 4 で下回らないこと）

Performance: index 87 / features 89 / clipper 89 / rss 100。Accessibility: index 96 / features 100 / clipper 96 / rss 96。
