// Curated decorative game art for the homepage hero and per-game page
// headers — produced by scripts/optimize-game-art.mjs from
// /Users/sam/Downloads/smurfrankpics. Unrelated to Listing.images (Prisma),
// which holds actual marketplace listing photos.

import { GAMES } from './gameTheme';

function withAccent(images, accent) {
  return images.map((image) => ({ ...image, accent }));
}

const CS2_IMAGES = [
  { src: '/images/cs2/counter-strike-2-art.webp', alt: 'Counter-Strike 2 promotional artwork' },
  { src: '/images/cs2/counter-strike-2-wallpaper.webp', alt: 'Counter-Strike 2 wallpaper' },
  { src: '/images/cs2/counter-strike-dragon-lore-wallpaper.webp', alt: 'Counter-Strike AWP Dragon Lore skin artwork' },
  { src: '/images/cs2/cs-2-v2-0-wallpaper-by-wesleykatana.webp', alt: 'Counter-Strike 2 fan art wallpaper' },
  { src: '/images/cs2/cs-go-wallpaper-by-downgraf.webp', alt: 'Counter-Strike wallpaper artwork' },
  { src: '/images/cs2/cs2-pixelated-wallpaper.webp', alt: 'Pixel-art style Counter-Strike 2 wallpaper' },
  { src: '/images/cs2/de-dust2-6k-wallpaper.webp', alt: 'Dust II map artwork from Counter-Strike' },
  { src: '/images/cs2/mossawi-305277118925-20170524231910-667951826471.webp', alt: 'Counter-Strike fan artwork' },
];

const GTAV_IMAGES = [
  { src: '/images/gta-v/grand-theft-auto-v.webp', alt: 'Grand Theft Auto V artwork' },
  { src: '/images/gta-v/grand-theft-auto-v-wallpaper.webp', alt: 'Grand Theft Auto V wallpaper' },
  { src: '/images/gta-v/grand-theft-auto-online-ps5-official.webp', alt: 'Official Grand Theft Auto Online PS5 artwork' },
  { src: '/images/gta-v/gta-online-wallpaper-3840x1600.webp', alt: 'GTA Online wallpaper' },
  { src: '/images/gta-v/gta-v-collage-wallpaper.webp', alt: 'GTA V character collage wallpaper' },
  { src: '/images/gta-v/gta-v-green-background-wallpaper-1920x1200.webp', alt: 'GTA V artwork with a green background' },
  { src: '/images/gta-v/gta-v-wallpaper-3-by-juniorbunny.webp', alt: 'GTA V fan art wallpaper' },
  { src: '/images/gta-v/gta-v-wallpaper-3840x1600.webp', alt: 'GTA V wallpaper artwork' },
  { src: '/images/gta-v/gta-v-wallpaper-3840x1600-1.webp', alt: 'GTA V wallpaper art' },
  { src: '/images/gta-v/gta-v-wallpaper-3840x1600-2.webp', alt: 'GTA V desktop wallpaper' },
  { src: '/images/gta-v/gta-v-wallpaper-3840x1600-3.webp', alt: 'GTA V game wallpaper' },
  { src: '/images/gta-v/gta-v-wallpaper-3840x1600-4.webp', alt: 'GTA V fan-made wallpaper' },
  { src: '/images/gta-v/rockstar-games-logo-wallpaper.webp', alt: 'Rockstar Games logo wallpaper' },
  { src: '/images/gta-v/wallhaven-4x1reo-3840x1600.webp', alt: 'GTA V wallpaper artwork' },
];

const VALORANT_IMAGES = [
  { src: '/images/valorant/valorant-art-3840x1600.webp', alt: 'Valorant digital artwork' },
  { src: '/images/valorant/valorant-brimstone-cypher-sage-art.webp', alt: 'Valorant art featuring Brimstone, Cypher, and Sage' },
  { src: '/images/valorant/valorant-characters-wallpaper.webp', alt: 'Valorant character wallpaper' },
  { src: '/images/valorant/valorant-digital-art-wallpaper-3840x2160.webp', alt: 'Valorant digital art wallpaper' },
];

export const GAME_ART = {
  cs2: withAccent(CS2_IMAGES, GAMES.CS2.accent),
  valorant: withAccent(VALORANT_IMAGES, GAMES.Valorant.accent),
  'gta-v': withAccent(GTAV_IMAGES, GAMES['GTA V'].accent),
};

export const CROSSOVER_ART = {
  src: '/images/crossover/gta-v-cs-wallpaper.webp',
  alt: 'Crossover artwork combining GTA V and Counter-Strike characters',
  accent: null,
};

export function getGameArt(slug) {
  return GAME_ART[slug] || [];
}

// Merges N image groups into one list, greedily taking next from whichever
// remaining group is largest (excluding whichever group was just taken
// from) so consecutive entries avoid repeating the same source group. A
// plain round-robin only achieves this while every group still has items
// left — once a smaller group empties out, it clusters the remaining large
// group at the tail. This stays repeat-free as long as no single group
// holds more than half the total items; a group that large would force
// some adjacency by pigeonhole. `seedIndex` optionally treats one group as
// "already just used" before the first pick — see HOMEPAGE_HERO_ART below,
// where the opening slide is placed by hand and the interleave needs to
// avoid repeating *that* group on its very first pick too.
export function interleaveArt(...groups) {
  return interleaveGroups(groups, -1);
}

function interleaveGroups(groups, seedIndex) {
  const queues = groups.map((group) => [...group]);
  const result = [];
  let lastIndex = seedIndex;

  while (queues.some((queue) => queue.length > 0)) {
    let pick = -1;
    for (let i = 0; i < queues.length; i += 1) {
      if (i === lastIndex || queues[i].length === 0) continue;
      if (pick === -1 || queues[i].length > queues[pick].length) pick = i;
    }
    if (pick === -1) {
      // Every group but the last-used one is empty — an unavoidable repeat.
      pick = queues.findIndex((queue) => queue.length > 0);
    }
    result.push(queues[pick].shift());
    lastIndex = pick;
  }

  return result;
}

// Requested as the opening slide. Pulled out of its pool before
// interleaving (not filtered out after) so removing it doesn't leave a gap
// that lets two same-game slides land next to each other later in the mix.
const FEATURED_FIRST_SRC = '/images/gta-v/gta-online-wallpaper-3840x1600.webp';

const poolSlugs = ['cs2', 'valorant', 'gta-v'];
const pools = poolSlugs.map((slug) => GAME_ART[slug]);
const featuredIndex = pools.findIndex((pool) => pool.some((image) => image.src === FEATURED_FIRST_SRC));
const featuredFirst = featuredIndex !== -1 && pools[featuredIndex].find((image) => image.src === FEATURED_FIRST_SRC);
const poolsMinusFeatured = pools.map((pool, i) =>
  i === featuredIndex ? pool.filter((image) => image.src !== FEATURED_FIRST_SRC) : pool
);
// Seeded with the featured image's own group so the first automatic pick
// can't repeat it — the same rule the algorithm already applies internally.
const remaining = interleaveGroups(poolsMinusFeatured, featuredIndex);

export const HOMEPAGE_HERO_ART = [
  ...(featuredFirst ? [featuredFirst] : []),
  ...remaining,
  CROSSOVER_ART,
];
