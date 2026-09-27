import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote, Sparkles, MessageSquareQuote } from 'lucide-react';
import { TESTIMONIALS, Testimonial } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { FadeIn } from '../ui/FadeIn';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const TestimonialsSection: React.FC = () => {
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = TESTIMONIALS.length;

  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total]);

  // Autoplay slider with gentle 6.5-second interval (pauses when user hovers)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'ArrowRight') handleNext();
  };

  const currentTestimonial: Testimonial = TESTIMONIALS[currentIndex];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full py-20 sm:py-28 md:py-36 px-5 sm:px-8 md:px-12 transition-all duration-700 overflow-hidden outline-none ${
        isDark ? 'bg-[#0C0C0C]' : 'bg-[#FAFAFC]'
      } ${
        isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{
        transitionProperty: 'opacity, transform, background-color',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      aria-label="Client feedback and testimonials"
    >
      {/* Background ambient gradient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full blur-[140px] pointer-events-none opacity-20 dark:opacity-15"
        style={{
          background: 'radial-gradient(circle, #06B6D4 0%, #2563EB 50%, #7C3AED 100%)',
        }}
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <FadeIn delay={0.05} y={25} duration={0.8}>
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase border border-cyan-500/30 bg-cyan-500/10 text-cyan-400">
                <Sparkles className="w-3.5 h-3.5" />
                Collaborations & Endorsements
              </span>
            </div>
            <h2
              className="hero-heading font-black uppercase leading-none tracking-tight select-none"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 100px)' }}
            >
              {t.testimonials.heading}
            </h2>
          </FadeIn>

          {/* Slider Controls (Desktop & Tablet) */}
          <FadeIn delay={0.15} y={25} duration={0.8}>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className={`text-xs sm:text-sm font-mono tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-bold text-cyan-500 text-sm sm:text-base">0{currentIndex + 1}</span>
                <span className="opacity-40"> / 0{total}</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  title="Previous testimonial"
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
                    isDark
                      ? 'border-white/15 bg-white/5 hover:bg-white/15 text-white hover:border-cyan-400/50'
                      : 'border-black/15 bg-black/5 hover:bg-black/15 text-[#0C0C0C] hover:border-blue-500/50'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  title="Next testimonial"
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-sm ${
                    isDark
                      ? 'border-white/15 bg-white/5 hover:bg-white/15 text-white hover:border-cyan-400/50'
                      : 'border-black/15 bg-black/5 hover:bg-black/15 text-[#0C0C0C] hover:border-blue-500/50'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Featured Testimonial Slider Stage */}
        <FadeIn delay={0.2} y={30} duration={0.85} className="relative w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial.id}
              initial={{ opacity: 0, x: 40, filter: 'blur(4px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -40, filter: 'blur(4px)' }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className={`relative rounded-3xl p-6 sm:p-10 md:p-14 border backdrop-blur-md transition-all duration-300 shadow-xl ${
                isDark
                  ? 'border-white/10 bg-[#121214]/80 shadow-[0_20px_50px_rgba(0,0,0,0.5)]'
                  : 'border-black/10 bg-white/90 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
              }`}
            >
              {/* Top Accent Pill: Project Tag & Star Rating */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border ${
                      isDark
                        ? 'border-white/15 bg-white/5 text-gray-200'
                        : 'border-black/10 bg-black/5 text-gray-800'
                    }`}
                  >
                    <MessageSquareQuote className="w-3.5 h-3.5 text-cyan-400" />
                    {currentTestimonial.projectTag}
                  </span>
                  <span className={`text-xs font-mono opacity-50 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                    {currentTestimonial.year}
                  </span>
                </div>

                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(currentTestimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]"
                    />
                  ))}
                </div>
              </div>

              {/* Quote content */}
              <div className="relative mb-8 sm:mb-12">
                <Quote
                  className={`absolute -top-3 sm:-top-5 -left-2 sm:-left-4 w-8 sm:w-12 h-8 sm:h-12 pointer-events-none opacity-15 ${
                    isDark ? 'text-cyan-400' : 'text-blue-500'
                  }`}
                />
                <p
                  className={`relative z-10 text-lg sm:text-2xl md:text-3xl leading-relaxed sm:leading-relaxed font-normal ${
                    isDark ? 'text-[#E2EDF5]' : 'text-[#1A1A1A]'
                  }`}
                  style={{
                    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                    letterSpacing: '-0.01em',
                  }}
                >
                  "{currentTestimonial.quote}"
                </p>
              </div>

              {/* Author Info Bar */}
              <div className="flex items-center justify-between flex-wrap gap-4 pt-6 border-t border-white/10 dark:border-white/10 border-black/10">
                <div className="flex items-center gap-4">
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.name}
                    className="w-13 h-13 sm:w-15 sm:h-15 rounded-full object-cover border-2 border-cyan-400/50 shadow-md flex-shrink-0"
                    loading="lazy"
                  />
                  <div>
                    <h3
                      className={`text-base sm:text-lg font-bold tracking-tight ${
                        isDark ? 'text-white' : 'text-[#0C0C0C]'
                      }`}
                    >
                      {currentTestimonial.name}
                    </h3>
                    <p
                      className={`text-xs sm:text-sm font-medium ${
                        isDark ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {currentTestimonial.role}{' '}
                      <span className="text-cyan-500 font-semibold">• {currentTestimonial.organization}</span>
                    </p>
                  </div>
                </div>

                {/* Micro Verified Badge */}
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Verified Collaboration
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>

        {/* Mini Preview Strip (Clickable Thumbnails / Dots) */}
        <FadeIn delay={0.28} y={20} duration={0.8} className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Pagination Dots */}
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, index) => {
              const isActive = index === currentIndex;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Jump to testimonial by ${t.name}`}
                  className="p-1 cursor-pointer focus:outline-none"
                >
                  <span
                    className={`h-2.5 rounded-full transition-all duration-300 inline-block ${
                      isActive
                        ? 'w-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 shadow-[0_0_10px_rgba(6,182,212,0.6)]'
                        : 'w-2.5 bg-gray-400/30 hover:bg-gray-400/60'
                    }`}
                  />
                </button>
              );
            })}
          </div>

          {/* Quick collaborator thumbnail preview */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full py-1">
            {TESTIMONIALS.map((item, idx) => {
              const active = idx === currentIndex;
              return (
                <button
                  key={`thumb-${item.id}`}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all duration-200 text-xs cursor-pointer ${
                    active
                      ? 'border-cyan-400 bg-cyan-400/10 text-cyan-300 font-semibold scale-105'
                      : isDark
                      ? 'border-white/10 bg-white/5 text-gray-400 hover:text-white hover:border-white/20'
                      : 'border-black/10 bg-black/5 text-gray-600 hover:text-black hover:border-black/20'
                  }`}
                >
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-5 h-5 rounded-full object-cover flex-shrink-0"
                  />
                  <span className="truncate max-w-[100px] sm:max-w-[130px]">{item.name.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
