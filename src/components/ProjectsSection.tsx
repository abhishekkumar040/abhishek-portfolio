import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FadeIn } from '../ui/FadeIn';
import { LiveProjectButton } from '../ui/LiveProjectButton';
import { TiltCard } from '../ui/TiltCard';
import { PROJECTS_DATA, ProjectCard } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface ProjectCardProps {
  project: ProjectCard;
  index: number;
  totalCards: number;
  onOpenProject: (project: ProjectCard) => void;
}

// Custom glow palettes per project for vibrant tactile ambience
const PROJECT_GLOWS = [
  {
    gradient: 'from-cyan-500/25 via-blue-600/20 to-purple-600/25',
    borderGlow: 'hover:border-cyan-400/50',
    ribbonBg: 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white',
    accentText: 'text-cyan-400',
    innerGlow: 'radial-gradient(ellipse at 50% 0%, rgba(6,182,212,0.18) 0%, rgba(37,99,235,0.08) 50%, transparent 80%)',
    ribbonLabel: 'CASE STUDY • VOL. 01',
  },
  {
    gradient: 'from-emerald-500/25 via-teal-600/20 to-blue-600/25',
    borderGlow: 'hover:border-emerald-400/50',
    ribbonBg: 'bg-gradient-to-b from-emerald-500 to-teal-600 text-white',
    accentText: 'text-emerald-400',
    innerGlow: 'radial-gradient(ellipse at 50% 0%, rgba(16,185,129,0.18) 0%, rgba(20,184,166,0.08) 50%, transparent 80%)',
    ribbonLabel: 'SECURITY AI • VOL. 02',
  },
  {
    gradient: 'from-rose-500/25 via-fuchsia-600/20 to-amber-500/25',
    borderGlow: 'hover:border-rose-400/50',
    ribbonBg: 'bg-gradient-to-b from-rose-500 to-amber-600 text-white',
    accentText: 'text-rose-400',
    innerGlow: 'radial-gradient(ellipse at 50% 0%, rgba(244,63,94,0.18) 0%, rgba(217,70,239,0.08) 50%, transparent 80%)',
    ribbonLabel: 'MEDIA & PR • VOL. 03',
  },
];

