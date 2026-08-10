# Margin Field — index 背景 canvas アニメーション

**状態: 実装済み（2026-08-10）→ 同日中に設計を全面簡略化**。対象は index ページのみ（EN/JA 共通）。

> **本ファイルの読み方**: 以下の「Context」〜「セクション連動の振付」は当初設計（Beat 0-5 の `IntersectionObserver` 駆動振付）の決定記録。この振付は最終的にユーザー判断で**全面撤去**され、現在のコードは持たない。当初設計の経緯とその後発見された2件のバグ修正記録は撤去に至った理由として意味を持つため残すが、**現在の実装を知りたい場合は末尾の「## 設計の全面簡略化（2026-08-10）」を読むこと**。

---

## Context

「点と点がつながる」「import/export で消えていく」「まとめて export する」という視覚メタファーで、Mark It Down の思想（Entry→Edit→Move→Exit）を index の背景で表現したい、という要望が起点。

当初 [tsParticles](https://github.com/tsparticles/tsparticles) の採用を検討したが、要望の 3 要素のうち既製ライブラリの設定だけで担えるのは「点と点がつながる」（`interaction-particles-links`、1.76 KB gz）のみだった。「import/export で消える」「まとめて export」はどちらを選んでも、セクション連動の振付・convoy の状態機械は自作になる。~21 KB gz を払って買えるのは距離判定 + `lineTo` 約 40 行分だけで、index の Perf 中央値 89（レンジ 66-96）・First Load JS ~102 KB gz という現状に対して割に合わないと判断した。

→ 自作 canvas（依存追加ゼロ、~2-4 KB gz）を採用。

`pseudo3d-hero-sample.md` が 2026-07-14 に見送った論点は「アニメーションライブラリを本番依存に追加するか」であり、依存ゼロの本案はその論点に該当しない。

## 決定：自作 canvas、index ページのみ、DESIGN.md の例外扱い

- **実装手段**: 自作 `<canvas>` + `requestAnimationFrame`。tsParticles 等の外部ライブラリは使わない
- **適用範囲**: index ページのみ（EN/JA）。他ページ・サイト全体には適用しない
- **DESIGN.md との関係**: `DESIGN.md` の「完全忠実回帰」方針（オリジナルデザインの見た目を一切変更しない）に対する例外として `DESIGN.md` § 経緯 に明記した。既存 DOM/CSS を変更せず、コンテンツレール外の余白にのみ描画するため、既存の見た目自体は無変更のまま保たれる

## 設計の中核

コンテンツレール（`--content-max: 880px`、`app/original.css:92`）の外側の余白＝「マージン」だけを使う。テキストは全て `.container` の中にあるため、**レールの外に hard clip すれば既存のコントラスト比に物理的に触れられない**（幾何による保証、運用上の約束ではない）。

```js
ctx.rect(0, 0, railLeft - PAD, H);
ctx.rect(railRight + PAD, 0, W - railRight - PAD, H);
ctx.clip();
```

`PAD = 24px`。`.flow-section` 等の `box-shadow: 6px 6px 0` がレール右へ 6px はみ出すが `PAD > 6px` なので粒子と重ならない。

### 視覚文法 — 3 つの速度が意味を担う

| 動き | 速度 | 読ませたいもの |
|---|---|---|
| Ambient drift | 3-6 px/s 下方 + 微小な横揺れ | 静止状態の document |
| Arrival (import) | 内向き減速、~800ms でレール端手前に着地 | 外から来て、ここの一部になった |
| Departure (export) | 外向き加速、350-450ms でビューポート端へ hard snap（フェードなし） | 送り出した。意図的に、そして完了 |

departure は ambient の約 8 倍、arrival の約 2 倍。arrival は「落ち着き」、departure は「決断」という対比が読みを決める。

### セクション連動の振付（`IntersectionObserver`、1 訪問 1 回）— ⚠️ 撤去済み（末尾参照）

`components/index/RevealScript.tsx` のパターンを踏襲。

| Beat | トリガー | 動き |
|---|---|---|
| 0 | mount | 両余白が drift + 接続 |
| 1 | `.hero` | 6 arrivals/余白、交互 stagger |
| 2 | `.philosophy` | 意図的に何もしない（Beat 3 の対比のため） |
| 3 | `.flow-section` | Entry→Edit→Move→Exit の 4 拍タイムライン（~4.2s） |
| 4 | `.workflow-section` / `.coming-soon-section` | ~6s ごとに 1 arrival + 1 departure |
| 5 | `.cta-section` | Gather→Hold→Launch の finale（まとめて export）→ Aftermath 再シード |

Beat 3 は per-`li` ではなく `.flow-section` 1 つの observer で駆動する。`.philosophy-list` が `repeat(2, 1fr)` の 2×2 グリッド（`app/original.css:875`）のため、per-item observer では 4 拍が 2 拍に潰れる。

Beat 5 の finale が発火したら Beat 4 の `setInterval` を止める。finale と無関係な単発 arrival/departure が convoy の launch に紛れ込むと「1 つのまとまりが出ていく」という読みを壊すため。

## 色ガバナンスの盲点と代償統制

**canvas は既存の色監査スキャナの死角にある。** `audit-chroma-budget.mjs` は `components/` / `content/` 内の `.ts`/`.tsx` にある `#hex` / `rgb()` / `rgba()` リテラルしか見ない。canvas は色を `getComputedStyle` で実行時に読むため、どの audit の出力にも現れない。

代償として、**canvas が読んでよいトークンをここに名指しで列挙する**。この一覧の変更は audit の `ALLOWLIST` に行を足すのと同等の審議を要する:

- `--text-muted` — dot（light）
- `--border-subtle` — 線（light）
- `--border-primary` — 線（dark）。dark の `--border-subtle` は `rgba(255,255,255,0.09)`（`app/original.css:22`）で、線 alpha を掛けると事実上不可視になるため、dark はこのトークンに分岐する（light は `#c8c0b4` の不透明値、`app/original.css:127`）
- `--text-primary` — finale の convoy 線（alpha 0.35）。`--accent-primary` は使わない。このサイトは色ではなく重み（border・shadow）で強調するため、クライマックスで有彩色を導入すると唯一の異物になる

本設計は中立なインクトークンのみを使い `--accent-*` を一切使わないため、有彩面積への寄与は実測でちょうどゼロ。`doc/audit/chroma-baseline-2026-08-07.md` に対する再計測は参考値のみとし、リリースゲートとしては扱わない（同 doc がすでにゲートでないと明記している）。

## モバイル・reduced motion

`innerWidth >= 1200 && (innerWidth - railWidth) / 2 >= 128` をマウントゲートとする。`1200px` は既存ブレークポイント（`app/original.css:1171`）。1024px 未満はレール＝ビューポートで余白が存在しないため、演出は構造的にモバイル訪問者には見えない。引き換えに、Lighthouse のモバイル計測（既定のエミュレーション、`doc/audit/lighthouse-baseline-2026-07-12-original-rollback.md`）に対しては挙動が完全に不変であることが幾何的に保証される（マウントゲート自体が成立しないため）。

`prefers-reduced-motion: reduce` では canvas ノード自体を作らない（静的フォールバックは置かない。`RevealScript.tsx` の前例と一貫）。

## ファイル（当初設計時点。現在の内容は末尾「設計の全面簡略化」参照）

- `components/index/marginField.ts` — 純粋シミュレーション（粒子ステップ、arrival/departure 積分、convoy 状態機械、線パス）。DOM も React も参照しない
- `components/index/MarginFieldScript.tsx` — マウントゲート、canvas ライフサイクル、DPR/clip、トークン読み取り、IntersectionObserver、ビートスケジューラ、`visibilitychange`/nav `toggle`/`beforeprint`・`afterprint` のリスナーとクリーンアップ
- `components/IndexPage.tsx` — `<RevealScript />` の隣に `<MarginFieldScript />` を配線（EN/JA 共通の 1 箇所）

CSS は 1 行も追加していない。canvas のスタイルは全て effect 内の `canvas.style.cssText` で完結する。

## 既知バグの修正: finale の永続フリーズ（実装後・2026-08-10）

**症状**: Beat 1/3 由来の `setTimeout` が finale の `hold` フェーズ中に発火し、convoy 粒子を `'ambient'` から `'moving'` へ変えると、finale が `endFinale()`/`runFinaleAftermath()` に到達せず永続的にフリーズする。

**原因**: `stepFinale()`（`marginField.ts`）の hold→launch 変換が、フェーズが `'launch'` に切り替わったその 1 フレームだけ走る one-shot ループで、`p.state !== 'ambient'` をガードに使っていた。上記のタイミングで `'moving'` だった粒子は変換をスキップされ、数フレーム後に `'ambient'` へ戻った時点ではもう変換パスが走らないため、`state.particles.length` が 0 に到達せず `isFinaleDone()` が恒久的に `false` のままになる。

**修正**: `stepFinale()` の hold→launch 変換を、遷移フレームのみの one-shot から `f.phase === 'launch'` である限り毎ティック走るスイープへ変更（`marginField.ts` の `stepFinale()`）。どのタイミングで `'ambient'` に戻っても次のティックで確実に convoy へ組み込まれるため、DOM 層側のタイマー競合の有無に関わらず不変条件が保たれる。`MarginFieldScript.tsx` の `runBeat5()` が持つ `beatTimers` クリアは同種の迷子タイマー対策として残しているが、フリーズの根本修正はこの `marginField.ts` 側のスイープが担う。

**リグレッションテスト**: `scripts/test-margin-field.mjs` — hold フェーズ中に迷子の `spawnMove()` を注入し、`isFinaleDone(state) === true` に到達することを assert する。修正を外すと `particles.length` が 0 に到達せず fail することを確認済み。

## 既知バグの修正: マウントゲートが振付ライフサイクルを制御していなかった（Codex adversarial-review 指摘・2026-08-10）

**症状**: `gateOk()` が成立しなくなる（例: 1200px ブレークポイントをまたぐ resize）と canvas 自体は `teardown()` で消えるが、Beat 1/3/4/5 の 4 つの `IntersectionObserver` は生き続ける。one-shot 観測が gate-off/gate-on を挟むと二度と発火しない状態で「消費済み」になり、`finaleActive` は `teardown()` に触られないため finale 中の gate-off で永続的に `true` のまま Beat 5 を封じ、`beat4Interval` も `clearInterval` されず `field === null` に対して ticking し続ける。

**原因**: 4 つの `IntersectionObserver` 構築 + `.observe()` が `mount()`/`gateOk()` から独立した effect トップレベルで無条件に実行されていた。マウントゲートが縛っていたのは canvas のライフサイクル（初回マウントの `if (gateOk()) mount();` と `reconcileMount()`）だけで、振付レイヤーはゲートの外にあった。

**修正**: 振付ライフサイクル全体（4 observer + `beatTimers` + `beat4Interval` + `beat4Side` + `finaleActive`）を `mount()`/`teardown()` に束ねる `startChoreography()`/`stopChoreography()` を新設。`mount()` の末尾で `startChoreography()`、`teardown()` の末尾で `stopChoreography()` を呼ぶ。`stopChoreography()` は 4 observer を `disconnect()` し、`beat4Interval` を `clearInterval` + `null` 化、`beat4Side` を `'left'` に、`finaleActive` を `false` にリセットする。

**リグレッションテスト**: `scripts/test-margin-field-choreography-gating.mjs` — `MarginFieldScript.tsx` の唯一の export が `useEffect` を呼ぶため、Rules of Hooks を破らずに直接実行することはできない。代わりにソーステキストへの構造的 assertion（`mount()`/`teardown()`/`startChoreography()`/`stopChoreography()` の関数本体をブレースマッチングで抽出し、4 つの `new IntersectionObserver(` 呼び出しが全て `startChoreography()` の内側にあること、`mount()` が `startChoreography()` を呼ぶこと、`teardown()` が `stopChoreography()` を呼ぶこと、`stopChoreography()` が 4 observer を `disconnect()` し `beat4Interval`/`beat4Side`/`finaleActive` をリセットすることを assert）。修正を外す（`mount()`/`teardown()` から呼び出しを一時的に削除）と `mount() must call startChoreography()` で fail することを確認済み。

## 既知バグの修正: リグレッションテストが検証ゲートに配線されていなかった（Codex adversarial-review 指摘・2026-08-10）

**症状**: 上記 2 本の `scripts/test-margin-field*.mjs` は単体では正しく fail→pass するが、`package.json` の `scripts` に `test` キーが存在せず、`scripts/audit-site.mjs` の `AUDITS` 配列（サイト内容/デザイン監査専用）にも含まれていなかった。結果として `npm run build` / `npm run lint` / `npm run audit:site` のどれを実行しても呼ばれず、「リグレッションテストがある」という ADR 上の主張が実行担保を伴わない状態だった。将来のリファクタリングでフリーズ/振付ゲーティングのどちらかのバグを再発させても、これらのテストを手動で `node scripts/test-margin-field*.mjs` と打たない限り検出されない。

**修正**: `package.json` に `"test": "node scripts/test-margin-field.mjs && node scripts/test-margin-field-choreography-gating.mjs"` を追加し、`npm test` で両方が chain 実行されるようにした。`CLAUDE.md` の `### Build & Deploy` にも `npm test` を明記し、新規 `scripts/test-*.mjs` を追加した際は必ずこの chain に加える旨を追記した。`audit:site` には含めない — 同スクリプトはサイト内容/デザイン監査のスコープであり、シミュレーションロジックの単体回帰とはスコープが異なる。

**確認**: `npm test` 実行で両テストとも PASS（exit=0）、`npm run build` も exit=0 で再確認済み。

## 設計の全面簡略化（2026-08-10）

**きっかけ**: 上記「finale の永続フリーズ」修正の後も、一番下までスクロールすると field が固まって画面外へ消え、その後表示が変になる不具合が残っていた。ユーザーからの報告を受け、パッチを重ねるのではなく設計そのものの妥当性を問い直す機会として、CLAUDE.md の「実装方針にトレードオフがある選択は黙って決めず、選択肢とトレードオフを提示してから進む」に従い `AskUserQuestion` で選択肢を提示した。

提示した選択肢は概ね「finale のバグだけを個別修正する」「Beat 1-5 の一部を残しつつ簡略化する」「振付を全部やめて ambient + マウス/スクロール反応のみにする」の3方向で、ユーザーは最後の**全面撤去**を選んだ。

**撤去した内容**: Beat 0-5 の `IntersectionObserver` 駆動振付システム全体 — hero arrivals（Beat 1）、`.philosophy` の意図的 no-op（Beat 2）、`.flow-section` の Entry→Edit→Move→Exit 4拍タイムライン（Beat 3）、workflow/coming-soon の定期 import/export（Beat 4）、`.cta-section` の Gather→Hold→Launch finale（Beat 5）。付随する `ParticleState`、`spawnArrival`/`spawnDeparture`/`spawnMove`、`FinalePhase`/`FinaleState`/`startFinale`/`endFinale`/`isFinaleDone`/`stepFinale`、`startChoreography`/`stopChoreography`、4つの `IntersectionObserver` インスタンスをすべて削除。上記「視覚文法」表の Arrival/Departure 速度も、`セクション連動の振付` セクション全体も、現在のコードには対応物がない。

**現在の設計**: 常時継続する ambient drift（`AMBIENT_SPEED_MIN_PX_S=3` 〜 `AMBIENT_SPEED_MAX_PX_S=6` 下方 + `AMBIENT_SWAY_SPEED_PX_FRAME=0.05` の微小な横揺れ）に、マウス位置とスクロール速度への軽い反応を足しただけの構成。「点と点がつながる」線描画（`getLines()`、同一余白内のみ、`LINE_THRESHOLD_PX=92`、`LINE_ALPHA=0.55`）は変更なしで維持。

- `marginField.ts` に `FieldInput` 型を追加: `{ pointerX: number | null, pointerY: number | null, scrollDeltaPx: number }`
- **ポインタ反応**: `POINTER_RADIUS_PX=90` 以内の粒子のみ、`POINTER_STRENGTH_PX_FRAME=0.6` を上限に距離に応じて減衰する反発力（`stepParticle()` 内）
- **スクロール反応**: 呼び出し側が渡す `scrollDeltaPx`（低域通過フィルタ後の値）に `SCROLL_INFLUENCE=0.15` を掛けて縦方向ドリフトへ加算
- `MarginFieldScript.tsx` 側は `pointermove`/`mouseleave`/`blur` でポインタ位置を追跡し、`tick()` 毎に `window.scrollY` の差分を `SCROLL_SMOOTHING=0.15` の低域通過フィルタ（`scrollVelocity += (rawDelta - scrollVelocity) * SCROLL_SMOOTHING`）で平滑化してから `step()` に渡す
- マウントゲート（`innerWidth >= 1200` かつ余白 `>= 128px`）、DPR 対応、レール外への hard clip、テーマ別トークン読み取り（light: `--border-subtle` / dark: `--border-primary`、dot は共通 `--text-muted`）、resize/visibility/dark-mode/reduced-motion/nav-toggle/print のイベント処理は無変更。`--text-primary`（finale convoy 線用）はこの撤去で不要になったため、現在 canvas が読むトークンは `--text-muted` / `--border-subtle` / `--border-primary` の3つのみ

**テスト**: `scripts/test-margin-field-choreography-gating.mjs`（撤去された振付ライフサイクルへの構造的 assertion）を削除。`scripts/test-margin-field.mjs` を全面書き直しし、新シミュレーションに対する5系統の回帰テストを追加 — ambient wander が600フレーム経ってもgutter境界内に収まること、ポインタ反発が `POINTER_RADIUS_PX` 以内の粒子にのみ作用すること、正/負の `scrollDeltaPx` がそれぞれ期待方向へ縦ドリフトを動かすこと、`getLines()` が余白を跨いで粒子をペアリングしないこと、`setBounds()` が再シードせず既存粒子を新しい境界にクランプすること。`package.json` の `test` スクリプトは `"node scripts/test-margin-field.mjs"` の単一ファイルに単純化（削除したテストファイルへの参照を除去）。

**検証**: `npm run build`（型チェック含む）・`npm test` とも成功。`npm run lint` はこのリポジトリに ESLint 設定ファイルが存在しない既存の状態のため対話的セットアップを要求し非対話実行不可（本作業による変化ではない — `git show HEAD:package.json` で `lint` スクリプト自体が無変更であることを確認済み）。
