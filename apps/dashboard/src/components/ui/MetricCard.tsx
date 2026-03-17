import { Card } from './Card';
import { cn } from '../../utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  trend?: string;
  trendType?: 'up' | 'down' | 'neutral';
}

export function MetricCard({ title, value, trend, trendType = 'neutral' }: MetricCardProps) {
  const trendColors = {
    up: 'text-pitaya-emerald',
    down: 'text-pitaya-magenta',
    neutral: 'text-slate-500',
  };

  return (
    <Card className="bg-[#090a0f] p-5 rounded-xl transition-colors">
      <p className="text-[10px] text-slate-500 font-bold tracking-wider uppercase">{title}</p>
      <div className="flex items-baseline justify-between mt-3">
        <p className="text-2xl font-bold text-white font-mono tracking-tight">{value}</p>
        {trend && (
          <span className={cn("text-[10px] font-bold font-mono", trendColors[trendType])}>
            {trend}
          </span>
        )}
      </div>
    </Card>
  );
}
