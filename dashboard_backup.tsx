import { useState, useEffect } from 'react';

export default function Dashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard title="Leads Generated" value="1,245" sub="Marketing Agent" />
        <MetricCard title="Tasks Completed" value="89" sub="Developer / Sales" />
        <MetricCard title="Pending Approvals" value="4" sub="Secretary Agent" />
        <MetricCard title="Turnaround Time" value="2.5 hrs" sub="Average Response" />
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
