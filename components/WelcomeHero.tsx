
import React from 'react';

const WelcomeHero: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 to-blue-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
      <div className="relative z-10 max-w-2xl">
        <span className="inline-block px-3 py-1 bg-blue-500/20 backdrop-blur-md rounded-full text-xs font-bold text-blue-300 border border-blue-500/30 uppercase tracking-widest mb-6">
          Security Training Program
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
          Strengthening Trident's <span className="text-blue-400">Digital Perimeter.</span>
        </h1>
        <p className="text-blue-100/80 text-lg mb-8 leading-relaxed">
          Use this simulation sandbox to craft and analyze phishing threats targeting our Vehicle Management System. Identify vulnerabilities before attackers do.
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
            <i className="fas fa-truck-monster text-blue-400"></i>
            <span className="text-sm font-medium">842 Active Trucks</span>
          </div>
          <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
            <i className="fas fa-location-dot text-blue-400"></i>
            <span className="text-sm font-medium">Global GPS Network</span>
          </div>
        </div>
      </div>
      
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 flex items-center justify-center pointer-events-none">
        <i className="fas fa-shield-halved text-[240px]"></i>
      </div>
    </div>
  );
};

export default WelcomeHero;
