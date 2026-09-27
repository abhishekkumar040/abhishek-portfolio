import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface NavSection {
  id: string;
  label: string;
  shortLabel: string;
}

const SECTIONS: NavSection[] = [
  { id: 'hero', label: 'Home', shortLabel: '01' },
  { id: 'about', label: 'About', shortLabel: '02' },
  { id: 'services', label: 'Services', shortLabel: '03' },
  { id: 'testimonials', label: 'Clients', shortLabel: '04' },
  { id: 'projects', label: 'Projects', shortLabel: '05' },
  { id: 'contact', label: 'Contact', shortLabel: '06' },
];

export const RightStickyNav: React.FC = () => {
  const { isDark } = useTheme();
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(SECTIONS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden sm:flex flex-col items-end gap-3 pointer-events-auto">
      <div
        className={`flex flex-col items-center gap-2.5 p-2 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          isDark
            ? 'bg-[#121418]/70 border-white/15 shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : 'bg-white/70 border-black/15 shadow-[0_10px_30px_rgba(0,0,0,0.12)]'
        }`}
      >
        {SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id;
          const isHovered = hoveredSection === sec.id;

          return (
            <div
              key={sec.id}
              className="relative flex items-center group cursor-pointer"
              onMouseEnter={() => setHoveredSection(sec.id)}
              onMouseLeave={() => setHoveredSection(null)}
              onClick={() => scrollToSection(sec.id)}
            >
              {/* Tooltip on Hover */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: 10, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: 10, scale: 0.9 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute right-9 whitespace-nowrap px-2.5 py-1 rounded-md text-[11px] font-mono font-medium uppercase tracking-wider shadow-lg pointer-events-none ${
                      isDark
                        ? 'bg-white text-black font-semibold'
                        : 'bg-black text-white font-semibold'
                    }`}
                  >
                    {sec.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Indicator Dot / Pill */}
              <button
                type="button"
                aria-label={`Scroll to ${sec.label}`}
                className="relative flex items-center justify-center p-1 rounded-full cursor-pointer focus:outline-none"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? isDark
                        ? 'w-3 h-7 bg-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.8)]'
                        : 'w-3 h-7 bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.6)]'
                      : isDark
                      ? 'w-2.5 h-2.5 bg-white/30 hover:bg-white/70'
                      : 'w-2.5 h-2.5 bg-black/30 hover:bg-black/70'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
