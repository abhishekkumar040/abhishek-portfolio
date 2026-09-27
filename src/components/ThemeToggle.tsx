import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isDark ? 'Switch to high-contrast light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to high-contrast light mode' : 'Switch to dark mode'}
      className={`group relative flex items-center justify-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-300 cursor-pointer select-none ${
        isDark
          ? 'border-[#D7E2EA]/30 hover:border-[#D7E2EA] bg-white/5 hover:bg-white/10 text-[#D7E2EA]'
          : 'border-[#0C0C0C]/30 hover:border-[#0C0C0C] bg-[#0C0C0C]/5 hover:bg-[#0C0C0C]/10 text-[#0C0C0C]'
      } ${className}`}
    >
      <div className="relative w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait" initial={false}>
          {isDark ? (
            <motion.div
              key="moon"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center text-amber-300"
            >
              <Moon className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300/20" strokeWidth={2} />
            </motion.div>
          ) : (
            <motion.div
              key="sun"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="absolute inset-0 flex items-center justify-center text-amber-600"
            >
              <Sun className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500/20" strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <span className="text-xs sm:text-sm font-medium uppercase tracking-wider hidden xs:inline-block">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </motion.button>
  );
};
