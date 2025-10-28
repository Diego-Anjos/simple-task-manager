import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Goal } from '../types.ts';

interface ProgressChartProps {
  goals: Goal[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-700 p-2 rounded-md border border-slate-600">
        <p className="font-bold text-slate-200">{`${label}`}</p>
        <p className="text-emerald-400">{`Progresso: ${payload[0].value}%`}</p>
      </div>
    );
  }
  return null;
};

const ProgressChart: React.FC<ProgressChartProps> = ({ goals }) => {
  const data = goals.map(goal => ({
    name: goal.title.length > 15 ? goal.title.substring(0, 15) + '...' : goal.title,
    progresso: goal.progress,
  }));

  return (
    <div className="bg-slate-800/50 rounded-lg shadow-lg p-5 h-72">
      {goals.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} unit="%" />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(71, 85, 105, 0.5)' }} />
            <Bar dataKey="progresso" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      ) : (
         <div className="flex items-center justify-center h-full">
            <p className="text-slate-400 text-center">Adicione metas para ver seu progresso aqui.</p>
        </div>
      )}
    </div>
  );
};

export default ProgressChart;