'use client';
import { motion } from 'framer-motion';
import { staggerContainer, viewportOnce } from '../../lib/motion';
import ListingCard from './ListingCard';

export default function ListingGrid({ listings, emptyMessage = 'No listings available right now. Check back soon.' }) {
  if (!listings || listings.length === 0) {
    return <p className="py-20 text-center text-sm text-ink-200">{emptyMessage}</p>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce()}
      variants={staggerContainer}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </motion.div>
  );
}
