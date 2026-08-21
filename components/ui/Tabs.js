'use client';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

// Trigger: onClick. Feel: the active pill glides via layoutId (spring).
// Perf: layout animation is limited to this small pill, transform-only.
export default function Tabs({ options, value, onChange, className }) {
  return (
    <div className={cn('inline-flex flex-wrap gap-1 rounded-xl border border-ink-600 bg-ink-800/60 p-1', className)}>
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            className={cn(
              'focus-ring relative rounded-lg px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors',
              active ? 'text-ink-950' : 'text-ink-200 hover:text-ink-50'
            )}
          >
            {active && (
              <motion.span
                layoutId={`tab-pill-${className || 'default'}`}
                className="absolute inset-0 rounded-lg bg-gold-400"
                transition={{ type: 'spring', stiffness: 400, damping: 32 }}
              />
            )}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}
