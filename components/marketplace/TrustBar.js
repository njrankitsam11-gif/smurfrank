'use client';
import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, viewportOnce } from '../../lib/motion';

const STATS = [
  { icon: '💳', value: '96%', label: 'of orders arrive perfect' },
  { icon: '🛡️', value: '100%', label: 'money-back guarantee' },
  { icon: '🎧', value: '24/7', label: 'human support' },
];

export default function TrustBar({ className = '' }) {
  return (
    <div className={`rounded-2xl border border-ink-600 bg-ink-800/30 p-4 ${className}`}>
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce()}
        variants={staggerContainer}
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {STATS.map((stat) => (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="flex items-center gap-4 rounded-2xl border border-ink-600 bg-ink-800/60 px-6 py-5"
          >
            <span className="text-2xl" aria-hidden="true">{stat.icon}</span>
            <div>
              <div className="text-xl font-bold text-ink-50">{stat.value}</div>
              <div className="text-xs text-ink-200">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
