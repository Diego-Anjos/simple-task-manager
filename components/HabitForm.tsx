import React, { useState } from 'react';
import { Habit } from '../types.ts';

interface HabitFormProps {
  onSubmit: (habit: Omit<Habit, 'id' | 'completions'>) => void;
}

const HabitForm: React.FC<HabitFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;
    onSubmit({ title });
    setTitle('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">Novo Hábito</h2>
      <div>
        <label htmlFor="habit-title" className="block text-sm font-medium text-slate-300">Título do Hábito</label>
        <input
          type="text"
          id="habit-title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
          className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
          placeholder="Ex: Meditar por 10 minutos"
        />
      </div>
      <div className="pt-4">
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 font-semibold">
          Adicionar Hábito
        </button>
      </div>
    </form>
  );
};

export default HabitForm;