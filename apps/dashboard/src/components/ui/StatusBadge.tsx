import { cn } from '../../utils';

type StatusVariant = 'success' | 'warning' | 'error' | 'info' | 'default';

interface StatusBadgeProps {
  variant?: StatusVariant;
  children: React.ReactNode;
  className?: string;
  pulse?: boolean;
}

export function StatusBadge({ variant = 'default', children, className, pulse = false }: StatusBadgeProps) {
  const styles: Record<StatusVariant, string> = {
    success: 'bg-pitaya-emerald/10 text-pitaya-emerald border-pitaya-emerald/30 shadow-[0_0_8px_rgba(0,178,133,0.3)]',
    warning: 'bg-pitaya-warning/10 text-pitaya-warning border-pitaya-warning/30 shadow-[0_0_8px_rgba(245,158,11,0.3)]',
    error: 'bg-pitaya-error/10 text-pitaya-error border-pitaya-error/30 shadow-[0_0_8px_rgba(239,68,68,0.3)]',
    info: 'bg-pitaya-cyan/10 text-pitaya-cyan border-pitaya-cyan/30 shadow-[0_0_8px_rgba(0,170,210,0.3)]',
    default: 'bg-slate-800/50 text-slate-400 border-slate-700/50',
  };

  const pulses: Record<StatusVariant, string> = {
    success: 'bg-pitaya-emerald',
    warning: 'bg-pitaya-warning',
    error: 'bg-pitaya-error',
    info: 'bg-pitaya-cyan',
    default: 'bg-slate-400',
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold border",
      styles[variant],
      className
    )}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={cn("animate-ping absolute inline-flex h-full w-full rounded-full opacity-75", pulses[variant])}></span>
          <span className={cn("relative inline-flex rounded-full h-2 w-2", pulses[variant])}></span>
        </span>
      )}
      {children}
    </div>
  );
}
