import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, User, Flag, SlidersHorizontal, ChevronDown, X, Play, Terminal, Database } from 'lucide-react';
import { cn } from '../utils';
import { apiClient } from '../api/client';

// Mock Data strictly following the image
const tasksData = [
  { id: '1', title: 'Revisión de Métricas de Rendimiento Q1', agent: 'CEO Assistant', agentInitial: 'C', priority: 'ALTA', priorityColor: 'text-red-400 border-red-500/30 bg-red-500/5', status: 'PENDIENTE', statusStyle: 'text-slate-400 border-slate-500/30 bg-slate-500/5', date: 'Hoy' },
  { id: '2', title: 'Diseño de Interfaz UX', agent: 'Gerente Marketing', agentInitial: 'G', priority: 'MEDIA', priorityColor: 'text-amber-400 border-amber-500/30 bg-amber-500/5', status: 'COMPLETADA', statusStyle: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10', date: '10 OCT 23' },
  { id: '3', title: 'Aprobación de Presupuesto Infraestructura', agent: 'CEO Assistant', agentInitial: 'C', priority: 'ALTA', priorityColor: 'text-red-400 border-red-500/30 bg-red-500/5', status: 'PENDIENTE', statusStyle: 'text-slate-400 border-slate-500/30 bg-slate-500/5', date: 'Ayer' },
  { id: '4', title: 'Planificación de RoadMap de Producto 2026', agent: 'Director Ejecutivo', agentInitial: 'D', priority: 'MEDIA', priorityColor: 'text-amber-400 border-amber-500/30 bg-amber-500/5', status: 'PENDIENTE', statusStyle: 'text-slate-400 border-slate-500/30 bg-slate-500/5', date: '05 OCT 23' },
];

export default function Tasks() {
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState<{ time: string; text: string; type: 'info' | 'success' | 'error' }[]>([]);
  
  const activeTask = tasksData.find(t => t.id === selectedTaskId);

  useEffect(() => {
    setLogs([]);
  }, [selectedTaskId]);

  const handleExecute = async () => {
    if (!activeTask) return;
    setIsExecuting(true);
    
    const getTime = () => new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    setLogs([{ time: getTime(), text: `Preparando despacho para Task #${activeTask.id}...`, type: 'info' }]);

    try {
      setLogs((prev: any[]) => [...prev, { time: getTime(), text: `Conectando con Gateway OpenClaw...`, type: 'info' }]);
      
      const response = await apiClient.post('/openclaw/dispatch', {
        taskId: activeTask.id,
        instruction: `Comenzar procesamiento autónomo de: ${activeTask.title}`
      });

      if (response.success) {
        setLogs((prev: any[]) => [...prev, { 
          time: getTime(), 
          text: `✓ ${response.message || 'Despacho completado con éxito'}`, 
          type: 'success' 
        }]);
      } else {
        setLogs((prev: any[]) => [...prev, { 
          time: getTime(), 
          text: `❌ ${response.message || 'Error de lógica en despacho'}`, 
          type: 'error' 
        }]);
      }

    } catch (error: any) {
      setLogs((prev: any[]) => [...prev, { 
        time: getTime(), 
        text: `❌ Error: ${error.message || 'Error desconocido'}`, 
        type: 'error' 
      }]);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="flex bg-[#04060a] rounded-xl overflow-hidden min-h-screen animate-in fade-in duration-500">
      
      {/* 1. Tasks List (Left Side) */}
      <div className={cn(
        "flex-1 flex flex-col p-6 space-y-6 transition-all duration-300",
        selectedTaskId ? "max-w-[calc(100%-400px)] border-r border-slate-900/40" : "w-full"
      )}>
        
        {/* Page Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Gestión de Tareas</h1>
            <p className="text-xs text-slate-500 mt-1">Supervisión en tiempo real de flujos de trabajo autónomos.</p>
          </div>
          <button className="flex items-center gap-1 bg-white text-black font-bold text-xs px-4 py-2 rounded-full shadow-lg hover:bg-slate-100 transition-all uppercase tracking-wider">
            <Plus className="w-4 h-4" /> Nueva Tarea
          </button>
        </div>

        {/* Filter Bar */}
        <div className="flex gap-3 items-center">
           {[ { label: 'AGENTE: TODOS', icon: User }, { label: 'PRIORIDAD: ALTA', icon: Flag } ].map((pill, i) => (
             <button key={i} className="flex items-center gap-2 bg-[#101422] hover:bg-[#141a30] text-[10px] font-bold text-slate-400 p-2 px-3 rounded-lg border border-slate-800/40 transition-colors uppercase tracking-wider">
                <pill.icon className="w-3.5 h-3.5" />
                <span>{pill.label}</span>
                <ChevronDown className="w-3 h-3 text-slate-600" />
             </button>
           ))}
           <button className="ml-auto flex items-center gap-2 bg-[#101422] hover:bg-[#141a30] text-[10px] font-bold text-slate-400 p-2 px-3 rounded-lg border border-slate-800/40 transition-colors uppercase tracking-wider">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>FILTROS AVANZADOS</span>
           </button>
        </div>

        {/* Table Structure */}
        <div className="bg-[#0b0e17] rounded-xl overflow-hidden shadow-2xl border border-slate-900/40">
          <div className="grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] px-6 py-3.5 bg-[#090b14]/80 border-b border-slate-800/30 text-[9px] font-bold text-slate-500 uppercase tracking-wider">
            <div>Tarea</div><div>Agente</div><div>Prioridad</div><div>Estado</div><div>Fecha</div>
          </div>

          <div className="flex flex-col">
            {tasksData.map((task) => (
              <div 
                key={task.id} 
                onClick={() => setSelectedTaskId(task.id)}
                className={cn(
                  "grid grid-cols-[2fr_1.2fr_1fr_1fr_1fr] px-6 py-5 border-b last:border-0 border-slate-800/20 hover:bg-[#0e111d] items-center transition-colors group cursor-pointer",
                  selectedTaskId === task.id ? "bg-[#0e111d] border-l-2 border-l-pitaya-magenta" : ""
                )}
              >
                <div className="flex items-center gap-2">
                   <span className={cn("w-1.5 h-1.5 rounded-full flex-shrink-0", task.status === "COMPLETADA" ? "bg-slate-400" : "bg-pitaya-magenta shadow-[0_0_8px_rgba(226,26,101,0.6)]")} />
                   <span className="text-xs font-bold text-white tracking-wide group-hover:text-slate-100">{task.title}</span>
                </div>
                <div className="flex items-center gap-2">
                   <div className="w-5 h-5 rounded bg-cyan-900/20 text-cyan-400 border border-cyan-500/30 font-bold font-mono text-[10px] flex items-center justify-center">{task.agentInitial}</div>
                   <span className="text-[11px] font-medium text-slate-400">{task.agent}</span>
                </div>
                <div><span className={cn("text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider", task.priorityColor)}>{task.priority}</span></div>
                <div><span className={cn("inline-block text-center text-[9px] font-bold px-3 py-1 rounded-full border uppercase tracking-wider", task.statusStyle)}>{task.status}</span></div>
                <div className="text-[10px] font-mono font-medium text-slate-500">{task.date}</div>
              </div>
            ))}
          </div>

          <div className="bg-[#090b14]/60 px-6 py-4 flex items-center justify-between text-[10px] font-bold text-slate-600 uppercase tracking-wider border-t border-slate-800/30">
             <div>MUESTRA: 04 / 24 ENTIDADES</div>
             <div className="flex gap-2">
                <button className="px-3 py-1.5 rounded bg-[#090b14] border border-slate-800/40 text-[9px] text-slate-500 hover:text-white cursor-not-allowed">ANTERIOR</button>
                <button className="px-3 py-1.5 rounded bg-black text-white text-[9px] font-bold hover:bg-slate-900">SIGUIENTE</button>
             </div>
          </div>
        </div>
      </div>

      {/* 2. OpenClaw Drawer (Right Side) */}
      <AnimatePresence>
        {selectedTaskId && activeTask && (
          <motion.div 
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 400, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="w-[400px] bg-[#07090f] flex flex-col relative border-l border-slate-900/40 overflow-hidden"
          >
            <button 
              onClick={() => setSelectedTaskId(null)}
              className="absolute top-4 right-4 p-1.5 text-slate-500 hover:text-white bg-slate-900 rounded-full border border-slate-800 z-10 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="p-6 border-b border-[#11131a] bg-slate-900/10">
               <h2 className="text-lg font-bold text-white flex items-center gap-2">
                 <Terminal className="w-5 h-5 text-pitaya-magenta" /> Consola OpenClaw
               </h2>
               <p className="text-[10px] text-slate-500 mt-1">Supervisión y auditoría de ejecución autónoma.</p>
            </div>

            <div className="flex-1 p-6 space-y-5 overflow-y-auto custom-scrollbar">
              
              <div className="bg-[#0a0c14] border border-slate-900/60 rounded-xl p-4 space-y-3">
                <div className="flex justify-between items-center border-b border-slate-900/40 pb-2">
                  <span className="text-[10px] font-bold text-slate-500">TASK ID</span>
                  <span className="text-xs font-mono text-white">#TASK-{activeTask.id}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-900/40 pb-2">
                  <span className="text-[10px] font-bold text-slate-500">ESTADO</span>
                  <span className={cn("text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider", activeTask.statusStyle)}>
                     {activeTask.status}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-bold text-slate-500">EJECUCIÓN</span>
                  <span className="text-[10px] font-bold font-mono text-white">OpenClaw Gateway</span>
                </div>
              </div>

              <button 
                onClick={handleExecute}
                disabled={isExecuting}
                className={cn(
                  "w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all",
                  isExecuting ? "bg-slate-800 text-slate-500 cursor-not-allowed" : "bg-pitaya-magenta hover:bg-opacity-90 text-white shadow-[0_0_20px_rgba(226,26,101,0.2)]"
                )}
              >
                <Play className="w-4 h-4" /> {isExecuting ? 'Ejecutando...' : 'Despachar a OpenClaw'}
              </button>

              <div>
                <h3 className="text-slate-300 text-xs font-bold mb-3 flex items-center gap-2">
                   <Database className="w-4 h-4 text-pitaya-magenta" />
                   Trazas de Auditoría
                </h3>
                <div className="bg-[#04060b] border border-slate-900 border-dashed rounded-lg p-4 h-[200px] font-mono text-[10px] overflow-y-auto custom-scrollbar">
                  {logs.length > 0 ? (
                    <div className="space-y-1">
                      {logs.map((log, idx) => (
                        <div key={idx} className={cn(
                          "flex gap-1.5",
                          log.type === 'error' ? 'text-red-400' : log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'
                        )}>
                          <span className="text-slate-600">[{log.time}]</span>
                          <span>{log.text}</span>
                        </div>
                      ))}
                      {isExecuting && <p className="animate-pulse text-cyan-400 mt-1">Esperando respuesta de Gateway...</p>}
                    </div>
                  ) : (
                    <p className="text-slate-600">Ninguna ejecución disparada en esta sesión.</p>
                  )}
                </div>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
