export type { Lang } from './index';
import type { Lang } from './index';

interface TroubleshootingCopy {
  lang: Lang;
  title: string;
  description: string;
  eyebrow: string;
  h1: string;
  heroSubtitle: string;
}

// Hero copy lifted verbatim from docs/troubleshooting.html /
// docs/troubleshooting-ja.html (#1593 Phase 3-4).
//
// JA h1: the old markup separated phrases with manually inserted zero-width
// spaces (U+200B) for line-break hinting (same precedent as content/why.ts /
// content/clipper.ts). Unlike those pages, stripping the zero-width spaces
// here does not cause any words to run together (every boundary already sits
// between two CJK-adjacent or comma-separated segments), so no real space is
// reinserted — the same "no reinsertion needed" outcome already documented in
// content/features.ts's own JA h1 comment.
export const troubleshootingContent: Record<Lang, TroubleshootingCopy> = {
  en: {
    lang: 'en',
    title: 'Troubleshooting Web Clipper, RSS, Git Sync — Mark It Down',
    description:
      'Troubleshooting for Mark It Down: Web Clipper permissions, RSS feeds, Git sync, local storage, export, and Chrome extension behavior.',
    eyebrow: 'Troubleshooting',
    h1: 'Troubleshooting Web Clipper, RSS, and Git sync',
    heroSubtitle: 'Solutions to common issues and maintenance tools.',
  },
  ja: {
    lang: 'ja',
    title: 'トラブルシューティング: Web Clipper・RSS・Git同期 — Mark It Down',
    description:
      'Mark It Downのトラブルシューティング。Web Clipperの権限、RSSフィード、Git同期、ローカル保存、書き出し、Chrome拡張の挙動。',
    eyebrow: 'トラブルシューティング',
    h1: 'Web Clipper、RSS、Git同期のトラブルシューティング',
    heroSubtitle: 'よくある問題の解決方法とメンテナンスツール。',
  },
};

// Inline run: a plain-text segment, or a single <strong>/<em>/<code> span.
// Restored per #1593 Wave R2 fidelity requirement (previously flattened to
// plain text — see git history of this file before the restoration commit).
// Same shape as content/okf.ts's OkfInlineRun; not shared across files since
// there is no third consumer.
export type Run = string | { strong: string } | { em: string } | { code: string };

// One `<details>` per issue (6 flat items, no categories). `group` covers the
// nested `.changelog-group` sub-sections inside several items (e.g. "How to
// Repair" / "What Gets Detected") — each is its own real heading followed by
// its own blocks, one level deeper than the item itself. `termList` covers the
// `.changelog-features` bullet lists whose <li> is a <strong> term followed by
// a <span> description (e.g. "Duplicate notes — Notes with the same title...");
// these have no inline tags inside term/description themselves in the old
// markup, so they stay plain strings. `list.items` is `Run[][]` — one run
// array per `<li>` — since nearly every ordered-list item in this page's old
// markup carries a leading `<strong>Label</strong>` and, in the RSS items,
// embedded `<em>`/`<code>` spans mid-sentence.
export type TroubleshootingBlock =
  | { type: 'paragraph'; runs: Run[] }
  | { type: 'list'; ordered: boolean; items: Run[][] }
  | { type: 'termList'; items: { term: string; description: string }[] }
  | { type: 'group'; title: string; blocks: TroubleshootingBlock[] };

export interface TroubleshootingItem {
  title: string;
  /** First item only, matching the old markup's bare `open` attribute. */
  defaultOpen?: boolean;
  blocks: TroubleshootingBlock[];
}

