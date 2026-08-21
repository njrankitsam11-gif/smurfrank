import { getGameTheme } from '../../lib/gameTheme';
import GameIcon from './GameIcon';

const SIZE_CLASSES = {
  card: 'h-40',
  hero: 'h-[360px] md:h-[440px]',
};

// Illustrated placeholder art: a radial glow in the game's accent color, a
// faint dot-grid texture, and the game's original glyph. Used whenever a
// listing has no real photo attached yet (imageUrl falls back here).
export default function ListingArt({ game, size = 'card', className = '', imageUrl }) {
  const theme = getGameTheme(game);

  if (imageUrl) {
    return (
      <div className={`relative w-full overflow-hidden rounded-t-2xl ${SIZE_CLASSES[size]} ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={imageUrl} alt="" className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden rounded-t-2xl ${SIZE_CLASSES[size]} ${className}`}
      style={{
        background: `radial-gradient(circle at 30% 20%, ${theme.glow}, transparent 60%), linear-gradient(160deg, #12141C, #0A0B10)`,
      }}
    >
      <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden="true">
        <pattern id={`dots-${theme.slug}`} width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
        </pattern>
        <rect width="100%" height="100%" fill={`url(#dots-${theme.slug})`} />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <GameIcon
          game={theme.key}
          className={size === 'hero' ? 'h-40 w-40 opacity-90' : 'h-20 w-20 opacity-80'}
          style={{ color: theme.accent }}
        />
      </div>
    </div>
  );
}
