import React from 'react';
import { Goal } from '../types.ts';
import { CalendarIcon, EditIcon, TagIcon, TrashIcon } from './icons.tsx';

interface GoalCardProps {
  goal: Goal;
  onUpdateProgress: (id: string, progress: number) => void;
  onEdit: (goal: Goal) => void;
  onDelete: (id: string) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onUpdateProgress, onEdit, onDelete }) => {
  const progressColor = goal.progress < 40 ? 'bg-red-500' : goal.progress < 80 ? 'bg-yellow-500' : 'bg-emerald-500';

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-emerald-500/10 hover:border-emerald-500/30 border border-transparent">
      <div>
        <div className="flex justify-between items-start">
            <h3 className="text-lg font-bold text-slate-100">{goal.title}</h3>
            <div className="flex items-center space-x-2">
                <button onClick={() => onEdit(goal)} className="text-slate-400 hover:text-sky-400 transition-colors"><EditIcon /></button>
                <button onClick={() => onDelete(goal.id)} className="text-slate-400 hover:text-red-400 transition-colors"><TrashIcon /></button>
            </div>
        </div>
        <p className="text-sm text-slate-400 mt-1 mb-3">{goal.description}</p>
        <div className="flex items-center text-xs text-slate-400 space-x-4 mb-4">
            <span className="flex items-center"><TagIcon /><span className="ml-1.5">{goal.category}</span></span>
            <span className="flex items-center"><CalendarIcon /><span className="ml-1.5">Prazo: {new Date(goal.dueDate).toLocaleDateString()}</span></span>
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs font-medium text-slate-400">Progresso</span>
          <span className="text-sm font-bold text-slate-200">{goal.progress}%</span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-2.5">
          <div className={`${progressColor} h-2.5 rounded-full transition-all duration-500`} style={{ width: `${goal.progress}%` }}></div>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={goal.progress}
          onChange={(e) => onUpdateProgress(goal.id, parseInt(e.target.value))}
          className="w-full h-1 mt-3 bg-slate-700 rounded-lg appearance-none cursor-pointer range-sm accent-emerald-500"
        />
      </div>
    </div>
  );
};

export default GoalCard;