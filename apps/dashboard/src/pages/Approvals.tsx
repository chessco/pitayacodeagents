export default function Approvals() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Approvals</h1>
      <div className="space-y-4">
        <ApprovalCard agent="Marketing" action="Send Email Campaign to 1k users" />
        <ApprovalCard agent="Developer" action="Deploy schema updates to Main" />
      </div>
    </div>
  );
}

function ApprovalCard({ agent, action }: any) {
  return (
    <div className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
      <div>
        <div className="text-sm text-slate-400">Requester: <span className="text-slate-200 font-semibold">{agent}</span></div>
        <div className="text-lg font-semibold mt-1">{action}</div>
      </div>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-slate-800 text-slate-200 rounded-lg hover:bg-slate-700">Reject</button>
        <button className="px-4 py-2 bg-teal-500 text-slate-900 font-semibold rounded-lg hover:bg-teal-400">Approve</button>
      </div>
    </div>
  );
}
