// Single source of truth for the three games we sell. Every listing/boosting
// surface reads from here instead of hardcoding per-game copy or colors, so
// the three category pages stay in sync instead of drifting like before.

const CS2_RANKS = [
  'Silver I', 'Silver II', 'Silver III', 'Silver IV', 'Silver Elite', 'Silver Elite Master',
  'Gold Nova I', 'Gold Nova II', 'Gold Nova III', 'Gold Nova Master',
  'Master Guardian I', 'Master Guardian II', 'Master Guardian Elite', 'Distinguished Master Guardian',
  'Legendary Eagle', 'Legendary Eagle Master', 'Supreme Master First Class', 'Global Elite',
];

const VALORANT_RANKS = [
  ...['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Ascendant', 'Immortal'].flatMap((tier) => [
    `${tier} 1`, `${tier} 2`, `${tier} 3`,
  ]),
  'Radiant',
];

export const GAMES = {
  CS2: {
    key: 'CS2',
    slug: 'cs2',
    href: '/cs2',
    label: 'CS2',
    fullLabel: 'Counter-Strike 2',
    tagline: 'PRIME ENABLED · INSTANT ACCESS',
    accent: '#F5A623',
    accentSoft: 'rgba(245, 166, 35, 0.12)',
    glow: 'rgba(245, 166, 35, 0.35)',
    specFields: [
      { key: 'rank', label: 'Rank' },
      { key: 'region', label: 'Region' },
      { key: 'type', label: 'Prime Status' },
      { key: 'level', label: 'Profile Level' },
      { key: 'hours', label: 'Hours Played' },
      { key: 'wins', label: 'Match Wins' },
    ],
    rankLadder: CS2_RANKS,
    boostPricePerStep: 2.5,
  },
  Valorant: {
    key: 'Valorant',
    slug: 'valorant',
    href: '/valorant',
    label: 'Valorant',
    fullLabel: 'Valorant',
    tagline: 'RANKED READY · 100% SECURE DELIVERY',
    accent: '#FF4655',
    accentSoft: 'rgba(255, 70, 85, 0.12)',
    glow: 'rgba(255, 70, 85, 0.35)',
    specFields: [
      { key: 'rank', label: 'Rank' },
      { key: 'region', label: 'Region' },
      { key: 'type', label: 'Account Type' },
      { key: 'level', label: 'Level' },
      { key: 'wins', label: 'Wins' },
      { key: 'hours', label: 'Hours Played' },
    ],
    rankLadder: VALORANT_RANKS,
    boostPricePerStep: 3,
  },
  'GTA V': {
    key: 'GTA V',
    slug: 'gta-v',
    href: '/gta-v',
    label: 'GTA V',
    fullLabel: 'GTA V Online',
    tagline: 'INSTANT MONEY DROPS · SAFE & UNDETECTED',
    accent: '#5FD068',
    accentSoft: 'rgba(95, 208, 104, 0.12)',
    glow: 'rgba(95, 208, 104, 0.35)',
    specFields: [
      { key: 'level', label: 'Level' },
      { key: 'region', label: 'Platform / Region' },
      { key: 'type', label: 'Account Type' },
      { key: 'rank', label: 'Rank' },
      { key: 'hours', label: 'Hours Played' },
      { key: 'wins', label: 'Wins' },
    ],
  },
};

export const GAME_LIST = Object.values(GAMES);

export function getGameTheme(gameKey) {
  return GAMES[gameKey] || GAMES['CS2'];
}

export function getGameBySlug(slug) {
  return GAME_LIST.find((g) => g.slug === slug);
}
