
import React from 'react';
import { PhishTemplate, AnalysisResult } from '../types';

interface AnalysisPanelProps {
  template: PhishTemplate;
  analysis: AnalysisResult;
  onNext: () => void;
}

const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ template, analysis, onNext }) => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Expert Risk Analysis</h2>
          <p className="text-slate-500">Security breakdown for "{template.title}"</p>
        </div>
        <button 
          onClick={onNext}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-all shadow-md flex items-center gap-2"
        >
          View Defense Measures
          <i className="fas fa-arrow-right"></i>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6 rounded-2xl shadow-sm border-t-4 border-red-500">
          <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-4 text-xl">
            <i className="fas fa-biohazard"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">Threat Vector</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{analysis.vulnerabilityPoint}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-sm border-t-4 border-blue-500">
          <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-4 text-xl">
            <i className="fas fa-brain"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">Psychological Tactic</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{analysis.riskAssessment}</p>
        </div>

        <div className="glass-panel p-6 rounded-2xl shadow-sm border-t-4 border-emerald-500">
          <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 text-xl">
            <i className="fas fa-shield-halved"></i>
          </div>
          <h3 className="font-bold text-lg mb-2">Recommended Defense</h3>
          <p className="text-slate-600 text-sm leading-relaxed">{analysis.defenseStrategy}</p>
        </div>
      </div>

      <div className="glass-panel p-8 rounded-3xl shadow-sm overflow-hidden relative">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
              <i className="fas fa-magnifying-glass-chart text-blue-600"></i>
              Simulation Breakdown
            </h3>
            <div className="space-y-4">
              {template.telltaleSigns.map((sign, idx) => (
                <div key={idx} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="flex-shrink-0 w-8 h-8 bg-white border border-slate-200 rounded-full flex items-center justify-center font-bold text-blue-600 shadow-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Red Flag Detected</h4>
                    <p className="text-sm text-slate-600 italic">"{sign}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-64 flex flex-col items-center justify-center p-6 bg-slate-900 rounded-2xl text-white">
            <div className="text-slate-400 text-xs font-bold uppercase mb-4 tracking-tighter">AI Composite Risk Score</div>
            <div className={`text-6xl font-black mb-2 ${analysis.isHighRisk ? 'text-red-500' : 'text-orange-400'}`}>
              {template.riskScore}%
            </div>
            <div className="text-sm font-medium text-slate-400 text-center">
              {analysis.isHighRisk ? 'Critical vulnerability detected in fleet operations.' : 'Moderate awareness required.'}
            </div>
            <div className="mt-6 w-full h-2 bg-slate-800 rounded-full">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${analysis.isHighRisk ? 'bg-red-500' : 'bg-orange-400'}`}
                style={{ width: `${template.riskScore}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisPanel;
