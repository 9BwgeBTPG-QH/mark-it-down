export type { Lang } from './index';
import type { Lang } from './index';

interface PrivacyCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  lastUpdated: string;
}

// Copy ported verbatim from docs/privacy-policy.html /
// docs/privacy-policy-ja.html (#1593 Phase 3-5, final group; restored to
// inline runs in Wave R2). This is a legal document: verbatim text migration
// takes priority over layout, so every section below preserves the old
// page's exact wording. Inline <strong>/<em>/<code> spans are restored via
// `PrivacyRun` (not flattened to plain text) — this includes whole-paragraph
// <strong> sentences (Data Collection's opening line, the closing Summary
// paragraph), and mid-sentence <em>/<code> spans in the RSS Feeds section.
//
// JA h1/lastUpdated/section text: the old markup has manually inserted
// zero-width spaces (U+200B) throughout for line-break hinting, replaced
// here by <Budoux> at render time. Stripped without real-space reinsertion,
// per the same precedent as content/why.ts / content/troubleshooting.ts /
// content/welcome.ts — a known, accepted parity gap against the SEO
// baseline's firstH1 for the JA page.
export const privacyContent: Record<Lang, PrivacyCopy> = {
  en: {
    lang: 'en',
    title: 'Privacy: Local-First Markdown Editor — Mark It Down',
    description:
      "Privacy policy for Mark It Down: local storage, no account, Web Clipper permissions, RSS feeds, optional Git sync, and Chrome extension data handling.",
    h1: 'Privacy for a local-first Markdown editor',
    lastUpdated: 'Last Updated: May 2026 (v2.2.2)',
  },
  ja: {
    lang: 'ja',
    title: 'プライバシー: ローカルファーストMarkdownエディタ — Mark It Down',
    description:
      'Mark It Downのプライバシーポリシー。ローカル保存、アカウント不要、Web Clipper権限、RSSフィード、任意のGit同期、Chrome拡張のデータ扱い。',
    h1: 'ローカルファーストMarkdownエディタのプライバシー',
    lastUpdated: '最終更新日: 2026年5月（v2.2.2）',
  },
};

// Inline run: a plain-text segment, or a single <strong>/<em>/<code> span.
// Same shape as content/okf.ts's OkfInlineRun / content/troubleshooting.ts's
// Run; not shared across files since there is no fourth consumer.
export type PrivacyRun = string | { strong: string } | { em: string } | { code: string };

export interface PrivacyListItem {
  label?: string;
  runs: PrivacyRun[];
}

export type PrivacyBlock =
  | { type: 'paragraph'; runs: PrivacyRun[] }
  | { type: 'note'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'list'; items: PrivacyListItem[] }
  | { type: 'table'; columns: string[]; rows: string[][] }
  | { type: 'linkParagraph'; before: string; linkLabel: string; linkSlug: string; after: string };

export interface PrivacySection {
  id: string;
  heading: string;
  blocks: PrivacyBlock[];
}

