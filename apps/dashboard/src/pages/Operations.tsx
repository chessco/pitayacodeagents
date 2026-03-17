import { Terminal, Cpu, Play, Square } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';

const operationsData = [
  { id: '1', name: 'Optimizar Campaña Ads', agent: 'Marketing', status: 'running', progress: 65, duration: '2m left' },
  { id: '2', title: 'Ejecutar Tests de Integración', agent: 'Developer', status: 'idle', progress: 0, duration: 'Paused' },
  { id: '3', title: 'Scraping Leads Competencia', agent: 'Sales', status: 'running', progress: 88, duration: '12s left' },
];

export default function Operations() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="p-4 rounded-xl bg-[#090a0f] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal className="w-5 h-5 text-pitaya-magenta" />
          <div>
            <h1 className="text-xl font-bold text-white">Consola de Operaciones</h1>
            <p className="text-xs text-slate-500 mt-0.5">Controla y monitorea sub-procesos en ejecución.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {operationsData.map((op) => (
          <Card key={op.id} className="bg-[#090a0f]">
            <CardHeader className="py-4 px-5 flex flex-row items-center justify-between">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-slate-500" />
                <span className="text-xs font-bold text-slate-400 font-mono">{op.agent} Agent</span>
              </div>
              <StatusBadge variant={op.status === 'running' ? 'success' : 'default'} pulse={op.status === 'running'}>
                {op.status === 'running' ? 'EJECUTANDO' : 'PAUSADO'}
              </StatusBadge>
            </CardHeader>

            <CardContent className="p-5 space-y-4">
              <h3 className="font-bold text-white text-sm">{op.name || op.title}</h3>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-[10px] font-mono text-slate-500">
                  <span>Progreso</span>
                  <span>{op.progress}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-brand-gradient rounded-full" 
                    style={{ width: `${op.progress}%` }} 
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2">
                <span className="text-[10px] text-slate-600 font-mono">ET: {op.duration}</span>
                <div className="flex gap-2">
                  {op.status === 'running' ? (
                    <button className="p-1 px-3 bg-[#10121d] rounded text-xs font-bold text-slate-300 hover:bg-[#1a1b26] transition-colors flex items-center gap-1">
                      <Square className="w-3 h-3 text-red-400 fill-red-400" /> Detener
                    </button>
                  ) : (
                    <button className="p-1 px-3 bg-[#10121d] rounded text-xs font-bold text-slate-300 hover:bg-[#1a1b26] transition-colors flex items-center gap-1">
                      <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Iniciar
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
