import { NavLink } from 'react-router-dom';
import { Home, Users, CheckSquare, ShieldCheck } from 'lucide-react';

export default function Sidebar() {
  const links = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/agents", icon: Users, label: "Agents" },
    { to: "/tasks", icon: CheckSquare, label: "Tasks" },
    { to: "/approvals", icon: ShieldCheck, label: "Approvals" },
  ];

  return (
    <div className="w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col">
      <div className="text-2xl font-bold text-teal-400 mb-8 flex items-center gap-2">
        <span className="p-2 bg-teal-500/10 rounded-lg">🐉</span>
        Pitaya Pilot
      </div>
      <nav className="space-y-2 flex-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              lex items-center gap-3 px-4 py-3 rounded-lg transition-all 
            }
          >
            <link.icon className="w-5 h-5" />
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500">
        v1.0.0 - AI Orchestrator
      </div>
    </div>
  );
}
