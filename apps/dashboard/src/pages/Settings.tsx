import { useState, useEffect } from 'react';
import { Settings as SettingsIcon, Shield, Sliders, Bell, Loader } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { apiClient } from '../api/client';

export default function Settings() {
  const [activeTab, setActiveTab] = useState('General');
  const [tenant, setTenant] = useState({ name: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiClient.get('/settings')
      .then(res => {
        if (res.data) setTenant(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to load settings:', err);
        setLoading(false);
      });
  }, []);

  const handleSave = async () => {
    try {
      await apiClient.post('/settings', { name: tenant.name });
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  };

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
             { title: 'General', icon: Sliders },
             { title: 'Seguridad', icon: Shield },
             { title: 'Notificaciones', icon: Bell },
           ].map((item, index) => (
             <button 
               key={index} 
               onClick={() => setActiveTab(item.title)}
               className={`w-full flex items-center gap-3 p-3 rounded-lg text-sm font-medium transition-colors ${activeTab === item.title ? 'bg-[#10121d] text-white shadow-soft' : 'text-slate-400 hover:bg-[#090a0f] hover:text-white'}`}
             >
               <item.icon className={`w-4 h-4 ${activeTab === item.title ? 'text-pitaya-cyan' : 'text-slate-500'}`} />
               {item.title}
             </button>
           ))}
        </div>

        <div className="md:col-span-2">
          {loading ? (
            <div className="flex justify-center p-12 text-slate-500 gap-2 items-center">
              <Loader className="w-4 h-4 animate-spin text-cyan-400" />
              <span className="text-xs font-mono">Cargando...</span>
            </div>
          ) : (
            <>
              {activeTab === 'General' && (
                <Card className="bg-[#090a0f]">
                  <CardHeader>
                     <CardTitle className="text-sm font-bold tracking-wider text-slate-400 uppercase">PREFERENCIAS GENERALES</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-6">
                     <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Nombre del Workspace</label>
                        <input 
                          type="text" 
                          value={tenant.name || ''} 
                          onChange={e => setTenant({...tenant, name: e.target.value})}
                          className="w-full bg-[#10121d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50" 
                        />
                     </div>

                     <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Intervalo de Refresco (polling)</label>
                        <select className="w-full bg-[#10121d] rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500/50">
                           <option>Cada 5 Segundos</option>
                           <option>Cada 10 Segundos</option>
                           <option>Cada 30 Segundos</option>
                        </select>
                     </div>

                     <div className="pt-4">
                        <button onClick={handleSave} className="px-4 py-2 bg-brand-gradient text-white rounded-lg text-xs font-bold shadow-soft hover:shadow-[0_0_15px_rgba(226,26,101,0.3)] transition-all">
                           Guardar Cambios
                        </button>
                     </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'Seguridad' && (
                <Card className="bg-[#090a0f]">
                  <CardHeader>
                     <CardTitle className="text-sm font-bold tracking-wider text-slate-400 uppercase">Seguridad y Accesos</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     <p className="text-xs text-slate-400">Parámetros de encriptación y control de API.</p>
                     <div className="p-4 rounded-lg bg-[#10121d] border border-slate-800 flex justify-between items-center">
                        <div>
                            <div className="text-xs font-bold text-white">Webhook Secret (OpenClaw)</div>
                            <div className="text-[10px] text-slate-500">Llave de cifrado simétrica</div>
                        </div>
                        <span className="text-xs font-mono text-slate-300">••••••••••••••••</span>
                     </div>
                  </CardContent>
                </Card>
              )}

              {activeTab === 'Notificaciones' && (
                <Card className="bg-[#090a0f]">
                  <CardHeader>
                     <CardTitle className="text-sm font-bold tracking-wider text-slate-400 uppercase">Notificaciones</CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 space-y-4">
                     {[
                       "Alertas de Tareas Fallidas",
                       "Reportes semanal de Métricas",
                       "Notificaciones de OpenClaw"
                     ].map((note, i) => (
                       <div key={i} className="flex items-center justify-between p-3 bg-[#10121d] rounded-lg">
                          <span className="text-xs text-slate-300">{note}</span>
                          <div className="w-8 h-4 bg-emerald-500/20 rounded-full relative cursor-pointer border border-emerald-500/30">
                             <div className="w-3 h-3 bg-emerald-500 rounded-full absolute top-0.5 right-0.5" />
                          </div>
                       </div>
                     ))}
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
