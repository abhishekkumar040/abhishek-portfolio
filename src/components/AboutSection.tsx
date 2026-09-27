import React from 'react';
import { Code2, Camera, Cpu, Sparkles, Github, Linkedin, ExternalLink } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';
import { AnimatedText } from '../ui/AnimatedText';
import { ContactButton } from '../ui/ContactButton';
import { PROFILE_INFO } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface AboutSectionProps {
  onContactClick: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onContactClick }) => {
  const { isDark } = useTheme();
  const { t, isHindi } = useLanguage();
  const [sectionRef, isSectionVisible] = useIntersectionObserver<HTMLElement>({
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px',
  });

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`relative w-full min-h-screen flex items-center justify-center px-5 sm:px-8 md:px-12 py-20 sm:py-28 overflow-hidden transition-all duration-700 ${
        isDark ? 'bg-[#0C0C0C]' : 'bg-[#FAFAFC]'
      } ${
        isSectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{
        transitionProperty: 'opacity, transform, background-color',
        transitionDuration: '700ms',
        transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Decorative background icons positioned safely in outer corners */}
      {/* Top-left: Code2 icon */}
      <FadeIn
        delay={0.1}
        x={-50}
        y={0}
        duration={0.85}
        className="absolute top-[4%] left-[2%] sm:left-[3%] md:left-[4%] pointer-events-none z-0 select-none"
      >
        <Code2
          className={`transition-all duration-300 ${
            isDark ? 'text-[#D7E2EA] opacity-15' : 'text-[#0C0C0C] opacity-10'
          }`}
          strokeWidth={1}
          style={{ width: 'clamp(90px, 11vw, 160px)', height: 'clamp(90px, 11vw, 160px)' }}
        />
      </FadeIn>

      {/* Top-right: Cpu icon */}
      <FadeIn
        delay={0.15}
        x={50}
        y={0}
        duration={0.85}
        className="absolute top-[4%] right-[2%] sm:right-[3%] md:right-[4%] pointer-events-none z-0 select-none"
      >
        <Cpu
          className={`transition-all duration-300 ${
            isDark ? 'text-[#D7E2EA] opacity-15' : 'text-[#0C0C0C] opacity-10'
          }`}
          strokeWidth={1}
          style={{ width: 'clamp(90px, 11vw, 160px)', height: 'clamp(90px, 11vw, 160px)' }}
        />
      </FadeIn>

      {/* Bottom-left: Camera icon */}
      <FadeIn
        delay={0.2}
        x={-50}
        y={0}
        duration={0.85}
        className="absolute bottom-[4%] left-[2%] sm:left-[3%] md:left-[4%] pointer-events-none z-0 select-none"
      >
        <Camera
          className={`transition-all duration-300 ${
            isDark ? 'text-[#D7E2EA] opacity-10' : 'text-[#0C0C0C] opacity-10'
          }`}
          strokeWidth={1}
          style={{ width: 'clamp(80px, 9vw, 140px)', height: 'clamp(80px, 9vw, 140px)' }}
        />
      </FadeIn>

      {/* Bottom-right: Sparkles icon */}
      <FadeIn
        delay={0.25}
        x={50}
        y={0}
        duration={0.85}
        className="absolute bottom-[4%] right-[2%] sm:right-[3%] md:right-[4%] pointer-events-none z-0 select-none"
      >
        <Sparkles
          className={`transition-all duration-300 ${
            isDark ? 'text-[#D7E2EA] opacity-10' : 'text-[#0C0C0C] opacity-10'
          }`}
          strokeWidth={1}
          style={{ width: 'clamp(90px, 10vw, 150px)', height: 'clamp(90px, 10vw, 150px)' }}
        />
      </FadeIn>

      {/* Unified Center Stack: Heading, Bio & Centered Action Buttons */}
      <div className="relative z-10 max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        {/* Heading: "ABOUT ME" */}
        <FadeIn delay={0.05} y={35} duration={0.8} className="w-full flex justify-center text-center">
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight mb-8 sm:mb-12 select-none text-center"
            style={{ fontSize: 'clamp(3rem, 11vw, 140px)' }}
          >
            {t.about.heading}
          </h2>
        </FadeIn>

        {/* Paragraph: "I'm a final-year Computer Science Engineering student..." using Plus Jakarta Sans */}
        <FadeIn delay={0.15} y={25} duration={0.8} className="flex justify-center w-full max-w-[700px] mx-auto px-2 sm:px-4 mb-10 sm:mb-14">
          <AnimatedText
            text={PROFILE_INFO.aboutText}
            className={`font-normal sm:font-medium text-center transition-colors duration-300 text-[1.05rem] sm:text-[1.2rem] md:text-[1.28rem] ${
              isDark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]'
            }`}
            style={{
              fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              lineHeight: 1.9,
            }}
          />
        </FadeIn>

        {/* All Buttons Perfectly Centered in the middle of the page */}
        <FadeIn delay={0.25} y={20} duration={0.8} className="w-full flex flex-col items-center justify-center text-center mx-auto">
          <div className="flex flex-col items-center justify-center gap-6 sm:gap-7 w-full max-w-xl mx-auto text-center">
            {/* GitHub & LinkedIn Links - Centered Row */}
            <div className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-5 w-full text-center">
              {/* GitHub Button */}
              <a
                href={PROFILE_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile (abhishekkumar040)"
                className={`group flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-200 text-xs sm:text-sm font-medium tracking-wide shadow-md hover:scale-105 active:scale-95 ${
                  isDark
                    ? 'border-[#D7E2EA]/30 bg-white/5 hover:bg-white/10 text-white hover:border-white/70'
                    : 'border-[#0C0C0C]/25 bg-[#0C0C0C]/5 hover:bg-[#0C0C0C]/10 text-[#0C0C0C] hover:border-[#0C0C0C]/60'
                }`}
              >
                <Github className="w-4 h-4 sm:w-4.5 sm:h-4.5 transition-transform group-hover:scale-110 flex-shrink-0" />
                <span className="font-semibold">GitHub</span>
                <span className={`text-[11px] sm:text-xs font-mono opacity-70 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  @abhishekkumar040
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
              </a>

              {/* LinkedIn Button */}
              <a
                href={PROFILE_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile (Abhishek Kumar)"
                className={`group flex items-center justify-center gap-2.5 sm:gap-3 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full border transition-all duration-200 text-xs sm:text-sm font-medium tracking-wide shadow-md hover:scale-105 active:scale-95 ${
                  isDark
                    ? 'border-[#0077B5]/45 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-white hover:border-[#0077B5]'
                    : 'border-[#0077B5]/45 bg-[#0077B5]/10 hover:bg-[#0077B5]/20 text-[#0077B5] hover:border-[#0077B5]'
                }`}
              >
                <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0077B5] transition-transform group-hover:scale-110 flex-shrink-0" />
                <span className="font-semibold">LinkedIn</span>
                <span className={`text-[11px] sm:text-xs font-mono opacity-70 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  Abhishek Kumar
                </span>
                <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity ml-0.5" />
              </a>
            </div>

            {/* Contact Me Button - Cleanly Centered */}
            <div className="flex items-center justify-center w-full text-center">
              <ContactButton onClick={onContactClick} label={isHindi ? 'संपर्क करें' : 'Contact Me'} />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
};
