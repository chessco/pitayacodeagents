import { MetricCard } from '../components/ui/MetricCard';
import { ChartContainer } from '../components/ui/ChartContainer';
import AgentGraph from '../components/AgentGraph';
import ActivityFeed from '../components/ActivityFeed';
import { cn } from '../utils';

export default function Dashboard() {

  const metricsData = [
    { title: "Agentes Activos", value: "5/5", trend: "+0%", trendType: 'neutral' as const },
    { title: "Tareas Completadas", value: "1,240", trend: "+12%", trendType: 'up' as const },
    { title: "Aprobaciones Pendientes", value: "3", trend: "+2%", trendType: 'up' as const },
    { title: "Leads Generados", value: "42", trend: "-5%", trendType: 'down' as const }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Top Breadcrumb */}
      <div className="flex justify-between items-center p-4 rounded-xl border border-slate-800/10 bg-slate-900/10">
        <div className="flex items-center gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-pitaya-cyan" /> Workspace: Pitaya Pilot</div>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-1">📅 Semana 2/4</div>
        </div>
        <div className="text-xs text-slate-500 font-mono">
           CONTROL CENTER
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricsData.map((m, i) => (
          <MetricCard key={i} {...m} />
        ))}
      </div>

      {/* Center Graph & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <ChartContainer title="Gráfico de Operaciones IA" subtitle="Visualización en vivo de conexiones y tareas activas." 
             action={<span className="text-[10px] text-slate-500 font-mono">EN ESCALA</span>}
          >
            <AgentGraph />
          </ChartContainer>

          {/* Bottom Sub-Row Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {/* Chart 1: Rendimiento */}
             <ChartContainer title="Rendimiento de Campaña" subtitle="Evolución semanal.">
                <div className="h-36 flex items-end justify-around w-full px-2 mt-4">
                  {[35, 60, 45, 80, 70, 40, 30].map((h, i) => (
                    <div key={i} className="flex flex-col items-center flex-1 max-w-[30px]">
                      <div style={{ height: `${h}%` }} className="w-full bg-slate-900 border border-slate-800 rounded-t-lg group-hover:bg-slate-800 transition-all relative overflow-hidden">
                        <div style={{ height: `${h-20}%` }} className="w-full bg-pitaya-magenta/30 absolute bottom-0 rounded-t-lg"></div>
                        {i === 4 && <div className="absolute inset-0 bg-pitaya-magenta shadow-[0_0_15px_rgba(226,26,101,0.5)]" />}
                      </div>
                      <div className="text-[8px] text-slate-600 mt-1 font-mono">{['LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB', 'DOM'][i]}</div>
                    </div>
                  ))}
                </div>
             </ChartContainer>

             {/* Chart 2: Velocidad Radial */}
             <ChartContainer title="Velocidad de Tareas" subtitle="Rendimiento neto.">
                <div className="relative flex items-center justify-center h-full w-full">
                   <svg className="w-28 h-28 transform -rotate-90">
                      <circle cx="56" cy="56" r="48" stroke="#10121d" strokeWidth="8" fill="transparent" />
                      <circle cx="56" cy="56" r="48" stroke="#E21A65" strokeWidth="8" fill="transparent" strokeDasharray="301.59" strokeDashoffset="75.4" strokeLinecap="round" className="shadow-[0_0_15px_rgba(226,26,101,0.5)]" />
                   </svg>
                   <div className="absolute flex flex-col items-center">
                       <span className="text-xl font-bold font-mono text-white">8.2</span>
                       <span className="text-[7px] text-slate-500 font-bold tracking-wider">TAREAS/H</span>
                   </div>
                </div>
             </ChartContainer>
          </div>
        </div>
        
        <div className="flex flex-col gap-6">
          <ChartContainer title="Actividad Reciente">
            <ActivityFeed />
          </ChartContainer>

          {/* Estado del Sistema Panel back flush directly */}
          <div className="bg-[#090a0f] rounded-xl p-4 space-y-4">
             <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wider uppercase">ESTADO DEL SISTEMA</span>
             <div className="space-y-3">
               {[
                 { label: 'Modelos Generativos', status: 'ÓPTIMO', color: 'text-pitaya-emerald' },
                 { label: 'Almacenamiento Vectorial', status: 'ÓPTIMO', color: 'text-pitaya-emerald' }
               ].map((item, index) => (
                 <div key={index} className="space-y-1">
                    <div className="flex justify-between items-center">
                       <span className="text-xs text-slate-400 font-medium">{item.label}</span>
                       <span className={cn("text-xs font-bold", item.color)}>{item.status}</span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                       <div className="h-full bg-pitaya-emerald w-full rounded-full" />
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
