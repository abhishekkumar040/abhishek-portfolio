import React from 'react';
import { motion } from 'framer-motion';
import { Music, VolumeX } from 'lucide-react';
import { useBackgroundMusic } from '../utils/backgroundMusic';
import { useTheme } from '../context/ThemeContext';

export const MusicToggle: React.FC = () => {
  const { isPlaying, togglePlay } = useBackgroundMusic();
  const { isDark } = useTheme();

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.8 }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
      onClick={togglePlay}
      title={isPlaying ? 'Mute background music' : 'Play background music'}
      aria-label={isPlaying ? 'Mute background music' : 'Play background music'}
      className={`fixed top-4 right-4 sm:top-6 sm:right-6 z-40 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border backdrop-blur-md transition-all duration-300 cursor-pointer ${
        isDark
          ? 'border-white/15 bg-white/5 hover:bg-white/20 text-[#D7E2EA] hover:text-white'
          : 'border-black/15 bg-black/5 hover:bg-black/10 text-[#0C0C0C] hover:text-black'
      }`}
    >
      {isPlaying ? (
        <Music className="w-4 h-4 sm:w-4.5 sm:h-4.5 animate-pulse" />
      ) : (
        <VolumeX className="w-4 h-4 sm:w-4.5 sm:h-4.5 opacity-60" />
      )}
    </motion.button>
  );
};
