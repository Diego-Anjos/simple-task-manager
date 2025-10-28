import React, { useState, useEffect } from 'react';
import { Goal } from '../types.ts';

interface GoalFormProps {
  onSubmit: (goal: Goal) => void;
  goal?: Goal;
}

const GoalForm: React.FC<GoalFormProps> = ({ onSubmit, goal }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    if (goal) {
      setTitle(goal.title);
      setDescription(goal.description);
      setDueDate(goal.dueDate);
      setCategory(goal.category);
    } else {
        setTitle('');
        setDescription('');
        setDueDate('');
        setCategory('');
    }
  }, [goal]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !dueDate) return;
    
    onSubmit({
      id: goal?.id || '',
      title,
      description,
      dueDate,
      category,
      progress: goal?.progress || 0,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-bold text-white mb-4">{goal ? 'Editar Meta' : 'Nova Meta'}</h2>
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-300">Título</label>
        <input type="text" id="title" value={title} onChange={e => setTitle(e.target.value)} required className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-300">Descrição</label>
        <textarea id="description" value={description} onChange={e => setDescription(e.target.value)} rows={3} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"></textarea>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="dueDate" className="block text-sm font-medium text-slate-300">Prazo</label>
          <input type="date" id="dueDate" value={dueDate} onChange={e => setDueDate(e.target.value)} required className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
        </div>
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-300">Categoria</label>
          <input type="text" id="category" value={category} onChange={e => setCategory(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"/>
        </div>
      </div>
      <div className="pt-4">
        <button type="submit" className="w-full bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-emerald-500 font-semibold">
          {goal ? 'Salvar Alterações' : 'Adicionar Meta'}
        </button>
      </div>
    </form>
  );
};

export default GoalForm;