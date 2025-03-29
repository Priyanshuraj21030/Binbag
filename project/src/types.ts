export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
}

export type SortKey = 'date' | 'priority' | 'status';
export type SortOrder = 'asc' | 'desc';