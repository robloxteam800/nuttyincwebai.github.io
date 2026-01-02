
import React from 'react';
import { WebsiteData } from '../types';

interface CodePanelProps {
  data: WebsiteData;
  isOpen: boolean;
  onToggle: () => void;
}

const CodePanel: React.FC<CodePanelProps> = ({ data, isOpen, onToggle }) => {
  if (!isOpen) {
    return (
      <button 
        onClick={onToggle}
        className="h-full w-10 border-r border-slate-200 bg-slate-50 flex items-center justify-center hover:bg-slate-100 transition-colors group"
      >
        <div className="rotate-90 text-[10px] font-black text-slate-400 group-hover:text-indigo-600 uppercase tracking-[0.3em] whitespace-nowrap">
          View Schema
        </div>
      </button>
    );
  }

  return (
    <div className="w-[400px] h-full border-r border-slate-200 bg-[#1e1e1e] flex flex-col shadow-inner relative overflow-hidden">
      <div className="p-4 border-b border-white/10 bg-[#252525] flex items-center justify-between">
        <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <i className="fa-solid fa-code text-indigo-400"></i>
          Blueprint JSON
        </h3>
        <button onClick={onToggle} className="text-slate-500 hover:text-white transition-colors">
          <i className="fa-solid fa-angles-left"></i>
        </button>
      </div>
      <div className="flex-1 overflow-auto p-4 font-mono text-[11px] leading-relaxed custom-code-scrollbar">
        <pre className="text-indigo-300">
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
      <div className="p-3 bg-[#252525] border-t border-white/5 flex items-center justify-between">
        <span className="text-[9px] text-slate-500 font-bold uppercase">Read-only live stream</span>
        <button 
          onClick={() => navigator.clipboard.writeText(JSON.stringify(data, null, 2))}
          className="text-[10px] bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white px-3 py-1 rounded-md transition-all font-bold uppercase tracking-tighter"
        >
          Copy JSON
        </button>
      </div>
      
      <style>{`
        .custom-code-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-code-scrollbar::-webkit-scrollbar-track { background: #1e1e1e; }
        .custom-code-scrollbar::-webkit-scrollbar-thumb { background: #333; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CodePanel;
