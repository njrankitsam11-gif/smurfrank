'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { getGameTheme } from '../../lib/gameTheme';
import GameIcon from './GameIcon';
import { cn } from '../../lib/cn';

export default function GameSubNav({ game }) {
  const theme = getGameTheme(game);
  const pathname = usePathname();
  const tabs = [
    { label: 'Accounts', href: theme.href },
    { label: 'Boosting', href: '/boosting' },
  ];

  return (
    <div className="border-b border-ink-600 bg-ink-900/80">
      <div className="mx-auto flex max-w-7xl items-center gap-8 px-6 py-4">
        <div className="flex items-center gap-2.5">
          <GameIcon game={theme.key} className="h-6 w-6" style={{ color: theme.accent }} />
          <span className="font-display text-lg font-bold text-ink-50">{theme.label}</span>
        </div>
        <nav className="flex gap-6">
          {tabs.map((tab) => {
            const active = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                className={cn(
                  'focus-ring border-b-2 py-1 text-sm font-bold uppercase tracking-wide transition-colors',
                  active ? 'border-gold-400 text-ink-50' : 'border-transparent text-ink-200 hover:text-ink-50'
                )}
              >
                {tab.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
