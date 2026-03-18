import { useState, useEffect } from 'react';
import { Terminal, Cpu, Play, Square, Loader } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { apiClient } from '../api/client';

export default function Operations() {
  const [operationsData, setOperationsData] = useState<any[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ agentId: '', instruction: '' });

  useEffect(() => {
    // Cargar agentes
    apiClient.get('/agents')
      .then(res => {
        const data = Array.isArray(res) ? res : (res as any).data || [];
        setAgents(data);
        if (data.length > 0) {
          setFormData(prev => ({ ...prev, agentId: data[0].role }));
        }
      })
      .catch(console.error);
  }, []);

  const fetchOperations = async () => {
    try {
      const response = await apiClient.get('/openclaw/operations');
      setOperationsData(Array.isArray(response) ? response : (response as any).data || []);
    } catch (error) {
      console.error('Failed to fetch operations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOperations();
    const interval = setInterval(fetchOperations, 10000); // Polling cada 10s
    return () => clearInterval(interval);
  }, []);

  const handleResume = async (op: any) => {
    try {
      await apiClient.post('/openclaw/resume', {
        sessionKey: op.sessionKey,
        agent: op.agent,
        message: 'Reanudar procesamiento autónomo'
      });
      // Refrescar inmediatamente
      const response = await apiClient.get('/openclaw/operations');
      setOperationsData(Array.isArray(response) ? response : (response as any).data || []);
    } catch (error) {
      console.error('Failed to resume operation:', error);
    }
  };

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

        <button onClick={() => setIsModalOpen(true)} className="px-3 py-1.5 bg-brand-gradient text-white rounded-lg text-xs font-bold shadow-soft flex items-center gap-1 hover:shadow-[0_0_15px_rgba(226,26,101,0.3)] transition-all">
           <Play className="w-3 h-3 fill-white" /> Lanzar Operación
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {loading && operationsData.length === 0 ? (
          <div className="col-span-2 flex justify-center p-12 text-slate-500 gap-2 items-center">
            <Loader className="w-4 h-4 animate-spin text-pitaya-magenta" />
            <span className="text-xs font-mono">Cargando operaciones activas...</span>
          </div>
        ) : operationsData.length === 0 ? (
          <div className="col-span-2 flex justify-center p-12 text-slate-600 gap-2 items-center border border-dashed border-slate-800 rounded-xl bg-[#090a0f]/50">
            <span className="text-xs font-mono p-12">No hay sub-procesos activos en este momento.</span>
          </div>
        ) : (
          operationsData.map((op) => (
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
                    <button onClick={() => handleResume(op)} className="p-1 px-3 bg-[#10121d] rounded text-xs font-bold text-slate-300 hover:bg-[#1a1b26] transition-colors flex items-center gap-1">
                      <Play className="w-3 h-3 text-emerald-400 fill-emerald-400" /> Iniciar
                    </button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
           <div className="bg-[#090a0f] border border-slate-800 rounded-xl p-6 w-full max-w-md shadow-2xl relative">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Lanzar Operación Autónoma</h2>
              <div className="space-y-4">
                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Agente</label>
                    <select 
                      value={formData.agentId} 
                      onChange={e => setFormData({...formData, agentId: e.target.value})}
                      className="w-full bg-[#10121d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50"
                    >
                       {agents.map(a => (
                         <option key={a.id} value={a.role.toLowerCase()}>{a.name} ({a.role})</option>
                       ))}
                       {agents.length === 0 && <option value="">Sin agentes disponibles</option>}
                    </select>
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Instrucciones / Campaña</label>
                    <textarea 
                      value={formData.instruction}
                      onChange={e => setFormData({...formData, instruction: e.target.value})}
                      rows={3}
                      placeholder="Ej: Crear campaña en Linkedin para leads legal-tech..."
                      className="w-full bg-[#10121d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50 resize-none"
                    />
                 </div>

                 <div className="flex justify-end gap-2 pt-2">
                    <button onClick={() => setIsModalOpen(false)} className="px-3 py-1.5 rounded-lg text-xs font-bold text-slate-400 hover:bg-[#10121d] transition-colors">
                       Cancelar
                    </button>
                    <button 
                      onClick={async () => {
                         try {
                             await apiClient.post('/openclaw/dispatch', { taskId: 'new', ...formData });
                             setIsModalOpen(false);
                             setFormData({ agentId: 'marketing', instruction: '' });
                             fetchOperations();
                         } catch (err) { console.error(err); }
                      }}
                      className="px-3 py-1.5 bg-brand-gradient text-white rounded-lg text-xs font-bold"
                    >
                       Ejecutar
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
