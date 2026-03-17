import { ShieldCheck } from 'lucide-react';
import { ApprovalCard, RiskLevel } from '../components/ui/ApprovalCard';

const approvalsData = [
  { id: '1', title: 'Aprobar Gasto Campaña Q3', description: 'Gasto solicitado por Agente Marketing para anuncios en Meta. Total: $500 USD.', sourceAgent: 'Marketing', riskLevel: 'medium' as RiskLevel, timestamp: 'Hace 5 min' },
  { id: '2', title: 'Actualizar Configuración API', description: 'Cambio de endpoint para pasarela de pagos stripe webhook. Requiere revisión técnica.', sourceAgent: 'Developer', riskLevel: 'high' as RiskLevel, timestamp: 'Hace 1 hora' },
  { id: '3', title: 'Agendar Reunión con Acme Corp', description: 'Reunión de seguimiento de ventas. Libre de riesgos.', sourceAgent: 'Secretary', riskLevel: 'low' as RiskLevel, timestamp: 'Hace 2 horas' },
];

export default function Approvals() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="p-4 rounded-xl border border-slate-800/10 bg-slate-900/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldCheck className="w-5 h-5 text-pitaya-emerald" />
          <div>
            <h1 className="text-xl font-bold text-white">Centro de Aprobaciones</h1>
            <p className="text-xs text-slate-500 mt-0.5">Autoriza o rechaza acciones críticas de tus agentes.</p>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-mono">
           3 PENDIENTES
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvalsData.map((approval) => (
          <ApprovalCard 
            key={approval.id}
            title={approval.title}
            description={approval.description}
            sourceAgent={approval.sourceAgent}
            riskLevel={approval.riskLevel}
            timestamp={approval.timestamp}
          />
        ))}
      </div>
    </div>
  );
}
