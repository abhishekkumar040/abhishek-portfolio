import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

export const ScrollProgressBar: React.FC = () => {
  const { scrollYProgress } = useScroll();

  // Smooth out scroll progress using spring physics for a silky feel
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[3px] sm:h-[3.5px] z-[100] pointer-events-none"
      role="progressbar"
      aria-label="Page scroll progress"
    >
      {/* Background track (subtle translucent backdrop) */}
      <div className="absolute inset-0 bg-black/10 dark:bg-white/5" />

      {/* Dynamic progress bar fill */}
      <motion.div
        className="h-full w-full origin-left bg-gradient-to-r from-[#06B6D4] via-[#2563EB] to-[#7C3AED] shadow-[0_0_10px_rgba(37,99,235,0.65)]"
        style={{ scaleX }}
      />
    </div>
  );
};
