import type { Metadata } from 'next';
import { FeedbackPage } from '@/components/FeedbackPage';
import { feedbackContent } from '@/content/feedback';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'feedback',
  lang: 'ja',
  title: feedbackContent.ja.title,
  description: feedbackContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <FeedbackPage lang="ja" />;
}
