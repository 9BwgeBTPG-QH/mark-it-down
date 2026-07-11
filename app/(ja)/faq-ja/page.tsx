import type { Metadata } from 'next';
import { FaqPage } from '@/components/FaqPage';
import { faqContent } from '@/content/faq';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'faq',
  lang: 'ja',
  title: faqContent.ja.title,
  description: faqContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <FaqPage lang="ja" />;
}
