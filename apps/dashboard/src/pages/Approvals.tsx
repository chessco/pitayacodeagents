import { useState, useEffect } from 'react';
import { ShieldCheck, Loader } from 'lucide-react';
import { ApprovalCard, RiskLevel } from '../components/ui/ApprovalCard';
import { apiClient } from '../api/client';

export default function Approvals() {
  const [approvalsData, setApprovalsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchApprovals = async () => {
    try {
      const response = await apiClient.get('/approvals');
      setApprovalsData(Array.isArray(response) ? response : (response as any).data || []);
    } catch (error) {
      console.error('Failed to fetch approvals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApprovals();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await apiClient.post(`/approvals/${id}/approve`, {});
      fetchApprovals(); // Recargar
    } catch (error) {
      console.error('Failed to approve:', error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      await apiClient.post(`/approvals/${id}/reject`, {});
      fetchApprovals(); // Recargar
    } catch (error) {
      console.error('Failed to reject:', error);
    }
  };
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
           {approvalsData.filter(a => (a.status || 'Pending').toLowerCase() === 'pending').length} PENDIENTES
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading && approvalsData.length === 0 ? (
          <div className="col-span-3 flex justify-center p-12 text-slate-500 gap-2 items-center">
            <Loader className="w-4 h-4 animate-spin text-pitaya-magenta" />
            <span className="text-xs font-mono">Cargando aprobaciones...</span>
          </div>
        ) : approvalsData.filter(a => (a.status || 'Pending').toLowerCase() === 'pending').length === 0 ? (
          <div className="col-span-3 flex justify-center p-12 text-slate-600 gap-2 items-center border border-dashed border-slate-800 rounded-xl bg-[#090a0f]/50">
            <span className="text-xs font-mono p-12">No hay aprobaciones pendientes.</span>
          </div>
        ) : (
          approvalsData
            .filter(a => (a.status || 'Pending').toLowerCase() === 'pending')
            .map((approval) => (
            <ApprovalCard 
              key={approval.id}
              title={approval.action || approval.title || 'Aprobación Sin Título'}
              description={approval.description || 'Revisión requerida para la acción ejecutada por el agente.'}
              sourceAgent={approval.sourceAgent || approval.requesterAgentId || 'Agente'}
              riskLevel={(approval.riskLevel || approval.risk || 'low') as RiskLevel}
              timestamp={approval.timestamp || 'Reciente'}
              onApprove={() => handleApprove(approval.id)}
              onReject={() => handleReject(approval.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
