import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from './Navbar';
import { ContactButton } from '../ui/ContactButton';
import { Magnet } from '../ui/Magnet';
import { PROFILE_INFO } from '../data/portfolioData';
import { Camera, Github, Linkedin } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroSectionProps {
  onContactClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onContactClick }) => {
  const [portraitImage, setPortraitImage] = useState<string>(PROFILE_INFO.heroPortraitImage);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPortraitImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <section
      id="hero"
      className={`relative w-full h-screen min-h-[680px] flex flex-col justify-between overflow-x-clip transition-colors duration-300 ${
        isDark ? 'bg-[#0C0C0C]' : 'bg-[#FAFAFC]'
      }`}
    >
      {/* 1. Navbar */}
      <Navbar onContactClick={onContactClick} />

      {/* 2. Hero Heading */}
      <div className="w-full overflow-hidden z-0 select-none pointer-events-none mt-6 sm:mt-4 md:-mt-5">
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
      </div>

      {/* 3. Hero Portrait with Magnet Mouse-Following Effect */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        className="absolute left-1/2 -translate-x-1/2 z-10 w-[280px] sm:w-[360px] md:w-[440px] lg:w-[520px] top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto"
      >
        <Magnet
          padding={150}
          strength={3}
          activeTransition="transform 0.3s ease-out"
          inactiveTransition="transform 0.6s ease-in-out"
          className="w-full flex justify-center group relative"
        >
          <div className="relative w-full">
            <img
              src={portraitImage}
              alt="Abhishek - Developer and Content Creator"
              className={`w-full h-auto max-h-[72vh] object-contain object-bottom select-none pointer-events-none transition-all duration-300 ${
                isDark
                  ? 'drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]'
                  : 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]'
              }`}
              loading="eager"
            />
            {/* Subtle bottom atmospheric blend overlay into current background */}
            <div
              className={`absolute inset-x-0 bottom-0 h-16 pointer-events-none transition-colors duration-300 ${
                isDark
                  ? 'bg-gradient-to-t from-[#0C0C0C] to-transparent'
                  : 'bg-gradient-to-t from-[#FAFAFC] to-transparent'
              }`}
            />

            {/* Quick-swap photo button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Replace with your own portrait photo (PNG/JPG)"
              className="absolute bottom-4 right-4 bg-[#18011F]/80 hover:bg-[#7621B0] text-white p-2 rounded-full border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg cursor-pointer"
            >
              <Camera className="w-4 h-4" />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />
          </div>
        </Magnet>
      </motion.div>

      {/* 4. Bottom Bar */}
      <div className="w-full flex justify-between items-end px-6 md:px-10 pb-7 sm:pb-8 md:pb-10 z-20">
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
      </div>
    </section>
  );
};
