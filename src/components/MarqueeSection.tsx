import React, { useEffect, useRef, useState } from 'react';
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

export const MarqueeSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState(0);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = window.scrollY + rect.top;
      // Scroll offset calculated per spec:
      // (window.scrollY - sectionTop + window.innerHeight) * 0.3
      const calculatedOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      setOffset(calculatedOffset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial compute

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Row 1: first 11 images tripled per spec
  const row1Images = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
  // Row 2: remaining 10 images tripled per spec
  const row2Images = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

  // Translations per spec:
  // Row 1 moves RIGHT on scroll: translateX(offset - 200)
  // Row 2 moves LEFT on scroll: translateX(-(offset - 200))
  const row1Transform = `translate3d(${offset - 200}px, 0, 0)`;
  const row2Transform = `translate3d(${-(offset - 200)}px, 0, 0)`;

  return (
    <section
      ref={sectionRef}
      className={`relative w-full pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden select-none transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0C]' : 'bg-[#FAFAFC]'
      }`}
    >
      <div className="flex flex-col gap-3 w-full">
        {/* Row 1 - Moves RIGHT on scroll */}
        <div
          className="flex gap-3 w-max marquee-row"
          style={{
            transform: row1Transform,
            willChange: 'transform',
          }}
        >
          {row1Images.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className={`w-[280px] sm:w-[350px] md:w-[420px] h-[180px] sm:h-[225px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 group relative ${
                isDark
                  ? 'bg-[#16181C] border border-[#D7E2EA]/10 shadow-lg'
                  : 'bg-[#E5E9F0] border border-[#0C0C0C]/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
              }`}
            >
              <img
                src={src}
                alt={`Showcase item ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                  isDark
                    ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                    : 'bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Row 2 - Moves LEFT on scroll */}
        <div
          className="flex gap-3 w-max marquee-row"
          style={{
            transform: row2Transform,
            willChange: 'transform',
          }}
        >
          {row2Images.map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className={`w-[280px] sm:w-[350px] md:w-[420px] h-[180px] sm:h-[225px] md:h-[270px] flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-300 group relative ${
                isDark
                  ? 'bg-[#16181C] border border-[#D7E2EA]/10 shadow-lg'
                  : 'bg-[#E5E9F0] border border-[#0C0C0C]/10 shadow-[0_8px_24px_rgba(0,0,0,0.06)]'
              }`}
            >
              <img
                src={src}
                alt={`Showcase item ${idx + 1}`}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className={`absolute inset-0 transition-opacity duration-300 pointer-events-none ${
                  isDark
                    ? 'bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                    : 'bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100'
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
