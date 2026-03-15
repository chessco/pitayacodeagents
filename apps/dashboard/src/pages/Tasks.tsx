import { useState, useEffect } from 'react';
import { apiClient } from '../api/client';

export default function Tasks() {
  const [tasks, setTasks] = useState<any[]>([]);

  useEffect(() => {
    apiClient.get('/tasks').then(setTasks).catch(console.error);
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-8">Gestión de Tareas</h1>
      {tasks.length === 0 ? (
        <div className="p-8 border border-dashed border-slate-800 rounded-xl text-center text-slate-400">
          No hay tareas en proceso para este Workspace.
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task, i) => (
            <div key={task.id || i} className="p-6 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold">{task.title}</div>
                <div className="text-sm text-slate-400">{task.description}</div>
              </div>
              <span className={`px-3 py-1 text-xs rounded-full ${task.status === 'Completed' ? 'bg-teal-500/10 text-teal-400' : 'bg-amber-500/10 text-amber-500'}`}>
                {task.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
