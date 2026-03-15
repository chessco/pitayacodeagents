import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export default function Agents() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/agents')
      .then(data => {
        setAgents(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false); // Fallback to empty
      });
  }, []);

  const handleCreateAgent = async () => {
    try {
      const newAgent = await apiClient.post('/agents', {
        name: `Agent ${agents.length + 1}`,
        role: 'Assistant',
        skills: ['Support', 'Scheduling']
      });
      setAgents([...agents, newAgent]);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="p-8 text-slate-400">Cargando agentes activos...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestión de Agentes</h1>
          <p className="text-sm text-slate-400">Supervisa y configura el comportamiento de tus agentes de IA autónomos.</p>
        </div>
        <button 
          onClick={handleCreateAgent}
          className="px-4 py-2 bg-teal-500 text-slate-900 font-semibold rounded-lg hover:bg-teal-400 flex items-center gap-2"
        >
          <span>+</span> Nuevo Agente
        </button>
      </div>

      {agents.length === 0 ? (
        <div className="p-12 border border-dashed border-slate-800 rounded-xl text-center text-slate-400">
          No hay agentes registrados para este Workspace.
          <br /> Haz clic en "Nuevo Agente" para comenzar.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {agents.map((ag, i) => (
            <div key={ag.id || i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="font-semibold text-lg">{ag.name}</div>
                <div className="text-sm text-slate-400">{ag.role}</div>
                {ag.skills && (
                  <div className="flex gap-1 mt-2">
                    {ag.skills.slice(0, 2).map((s: string, idx: number) => (
                      <span key={idx} className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">{s}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-right">
                <span className={`inline-block px-3 py-1 text-xs rounded-full ${
                  ag.status === 'Idle' ? 'bg-slate-800 text-slate-400' : 
                  ag.status === 'Busy' ? 'bg-teal-500/10 text-teal-400' : 'bg-amber-500/10 text-amber-500'
                }`}>
                  {ag.status || 'Active'}
                </span>
                <div className="text-xs text-slate-500 mt-1">{(ag.tasksPending || 0)} tareas en cola</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
