import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, Settings2, Trash2 } from 'lucide-react';
import TaskItem from './TaskItem';
import { v4 as uuidv4 } from 'uuid';

interface CategoryCardProps {
  category: { id: string; name: string; tasks: any[] };
  onUpdateCategory: (categoryId: string, updates: any) => void;
  onDeleteCategory: (categoryId: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onUpdateCategory, onDeleteCategory }) => {
  const [newTaskName, setNewTaskName] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(category.name);

  const addTask = () => {
    if (!newTaskName.trim()) return;
    const newTask = { id: uuidv4(), name: newTaskName, completed: false };
    onUpdateCategory(category.id, { tasks: [...category.tasks, newTask] });
    setNewTaskName('');
    setIsAdding(false);
  };

  const toggleTask = (taskId: string) => {
    const updatedTasks = category.tasks.map(t => 
      t.id === taskId ? { ...t, completed: !t.completed } : t
    );
    onUpdateCategory(category.id, { tasks: updatedTasks });
  };

  const deleteTask = (taskId: string) => {
    onUpdateCategory(category.id, { tasks: category.tasks.filter(t => t.id !== taskId) });
  };

  const saveTitle = () => {
    onUpdateCategory(category.id, { name: editedTitle });
    setIsEditingTitle(false);
  };

  const completedCount = category.tasks.filter(t => t.completed).length;
  const progress = category.tasks.length === 0 ? 0 : (completedCount / category.tasks.length) * 100;

  return (
    <motion.div 
      layout
      className="glass-card"
      style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'fit-content' }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          {isEditingTitle ? (
            <input 
              autoFocus
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              onBlur={saveTitle}
              onKeyPress={(e) => e.key === 'Enter' && saveTitle()}
              style={{ fontSize: '1.125rem', fontWeight: 700, padding: '0.25rem 0.5rem', marginBottom: '0.25rem' }}
            />
          ) : (
            <h3 
              onClick={() => setIsEditingTitle(true)}
              style={{ fontSize: '1.125rem', fontWeight: 700, cursor: 'pointer' }}
            >
              {category.name}
            </h3>
          )}
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
            {completedCount}/{category.tasks.length} Completed
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.25rem' }}>
          <button onClick={() => setIsAdding(!isAdding)} className="btn-icon" style={{ width: '2rem', height: '2rem' }}>
            {isAdding ? <X size={14} /> : <Plus size={14} />}
          </button>
          <button onClick={() => onDeleteCategory(category.id)} className="btn-icon" style={{ width: '2rem', height: '2rem', color: '#ef4444' }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          style={{ height: '100%', background: 'var(--accent-color)' }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '300px', overflowY: 'auto', paddingRight: '4px' }}>
        <AnimatePresence>
          {category.tasks.map(task => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))}
        </AnimatePresence>
      </div>

      {isAdding && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}
        >
          <input 
            autoFocus
            placeholder="New skill..."
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            style={{ padding: '0.5rem 0.75rem', fontSize: '0.875rem' }}
          />
          <button onClick={addTask} className="btn-primary" style={{ padding: '0.5rem' }}>
            <Plus size={18} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CategoryCard;
