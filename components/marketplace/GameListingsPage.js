'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getGameTheme } from '../../lib/gameTheme';
import { useProductSort } from '../../hooks/useProductSort';
import { fadeInUp } from '../../lib/motion';
import SortFilter from '../SortFilter';
import GameSubNav from './GameSubNav';
import ListingGrid from './ListingGrid';

// Shared by /cs2, /valorant, /gta-v — the three category pages were three
// near-identical copy-pasted implementations before; this is the one grid
// they all render now, themed per game via lib/gameTheme.
export default function GameListingsPage({ game, listings }) {
  const theme = getGameTheme(game);
  const [activeSort, setActiveSort] = useState('TOP_RATED');
  const sorted = useProductSort(listings, activeSort);

  return (
    <main className="min-h-screen bg-ink-950 text-ink-50">
      <GameSubNav game={game} />

      <div
        className="border-b border-ink-600 px-6 py-14"
        style={{ background: `radial-gradient(circle at 15% 0%, ${theme.accentSoft}, transparent 55%)` }}
      >
        <div className="mx-auto max-w-7xl">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeInUp}
            className="font-display text-4xl font-bold sm:text-5xl"
          >
            {theme.label} <span style={{ color: theme.accent }}>Accounts</span>
          </motion.h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-ink-300">{theme.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <SortFilter activeSort={activeSort} onSort={setActiveSort} themeColor={theme.accent} />
        <ListingGrid listings={sorted} emptyMessage={`No ${theme.label} accounts available right now. Check back soon.`} />
      </div>
    </main>
  );
}
