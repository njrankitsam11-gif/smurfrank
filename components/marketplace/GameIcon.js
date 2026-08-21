// Original, brand-neutral line-art marks — deliberately NOT the Riot/Valve/
// Rockstar logos, since we can't legally use their trademarked art as our
// default product imagery. One abstract glyph per game, drawn in the game's
// accent color, used on cards, nav, and the illustrated detail-page art panel.

function CS2Glyph(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M32 6 L56 18 V40 C56 50 45 57 32 60 C19 57 8 50 8 40 V18 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M22 32 L30 40 L44 24" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ValorantGlyph(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M8 14 L28 46 L36 46 L16 14 Z" fill="currentColor" opacity="0.9" />
      <path d="M28 14 L56 14 L36 46 L28 46 Z" fill="currentColor" />
    </svg>
  );
}

function GTAVGlyph(props) {
  return (
    <svg viewBox="0 0 64 64" fill="none" {...props}>
      <path d="M32 5 L38 24 L58 24 L42 36 L48 55 L32 43 L16 55 L22 36 L6 24 L26 24 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

const GLYPHS = { CS2: CS2Glyph, Valorant: ValorantGlyph, 'GTA V': GTAVGlyph };

export default function GameIcon({ game, className, ...props }) {
  const Glyph = GLYPHS[game] || CS2Glyph;
  return <Glyph className={className} {...props} />;
}
