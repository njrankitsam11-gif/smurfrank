import { cn } from '../../lib/cn';

export default function Badge({ children, color, className, icon }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider',
        className
      )}
      style={
        color
          ? { color, background: `${color}1F`, border: `1px solid ${color}40` }
          : undefined
      }
    >
      {icon}
      {children}
    </span>
  );
}
