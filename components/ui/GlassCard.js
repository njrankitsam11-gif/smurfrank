import { cn } from '../../lib/cn';

export default function GlassCard({ children, className, as: Tag = 'div', ...props }) {
  return (
    <Tag
      className={cn(
        'rounded-2xl border border-ink-600 bg-ink-800/60 backdrop-blur-sm',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
