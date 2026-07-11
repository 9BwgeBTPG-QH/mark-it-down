import type { Metadata } from 'next';
import { ClipperPage } from '@/components/ClipperPage';
import { clipperContent } from '@/content/clipper';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'clipper',
  lang: 'en',
  title: clipperContent.en.title,
  description: clipperContent.en.description,
  ogImage: 'en-dark.png',
});

export default function Page() {
  return <ClipperPage lang="en" />;
}