const ProjectCardItem: React.FC<ProjectCardProps> = ({
  project,
  index,
  totalCards,
  onOpenProject,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isDark } = useTheme();
  
  // Track scroll progress as this card reaches sticky point and is overlapped by next cards
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Dynamic scale and shadow transformation as subsequent cards stack on top
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92 - (totalCards - 1 - index) * 0.02]);
  const cardBrightness = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const stackShadow = useTransform(
    scrollYProgress,
    [0, 1],
    ['0 24px 60px rgba(0,0,0,0.5)', '0 10px 30px rgba(0,0,0,0.85)']
  );

  const glowTheme = PROJECT_GLOWS[index % PROJECT_GLOWS.length];

  return (
    <div
      ref={containerRef}
      className="sticky w-full h-[84vh] min-h-[580px] max-h-[820px] flex items-center justify-center mb-16 sm:mb-24 md:mb-32 [perspective:1400px]"
      style={{
        top: `calc(4.5rem + ${index * 36}px)`,
        zIndex: index + 10,
      }}
    >
      {/* Ambient Gradient Glow Aura behind Card on Hover */}
      <div
        className={`absolute inset-0 max-w-6xl mx-auto rounded-[50px] bg-gradient-to-r ${glowTheme.gradient} blur-3xl opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none -z-10`}
        style={{ transform: `scale(${0.96 + index * 0.02})` }}
      />

      {/* Main Tactile Book Card Container with Layer Overlap */}
      <motion.div
        data-cursor="expand"
        style={{
          scale,
          filter: isDark ? undefined : undefined,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          y: -14,
          rotateY: -2.5,
          rotateX: 1.4,
          scale: 1.015,
          transition: { type: 'spring', stiffness: 340, damping: 20 },
        }}
        className={`group relative w-full h-full max-w-6xl mx-auto rounded-[36px] sm:rounded-[46px] md:rounded-[56px] border-2 p-4 sm:p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-500 select-none ${glowTheme.borderGlow} ${
          isDark
            ? 'border-[#D7E2EA]/30 bg-[#0C0C0C] shadow-[0_28px_70px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06),0_2px_12px_rgba(255,255,255,0.04)_inset]'
            : 'border-[#0C0C0C]/30 bg-[#FFFFFF] shadow-[0_28px_70px_rgba(0,0,0,0.18),0_0_0_1px_rgba(0,0,0,0.06),0_2px_12px_rgba(0,0,0,0.03)_inset]'
        }`}
      >
        {/* Layered Book Overlap Top Lip / Stacked Book Ridge */}
        <div
          className={`absolute -top-[1px] left-8 right-8 h-1 rounded-t-full pointer-events-none ${
            isDark
              ? 'bg-gradient-to-r from-transparent via-white/30 to-transparent'
              : 'bg-gradient-to-r from-transparent via-black/25 to-transparent'
          }`}
        />

        {/* Luminous Inner Gradient Glow on Hover */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{ background: glowTheme.innerGlow }}
        />

        {/* Dynamic Light Sheen sweep on hover */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.07] to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />

        {/* Book Effect Elements: Spine Binding, Hinge Crease & Stacked Pages */}
        {/* 1. Left Book Spine / Binding Groove */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-4 sm:w-6 border-r flex flex-col items-center justify-between py-6 pointer-events-none transition-colors duration-300 ${
            isDark
              ? 'bg-gradient-to-r from-black/80 via-white/[0.04] to-black/20 border-white/10'
              : 'bg-gradient-to-r from-black/10 via-black/[0.02] to-transparent border-black/10'
          }`}
        >
          {/* Spine stitch accents */}
          <div className="flex flex-col gap-8 opacity-40">
            <span className="w-1 h-3 rounded-full bg-current" />
            <span className="w-1 h-3 rounded-full bg-current" />
            <span className="w-1 h-3 rounded-full bg-current" />
          </div>
          <div className="writing-mode-vertical text-[9px] tracking-widest uppercase opacity-40 font-mono rotate-180 hidden sm:block">
            VOL. {project.number}
          </div>
          <div className="flex flex-col gap-8 opacity-40">
            <span className="w-1 h-3 rounded-full bg-current" />
            <span className="w-1 h-3 rounded-full bg-current" />
          </div>
        </div>

        {/* 2. Stacked Pages Layer Edge (Right & Bottom Depth) */}
        <div
          className={`absolute right-1.5 top-8 bottom-8 w-1 rounded-r opacity-50 pointer-events-none ${
            isDark
              ? 'bg-gradient-to-b from-white/20 via-white/5 to-white/20 shadow-[-1px_0_2px_rgba(255,255,255,0.1)]'
              : 'bg-gradient-to-b from-black/20 via-black/5 to-black/20 shadow-[-1px_0_2px_rgba(0,0,0,0.1)]'
          }`}
        />
        <div
          className={`absolute right-3 top-10 bottom-10 w-0.5 rounded-r opacity-30 pointer-events-none ${
            isDark ? 'bg-white/15' : 'bg-black/15'
          }`}
        />

        {/* 3. Silk Bookmark Ribbon */}
        <div className="absolute top-0 right-10 sm:right-16 z-20 pointer-events-none">
          <div
            className={`px-3 pt-2 pb-2.5 shadow-lg ${glowTheme.ribbonBg} flex flex-col items-center justify-center font-mono text-[9px] sm:text-[10px] tracking-wider uppercase font-bold relative`}
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 6px), 50% 100%, 0 calc(100% - 6px))',
            }}
          >
            <span>{glowTheme.ribbonLabel}</span>
          </div>
        </div>

        {/* Top Row: Number, category, title, Live Demo button */}
        <div
          className={`relative z-10 pl-5 sm:pl-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b transition-colors duration-300 ${
            isDark ? 'border-[#D7E2EA]/15' : 'border-[#0C0C0C]/15'
          }`}
        >
          <div className="flex items-baseline gap-4 sm:gap-6 flex-wrap">
            {/* Number */}
            <motion.span
              whileHover={{ scale: 1.08, rotate: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
              className={`font-black leading-none select-none inline-block transition-colors duration-300 ${
                isDark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]'
              }`}
              style={{ fontSize: 'clamp(2.5rem, 6vw, 90px)' }}
            >
              {project.number}
            </motion.span>

            {/* Category & Project Title */}
            <motion.div
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 380, damping: 22 }}
              className="flex items-center gap-3 flex-wrap cursor-pointer"
              onClick={() => onOpenProject(project)}
            >
              <span
                className={`uppercase tracking-widest text-xs sm:text-sm font-light transition-colors duration-300 ${
                  isDark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/60'
                }`}
              >
                ({project.category})
              </span>
              <h3
                className={`font-medium uppercase tracking-wide text-xl sm:text-2xl md:text-3xl lg:text-4xl transition-colors duration-300 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${
                  isDark
                    ? 'text-[#D7E2EA] group-hover:from-white group-hover:via-cyan-200 group-hover:to-white'
                    : 'text-[#0C0C0C] group-hover:from-gray-900 group-hover:via-blue-800 group-hover:to-gray-900'
                }`}
              >
                {project.title}
              </h3>
            </motion.div>
          </div>

          {/* Live Project ghost button */}
          <div className="flex-shrink-0 self-start sm:self-auto pr-1 sm:pr-2">
            <LiveProjectButton
              href={project.liveUrl}
              onClick={!project.liveUrl ? () => onOpenProject(project) : undefined}
              label="Live Demo"
            />
          </div>
        </div>

        {/* Bottom Row: Two-column image grid with book spread feel */}
        <div className="relative z-10 pl-5 sm:pl-7 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 md:gap-5 flex-1 pt-4 overflow-hidden min-h-0">
          {/* Left Column: 2 stacked images (Left Book Page Spread) */}
          <div className="md:col-span-5 flex flex-col gap-3 sm:gap-4 h-full overflow-hidden">
            {/* Left Top Image */}
            <TiltCard
              maxTilt={5}
              scaleHover={1.03}
              className={`w-full rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden border relative group/card cursor-pointer flex-shrink-0 shadow-md transition-all duration-300 ${
                isDark
                  ? 'border-[#D7E2EA]/20 bg-[#16181C] hover:border-white/40'
                  : 'border-[#0C0C0C]/15 bg-[#F1F3F5] hover:border-black/30'
              }`}
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.col1Image1}
                alt={`${project.title} - ${project.col1Image1Label}`}
                className="w-full h-full object-cover object-top transition-transform duration-700 group-hover/card:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {project.col1Image1Label}
                </span>
              </div>
            </TiltCard>

            {/* Left Bottom Image */}
            <TiltCard
              maxTilt={5}
              scaleHover={1.03}
              className={`w-full rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden border relative group/card cursor-pointer flex-1 shadow-md transition-all duration-300 ${
                isDark
                  ? 'border-[#D7E2EA]/20 bg-[#16181C] hover:border-white/40'
                  : 'border-[#0C0C0C]/15 bg-[#F1F3F5] hover:border-black/30'
              }`}
              style={{ minHeight: 'clamp(160px, 22vw, 340px)' }}
              onClick={() => onOpenProject(project)}
            >
              <img
                src={project.col1Image2}
                alt={`${project.title} - ${project.col1Image2Label}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-108"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-xs sm:text-sm font-medium">
                  {project.col1Image2Label}
                </span>
              </div>
            </TiltCard>
          </div>

          {/* Right Column: 1 tall showcase image (Right Book Page Spread) */}
          <TiltCard
            maxTilt={4}
            scaleHover={1.025}
            className={`md:col-span-7 h-full rounded-[20px] sm:rounded-[30px] md:rounded-[40px] overflow-hidden border relative group/card cursor-pointer shadow-md transition-all duration-300 ${
              isDark
                ? 'border-[#D7E2EA]/20 bg-[#16181C] hover:border-white/40'
                : 'border-[#0C0C0C]/15 bg-[#F1F3F5] hover:border-black/30'
            }`}
            onClick={() => onOpenProject(project)}
          >
            <img
              src={project.col2Image}
              alt={`${project.title} - ${project.col2ImageLabel}`}
              className="w-full h-full object-cover object-center transition-transform duration-700 group-hover/card:scale-106"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-end p-5">
              <div>
                <p className="text-white text-sm sm:text-base font-medium">
                  {project.col2ImageLabel}
                </p>
                <div className="flex gap-2 flex-wrap mt-2.5">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-medium text-white bg-white/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </TiltCard>
        </div>
      </motion.div>
    </div>
  );
};

interface ProjectsSectionProps {
  onOpenProject: (project: ProjectCard) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onOpenProject }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.04,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="projects"
      className={`relative w-full rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 z-10 px-5 sm:px-8 md:px-10 pt-20 sm:pt-24 md:pt-32 pb-44 transition-all duration-700 ${
        isDark ? 'bg-[#0C0C0C]' : 'bg-[#FAFAFC]'
      } ${
        isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionProperty: 'opacity, transform, background-color',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        {/* Heading: "Projects" using .hero-heading gradient text */}
        <FadeIn delay={0.05} y={35} duration={0.8}>
          <h2
            className="hero-heading font-black uppercase text-center leading-none tracking-tight mb-16 sm:mb-20 md:mb-24 select-none"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            {t.projects.heading}
          </h2>
        </FadeIn>

        {/* Sticky-stacking layered book project cards */}
        <div className="w-full relative pb-16">
          {PROJECTS_DATA.map((project, index) => (
            <ProjectCardItem
              key={project.id}
              project={project}
              index={index}
              totalCards={PROJECTS_DATA.length}
              onOpenProject={onOpenProject}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
