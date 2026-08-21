import { getGameTheme } from '../../lib/gameTheme';

export default function SpecGrid({ listing }) {
  const theme = getGameTheme(listing.game);
  const cells = [
    { label: 'Game', value: theme.label },
    ...theme.specFields
      .map((f) => ({ label: f.label, value: listing[f.key] }))
      .filter((c) => c.value && c.value !== '-'),
    { label: 'Delivery', value: listing.instant ? 'Instant' : 'Manual', accent: listing.instant },
  ];

  return (
    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-ink-600 bg-ink-600 sm:grid-cols-3">
      {cells.map((cell) => (
        <div key={cell.label} className="bg-ink-800 p-5">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-wider text-ink-300">{cell.label}</div>
          <div className={`text-lg font-bold ${cell.accent ? 'text-gold-400' : 'text-ink-50'}`}>{cell.value}</div>
        </div>
      ))}
    </div>
  );
}