// Content lifted verbatim from docs/troubleshooting.html /
// docs/troubleshooting-ja.html's 6 flat accordion items.
export const troubleshootingItems: Record<Lang, TroubleshootingItem[]> = {
  en: [
    {
      title: '🔧 Storage Repair — Fix duplicate notes and data issues',
      defaultOpen: true,
      blocks: [
        { type: 'paragraph', runs: ['If duplicate notes or data inconsistencies occur, you can repair storage from the settings.'] },
        {
          type: 'group',
          title: 'How to Repair',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                ['Open ', { strong: '⚙ Settings' }, ' → ', { strong: 'Troubleshooting' }, ' tab → ', { strong: 'Repair Storage' }],
                ['Click the ', { strong: '"Scan"' }, ' button'],
                ['If issues are found, select notes to delete and repair'],
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'What Gets Detected',
          blocks: [
            {
              type: 'termList',
              items: [
                { term: 'Duplicate notes', description: 'Notes with the same title exist in multiple folders' },
                { term: 'Ghost notes', description: 'Notes in storage but not visible in UI (rare, caused by interrupted Git sync)' },
              ],
            },
          ],
        },
      ],
    },
    {
      title: '📊 Storage Analysis — Check usage and organize notes',
      blocks: [
        { type: 'paragraph', runs: ['Check storage usage and organize old notes in bulk.'] },
        {
          type: 'group',
          title: 'How to Analyze',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                ['Open ', { strong: '⚙ Settings' }, ' → ', { strong: 'Troubleshooting' }, ' tab → ', { strong: 'Storage Analysis' }],
                ['Click the ', { strong: '"Analyze"' }, ' button'],
              ],
            },
          ],
        },
        {
          type: 'group',
          title: "What's Displayed",
          blocks: [
            {
              type: 'termList',
              items: [
                { term: 'Notes by folder', description: 'Number of notes and percentage per folder' },
                { term: 'Top 10 largest notes', description: 'With checkboxes for bulk archive' },
                { term: 'Stale notes', description: 'Notes not updated for 90+ days' },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: 'Bulk Archive',
          blocks: [
            {
              type: 'paragraph',
              runs: ['Select notes and move them to Archive folder in bulk with pinning. Useful for regular backups and storage cleanup.'],
            },
            { type: 'paragraph', runs: [{ em: 'System Notes are excluded from analysis (auto-generated guide files).' }] },
          ],
        },
      ],
    },
    {
      title: '📋 Duplicate Detection — Side-by-side comparison',
      blocks: [
        { type: 'paragraph', runs: ['If notes with the same title are detected, a warning banner is displayed.'] },
        {
          type: 'termList',
          items: [
            { term: 'Warning banner', description: 'Appears when duplicate notes are detected' },
            { term: 'Side-by-side comparison', description: 'Click to open comparison modal' },
            { term: 'Choose to keep', description: 'Select which note to keep, delete the other' },
          ],
        },
      ],
    },
    {
      title: '⚠️ Before Uninstalling — Back up your data first!',
      blocks: [
        { type: 'paragraph', runs: [{ strong: 'Uninstalling the extension will delete all saved notes.' }] },
        {
          type: 'paragraph',
          runs: [
            'Mark It Down data is stored in ',
            { code: 'chrome.storage.local' },
            ', and uninstalling the extension will delete the data.',
          ],
        },
        {
          type: 'group',
          title: 'Backup Methods',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [{ strong: 'Export all notes as ZIP' }, ' — Settings (⚙) → "Export all notes as ZIP"'],
                [{ strong: 'Push to GitHub' }, ' — Git ▼ → Sync (or Git Settings → Push)'],
              ],
            },
            { type: 'paragraph', runs: [{ em: 'We recommend regular exports to avoid losing important notes.' }] },
          ],
        },
      ],
    },
    {
      title: '🔔 RSS Notifications Not Appearing',
      blocks: [
        {
          type: 'paragraph',
          runs: ["If you've enabled desktop notifications in RSS settings but aren't seeing them, check the following in order:"],
        },
        {
          type: 'group',
          title: 'Checklist',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [
                  { strong: 'Scheduled refresh also enabled?' },
                  ' — Notifications are sent by background polling. Make sure ',
                  { em: 'RSS settings > Scheduled refresh' },
                  ' is also turned on, not just notifications.',
                ],
                [
                  { strong: 'Chrome notification permission' },
                  ' — Open ',
                  { code: 'chrome://settings/content/notifications' },
                  ' and confirm the extension is not blocked.',
                ],
                [
                  { strong: 'OS notification settings' },
                  ' — On Windows, check ',
                  { em: 'System > Notifications > Chrome' },
                  '. On macOS, check ',
                  { em: 'System Settings > Notifications > Google Chrome' },
                  '. Make sure Chrome notifications are allowed.',
                ],
                [
                  { strong: 'Feed has new items?' },
                  ' — Notifications only appear when a fetch finds articles newer than the last check. Try adding a feed that updates frequently to confirm the flow works.',
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      title: '⏱️ Background RSS Fetch Not Running',
      blocks: [
        { type: 'paragraph', runs: ["If feeds aren't updating automatically even with scheduled refresh enabled:"] },
        {
          type: 'group',
          title: 'Checklist',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [
                  { strong: 'Is Chrome running?' },
                  ' — Background polling requires Chrome to be open. It does not run while Chrome is fully closed.',
                ],
                [
                  { strong: 'Check alarm registration' },
                  " — Open the extension's background service worker in ",
                  { code: 'chrome://extensions' },
                  ' (click "Service Worker" link) and look for alarm-related log entries. If the service worker is inactive, opening any Mark It Down tab will wake it up and re-register the alarm.',
                ],
                [
                  { strong: 'Re-toggle the setting' },
                  ' — Turn scheduled refresh off and back on in RSS settings to force alarm re-registration.',
                ],
                [
                  { strong: 'Host permissions granted?' },
                  ' — Background fetch requires host permissions for each registered feed origin. The extension icon badge shows a count if permissions are missing. Click the badge or open RSS settings to grant them.',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
  ja: [
    {
      title: '🔧 ストレージ修復 — 重複ノートやデータ問題を修正',
      defaultOpen: true,
      blocks: [
        { type: 'paragraph', runs: ['重複ノートやデータの不整合が発生した場合、設定画面から修復できます。'] },
        {
          type: 'group',
          title: '修復方法',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [{ strong: '⚙ 設定' }, ' → ', { strong: 'Troubleshooting' }, ' タブ → ', { strong: 'Repair Storage' }],
                [{ strong: '「スキャン」' }, 'ボタンをクリック'],
                ['問題が見つかった場合、削除するノートを選択して修復'],
              ],
            },
          ],
        },
        {
          type: 'group',
          title: '検出項目',
          blocks: [
            {
              type: 'termList',
              items: [
                { term: '重複ノート', description: '同じタイトルのノートが複数フォルダに存在' },
                { term: 'ゴーストノート', description: 'UIに表示されないがストレージに存在（Git同期中断時に稀に発生）' },
              ],
            },
          ],
        },
      ],
    },
    {
      title: '📊 ストレージ分析 — 使用状況の確認とノート整理',
      blocks: [
        { type: 'paragraph', runs: ['ストレージ使用状況を確認し、古いノートを一括整理できます。'] },
        {
          type: 'group',
          title: '分析方法',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [{ strong: '⚙ 設定' }, ' → ', { strong: 'Troubleshooting' }, ' タブ → ', { strong: 'Storage Analysis' }],
                [{ strong: '「Analyze」' }, 'ボタンをクリック'],
              ],
            },
          ],
        },
        {
          type: 'group',
          title: '表示内容',
          blocks: [
            {
              type: 'termList',
              items: [
                { term: 'フォルダ別ノート数', description: 'フォルダ別のノート数と割合' },
                { term: 'サイズの大きいTop 10ノート', description: 'チェックボックス付きで一括アーカイブ可能' },
                { term: 'Stale Notes', description: '90日以上更新されていない古いノート' },
              ],
            },
          ],
        },
        {
          type: 'group',
          title: '一括アーカイブ',
          blocks: [
            {
              type: 'paragraph',
              runs: ['選択したノートを一度にArchiveフォルダへ移動＆ピン留め。定期バックアップやストレージ整理に便利。'],
            },
            { type: 'paragraph', runs: [{ em: 'システムノートは分析対象外です（自動生成ガイドファイル）。' }] },
          ],
        },
      ],
    },
    {
      title: '📋 重複ノート検出 — side-by-side比較',
      blocks: [
        { type: 'paragraph', runs: ['同じタイトルのノートが存在する場合、警告バナーが表示されます。'] },
        {
          type: 'termList',
          items: [
            { term: '警告バナー', description: '重複ノート検出時に表示' },
            { term: 'side-by-side比較', description: 'クリックで比較モーダルを開く' },
            { term: '保持選択', description: 'どちらのノートを残すか選択、もう一方を削除' },
          ],
        },
      ],
    },
    {
      title: '⚠️ アンインストール前の注意 — データをバックアップ！',
      blocks: [
        { type: 'paragraph', runs: [{ strong: '拡張機能を削除すると、保存されたすべてのノートが消失します。' }] },
        {
          type: 'paragraph',
          runs: ['Mark It Downのデータは', { code: 'chrome.storage.local' }, 'に保存されており、拡張機能をアンインストールするとデータも削除されます。'],
        },
        {
          type: 'group',
          title: 'バックアップ方法',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [{ strong: '全ノートをZIPエクスポート' }, ' — 設定（⚙）→ 「全ノートをZIPでエクスポート」'],
                [{ strong: 'GitHubにプッシュ' }, ' — Git ▼ → Sync（または Git Settings → Push）'],
              ],
            },
            { type: 'paragraph', runs: [{ em: '大切なノートを失わないよう、定期的なエクスポートをお勧めします。' }] },
          ],
        },
      ],
    },
    {
      title: '🔔 RSS通知が届かない',
      blocks: [
        { type: 'paragraph', runs: ['RSS設定でデスクトップ通知を有効にしたのに通知が届かない場合は、以下の順番で確認してください：'] },
        {
          type: 'group',
          title: 'チェックリスト',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [
                  { strong: '定期取得も有効になっていますか？' },
                  ' — 通知はバックグラウンド取得によって送られます。',
                  { em: 'RSS設定 > 定期取得' },
                  'も通知と合わせて有効にしてください。',
                ],
                [
                  { strong: 'Chromeの通知許可' },
                  ' — ',
                  { code: 'chrome://settings/content/notifications' },
                  'を開き、この拡張機能がブロックされていないか確認してください。',
                ],
                [
                  { strong: 'OSの通知設定' },
                  ' — Windowsの場合は',
                  { em: 'システム > 通知とアクション > Chrome' },
                  '、macOSの場合は',
                  { em: 'システム設定 > 通知 > Google Chrome' },
                  'でChromeの通知が許可されているか確認してください。',
                ],
                [
                  { strong: 'フィードに新着はありますか？' },
                  ' — 通知は前回チェック以降に新着記事が見つかった場合のみ送られます。更新頻度の高いフィードを追加して動作確認してみてください。',
                ],
              ],
            },
          ],
        },
      ],
    },
    {
      title: '⏱️ RSSバックグラウンド取得が動いていない',
      blocks: [
        { type: 'paragraph', runs: ['定期取得を有効にしてもフィードが自動更新されない場合：'] },
        {
          type: 'group',
          title: 'チェックリスト',
          blocks: [
            {
              type: 'list',
              ordered: true,
              items: [
                [
                  { strong: 'Chromeは起動していますか？' },
                  ' — バックグラウンド取得にはChromeが起動している必要があります。Chrome自体を完全に閉じると動作しません。',
                ],
                [
                  { strong: 'アラームの登録確認' },
                  ' — ',
                  { code: 'chrome://extensions' },
                  'から拡張機能のService Workerを開き（「Service Worker」リンクをクリック）、アラーム関連のログを確認してください。Service Workerが非アクティブの場合は、Mark It Downのタブを開くと起動し直してアラームが再登録されます。',
                ],
                [
                  { strong: '設定を一度オフ→オンにする' },
                  ' — RSS設定で定期取得を一度無効にして再度有効にすると、アラームが強制再登録されます。',
                ],
                [
                  { strong: 'ホスト権限は付与されていますか？' },
                  ' — バックグラウンド取得には登録済み各フィードへのホスト権限が必要です。権限が不足している場合は拡張機能アイコンのバッジに件数が表示されます。バッジをクリックするかRSS設定を開いて権限を付与してください。',
                ],
              ],
            },
          ],
        },
      ],
    },
  ],
};

