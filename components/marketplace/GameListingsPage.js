'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { getGameTheme } from '../../lib/gameTheme';
import { getGameArt } from '../../lib/gameArt';
import { useProductSort } from '../../hooks/useProductSort';
import { fadeInUp } from '../../lib/motion';
import SortFilter from '../SortFilter';
import Slideshow from '../ui/Slideshow';
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

      <div className="relative flex min-h-[280px] flex-col justify-center overflow-hidden border-b border-ink-600 px-6 py-14 sm:min-h-[340px]">
        <Slideshow
          images={getGameArt(theme.slug)}
          accentColor={theme.accent}
          priority
          className="absolute inset-0"
          ariaLabel={`${theme.label} featured art`}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ background: `radial-gradient(circle at 15% 0%, ${theme.accentSoft}, transparent 55%)` }}
        />

        <div className="relative z-20 mx-auto max-w-7xl">
          <motion.h1
            initial="hidden"
            animate="show"
            variants={fadeInUp}
            className="font-display text-4xl font-bold text-white sm:text-5xl"
          >
            {theme.label} <span style={{ color: theme.accent }}>Accounts</span>
          </motion.h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-white/70">{theme.tagline}</p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <SortFilter activeSort={activeSort} onSort={setActiveSort} themeColor={theme.accent} />
        <ListingGrid listings={sorted} emptyMessage={`No ${theme.label} accounts available right now. Check back soon.`} />
      </div>
    </main>
  );
}
