import { getGameTheme } from '../../lib/gameTheme';
import GameIcon from './GameIcon';

const SIZE_CLASSES = {
  card: 'h-40',
  hero: 'h-[360px] md:h-[440px]',
};

// Deterministic 0..1 hash so the same listing always renders the same way
// (no layout shift on re-render) while different listings in a grid don't
// all look pixel-identical.
function hash01(seed) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return (h % 1000) / 1000;
}

// 0..1 — how far up its game's rank ladder this listing sits. Games without
// a ladder (GTA V) fall back to a mid value so nothing gets an unearned glow.
function prestige(theme, rank) {
  if (!theme.rankLadder || !rank) return 0.5;
  const idx = theme.rankLadder.findIndex((r) => r.toLowerCase() === String(rank).toLowerCase());
  if (idx === -1) return 0.5;
  return idx / (theme.rankLadder.length - 1);
}

// Illustrated placeholder art: a radial glow in the game's accent color, a
// faint dot-grid texture, and the game's original glyph. Used whenever a
// listing has no real photo attached yet (imageUrl falls back here). Two
// listings of the same game still read as distinct: the glyph's position/
// rotation is hashed off the listing id, and top-of-ladder ranks get a
// stronger, wider glow so premium listings visually stand out in a grid.
export default function ListingArt({ game, size = 'card', className = '', imageUrl, seed, rank }) {
  const theme = getGameTheme(game);

  if (imageUrl) {
    return (
      <div className={`relative w-full overflow-hidden rounded-t-2xl ${SIZE_CLASSES[size]} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  const t = seed ? hash01(seed) : 0.5;
  const rotation = (t - 0.5) * 16; // -8deg .. 8deg
  const glowX = 20 + t * 55; // 20% .. 75%
  const p = prestige(theme, rank);
  const glowSize = 55 + p * 25; // wider glow for higher rank
  const iconOpacity = 0.72 + p * 0.22;

  return (
    <div
      className={`relative w-full overflow-hidden rounded-t-2xl ${SIZE_CLASSES[size]} ${className}`}
      style={{
        background: `radial-gradient(circle at ${glowX}% 20%, ${theme.glow}, transparent ${glowSize}%), linear-gradient(160deg, #12141C, #0A0B10)`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <pattern id={`dots-${theme.slug}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#dots-${theme.slug})`} />
      </svg>
      {p > 0.8 && (
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ boxShadow: `inset 0 0 40px ${theme.glow}`, mixBlendMode: 'screen' }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <GameIcon
          game={theme.key}
          className={size === 'hero' ? 'h-40 w-40' : 'h-20 w-20'}
          style={{ color: theme.accent, opacity: iconOpacity, transform: `rotate(${rotation}deg)` }}
        />
      </div>
    </div>
  );
}
