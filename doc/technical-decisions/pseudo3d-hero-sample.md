# 疑似3Dヒーロー サンプル（案A: 机への降下）— 採用見送り

**状態: 見送り（2026-07-14 時点）**。本番 `app/` `components/` `content/` は無変更。サンプルは `ref/Latest Doc/assets/mark-it-down-pseudo3d-hero.html` に温存（`ref/` は非デプロイ、sync-docs 対象外）。

---

## Context

`doc/temp/擬似3Dサイト.md`（拡張機能リポジトリ側の一次資料）が紹介する「スクロール連動ビデオ・スクラビング（pseudo-3D）」手法で、製品サイトのヒーローセクションを改善できないか検証した。現行ヒーロー（`components/hero/Hero.tsx`）は完全テキストのみで、サイト自体にアニメライブラリが一切ない（CSS keyframes + IntersectionObserver のみ）ため、本番に直接手を入れず自己完結HTML 1枚のサンプルとして先に作った。

コンセプトは「案A: 机への降下」（羊皮紙の机にカメラが降りてノートへ寄る＝「咀嚼の場所」のメタファー）で確定。ユーザーが Runway の image→image キーフレーム i2v で3枚の参照画像（`ref/images/a41dccf7-*.jpg` → `f5e23a19-*.jpg` → `3d6b1fd0-*.jpg`）を1本の動画に合成する想定だった。

## 決定：採用見送り

本番ヒーローへの統合は行わない。理由は技術的な失敗ではなく、優先度・スコープ判断:

- サンプル自体は機能面・アクセシビリティ面で大きな欠陥なく動作した（後述の検証結果を参照）
- ただし本採用には動画素材の実制作（Runway 生成 → 再エンコード → 16:9/9:16 の2本）、CSP/ローカルバンドル化、GSAP を本番依存に追加するかの判断など、サンプル段階を超える追加コストが要る
- 現時点でそのコストに見合う優先度がないと判断し、いったん保留。将来再検討する場合は本ファイルと `ref/` のサンプルを起点にする

**削除はしない。** `ref/Latest Doc/assets/mark-it-down-pseudo3d-hero.html` は次回検討の起点として残す。

## サンプルの実装内容（技術的な学び）

### スクロール連動スクラビング

`<video id="hero-video">` を pin セクションに配置し、GSAP + ScrollTrigger（`pin: true` / `scrub: true`）でスクロール進行度 0→1 を `video.currentTime` に直接マッピングする方式。動画未着でも確認できるよう、CSS 3層パララックス（背景/机/ノートの3レイヤーを z 方向に押し込む）フォールバックを同梱し、`?mode=css` / `?mode=video` のクエリで切替できるようにした。動画が来たら差し替えるだけの構成にしたのは、Runway 生成が別工程で非同期に進む前提だったため有効だった。

### テキスト可読性のコントラスト修正

動画/CSSレイヤーの上に白文字コピーを重ねる構成では、背景の明暗が場所によって変わるため、単純なヴィネット（中心が透明な `#hero-vignette`）だけでは WCAG AA（通常文字 4.5:1）を割り込む箇所があった。独立した `#hero-copy-scrim`（`mark-it-down-pseudo3d-hero.html:171-178`）を追加し、コピー背後にだけ濃い radial-gradient を重ねることで解決:

- 修正前: alpha 0.55 / ellipse 60% 45% → 最悪ケースのコントラスト比 ≈3.28:1（AA未達）
- 修正後: alpha 0.78 / ellipse 62% 48% → 最悪ケースのコントラスト比 ≈5.46:1（AA達成）

**学び**: 動画/画像背景に文字を重ねるヒーローでは、ヴィネット（雰囲気演出）とスクリム（可読性保証）を別レイヤーに分離すると、片方の見た目調整がもう片方の contrast 保証を壊さない。1枚のオーバーレイで両方を兼務させると、デザイン都合の alpha 調整がコントラスト回帰を静かに起こす。

### `prefers-reduced-motion` / モバイル対応

- `@media (prefers-reduced-motion: reduce)`（`mark-it-down-pseudo3d-hero.html:275-298`）で pin を静的化し、スクラビングを完全無効化。JS 側も `reducedMotion` フラグで ScrollTrigger 生成自体をスキップし `setProgress(1)` を直接呼ぶ二重ガードにした。
- モバイル用 9:16 動画切替は `<source media="(min-width:768px)">` によるブラウザネイティブな解決（JS の `matchMedia` 分岐は不要だった）。

