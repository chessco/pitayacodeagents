import { Settings as SettingsIcon, Shield, Sliders, Bell } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';

export default function Settings() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="p-4 rounded-xl bg-[#090a0f] flex items-center">
        <div className="flex items-center gap-3">
          <SettingsIcon className="w-5 h-5 text-slate-400" />
          <div>
            <h1 className="text-xl font-bold text-white">Configuración del Sistema</h1>
            <p className="text-xs text-slate-500 mt-0.5">Ajusta parámetros globales y accesos.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-4">
           {[
             { title: 'General', icon: Sliders, active: true },
             { title: 'Seguridad', icon: Shield, active: false },
             { title: 'Notificaciones', icon: Bell, active: false },
           ].map((item, index) => (
             <button 
               key={index} 
               className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${item.active ? 'bg-[#10121d] text-white shadow-soft' : 'text-slate-400 hover:bg-[#090a0f] hover:text-white'}`}
             >
               <item.icon className={`w-4 h-4 ${item.active ? 'text-pitaya-cyan' : 'text-slate-500'}`} />
               {item.title}
             </button>
           ))}
        </div>

        <div className="md:col-span-2">
           <Card className="bg-[#090a0f]">
             <CardHeader>
                <CardTitle className="text-sm font-bold tracking-wider text-slate-400 uppercase">PREFERENCIAS GENERALES</CardTitle>
             </CardHeader>
             <CardContent className="p-6 space-y-6">
                <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre del Workspace</label>
                   <input type="text" defaultValue="Pitaya Pilot" className="w-full bg-[#10121d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pitaya-cyan/50" />
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Intervalo de Refresco (polling)</label>
                   <select className="w-full bg-[#10121d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-pitaya-cyan/50">
                      <option>Cada 5 Segundos</option>
                      <option>Cada 10 Segundos</option>
                      <option>Cada 30 Segundos</option>
                   </select>
                </div>

                <div className="pt-4">
                   <button className="px-4 py-2 bg-brand-gradient text-white rounded-lg text-xs font-bold shadow-soft hover:shadow-[0_0_15px_rgba(226,26,101,0.3)] transition-all">
                      Guardar Cambios
                   </button>
                </div>
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}
