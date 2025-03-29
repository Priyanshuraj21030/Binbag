import React, { useState, useEffect } from 'react';
import { Task } from '../types';
import { X } from 'lucide-react';

interface TaskFormProps {
  onSubmit: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onClose: () => void;
  initialTask?: Task;
}

export const TaskForm: React.FC<TaskFormProps> = ({
  onSubmit,
  onClose,
  initialTask,
}) => {
  const [title, setTitle] = useState(initialTask?.title || '');
  const [description, setDescription] = useState(initialTask?.description || '');
  const [priority, setPriority] = useState<Task['priority']>(
    initialTask?.priority || 'medium'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      status: initialTask?.status || 'todo',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl w-full max-w-md shadow-xl transform transition-all">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialTask ? 'Edit Task' : 'New Task'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                placeholder="Enter task title"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                placeholder="Enter task description"
              />
            </div>
            <div>
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Task['priority'])}
                className="w-full rounded-lg border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transform transition-all duration-200 hover:scale-105 active:scale-95"
            >
              {initialTask ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};