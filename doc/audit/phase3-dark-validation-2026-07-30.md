# Phase 3 ダークテーマ検証（ブラウザ設定追従）

- 実施日: 2026-07-30
- 対象: Issue #1664
- Phase 3a: `fff4b80`（ソース）、`3cc3f5d`（生成物）
- Phase 3b 初版: `b556866`（ソース）、`dd0af29`（生成物）

Phase 3b 初版では、System / Light / Dark の選択機能を公開した。その後の確認で、サイト内の選択機能を廃止し、ブラウザ設定だけに従う仕様へ変更した。

## 採用仕様

| 項目 | 実装 |
|---|---|
| Light | `:root` の既定値 |
| Dark | `@media (prefers-color-scheme: dark)` の上書き |
| 対応宣言 | `color-scheme` メタデータ |
| テーマ選択UI | 設置しない |
| 状態保存 | 使用しない |
| 初期化処理 | 使用しない |
| 静的ビューア | 本体と同じメタデータとCSS |

テーマはブラウザのメディアクエリに追従する。クライアント側の初期化や再描画を介さないため、タブ間同期やハイドレーション抑制も不要になった。

`html[data-theme="dark"]` は回帰テスト用の上書きに限って残している。公開コードはこの属性を書き込まない。

## 静的検査

| 検査 | 結果 |
|---|---:|
| Phase 1 タイポグラフィ監査 | PASS |
| Phase 2 Lightテーマ監査 | PASS |
| Phase 3 カラートークン監査 | PASS |
| ブラウザ設定追従監査 | PASS |
| Light基準画像のハッシュ | 変更なし |
| Dark用上書き | 67件 |
| 固定色の上書き | 0件 |
| Light / Darkトークン対応 | PASS |
| 未分類色 | 0件 |
| コントラスト検査 | 17件、最小値 7.25 |
| テーマUI・保存・初期化処理の参照 | 0件 |
| TypeScript / build | PASS |
| 文書内リンク | 98件 |
| 欠落・大小文字不一致・孤立文書 | 各0件 |

文書検査では、`budoux`、`linkedom`、`canvas` の既知警告が出る。今回の差分に起因するエラーではない。

## ブラウザ検証

| 検査 | 結果 |
|---|---:|
| ルート検証 | 52 / 52 |
| Light | 26 |
| Dark | 26 |
| 英語 | 26 |
| 日本語 | 26 |
| 横方向のはみ出し | 0 |
| テーマ選択UIの表示 | 0 |
| ルート要素のテーマ属性 | 0 |
| 静的ビューア | 4 / 4 |
| モバイル幅 | 4 / 4 |
| Chromium | 2 / 2 |
| Firefox | 2 / 2 |
| WebKit | 2 / 2 |
| サイト由来のリソースエラー | 0 |
| ハイドレーションエラー | 0 |

保存済みテーマを想定した古い値を事前に入れた状態でも、表示はブラウザ設定に従った。

CLSはLightとDarkで各3回計測し、全試行で0だった。

## 画面上の確認値

| 対象 | Light | Dark |
|---|---|---|
| ページ背景 | `rgb(247, 246, 241)` | `rgb(19, 18, 16)` |
| 本文 | `rgb(34, 34, 34)` | `rgb(238, 234, 225)` |
| 罫線 | `rgb(34, 34, 34)` | `rgb(181, 175, 163)` |
| アクセント | `rgb(255, 210, 63)` | `rgb(255, 210, 63)` |

英語・日本語の主要画面、モバイル幅、静的ビューアで、本文、リンク、表、コード、警告、図版の判読性を目視確認した。

## 修正した問題

1. サイト内の三択UIがブラウザ設定と役割を重複していたため、UIと状態管理を削除した。
2. テーマUIの追加でナビゲーション密度と導入部の行構成が変わっていたため、従来の配置へ戻した。
3. 初期化スクリプトがCSSの判断を後処理していたため、メディアクエリへ一本化した。
4. 静的ビューア専用の制御経路を廃止し、本体と同じCSS契約へ統一した。
5. 保存済みの古いテーマ値が表示を固定しないことを回帰テストで確認した。
6. 検証用に残っていた孤立画像31件を整理した。

## 証跡

- `doc/design-samples/2026-07-brushup/screenshots/phase3b-final-browser-light-en-1280.png`
- `doc/design-samples/2026-07-brushup/screenshots/phase3b-final-browser-dark-en-1280.png`
- `doc/design-samples/2026-07-brushup/screenshots/phase3b-final-browser-light-ja-390.png`
- `doc/design-samples/2026-07-brushup/screenshots/phase3b-final-browser-dark-ja-390.png`
- `doc/design-samples/2026-07-brushup/screenshots/phase3b-final-browser-static-viewer-dark.png`
