export default function Tasks() {
  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Tasks</h1>
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="border-b border-slate-800 bg-slate-950 text-slate-400 text-sm">
            <tr>
              <th className="p-4">Title</th>
              <th className="p-4">Agent</th>
              <th className="p-4">Priority</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-800 hover:bg-slate-800/30">
              <td className="p-4 font-medium">Generate 3 Ideas for Landing Page</td>
              <td className="p-4">Marketing</td>
              <td className="p-4 text-teal-400">High</td>
              <td className="p-4 text-amber-500">In Progress</td>
            </tr>
            <tr className="hover:bg-slate-800/30">
              <td className="p-4 font-medium">Design API REST for Sales CRM</td>
              <td className="p-4">Developer</td>
              <td className="p-4 text-slate-400">Medium</td>
              <td className="p-4 text-slate-400">Pending</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
