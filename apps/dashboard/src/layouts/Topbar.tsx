import { useState, useEffect } from 'react';
import { Search, Bell, User } from 'lucide-react';

export default function Topbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-notifications', handleOpen);
    return () => window.removeEventListener('open-notifications', handleOpen);
  }, []);

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
        <div className="relative">
          <button onClick={() => setIsOpen(!isOpen)} className="relative text-slate-300 hover:text-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-pitaya-magenta animate-pulse" />
          </button>

          {isOpen && (
            <div className="absolute top-10 right-0 bg-[#090a0f] border border-slate-800 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.8)] w-64 p-4 z-50 animate-in fade-in slide-in-from-top-1 duration-200">
               <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-2">Notificaciones</h3>
               <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar">
                  {[
                    { text: 'Campaña Marketing iniciada', time: 'Hace 5min' },
                    { text: 'Nuevo Gasto por aprobar', time: 'Hace 10min' },
                    { text: 'Flujo TFJA completado', time: 'Hace 1h' }
                  ].map((note, i) => (
                    <div key={i} className="p-2 rounded-lg bg-[#10111a] hover:bg-[#141622] border border-slate-900 cursor-pointer transition-colors">
                       <p className="text-xs text-slate-300">{note.text}</p>
                       <p className="text-[9px] text-slate-600 mt-0.5">{note.time}</p>
                    </div>
                  ))}
               </div>
            </div>
          )}
        </div>

        <button className="flex items-center justify-center w-8 h-8 rounded-full bg-pitaya-surface border border-pitaya-border text-slate-300 hover:bg-pitaya-card hover:text-white transition-all">
          <User className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
