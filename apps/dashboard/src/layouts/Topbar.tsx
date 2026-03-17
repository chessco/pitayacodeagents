import { Search, Bell, User } from 'lucide-react';

export default function Topbar() {
  return (
    <header className="h-16 border-b border-pitaya-border bg-pitaya-background flex items-center justify-between px-6 sticky top-0 z-20">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-bold text-slate-500 font-mono tracking-wider">WORKSPACE</span>
          <span className="text-sm font-bold text-white">Pitaya Pilot</span>
          <span className="px-2 py-0.5 rounded-full bg-pitaya-magenta/20 border border-pitaya-magenta/30 text-pitaya-magenta text-[9px] font-bold">
             Pilot Week 2/4
          </span>
        </div>
      </div>

      <div className="flex-1 max-w-xl mx-8 relative group">
        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-hover:text-pitaya-cyan transition-colors" />
        <div className="w-full bg-[#10111a] border border-slate-900 rounded-lg pl-10 pr-4 py-1.5 text-xs text-slate-500 flex justify-between items-center cursor-pointer hover:border-pitaya-cyan/30 transition-colors">
           <span>Buscar... (CMD+K)</span>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-slate-300 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pitaya-magenta animate-pulse" />
        </button>
        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-pitaya-surface border border-pitaya-border text-slate-300 hover:bg-pitaya-card hover:text-white transition-all">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
