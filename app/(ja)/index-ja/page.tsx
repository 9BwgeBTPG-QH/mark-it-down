import type { Metadata } from 'next';
import { IndexPage } from '@/components/IndexPage';
import { indexContent } from '@/content/index';

export const metadata: Metadata = {
  title: indexContent.ja.title,
  description: indexContent.ja.description,
};

export default function Page() {
  return <IndexPage lang="ja" />;
}
