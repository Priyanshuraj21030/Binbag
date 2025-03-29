import React from 'react';
import { Task } from '../types';
import { Pencil, Trash2, CheckCircle, Circle, AlertCircle } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: Task['status']) => void;
  isDragging?: boolean;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800 border-blue-200',
  medium: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  high: 'bg-red-100 text-red-800 border-red-200',
};

const statusIcons = {
  todo: Circle,
  'in-progress': AlertCircle,
  completed: CheckCircle,
};

const statusColors = {
  todo: 'text-gray-400 hover:text-gray-600',
  'in-progress': 'text-yellow-500 hover:text-yellow-600',
  completed: 'text-green-500 hover:text-green-600',
};

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  isDragging,
}) => {
  const StatusIcon = statusIcons[task.status];

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 shadow-sm p-5 mb-3 transform transition-all duration-200 hover:shadow-md ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{task.title}</h3>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed">
            {task.description}
          </p>
        </div>
        <div className="flex items-center space-x-3 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
          >
            <Pencil size={16} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-400 hover:text-red-600 transition-colors duration-200"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
        <div className="flex items-center space-x-3">
          <button
            onClick={() =>
              onStatusChange(
                task.id,
                task.status === 'todo'
                  ? 'in-progress'
                  : task.status === 'in-progress'
                  ? 'completed'
                  : 'todo'
              )
            }
            className={`transition-colors duration-200 ${
              statusColors[task.status]
            }`}
          >
            <StatusIcon size={18} />
          </button>
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              priorityColors[task.priority]
            }`}
          >
            {task.priority}
          </span>
        </div>
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString(undefined, {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}
        </span>
      </div>
    </div>
  );
};