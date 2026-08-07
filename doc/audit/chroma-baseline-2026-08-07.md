# 有彩色ピクセル面積ベースライン — 2026-08-07

- Date: 2026-08-07
- 対象: `out/` ビルド成果物 14 ページ × EN/JA × light/dark × デスクトップ 1280px / モバイル 390px（モバイルは 6 ページのサンプル）= **80 行**
- 目的: 「サイト全体の有彩色を 5% 未満に抑える」運用の**出発点を一度だけ実測**する
- 位置づけ: **リリースゲートではない**。継続的な強制は `scripts/audit-chroma-budget.mjs`（allowlist + 面積上限の静的検査）が担う。本計測はそのゲートが守るべき水準を数値で固定するためのもの

---

## 結論

| 指標 | 最悪値 | ページ | 5% 超のページ数 |
|---|---|---|---|
| **ex-brand**（ヘッドライン） | **2.23%** | privacy-policy-en / dark / 1280px | **0 / 80** |
| ex-brand（分母も縮める読み） | 2.23% | 同上 | 0 / 80 |
| chrome-only（ブランド色も有彩に数える） | 6.14% | templates-en / dark / 1280px | 1 / 80 |

**ブランド基調色を除外した定義では、全 80 行が 5% 未満**（最大 2.23%）。

ブランド色を除外しない `chrome-only` では templates-en dark 1280px が **6.14%** で唯一 5% を超える。この 6.14% のうち **5.01 ポイントがブランド色そのもの**（dark の `--accent-primary` `#60a5fa`、OKLCH C = 0.143）で、`a.btn.btn-primary` 1 個と約 30 個の `button.copy-btn` の塗りである。light の同じページが 0.98% に留まるのは、同じボタンが茶系 ramp `#6b4e37`（C = 0.053）で塗られ閾値 0.07 を超えないため。**この 1 行を伏せない**ために chrome-only 列を全行併記している。

---

## 有彩色の定義（合意事項）

- **合成後 OKLCH chroma ≥ 0.07 を有彩とする**。alpha 付きトークンは背景に合成された後の値で判定する
- **ブランド基調色は除外する**（light の Coffee Brown ramp / dark の青アクセント / neutral 群）

### 分母の扱い — 合意文言からの逸脱を明記する

合意は「分母・分子の**双方**から除外」だった。本計測のヘッドライン `ex-brand` は**分子からのみ**除外し、分母はページ全面のままにしている。理由:

ピクセル単位では「双方から除外」が実装できない。ブランド色の**閾値未満**のピクセルは、ページ背景と区別が付かない。ブランド判定に使うブレンド線分の遠端がまさに背景色だからである（アンチエイリアス縁はブランド色と背景色の内分点なので、そこを辿ることでしかブランド面を認識できない）。「全ブランドピクセルを引く」と背景ごと分母から消える。

一方、閾値を超えたブランドピクセルだけを分母から引くと、**dark では発火し light では一度も発火しない**（青 C = 0.143 / 茶 C = 0.053）。同じ `.copy-btn` に対してテーマごとに違う分母が立ち、テーマ間の比較が成り立たなくなる。この欠陥は本計測の v1 実装に実際に存在し、レビューで指摘されて修正した。

そこで:

- `ex-brand`（ヘッドライン）= (有彩ピクセル − ブランドピクセル) ÷ ページ全ピクセル。**両テーマが同一の量を測る**
- `ex-brand reduced`（文言どおりの読み）= (有彩ピクセル − ブランドピクセル) ÷ (ページ全ピクセル − ブランドピクセル)。JSON の `chromeExBrandReduced` に格納

**両方を報告し、どちらか一方を他方の代用にしない。** 実測では両者の差は最大 0.02 ポイント（brand 面積が小さいため）で、判定は変わらない。読者が下表の `brand %` から `ex-brand ÷ (1 − brand/100)` で reduced 値を再構成することもできる。

### ブランド面の判定方法

