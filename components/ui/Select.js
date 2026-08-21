import { cn } from '../../lib/cn';

export default function Select({ label, hideLabel, className, id, ...props }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={id} className={cn('text-xs font-bold uppercase tracking-wide text-ink-200', hideLabel && 'sr-only')}>
          {label}
        </label>
      )}
      <select
        id={id}
        className="focus-ring w-full appearance-none rounded-lg border border-ink-500 bg-ink-800 px-4 py-3 text-sm font-semibold text-ink-50"
        {...props}
      />
    </div>
  );
}
