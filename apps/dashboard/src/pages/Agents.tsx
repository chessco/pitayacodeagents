import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Mail, TrendingUp, DollarSign, Code, Briefcase, Cpu, Zap, Brain, X, Database } from 'lucide-react';
import { AgentCard } from '../components/ui/AgentCard';
import { cn } from '../utils';

const agentsData = [
  { id: 'ceo', name: 'Director Ejecutivo', role: 'CEO Agent', icon: Briefcase, status: 'active' as const, tasks: 12, memory: '85%', color: '#E21A65', skills: ["Planning", "FinanceReview", "ExecutiveDashboard"], channels: ["webchat", "SITE"], purpose: "Definir la visión estratégica, priorización de iniciativas y supervisión de KPIs globales." },
  { id: 'sec', name: 'Secretario Ejecutivo', role: 'Secretary Agent', icon: Mail, status: 'idle' as const, tasks: 0, memory: '42%', color: '#00AAD2', skills: ["Auditoría", "Gestión de Usuarios", "Notificaciones"], permissions: ["Aprobación de acciones", "Acceso Logs", "Gestionar Políticas"], purpose: "Gobernar la operativa de los agentes, aprobar acciones externas y gestionar auditoría de logs." },
  { id: 'mkt', name: 'Gerente Marketing', role: 'Marketing Agent', icon: TrendingUp, status: 'active' as const, tasks: 45, memory: '92%', color: '#00B285', skills: ["CMS", "Email", "Analytics"], channels: ["webchat", "SITE"], purpose: "Crear y ejecutar campañas, generar contenidos, landing pages y analizar rendimiento de CTR y CPL." },
  { id: 'dev', name: 'Ingeniero Soft', role: 'Developer Agent', icon: Code, status: 'warning' as const, tasks: 3, memory: '98%', color: '#F59E0B', skills: ["Repos", "CI/CD", "Testing"], channels: ["webchat", "SITE"], purpose: "Implementación de features frontend/backend, tareas de desarrollo y soporte técnico automatizado." },
  { id: 'sal', name: 'Asesor Ventas', role: 'Sales Agent', icon: DollarSign, status: 'active' as const, tasks: 28, memory: '60%', color: '#00AAD2', skills: ["CRM", "Email", "Analytics"], channels: ["webchat", "email"], purpose: "Gestión de leads, pipeline de ventas, propuestas y seguimiento con clientes en tiempo real." },
];

export default function Agents() {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const activeAgent = agentsData.find(a => a.id === selectedAgent);

  return (
    <div className="flex bg-[#07080a] rounded-xl overflow-hidden min-h-[600px] animate-in fade-in duration-500">
      
      {/* Agents List (Left Side) */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300",
        selectedAgent ? "max-w-[380px] border-r border-[#11131a]" : "w-full"
      )}>
        <div className="p-6 border-b border-[#11131a] bg-slate-900/10">
          <h1 className="text-xl font-bold text-white flex items-center gap-3">
            <Users className="w-5 h-5 text-pitaya-cyan" />
            Directorio de Agentes
          </h1>
          <p className="text-xs text-slate-500 mt-1">Supervisa y configura tu fuerza laboral digital.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 bg-slate-950/20 grid grid-cols-1 gap-6 custom-scrollbar">
          <div className={cn(
            "grid gap-4",
            selectedAgent ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          )}>
            {agentsData.map((agent) => (
              <div key={agent.id} className="cursor-pointer" onClick={() => setSelectedAgent(agent.id)}>
                <AgentCard 
                   name={agent.name} 
                   role={agent.role} 
                   icon={agent.icon} 
                   status={agent.status} 
                   activeTasks={agent.tasks}
                   highlightColor={agent.color}
                   className={selectedAgent === agent.id ? "border-slate-700 shadow-glow bg-slate-900/40" : ""}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Agent Detail Panel (Right Side) */}
      <AnimatePresence>
        {selectedAgent && activeAgent && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="flex-1 bg-slate-900/20 flex flex-col relative overflow-hidden"
          >
            <button 
              onClick={() => setSelectedAgent(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-white bg-slate-900 rounded-full border border-slate-800 z-10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="p-8 border-b border-[#11131a] bg-slate-900/30 relative overflow-hidden">
               {/* Ambient side glow using Emerald Crest approx */}
               <div className="absolute top-0 right-0 w-64 h-64 bg-pitaya-emerald/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
               
               <div className="flex items-center gap-5 relative z-10">
                 <div className="w-14 h-14 rounded-xl bg-slate-950 flex items-center justify-center">
                   <activeAgent.icon className="w-7 h-7" style={{ color: activeAgent.color }} />
                 </div>
                 <div>
                   <h2 className="text-xl font-bold text-white">{activeAgent.name}</h2>
                   <p className="text-xs text-slate-400 font-medium">{activeAgent.role}</p>
                 </div>
               </div>
            </div>

            <div className="flex-1 p-6 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#090a0f] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Zap className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Tareas Hoy</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{activeAgent.tasks}</p>
                </div>
                <div className="bg-[#090a0f] rounded-xl p-4">
                  <div className="flex items-center gap-2 text-slate-500 mb-1">
                    <Brain className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Memoria Uso</span>
                  </div>
                  <p className="text-2xl font-bold text-white">{activeAgent.memory}</p>
                </div>
              </div>

              <div>
                <h3 className="text-slate-300 text-xs font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-pitaya-cyan" />
                  Herramientas Configuradas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(activeAgent.skills || []).map((skill, i) => (
                     <span key={i} className="px-2.5 py-1 bg-[#10121d] rounded-lg text-[10px] font-medium text-slate-400">
                       {skill}
                     </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-slate-300 text-xs font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-pitaya-magenta" />
                  {activeAgent.id === 'sec' ? 'Permisos Especiales' : 'Canales de Acceso'}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {((activeAgent.id === 'sec' ? (activeAgent as any).permissions : (activeAgent as any).channels) || []).map((item: string, i: number) => (
                     <span key={i} className="px-2.5 py-1 bg-slate-900/40 rounded-lg text-[10px] font-medium text-slate-400 border border-slate-800/30">
                       {item}
                     </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-slate-300 text-xs font-bold mb-3 flex items-center gap-2">
                   <Database className="w-4 h-4 text-pitaya-magenta" />
                   Propósito del Rol
                </h3>
                <div className="bg-[#10121d] rounded-lg p-4">
                   <p className="text-slate-300 text-[11px] leading-relaxed font-medium">
                     {(activeAgent as any).purpose}
                   </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
