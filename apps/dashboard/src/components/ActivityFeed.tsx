import { ActivityItem, ActivityType } from './ui/ActivityItem';

type Event = {
  id: string;
  type: ActivityType;
  message: React.ReactNode;
  agent: string;
  timestamp: string;
  actions?: React.ReactNode;
};

const events: Event[] = [
  { id: '1', type: 'action', message: <>completó <span className="font-bold">investigación de prospectos</span>.</>, agent: 'Ventas', timestamp: 'Hace 2 mins' },
  { 
    id: '2', 
    type: 'approval', 
    message: <>Se requiere <span className="text-amber-500 font-bold">aprobación</span> para campaña de email Marketing.</>, 
    agent: 'Marketing', 
    timestamp: 'Hace 15 mins',
    actions: (
      <>
        <button className="px-2 py-0.5 rounded bg-pitaya-magenta text-white text-[9px] font-bold hover:bg-pitaya-magenta/80 transition-colors">Revisar</button>
        <button className="px-2 py-0.5 rounded bg-slate-800 text-slate-400 border border-slate-700 text-[9px] hover:bg-slate-700 transition-colors">Ignorar</button>
      </>
    )
  },
  { id: '3', type: 'system', message: <>agendó <span className="font-bold">3 reuniones</span> nuevas.</>, agent: 'Secretary', timestamp: 'Hace 1 hora' },
  { id: '4', type: 'action', message: <>actualizó el reporte <span className="font-bold">semanal</span>.</>, agent: 'CEO', timestamp: 'Hace 3 horas' },
  { id: '5', type: 'system', message: 'Backup de sistema completado exitosamente.', agent: 'System', timestamp: 'Hace 5 horas' },
];

export default function ActivityFeed() {
  return (
    <div className="flex flex-col h-full bg-slate-900/10">
      
      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {events.map((event, index) => (
          <ActivityItem 
            key={event.id}
            type={event.type}
            message={event.message}
            agent={event.agent}
            timestamp={event.timestamp}
            isLast={index === events.length - 1}
            actions={event.actions}
          />
        ))}
        
        <div className="pt-4 border-t border-slate-900/50 mt-4">
           <button className="w-full py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 text-xs font-bold font-mono hover:text-white transition-colors">
              VER HISTORIAL COMPLETO
           </button>
        </div>
      </div>
    </div>
  );
}
