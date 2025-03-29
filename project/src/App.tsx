import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Task, SortKey, SortOrder } from './types';
import { useTasks } from './hooks/useTasks';
import { TaskCard } from './components/TaskCard';
import { TaskForm } from './components/TaskForm';
import {
  Plus,
  ArrowUpDown,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  LayoutGrid,
} from 'lucide-react';

function App() {
  const {
    tasks,
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
  } = useTasks();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleSubmit = (
    taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>
  ) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData);
      setEditingTask(null);
    } else {
      addTask(taskData);
    }
  };

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <LayoutGrid className="w-8 h-8 text-blue-600" />
                <h1 className="text-2xl font-bold text-gray-900">Task Manager</h1>
              </div>
              <button
                onClick={() => setIsFormOpen(true)}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transform transition-transform duration-200 hover:scale-105 active:scale-95"
              >
                <Plus size={20} className="mr-2" />
                New Task
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 mb-8 pb-6 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <span className="text-sm font-medium text-gray-700">Filter:</span>
                <select
                  value={filter}
                  onChange={(e) =>
                    setFilter(e.target.value as Task['status'] | 'all')
                  }
                  className="rounded-lg border-gray-200 bg-gray-50 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="all">All Tasks</option>
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              <div className="flex items-center space-x-6">
                <button
                  onClick={() => toggleSort('date')}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    sortKey === 'date'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Calendar size={16} />
                  <span>Date</span>
                  <ArrowUpDown size={16} />
                </button>
                <button
                  onClick={() => toggleSort('priority')}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    sortKey === 'priority'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <AlertTriangle size={16} />
                  <span>Priority</span>
                  <ArrowUpDown size={16} />
                </button>
                <button
                  onClick={() => toggleSort('status')}
                  className={`flex items-center space-x-2 text-sm font-medium transition-colors duration-200 ${
                    sortKey === 'status'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <CheckCircle2 size={16} />
                  <span>Status</span>
                  <ArrowUpDown size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {tasks.map((task, index) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={handleEdit}
                  onDelete={deleteTask}
                  onStatusChange={(id, status) => updateTask(id, { status })}
                />
              ))}
              {tasks.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-500 text-lg">No tasks found</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Click the "New Task" button to get started
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {isFormOpen && (
          <TaskForm
            onSubmit={handleSubmit}
            onClose={() => {
              setIsFormOpen(false);
              setEditingTask(null);
            }}
            initialTask={editingTask || undefined}
          />
        )}
      </div>
    </DndProvider>
  );
}

export default App;