import { Fragment } from 'react';
import { Budoux } from '@/components/Budoux';
import { FeaturesInline } from '@/components/features/FeaturesInline';
import { navHref } from '@/content/shared';
import type { FeaturesInlineRun, FeaturesListItem } from '@/content/features';
import type { Lang } from '@/content/index';

function renderInline(content: string | FeaturesInlineRun[], ja: boolean) {
  return typeof content === 'string' ? (ja ? <Budoux text={content} /> : content) : <FeaturesInline runs={content} ja={ja} />;
}

// Restores the old markup's inline anchor inside an item's body (Web
// Clipper / RSS Reader "Learn More", Storage "OKF Export" — e.g. old
// docs/features.html: `<span>See the <a href="clipper.html">Web Clipper
// page</a> for the full walkthrough</span>`) by splitting the first
// string-bearing run of `body` on `link.label`. FeaturesInlineRun has no
// anchor variant since only these two items need one.
function renderBody(item: FeaturesListItem, lang: Lang, ja: boolean) {
  const { body, link } = item;
  if (!link) return renderInline(body, ja);

  const runs = typeof body === 'string' ? [body] : body;
  const targetIndex = runs.findIndex((run) => typeof run === 'string' && run.includes(link.label));
  if (targetIndex === -1) return renderInline(body, ja);

  const target = runs[targetIndex] as string;
  const labelStart = target.indexOf(link.label);
  const before = target.slice(0, labelStart);
  const after = target.slice(labelStart + link.label.length);

  return (
    <>
      {runs.slice(0, targetIndex).map((run, i) => (
        <Fragment key={`pre-${i}`}>{renderInline([run] as FeaturesInlineRun[], ja)}</Fragment>
      ))}
      {before && renderInline(before, ja)}
      <a href={navHref(link.slug, lang)}>{renderInline(link.label, ja)}</a>
      {after && renderInline(after, ja)}
      {runs.slice(targetIndex + 1).map((run, i) => (
        <Fragment key={`post-${i}`}>{renderInline([run] as FeaturesInlineRun[], ja)}</Fragment>
      ))}
    </>
  );
}

// One <li><strong>Title</strong> <span>Body</span></li> row, restored
// verbatim from old docs/features.html's .changelog-features list items.
// Shared by FeatureCategoryAccordion.tsx (flat categories) and
// ShortcutsSection.tsx (Keyboard Shortcuts' grouped items) since both use
// the identical row markup.
export function FeatureItemRow({ item, lang }: { item: FeaturesListItem; lang: Lang }) {
  const ja = lang === 'ja';
  return (
    <li>
      <strong>{renderInline(item.title, ja)}</strong> <span>
        {renderBody(item, lang, ja)}
        {item.waxSealAccent && <> <img src="wax-seal.png" alt="" className="wax-seal-accent" aria-hidden="true" /></>}
      </span>
    </li>
  );
}
