import { motion } from 'framer-motion';
import { Zap, Cpu, Coins, CheckCircle2, ArrowUpRight, Shield } from 'lucide-react';
import { cn } from '../utils';

// Mock Data for Charts & Stats
const kpiStats = [
  { label: 'LATENCIA IA', value: '12ms', change: '-4%', trend: 'good', icon: Zap, color: 'text-pitaya-emerald bg-pitaya-emerald/10 border-pitaya-emerald/30' },
  { label: 'CARGA NÚCLEO', value: '24.8%', change: '+1.2%', trend: 'neutral', icon: Cpu, color: 'text-pitaya-magenta bg-pitaya-magenta/10 border-pitaya-magenta/30' },
  { label: 'TOKENS / MIN', value: '8.4k', change: '+18%', trend: 'good', icon: Coins, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
  { label: 'TASA ÉXITO', value: '98.5%', change: '+0.5%', trend: 'good', icon: CheckCircle2, color: 'text-pitaya-cyan bg-pitaya-cyan/10 border-pitaya-cyan/30' },
];

const agentPerformance = [
  { name: 'Director Ejecutivo', tasks: 142, efficiency: 95, color: 'from-[#E21A65] to-[#E21A65]/40' },
  { name: 'Gerente Marketing', tasks: 89, efficiency: 88, color: 'from-[#00AAD2] to-[#00AAD2]/40' },
  { name: 'Ingeniero Software', tasks: 214, efficiency: 92, color: 'from-[#00B285] to-[#00B285]/40' },
  { name: 'Secretario Automat.', tasks: 312, efficiency: 99, color: 'from-amber-500 to-amber-500/40' },
];

const chartData = [15, 22, 18, 25, 30, 28, 42, 38, 55, 48, 62, 58, 70, 65, 82];

export default function Metrics() {
  // Generate SVG Path for linear chart
  const createPath = () => {
    return chartData.map((val, i) => {
      const x = (i / (chartData.length - 1)) * 100;
      const y = 100 - val;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const createAreaPath = () => {
    const mainPath = createPath();
    return `${mainPath} L 100 100 L 0 100 Z`;
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Métricas de Rendimiento</h1>
          <p className="text-xs text-slate-500 mt-1">Supervisión en tiempo real del flujo de tokens y carga cognitiva.</p>
        </div>
        <div className="flex items-center gap-2 bg-[#0a0c13] border border-slate-900 px-3 py-1.5 rounded-xl text-[10px] font-bold text-slate-400">
           <span className="w-1.5 h-1.5 rounded-full bg-pitaya-emerald animate-pulse"></span>
           SISTEMA OPERATIVO
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0a0c13] border border-slate-900 p-5 rounded-2xl flex items-center justify-between group hover:border-slate-800/60 transition-all duration-300 shadow-lg"
          >
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 tracking-wider uppercase">{stat.label}</span>
              <p className="text-2xl font-bold text-white font-mono tracking-tight">{stat.value}</p>
              <div className="flex items-center gap-1 mt-1">
                 <ArrowUpRight className={cn("w-3 h-3", stat.trend === 'good' ? 'text-pitaya-emerald' : 'text-slate-400')} />
                 <span className={cn("text-[10px] font-bold font-mono", stat.trend === 'good' ? 'text-pitaya-emerald' : 'text-slate-400')}>{stat.change}</span>
              </div>
            </div>
            <div className={cn("p-3 rounded-2xl border flex items-center justify-center transition-transform group-hover:scale-105 duration-300", stat.color)}>
              <stat.icon className="w-6 h-6" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         
         {/* Main Chart (Consumo) */}
         <div className="lg:col-span-2 bg-[#0a0c13] border border-slate-900 rounded-2xl p-6 space-y-4">
            <div className="flex justify-between items-center">
               <div>
                  <h3 className="text-sm font-bold text-white">Consumo de Tráfico IA</h3>
                  <p className="text-[10px] text-slate-500">Carga proyectada vs consumo real de tokens.</p>
               </div>
               <div className="flex gap-2">
                  <span className="px-2 py-1 rounded bg-[#0d0e14] border border-slate-900 text-[8px] font-bold text-slate-400">24H</span>
                  <span className="px-2 py-1 rounded bg-pitaya-magenta/10 border border-pitaya-magenta/30 text-[8px] font-bold text-pitaya-magenta">REAL-TIME</span>
               </div>
            </div>

            <div className="relative h-64 mt-4 w-full">
               <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  {[0, 25, 50, 75, 100].map((g) => (
                     <line key={g} x1="0" y1={g} x2="100" y2={g} stroke="#1A1D30" strokeWidth="0.5" strokeDasharray="2 2" />
                  ))}
                  
                  {/* Area fill */}
                  <motion.path 
                     d={createAreaPath()} 
                     fill="url(#gradient-area)" 
                     opacity="0.15"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                  />
                  
                  {/* Line Path */}
                  <motion.path 
                     d={createPath()} 
                     fill="none" 
                     stroke="url(#gradient-line)" 
                     strokeWidth="2"
                     initial={{ pathLength: 0 }}
                     animate={{ pathLength: 1 }}
                     transition={{ duration: 1.5, ease: "easeOut" }}
                  />

                  {/* Gradients */}
                  <defs>
                     <linearGradient id="gradient-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#00AAD2" />
                        <stop offset="50%" stopColor="#E21A65" />
                        <stop offset="100%" stopColor="#00B285" />
                     </linearGradient>
                     <linearGradient id="gradient-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#E21A65" />
                        <stop offset="100%" stopColor="#E21A65" stopOpacity="0" />
                     </linearGradient>
                  </defs>
               </svg>
            </div>
         </div>

         {/* Agent Efficiency */}
         <div className="bg-[#0a0c13] border border-slate-900 rounded-2xl p-6 space-y-5">
            <div>
               <h3 className="text-sm font-bold text-white">Rendimiento por Agente</h3>
               <p className="text-[10px] text-slate-500">Efectividad y volumen de operaciones.</p>
            </div>

            <div className="space-y-4">
               {agentPerformance.map((agent, i) => (
                  <div key={i} className="space-y-1.5">
                     <div className="flex justify-between items-center text-[10px] font-bold">
                        <span className="text-slate-300">{agent.name}</span>
                        <div className="flex gap-2 text-slate-500 font-mono">
                           <span>{agent.tasks} Tareas</span>
                           <span className="text-white">{agent.efficiency}%</span>
                        </div>
                     </div>
                     <div className="h-2 bg-slate-900/60 rounded-full overflow-hidden border border-slate-900/40">
                        <motion.div 
                           className={cn("h-full bg-gradient-to-r rounded-full", agent.color)}
                           initial={{ width: 0 }}
                           animate={{ width: `${agent.efficiency}%` }}
                           transition={{ duration: 1, delay: i * 0.15 }}
                        />
                     </div>
                  </div>
               ))}
            </div>
         </div>

      </div>

      {/* Bottom Activity/System Log */}
      <div className="bg-[#0a0c13] border border-slate-900 rounded-2xl p-5 space-y-3">
         <div className="flex justify-between items-center border-b border-slate-900 pb-3">
            <h3 className="text-xs font-bold text-white flex items-center gap-2">
               <Shield className="w-3.5 h-3.5 text-pitaya-magenta" /> Seguridad y Auditoría de Sistema
            </h3>
            <span className="text-[9px] font-bold font-mono text-slate-500">ÚLTIMOS 5 EVENTOS</span>
         </div>
         <div className="space-y-2 font-mono text-[10px] text-slate-400">
            <p><span className="text-slate-600">[08:35:12]</span> {"->"} <span className="text-pitaya-emerald">SYS-OK</span>: Núcleo de dispatch OpenClaw operativo.</p>
            <p><span className="text-slate-600">[08:35:10]</span> {"->"} <span className="text-pitaya-cyan">INFO</span>: Conexión WebSocket re-establecida con Agente DEV.</p>
            <p><span className="text-slate-600">[08:34:45]</span> {"->"} <span className="text-amber-500">WARN</span>: Incremento de latencia en Gateway (15ms max).</p>
         </div>
      </div>

    </div>
  );
}
