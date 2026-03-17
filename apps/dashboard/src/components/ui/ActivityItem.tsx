import { Zap, Clock, CheckCircle, LucideIcon, HelpCircle } from 'lucide-react';
import { cn } from '../../utils';

export type ActivityType = 'action' | 'approval' | 'system';

interface ActivityItemProps {
  type: ActivityType;
  message: string | React.ReactNode;
  agent: string;
  timestamp: string;
  isLast?: boolean;
  actions?: React.ReactNode;
}

export function ActivityItem({ type, message, agent, timestamp, isLast, actions }: ActivityItemProps) {
  const icons: Record<ActivityType, LucideIcon> = {
    action: Zap,
    approval: Clock,
    system: CheckCircle,
  };

  const colors: Record<ActivityType, string> = {
    action: 'text-pitaya-cyan',
    approval: 'text-pitaya-magenta',
    system: 'text-pitaya-emerald',
  };

  const Icon = icons[type] || HelpCircle;

  return (
    <div className="group flex gap-3 p-3 rounded-xl border border-slate-800/10 hover:border-slate-800/80 bg-slate-900/30 hover:bg-slate-900/60 transition-colors">
      <div className="mt-0.5 relative">
        {!isLast && <div className="absolute top-5 left-1/2 w-px h-full bg-slate-800 -translate-x-1/2" />}
        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center bg-slate-900 border border-slate-800 relative z-10", colors[type])}>
          <Icon className="w-3 h-3" />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <span className="text-xs text-slate-400 font-medium">
            Agente <span className="text-white font-bold">{agent}</span>
          </span>
          <span className="text-[9px] text-slate-500 font-mono">{timestamp}</span>
        </div>
        <div className="text-xs text-slate-300 mt-1">{message}</div>
        {actions && (
          <div className="mt-2 flex gap-1.5">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
