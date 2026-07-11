import type { Metadata } from 'next';
import { ClipperPage } from '@/components/ClipperPage';
import { clipperContent } from '@/content/clipper';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'clipper',
  lang: 'ja',
  title: clipperContent.ja.title,
  description: clipperContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <ClipperPage lang="ja" />;
}