アンチエイリアス縁はブランド色と隣接色の凸結合なので、「ブランド anchor と blend partner を結ぶ線分からの距離が `BRAND_TOLERANCE` 以内」をブランドとみなす。色相帯で判定すると別系統の青まで巻き込むため、線分距離で判定している。

| scheme | anchors | partners |
|---|---|---|
| light | `#6b4e37` `#5a4030` | `#f2ede4` `#ebe6dc` `#faf7f2` `#ffffff` |
| dark | `#60a5fa` `#8bc0ff` | `#0a0a09` `#131312` `#15151a` `#07111e` `#ffffff` |

- `#ffffff` は **partner であって anchor ではない**。アクセント塗りのボタン上に白文字が乗るため、その縁がアクセント→白に走る。これを入れないと実測ブレンド `#6eadfa` / `#79b3fa` が独立色として数えられる
- `BRAND_TOLERANCE = 5`（sRGB 単位）。8 では `--syntax-string` `#a5d6ff`（アクセント→白の線分から 8 単位）まで除外されてしまう。5 が両者を分ける最も狭い値
- 13 色プローブで検証済み。除外される: `#60a5fa` `#6eadfa` `#79b3fa` `#8bc0ff` `#60a5f3` `#2f5279`。除外されない: `#a5d6ff` `#2b80ec` `#1d3e6e` `#0f766e` `#7ee787` `#ffa657` `#562811` `#b45309`

---

## 計測条件

| 項目 | 値 |
|---|---|
| 閾値 | OKLCH C ≥ 0.07（sRGB → linear → LMS 立方根 → OKLab a,b → hypot） |
| ビューポート | 1280×900 / 390×900、`deviceScaleFactor: 1` |
| スクリーンショット | `fullPage: true`、PNG、`sharp().removeAlpha().raw()` |
| テーマ | Playwright `colorScheme`（サイトは system preference のみで切替） |
| モーション | `reducedMotion: 'reduce'` — scroll reveal の途中 opacity を混ぜないため |
| フォント | `document.fonts.ready` 待ち |
| スクロール | `innerHeight` 刻みで最下部まで送り 60ms ずつ待機 → 先頭に戻す（lazy 要素を出現させる） |
| 画像待ち | 未完了画像を **最大 2000ms** で打ち切り。視界外に戻った lazy 画像は load も error も発火せず無制限待ちがハングするため。打ち切られた画像は空白＝無彩色として数えられる |
| 外部ホスト | `--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost` で DNS を落とす。googletagmanager がオフネットワークで解決せず `networkidle` が 1 ページ約 12 分ハングしたため。解析タグは何も描画しないので測定値には影響しない |
| ラスター媒体 | `img` / `video` / `picture` / `canvas` と `background-image: url(...)`（data: SVG を除く）の矩形を**マスクして除外**。運用ルールはサイト自身のクロームについてのもので、スクリーンショットの中身の色ではない。SVG の `img` はマスクしない。マスク率は最大 3.13% |

---

## 結果（全 80 行）

`ex-brand` = ヘッドライン、`chrome-only` = ブランド色も有彩に数えた値、`brand` = ブランド色の占有率。すべてラスター媒体を除いた面積比。

#### light / 1280px

