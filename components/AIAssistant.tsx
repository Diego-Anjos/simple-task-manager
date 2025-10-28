import React, { useState, useCallback } from 'react';
import { Goal, Habit } from '../types.ts';
import { getInsightsOnGoalsAndHabits } from '../services/geminiService.ts';
import { SparklesIcon } from './icons.tsx';

interface AIAssistantProps {
  goals: Goal[];
  habits: Habit[];
}

const AIAssistant: React.FC<AIAssistantProps> = ({ goals, habits }) => {
  const [insight, setInsight] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchInsights = useCallback(async () => {
    if (goals.length === 0 && habits.length === 0) {
      setError("Adicione pelo menos uma meta ou hábito para obter insights.");
      return;
    }
    
    setIsLoading(true);
    setError(null);
    setInsight('');
    try {
      const response = await getInsightsOnGoalsAndHabits(goals, habits);
      setInsight(response);
    } catch (err) {
      console.error(err);
      setError('Falha ao obter insight da IA. Tente novamente mais tarde.');
    } finally {
      setIsLoading(false);
    }
  }, [goals, habits]);

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-5 space-y-4">
      <div className="flex flex-col items-center text-center">
        <p className="text-slate-300 text-sm mb-3">Receba sugestões e encorajamento com base em suas metas e hábitos atuais.</p>
        <button
          onClick={fetchInsights}
          disabled={isLoading}
          className="flex items-center justify-center w-full px-4 py-2 bg-gradient-to-r from-sky-500 to-indigo-500 text-white font-semibold rounded-md hover:opacity-90 transition-opacity duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
             <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            <SparklesIcon />
          )}
          <span className="ml-2">{isLoading ? 'Analisando...' : 'Obter Sugestão da IA'}</span>
        </button>
      </div>

      {error && <p className="text-red-400 text-sm text-center">{error}</p>}
      
      {insight && (
        <div className="bg-slate-900/50 p-4 rounded-md border border-slate-700">
            <p className="text-slate-300 whitespace-pre-wrap text-sm leading-relaxed">{insight}</p>
        </div>
      )}
    </div>
  );
};

export default AIAssistant;