
import React from 'react';

interface SidebarProps {
  currentStep: 'setup' | 'analysis' | 'education';
  setStep: (step: 'setup' | 'analysis' | 'education') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentStep, setStep }) => {
  const steps = [
    { id: 'setup', label: 'Sim Builder', icon: 'fa-vial' },
    { id: 'analysis', label: 'Risk Analysis', icon: 'fa-microscope' },
    { id: 'education', label: 'Defense Hub', icon: 'fa-graduation-cap' },
  ];

  return (
    <aside className="w-full lg:w-64 bg-white border-r border-slate-200 p-4 lg:p-6 flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible">
      {steps.map((step) => (
        <button
          key={step.id}
          onClick={() => setStep(step.id as any)}
          className={`flex-1 lg:flex-none flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all text-sm whitespace-nowrap
            ${currentStep === step.id 
              ? 'bg-blue-50 text-blue-700 shadow-sm' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}`}
        >
          <i className={`fas ${step.icon} w-5`}></i>
          {step.label}
        </button>
      ))}
      
      <div className="hidden lg:block mt-auto p-4 bg-slate-50 rounded-xl border border-slate-100">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Training Status</h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600">Compliance score</span>
            <span className="font-bold text-blue-600">84%</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div className="w-[84%] h-full bg-blue-500"></div>
          </div>
          <p className="text-[10px] text-slate-400 italic leading-tight">
            Last fleet-wide drill conducted 12 days ago.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
