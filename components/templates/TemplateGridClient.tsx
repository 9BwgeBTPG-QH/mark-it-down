'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { Card } from '@/components/Card';
import {
  templateCategoryLabels,
  templateActionLabels,
  templateTagIdsBySlug,
  templateTagLabels,
  templateFilterCopy,
  type TemplateCategory,
} from '@/content/templates';
import type { Lang } from '@/content/index';

const linkClass =
  'text-seal underline decoration-seal/40 underline-offset-2 transition-colors duration-instant ease-out hover:decoration-seal focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

type CopyState = 'idle' | 'copied' | 'failed';

export interface TemplateGridCardData {
  slug: string;
  category: TemplateCategory;
  // Plain strings for search matching, kept alongside their pre-rendered
  // (BudouX-segmented for JA) display nodes so this client component never
  // needs to import the server-only Budoux component itself — see
  // components/templates/TemplateGrid.tsx for why.
  title: string;
  description: string;
  titleNode: ReactNode;
  descriptionNode: ReactNode;
  mdHref: string;
  viewHref: string;
}

interface TemplateGridClientProps {
  lang: Lang;
  cards: TemplateGridCardData[];
  headingFont: string;
  bodyFont: string;
  captionFont: string;
}

// Client-interactive half of the templates gallery, restored per #1593
// Phase 3-3 review: search + category filter tabs (with count badges) + tag
// facets + clipboard-copy are genuine old-page functionality (docs/
// templates.html / docs/templates-ja.html), not decorative chrome, and
// Next.js client components are an accepted part of this stack (the earlier
// "no new client JS" pass was overly conservative). The client boundary is
// intentionally scoped to just this component — PageShell / Hero / Guide /
// Cta, and the BudouX text-segmentation itself, stay server-side — to keep
// the hydration bundle small.
//
// SEO note: all 39 cards are always rendered into the SSG output; filtering
// only toggles a `hidden` class client-side (never conditional unmount), so
// crawlers and the static HTML retain every card's full title/description
// text regardless of the default filter state.
//
// Search matches visible title + visible description + tag labels only. The
// old page additionally matched a hidden `dataset.summary` field sourced from
// docs/templates/index.json's `summary` field — that field was found to be
// unreliable (several entries don't correspond to the visible on-page
// description, e.g. ai/ai-conversation-archive's JSON summary describes an
// unrelated paste-conversion feature), so it's deliberately not replicated
// here to avoid surfacing that mismatch as confusing search results.
//
// Tag facets restore the old page's multi-select tag filter. Per-card visible
// tag chips (the old page's injectTagChips()) are not restored — the
// coordinator's restore list names the facet buttons, not per-card chip
// display, so that's treated as a separate, not-yet-requested enhancement.
export function TemplateGridClient({ lang, cards, headingFont, bodyFont, captionFont }: TemplateGridClientProps) {
  const categoryLabels = templateCategoryLabels[lang];
  const actionLabels = templateActionLabels[lang];
  const tagLabels = templateTagLabels[lang];
  const filterCopy = templateFilterCopy[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [copyState, setCopyState] = useState<Record<string, CopyState>>({});

  const categories = useMemo(() => {
    const counts: Record<string, number> = { all: cards.length };
    for (const card of cards) {
      counts[card.category] = (counts[card.category] ?? 0) + 1;
    }
    const order: TemplateCategory[] = ['ai', 'productivity', 'journaling', 'dev', 'content', 'thinking'];
    return [
      { key: 'all' as const, label: filterCopy.allLabel, count: counts.all },
      ...order
        .filter((key) => counts[key] > 0)
        .map((key) => ({ key, label: categoryLabels[key], count: counts[key] })),
    ];
  }, [cards, categoryLabels, filterCopy.allLabel]);

  // Tag ids actually used by this language's catalog, sorted by tag id
  // (matches the old page's buildTagFacets() Object.keys(...).sort() order).
  const tagFacetIds = useMemo(() => {
    const used = new Set<string>();
    for (const card of cards) {
      for (const tagId of templateTagIdsBySlug[card.slug] ?? []) used.add(tagId);
    }
    return Array.from(used).sort();
  }, [cards]);

  const query = searchQuery.trim().toLowerCase();

  function isCardVisible(card: TemplateGridCardData): boolean {
    if (activeCategory !== 'all' && card.category !== activeCategory) return false;

    const cardTagIds = templateTagIdsBySlug[card.slug] ?? [];
    if (activeTags.size > 0 && !cardTagIds.some((tagId) => activeTags.has(tagId))) return false;

    if (query.length > 0) {
      const tagText = cardTagIds.map((tagId) => tagLabels[tagId] ?? tagId).join(' ').toLowerCase();
      const haystack = `${card.title} ${card.description} ${tagText}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }

    return true;
  }

  function toggleTag(tagId: string) {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tagId)) next.delete(tagId);
      else next.add(tagId);
      return next;
    });
  }

  async function handleCopy(slug: string, mdHref: string) {
    try {
      const res = await fetch(mdHref);
      const markdown = await res.text();
      await navigator.clipboard.writeText(markdown);
      setCopyState((prev) => ({ ...prev, [slug]: 'copied' }));
    } catch {
      setCopyState((prev) => ({ ...prev, [slug]: 'failed' }));
    }
    setTimeout(() => {
      setCopyState((prev) => ({ ...prev, [slug]: 'idle' }));
    }, 2000);
  }

  const tabButtonBase =
    'rounded border px-3 py-1.5 text-caption transition-colors duration-instant ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal';

  return (
    <>
      <div className="mb-6 flex flex-col gap-4">
        <input
          type="search"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder={filterCopy.searchPlaceholder}
          aria-label={filterCopy.searchAriaLabel}
          className={`w-full max-w-sm rounded border border-hairline bg-paper px-3 py-2 text-ink placeholder:text-ink-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-seal ${bodyFont}`}
        />

        <nav aria-label={filterCopy.filterNavAriaLabel} className="flex flex-wrap gap-2">
          {categories.map(({ key, label, count }) => {
            const isActive = activeCategory === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                aria-pressed={isActive}
                className={`${tabButtonBase} ${captionFont} ${
                  isActive
                    ? 'border-seal bg-seal/10 text-ink'
                    : 'border-hairline bg-paper text-ink-2 hover:border-seal/40'
                }`}
              >
                {label} ({count})
              </button>
            );
          })}
        </nav>

        {tagFacetIds.length > 0 && (
          <div role="group" aria-label={filterCopy.tagFacetsAriaLabel} className="flex flex-wrap gap-2">
            {tagFacetIds.map((tagId) => {
              const isActive = activeTags.has(tagId);
              return (
                <button
                  key={tagId}
                  type="button"
                  onClick={() => toggleTag(tagId)}
                  aria-pressed={isActive}
                  className={`${tabButtonBase} ${captionFont} ${
                    isActive
                      ? 'border-seal bg-seal/10 text-ink'
                      : 'border-hairline bg-paper text-ink-muted hover:border-seal/40'
                  }`}
                >
                  {tagLabels[tagId] ?? tagId}
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {cards.map((card) => {
          const visible = isCardVisible(card);
          const state = copyState[card.slug] ?? 'idle';
          const copyLabel =
            state === 'copied'
              ? actionLabels.copyButton.copied
              : state === 'failed'
                ? actionLabels.copyButton.failed
                : actionLabels.copyButton.idle;

          return (
            <Card key={card.slug} variant="outline" className={visible ? '' : 'hidden'}>
              <p className={`text-caption text-ink-muted ${captionFont}`}>{categoryLabels[card.category]}</p>
              <h3 className={`mt-2 text-h3 text-ink ${headingFont}`}>{card.titleNode}</h3>
              <p className={`mt-2 text-ink-2 ${bodyFont}`}>{card.descriptionNode}</p>
              <div className="mt-4 flex flex-wrap gap-4">
                <button type="button" onClick={() => handleCopy(card.slug, card.mdHref)} className={`${linkClass} ${bodyFont}`}>
                  {copyLabel}
                </button>
                <a href={card.viewHref} target="_blank" rel="noopener noreferrer" className={`${linkClass} ${bodyFont}`}>
                  {actionLabels.openRaw}
                </a>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