// Closing cross-link CTA, ported verbatim from docs/troubleshooting.html /
// docs/troubleshooting-ja.html (`#cta-heading` + its following <p>, 2 inline
// links: FAQ and Feedback). Same shape as content/faq.ts's FaqCtaCopy —
// duplicated here rather than shared, since the two pages' CTA copy diverges
// per language and there is no third consumer. No inline tags in this copy,
// so it stays plain strings (unlike TroubleshootingBlock above).
export interface TroubleshootingCtaCopy {
  heading: string;
  before: string;
  firstLabel: string;
  firstSlug: string;
  between: string;
  secondLabel: string;
  secondSlug: string;
  after: string;
}

export const troubleshootingCta: Record<Lang, TroubleshootingCtaCopy> = {
  en: {
    heading: 'Still need help?',
    before: 'Check out ',
    firstLabel: 'FAQ',
    firstSlug: 'faq',
    between: ' or ',
    secondLabel: 'send us feedback',
    secondSlug: 'feedback',
    after: '.',
  },
  ja: {
    heading: 'まだサポートが必要ですか？',
    before: '',
    firstLabel: 'よくある質問',
    firstSlug: 'faq',
    between: 'を確認するか、',
    secondLabel: 'フィードバックを送信',
    secondSlug: 'feedback',
    after: 'してください。',
  },
};

// No JSON-LD here: unlike docs/faq.html, docs/troubleshooting.html /
// docs/troubleshooting-ja.html have no <script type="application/ld+json">
// block to port.
