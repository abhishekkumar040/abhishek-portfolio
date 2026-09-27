import React from 'react';
import { motion } from 'framer-motion';

interface ContactButtonProps {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export const ContactButton: React.FC<ContactButtonProps> = ({
  onClick,
  className = '',
  label = 'Contact Me',
}) => {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ scale: 1.05, filter: 'brightness(1.12)' }}
      whileTap={{ scale: 0.96 }}
      transition={{ duration: 0.2 }}
      className={`relative inline-flex items-center justify-center rounded-full text-white font-medium uppercase tracking-widest cursor-pointer px-8 py-3.5 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base select-none shadow-lg transition-all duration-300 ${className}`}
      style={{
        background: 'linear-gradient(135deg, #06B6D4 0%, #2563EB 50%, #7C3AED 100%)',
        boxShadow: '0px 6px 24px rgba(37, 99, 235, 0.45), inset 0px 1px 2px rgba(255, 255, 255, 0.55)',
        outline: '2px solid rgba(255, 255, 255, 0.9)',
        outlineOffset: '-3px',
      }}
    >
      <span className="drop-shadow-sm font-semibold tracking-wider">{label}</span>
    </motion.button>
  );
};
