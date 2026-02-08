
export enum SimulationType {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PORTAL = 'PORTAL'
}

export interface PhishTemplate {
  id: string;
  type: SimulationType;
  title: string;
  subject?: string;
  sender: string;
  content: string;
  telltaleSigns: string[];
  riskScore: number;
}

export interface AnalysisResult {
  riskAssessment: string;
  vulnerabilityPoint: string;
  defenseStrategy: string;
  isHighRisk: boolean;
}

export interface SimulationState {
  currentStep: 'setup' | 'analysis' | 'education';
  selectedTemplate: PhishTemplate | null;
  customPrompt: string;
  analysis: AnalysisResult | null;
  isLoading: boolean;
}
