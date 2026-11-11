import { Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button
      id="theme-toggle"
      onClick={toggleTheme}
      className="relative w-9 h-9 rounded-lg bg-input border border-border hover:bg-muted transition-colors flex items-center justify-center"
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <motion.div
        initial={false}
        animate={{ rotate: darkMode ? 180 : 0, scale: [1, 0.8, 1] }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-chart-4" />
        ) : (
          <Moon className="w-5 h-5 text-primary" />
        )}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;
