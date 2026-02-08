
import { GoogleGenAI, Type } from "@google/genai";
import { SimulationType, PhishTemplate, AnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generatePhishingTemplate = async (type: SimulationType, customContext: string): Promise<PhishTemplate> => {
  const prompt = `
    Act as a cybersecurity training expert for "Trident Waste Management", a recycling company.
    Generate a realistic EDUCATIONAL phishing simulation example targeting their "Vehicle Management System" (VMS).
    
    Target Context: ${customContext}
    Type: ${type}

    The example should look like it comes from an internal IT department, a fuel card provider, or a GPS vendor.
    Include "telltale signs" (red flags) that a trained employee should notice.

    Return the result in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          subject: { type: Type.STRING },
          sender: { type: Type.STRING },
          content: { type: Type.STRING },
          telltaleSigns: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          riskScore: { type: Type.NUMBER }
        },
        required: ["id", "title", "sender", "content", "telltaleSigns", "riskScore"]
      }
    }
  });

  return JSON.parse(response.text.trim());
};

export const analyzePhish = async (template: PhishTemplate): Promise<AnalysisResult> => {
  const prompt = `
    Analyze this simulated phishing attack for Trident Waste Management:
    Sender: ${template.sender}
    Content: ${template.content}

    Provide a professional security analysis for training purposes.
    Identify the psychology used (e.g., urgency, authority) and how a VMS system might be compromised (e.g., credential harvesting, malicious payload).
    
    Return the result in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          riskAssessment: { type: Type.STRING },
          vulnerabilityPoint: { type: Type.STRING },
          defenseStrategy: { type: Type.STRING },
          isHighRisk: { type: Type.BOOLEAN }
        },
        required: ["riskAssessment", "vulnerabilityPoint", "defenseStrategy", "isHighRisk"]
      }
    }
  });

  return JSON.parse(response.text.trim());
};
