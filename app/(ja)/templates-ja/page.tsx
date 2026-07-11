import type { Metadata } from 'next';
import { TemplatesPage } from '@/components/TemplatesPage';
import { templatesContent } from '@/content/templates';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'templates',
  lang: 'ja',
  title: templatesContent.ja.title,
  description: templatesContent.ja.description,
  ogImage: 'icon-128.png',
});

export default function Page() {
  return <TemplatesPage lang="ja" />;
}