// Section order is NOT the same between languages: docs/privacy-policy.html
// orders Overview -> Data Collection -> Data Storage -> Web Clipper -> RSS
// Feeds -> ..., while docs/privacy-policy-ja.html orders 概要(Overview) ->
// Web Clipper -> RSSフィード -> データ収集について(Data Collection) ->
// データの保存(Data Storage) -> ... . Each language's array below preserves
// its own page's original section order exactly rather than reconciling the
// two into one shared order (#1593 Phase 3-5 review requirement).
export const privacySections: Record<Lang, PrivacySection[]> = {
  en: [
    {
      id: 'overview',
      heading: 'Overview',
      blocks: [
        {
          type: 'paragraph',
          runs: [
            "Mark It Down is a Chrome extension that provides a WYSIWYG Markdown note-taking experience in your new tab and side panel. Starting with v2.0.2, it also includes a Web Clipper that lets you save any web page or AI chat output as Markdown directly into your notes. As of v2.2.0, the extension also lets you subscribe to user-registered RSS feeds and uses a per-origin dynamic host permission flow so you can grant or revoke access to clip targets and feed sources individually. v2.2.2 adds opt-in background polling and desktop notifications for new RSS articles. This privacy policy explains how we handle your data.",
          ],
        },
      ],
    },
    {
      id: 'data-collection',
      heading: 'Data Collection',
      blocks: [
        { type: 'paragraph', runs: [{ strong: 'Mark It Down does NOT collect, transmit, or share any personal data.' }] },
        {
          type: 'paragraph',
          runs: [
            "All your notes and settings are stored locally in your browser using Chrome's storage API. We do not have servers and do not collect any information about you or your usage.",
          ],
        },
      ],
    },
    {
      id: 'data-storage',
      heading: 'Data Storage',
      blocks: [
        {
          type: 'table',
          columns: ['Data Type', 'Storage Location', 'Transmitted?'],
          rows: [
            ['Notes', 'Local (chrome.storage.local)', 'No*'],
            ['Settings', 'Local (chrome.storage.local)', 'No'],
            ['Git Token', 'Local (encrypted)', 'No'],
          ],
        },
        { type: 'note', text: '*Unless you explicitly enable Git synchronization' },
      ],
    },
    {
      id: 'web-clipper',
      heading: 'Web Clipper (Added in v2.0.2)',
      blocks: [
        { type: 'paragraph', runs: ['The Web Clipper lets you right-click any page to save it as Markdown into your notes.'] },
        { type: 'subheading', text: 'How It Works' },
        {
          type: 'list',
          items: [
            { runs: ["When you right-click and choose a clip action, the extension reads the current tab's HTML and converts it to Markdown"] },
            { runs: ['The resulting Markdown is saved locally to your notes — no data is sent to any server'] },
            {
              runs: [
                'Some platforms (e.g. AI chat services) may use your authenticated session cookies to retrieve higher-quality content for conversion. These cookies are never collected, transmitted, or stored by the extension',
              ],
            },
          ],
        },
        { type: 'subheading', text: 'What the Web Clipper Does NOT Do' },
        {
          type: 'list',
          items: [
            {
              runs: [
                'No automatic background reading — pages are only read when you explicitly trigger a user action (clip command, or the RSS fetch action described below)',
              ],
            },
            { runs: ['No credential collection or transmission of any kind'] },
            { runs: ['No browsing history tracking'] },
            { runs: ['No access to other tabs or windows'] },
          ],
        },
      ],
    },
    {
      id: 'rss-feeds',
      heading: 'RSS Feeds (Added in v2.2.0)',
      blocks: [
        {
          type: 'paragraph',
          runs: [
            'The RSS feature only operates on feed URLs that you yourself register in ',
            { em: 'Settings > RSS Feeds' },
            '. The extension never autonomously contacts URLs you have not registered or origins you have not authorized.',
          ],
        },
        { type: 'subheading', text: 'How It Works' },
        {
          type: 'list',
          items: [
            {
              label: 'Per-origin grant',
              runs: [
                ": When you register a feed URL, Chrome prompts you to grant access to that feed's origin only (e.g. ",
                { code: 'https://example.com' },
                '). The extension never requests broad permissions like ',
                { code: '<all_urls>' },
              ],
            },
            {
              label: 'Feed fetching',
              runs: [': When you press the refresh button, or when scheduled refresh is enabled, the extension issues HTTPS requests to the registered origin to retrieve the RSS XML'],
            },
            {
              label: 'Article clipping',
              runs: [": When you save an article from a feed, if the article URL's origin has not been granted yet, you are prompted again for that origin only. You can decline"],
            },
            {
              label: 'Local conversion',
              runs: [": Retrieved RSS XML and article HTML are converted to Markdown entirely inside your browser. They are never sent to our servers (we don't have any) or to any third-party server"],
            },
            {
              label: 'Revocation',
              runs: [": Removing a registered feed automatically revokes its host permission. You can also revoke permissions individually from Chrome's extension settings"],
            },
          ],
        },
        { type: 'subheading', text: 'Background Polling and Notifications (Added in v2.2.2)' },
        {
          type: 'paragraph',
          runs: [
            "When you enable scheduled refresh in RSS settings, the extension uses Chrome's ",
            { code: 'alarms' },
            ' API to wake the background service worker at your configured interval and fetch registered feeds. If you also enable desktop notifications, the extension uses Chrome\'s ',
            { code: 'notifications' },
            ' API to show a local notification listing new article titles when new items arrive. Both features are opt-in and can be disabled independently in RSS settings — disabling scheduled refresh cancels the alarm; disabling notifications suppresses the local alert. No data leaves your browser as a result of either feature.',
          ],
        },
        { type: 'subheading', text: 'Things to Note' },
        {
          type: 'list',
          items: [
            {
              runs: [
                "The feed publisher's server will see normal HTTP access logs (IP address, User-Agent, timestamp, etc.) just like any web request. This is between you and that publisher",
              ],
            },
            {
              runs: [
                'Registered feed URLs and retrieved article data are stored only locally (chrome.storage.local) and are deleted when the extension is uninstalled',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'git-sync',
      heading: 'Git Synchronization (Optional)',
      blocks: [
        { type: 'paragraph', runs: ['If you choose to enable Git synchronization:'] },
        { type: 'subheading', text: 'Token Security' },
        {
          type: 'list',
          items: [
            { label: 'Encryption', runs: [': Your token is encrypted using AES-256-GCM with PBKDF2 key derivation'] },
            { label: 'Storage', runs: [": The encrypted token is stored only in your browser's local storage"] },
            { label: 'No transmission to us', runs: [": Your token is never sent to our servers (we don't have any)"] },
          ],
        },
        { type: 'subheading', text: 'Data Transmission' },
        {
          type: 'list',
          items: [
            { label: 'Direct Communication', runs: [': Notes are transmitted directly between your browser and your Git repository'] },
            { label: 'No Intermediary', runs: [': No data passes through any third-party servers'] },
            { label: 'Your Control', runs: [': You can disconnect Git synchronization at any time'] },
          ],
        },
      ],
    },
    {
      id: 'permissions',
      heading: 'Permissions Explained',
      blocks: [
        {
          type: 'table',
          columns: ['Permission', 'Purpose'],
          rows: [
            ['storage', 'Store your notes and settings locally in Chrome'],
            ['unlimitedStorage', 'Support unlimited notes without storage restrictions'],
            ['sidePanel', 'Enable the side panel feature for note-taking while browsing'],
            ['contextMenus', 'Add right-click menu entries for the Web Clipper'],
            ['activeTab', "Read the current tab's content when you trigger a clip action"],
            ['scripting', 'Run the content extraction script on the active tab during a clip action'],
            [
              'alarms',
              "Schedule periodic RSS feed polling at your configured interval. The schedule runs entirely inside your browser using Chrome's built-in alarm API; no remote scheduler is contacted",
            ],
            [
              'notifications',
              'Show a desktop notification when new RSS articles arrive, only if you opt in from RSS settings. Notification content (new article titles) is generated locally from feed data already stored in your browser',
            ],
            [
              'optional_host_permissions (http/https)',
              'Per-origin dynamic access for RSS feed URLs and Web Clipper article URLs. Granted only when you register a feed or clip a new origin, scoped to that single origin, and revocable at any time. The extension never pre-grants broad host access',
            ],
          ],
        },
      ],
    },
    {
      id: 'third-party',
      heading: 'Third-Party Services',
      blocks: [
        {
          type: 'paragraph',
          runs: ['Mark It Down does not integrate with any third-party analytics, advertising, or data collection services.'],
        },
        {
          type: 'paragraph',
          runs: [
            'The only external services involved are listed below. In every case, your browser communicates directly with the service — nothing passes through any server we operate:',
          ],
        },
        {
          type: 'list',
          items: [
            { label: 'GitHub / GitLab', runs: [' (only if you enable Git synchronization) — destination for note sync'] },
            { label: 'RSS feed publishers you register', runs: [' (v2.2.0+) — source of feed XML'] },
            { label: 'Hosts of articles you clip with Web Clipper', runs: [' — source of article HTML'] },
          ],
        },
        {
          type: 'paragraph',
          runs: ['All three are limited to destinations you explicitly registered or acted upon. The extension never autonomously contacts origins you have not authorized.'],
        },
      ],
    },
    {
      id: 'retention',
      heading: 'Data Retention',
      blocks: [
        {
          type: 'list',
          items: [
            { runs: ['Your data remains on your device as long as the extension is installed'] },
            { runs: ['Uninstalling the extension will delete all locally stored data'] },
            { runs: ['We have no access to your data and cannot recover it'] },
          ],
        },
      ],
    },
    {
      id: 'contact',
      heading: 'Contact',
      blocks: [
        {
          type: 'linkParagraph',
          before: 'If you have questions about this privacy policy, please visit our ',
          linkLabel: 'Feedback page',
          linkSlug: 'feedback',
          after: '.',
        },
      ],
    },
    {
      id: 'summary',
      heading: 'Summary',
      blocks: [
        {
          type: 'paragraph',
          runs: [{ strong: "Your data is yours. We don't collect it, we don't see it, we don't sell it. Everything stays on your device." }],
        },
      ],
    },
  ],
  ja: [
    {
      id: 'overview',
      heading: '概要',
      blocks: [
        {
          type: 'paragraph',
          runs: [
            'Mark It Downは、新しいタブとサイドパネルでMarkdownメモ体験を提供するChrome拡張機能です。v2.0.2より、右クリックメニューからWebページやテキスト選択をMarkdownとして取り込む「Web Clipper」機能が追加されました。v2.2.0では、ユーザーが登録したRSSフィードからの記事取得機能と、Web Clipper / RSSフィード対象URLへのアクセス権限をユーザーが個別に許可・拒否できる動的ホスト権限の仕組みが追加されています。v2.2.2では、RSS設定でオプトインすることでバックグラウンド定期取得とデスクトップ通知が利用できます。このプライバシーポリシーでは、お客様のデータの取り扱いについて説明します。',
          ],
        },
      ],
    },
    {
      id: 'web-clipper',
      heading: 'Web Clipper（v2.0.2で追加）',
      blocks: [
        { type: 'paragraph', runs: ['Web Clipper機能は、ユーザーが右クリックメニューから操作を実行したときのみ動作します。'] },
        { type: 'subheading', text: '動作の仕組み' },
        {
          type: 'list',
          items: [
            {
              runs: [
                'ユーザーが右クリックメニューからクリップ操作を選択すると、拡張機能は',
                { strong: '現在のタブのページ内容（HTML）を読み取り' },
                '、Markdownに変換します',
              ],
            },
            { runs: ['変換されたMarkdownはノートとしてローカルに保存されます'] },
            {
              runs: [
                '一部のプラットフォームでは、変換精度を向上させるために、そのプラットフォーム上でのお客様の認証済みセッション（Cookie）を利用してページ内容を取得する場合があります',
              ],
            },
          ],
        },
        { type: 'subheading', text: 'Web Clipperが行わないこと' },
        {
          type: 'list',
          items: [
            {
              label: 'バックグラウンドでの自動ページ読み取りは行いません',
              runs: [' — ユーザーが明示的に実行した操作（クリップ実行、または下記のRSSフィード取得操作）以外でページにアクセスすることはありません'],
            },
            {
              label: '認証情報の収集・送信は行いません',
              runs: [' — Cookieはブラウザ内の同一オリジン通信にのみ使用され、外部に送信されることはありません'],
            },
            { label: '閲覧履歴の追跡は行いません', runs: [' — どのページを訪問したかの記録は一切保持しません'] },
            { label: '他のタブへのアクセスは行いません', runs: [' — 操作対象のタブのみにアクセスします'] },
          ],
        },
      ],
    },
    {
      id: 'rss-feeds',
      heading: 'RSSフィード（v2.2.0で追加）',
      blocks: [
        {
          type: 'paragraph',
          runs: [
            'RSSフィード機能は、お客様自身が設定画面（Settings > RSS Feeds）に登録したフィードURLに対してのみ動作します。登録されていないURLや、お客様が許可していないオリジンへ拡張機能が自発的にアクセスすることはありません。',
          ],
        },
        { type: 'subheading', text: '動作の仕組み' },
        {
          type: 'list',
          items: [
            {
              label: '個別オリジン付与',
              runs: [
                ': フィードURLを登録するとき、Chromeの権限ダイアログが表示され、当該フィードのオリジン（例: ',
                { code: 'https://example.com' },
                '）に対してのみアクセス権限を付与します。',
                { code: '<all_urls>' },
                'のような広範な権限は要求しません',
              ],
            },
            {
              label: 'フィード取得',
              runs: [': フィードリストの更新ボタン押下時、または定期取得が有効な場合、登録済みオリジンに対してHTTPSリクエストを送信し、RSS XMLを取得します'],
            },
            {
              label: '記事クリップ',
              runs: [': フィード内の記事を保存する際、その記事URLのオリジンが未付与なら、同じく権限ダイアログで個別申請します。お客様は拒否できます'],
            },
            {
              label: 'ローカル変換',
              runs: [': 取得したRSS XMLおよび記事HTMLは、お客様のブラウザ内のみでMarkdownへ変換されます。当社サーバー（存在しません）や第三者サーバーには送信されません'],
            },
            {
              label: '権限の取消',
              runs: [': 登録済みフィードを削除すると、対応するホスト権限も自動的に取り消されます。Chromeの拡張機能管理画面からも個別に取消可能です'],
            },
          ],
        },
        { type: 'subheading', text: 'バックグラウンド定期取得と通知（v2.2.2で追加）' },
        {
          type: 'paragraph',
          runs: [
            'RSS設定で定期取得を有効にすると、拡張機能はChromeの',
            { code: 'alarms' },
            ' APIを使用して設定間隔ごとにバックグラウンドのサービスワーカーを起動し、登録済みフィードを取得します。デスクトップ通知も有効にすると、新着記事が見つかった際にChromeの',
            { code: 'notifications' },
            ' APIでローカル通知（新着タイトルの一覧）を表示します。いずれもオプトイン設定で、個別に無効化できます。定期取得を無効にするとアラームが解除され、通知を無効にすると新着アラートが抑制されます。どちらの機能もお客様のブラウザ外にデータを送信しません。',
          ],
        },
        { type: 'subheading', text: '注意点' },
        {
          type: 'list',
          items: [
            {
              runs: [
                'フィード発行元のサーバーには、通常のWebアクセスと同様にHTTPアクセスログ（IPアドレス、User-Agent、アクセス時刻など）が残ります。これはお客様の責任範囲となります',
              ],
            },
            {
              runs: [
                '登録済みフィードURLおよび取得した記事データは、すべてローカル（chrome.storage.local）にのみ保存され、拡張機能のアンインストール時に削除されます',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'data-collection',
      heading: 'データ収集について',
      blocks: [
        { type: 'paragraph', runs: [{ strong: 'Mark It Downは、個人データを収集、送信、共有しません。' }] },
        {
          type: 'paragraph',
          runs: [
            'すべてのノートと設定は、ChromeのストレージAPIを使用してブラウザ内にローカル保存されます。私たちはサーバーを持たず、お客様やご利用状況に関する情報を一切収集しません。',
          ],
        },
      ],
    },
    {
      id: 'data-storage',
      heading: 'データの保存',
      blocks: [
        {
          type: 'table',
          columns: ['データの種類', '保存場所', '送信の有無'],
          rows: [
            ['ノート', 'ローカル（chrome.storage.local）', 'なし*'],
            ['設定', 'ローカル（chrome.storage.local）', 'なし'],
            ['Gitトークン', 'ローカル（暗号化）', 'なし'],
          ],
        },
        { type: 'note', text: '*Git同期を明示的に有効にした場合を除く' },
      ],
    },
    {
      id: 'git-sync',
      heading: 'Git同期（オプション）',
      blocks: [
        { type: 'paragraph', runs: ['Git同期を有効にした場合：'] },
        { type: 'subheading', text: 'トークンのセキュリティ' },
        {
          type: 'list',
          items: [
            { label: '暗号化', runs: [': トークンはPBKDF2鍵導出を用いたAES-256-GCMで暗号化されます'] },
            { label: '保存', runs: [': 暗号化されたトークンはブラウザのローカルストレージにのみ保存されます'] },
            { label: '私たちへの送信なし', runs: [': トークンが私たちのサーバーに送信されることはありません（サーバーは存在しません）'] },
          ],
        },
        { type: 'subheading', text: 'データ通信' },
        {
          type: 'list',
          items: [
            { label: '直接通信', runs: [': ノートはお客様のブラウザとGitリポジトリ間で直接送受信されます'] },
            { label: '仲介なし', runs: [': データが第三者のサーバーを経由することはありません'] },
            { label: 'お客様の管理下', runs: [': Git同期はいつでも解除できます'] },
          ],
        },
      ],
    },
    {
      id: 'permissions',
      heading: '権限の説明',
      blocks: [
        {
          type: 'table',
          columns: ['権限', '目的'],
          rows: [
            ['storage', 'ノートと設定をChromeにローカル保存するため'],
            ['unlimitedStorage', 'ストレージ制限なしで無制限のノートをサポートするため'],
            ['sidePanel', 'ブラウジング中にメモを取るためのサイドパネル機能を有効にするため'],
            ['contextMenus', 'Web Clipper用の右クリックメニュー項目を追加するため'],
            ['activeTab', 'ユーザーがクリップ操作を実行した際に、現在のタブのページ内容を読み取るため'],
            ['scripting', 'ユーザーがクリップ操作を実行した際に、ページのDOM読み取りスクリプトを注入するため'],
            [
              'alarms',
              'RSS設定で指定した間隔でRSSフィードの定期取得スケジュールを管理するため。スケジュールはChromeのアラームAPIを使ってブラウザ内部のみで動作し、外部のスケジューラーとは通信しません',
            ],
            [
              'notifications',
              'RSS設定でオプトインした場合のみ、新着RSS記事が届いたときにデスクトップ通知を表示するため。通知内容（新着タイトル一覧）はブラウザ内に保存済みのフィードデータからローカルで生成されます',
            ],
            [
              'optional_host_permissions (http/https)',
              'RSSフィードURLおよびWeb Clipper対象記事URLへの動的アクセス。フィード登録時/クリップ時に該当オリジンのみ個別付与され、ユーザーはいつでも拒否・取消可能。広範な事前付与は行わない',
            ],
          ],
        },
      ],
    },
    {
      id: 'third-party',
      heading: 'サードパーティサービス',
      blocks: [
        { type: 'paragraph', runs: ['Mark It Downは、サードパーティの分析、広告、データ収集サービスと連携していません。'] },
        {
          type: 'paragraph',
          runs: ['関連する外部サービスは以下に限られ、いずれもお客様のブラウザから当該サービスへ直接通信し、当社サーバーを経由しません:'],
        },
        {
          type: 'list',
          items: [
            { label: 'GitHub / GitLab', runs: ['（Git同期を有効化した場合のみ）— ノートの同期先'] },
            { label: 'お客様が登録したRSSフィード発行元のサーバー', runs: ['（v2.2.0以降）— フィードXMLの取得先'] },
            { label: 'Web Clipperでクリップした対象記事のホスト', runs: [' — 記事HTMLの取得先'] },
          ],
        },
        {
          type: 'paragraph',
          runs: ['いずれもお客様が明示的に登録・操作した宛先のみが対象であり、登録されていないオリジンへ拡張機能が自発的に通信することはありません。'],
        },
      ],
    },
    {
      id: 'retention',
      heading: 'データの保持',
      blocks: [
        {
          type: 'list',
          items: [
            { runs: ['データは拡張機能がインストールされている限り、お客様のデバイスに保持されます'] },
            { runs: ['拡張機能をアンインストールすると、ローカルに保存されたすべてのデータが削除されます'] },
            { runs: ['私たちはお客様のデータにアクセスできず、復元することもできません'] },
          ],
        },
      ],
    },
    {
      id: 'contact',
      heading: 'お問い合わせ',
      blocks: [
        {
          type: 'linkParagraph',
          before: 'このプライバシーポリシーに関するご質問は',
          linkLabel: 'フィードバックページ',
          linkSlug: 'feedback',
          after: 'までお願いします。',
        },
      ],
    },
    {
      id: 'summary',
      heading: 'まとめ',
      blocks: [
        {
          type: 'paragraph',
          runs: [{ strong: 'お客様のデータはお客様のものです。私たちはそれを収集せず、見ることもなく、販売することもありません。すべてはお客様のデバイス内に留まります。' }],
        },
      ],
    },
  ],
};
