import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    apiClient.get('/dashboard/metrics').then(setMetrics).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Agentes Activos" value={metrics?.agentsActive || 0} sub="Capacidad Máxima" />
        <MetricCard title="Tareas Completadas" value={metrics?.tasksCompleted || 0} sub="Volumen Histórico" />
        <MetricCard title="Aprobaciones Pendientes" value={metrics?.pendingApprovals || 0} sub="Acciones Críticas" />
        <MetricCard title="Leads Generados" value={metrics?.leadsGenerated || 0} sub="+18% mensualmente" />
      </div>
    </div>
  );
}

function MetricCard({ title, value, sub }: any) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
      <div className="text-slate-400 text-sm">{title}</div>
      <div className="text-3xl font-bold text-slate-100 mt-2">{value}</div>
      <div className="text-xs text-teal-400/80 mt-1">{sub}</div>
    </div>
  );
}
