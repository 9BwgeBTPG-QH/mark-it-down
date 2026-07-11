import type { Metadata } from 'next';
import { TroubleshootingPage } from '@/components/TroubleshootingPage';
import { troubleshootingContent } from '@/content/troubleshooting';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'troubleshooting',
  lang: 'ja',
  title: troubleshootingContent.ja.title,
  description: troubleshootingContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <TroubleshootingPage lang="ja" />;
}
