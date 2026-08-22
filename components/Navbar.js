'use client';
import { useCart } from '../context/CartContext';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useSession, signOut } from 'next-auth/react';
import { GAME_LIST } from '../lib/gameTheme';
import ThemeToggle from './ui/ThemeToggle';

const NAV_LINKS = [
  ...GAME_LIST.map((g) => ({ href: g.href, label: g.label, accent: g.accent })),
  { href: '/boosting', label: 'Boosting', accent: '#FFC531' },
  { href: '/sell', label: 'Sell', accent: '#8890A6' },
];

export default function Navbar() {
  const { cart, setIsOpen } = useCart();
  const { data: session, status } = useSession();
  const [mounted, setMounted] = useState(false);
  const [users, setUsers] = useState([0, 0, 0]);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
      setUsers([
        Math.floor(Math.random() * 999),
        Math.floor(Math.random() * 999),
        Math.floor(Math.random() * 999),
      ]);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-ink-600 bg-ink-950/90 backdrop-blur-md">
      <div className="overflow-hidden whitespace-nowrap border-b border-ink-600 bg-ink-900/80 py-2 text-[10px] font-bold text-ink-200">
        <div className="live-feed-animation">
          {mounted ? (
            <>
              LIVE: USER_{users[0]} PURCHASED GTA V ACCOUNT — 1m AGO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              LIVE: USER_{users[1]} PURCHASED CS2 GLOBAL ELITE — 3m AGO &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              LIVE: USER_{users[2]} PURCHASED VALORANT RADIANT — 5m AGO
            </>
          ) : (
            'LOADING RECENT SALES...'
          )}
        </div>
      </div>

      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:h-20 sm:px-6">
        <Link href="/" className="font-display shrink-0 text-lg font-bold tracking-tight text-ink-50 sm:text-xl">
          SMURF<span className="text-gold-400">RANK</span>
        </Link>

        <form action="/search" method="GET" className="mx-2 hidden max-w-md flex-1 items-center lg:flex">
          <div className="flex w-full items-center gap-2 rounded-lg border border-ink-500 bg-ink-800 px-3 py-2 focus-within:border-gold-400">
            <span aria-hidden="true" className="text-ink-300">⌕</span>
            <input
              name="q"
              placeholder="Search accounts by rank, game, region..."
              aria-label="Search accounts"
              className="w-full bg-transparent text-sm text-ink-50 outline-none placeholder:text-ink-300"
            />
          </div>
        </form>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring text-xs font-bold uppercase tracking-wide text-ink-200 transition-colors hover:text-ink-50"
              style={link.accent ? { color: link.accent } : undefined}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-5 w-px bg-ink-600" />

          <ThemeToggle />

          {status === 'authenticated' ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-bold uppercase tracking-wide text-ink-200">
                {session.user.name || session.user.email}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="focus-ring text-xs font-bold uppercase tracking-wide text-ink-200 hover:text-ink-50"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/login" className="focus-ring text-xs font-bold uppercase tracking-wide text-ink-200 hover:text-ink-50">
              Sign In
            </Link>
          )}

          <button
            onClick={() => setIsOpen(true)}
            className="focus-ring relative rounded-lg border border-ink-500 px-4 py-2 text-xs font-bold uppercase tracking-wide text-ink-50 transition-colors hover:border-gold-400"
          >
            Cart
            <AnimatePresence>
              {cart.length > 0 && (
                <motion.span
                  key={cart.length}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-gold-400 text-[10px] font-bold text-ink-950"
                >
                  {cart.length}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <ThemeToggle className="ml-auto md:hidden" />
        <button
          onClick={() => setIsOpen(true)}
          className="focus-ring rounded-lg border border-ink-500 px-3 py-2 text-xs font-bold text-ink-50 md:hidden"
          aria-label={`Open cart (${cart.length} items)`}
        >
          🛒 {cart.length}
        </button>
        <button
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
          className="focus-ring rounded-lg border border-ink-500 p-2 text-ink-50 md:hidden"
        >
          {mobileOpen ? '✕' : '☰'}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-ink-600 md:hidden"
          >
            <div className="flex flex-col gap-1 px-4 py-4">
              <form action="/search" method="GET" className="mb-3 flex items-center gap-2 rounded-lg border border-ink-500 bg-ink-800 px-3 py-2">
                <span aria-hidden="true" className="text-ink-300">⌕</span>
                <input
                  name="q"
                  placeholder="Search accounts..."
                  aria-label="Search accounts"
                  className="w-full bg-transparent text-sm text-ink-50 outline-none placeholder:text-ink-300"
                />
              </form>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-ink-200 hover:bg-ink-800 hover:text-ink-50"
                >
                  {link.label}
                </Link>
              ))}
              {status === 'authenticated' ? (
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="focus-ring rounded-lg px-3 py-3 text-left text-sm font-bold uppercase tracking-wide text-ink-200 hover:bg-ink-800 hover:text-ink-50"
                >
                  Sign Out ({session.user.name || session.user.email})
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="focus-ring rounded-lg px-3 py-3 text-sm font-bold uppercase tracking-wide text-ink-200 hover:bg-ink-800 hover:text-ink-50"
                >
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
