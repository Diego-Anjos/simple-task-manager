import React from 'react';
import { Goal, Habit } from '../types.ts';
import GoalCard from './GoalCard.tsx';
import HabitTracker from './HabitTracker.tsx';
import AIAssistant from './AIAssistant.tsx';
import ProgressChart from './ProgressChart.tsx';
import { ChartBarIcon, CheckCircleIcon, SparklesIcon, TargetIcon } from './icons.tsx';

interface DashboardProps {
  goals: Goal[];
  habits: Habit[];
  onUpdateGoalProgress: (goalId: string, progress: number) => void;
  onEditGoal: (goal: Goal) => void;
  onDeleteGoal: (goalId: string) => void;
  onToggleHabit: (habitId: string, date: string) => void;
  onDeleteHabit: (habitId: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ goals, habits, onUpdateGoalProgress, onEditGoal, onDeleteGoal, onToggleHabit, onDeleteHabit }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Column */}
      <div className="lg:col-span-2 space-y-6">
        <div>
          <h2 className="flex items-center text-xl font-semibold text-slate-200 mb-4">
            <TargetIcon /> <span className="ml-2">Metas Atuais</span>
          </h2>
          {goals.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {goals.map(goal => (
                  <GoalCard 
                    key={goal.id} 
                    goal={goal} 
                    onUpdateProgress={onUpdateGoalProgress}
                    onEdit={onEditGoal}
                    onDelete={onDeleteGoal}
                  />
                ))}
            </div>
          ) : (
             <div className="text-center py-10 px-6 bg-slate-800 rounded-lg">
                <p className="text-slate-400">Nenhuma meta adicionada ainda. Comece a planejar seu sucesso!</p>
            </div>
          )}
        </div>
        <div>
           <h2 className="flex items-center text-xl font-semibold text-slate-200 mb-4">
             <CheckCircleIcon /> <span className="ml-2">Rastreador de Hábitos</span>
          </h2>
          <HabitTracker habits={habits} onToggle={onToggleHabit} onDelete={onDeleteHabit} />
        </div>
      </div>

      {/* Side Column */}
      <div className="space-y-6">
        <div>
            <h2 className="flex items-center text-xl font-semibold text-slate-200 mb-4">
                <SparklesIcon /> <span className="ml-2">Assistente IA</span>
            </h2>
          <AIAssistant goals={goals} habits={habits} />
        </div>
        <div>
            <h2 className="flex items-center text-xl font-semibold text-slate-200 mb-4">
                <ChartBarIcon /> <span className="ml-2">Visualização de Progresso</span>
            </h2>
          <ProgressChart goals={goals} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;