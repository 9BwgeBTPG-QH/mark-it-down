# DESIGN.md — Mark It Down Website

デザイン言語「**Manuscript & Ink（原稿とインク）**」の正本。
対象: Mark It Down ウェブサイトの全13ページペア（EN/JA 26ファイル）。`slides-en.html` / `slides-ja.html`（Marp 自動生成）は対象外。

適用先の実装は chorme_mark-it-down#1593 で移行中: 現行は `docs/` 直下の静的 HTML + `style.src.css`、Next.js 15 再構築後はソース（Next.js アプリ + `tailwind.config`）が実装の正本となり、`docs/` はビルド出力になる。本ファイルはどちらの実装にも適用される意図・数値・判断基準を保持する。実装トークンの機械的正本は移行後 `tailwind.config`。

- 策定: 2026-07-11（chorme_mark-it-down#1593 grill-me セッション、方向性 案1 承認済み）
- ベンチマーク出典: `chorme_mark-it-down/doc/ref-design/`（10製品の typeui.sh 抽出トークン + Notion 手動分析）

---

## 1. Overview — デザインコンセプト

Mark It Down は「AI出力を自分の言葉で書き直す（咀嚼する）場所」。サイトはその思想を視覚言語にする:

> **紙白の原稿に、インクで書く。締めくくりに封蝋を押す。**

- **紙白（paper）**: 書く前の静けさ。クリームではなく、わずかに温かい白
- **インク（ink）**: 階層を持つ黒。文字がデザインの主役
- **封蝋（seal）**: 深紅のアクセント。「自分の手で締めくくる」= 咀嚼の完了。CTA・リンクに限定使用
- **真鍮（brass）**: ロゴ・封蝋モチーフ専用の装飾色。UI には使わない

### ベンチマークからの継承と決別

| 継承元 | 取り入れるもの | 取り入れないもの |
|--------|--------------|----------------|
| reMarkable | 紙白×インク、1px inset ボーダー、96px の節間、radius 2px | サンセリフ主導（うちはセリフ見出し） |
| Notion | インク4階層、余白哲学、hairline | 青 primary、パステル多色アクセント |
| iA Writer | タイポグラフィ主役、影の抑制 | モノクローム徹底（うちは封蝋1色を持つ） |
| Quartz | docs系ページの archival index 構成 | 鉄青パレット |
| Freewrite | 硬質な micro-interaction（押した感触） | ブルータリズムの黒地・赤面 |

**差別化の根拠**（ベンチ10製品の実測より）: セリフ体主導のサイトは10製品中ゼロ。金/真鍮系ブランド色もゼロ（青系4製品で飽和）。「セリフ×tactile×封蝋」の組み合わせがサイトの固有性。

---

## 2. Colors

### トークン（コントラスト実測値付き、地は paper #fcfbf8）

| token | value | 用途 | contrast | 判定 |
|-------|-------|------|----------|------|
| `paper` | `#fcfbf8` | 基本背景 | — | — |
| `paper-shade` | `#f5f2ec` | セクション交互背景・カード面 | — | — |
| `ink` | `#211e1c` | 見出し・強調本文 | 16.02:1 | AAA |
| `ink-2` | `#31302e` | 本文 | 12.74:1 | AAA |
| `ink-muted` | `#615d59` | 補足・キャプション | 6.31:1 | AA |
| `ink-faint` | `#a39e98` | **装飾・disabled 専用**（本文使用禁止） | 2.57:1 | FAIL |
| `seal` | `#9d2b22` | アクセント: CTA・リンク・強調 | 7.24:1 | AAA |
| `seal-deep` | `#8b241c` | seal の hover/active | 8.57:1 | AAA |
| `brass` | `#8a6d3b` | ロゴ・封蝋装飾専用（本文・小サイズUI禁止） | 4.69:1 | AA(大型のみ) |
| `hairline` | `#e2ddd4` | 1px ボーダー | — | — |

- 白文字 on `seal`: 7.49:1（CTA ボタン合格）
- `paper` 文字 on `ink`: 16.02:1（フッター反転面）

### 規律

- アクセントは **seal 1色のみ**。ページ内に seal 系以外の有彩色 UI を置かない
- 旧クリーム `#f2ede4` は**廃止**（新規使用禁止）
- ダークモード: **v1 スコープ外**。将来は ink/paper 反転で設計（トークン命名は反転可能に保つ）

---

## 3. Typography

### ファミリー（セルフホスト継続、外部CDN禁止）

- **見出し: Lora**（serif）— サイトの声。既存資産の増幅であり最大の差別化点
- **本文: Raleway**（sans）— EN 本文・UI ラベル
- **JA**: `"Hiragino Sans", "Noto Sans JP", Meiryo, sans-serif` フォールバック。見出しは Lora + 和文ゴシックの混植（Lora は約物・欧文にのみ効く）
- woff2 + unicode-range 分割を維持。`font-display: swap`

