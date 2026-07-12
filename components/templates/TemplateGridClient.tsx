'use client';

import type { ReactNode } from 'react';
import { useMemo, useState } from 'react';
import {
  templateCategoryLabels,
  templateActionLabels,
  templateTagIdsBySlug,
  templateTagLabels,
  templateFilterCopy,
  templateSummariesBySlug,
  type TemplateCategory,
} from '@/content/templates';
import type { Lang } from '@/content/index';

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
}

const CATEGORY_ORDER: TemplateCategory[] = ['ai', 'productivity', 'journaling', 'dev', 'content', 'thinking'];

// Client-interactive half of docs/templates.html / docs/templates-ja.html's
// gallery, restored verbatim from the old inline <script> (original-design
// rollback, #1593 Wave R2 Batch 2): search input + category filter-tabs +
// tag-facets + per-card visible tag chips + clipboard-copy. The client
// boundary is intentionally scoped to just this component — PageShell /
// Hero / Guide / Cta, and the BudouX text-segmentation itself, stay
// server-side — to keep the hydration bundle small (see
// components/templates/TemplateGrid.tsx for the Budoux precomputation).
//
// All 39 cards are always rendered into the SSG output; filtering only
// toggles inline `display: none` client-side (never conditional unmount, and
// never a "hidden" utility class), matching the old script's literal
// `card.style.display = matches ? '' : 'none'` — crawlers and the static
// HTML retain every card's full text regardless of the default filter
// state.
//
// Search matches visible title + visible description + the old page's
// hidden `data-summary` field (docs/templates/index.json's per-template
// `summary` text, not shown on the card) + `data-tags` (the card's raw,
// language-neutral tag ids joined by a space — NOT the translated tag
// labels shown in the chips/facets; this is a literal port of the old
// script's `tagStr.includes(searchQuery)`, which searches the same id
// strings regardless of language).
export function TemplateGridClient({ lang, cards }: TemplateGridClientProps) {
  const categoryLabels = templateCategoryLabels[lang];
  const actionLabels = templateActionLabels[lang];
  const tagLabels = templateTagLabels[lang];
  const filterCopy = templateFilterCopy[lang];
  const summaries = templateSummariesBySlug[lang];

  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<TemplateCategory | 'all'>('all');
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [copyState, setCopyState] = useState<Record<string, CopyState>>({});

  const categoryTabs = useMemo(() => {
    const counts: Record<string, number> = { all: cards.length };
    for (const card of cards) {
      counts[card.category] = (counts[card.category] ?? 0) + 1;
    }
    return [
      { key: 'all' as const, label: filterCopy.allLabel, count: counts.all },
      ...CATEGORY_ORDER.map((key) => ({ key, label: categoryLabels[key], count: counts[key] ?? 0 })),
    ];
  }, [cards, categoryLabels, filterCopy.allLabel]);

  // Tag ids used by this language's catalog, sorted by tag id (matches the
  // old page's buildTagFacets() Object.keys(tagCounts).sort() order).
  const tagFacetIds = useMemo(() => {
    const used = new Set<string>();
    for (const card of cards) {
      for (const tagId of templateTagIdsBySlug[card.slug] ?? []) used.add(tagId);
    }
    return Array.from(used).sort();
  }, [cards]);

  const query = searchQuery.toLowerCase().trim();

  function isCardVisible(card: TemplateGridCardData, tagStr: string): boolean {
    if (activeCategory !== 'all' && card.category !== activeCategory) return false;

    const cardTagIds = templateTagIdsBySlug[card.slug] ?? [];
    if (activeTags.size > 0 && !cardTagIds.some((tagId) => activeTags.has(tagId))) return false;

    if (query.length > 0) {
      const title = card.title.toLowerCase();
      const desc = card.description.toLowerCase();
      const summary = (summaries[card.slug] ?? '').toLowerCase();
      const matches = title.includes(query) || desc.includes(query) || summary.includes(query) || tagStr.includes(query);
      if (!matches) return false;
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

  return (
    <>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder={filterCopy.searchPlaceholder}
        aria-label={filterCopy.searchAriaLabel}
        className="template-search-input"
      />

      <nav className="filter-tabs" aria-label={filterCopy.filterNavAriaLabel}>
        {categoryTabs.map(({ key, label, count }) => (
          <button
            key={key}
            type="button"
            data-filter={key}
            onClick={() => setActiveCategory(key)}
            className={activeCategory === key ? 'filter-btn active' : 'filter-btn'}
          >
            {label} ({count})
          </button>
        ))}
      </nav>

      <div className="tag-facets" id="tag-facets" role="group" aria-label={filterCopy.tagFacetsAriaLabel}>
        {tagFacetIds.map((tagId) => (
          <button
            key={tagId}
            type="button"
            data-tag={tagId}
            onClick={() => toggleTag(tagId)}
            className={activeTags.has(tagId) ? 'tag-facet-btn active' : 'tag-facet-btn'}
          >
            {tagLabels[tagId] ?? tagId}
          </button>
        ))}
      </div>

      <div className="template-grid">
        {cards.map((card) => {
          const cardTagIds = templateTagIdsBySlug[card.slug] ?? [];
          const tagStr = cardTagIds.join(' ');
          const visible = isCardVisible(card, tagStr);
          const state = copyState[card.slug] ?? 'idle';
          const copyLabel =
            state === 'copied'
              ? actionLabels.copyButton.copied
              : state === 'failed'
                ? actionLabels.copyButton.failed
                : actionLabels.copyButton.idle;

          return (
            <div
              key={card.slug}
              className="template-card"
              data-category={card.category}
              data-summary={(summaries[card.slug] ?? '').toLowerCase()}
              data-tags={tagStr}
              style={{ display: visible ? undefined : 'none' }}
            >
              <div className="template-card-header">
                <span className={`category-badge badge-${card.category}`}>{categoryLabels[card.category]}</span>
              </div>
              <h3 className="template-card-title">{card.titleNode}</h3>
              <p className="template-card-desc">{card.descriptionNode}</p>
              {cardTagIds.length > 0 && (
                <div className="template-tag-chips">
                  {cardTagIds.map((tagId) => (
                    <span className="template-tag-chip" key={tagId}>
                      {tagLabels[tagId] ?? tagId}
                    </span>
                  ))}
                </div>
              )}
              <div className="template-card-actions">
                <button
                  type="button"
                  data-template={card.slug}
                  onClick={() => handleCopy(card.slug, card.mdHref)}
                  className={state === 'copied' ? 'copy-btn copied' : 'copy-btn'}
                >
                  {copyLabel}
                </button>
                <a
                  href={card.viewHref}
                  target="_blank"
                  rel="noopener"
                  className="open-btn"
                  title={actionLabels.openButtonTitle}
                >
                  ↗
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
