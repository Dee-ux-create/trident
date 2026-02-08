
import React from 'react';

interface HeaderProps {
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ onReset }) => {
  return (
    <header className="bg-white border-b border-slate-200 h-16 px-6 md:px-10 flex items-center justify-between sticky top-0 z-50">
      <div className="flex items-center gap-3 cursor-pointer" onClick={onReset}>
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white text-xl">
          <i className="fas fa-recycle"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900 leading-none">TRIDENT</h1>
          <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">Fleet Security Simulator</p>
        </div>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-semibold text-slate-600">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          Sim Environment Active
        </div>
        <button 
          onClick={onReset}
          className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
          title="Reset Simulation"
        >
          <i className="fas fa-rotate-left"></i>
        </button>
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 border border-slate-300">
          <i className="fas fa-user-shield"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
