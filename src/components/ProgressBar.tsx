import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <div className="container" style={{ paddingTop: 0, paddingBottom: '3rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1rem' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Overall Progress</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              {progress === 100 ? 'Mastery Achieved! 🎉' : 'Keep up the momentum!'}
            </p>
          </div>
          <motion.span 
            key={progress}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{ fontSize: '2rem', fontWeight: 800 }} 
            className="gradient-text"
          >
            {Math.round(progress)}%
          </motion.span>
        </div>
        
        <div style={{ height: '1rem', background: 'var(--border-color)', borderRadius: '1rem', overflow: 'hidden' }}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(90deg, var(--accent-color), var(--accent-secondary))',
              borderRadius: '1rem',
              boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
