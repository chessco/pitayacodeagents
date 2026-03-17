import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { StatusBadge } from './StatusBadge';
import { ShieldAlert, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { cn } from '../../utils';

export type RiskLevel = 'low' | 'medium' | 'high';

interface ApprovalCardProps {
  title: string;
  description: string;
  sourceAgent: string;
  riskLevel: RiskLevel;
  timestamp: string;
  className?: string;
  onApprove?: () => void;
  onReject?: () => void;
}

export function ApprovalCard({ 
  title, 
  description, 
  sourceAgent, 
  riskLevel, 
  timestamp, 
  className,
  onApprove,
  onReject 
}: ApprovalCardProps) {
  
  const riskConfig = {
    low: { color: 'success' as const, icon: ShieldAlert, label: 'Bajo Riesgo' },
    medium: { color: 'warning' as const, icon: AlertTriangle, label: 'Riesgo Medio' },
    high: { color: 'error' as const, icon: ShieldAlert, label: 'Alto Riesgo' },
  };

  const config = riskConfig[riskLevel];
  const Icon = config.icon;

  return (
    <Card className={cn(
      "border-l-4 transition-all duration-300",
      riskLevel === 'high' ? 'border-l-pitaya-error' : 
      riskLevel === 'medium' ? 'border-l-pitaya-warning' : 
      'border-l-pitaya-success',
      className
    )}>
      <CardHeader className="py-3 px-4 flex flex-row items-center justify-between bg-transparent">
        <StatusBadge variant={config.color} className="gap-1.5 px-2 py-0.5">
          <Icon className="w-3 h-3" />
          {config.label}
        </StatusBadge>
        <span className="text-xs text-slate-500 font-mono">{timestamp}</span>
      </CardHeader>
      
      <CardContent className="py-4 px-4 space-y-3">
        <h3 className="font-semibold text-white text-sm whitespace-pre-wrap">{title}</h3>
        <p className="text-xs text-slate-400 overflow-hidden text-ellipsis line-clamp-2">
          {description}
        </p>
        <div className="flex items-center gap-2 pt-2 text-xs">
          <span className="text-slate-500">Solicitante:</span>
          <span className="font-medium text-white px-2 py-0.5 rounded bg-[#10121d]">
            {sourceAgent}
          </span>
        </div>
      </CardContent>

      <CardFooter className="py-3 px-4 flex gap-3 bg-slate-900/10">
        <button 
          onClick={onReject}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-[#10121d] text-slate-300 hover:text-white hover:bg-[#1a1b26] transition-all text-xs font-medium"
        >
          <XCircle className="w-3.5 h-3.5" /> Rechazar
        </button>
        <button 
          onClick={onApprove}
          className="flex-1 flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-brand-gradient opacity-90 hover:opacity-100 text-white shadow-soft hover:shadow-[0_0_15px_rgba(226,26,101,0.3)] transition-all text-xs font-semibold"
        >
          <CheckCircle2 className="w-3.5 h-3.5" /> Aprobar
        </button>
      </CardFooter>
    </Card>
  );
}
