import React, { useState } from 'react';
import { Goal, Habit } from './types.ts';
import Header from './components/Header.tsx';
import Dashboard from './components/Dashboard.tsx';
import Modal from './components/Modal.tsx';
import GoalForm from './components/GoalForm.tsx';
import HabitForm from './components/HabitForm.tsx';

// Sample Data
const getInitialGoals = (): Goal[] => [
  { id: 'g1', title: 'Aprender React com TypeScript', description: 'Concluir um curso e criar 2 projetos pessoais.', dueDate: '2024-12-31', category: 'Desenvolvimento Pessoal', progress: 45 },
  { id: 'g2', title: 'Correr 5km', description: 'Treinar 3 vezes por semana para a corrida de fim de ano.', dueDate: '2024-11-20', category: 'Saúde', progress: 75 },
  { id: 'g3', title: 'Ler 12 Livros', description: 'Ler um livro por mês durante o ano.', dueDate: '2024-12-31', category: 'Lazer', progress: 80 },
];

const getInitialHabits = (): Habit[] => [
    { id: 'h1', title: 'Meditar 10 minutos', completions: ['2024-07-20', '2024-07-21', '2024-07-23'] },
    { id: 'h2', title: 'Beber 2L de água', completions: ['2024-07-20', '2024-07-21', '2024-07-22', '2024-07-23'] },
    { id: 'h3', title: 'Estudar por 1 hora', completions: ['2024-07-21', '2024-07-22'] },
];

const App: React.FC = () => {
  const [goals, setGoals] = useState<Goal[]>(getInitialGoals());
  const [habits, setHabits] = useState<Habit[]>(getInitialHabits());

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [isHabitModalOpen, setIsHabitModalOpen] = useState(false);

  const [editingGoal, setEditingGoal] = useState<Goal | undefined>(undefined);

  const handleAddOrUpdateGoal = (goal: Goal) => {
    if (editingGoal) {
      setGoals(goals.map(g => g.id === goal.id ? goal : g));
      setEditingGoal(undefined);
    } else {
      setGoals([...goals, { ...goal, id: `g${Date.now()}` }]);
    }
    setIsGoalModalOpen(false);
  };
  
  const handleEditGoal = (goal: Goal) => {
      setEditingGoal(goal);
      setIsGoalModalOpen(true);
  }

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(g => g.id !== goalId));
  };
  
  const handleUpdateGoalProgress = (goalId: string, progress: number) => {
    setGoals(goals.map(g => g.id === goalId ? {...g, progress} : g));
  }

  const handleAddHabit = (habit: Omit<Habit, 'id' | 'completions'>) => {
    const newHabit: Habit = { ...habit, id: `h${Date.now()}`, completions: [] };
    setHabits([...habits, newHabit]);
    setIsHabitModalOpen(false);
  };
  
  const handleDeleteHabit = (habitId: string) => {
      setHabits(habits.filter(h => h.id !== habitId));
  }

  const handleToggleHabitCompletion = (habitId: string, date: string) => {
    setHabits(habits.map(h => {
      if (h.id === habitId) {
        const completions = h.completions.includes(date)
          ? h.completions.filter(d => d !== date)
          : [...h.completions, date];
        return { ...h, completions };
      }
      return h;
    }));
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200">
      <Header 
        onAddGoal={() => { setEditingGoal(undefined); setIsGoalModalOpen(true); }}
        onAddHabit={() => setIsHabitModalOpen(true)}
      />
      <main className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
        <Dashboard
          goals={goals}
          habits={habits}
          onUpdateGoalProgress={handleUpdateGoalProgress}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoal}
          onToggleHabit={handleToggleHabitCompletion}
          onDeleteHabit={handleDeleteHabit}
        />
      </main>
      
      <Modal isOpen={isGoalModalOpen} onClose={() => { setIsGoalModalOpen(false); setEditingGoal(undefined); }}>
        <GoalForm onSubmit={handleAddOrUpdateGoal} goal={editingGoal} />
      </Modal>

      <Modal isOpen={isHabitModalOpen} onClose={() => setIsHabitModalOpen(false)}>
        <HabitForm onSubmit={handleAddHabit} />
      </Modal>
    </div>
  );
};

export default App;