### 検証で判明したツール/環境の限界（誠実に記録）

このセッションの環境では以下が**ソースコードレベルでの確認どまり**で、実機ランタイム検証はできなかった:

- `mcp__chrome-devtools__*`（CDP経由）が `172.28.128.1:9222` に接続できず、`prefers-reduced-motion` のブラウザエミュレーションが使えなかった
- `mcp__claude-in-chrome__resize_window` がこの環境では no-op で、390x844 / 414x896 を指定しても `window.innerWidth` が 2286px のまま変化せず、モバイル幅の実機検証ができなかった

両チェックリスト項目（reduced-motion 挙動・モバイル幅レイアウト）はコード読解では正しく配線されていることを確認したが、「動作を証明できるまで完了としない」の基準では**未証明**として扱う。将来この手法を本採用する際は、実機 Chrome（CDP到達可能な環境）か実デバイスでの再検証が必須。

### 自己診断した検証手法の落とし穴

サンプル自体のバグではなく、検証中に自分が踏んだテスト方法論の誤り。将来同種の検証をする際の再発防止として記録:

1. `mousemove` イベントを `window` に dispatch しても、`#hero-pin` などの子要素にバインドされたリスナーには届かない（バブリングは祖先へ向かう方向であり、window への dispatch は子孫まで届かない）。マウス視差のテストは実際のマウス操作かイベントターゲットを正しく指定する必要がある。
2. スクリーンショット座標から算出した `left_click` 座標（言語トグルボタン）が数ピクセルずれてクリックを外した。`document.getElementById(...).click()` で直接発火させて原因切り分けした。座標ベースのクリックは要素サイズが小さいトグル類で特に外しやすい。

## Runway 生成仕様（再利用可能な学びとして記録）

案Aの確定キーフレームと Runway i2v 用モーション prompt。将来同種のヒーロー動画を作る際のテンプレとして再利用可能（プロダクト固有のスキル化はしない）:

| 役割 | ファイル | 選定理由 |
|------|---------|---------|
| start | `ref/images/a41dccf7-08b7-4498-bcfd-ff6dc19d49f8.jpg` | 広い机＋開いた空白の革ノートが全景で見え、降下モーションの説得力が最も高い |
| mid | `ref/images/f5e23a19-1019-4481-957b-f4a60bbeb944.jpg` | 革ノート＋ブランド封蝋のクローズ、寄る途中の中継点 |
| end | `ref/images/3d6b1fd0-561a-4e7c-8be2-c8b6b0c9a8ef.jpg` | 余白が大きくヒーローコピーの着地点に最適 |

モーション prompt:

```
Slow cinematic forward dolly descending from the wide writing-desk shot toward the open cream
leather notebook and its red wax seal, smooth continuous camera push-in, gentle parallax between
the foreground pen/seal and the background page, soft golden afternoon filmic lighting, floating
dust motes drifting in the light, shallow depth of field, elegant and immersive, no cuts,
constant slow speed, 8K, highly detailed motion, professional cinematography
```

スクラブ用の絶対ルール: カメラは1本の連続ドリー（カット禁止）、等速・低速前進（イージングはスクロール側で付ける）、文字の焼き込み禁止（コピーはHTML側で重ねる）、尺5–8秒、16:9＋9:16の2本、生成後は `ffmpeg -i in.mp4 -g 1 -pix_fmt yuv420p -movflags +faststart hero.mp4` で全フレームキーフレーム化してシーク性能を確保する。

## 再検討する場合の次のステップ

1. Runway で案Aの3キーフレームから実際の動画を生成し、16:9 + 9:16 の2本を用意
2. `ref/Latest Doc/assets/mark-it-down-pseudo3d-hero.html` の `?mode=video` で実動画を差し込み、実機 Chrome で `prefers-reduced-motion` とモバイル幅の実機検証を完了させる（本サンプル検証時にできなかった2項目）
3. 本採用判断（動画の `public/` 配置、CSP調整、GSAP を本番依存に追加するか）は別プランとして起票する。本ファイルはその起票時の技術的たたき台として使う

## 参照

- サンプル本体: `ref/Latest Doc/assets/mark-it-down-pseudo3d-hero.html`
- 参照画像: `ref/images/`
- 手法の一次資料: `doc/temp/擬似3Dサイト.md`（拡張機能リポジトリ側）
