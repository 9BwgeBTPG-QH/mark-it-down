import type { Metadata } from 'next';
import { FeedbackPage } from '@/components/FeedbackPage';
import { feedbackContent } from '@/content/feedback';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'feedback',
  lang: 'en',
  title: feedbackContent.en.title,
  description: feedbackContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <FeedbackPage lang="en" />;
}
