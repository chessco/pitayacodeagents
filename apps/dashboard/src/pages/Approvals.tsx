import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export default function Approvals() {
  const [approvals, setApprovals] = useState<any[]>([]);

  useEffect(() => {
    apiClient.get('/approvals').then(setApprovals).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Aprobaciones</h1>
      {approvals.length === 0 ? (
        <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center text-slate-400">
          No hay solicitudes de aprobación pendientes.
        </div>
      ) : (
        <div className="space-y-4">
          {approvals.map((app, i) => (
            <div key={app.id || i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-sm text-slate-400">Solicitante: <span className="text-slate-200 font-semibold">{app.agentRequester?.name || 'Sistema'}</span></div>
                <div className="text-lg font-semibold mt-1">{app.action}</div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700">Rechazar</button>
                <button className="px-4 py-2 bg-teal-500 text-slate-900 font-semibold rounded-lg hover:bg-teal-400">Aprobar</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
