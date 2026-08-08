# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Repository Overview

This is the **GitHub Pages website** for Mark It Down (Chrome extension Markdown editor).

- Next.js 15（App Router / `output: 'export'` static export）で生成し、`docs/` を GitHub Pages で配信する
- デザインは **オリジナルデザイン（eed65be 時点の静的サイト）への完全忠実回帰**（chorme_mark-it-down#1593、2026-07-12 決定）。Manuscript & Ink / Tear-off Pad は廃止（Tear-off Pad 実装は `tear-off-pad-wave01` ブランチに退避）
- The `ref/` folder contains the **source app documentation** (gitignore対象、ローカルのみ). Use `ref/README.md` as the authoritative source for app features and specifications.

SEO キーワードの正本: `chorme_mark-it-down` リポジトリの `doc/technical-decisions/seo-keyword-map.md`（title / meta description / h1 を変更する前に必ず照合する）。

---

## Project Structure

```
app/
├── (en)/                # EN route group（独立 root layout、<html lang="en">）
│   ├── layout.tsx       # Lora+Raleway (next/font) / LangRedirect / GoogleAnalytics
│   ├── page.tsx         # → index.html
│   └── <slug>/page.tsx  # → <slug>.html（why, faq, features, ...）
├── (ja)/                # JA route group（<html lang="ja">）
│   └── <slug>-ja/page.tsx  # → <slug>-ja.html
├── globals.css          # Tailwind directives（preflight のみ実質使用）
└── original.css         # ★スタイル正本（eed65be:docs/style.src.css の丸ごと移植）
components/
├── PageShell.tsx        # 旧ページ骨格: skip link → .container → SiteNav → main → SiteFooter
├── SiteNav.tsx / SiteFooter.tsx  # 旧 header-nav / footer（ページ別バリアントは content/shared.ts の slug map 駆動）
├── SealButton.tsx       # CTA（実体 .btn btn-primary/secondary）
├── Budoux.tsx           # JA 折返し（SSG 時に <wbr> を焼き込み。旧 ZWSP の代替）
├── LangRedirect.tsx     # 言語自動リダイレクト + langOverride（旧 head inline script の復元）
├── GoogleAnalytics.tsx  # GA4 + data-ga-cta delegated listener
└── <page>/ + <Page>Page.tsx  # ページ本文（旧 HTML の main 内を忠実再現）
content/                 # ページ文言（EN/JA ペア）。title/description/h1 は SEO パリティで据え置き
doc/audit/               # SEO / Lighthouse ベースライン（比較正本）
scripts/sync-docs.mjs    # out/ → docs/ 同期
docs/                    # GitHub Pages 配信物（生成物。手編集禁止）
ref/                     # Source app docs (gitignore, local only)
```

---

## Key Conventions

### Design System（オリジナル回帰）

- **スタイル正本は `app/original.css`**。詳細はルート [`DESIGN.md`](DESIGN.md)
- ページ実装の参照正本は旧 HTML: `git show eed65be:docs/<page>.html`。JSX は旧 HTML と**同一クラス名・同一セクション順・逐語一致コピー**
- **Tailwind utility / デザイントークンをページ実装に使わない**（Tailwind は preflight と Budoux.tsx のコア utility のみ。tailwind.config.ts にトークンを追加しない）
- CSS を書き足す前に original.css の既存クラスを探す。新規クラス追加は原則しない
- アコーディオンはネイティブ `<details>` 直書き（旧 HTML 通り）
- CTA の GA 計測は inline onclick ではなく `data-ga-cta="<label>"` 属性（GoogleAnalytics.tsx の delegated listener が拾う）
- JA テキストの折返しは `<Budoux text={...} />`（ZWSP は再現しない）

### Bilingual Pages

