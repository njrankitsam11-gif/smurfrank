'use client';
import { motion } from 'framer-motion';
import { cn } from '../../lib/cn';

// Trigger: onClick. Feel: snappy spring slide of the knob.
export default function Toggle({ checked, onChange, label, id }) {
  return (
    <label htmlFor={id} className="flex cursor-pointer items-center justify-between gap-4 py-2.5">
      <span className="text-sm text-ink-100">{label}</span>
      <button
        id={id}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'focus-ring relative h-6 w-11 shrink-0 rounded-full transition-colors',
          checked ? 'bg-gold-400' : 'bg-ink-500'
        )}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-ink-950 shadow"
          animate={{ x: checked ? 20 : 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 32 }}
        />
      </button>
    </label>
  );
}
