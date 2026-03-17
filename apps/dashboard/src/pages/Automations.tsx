import { motion } from 'framer-motion';
import { Play, Settings, Plus, Zap, Cpu, Clock } from 'lucide-react';
import { cn } from '../utils';

const automationFlows = [
  {
    id: 'aut-001',
    name: 'Sincronizador Notificaciones TFJA',
    status: 'Active',
    trigger: 'Cron: Cada 30 min',
    targetAgent: 'Auditor Legal',
    lastRun: 'Hace 5 min',
    successRate: '98.5%',
  },
  {
    id: 'aut-002',
    name: 'Extracción Datos de PDF Contratos',
    status: 'Active',
    trigger: 'Webhook: Carga de Archivos',
    targetAgent: 'Analista de Riesgo',
    lastRun: 'Ayer, 18:30',
    successRate: '95.0%',
  },
  {
    id: 'aut-003',
    name: 'Reporte Métricas API Semanal',
    status: 'Draft',
    trigger: 'Cron: Lunes 9:00 AM',
    targetAgent: 'CEO Assistant',
    lastRun: 'Nunca',
    successRate: '---',
  },
];

export default function Automations() {
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Automatizaciones</h1>
          <p className="text-xs text-slate-400 mt-1">Gestor de flujos autónomos y disparadores de OpenClaw.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pitaya-magenta hover:bg-pitaya-magenta/90 text-white text-xs font-bold shadow-[0_0_20px_rgba(226,26,101,0.25)] transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[3px]" />
          Nuevo Flujo
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4">
        {automationFlows.map((flow: any, index: number) => (
          <motion.div
            key={flow.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative bg-slate-900/10 border border-slate-900/60 rounded-xl p-5 hover:border-slate-800 transition-all duration-200 backdrop-blur-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
            
            <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 relative">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                    {flow.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {flow.trigger}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      {flow.targetAgent}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between md:justify-end">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Exito</span>
                  <span className={cn(
                    "text-xs font-bold block mt-0.5",
                    flow.successRate === '---' ? 'text-slate-600' : 'text-emerald-400'
                  )}>
                    {flow.successRate}
                  </span>
                </div>

                <div className="text-right hidden md:block">
                  <span className="text-[10px] text-slate-500 block">Última Ejecución</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">{flow.lastRun}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full",
                    flow.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  )}>
                    {flow.status}
                  </span>
                  
                  <button className="p-1.5 rounded-md bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  
                  <button className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                    <Play className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
