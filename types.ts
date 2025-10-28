
export interface Goal {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  category: string;
  progress: number; // 0-100
}

export interface Habit {
  id: string;
  title: string;
  completions: string[]; // Array of dates in 'YYYY-MM-DD' format
}
