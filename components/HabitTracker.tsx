import React from 'react';
import { Habit } from '../types.ts';
import { TrashIcon } from './icons.tsx';

interface HabitTrackerProps {
  habits: Habit[];
  onToggle: (habitId: string, date: string) => void;
  onDelete: (habitId: string) => void;
}

const HabitTracker: React.FC<HabitTrackerProps> = ({ habits, onToggle, onDelete }) => {
  const today = new Date();
  const weekDates: Date[] = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    weekDates.push(date);
  }

  const formatDate = (date: Date) => date.toISOString().split('T')[0];

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-5">
      {habits.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="py-2 pr-4 font-semibold text-slate-300">Hábito</th>
                {weekDates.map(date => (
                  <th key={date.toISOString()} className="py-2 px-2 text-center font-semibold text-slate-400 text-xs">
                    <div>{date.toLocaleDateString('pt-BR', { weekday: 'short' }).slice(0,3)}</div>
                    <div>{date.getDate()}</div>
                  </th>
                ))}
                 <th className="py-2 pl-2"></th>
              </tr>
            </thead>
            <tbody>
              {habits.map(habit => (
                <tr key={habit.id} className="border-b border-slate-700/50 last:border-b-0">
                  <td className="py-3 pr-4 text-slate-200 font-medium">{habit.title}</td>
                  {weekDates.map(date => {
                    const dateString = formatDate(date);
                    const isCompleted = habit.completions.includes(dateString);
                    return (
                      <td key={dateString} className="py-3 px-2 text-center">
                        <button
                          onClick={() => onToggle(habit.id, dateString)}
                          className={`w-7 h-7 rounded-md flex items-center justify-center transition-all duration-200 ${
                            isCompleted ? 'bg-emerald-500 text-white' : 'bg-slate-700 hover:bg-slate-600'
                          }`}
                        >
                           {isCompleted && '✔'}
                        </button>
                      </td>
                    );
                  })}
                   <td className="py-3 pl-2 text-center">
                    <button onClick={() => onDelete(habit.id)} className="text-slate-500 hover:text-red-400 transition-colors">
                        <TrashIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6">
            <p className="text-slate-400">Nenhum hábito para rastrear. Adicione um para começar a construir bons costumes!</p>
        </div>
      )}
    </div>
  );
};

export default HabitTracker;