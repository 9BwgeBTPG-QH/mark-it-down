# DESIGN.md — Mark It Down Website

デザイン言語「**オリジナル（Warm Cream / Coffee Brown）**」の正本。
対象: Mark It Down ウェブサイトの全13ページペア（EN/JA 26ファイル）。`slides-en.html` / `slides-ja.html`（Marp 自動生成）は対象外。

> **正本の所在**: ビジュアルの一次情報は [`app/original.css`](app/original.css) — 旧静的サイトの `docs/style.src.css`（`eed65be` 時点）を丸ごと移植したもの。トークン（`:root` の `--bg-primary` 等）・コンポーネント（`.btn` / `.accordion-item` / `.hero` 系）・レスポンシブはすべてこのファイルが持つ。Tailwind は新規要素の補助用で、ページの見た目を Tailwind トークンで再定義しない。

## 経緯（2026-07-12 確定）

1. 「Manuscript & Ink」（2026-07-11 策定・デプロイ）→ ユーザー却下
2. 「Tear-off Pad」（2026-07-12 策定、index まで実装）→ 改善幅が投資に見合わずユーザー判断で中止（実装は `tear-off-pad-wave01` ブランチに退避）
3. **オリジナルデザイン（eed65be の見た目）へ完全忠実回帰** — Next.js 基盤（EN/JA 同居 content、SEO パリティ、コンポーネント共有）は維持し、見た目だけ旧 CSS 移植で復元する

## 実装ルール

- **JSX は旧 HTML と同じクラス名を使う**（`hero` / `philosophy` / `flow-section` / `accordion-item` / `btn btn-primary` …）。ピクセル忠実は「同一 CSS を使う」ことで構造的に担保する
- 各ページの見た目参照は `git show eed65be:docs/<page>.html`（EN）/ `<page>-ja.html`（JA）
- ページ骨格: skip link → `.container` → `nav.header-nav` → `header`（ロゴ+タグライン）→ `main#main-content` → `footer`（`components/PageShell.tsx` が提供）
- CTA は `components/SealButton.tsx`（名前は互換のため維持、実体は `.btn btn-primary/secondary`）
- フォント: Lora + Raleway（next/font セルフホスト、`--font-lora` / `--font-raleway` → original.css の `--font-serif` / `--font-sans` にマップ済み。旧 @font-face は移植時に除去）
- 旧 JA ページの inline `word-break` / ZWSP は `<Budoux>` で代替（意図同一・inline style なし）
- GA: 旧 inline `onclick` gtag は移植しない。既存の `data-ga-cta` + delegated listener（`GoogleAnalytics.tsx`）を使う
- 旧 index の Marp スライド埋め込みセクション（`slides-en.html` / `slides-ja.html` iframe）は**復活させる**（完全忠実方針、2026-07-12 ユーザー決定）

## 移行中の注意

- Manuscript & Ink の Tailwind トークン（`paper` / `ink` / `seal` / `hairline` / `font-serif` 等）は未移行ページの互換のため `tailwind.config.ts` に残存。**新規使用禁止**、全ページ移行完了後に削除
- Lighthouse ゲート: `doc/audit/lighthouse-baseline-2026-07-12.md`（Perf 97-99 / A11y 100）を維持目標とするが、旧デザイン復元により旧実測（`-07-11.md`: Perf 87-100 / A11y 96-100）相当へ戻る項目が出た場合は、原因を「デザイン起因 / 実装起因」に切り分けて記録する（gtag 遅延化・next/font 等の基盤改善は維持されるため全面回帰はしない見込み）
- SEO パリティ: title / description / h1 は `doc/audit/seo-baseline-2026-07-12.json` と一致を維持（eed65be の SEO 監査値と同一）
