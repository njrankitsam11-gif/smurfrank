import { cn } from '../../lib/cn';

export default function Input({ label, required, hint, error, className, id, ...props }) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <label htmlFor={id} className="text-xs font-bold uppercase tracking-wide text-ink-200">
          {label} {required && <span aria-hidden="true" className="text-gold-400">*</span>}
        </label>
      )}
      <input
        id={id}
        required={required}
        aria-required={required || undefined}
        className={cn(
          'focus-ring w-full rounded-lg border border-ink-500 bg-ink-800 px-4 py-3 text-sm text-ink-50 placeholder:text-ink-300',
          error && 'border-red-500'
        )}
        {...props}
      />
      {hint && <span className="text-xs text-ink-300">{hint}</span>}
    </div>
  );
}
