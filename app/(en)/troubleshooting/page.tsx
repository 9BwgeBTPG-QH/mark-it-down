import type { Metadata } from 'next';
import { TroubleshootingPage } from '@/components/TroubleshootingPage';
import { troubleshootingContent } from '@/content/troubleshooting';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'troubleshooting',
  lang: 'en',
  title: troubleshootingContent.en.title,
  description: troubleshootingContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <TroubleshootingPage lang="en" />;
}
