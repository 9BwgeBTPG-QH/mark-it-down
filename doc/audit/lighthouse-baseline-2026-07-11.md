# Lighthouse Baseline — 2026-07-11

計測条件: `npx --yes lighthouse <url> --only-categories=performance,accessibility,seo --output=json --chrome-flags="--headless --no-sandbox"`。WSL2 環境では既定の Chrome 自動検出が Windows 側 Chrome を掴んで `ECONNREFUSED` になったため、`CHROME_PATH=/opt/google/chrome/chrome`（WSL2 内 Linux ネイティブ Chrome）を明示指定して回避した。

## 結果

| ページ | Performance | Accessibility | SEO | LCP | CLS | TBT |
|---|---|---|---|---|---|---|
| /index.html | 87 | 96 | 100 | 3.9 s | 0 | 120 ms |
| /features.html | 89 | 100 | 100 | 3.8 s | 0 | 80 ms |
| /clipper.html | 実行不可 | — | — | — | — | — |
| /rss.html | 実行不可 | — | — | — | — | — |

## /clipper.html, /rss.html が実行不可だった理由

本番 URL (`https://markitdown.reduktion.dev/clipper.html`, `.../rss.html`) が **HTTP 404** を返すため Lighthouse がページロードに失敗した（`curl -o /dev/null -w "%{http_code}"` で確認済み）。

原因: ローカル `docs/clipper.html` / `docs/rss.html` は直近コミット `eed65be`（"feat(site): SEO keyword audit — page-specific title/meta/h1, clipper/rss landing pages (#1583, #1586, #1587)"）で新規追加されたページだが、この1コミットは `origin/main` に対して未push（`git log origin/main..HEAD` で確認）。GitHub Pages は `origin/main` から配信されるため、このページ群はまだ本番に存在しない。

対応方針（提案、未実施）: このコミットを push すれば本番に反映されるため、その後に再計測すれば4ページ揃う。今回はコミットしない指示のため push もしていない。
