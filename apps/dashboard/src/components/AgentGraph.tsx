import { motion } from 'framer-motion';
import { DollarSign, Megaphone, Clock, Code, Cpu, Zap, Coins } from 'lucide-react';
import { cn } from '../utils';

const agents = [
  { id: 'ceo', name: 'CEO', role: 'ESTRATEGIA', icon: Cpu, x: 50, y: 45, color: '#E21A65', isCenter: true },
  { id: 'ventas', name: 'VENTAS', role: 'LEADS', icon: DollarSign, x: 20, y: 25, color: '#00AAD2' },
  { id: 'mkt', name: 'MARKETING', role: 'CAMPAÑAS', icon: Megaphone, x: 80, y: 25, color: '#00AAD2' },
  { id: 'sec', name: 'SEC.', role: 'AGENTDA', icon: Clock, x: 20, y: 65, color: '#00AAD2' },
  { id: 'dev', name: 'DEV', role: 'CÓDIGO', icon: Code, x: 80, y: 65, color: '#00AAD2' },
];

export default function AgentGraph() {
  return (
    <div className="relative w-full h-[400px] bg-[#07080a] rounded-xl flex flex-col justify-between overflow-hidden group">
      
      {/* 1. Tech Radar Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#1a1b26_1px,transparent_1px)] [background-size:16px_16px] opacity-30"></div>
      
      <div className="relative flex-1">
        {/* 2. Concentric Radar Rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
           <div className="w-[150px] h-[150px] rounded-full border border-pitaya-magenta/5 animate-ping duration-[3s]" />
           <div className="w-[300px] h-[300px] rounded-full border border-slate-800/20" />
           <div className="w-[450px] h-[450px] rounded-full border border-slate-800/10" />
        </div>

        {/* SVG Connections background with ANIMATION */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {agents.filter(a => !a.isCenter).map((agent, i) => (
            <motion.line 
              key={i}
              x1={`${agents[0].x}%`} y1={`${agents[0].y}%`} 
              x2={`${agent.x}%`} y2={`${agent.y}%`} 
              stroke={agent.id === 'mkt' || agent.id === 'dev' ? 'rgba(226, 26, 101, 0.4)' : 'rgba(0, 170, 210, 0.4)'} 
              strokeWidth="1.5"
              strokeDasharray="4 4"
              animate={{ strokeDashoffset: [0, -20] }}
              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            />
          ))}
        </svg>

        {/* Nodes map */}
        {agents.map((agent) => (
          <motion.div
            key={agent.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group"
            style={{ left: `${agent.x}%`, top: `${agent.y}%` }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
               {/* Outer ring glows - neon effect */}
               <div className={cn(
                 "absolute rounded-xl blur-lg transition-all duration-300",
                 agent.isCenter 
                   ? "inset-[-10px] bg-pitaya-magenta/30 shadow-[0_0_40px_rgba(226,26,101,0.6)]" 
                   : "inset-[-4px] bg-pitaya-cyan/20 blur-md"
               )} />
               
               <div className={cn(
                 "relative w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-300 shadow-lg",
                 agent.isCenter 
                   ? "bg-pitaya-magenta border-pitaya-magenta/50 text-white shadow-[0_0_20px_rgba(226,26,101,0.3)]" 
                   : "bg-[#0c0e16] border-slate-800 text-slate-400 group-hover:border-slate-700"
               )}>
                 <agent.icon className={cn("w-5 h-5", agent.isCenter ? "text-white" : "group-hover:text-pitaya-cyan")} />
               </div>
            </div>
            <span className={cn(
               "text-[9px] font-bold mt-1 tracking-wider",
               agent.isCenter ? "text-pitaya-magenta" : "text-slate-400"
            )}>{agent.name}</span>
          </motion.div>
        ))}
      </div>

      {/* Bottom Mini Metrics bar matching mockup */}
      <div className="flex items-center justify-center gap-4 pt-4 border-t border-slate-900/50">
         {[
           { label: 'LATENCIA', value: '12ms', icon: Zap, color: 'text-pitaya-emerald bg-pitaya-emerald/10 border-pitaya-emerald/30' },
           { label: 'CARGA IA', value: '24%', icon: Cpu, color: 'text-pitaya-magenta bg-pitaya-magenta/10 border-pitaya-magenta/30' },
           { label: 'TOKENS / MIN', value: '8.4k', icon: Coins, color: 'text-amber-500 bg-amber-500/10 border-amber-500/30' },
         ].map((stat, i) => (
           <div key={i} className="flex items-center gap-2 bg-[#0d0e14] border border-slate-900 p-1.5 px-3 rounded-xl min-w-[100px]">
              <div className={cn("p-1 rounded-lg border", stat.color)}>
                 <stat.icon className="w-3 h-3" />
              </div>
              <div>
                 <p className="text-[7px] text-slate-500 font-bold tracking-wider">{stat.label}</p>
                 <p className="text-xs font-bold text-white font-mono">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

    </div>
  );
}