### スケール（reMarkable 級の振り幅に拡大）

| token | size | 用途 |
|-------|------|------|
| `display` | 56px / 1.15 | index ヒーロー（mobile 36px） |
| `h1` | 38px / 1.2 | ページタイトル（mobile 30px） |
| `h2` | 28px / 1.3 | セクション見出し |
| `h3` | 20px / 1.4 | カード見出し |
| `body` | 17px / 1.7 | EN 本文 |
| `body-ja` | 16px / 1.9 | JA 本文（行間広め） |
| `caption` | 14px / 1.5 | 補足 |

### JA 組版

- BudouX による改行制御を維持（release フロー最終ステップ）
- 和文に letter-spacing の palt 詰めを一律適用しない（可読性優先）
- 見出しの `text-wrap: balance` を EN/JA とも適用

---

## 4. Layout & Surfaces

- **Spacing**: 4px 基数（4/8/12/16/24/32/48/64/96）。**セクション間は 96px**（mobile 64px）— 広い呼吸が「静けさ」を作る
- **Container**: 本文計測幅 max 720px、フル幅セクション max 1120px
- **Radius**: `2px`（ボタン・input）/ `4px`（カード）。それ以上の丸みは使わない（pill 禁止）
- **Border**: `1px solid hairline` が基本の面区切り。tactile の主表現
- **Shadow**: 原則なし。浮遊要素（モバイルメニュー等）のみ `0 2px 8px rgba(33,30,28,0.08)` まで
- **質感**: paper に極薄ノイズテクスチャ（CSS/SVG、3KB 以内、`opacity ≤ 0.03`）を検討可。LCP に影響するなら落とす

---

## 5. Motion

拡張機能リポジトリ `.claude/rules/styles.md` A1-A8 を継承（`transition: all` 禁止 / `ease-out` / entry は `scale(0.95)+opacity` / `prefers-reduced-motion` 対応必須 / duration ≤ 300ms）。

| token | value | 用途 |
|-------|-------|------|
| `instant` | 120ms | hover 反応 |
| `fast` | 200ms | 面の出入り |
| `normal` | 280ms | セクション reveal |

### 固有演出「Seal Press」（proprietary effect）

CTA ボタンの `:active` で封蝋を押す感触: `translateY(1px)` + hairline→seal-deep のボーダー変化、120ms。派手なエフェクトではなく**押した確かさ**を出す。Framer Motion はヒーロー・スクロール reveal に限定し、hover/active は CSS で完結させる。

---

## 6. Components 方向性

- **ヒーロー（index）**: Lora display 56px、左寄せ非対称。スクリーンショットは 1px hairline 枠 + radius 4px の「原稿」として置く
- **CTA**: seal 地 + 白文字（primary）/ paper 地 + seal 文字 + 1px seal ボーダー（secondary）
- **カード**: paper-shade 面 + hairline。影なし
- **アコーディオン（faq / troubleshooting / changelog）**: `<details>` CSS-only を維持しつつ Quartz 的 archival index（番号・日付の注釈付きリスト）へ。旧 Glassmorphism は廃止
- **フッター**: ink 反転面（paper 文字）。封蝋モチーフの定位置
- **ナビ**: 常時表示・sticky。ブラー背景は使わず paper 不透明 + hairline 下線

---

## 7. Accessibility（合格条件）

- WCAG 2.1 AA: 本文コントラスト 4.5:1 以上（§2 の実測表を維持）
- `:focus-visible` リング必須: `2px solid seal` + `2px offset`
- キーボードのみで全導線到達可能
- `prefers-reduced-motion: reduce` で transform 系アニメ無効化
- Lighthouse Accessibility スコアを Phase 1 ベースライン以上に保つ（リリースゲート）

---

## 8. Do's and Don'ts

### Do

- インクの階層（ink → ink-2 → ink-muted）で情報の強弱を作る。色で作らない
- 迷ったら要素を減らす（複雑さは敵）
- EN/JA ペア同時更新。トークン変更は本ファイル → `tailwind.config` の順で反映

### Don't

- クリーム背景 `#f2ede4` の再導入
- seal 以外の有彩色 UI（青リンク・緑バッジ等）
- pill 型ボタン、大きい radius、多層シャドウ
- Glassmorphism の新規使用
- 3D / Three.js / Lenis / GSAP / スムーズスクロールハイジャック
- 外部 CDN（フォント・スクリプト・画像とも）
- `ink-faint` の本文使用（コントラスト FAIL）
- `brass` の小サイズテキスト・UI コントロール使用
