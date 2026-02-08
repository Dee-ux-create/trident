
import React from 'react';

const EducationCenter: React.FC = () => {
  const securityBestPractices = [
    {
      title: 'Verify URL Identity',
      desc: 'Always hover over links. Trident VMS portals only use tridentsystems.com/fleet. Watch for tridentsystms.com or tridentsystems-login.com.',
      icon: 'fa-link'
    },
    {
      title: 'Out-of-Band Confirmation',
      desc: 'If an urgent SMS arrives, call the Fleet Ops dispatch center directly. Do not reply to the sender or click the link.',
      icon: 'fa-phone-volume'
    },
    {
      title: 'Fuel Card Protocol',
      desc: 'Trident never requests fuel card PINS or re-verification via text or email. All security updates are done during vehicle inspection.',
      icon: 'fa-credit-card'
    },
    {
      title: 'Report & Quarantine',
      desc: 'Use the "Report Phish" button in your email client immediately. This alerts the entire SOC to block the sender fleet-wide.',
      icon: 'fa-paper-plane'
    }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-bottom-6 duration-700 space-y-8">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-3xl mb-6 text-2xl">
          <i className="fas fa-graduation-cap"></i>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Trident Defense Hub</h2>
        <p className="text-slate-500 text-lg">
          Master the art of spotting phishing attempts specific to our recycling fleet operations.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityBestPractices.map((practice, idx) => (
          <div key={idx} className="glass-panel p-6 rounded-3xl shadow-sm hover:shadow-md transition-shadow flex gap-6 border-l-4 border-blue-100">
            <div className="flex-shrink-0 w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-xl text-blue-600 border border-slate-100">
              <i className={`fas ${practice.icon}`}></i>
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">{practice.title}</h4>
              <p className="text-sm text-slate-600 leading-relaxed">{practice.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 rounded-[2.5rem] p-8 md:p-12 text-white relative overflow-hidden">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-6">Simulation Summary Report</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Total Simulations Run</span>
                <span className="font-mono text-xl">124</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <span className="text-slate-400">Successful Detection Rate</span>
                <span className="font-mono text-xl text-emerald-400">92%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Top Threat Target</span>
                <span className="font-mono text-xl text-orange-400">Fuel Portals</span>
              </div>
            </div>
            <button 
              className="mt-10 w-full bg-blue-600 hover:bg-blue-700 py-4 rounded-2xl font-bold transition-all flex items-center justify-center gap-3"
              onClick={() => window.location.reload()}
            >
              <i className="fas fa-play"></i>
              Start New Drill
            </button>
          </div>
          
          <div className="hidden lg:block">
            <div className="aspect-square bg-white/5 backdrop-blur-md rounded-full flex items-center justify-center p-12 border border-white/10">
              <div className="text-center">
                <div className="text-5xl font-black text-blue-400 mb-2">SAFE</div>
                <div className="text-sm text-slate-400 uppercase tracking-widest font-bold">Fleet Status</div>
                <i className="fas fa-check-circle text-6xl text-emerald-500 mt-6 animate-pulse"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full"></div>
      </div>
    </div>
  );
};

export default EducationCenter;
