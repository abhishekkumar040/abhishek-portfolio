import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface LiveProjectButtonProps {
  onClick?: () => void;
  href?: string;
  className?: string;
  label?: string;
}

export const LiveProjectButton: React.FC<LiveProjectButtonProps> = ({
  onClick,
  href,
  className = '',
  label = 'Live Project',
}) => {
  const { isDark } = useTheme();

  const themeClasses = isDark
    ? 'border-[#D7E2EA] text-[#D7E2EA] hover:bg-[#D7E2EA]/10'
    : 'border-[#0C0C0C] text-[#0C0C0C] hover:bg-[#0C0C0C]/10';

  const content = (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={`rounded-full border-2 font-medium uppercase tracking-widest cursor-pointer px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base transition-colors duration-200 select-none inline-flex items-center justify-center gap-2 ${themeClasses} ${className}`}
    >
      <span>{label}</span>
      <span className="text-xs transition-transform group-hover:translate-x-0.5">↗</span>
    </motion.button>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="inline-block group">
        {content}
      </a>
    );
  }

  return content;
};
