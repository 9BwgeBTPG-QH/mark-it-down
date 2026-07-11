import type { Metadata } from 'next';
import { WelcomePage } from '@/components/WelcomePage';
import { welcomeContent } from '@/content/welcome';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'welcome',
  lang: 'ja',
  title: welcomeContent.ja.title,
  description: welcomeContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <WelcomePage lang="ja" />;
}
