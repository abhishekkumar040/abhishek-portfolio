import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';
import { SERVICES_DATA } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ServiceRowProps {
  service: (typeof SERVICES_DATA)[0];
  index: number;
  isDark: boolean;
}

const ServiceItemRow: React.FC<ServiceRowProps> = ({
  service,
  index,
  isDark,
}) => {
  const rowRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springConfig = { damping: 24, stiffness: 280 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Subtle tactile 3D tilt (max 2.5 degrees for an elegant, non-distracting feel)
  const rotateX = useTransform(smoothMouseY, [0, 1], [2.5, -2.5]);
  const rotateY = useTransform(smoothMouseX, [0, 1], [-2.5, 2.5]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef.current) return;
    const rect = rowRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const title = service.name;
  const desc = service.description;

  return (
    <motion.div
      ref={rowRef}
      data-cursor="expand"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{
        scale: 1.014,
        y: -3,
        transition: { type: 'spring', stiffness: 350, damping: 25 },
      }}
      whileTap={{ scale: 0.995 }}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      className={`w-full py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-8 rounded-2xl sm:rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 md:gap-12 transition-all duration-300 group cursor-default relative overflow-hidden ${
        index !== 0
          ? isDark
            ? 'border-t border-[#0C0C0C]/15'
            : 'border-t border-white/15'
          : ''
      } ${
        isDark
          ? 'hover:bg-black/[0.035] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]'
          : 'hover:bg-white/[0.045] hover:shadow-[0_8px_30px_rgba(255,255,255,0.03)]'
      }`}
    >
      {/* Number on the left with interactive spring hover */}
      <div className="flex-shrink-0 flex items-center gap-4">
        <motion.span
          whileHover={{ scale: 1.08, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          className={`font-black leading-none select-none inline-block transition-colors duration-300 ${
            isDark ? 'text-[#0C0C0C]' : 'text-[#FAFAFC]'
          }`}
          style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
        >
          {service.number}
        </motion.span>
      </div>

      {/* Name + description stacked vertically in center/right */}
      <div className="flex flex-col gap-2 sm:gap-3 flex-1">
        <div className="flex items-center justify-between gap-4">
          <h3
            className={`font-medium uppercase tracking-wide transition-colors duration-300 ${
              isDark ? 'text-[#0C0C0C]' : 'text-[#FAFAFC]'
            }`}
            style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
          >
            {title}
          </h3>

          {/* Tactile animated arrow indicator that gently shifts on hover */}
          <motion.div
            initial={{ opacity: 0.35, x: 0 }}
            whileHover={{ opacity: 1, x: 5 }}
            className={`hidden md:flex items-center justify-center w-10 h-10 rounded-full border transition-all duration-300 ${
              isDark
                ? 'border-[#0C0C0C]/20 text-[#0C0C0C] group-hover:border-[#0C0C0C] group-hover:bg-[#0C0C0C] group-hover:text-white'
                : 'border-white/20 text-[#FAFAFC] group-hover:border-white group-hover:bg-white group-hover:text-[#0C0C0C]'
            }`}
          >
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.div>
        </div>

        <p
          className={`font-light leading-relaxed max-w-2xl transition-colors duration-300 ${
            isDark ? 'text-[#0C0C0C] opacity-60' : 'text-[#FAFAFC] opacity-75'
          }`}
          style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
        >
          {desc}
        </p>
      </div>
    </motion.div>
  );
};

export const ServicesSection: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="services"
      className={`relative w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 z-1 transition-all duration-700 ${
        isDark ? 'bg-[#FFFFFF] text-[#0C0C0C]' : 'bg-[#0C0C0C] text-[#FAFAFC]'
      } ${
        isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionProperty: 'opacity, transform, background-color, color',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="max-w-5xl mx-auto flex flex-col items-center">
        {/* Heading: "Services" */}
        <FadeIn delay={0.05} y={35} duration={0.8}>
          <h2
            className={`font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-28 transition-colors duration-300 ${
              isDark ? 'text-[#0C0C0C]' : 'text-[#FAFAFC]'
            }`}
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {t.services.heading}
          </h2>
        </FadeIn>

        {/* 4 Service Items in a vertical list */}
        <div className="w-full flex flex-col gap-2">
          {SERVICES_DATA.map((service, index) => (
            <FadeIn
              key={service.number}
              delay={0.1 + index * 0.08}
              y={24}
              duration={0.75}
              className="w-full"
            >
              <ServiceItemRow
                service={service}
                index={index}
                isDark={isDark}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};
