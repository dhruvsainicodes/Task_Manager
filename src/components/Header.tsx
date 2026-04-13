import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
      >
        <div className="btn-icon" style={{ borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent-color), var(--accent-secondary))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Sparkles size={20} />
        </div>
        <div>
          <h1 className="gradient-text" style={{ fontSize: '1.5rem', marginBottom: '0' }}>SkillCraft</h1>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Mastery Tracker</p>
        </div>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={toggleTheme}
        className="btn-icon"
        style={{ borderRadius: '50%' }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.button>
    </header>
  );
};

export default Header;
