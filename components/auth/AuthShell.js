'use client';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { fadeInUp } from '../../lib/motion';

export default function AuthShell({ title, children, footer }) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-ink-950 px-6 py-16 text-ink-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(circle at 50% 20%, rgba(255,197,49,0.08), transparent 55%)' }}
      />
      <motion.div
        initial="hidden"
        animate="show"
        variants={fadeInUp}
        className="relative w-full max-w-md rounded-2xl border border-ink-600 bg-ink-800/70 p-10 shadow-glow"
      >
        <div className="mb-8 text-center">
          <Link href="/" className="font-display text-2xl font-bold tracking-tight text-ink-50">
            SMURF<span className="text-gold-400">RANK</span>
          </Link>
          <h1 className="mt-5 text-lg font-bold uppercase tracking-wide text-ink-100">{title}</h1>
        </div>

        {children}

        {footer && <div className="mt-8 text-center text-sm text-ink-300">{footer}</div>}
      </motion.div>
    </main>
  );
}
