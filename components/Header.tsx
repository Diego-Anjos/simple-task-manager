import React from 'react';
import { PlusIcon } from './icons.tsx';

interface HeaderProps {
  onAddGoal: () => void;
  onAddHabit: () => void;
}

const Header: React.FC<HeaderProps> = ({ onAddGoal, onAddHabit }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-emerald-500 to-sky-500 p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4v4m-2-2h4M17 3v4m-2-2h4M5 21v-4m2 2H3" />
                </svg>
            </div>
            <h1 className="text-2xl font-bold text-slate-100 tracking-tight">
              Gestor de Metas IA
            </h1>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={onAddHabit}
              className="flex items-center space-x-2 px-3 py-2 bg-slate-800 text-slate-300 rounded-md hover:bg-slate-700 hover:text-white transition-colors duration-200 text-sm font-medium"
            >
              <PlusIcon />
              <span>Novo Hábito</span>
            </button>
            <button
              onClick={onAddGoal}
              className="flex items-center space-x-2 px-3 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-500 transition-colors duration-200 text-sm font-medium"
            >
              <PlusIcon />
              <span>Nova Meta</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;