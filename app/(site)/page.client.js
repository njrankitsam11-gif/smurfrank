'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { GAME_LIST } from '../../lib/gameTheme';
import { HOMEPAGE_HERO_ART } from '../../lib/gameArt';
import { fadeInUp, staggerContainer, tileTilt, viewportOnce, heroWord } from '../../lib/motion';
import Button from '../../components/ui/Button';
import Slideshow from '../../components/ui/Slideshow';
import Accordion, { AccordionItem } from '../../components/ui/Accordion';
import TrustBar from '../../components/marketplace/TrustBar';
import ListingGrid from '../../components/marketplace/ListingGrid';
import ListingArt from '../../components/marketplace/ListingArt';

const HERO_LINE_1 = ['LEVEL', 'UP', 'YOUR'];
const HERO_LINE_2 = ['GAME.'];

const FAQ = [
  { q: 'How fast is delivery?', a: 'Accounts are delivered instantly to your email the moment payment is confirmed.' },
  { q: 'Are the accounts safe?', a: 'Yes — every account is sourced and hand-checked by our own team before it ever goes live, never a third-party seller.' },
  { q: 'Do you offer refunds?', a: 'We back every purchase with a money-back guarantee. If something is wrong on our end, we replace it or refund you.' },
  { q: 'How does boosting work?', a: 'Pick your current and desired rank on the Boosting page, get an instant price, and one of our own boosters gets to work securely.' },
];

export default function HomePage({ featuredListings = [] }) {
  return (
    <main className="min-h-screen bg-ink-950 pb-24 text-ink-50">
      {/* HERO */}
      <section className="relative flex min-h-[520px] flex-col justify-center overflow-hidden px-6 pb-24 pt-20 sm:min-h-[560px] sm:pt-28 lg:min-h-[620px]">
        <Slideshow images={HOMEPAGE_HERO_ART} priority className="absolute inset-0" ariaLabel="Featured game art" />

        <div className="relative z-20 mx-auto max-w-4xl text-center">
          <h1 className="font-display text-[13vw] font-bold uppercase leading-[0.9] tracking-tight text-white sm:text-7xl md:text-8xl">
            <span className="block">
              {HERO_LINE_1.map((word, i) => (
                <motion.span key={word} custom={i} initial="hidden" animate="show" variants={heroWord} className="mr-4 inline-block">
                  {word}
                </motion.span>
              ))}
            </span>
            <span className="block text-gold-400">
              {HERO_LINE_2.map((word, i) => (
                <motion.span key={word} custom={i + HERO_LINE_1.length} initial="hidden" animate="show" variants={heroWord} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mx-auto mt-6 max-w-xl text-sm text-white/80 sm:text-base"
          >
            Verified CS2, Valorant &amp; GTA V accounts we procure and check ourselves —
            instant delivery, real money-back guarantee, no third-party sellers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.6 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-4"
          >
            <Button href="/cs2" variant="primary" size="lg">Browse Accounts</Button>
            <Button href="/boosting" variant="outline" size="lg" className="text-white hover:text-gold-300">Get Boosted</Button>
          </motion.div>
        </div>
      </section>

      {/* GAME TILES */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce()}
        variants={staggerContainer}
        className="mx-auto max-w-7xl px-6"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3" style={{ perspective: 1200 }}>
          {GAME_LIST.map((game) => (
            <motion.div key={game.slug} variants={fadeInUp}>
              <Link href={game.href} className="focus-ring group block">
                <motion.div
                  initial="rest"
                  whileHover="hover"
                  variants={tileTilt}
                  className="overflow-hidden rounded-2xl border border-ink-600 bg-ink-800/60"
                >
                  <ListingArt game={game.key} size="hero" className="!h-56" />
                  <div className="p-6">
                    <div className="text-xs font-bold uppercase tracking-wider" style={{ color: game.accent }}>
                      {game.tagline}
                    </div>
                    <div className="font-display mt-1 flex items-center justify-between text-2xl font-bold">
                      {game.label}
                      <span className="text-gold-400 transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TRUST BAR */}
      <section className="mx-auto max-w-7xl px-6 pt-16">
        <TrustBar />
      </section>

      {/* FEATURED LISTINGS */}
      <section className="mx-auto max-w-7xl px-6 pt-20">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce()}
          variants={fadeInUp}
          className="font-display mb-8 text-3xl font-bold"
        >
          Fresh <span className="text-gold-400">Inventory</span>
        </motion.h2>
        <ListingGrid listings={featuredListings} />
      </section>

      {/* BOOSTING CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce()}
        variants={fadeInUp}
        className="mx-auto max-w-7xl px-6 pt-20"
      >
        <div className="relative overflow-hidden rounded-3xl border border-gold-600/30 bg-gradient-to-br from-ink-800 to-ink-900 p-10 sm:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-gold-500/10 blur-[100px]" />
          <div className="relative flex flex-wrap items-center justify-between gap-8">
            <div className="max-w-lg">
              <h2 className="font-display text-3xl font-bold sm:text-4xl">
                NEED A <span className="text-gold-400">RANK BOOST?</span>
              </h2>
              <p className="mt-4 text-sm text-ink-200 sm:text-base">
                Pick your current and target rank and get an instant price — fulfilled by our own boosters, never a stranger.
              </p>
            </div>
            <Button href="/boosting" variant="primary" size="lg">Start Boost →</Button>
          </div>
        </div>
      </motion.section>

      {/* SELL CTA */}
      <motion.section
        initial="hidden"
        whileInView="show"
        viewport={viewportOnce()}
        variants={fadeInUp}
        className="mx-auto max-w-7xl px-6 pt-10"
      >
        <div className="rounded-3xl border border-ink-600 bg-ink-800/40 p-10 text-center sm:p-16">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            HAVE AN ACCOUNT TO <span className="text-gold-400">SELL?</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-200">
            Submit your account details — our team reviews and lists it once verified.
          </p>
          <div className="mt-7">
            <Button href="/sell" variant="outline" size="lg">Submit a Listing</Button>
          </div>
        </div>
      </motion.section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-4xl px-6 pt-24">
        <motion.h2
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce()}
          variants={fadeInUp}
          className="font-display mb-8 text-center text-3xl font-bold"
        >
          Frequently Asked <span className="text-gold-400">Questions</span>
        </motion.h2>
        <Accordion>
          {FAQ.map((item) => (
            <AccordionItem key={item.q} title={item.q}>
              {item.a}
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* TERMS */}
      <section id="terms" className="mx-auto max-w-4xl px-6 pt-16">
        <h2 className="font-display mb-6 text-center text-2xl font-bold">
          Terms &amp; <span className="text-gold-400">Conditions</span>
        </h2>
        <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-8 text-sm leading-relaxed text-ink-200">
          <p className="mb-4">
            By purchasing accounts or boosting services on SmurfRank, you agree to the following terms.
          </p>
          <p className="mb-4">
            <strong className="text-ink-50">1. Delivery:</strong> Account details are sent to your registered email immediately after payment. Change the password right away.
          </p>
          <p className="mb-4">
            <strong className="text-ink-50">2. Warranty:</strong> Every purchase carries our standard money-back guarantee against pre-existing bans or recall. Bans caused by buyer conduct void the warranty.
          </p>
          <p>
            <strong className="text-ink-50">3. Liability:</strong> SmurfRank is not affiliated with Valve, Riot Games, or Rockstar Games.
          </p>
        </div>
      </section>
    </main>
  );
}
