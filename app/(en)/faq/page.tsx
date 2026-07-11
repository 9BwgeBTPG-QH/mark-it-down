import type { Metadata } from 'next';
import { FaqPage } from '@/components/FaqPage';
import { faqContent } from '@/content/faq';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'faq',
  lang: 'en',
  title: faqContent.en.title,
  description: faqContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <FaqPage lang="en" />;
}