| ページ | ex-brand % | chrome-only % | brand % |
|---|---|---|---|
| index-en | 0.23 | 0.23 | 0.00 |
| index-ja | 0.16 | 0.16 | 0.00 |
| features-en | 0.34 | 0.34 | 0.00 |
| features-ja | 0.24 | 0.24 | 0.00 |
| clipper-en | 0.08 | 0.08 | 0.00 |
| clipper-ja | 0.09 | 0.09 | 0.00 |
| rss-en | 0.09 | 0.09 | 0.00 |
| rss-ja | 0.08 | 0.08 | 0.00 |
| okf-en | 0.07 | 0.07 | 0.00 |
| okf-ja | 0.07 | 0.07 | 0.00 |
| templates-en | 0.98 | 0.98 | 0.00 |
| templates-ja | 0.75 | 0.75 | 0.00 |
| why-en | 0.08 | 0.08 | 0.00 |
| why-ja | 0.07 | 0.07 | 0.00 |
| faq-en | 0.18 | 0.18 | 0.00 |
| faq-ja | 0.14 | 0.14 | 0.00 |
| troubleshooting-en | 0.29 | 0.29 | 0.00 |
| troubleshooting-ja | 0.24 | 0.24 | 0.00 |
| changelog-en | 0.53 | 0.53 | 0.00 |
| changelog-ja | 0.40 | 0.40 | 0.00 |
| repository-en | 0.08 | 0.08 | 0.00 |
| repository-ja | 0.07 | 0.07 | 0.00 |
| feedback-en | 0.21 | 0.21 | 0.00 |
| feedback-ja | 0.19 | 0.19 | 0.00 |
| welcome-en | 0.45 | 0.45 | 0.00 |
| welcome-ja | 0.37 | 0.37 | 0.00 |
| privacy-policy-en | 1.64 | 1.64 | 0.00 |
| privacy-policy-ja | 1.37 | 1.37 | 0.00 |

light の `brand %` が全行 0.00 なのは分類器の失敗ではない。light のブランド ramp は C = 0.053 で、そもそも有彩ピクセルとして数えられていない（ブランド除外の集計は閾値を超えたピクセルに対してのみ行う）。したがって light では `ex-brand` と `chrome-only` が一致する。

#### light / 390px

| ページ | ex-brand % | chrome-only % | brand % |
|---|---|---|---|
| index-en | 0.60 | 0.60 | 0.00 |
| index-ja | 0.38 | 0.38 | 0.00 |
| features-en | 0.90 | 0.90 | 0.00 |
| features-ja | 0.63 | 0.63 | 0.00 |
| clipper-en | 0.19 | 0.19 | 0.00 |
| clipper-ja | 0.21 | 0.21 | 0.00 |
| rss-en | 0.21 | 0.21 | 0.00 |
| rss-ja | 0.20 | 0.20 | 0.00 |
| faq-en | 0.56 | 0.56 | 0.00 |
| faq-ja | 0.46 | 0.46 | 0.00 |
| changelog-en | 1.32 | 1.32 | 0.00 |
| changelog-ja | 1.05 | 1.05 | 0.00 |

#### dark / 1280px

| ページ | ex-brand % | chrome-only % | brand % |
|---|---|---|---|
| index-en | 0.29 | 0.67 | 0.38 |
| index-ja | 0.22 | 0.56 | 0.34 |
| features-en | 0.67 | 1.00 | 0.33 |
| features-ja | 0.51 | 0.81 | 0.30 |
| clipper-en | 0.14 | 0.49 | 0.34 |
| clipper-ja | 0.14 | 0.49 | 0.35 |
| rss-en | 0.15 | 0.51 | 0.36 |
| rss-ja | 0.13 | 0.51 | 0.37 |
| okf-en | 0.12 | 0.44 | 0.31 |
| okf-ja | 0.11 | 0.44 | 0.33 |
| **templates-en** | 1.13 | **6.14** | 5.01 |
| templates-ja | 0.79 | 4.35 | 3.56 |
| why-en | 0.12 | 0.41 | 0.29 |
| why-ja | 0.11 | 0.38 | 0.26 |
| faq-en | 0.26 | 0.32 | 0.06 |
| faq-ja | 0.23 | 0.29 | 0.06 |
| troubleshooting-en | 0.45 | 0.51 | 0.06 |
| troubleshooting-ja | 0.38 | 0.44 | 0.06 |
| changelog-en | 0.68 | 0.88 | 0.20 |
| changelog-ja | 0.56 | 0.74 | 0.17 |
| repository-en | 0.13 | 0.43 | 0.29 |
| repository-ja | 0.11 | 0.42 | 0.31 |
| feedback-en | 0.35 | 0.37 | 0.02 |
| feedback-ja | 0.32 | 0.34 | 0.02 |
| welcome-en | 0.64 | 0.69 | 0.05 |
| welcome-ja | 0.52 | 0.58 | 0.05 |
| **privacy-policy-en** | **2.23** | 2.31 | 0.08 |
| privacy-policy-ja | 1.92 | 1.98 | 0.05 |

