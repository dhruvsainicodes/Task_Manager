import React from 'react';
import { motion, Reorder } from 'framer-motion';
import { Check, Trash2 } from 'lucide-react';

interface TaskItemProps {
  task: { id: string; name: string; completed: boolean };
  onToggle: (taskId: string) => void;
  onDelete: (taskId: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        padding: '0.75rem 1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid var(--border-color)',
        borderRadius: '0.75rem',
        marginBottom: '0.5rem'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1 }}>
        <button 
          onClick={() => onToggle(task.id)}
          style={{ 
            width: '1.25rem', 
            height: '1.25rem', 
            borderRadius: '0.375rem', 
            border: `2px solid ${task.completed ? 'var(--accent-color)' : 'var(--text-secondary)'}`,
            background: task.completed ? 'var(--accent-color)' : 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          {task.completed && <Check size={14} color="white" />}
        </button>
        <span style={{ 
          fontSize: '0.9375rem', 
          color: task.completed ? 'var(--text-secondary)' : 'var(--text-primary)',
          textDecoration: task.completed ? 'line-through' : 'none',
          cursor: 'pointer'
        }}
        onClick={() => onToggle(task.id)}
        >
          {task.name}
        </span>
      </div>
      
      <button 
        onClick={() => onDelete(task.id)}
        className="delete-btn"
        style={{ background: 'transparent', color: '#ef4444', opacity: 0.6, padding: '4px' }}
      >
        <Trash2 size={16} />
      </button>
    </motion.div>
  );
};

export default TaskItem;
