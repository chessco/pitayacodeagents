export default function Agents() {
  const agents = [
    { name: "Secretary AI", role: "Secretary", status: "Idle", tasks: 0 },
    { name: "Marketing AI", role: "Marketing", status: "Busy", tasks: 3 },
    { name: "Sales AI", role: "Sales", status: "Idle", tasks: 0 },
    { name: "Dev AI", role: "Developer", status: "Busy", tasks: 5 },
    { name: "CEO AI", role: "CEO", status: "Approval Required", tasks: 1 },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Agents</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {agents.map((ag, i) => (
          <div key={i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
            <div>
              <div className="font-semibold text-lg">{ag.name}</div>
              <div className="text-sm text-slate-400">{ag.role}</div>
            </div>
            <div className="text-right">
              <span className={inline-block px-3 py-1 text-xs rounded-full }>
                {ag.status}
              </span>
              <div className="text-xs text-slate-500 mt-1">{ag.tasks} tasks active</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
