import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Navbar } from './Navbar';
import { HeroPortraitWithEffects } from './HeroPortraitWithEffects';
import { ContactButton } from '../ui/ContactButton';
import { PROFILE_INFO } from '../data/portfolioData';
import { Github, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [portraitImage, setPortraitImage] = useState<string>(PROFILE_INFO.heroPortraitImage);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const sectionRef = useRef<HTMLDivElement>(null);

  // Parallax Scroll Tracking
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Layer 1: Giant Heading Typography moves slower (descends gently with slight fade out)
  const headingY = useTransform(scrollYProgress, [0, 1], ['0px', '160px']);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);

  // Layer 2: Hero Portrait moves at medium parallax speed with subtle depth scale contraction
  const portraitY = useTransform(scrollYProgress, [0, 1], ['0px', '70px']);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);

  // Layer 3: Bottom Controls & Text float upward faster with soft opacity fade out
  const bottomBarY = useTransform(scrollYProgress, [0, 1], ['0px', '-50px']);
  const bottomBarOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className={`relative w-full h-screen min-h-[680px] flex flex-col justify-between overflow-x-clip transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0C]' : 'bg-[#FAFAFC]'
      }`}
    >
      {/* 1. Navbar */}
      <Navbar onContactClick={onContactClick} />

      {/* 2. Hero Heading (Background Typography Parallax Layer) */}
      <motion.div
        style={{ y: headingY, opacity: headingOpacity }}
        className="w-full overflow-hidden z-0 select-none pointer-events-none mt-6 sm:mt-4 md:-mt-5"
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
          className="w-full text-center"
        >
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw]">
            {t.hero.heading}
          </h1>
        </motion.div>
      </motion.div>

      {/* 3. Hero Portrait with Interactive Effects (Mid-ground Parallax Layer) */}
      <motion.div
        style={{ y: portraitY, scale: portraitScale }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[300px] sm:w-[380px] md:w-[460px] lg:w-[540px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <HeroPortraitWithEffects
          portraitImage={portraitImage}
          onImageChange={(newImg) => setPortraitImage(newImg)}
        />
      </motion.div>

      {/* 4. Bottom Bar (Foreground Parallax Layer) */}
      <motion.div
        style={{ y: bottomBarY, opacity: bottomBarOpacity }}
        className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20"
      >
        {/* Left text & quick socials */}
        <div className="flex flex-col gap-2.5 max-w-[170px] sm:max-w-[230px] md:max-w-[270px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className={`font-light uppercase tracking-wide leading-snug transition-colors duration-300 ${
              isDark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]'
            }`}
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="flex items-center gap-2 pt-0.5"
          >
            <a
              href={PROFILE_INFO.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile (abhishekkumar040)"
              title="GitHub Profile"
              className={`p-1.5 rounded-full border transition-transform hover:scale-110 active:scale-95 ${
                isDark
                  ? 'border-white/20 bg-white/5 hover:bg-white/15 text-[#D7E2EA] hover:text-white'
                  : 'border-black/20 bg-black/5 hover:bg-black/15 text-[#0C0C0C] hover:text-black'
              }`}
            >
              <Github className="w-3.5 h-3.5" />
            </a>
            <a
              href={PROFILE_INFO.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile (Abhishek Kumar)"
              title="LinkedIn Profile"
              className={`p-1.5 rounded-full border transition-transform hover:scale-110 active:scale-95 ${
                isDark
                  ? 'border-white/20 bg-white/5 hover:bg-white/15 text-[#D7E2EA] hover:text-[#0077B5]'
                  : 'border-black/20 bg-black/5 hover:bg-black/15 text-[#0C0C0C] hover:text-[#0077B5]'
              }`}
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </motion.div>
        </div>

        {/* Right Contact Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <ContactButton onClick={onContactClick} label={t.hero.contactBtn} />
        </motion.div>
      </motion.div>
    </section>
  );
};
