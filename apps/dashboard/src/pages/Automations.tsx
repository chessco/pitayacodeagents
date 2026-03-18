import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Settings, Plus, Zap, Cpu, Clock, Loader, Pause } from 'lucide-react';
import { cn } from '../utils';
import { apiClient } from '../api/client';

export default function Automations() {
  const [automationFlows, setAutomationFlows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAutomations = async () => {
    try {
      const response = await apiClient.get('/openclaw/automations');
      setAutomationFlows(Array.isArray(response) ? response : (response as any).data || []);
    } catch (error) {
      console.error('Failed to fetch automations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAutomations();
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newFlow, setNewFlow] = useState({ name: '', type: 'Cron', trigger: '', agent: '' });

  const handleCreate = async () => {
    try {
      if (!newFlow.name || !newFlow.trigger || !newFlow.agent) return;
      await apiClient.post('/openclaw/automations', newFlow);
      setIsModalOpen(false);
      setNewFlow({ name: '', type: 'Cron', trigger: '', agent: '' });
      fetchAutomations(); // Recargar
    } catch (error) {
      console.error('Failed to create automation:', error);
    }
  };

  const handleRun = async (id: string) => {
    try {
      await apiClient.post(`/openclaw/automations/${id}/run`, {});
      fetchAutomations(); // Recargar
    } catch (error) {
      console.error('Failed to run automation:', error);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'Active' ? 'Draft' : 'Active';
      await apiClient.post(`/openclaw/automations/${id}/status`, { status: newStatus });
      fetchAutomations(); // Recargar
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };
  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Automatizaciones</h1>
          <p className="text-xs text-slate-400 mt-1">Gestor de flujos autónomos y disparadores de OpenClaw.</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-pitaya-magenta hover:bg-pitaya-magenta/90 text-white text-xs font-bold shadow-[0_0_20px_rgba(226,26,101,0.25)] transition-all duration-200">
          <Plus className="w-3.5 h-3.5 stroke-[3px]" />
          Nuevo Flujo
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4">
        {loading && automationFlows.length === 0 ? (
          <div className="flex justify-center p-12 text-slate-500 gap-2 items-center">
            <Loader className="w-4 h-4 animate-spin text-cyan-400" />
            <span className="text-xs font-mono">Cargando automatizaciones...</span>
          </div>
        ) : automationFlows.length === 0 ? (
          <div className="flex justify-center p-12 text-slate-600 gap-2 items-center border border-dashed border-slate-800 rounded-xl bg-[#090a0f]/50">
            <span className="text-xs font-mono p-12">No hay flujos configurados.</span>
          </div>
        ) : (
          automationFlows.map((flow: any, index: number) => (
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
                      {flow.type ? `${flow.type}: ${flow.trigger}` : flow.trigger}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Cpu className="w-3 h-3" />
                      {flow.agent}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-6 justify-between md:justify-end">
                <div className="text-right">
                  <span className="text-[10px] text-slate-500 block">Exito</span>
                  <span className={cn(
                    "text-xs font-bold block mt-0.5",
                    !flow.successRate ? 'text-slate-600' : 'text-emerald-400'
                  )}>
                    {flow.successRate ? `${flow.successRate}%` : '---'}
                  </span>
                </div>

                <div className="text-right hidden md:block">
                  <span className="text-[10px] text-slate-500 block">Última Ejecución</span>
                  <span className="text-[10px] text-slate-300 block mt-0.5">{flow.lastRun || 'Nunca'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span onClick={() => handleToggleStatus(flow.id, flow.status)} className={cn(
                    "text-[10px] font-semibold px-2 py-0.5 rounded-full cursor-pointer",
                    flow.status === 'Active' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  )}>
                    {flow.status}
                  </span>
                  
                  <button onClick={() => handleRun(flow.id)} className="p-1.5 rounded-md bg-slate-800/50 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                  
                  <button onClick={() => handleToggleStatus(flow.id, flow.status)} className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 transition-colors">
                    {flow.status === 'Active' ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 w-full max-w-md space-y-4 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <h2 className="text-sm font-bold text-white">Crear Nuevo Flujo</h2>
            
            <div className="space-y-3">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Nombre del Flujo</label>
                <input 
                  type="text" 
                  value={newFlow.name}
                  onChange={e => setNewFlow({...newFlow, name: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/30"
                  placeholder="Ej: Sincronizador Notificaciones"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Tipo</label>
                  <select 
                    value={newFlow.type}
                    onChange={e => setNewFlow({...newFlow, type: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/30"
                  >
                    <option value="Cron">Cron</option>
                    <option value="Webhook">Webhook</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1">Disparador</label>
                  <input 
                    type="text" 
                    value={newFlow.trigger}
                    onChange={e => setNewFlow({...newFlow, trigger: e.target.value})}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/30"
                    placeholder="Ej: Cada 30 min"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] text-slate-500 block mb-1">Agente Responsable</label>
                <input 
                  type="text" 
                  value={newFlow.agent}
                  onChange={e => setNewFlow({...newFlow, agent: e.target.value})}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-500/30"
                  placeholder="Ej: Auditor Legal"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-slate-800 text-slate-400 hover:bg-slate-800 text-[11px] font-semibold transition-colors"
              >
                Cancelar
              </button>
              <button 
                onClick={handleCreate}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-[11px] font-bold shadow-[0_0_15px_rgba(6,182,212,0.25)] transition-all"
              >
                Crear Flujo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
