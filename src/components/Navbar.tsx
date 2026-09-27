import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';
import { NAV_ITEMS, PROFILE_INFO } from '../data/portfolioData';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface NavbarProps {
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onContactClick }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#contact') {
      e.preventDefault();
      onContactClick();
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full flex items-center justify-between px-6 md:px-10 pt-6 md:pt-8 z-30 relative"
      aria-label="Primary navigation"
    >
      {/* Primary Links */}
      {NAV_ITEMS.map((item) => {
        const isContact = item.label.toLowerCase() === 'contact';
        const displayLabel =
          item.label.toLowerCase() === 'about'
            ? t.nav.about
            : item.label.toLowerCase() === 'services'
            ? t.nav.services
            : item.label.toLowerCase() === 'projects'
            ? t.nav.projects
            : item.label.toLowerCase() === 'contact'
            ? t.nav.contact
            : item.label;

        if (isContact) {
          return (
            <div key={item.label} className="flex items-center gap-2 sm:gap-4 md:gap-6">
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 select-none cursor-pointer ${
                  isDark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]'
                }`}
              >
                {displayLabel}
              </a>
              {/* Theme Toggle and Social Links */}
              <div className="flex items-center gap-1 sm:gap-2">
                <ThemeToggle />
                <a
                  href={PROFILE_INFO.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub Profile (abhishekkumar040)"
                  title="GitHub Profile"
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110 active:scale-95 ${
                    isDark
                      ? 'border-white/15 bg-white/5 hover:bg-white/20 text-[#D7E2EA] hover:text-white'
                      : 'border-black/15 bg-black/5 hover:bg-black/10 text-[#0C0C0C] hover:text-black'
                  }`}
                >
                  <Github className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>
                <a
                  href={PROFILE_INFO.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn Profile (Abhishek Kumar)"
                  title="LinkedIn Profile"
                  className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full border transition-all duration-200 hover:scale-110 active:scale-95 ${
                    isDark
                      ? 'border-white/15 bg-white/5 hover:bg-white/20 text-[#D7E2EA] hover:text-[#0077B5]'
                      : 'border-black/15 bg-black/5 hover:bg-black/10 text-[#0C0C0C] hover:text-[#0077B5]'
                  }`}
                >
                  <Linkedin className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                </a>
              </div>
            </div>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item.href)}
            className={`font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem] hover:opacity-70 transition-opacity duration-200 select-none cursor-pointer ${
              isDark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]'
            }`}
          >
            {displayLabel}
          </a>
        );
      })}
    </motion.nav>
  );
};
