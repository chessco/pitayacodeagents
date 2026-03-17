import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Terminal, CheckSquare, ShieldCheck, Activity, Settings, Plus } from 'lucide-react';
import { cn } from '../utils';

const navigation = [
  { name: 'Panel', to: '/', icon: LayoutDashboard },
  { name: 'Agentes', to: '/agents', icon: Users },
  { name: 'Operaciones', to: '/operations', icon: Terminal },
  { name: 'Tareas', to: '/tasks', icon: CheckSquare },
  { name: 'Aprobaciones', to: '/approvals', icon: ShieldCheck },
  { name: 'Métricas', to: '/metrics', icon: Activity },
  { name: 'Automatizaciones', to: '/automations', icon: Terminal },
  { name: 'Configuración', to: '/settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="w-64 border-r border-slate-900 bg-[#07080a] flex flex-col h-full flex-shrink-0 z-30">
      <div className="h-16 flex items-center px-6 border-b border-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-brand-gradient flex items-center justify-center shadow-[0_0_15px_rgba(226,26,101,0.4)]">
             <div className="w-full h-full rounded-full bg-[#07080a] flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
             </div>
          </div>
          <div>
            <span className="font-bold text-sm text-white block">Pitaya Pilot</span>
            <span className="text-[10px] text-slate-500 block -mt-0.5">Mission Control</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto w-full p-4 space-y-1.5 mt-2 custom-scrollbar">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-200 group w-full",
              isActive 
                ? "bg-pitaya-magenta/20 text-white shadow-[0_0_10px_rgba(226,26,101,0.15)]" 
                : "text-slate-400 hover:bg-slate-900/40 hover:text-white"
            )}
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn(
                  "w-4 h-4",
                  isActive ? "text-pitaya-magenta" : "text-slate-500 group-hover:text-pitaya-magenta"
                )} />
                {item.name}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="p-4 border-t border-slate-900/50 bg-[#07080a]">
         <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-pitaya-magenta hover:bg-pitaya-magenta/90 text-white text-xs font-bold shadow-[0_0_15px_rgba(226,26,101,0.3)] transition-all">
            <Plus className="w-3.5 h-3.5 stroke-[3px]" />
            Nuevo Agente
         </button>
      </div>
    </aside>
  );
}
