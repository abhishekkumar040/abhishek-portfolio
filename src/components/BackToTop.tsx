import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const BackToTop: React.FC = () => {
  const { isDark } = useTheme();
  const [isScrolling, setIsScrolling] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPastHero, setIsPastHero] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const checkScrollPosition = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate hero section height dynamically
      const heroElement = document.getElementById('hero');
      const heroHeight = heroElement ? heroElement.offsetHeight : window.innerHeight;
      
      // Past hero threshold (when user has scrolled through/past the hero section)
      const pastHeroThreshold = Math.max(heroHeight * 0.8, 400);
      const isPast = currentScrollY > pastHeroThreshold;

      setIsPastHero(isPast);

      if (isPast) {
        setIsScrolling(true);

        // Reset inactivity timer
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Hide after 1.2 seconds of no scroll activity
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 1200);
      } else {
        setIsScrolling(false);
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
      }
    };

    // Initial check on mount
    checkScrollPosition();

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    window.addEventListener('resize', checkScrollPosition, { passive: true });

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
      window.removeEventListener('resize', checkScrollPosition);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // Only show when the user is scrolled past the hero section AND actively scrolling (or hovering/touching)
  const shouldShow = isPastHero && (isScrolling || isHovered);

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 15 }}
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-40"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => {
            setTimeout(() => setIsHovered(false), 2000);
          }}
        >
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.92 }}
            aria-label="Scroll to top"
            title="Scroll to top"
            data-cursor="expand"
            className={`group relative w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center rounded-full backdrop-blur-md border shadow-[0_8px_30px_rgba(0,0,0,0.25)] transition-all duration-300 focus:outline-none focus:ring-2 p-1.5 cursor-pointer ${
              isDark
                ? 'bg-[#121418]/90 text-white border-white/20 hover:border-white focus:ring-white/40 shadow-[0_10px_35px_rgba(0,0,0,0.6)]'
                : 'bg-white/90 text-[#0C0C0C] border-[#0C0C0C]/15 hover:border-black focus:ring-black/20 shadow-[0_10px_30px_rgba(0,0,0,0.12)]'
            }`}
          >
            {/* Circular Scroll Progress Ring */}
            <div className="relative w-full h-full flex items-center justify-center">
              <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="transparent"
                  className={isDark ? 'text-white/15' : 'text-black/10'}
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="14"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="transparent"
                  strokeDasharray="88"
                  style={{
                    pathLength: smoothProgress,
                  }}
                  className={isDark ? 'text-white' : 'text-[#0C0C0C]'}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