Every page has English (`*.html`) and Japanese (`*-ja.html`). **Always update both**（content/*.ts の EN/JA ペアを同時に）。

- 言語自動リダイレクト: `components/LangRedirect.tsx`（EN⇄JA 双方向、`sessionStorage.langOverride` でオプトアウト、lang-switcher クリックで override セット）。両 layout に組み込み済み — ページ側で再実装しない

### SEO パリティゲート

- **title / meta description / h1 は変更禁止**（変更するなら seo-keyword-map.md と照合の上、明示的な合意を取る）
- 検証: `node doc/audit/extract-seo-baseline.mjs --docs-dir out --out /tmp/<name>.json` → `doc/audit/seo-baseline-2026-07-12.json` と diff
- **引数なし実行禁止** — デフォルトで docs/ を読み baseline を上書きする
- Lighthouse は `doc/audit/lighthouse-baseline-2026-07-12.md`（Perf 97-99 / A11y 100）以上を維持。TTFB 二峰性は中央値判定
- 外部 CDN 禁止（フォント・スクリプト・画像はセルフホスト。例外は googletagmanager.com のみ）

### Version Updates

When releasing a new version:
1. `content/index.ts`: "Coming in vX.X.X" セクション更新（EN/JA）
2. `content/changelog.ts`: 新バージョン追加（Under Review）、前バージョンを "Released" へ
3. `content/index.ts` の JSON-LD: `"softwareVersion"` / `"dateModified"` 更新
4. `docs/sitemap.xml`: 変更ページの `<lastmod>` 更新（docs/ 直下で手管理。sync-docs は CNAME / .nojekyll / sitemap.xml / robots.txt を上書きしない）
5. `npm run sync` → docs/ diff 確認 → コミット

### Build & Deploy

```bash
npm run dev      # localhost:3000（ルートは拡張子なし /why。本番は /why.html）
npm run build    # out/ に静的出力（29 routes）
npm run sync:dry # build + 同期のプレビュー（コピー / 削除の対象を出力するだけ）
npm run sync     # build + docs/ へ実際に反映（--apply）
```

- GitHub Pages from `/docs` on `main` branch. URL: `https://markitdown.reduktion.dev/`
- `docs/` は生成物 — **手編集禁止**。必ず app/components/content を直して `npm run sync`
- URL 構造はフラット `.html` 維持（`trailingSlash: false`）。CNAME を消さないこと

---

## Agent Teams 運用ガイドライン

### 使用判断
- **複数ページペアの一括実装/更新**: Teammate 推奨（ページ単位所有）
- **単一ページの軽微な修正**: Subagent で十分

### チーム運用原則
- 各 Teammate が**ページ単位**でファイルを所有（`components/<page>/` + `<Page>Page.tsx` + `content/<page>.ts`。**同一ファイルの並行編集禁止**）
- 共有コンポーネント（PageShell / SiteNav / SiteFooter / SealButton / Budoux / original.css）は Leader 所有 — Teammate は read-only
- Teammate モデルは `sonnet`（コスト管理）。`npm run build` は Leader のみ実行（並列競合防止）
- 委譲時は「旧 HTML（`git show eed65be:docs/<page>.html`）を正とする」「インラインタグ（br/em/strong/code/kbd）をタグ単位で一致」「タグ数セルフチェック」をゲートに明記

### プラン承認基準
- バイリンガルの整合性（EN/JA の内容が対応）
- 旧 HTML への忠実性（クラス名・構造・逐語コピー）
- SEO 据え置き（title/description/h1 不変）
- 同一ファイルの並行編集を含むプランは拒否

---

## 検証レシピ

- 新旧比較: `git archive eed65be docs | tar -x -C <tmp>` を `python3 -m http.server` で配信し、out/ 配信と並べてスクショ比較
- 機械照合: main 内 class 集合 / インラインタグ数（br/em/strong/code/kbd/details/li）/ 正規化テキスト diff（コメント除去 + `<wbr>`・ZWSP 除去 + html.unescape）
- リダイレクト検証: Playwright で locale 切替シナリオ（EN→JA / JA→EN / override 残留 / switcher click）

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **mark-it-down** (3844 symbols, 11170 relationships, 300 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> If any GitNexus tool warns the index is stale, run `npx gitnexus analyze` in terminal first.

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `gitnexus_impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `gitnexus_detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `gitnexus_query({query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `gitnexus_context({name: "symbolName"})`.

## When Debugging

1. `gitnexus_query({query: "<error or symptom>"})` — find execution flows related to the issue
2. `gitnexus_context({name: "<suspect function>"})` — see all callers, callees, and process participation
3. `READ gitnexus://repo/mark-it-down/process/{processName}` — trace the full execution flow step by step
4. For regressions: `gitnexus_detect_changes({scope: "compare", base_ref: "main"})` — see what your branch changed

## When Refactoring

- **Renaming**: MUST use `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` first. Review the preview — graph edits are safe, text_search edits need manual review. Then run with `dry_run: false`.
- **Extracting/Splitting**: MUST run `gitnexus_context({name: "target"})` to see all incoming/outgoing refs, then `gitnexus_impact({target: "target", direction: "upstream"})` to find all external callers before moving code.
- After any refactor: run `gitnexus_detect_changes({scope: "all"})` to verify only expected files changed.

## Never Do

- NEVER edit a function, class, or method without first running `gitnexus_impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `gitnexus_rename` which understands the call graph.
- NEVER commit changes without running `gitnexus_detect_changes()` to check affected scope.

## Tools Quick Reference

| Tool | When to use | Command |
|------|-------------|---------|
| `query` | Find code by concept | `gitnexus_query({query: "auth validation"})` |
| `context` | 360-degree view of one symbol | `gitnexus_context({name: "validateUser"})` |
| `impact` | Blast radius before editing | `gitnexus_impact({target: "X", direction: "upstream"})` |
| `detect_changes` | Pre-commit scope check | `gitnexus_detect_changes({scope: "staged"})` |
| `rename` | Safe multi-file rename | `gitnexus_rename({symbol_name: "old", new_name: "new", dry_run: true})` |
| `cypher` | Custom graph queries | `gitnexus_cypher({query: "MATCH ..."})` |

## Impact Risk Levels

| Depth | Meaning | Action |
|-------|---------|--------|
| d=1 | WILL BREAK — direct callers/importers | MUST update these |
| d=2 | LIKELY AFFECTED — indirect deps | Should test |
| d=3 | MAY NEED TESTING — transitive | Test if critical path |

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/mark-it-down/context` | Codebase overview, check index freshness |
| `gitnexus://repo/mark-it-down/clusters` | All functional areas |
| `gitnexus://repo/mark-it-down/processes` | All execution flows |
| `gitnexus://repo/mark-it-down/process/{name}` | Step-by-step execution trace |

## Self-Check Before Finishing

Before completing any code modification task, verify:
1. `gitnexus_impact` was run for all modified symbols
2. No HIGH/CRITICAL risk warnings were ignored
3. `gitnexus_detect_changes()` confirms changes match expected scope
4. All d=1 (WILL BREAK) dependents were updated

## Keeping the Index Fresh

After committing code changes, the GitNexus index becomes stale. Re-run analyze to update it:

```bash
npx gitnexus analyze
```

If the index previously included embeddings, preserve them by adding `--embeddings`:

```bash
npx gitnexus analyze --embeddings
```

To check whether embeddings exist, inspect `.gitnexus/meta.json` — the `stats.embeddings` field shows the count (0 means no embeddings). **Running analyze without `--embeddings` will delete any previously generated embeddings.**

> Claude Code users: A PostToolUse hook handles this automatically after `git commit` and `git merge`.

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
