import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Command, Zap, CheckSquare, Bell, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const actions = [
    { icon: Zap, label: 'Lanzar Campaña Marketing', category: 'Acciones', path: '/operations' },
    { icon: CheckSquare, label: 'Aprobar Gasto Publicitario', category: 'Aprobaciones', path: '/approvals' },
    { icon: Bell, label: 'Ver Notificaciones Recientes', category: 'Sistema', path: 'open-notifications' },
    { icon: User, label: 'Configurar Perfil Administrador', category: 'Ajustes', path: '/settings' },
  ];

  const handleSelect = (path: string) => {
    if (path === 'open-notifications') {
      window.dispatchEvent(new Event('open-notifications'));
    } else {
      navigate(path);
    }
    setIsOpen(false);
    setQuery('');
  };

  const filtered = actions.filter(action => 
    action.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        setSelectedIndex(0);
      }
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      }
      if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedIndex]) {
          handleSelect(filtered[selectedIndex].path);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filtered, selectedIndex]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="bg-pitaya-card border border-pitaya-border w-full max-w-xl rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
          >
            {/* Glow Effect Top border */}
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-brand-gradient" />

            <div className="flex items-center px-4 py-3 border-b border-pitaya-border bg-pitaya-surface/50">
              <Search className="w-5 h-5 text-slate-400 mr-3" />
              <input 
                type="text"
                placeholder="Escribe un comando o busca..."
                className="flex-1 bg-transparent border-none outline-none text-white text-sm placeholder:text-slate-500"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <kbd className="flex items-center gap-1 text-[10px] font-mono bg-slate-800 border border-slate-700 px-1.5 py-0.5 rounded text-slate-400">
                <Command className="w-3 h-3" />
                <span>K</span>
              </kbd>
            </div>

            <div className="max-h-[300px] overflow-y-auto p-2 space-y-2 custom-scrollbar">
              {filtered.length > 0 ? (
                filtered.map((action, idx) => (
                  <button 
                    key={idx}
                    onClick={() => handleSelect(action.path)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-colors group ${idx === selectedIndex ? 'bg-pitaya-surface text-white' : 'text-slate-300 hover:bg-pitaya-surface/50'}`}
                  >
                    <div className={`w-8 h-8 rounded-lg bg-slate-800 border flex items-center justify-center transition-colors ${idx === selectedIndex ? 'border-pitaya-cyan' : 'border-slate-700'}`}>
                      <action.icon className={`w-4 h-4 transition-colors ${idx === selectedIndex ? 'text-pitaya-magenta' : 'text-slate-400'}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{action.label}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">{action.category}</p>
                    </div>
                    <span className={`text-xs font-mono transition-opacity ${idx === selectedIndex ? 'opacity-100 text-slate-400' : 'opacity-0'}`}>⏎</span>
                  </button>
                ))
              ) : (
                <div className="p-4 text-center text-slate-500 text-sm">No se encontraron resultados.</div>
              )}
            </div>
            
            <div className="px-4 py-2 border-t border-pitaya-border/50 bg-pitaya-surface/30 flex justify-end">
              <span className="text-[10px] text-slate-500">Usa las flechas para navegar, Enter para seleccionar</span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
