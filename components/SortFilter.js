'use client';
import React from 'react';
import { cn } from '../lib/cn';

const OPTIONS = [
  { id: 'TOP_RATED', label: 'Top Rated' },
  { id: 'LOW_HIGH', label: 'Low to High' },
  { id: 'HIGH_LOW', label: 'High to Low' },
  { id: 'BEST_SELLER', label: 'Best Seller' },
];

export default function SortFilter({ activeSort, onSort, themeColor = '#FFC531' }) {
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {OPTIONS.map((opt) => {
        const active = activeSort === opt.id;
        return (
          <button
            key={opt.id}
            onClick={() => onSort(opt.id)}
            className={cn(
              'focus-ring rounded-full border px-5 py-2 text-xs font-bold uppercase tracking-wide transition-colors',
              active ? 'border-transparent text-ink-950' : 'border-ink-600 bg-ink-800/60 text-ink-200 hover:text-ink-50'
            )}
            style={active ? { background: themeColor } : undefined}
          >
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}
