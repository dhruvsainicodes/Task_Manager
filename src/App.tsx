import React, { useMemo } from 'react';
import Header from './components/Header';
import ProgressBar from './components/ProgressBar';
import CategoryCard from './components/CategoryCard';
import { initialCategories } from './data/initialData';
import type { Category } from './data/initialData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, LayoutGrid } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const App: React.FC = () => {
  const [categories, setCategories] = useLocalStorage<Category[]>('skill-mastery-data', initialCategories);

  const totalTasks = useMemo(() => 
    categories.reduce((acc, cat) => acc + cat.tasks.length, 0), [categories]
  );
  
  const completedTasks = useMemo(() => 
    categories.reduce((acc, cat) => acc + cat.tasks.filter(t => t.completed).length, 0), [categories]
  );

  const overallProgress = totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const updateCategory = (categoryId: string, updates: Partial<Category>) => {
    setCategories(prev => prev.map(cat => 
      cat.id === categoryId ? { ...cat, ...updates } : cat
    ));
  };

  const deleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category and all its skills?')) {
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    }
  };

  const addCategory = () => {
    const newCategory: Category = {
      id: uuidv4(),
      name: 'New Category',
      tasks: []
    };
    setCategories(prev => [newCategory, ...prev]);
  };

  return (
    <div className="app-wrapper">
      <Header />
      <ProgressBar progress={overallProgress} />

      <main className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <LayoutGrid size={20} className="gradient-text" />
            <h2 style={{ fontSize: '1.5rem' }}>Skill Categories</h2>
          </div>
          <button onClick={addCategory} className="btn-primary">
            <Plus size={20} />
            <span>Add Category</span>
          </button>
        </div>

        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '1.5rem' 
          }}
        >
          <AnimatePresence>
            {categories.map(category => (
              <CategoryCard 
                key={category.id}
                category={category}
                onUpdateCategory={updateCategory}
                onDeleteCategory={deleteCategory}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      </main>
    </div>
  );
};

export default App;
