import { Card, CardHeader, CardContent, CardFooter } from './Card';
import { StatusBadge } from './StatusBadge';
import { Settings } from 'lucide-react';
import { cn } from '../../utils';

interface AgentCardProps {
  name: string;
  role: string;
  icon: React.ElementType;
  status: 'active' | 'idle' | 'warning';
  activeTasks: number;
  highlightColor?: string;
  className?: string;
}

export function AgentCard({ name, role, icon: Icon, status, activeTasks, highlightColor = '#00AAD2', className }: AgentCardProps) {
  const getStatusVariant = () => {
    switch(status) {
      case 'active': return 'success';
      case 'warning': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Card className={cn("group hover:border-slate-700 transition-all duration-300", className)}>
      <CardHeader className="flex flex-row items-center justify-between py-3 px-4 bg-transparent border-b-0">
        <StatusBadge variant={getStatusVariant()} pulse={status === 'active'}>
          {status === 'active' ? 'ACTIVO' : status === 'warning' ? 'ALERTA' : 'IDLE'}
        </StatusBadge>
        <button className="text-slate-500 hover:text-white transition-colors">
          <Settings className="w-4 h-4" />
        </button>
      </CardHeader>
      
      <CardContent className="pt-2 pb-6 px-4 flex flex-col items-center text-center">
        <div className="relative mb-4">
          {/* Back glow mapped with highlight color or standard Brand gradient */}
          <div className="absolute inset-0 w-16 h-16 rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity" style={{ backgroundColor: highlightColor }} />
          <div className="relative w-16 h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center overflow-hidden">
             <Icon className="w-8 h-8 text-white relative z-10" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-white tracking-tight">{name}</h3>
        <p className="text-xs text-slate-400 font-medium">{role}</p>
      </CardContent>

      <CardFooter className="py-3 px-4 flex items-center justify-between text-xs bg-slate-900/50 border-t border-slate-800/50">
         <span className="text-slate-500">Tareas Activas</span>
         <span className="font-mono font-bold" style={{ color: highlightColor }}>{activeTasks}</span>
      </CardFooter>
    </Card>
  );
}
