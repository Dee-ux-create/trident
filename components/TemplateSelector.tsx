
import React from 'react';
import { PhishTemplate, SimulationType } from '../types';

interface TemplateSelectorProps {
  onSelect: (template: PhishTemplate) => void;
}

const PRESET_TEMPLATES: PhishTemplate[] = [
  {
    id: 't1',
    type: SimulationType.EMAIL,
    title: 'Urgent Fuel Card Update',
    sender: 'fleet-admin@trident-management.com',
    subject: 'Action Required: Fuel Card Security Patch',
    content: 'Dear Fleet Operator, we detected unusual activity on your assigned fuel card. Please login to the portal immediately to verify your last three transactions or your card will be suspended by EOD.\n\nVerify here: http://bit.ly/trident-fuel-sec-v3',
    telltaleSigns: ['Suspicious URL shortener', 'Sense of urgency', 'Threat of suspension'],
    riskScore: 85
  },
  {
    id: 't2',
    type: SimulationType.SMS,
    title: 'GPS Sync Error',
    sender: '+1 (555) 012-3948',
    content: 'TRIDENT FLEET ALERT: Your GPS unit (ID: 9482) is out of sync. Click to re-calibrate: https://vms-sync-portal.com/9482. Failure to sync may result in route non-compliance fines.',
    telltaleSigns: ['Random phone number sender', 'Hyperlink in SMS', 'Compliance threat'],
    riskScore: 72
  }
];

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ onSelect }) => {
  return (
    <div className="glass-panel p-6 rounded-2xl shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <i className="fas fa-layer-group text-blue-600"></i>
          Library Templates
        </h2>
        <span className="text-xs text-slate-400 font-bold uppercase">Training Bank</span>
      </div>
      
      <div className="space-y-4">
        {PRESET_TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => onSelect(template)}
            className="w-full text-left p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/50 transition-all group"
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                template.type === SimulationType.EMAIL ? 'bg-blue-100 text-blue-700' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {template.type}
              </span>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className={`w-1.5 h-1.5 rounded-full ${i < template.riskScore / 20 ? 'bg-orange-400' : 'bg-slate-200'}`}></div>
                ))}
              </div>
            </div>
            <h4 className="font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{template.title}</h4>
            <p className="text-sm text-slate-500 line-clamp-2 mt-1 italic">"{template.content}"</p>
          </button>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-orange-50 border border-orange-100 rounded-xl">
        <h5 className="text-xs font-bold text-orange-800 uppercase mb-2 flex items-center gap-2">
          <i className="fas fa-triangle-exclamation"></i>
          Safety Protocol
        </h5>
        <p className="text-xs text-orange-700 leading-relaxed">
          Never use real Trident production credentials in this simulator. This environment is for educational modeling only.
        </p>
      </div>
    </div>
  );
};

export default TemplateSelector;
