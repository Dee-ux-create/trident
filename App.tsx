
import React, { useState, useCallback } from 'react';
import { SimulationType, PhishTemplate, AnalysisResult, SimulationState } from './types';
import { generatePhishingTemplate, analyzePhish } from './services/geminiService';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import WelcomeHero from './components/WelcomeHero';
import TemplateSelector from './components/TemplateSelector';
import AnalysisPanel from './components/AnalysisPanel';
import EducationCenter from './components/EducationCenter';

const App: React.FC = () => {
  const [state, setState] = useState<SimulationState>({
    currentStep: 'setup',
    selectedTemplate: null,
    customPrompt: '',
    analysis: null,
    isLoading: false,
  });

  const handleGenerate = async (type: SimulationType, context: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const template = await generatePhishingTemplate(type, context);
      setState(prev => ({ 
        ...prev, 
        selectedTemplate: template, 
        isLoading: false 
      }));
    } catch (error) {
      console.error("Generation failed", error);
      setState(prev => ({ ...prev, isLoading: false }));
      alert("Failed to generate simulation. Please check your connection.");
    }
  };

  const handleAnalyze = async () => {
    if (!state.selectedTemplate) return;
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      const analysis = await analyzePhish(state.selectedTemplate);
      setState(prev => ({ 
        ...prev, 
        analysis, 
        currentStep: 'analysis',
        isLoading: false 
      }));
    } catch (error) {
      console.error("Analysis failed", error);
      setState(prev => ({ ...prev, isLoading: false }));
    }
  };

  const resetState = () => {
    setState({
      currentStep: 'setup',
      selectedTemplate: null,
      customPrompt: '',
      analysis: null,
      isLoading: false,
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Header onReset={resetState} />
      
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <Sidebar 
          currentStep={state.currentStep} 
          setStep={(step) => setState(prev => ({ ...prev, currentStep: step }))} 
        />
        
        <main className="flex-1 overflow-y-auto p-4 md:p-8 space-y-8">
          {state.currentStep === 'setup' && (
            <>
              <WelcomeHero />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <section className="space-y-6">
                  <div className="glass-panel p-6 rounded-2xl shadow-sm">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                      <i className="fas fa-cog text-blue-600"></i>
                      Simulation Configuration
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2">Target Context</label>
                        <textarea 
                          className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                          rows={3}
                          placeholder="e.g., Fleet drivers for Trident Recycling, focusing on fuel card updates or route shifts..."
                          value={state.customPrompt}
                          onChange={(e) => setState(prev => ({ ...prev, customPrompt: e.target.value }))}
                        />
                      </div>
                      <div className="flex gap-2">
                        <button 
                          onClick={() => handleGenerate(SimulationType.EMAIL, state.customPrompt)}
                          disabled={state.isLoading}
                          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {state.isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-envelope"></i>}
                          Generate Email
                        </button>
                        <button 
                          onClick={() => handleGenerate(SimulationType.SMS, state.customPrompt)}
                          disabled={state.isLoading}
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                          {state.isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sms"></i>}
                          Generate SMS
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {state.selectedTemplate && (
                    <div className="glass-panel p-6 rounded-2xl shadow-sm border-l-4 border-blue-500 animate-in fade-in slide-in-from-bottom-4 duration-500">
                       <div className="flex justify-between items-start mb-4">
                         <h3 className="font-bold text-lg">Simulation Template Ready</h3>
                         <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-full uppercase">
                           {state.selectedTemplate.type}
                         </span>
                       </div>
                       <div className="bg-white rounded-xl border border-slate-100 p-4 mb-4 text-sm font-mono text-slate-600 overflow-x-auto">
                          <div className="mb-2"><span className="font-bold text-slate-400">From:</span> {state.selectedTemplate.sender}</div>
                          {state.selectedTemplate.subject && (
                            <div className="mb-2"><span className="font-bold text-slate-400">Subject:</span> {state.selectedTemplate.subject}</div>
                          )}
                          <hr className="my-2 border-slate-50" />
                          <div className="whitespace-pre-wrap">{state.selectedTemplate.content}</div>
                       </div>
                       <button 
                        onClick={handleAnalyze}
                        className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                       >
                         <i className="fas fa-shield-virus"></i>
                         Analyze Security Risks
                       </button>
                    </div>
                  )}
                </section>

                <section>
                  <TemplateSelector 
                    onSelect={(template) => setState(prev => ({ ...prev, selectedTemplate: template }))} 
                  />
                </section>
              </div>
            </>
          )}

          {state.currentStep === 'analysis' && state.analysis && state.selectedTemplate && (
            <AnalysisPanel 
              template={state.selectedTemplate} 
              analysis={state.analysis} 
              onNext={() => setState(prev => ({ ...prev, currentStep: 'education' }))}
            />
          )}

          {state.currentStep === 'education' && (
            <EducationCenter />
          )}
        </main>
      </div>

      <footer className="bg-white border-t border-slate-200 py-4 px-8 text-center text-sm text-slate-500">
        <p>&copy; 2024 Trident Waste Management. For authorized cybersecurity training only.</p>
      </footer>
    </div>
  );
};

export default App;
