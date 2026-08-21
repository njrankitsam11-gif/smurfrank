'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { getGameTheme } from '../../lib/gameTheme';
import { cardHover, fadeInUp } from '../../lib/motion';
import ListingArt from './ListingArt';
import Badge from '../ui/Badge';

const create = motion.create || motion;
const MotionLink = create(Link);

export default function ListingCard({ listing }) {
  const theme = getGameTheme(listing.game);
  const specLine = [listing.rank, listing.region].filter((v) => v && v !== '-').join(' · ') || listing.type;

  return (
    <motion.div variants={fadeInUp} className="h-full">
      <MotionLink
        href={`/listings/${listing.id}`}
        initial="rest"
        whileHover="hover"
        whileTap="tap"
        variants={cardHover}
        className="focus-ring group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-600 bg-ink-800/70 shadow-glow"
      >
        <div className="relative">
          <ListingArt game={listing.game} size="card" imageUrl={listing.images?.[0]} seed={listing.id} rank={listing.rank} />
          <div className="absolute left-3 top-3 flex gap-2">
            <Badge color={theme.accent}>{theme.label}</Badge>
          </div>
          {listing.instant && (
            <div className="absolute right-3 top-3">
              <Badge color="#FFC531" icon={<span aria-hidden="true">⚡</span>}>
                Instant
              </Badge>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <h3 className="font-display text-lg font-bold leading-tight text-ink-50 line-clamp-2">
            {listing.title}
          </h3>
          {specLine && <p className="text-xs font-semibold uppercase tracking-wide text-ink-200">{specLine}</p>}

          <div className="mt-auto flex items-center justify-between pt-2">
            <span className="text-xl font-bold text-ink-50">${Number(listing.price).toFixed(2)}</span>
            <span className="text-xs font-bold uppercase tracking-wide text-gold-400 transition-transform group-hover:translate-x-1">
              View →
            </span>
          </div>
        </div>
      </MotionLink>
    </motion.div>
  );
}
