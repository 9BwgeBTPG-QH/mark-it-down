export type { Lang } from './index';
import type { Lang } from './index';

interface FeedbackCopy {
  lang: Lang;
  title: string;
  description: string;
  h1: string;
  formHeading: string;
  formBodyLine1: string;
  formBodyLine2: string;
  emailLabel: string;
  emailAddress: string;
}

// Copy ported verbatim from docs/feedback.html / docs/feedback-ja.html
// (#1593 Phase 3-5, final group). The old markup's manual `<br>` between
// formBodyLine1/formBodyLine2 is reflowed into two paragraph lines rather
// than an inline <br>, following the general convention of not carrying
// forced line breaks into the new layout (the two lines are still rendered
// together as one paragraph by FeedbackPage.tsx).
export const feedbackContent: Record<Lang, FeedbackCopy> = {
  en: {
    lang: 'en',
    title: 'Feedback for Mark It Down Markdown Editor',
    description:
      'Send feedback about Mark It Down, the local-first Markdown editor and Web Clipper for AI answers, web articles, RSS, and Git-friendly notes.',
    h1: 'Feedback for Mark It Down',
    formHeading: "We'd love to hear from you",
    formBodyLine1: 'Your feedback helps make Mark It Down better.',
    formBodyLine2: 'Share your thoughts, report bugs, or suggest features.',
    emailLabel: 'Email:',
    emailAddress: 'support@reduktion.dev',
  },
  ja: {
    lang: 'ja',
    title: 'Mark It Down Markdownエディタへのフィードバック',
    description:
      'AI回答、Web記事、RSS、Gitで扱いやすいノートのためのローカルファーストMarkdownエディタ、Mark It Downへのフィードバック。',
    h1: 'Mark It Downへのフィードバック',
    formHeading: 'ご意見をお聞かせください',
    formBodyLine1: '皆様のフィードバックがMark It Downをより良くします。',
    formBodyLine2: 'ご感想、バグ報告、機能リクエストをお待ちしています。',
    emailLabel: 'メールでのお問い合わせ:',
    emailAddress: 'support@reduktion.dev',
  },
};

export interface FeedbackTypeItem {
  heading: string;
  body: string;
}

// "feedback-types" 3-card grid (Bug Reports / Feature Requests / General
// Feedback).
export const feedbackTypeItems: Record<Lang, FeedbackTypeItem[]> = {
  en: [
    { heading: 'Bug Reports', body: 'Something not working?' },
    { heading: 'Feature Requests', body: 'Have an idea?' },
    { heading: 'General Feedback', body: 'Any thoughts?' },
  ],
  ja: [
    { heading: 'バグ報告', body: '動作がおかしい？' },
    { heading: '機能リクエスト', body: 'アイデアはありますか？' },
    { heading: '一般的なご意見', body: '何かお考えですか？' },
  ],
};

export interface FeedbackFormEmbed {
  src: string;
  title: string;
  loadingFallback: string;
}

// Google Forms iframe — preserved verbatim (src/title/fallback text) as the
// page's core interactive element. This is the codebase's first iframe
// embed (components/IndexPage.tsx's comment notes a Marp slide-deck iframe
// was intentionally dropped elsewhere, but that was a deliberate non-port;
// this one is load-bearing and must stay).
export const feedbackFormEmbed: Record<Lang, FeedbackFormEmbed> = {
  en: {
    src: 'https://docs.google.com/forms/d/e/1FAIpQLScqUD4-8YBhOu3wub7Bh06r6Hv1zX5i5OwDVdYl66nlJ5Mejw/viewform?embedded=true',
    title: 'Mark It Down Feedback Form',
    loadingFallback: 'Loading form...',
  },
  ja: {
    src: 'https://docs.google.com/forms/d/e/1FAIpQLScqUD4-8YBhOu3wub7Bh06r6Hv1zX5i5OwDVdYl66nlJ5Mejw/viewform?embedded=true',
    title: 'Mark It Down フィードバックフォーム',
    loadingFallback: 'フォームを読み込んでいます...',
  },
};