#### dark / 390px

| ページ | ex-brand % | chrome-only % | brand % |
|---|---|---|---|
| index-en | 0.77 | 2.27 | 1.50 |
| index-ja | 0.54 | 2.03 | 1.49 |
| features-en | 1.81 | 2.97 | 1.17 |
| features-ja | 1.36 | 2.52 | 1.16 |
| clipper-en | 0.36 | 1.90 | 1.54 |
| clipper-ja | 0.36 | 1.88 | 1.52 |
| rss-en | 0.37 | 1.90 | 1.53 |
| rss-ja | 0.35 | 1.98 | 1.64 |
| faq-en | 0.81 | 1.00 | 0.20 |
| faq-ja | 0.74 | 0.94 | 0.20 |
| changelog-en | 1.67 | 2.30 | 0.63 |
| changelog-ja | 1.42 | 2.04 | 0.61 |

---

## 読み取れること

- **モバイル幅は同じページでも比率が上がる**（features-en dark: 1280px 0.67% → 390px 1.81%）。要素は同じでも 1 列に畳まれて総面積が縮むため、分母だけが小さくなる。したがって 5% 判定はモバイル幅を含めて行う必要がある
- **privacy-policy が最も高い**（dark 1280px で 2.23%）。本計測では色ごとの内訳を取っていないため、原因の断定は避ける。ゲート対象として最も監視すべき行であることだけを記録する
- **templates は brand 色に大きく依存している**。ブランド色の面積そのものが dark 1280px で 5.01% ある。合意された定義ではこれは有彩色に数えないが、「ブランド色を大面積に敷く」設計変更が起きたときは `chrome-only` が動くので、比較の基準としてこの列を残す

---

## Reproduction

計測スクリプトは $SITE に Playwright 依存を持ち込まないため $EXT 側のスクラッチ領域に置いてある。恒久的な成果物は本ドキュメントと `chroma-baseline-v2.json` で、**再計測はベースラインを言い直す必要が生じたときだけ**行う。

```bash
# 1. サイトをビルドしてローカル配信
cd /mnt/c/Users/asano/mark-it-down
npm run build
cd out && python3 -m http.server 8899 &

# 2. 計測（80 行、約 25 分）
cd <scratchpad>
node chroma-baseline.mjs chroma-baseline-v2.json \
  > baseline-v2.summary.log 2> baseline-v2.log

# 3. サーバー停止
pkill -f "http.server 8899"
```

スクリプトは `@playwright/test` と `sharp` を $EXT の `node_modules` から絶対パスで import する。

### 出力

- `baseline-v2.log` — 1 行 1 計測の進捗（stderr）
- `chroma-baseline-v2.json` — 全 80 行。列は `withMedia` / `chromeOnly` / `chromeExBrand` / `chromeExBrandReduced` / `brandShare` / `maskedShare` / `histogram`
- `baseline-v2.summary.log` — 最悪行のサマリ（stdout）

---

## 継続的な強制

本計測はゲートではない。以後の強制は `scripts/audit-chroma-budget.mjs`（`npm run audit:site` から実行）が担う。2 軸で検査する:

- **ALLOWLIST** — 有彩トークンを**どこに**置いてよいか。未登録セレクタでの使用は FAIL
- **AREA_CAPS / `sizedBy`** — **どれだけの面積**まで許すか。面積を持つ登録は寸法上限の宣言を必須にする

いずれもレンダリング後のピクセルは測らない。ピクセル面積の実証は本ベースラインの役割で、ゲートは「その水準を崩す変更を静的に止める」役割を持つ。

---

## 参照

- ゲート実装: `scripts/audit-chroma-budget.mjs`
- リリース手順への組み込み: `$EXT/.claude/skills/website-release/SKILL.md`
