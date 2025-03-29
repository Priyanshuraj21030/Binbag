import { useState, useEffect } from 'react';
import { Task, SortKey, SortOrder } from '../types';

const STORAGE_KEY = 'tasks';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [filter, setFilter] = useState<Task['status'] | 'all'>('all');
  const [sortKey, setSortKey] = useState<SortKey>('date');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id
          ? { ...task, ...updates, updatedAt: new Date().toISOString() }
          : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  const moveTask = (fromIndex: number, toIndex: number) => {
    setTasks((prev) => {
      const newTasks = [...prev];
      const [removed] = newTasks.splice(fromIndex, 1);
      newTasks.splice(toIndex, 0, removed);
      return newTasks;
    });
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => filter === 'all' || task.status === filter)
    .sort((a, b) => {
      if (sortKey === 'date') {
        return sortOrder === 'asc'
          ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }
      if (sortKey === 'priority') {
        const priorityWeight = { low: 0, medium: 1, high: 2 };
        return sortOrder === 'asc'
          ? priorityWeight[a.priority] - priorityWeight[b.priority]
          : priorityWeight[b.priority] - priorityWeight[a.priority];
      }
      return sortOrder === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    });

  return {
    tasks: filteredAndSortedTasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    filter,
    setFilter,
    sortKey,
    setSortKey,
    sortOrder,
    setSortOrder,
  };
};