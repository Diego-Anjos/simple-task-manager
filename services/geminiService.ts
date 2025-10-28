import { GoogleGenAI } from "@google/genai";
import { Goal, Habit } from '../types.ts';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

function formatDataForPrompt(goals: Goal[], habits: Habit[]): string {
    let prompt = "Aqui está um resumo das minhas metas e hábitos atuais:\n\n";

    if (goals.length > 0) {
        prompt += "Metas:\n";
        goals.forEach(g => {
            prompt += `- ${g.title} (Prazo: ${g.dueDate}, Progresso: ${g.progress}%). Descrição: ${g.description}\n`;
        });
    } else {
        prompt += "Nenhuma meta definida.\n";
    }

    prompt += "\n";

    if (habits.length > 0) {
        prompt += "Hábitos que estou tentando construir:\n";
        habits.forEach(h => {
            prompt += `- ${h.title} (Completado ${h.completions.length} vezes recentemente)\n`;
        });
    } else {
        prompt += "Nenhum hábito sendo rastreado.\n";
    }

    return prompt;
}


export const getInsightsOnGoalsAndHabits = async (goals: Goal[], habits: Habit[]): Promise<string> => {
  try {
    const dataSummary = formatDataForPrompt(goals, habits);
    
    const prompt = `
      Você é um coach de produtividade amigável e motivacional. 
      Analise os seguintes dados do usuário sobre suas metas e hábitos.
      Forneça um feedback curto e encorajador.
      Dê uma sugestão acionável e específica para ajudar o usuário a progredir.
      Mantenha a resposta concisa, em torno de 2 a 3 parágrafos curtos.
      Responda em português do Brasil.

      Dados do usuário:
      ${dataSummary}
    `;

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
            temperature: 0.7,
            topP: 0.95,
        }
    });

    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Não foi possível se comunicar com o assistente de IA.");
  }
};