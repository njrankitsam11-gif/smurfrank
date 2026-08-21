'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { getGameTheme } from '../../lib/gameTheme';
import { computeBoostEstimate } from '../../lib/boostPricing';
import { fadeInUp, viewportOnce } from '../../lib/motion';
import Select from '../ui/Select';
import Tabs from '../ui/Tabs';
import Toggle from '../ui/Toggle';
import Button from '../ui/Button';

const SERVERS = ['EU', 'NA', 'APAC', 'LATAM', 'OCE'];

export default function RankBoostCalculator({ game }) {
  const theme = getGameTheme(game);
  const ladder = theme.rankLadder;
  const { addToCart } = useCart();

  const [currentRankIndex, setCurrentRankIndex] = useState(0);
  const [currentRR, setCurrentRR] = useState(0);
  const [desiredRankIndex, setDesiredRankIndex] = useState(Math.min(ladder.length - 1, 10));
  const [server, setServer] = useState(SERVERS[0]);
  const [mode, setMode] = useState('solo');
  const [options, setOptions] = useState({
    offline: false,
    soloQueue: false,
    no5Stack: false,
    stream: false,
    specificAgents: false,
  });
  const [added, setAdded] = useState(false);

  const estimate = computeBoostEstimate({
    theme,
    currentRankIndex: Number(currentRankIndex),
    desiredRankIndex: Number(desiredRankIndex),
    currentRR: Number(currentRR),
    mode,
    options,
  });

  function toggle(key) {
    setOptions((o) => ({ ...o, [key]: !o[key] }));
    setAdded(false);
  }

  function handleGetOffers() {
    if (!estimate) return;
    addToCart({
      id: `boost-${theme.slug}-${currentRankIndex}-${desiredRankIndex}-${mode}`,
      title: `${theme.label} Boost: ${ladder[currentRankIndex]} → ${ladder[desiredRankIndex]}`,
      price: `$${estimate.price.toFixed(2)}`,
      desc: `${mode === 'duo' ? 'Duo queue' : 'Solo queue'} · ${server} server`,
      game: theme.key,
    });
    setAdded(true);
  }

  const agentsLabel = theme.key === 'Valorant' ? 'Specific agents' : 'Specific maps';

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce()}
      variants={fadeInUp}
      className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1fr_360px]"
    >
      <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-6">
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-300">Current Rank</div>
        <Select
          id="currentRank"
          label="Current rank"
          hideLabel
          value={currentRankIndex}
          onChange={(e) => setCurrentRankIndex(Number(e.target.value))}
        >
          {ladder.map((rank, i) => (
            <option key={rank} value={i}>{rank}</option>
          ))}
        </Select>
        <div className="mt-4 flex flex-col gap-2">
          <label htmlFor="currentRR" className="text-xs font-bold uppercase tracking-wide text-ink-200">
            Current RR / Progress (0-99)
          </label>
          <input
            id="currentRR"
            type="number"
            min={0}
            max={99}
            value={currentRR}
            onChange={(e) => setCurrentRR(Math.max(0, Math.min(99, Number(e.target.value))))}
            className="focus-ring w-full rounded-lg border border-ink-500 bg-ink-800 px-4 py-3 text-sm font-semibold text-ink-50"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-ink-600 bg-ink-800/60 p-6" style={{ boxShadow: `inset 0 0 0 1px ${theme.accentSoft}` }}>
        <div className="mb-4 text-xs font-bold uppercase tracking-wider text-ink-300">Desired Rank</div>
        <Select
          id="desiredRank"
          label="Desired rank"
          hideLabel
          value={desiredRankIndex}
          onChange={(e) => setDesiredRankIndex(Number(e.target.value))}
        >
          {ladder.map((rank, i) => (
            <option key={rank} value={i}>{rank}</option>
          ))}
        </Select>
        <div className="mt-4">
          <Select id="server" label="Server" value={server} onChange={(e) => setServer(e.target.value)}>
            {SERVERS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="flex flex-col gap-5 rounded-2xl border border-gold-600/40 bg-gradient-to-b from-gold-900/20 to-ink-800/60 p-6">
        <div className="text-xs font-bold uppercase tracking-wider text-gold-300">Customize Order</div>

        <Tabs
          className="tabs-mode"
          label="Solo or duo queue"
          options={[{ label: 'Solo', value: 'solo' }, { label: 'Duo', value: 'duo' }]}
          value={mode}
          onChange={(v) => { setMode(v); setAdded(false); }}
        />

        <div className="flex flex-col divide-y divide-ink-600/60">
          <Toggle id="offline" label="Offline mode" checked={options.offline} onChange={() => toggle('offline')} />
          <Toggle id="soloQueue" label="Solo queue only" checked={options.soloQueue} onChange={() => toggle('soloQueue')} />
          <Toggle id="no5Stack" label="No 5 stack" checked={options.no5Stack} onChange={() => toggle('no5Stack')} />
          <Toggle id="stream" label="Stream my boost" checked={options.stream} onChange={() => toggle('stream')} />
          <Toggle id="specificAgents" label={agentsLabel} checked={options.specificAgents} onChange={() => toggle('specificAgents')} />
        </div>

        <div className="mt-2 rounded-xl border border-ink-600 bg-ink-900/60 p-4">
          <div className="text-[11px] font-bold uppercase tracking-wider text-ink-300">Estimated Price</div>
          <div className="font-display text-3xl font-bold text-gold-400">
            {estimate ? `$${estimate.price.toFixed(2)}` : '—'}
          </div>
          {!estimate && (
            <p className="mt-1 text-xs text-ink-300">Pick a desired rank above your current rank.</p>
          )}
        </div>

        <Button variant="primary" size="lg" disabled={!estimate} onClick={handleGetOffers} className="w-full">
          {added ? 'Added to cart ✓' : 'Get offers now'}
        </Button>
        <p className="text-center text-[11px] text-ink-300">Fulfilled by our own verified boosters — no third parties.</p>
      </div>
    </motion.div>
  );
}
