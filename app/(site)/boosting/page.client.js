'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../../context/CartContext';
import { GAME_LIST, getGameTheme } from '../../../lib/gameTheme';
import { fadeInUp, staggerContainer, viewportOnce } from '../../../lib/motion';
import Tabs from '../../../components/ui/Tabs';
import Button from '../../../components/ui/Button';
import TrustBar from '../../../components/marketplace/TrustBar';
import RankBoostCalculator from '../../../components/marketplace/RankBoostCalculator';

const CATEGORIES = ['Rank Boost', 'Placements', 'Net Wins', 'Coaching', 'Custom Request'];

const CATEGORY_KEYWORDS = {
  Placements: ['placement'],
  'Net Wins': ['net win', 'wins'],
  Coaching: ['coach'],
  'Custom Request': ['custom'],
};

function matchesCategory(service, category) {
  const keywords = CATEGORY_KEYWORDS[category];
  if (!keywords) return false;
  const haystack = `${service.title} ${service.description}`.toLowerCase();
  return keywords.some((k) => haystack.includes(k));
}

function ServiceCard({ service }) {
  const { addToCart } = useCart();
  return (
    <motion.div
      variants={fadeInUp}
      className="flex flex-col justify-between rounded-2xl border border-ink-600 bg-ink-800/60 p-6"
    >
      <div>
        <h3 className="font-display text-lg font-bold text-ink-50">{service.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-200">{service.description}</p>
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-ink-700 pt-4">
        <span className="text-xl font-bold text-ink-50">${service.price.toFixed(2)}</span>
        <Button
          size="sm"
          variant="primary"
          onClick={() =>
            addToCart({
              id: service.id,
              title: service.title,
              price: `$${service.price.toFixed(2)}`,
              desc: service.description,
              game: service.game,
            })
          }
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
}

export default function BoostingPageClient({ services }) {
  const [game, setGame] = useState('Valorant');
  const [category, setCategory] = useState('Rank Boost');
  const theme = getGameTheme(game);
  const hasRankLadder = Boolean(theme.rankLadder);

  const filteredServices = useMemo(() => {
    const gameServices = services.filter((s) => s.game === game);
    if (!hasRankLadder) return gameServices;
    return gameServices.filter((s) => matchesCategory(s, category));
  }, [services, game, category, hasRankLadder]);

  return (
    <main className="min-h-screen bg-ink-950 px-6 pb-24 pt-16 text-ink-50">
      <div className="mx-auto max-w-7xl">
        <motion.div initial="hidden" animate="show" variants={fadeInUp}>
          <h1 className="font-display text-4xl font-bold sm:text-5xl">
            PRO <span className="text-gold-400">BOOSTING</span>
          </h1>
          <p className="mt-2 text-sm font-semibold uppercase tracking-wide text-ink-300">
            Fulfilled by our own boosters · Secure · Instant Pricing
          </p>
        </motion.div>

        <div className="mt-8">
          <TrustBar />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <Tabs
            className="game"
            label="Select game"
            options={GAME_LIST.map((g) => ({ label: g.label, value: g.key }))}
            value={game}
            onChange={setGame}
          />
          {hasRankLadder && (
            <Tabs
              className="category"
              label="Select boosting category"
              options={CATEGORIES.map((c) => ({ label: c, value: c }))}
              value={category}
              onChange={setCategory}
            />
          )}
        </div>

        <div className="mt-10">
          {hasRankLadder && category === 'Rank Boost' ? (
            <RankBoostCalculator game={game} />
          ) : (
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce()}
              variants={staggerContainer}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredServices.length === 0 ? (
                <p className="col-span-full py-16 text-center text-sm text-ink-300">
                  No {hasRankLadder ? category.toLowerCase() : theme.label} services listed yet — check back soon or try Rank Boost.
                </p>
              ) : (
                filteredServices.map((service) => <ServiceCard key={service.id} service={service} />)
              )}
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}
