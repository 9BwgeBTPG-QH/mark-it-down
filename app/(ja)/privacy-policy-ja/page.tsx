import type { Metadata } from 'next';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';
import { privacyContent } from '@/content/privacy';
import { buildPageMetadata } from '@/lib/seo';

export const metadata: Metadata = buildPageMetadata({
  slug: 'privacy-policy',
  lang: 'ja',
  title: privacyContent.ja.title,
  description: privacyContent.ja.description,
  ogImage: 'jp-dark.png',
});

export default function Page() {
  return <PrivacyPolicyPage lang="ja" />;
}
