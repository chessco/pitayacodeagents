import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export default function Dashboard() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    apiClient.get('/dashboard/metrics')
      .then(setMetrics)
      .catch(console.error);
  }, []);

  const metricsData = [
    { title: "Estado del Piloto", value: "Activo", sub: "Capacidad Máxima", status: true },
    { title: "Agentes Activos", value: `${metrics?.agentsActive || 0}/5`, sub: "Capacidad máxima" },
    { title: "Tareas Completadas", value: metrics?.tasksCompleted || 0, sub: "+12% vs anterior", color: "text-emerald-400" },
    { title: "Aprobaciones", value: metrics?.pendingApprovals || 0, sub: "Pendientes", isWarning: true },
    { title: "Leads Generados", value: metrics?.leadsGenerated || 42, sub: "+18% vs anterior" }
  ];

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb */}
      <div className="flex justify-between items-center bg-slate-900/40 p-4 rounded-xl border border-slate-800/50">
        <div className="flex items-center gap-4 text-sm text-slate-400">
          <div className="flex items-center gap-1"><span className="text-teal-400">⚙️</span> Workspace: Pitaya Pilot</div>
          <span>|</span>
          <div className="flex items-center gap-1">📅 Semana 2/4</div>
        </div>
        <div className="relative">
          <input type="text" placeholder="Buscar..." className="bg-slate-800/50 border border-slate-800 rounded-lg px-4 py-1.5 text-sm w-64 focus:outline-none focus:border-teal-500/50" />
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {metricsData.map((m, i) => (
          <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl relative overflow-hidden group hover:border-slate-700 transition-all">
            <div className="text-slate-400 text-sm font-medium">{m.title}</div>
            <div className="flex items-baseline gap-2 mt-2">
              <div className={`text-3xl font-bold ${m.isWarning ? 'text-amber-400' : 'text-slate-100'}`}>
                {m.value}
              </div>
              {m.status && <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>}
            </div>
            <div className={`text-xs mt-1 ${m.color ? m.color : 'text-slate-500'}`}>{m.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Graph 1 */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-slate-400 text-sm">Tareas por tiempo</div>
              <div className="text-2xl font-bold mt-1">1,240</div>
            </div>
            <div className="text-emerald-400 text-xs font-semibold">+8% vs anterior</div>
          </div>
          {/* SVG Line Chart MOCKUP */}
          <div className="h-48 relative flex items-end">
            <svg className="w-full h-full" viewBox="0 0 400 150">
              <defs>
                <linearGradient id="glow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path d="M 0 100 Q 50 110 100 90 T 200 60 T 300 30 T 400 40 L 400 150 L 0 150 Z" fill="url(#glow)"></path>
              <path d="M 0 100 Q 50 110 100 90 T 200 60 T 300 30 T 400 40" fill="none" stroke="#f97316" strokeWidth="3" strokeLinecap="round"></path>
            </svg>
            <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-slate-500 px-2">
              <span>LUN</span><span>MAR</span><span>MIÉ</span><span>JUE</span><span>VIE</span><span>SÁB</span><span>DOM</span>
            </div>
          </div>
        </div>

        {/* Graph 2 */}
        <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
          <div className="flex justify-between items-center mb-6">
            <div>
              <div className="text-slate-400 text-sm">Rendimiento de Campaña</div>
              <div className="text-2xl font-bold mt-1">85%</div>
            </div>
            <div className="text-emerald-400 text-xs font-semibold">+5% mensual</div>
          </div>
          {/* Bar Chart Mockup */}
          <div className="h-48 flex items-end justify-around px-4">
            {[35, 60, 45, 80, 70].map((h, i) => (
              <div key={i} className="flex flex-col items-center">
                <div style={{ height: `${h}%` }} className="w-8 bg-slate-800 rounded-t-lg group-hover:bg-slate-700 transition-all relative">
                  <div style={{ height: '30%' }} className="w-full bg-teal-500/20 absolute bottom-0 rounded-t-lg"></div>
                </div>
                <div className="text-[10px] text-slate-600 mt-2">C{i+1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-slate-100">Actividad Reciente</h2>
          <button className="text-xs text-orange-400 hover:underline">Ver todo</button>
        </div>
        <div className="space-y-3">
          <ActivityItem icon="✉️" agent="Agente Ventas-AI" desc="Envió 12 correos de seguimiento a leads fríos." time="Hace 2 min" status="Completado" color="bg-emerald-500/10 text-emerald-400" />
          <ActivityItem icon="📊" agent="Agente Analista" desc="Generó reporte mensual de métricas de conversión." time="Hace 15 min" status="Completado" color="bg-emerald-500/10 text-emerald-400" />
          <ActivityItem icon="⚖️" agent="Sistema de Aprobación" desc="Nueva tarea requiere revisión manual: Campaign Q3." time="Hace 1 hora" status="Pendiente" color="bg-amber-500/10 text-amber-400" />
          <ActivityItem icon="🎧" agent="Agente Soporte-AI" desc="Resolvió 5 tickets de soporte técnico nivel 1." time="Hace 3 horas" status="Completado" color="bg-emerald-500/10 text-emerald-400" />
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value, sub }: any) { return null; } // Handled inline above

function ActivityItem({ icon, agent, desc, time, status, color }: any) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/50 border border-slate-800/50 rounded-lg hover:bg-slate-800/30 transition-all">
      <div className="flex items-center gap-4">
        <div className="p-3 bg-slate-800 rounded-xl text-xl">{icon}</div>
        <div>
          <div className="font-semibold text-slate-200">{agent}</div>
          <div className="text-xs text-slate-500">{desc}</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-[11px] text-slate-600">{time}</div>
        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium mt-1 inline-block ${color}`}>{status}</span>
      </div>
    </div>
  );
}
