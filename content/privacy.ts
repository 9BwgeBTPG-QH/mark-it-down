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
    lastUpdated: 'Last Updated: July 2026 (v2.3.2)',
  },
  ja: {
    lang: 'ja',
    title: 'プライバシー: ローカルファーストMarkdownエディタ — Mark It Down',
    description:
      'Mark It Downのプライバシーポリシー。ローカル保存、アカウント不要、Web Clipper権限、RSSフィード、任意のGit同期、Chrome拡張のデータ扱い。',
    h1: 'ローカルファーストMarkdownエディタのプライバシー',
    lastUpdated: '最終更新日: 2026年7月（v2.3.2）',
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
            "Mark It Down is a Chrome extension that provides a WYSIWYG Markdown note-taking experience in your new tab and side panel. As of v2.3.2, its optional network features include Web Clipper, AI chat extraction, RSS, Repository Reader, URL Preview, and Git synchronization. These features connect directly to the source or provider you choose; Mark It Down does not operate an account system or product backend. This privacy policy explains what stays local, what communicates externally, and when Chrome asks for permission.",
          ],
        },
      ],
    },
    {
      id: 'data-collection',
      heading: 'Data Collection',
      blocks: [
        { type: 'paragraph', runs: [{ strong: 'Mark It Down does not collect, receive, sell, or share your personal data with us.' }] },
        {
          type: 'paragraph',
          runs: [
            "All your notes and settings are stored locally in your browser using Chrome's storage API. The extension includes no analytics, advertising, or third-party error-reporting service. When you use an optional network feature, your browser communicates directly with the source site or configured provider — not with a Mark It Down server.",
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
            ['Git Token', 'Local (encrypted)', 'GitHub / GitLab only during authenticated requests'],
            ['RSS / clipped / repository content', 'Local after retrieval', 'Retrieved directly from the source you request'],
          ],
        },
        { type: 'note', text: '*Note content is transmitted only when you explicitly use Git synchronization. Other network features retrieve content from the source named in the feature.' },
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
                '). The manifest declares ',
                { code: '<all_urls>' },
                ' as the optional capability ceiling, but RSS requests only the specific origin pattern you register',
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
      id: 'repository-reader',
      heading: 'Repository Reader (Added in v2.2.10)',
      blocks: [
        {
          type: 'paragraph',
          runs: [
            'Repository Reader opens a GitHub Markdown repository only after you enter or select a repository URL. Your browser communicates directly with the GitHub API; repository content is not proxied through a Mark It Down server.',
          ],
        },
        {
          type: 'list',
          items: [
            { label: 'Public repositories', runs: [': Read without a token through the GitHub API'] },
            { label: 'Private repositories', runs: [': Use your saved GitHub token only when you explicitly enable the token option for Repository Reader'] },
            { label: 'Local state', runs: [': Reader history, pinned repositories, and imported notes stay in Chrome extension storage'] },
            { label: 'Explicit import', runs: [': Reading a repository does not add its files to your notes until you choose to import one'] },
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
            { label: 'Scope', runs: [': The encryption seed is stored in the same Chrome profile. This reduces casual plaintext exposure but does not protect a compromised browser profile or extension context'] },
          ],
        },
        { type: 'subheading', text: 'Data Transmission' },
        {
          type: 'list',
          items: [
            { label: 'Direct Communication', runs: [': Notes are transmitted directly between your browser and your Git repository'] },
            { label: 'No Mark It Down Intermediary', runs: [': Data goes to the GitHub or GitLab service you configured and does not pass through a server operated by us'] },
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
              'The manifest declares <all_urls> as the optional capability ceiling. RSS and Web Clipper normally request only the origin you register or clip, and each grant can be revoked',
            ],
            [
              'optional <all_urls> grant for URL Preview',
              'Requested only when you enable URL Preview, because link metadata can come from any site. Chrome shows a separate broad-access prompt; URL Preview remains off if you decline',
            ],
            [
              'host_permissions (api.github.com / gitlab.com)',
              'Direct Git synchronization and GitHub Repository Reader requests. No Mark It Down server is used as an intermediary',
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
            { label: 'GitHub API', runs: [' (only when you use Repository Reader) — source of repository metadata and Markdown files'] },
            { label: 'RSS feed publishers you register', runs: [' (v2.2.0+) — source of feed XML'] },
            { label: 'Hosts of articles you clip with Web Clipper', runs: [' — source of article HTML'] },
            { label: 'Hosts of links shown by URL Preview', runs: [' (only if you enable URL Preview) — source of link metadata'] },
          ],
        },
        {
          type: 'paragraph',
          runs: ['These services are limited to destinations you registered, opened, clipped, or enabled through an optional feature. The extension does not send their content to a server operated by Mark It Down.'],
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
          runs: [{ strong: "Your notes stay on your device by default. Optional network features communicate directly with the source or provider you choose; nothing passes through a Mark It Down backend." }],
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
            'Mark It Downは、新しいタブとサイドパネルでWYSIWYG Markdownメモ体験を提供するChrome拡張機能です。v2.3.2時点の任意ネットワーク機能には、Web Clipper、AI会話抽出、RSS、Repository Reader、URL Preview、Git同期があります。これらはユーザーが選んだ取得元やプロバイダーと直接通信し、Mark It Downはアカウントシステムや製品バックエンドを運営していません。このプライバシーポリシーでは、ローカルに残るデータ、外部通信が発生する場面、Chromeが権限を求めるタイミングを説明します。',
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
                '）に対してのみアクセス権限を付与します。manifestは任意権限の上限として',
                { code: '<all_urls>' },
                'を宣言していますが、RSSが実際に要求するのは登録したオリジンのパターンだけです',
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
      id: 'repository-reader',
      heading: 'Repository Reader（v2.2.10で追加）',
      blocks: [
        {
          type: 'paragraph',
          runs: [
            'Repository Readerは、ユーザーがリポジトリURLを入力または選択した場合にのみ、GitHub上のMarkdownリポジトリを開きます。ブラウザはGitHub APIと直接通信し、リポジトリ内容がMark It Downのサーバーを経由することはありません。',
          ],
        },
        {
          type: 'list',
          items: [
            { label: '公開リポジトリ', runs: [': トークンなしでGitHub APIから読み取ります'] },
            { label: '非公開リポジトリ', runs: [': Repository Readerでトークン利用を明示的に有効にした場合のみ、保存済みGitHubトークンを使用します'] },
            { label: 'ローカル状態', runs: [': 閲覧履歴、ピン留めしたリポジトリ、取り込んだノートはChrome拡張機能ストレージに保存されます'] },
            { label: '明示的な取り込み', runs: [': リポジトリを読むだけではノートに追加されず、ユーザーが選んだファイルだけを取り込みます'] },
          ],
        },
      ],
    },
    {
      id: 'data-collection',
      heading: 'データ収集について',
      blocks: [
        { type: 'paragraph', runs: [{ strong: 'Mark It Downは、お客様の個人データを当社へ収集・受信せず、販売・共有しません。' }] },
        {
          type: 'paragraph',
          runs: [
            'すべてのノートと設定は、ChromeのストレージAPIを使用してブラウザ内にローカル保存されます。拡張機能にはアクセス解析、広告、サードパーティのエラー送信サービスを組み込んでいません。任意のネットワーク機能を使う場合、ブラウザは取得元サイトまたは設定したプロバイダーと直接通信し、Mark It Downのサーバーは経由しません。',
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
            ['Gitトークン', 'ローカル（暗号化）', '認証リクエスト時のみGitHub / GitLabへ送信'],
            ['RSS・クリップ・リポジトリ内容', '取得後はローカル', 'ユーザーが指定した取得元から直接受信'],
          ],
        },
        { type: 'note', text: '*ノート本文が送信されるのは、Git同期を明示的に使用した場合のみです。その他のネットワーク機能は、機能内に表示された取得元からコンテンツを受信します。' },
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
            { label: '保護範囲', runs: [': 暗号化seedも同じChromeプロファイルに保存されます。平文の露出を抑えるものであり、侵害されたブラウザプロファイルや拡張機能コンテキストを防ぐものではありません'] },
          ],
        },
        { type: 'subheading', text: 'データ通信' },
        {
          type: 'list',
          items: [
            { label: '直接通信', runs: [': ノートはお客様のブラウザとGitリポジトリ間で直接送受信されます'] },
            { label: 'Mark It Downによる仲介なし', runs: [': データは設定したGitHubまたはGitLabへ送信され、当社が運営するサーバーを経由しません'] },
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
              'manifestは任意権限の上限として<all_urls>を宣言します。RSSとWeb Clipperは通常、登録またはクリップしたオリジンだけを要求し、各権限は取消可能です',
            ],
            [
              'URL Preview用の任意<all_urls>付与',
              'リンク情報は任意のサイトにあるため、URL Previewを有効にした場合だけ要求します。Chromeが広範なアクセスの確認画面を表示し、拒否した場合はURL Previewを有効にしません',
            ],
            [
              'host_permissions (api.github.com / gitlab.com)',
              'Git同期およびGitHub Repository Readerとの直接通信に使用します。Mark It Downのサーバーは仲介しません',
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
            { label: 'GitHub API', runs: ['（Repository Readerを使用した場合のみ）— リポジトリ情報とMarkdownファイルの取得元'] },
            { label: 'お客様が登録したRSSフィード発行元のサーバー', runs: ['（v2.2.0以降）— フィードXMLの取得先'] },
            { label: 'Web Clipperでクリップした対象記事のホスト', runs: [' — 記事HTMLの取得先'] },
            { label: 'URL Previewで表示したリンク先のホスト', runs: ['（URL Previewを有効にした場合のみ）— リンク情報の取得元'] },
          ],
        },
        {
          type: 'paragraph',
          runs: ['対象は、ユーザーが登録、表示、クリップ、または任意機能として有効にした宛先に限られます。取得した内容がMark It Downの運営するサーバーへ送られることはありません。'],
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
          runs: [{ strong: 'ノートは標準でお客様のデバイスに保存されます。任意のネットワーク機能は、ユーザーが選んだ取得元またはプロバイダーと直接通信し、Mark It Downのバックエンドは経由しません。' }],
        },
      ],
    },
  ],
};
