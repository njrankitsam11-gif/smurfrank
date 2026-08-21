'use client';
import { useState } from 'react';
import ListingGrid from './ListingGrid';
import { getGameTheme } from '../../lib/gameTheme';

const PAGE_SIZE = 4;

export default function RelatedListings({ listings, game }) {
  const [page, setPage] = useState(1);
  if (!listings || listings.length === 0) return null;

  const theme = getGameTheme(game);
  const totalPages = Math.max(1, Math.ceil(listings.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const pageItems = listings.slice(start, start + PAGE_SIZE);

  return (
    <section className="mt-16">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-ink-50">
          More {theme.label} <span style={{ color: theme.accent }}>Listings</span>
        </h2>
        {totalPages > 1 && (
          <div className="flex items-center gap-3 text-sm text-ink-200">
            <button
              className="focus-ring disabled:opacity-30"
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              aria-label="Previous page"
            >
              ←
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              className="focus-ring disabled:opacity-30"
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              aria-label="Next page"
            >
              →
            </button>
          </div>
        )}
      </div>
      <ListingGrid listings={pageItems} />
    </section>
  );
}
