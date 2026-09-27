import React from 'react';
import { ArrowUp, Instagram, Github, Linkedin, Mail } from 'lucide-react';
import { PROFILE_INFO, NAV_ITEMS } from '../data/portfolioData';
import { SoundToggle } from './SoundToggle';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

interface FooterProps {
  onContactClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onContactClick }) => {
  const { isDark } = useTheme();
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="contact"
      className={`w-full px-6 md:px-12 py-12 md:py-16 z-10 relative transition-colors duration-300 border-t ${
        isDark
          ? 'bg-[#0C0C0C] border-[#D7E2EA]/10 text-[#D7E2EA]'
          : 'bg-[#FAFAFC] border-[#0C0C0C]/10 text-[#0C0C0C]'
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Brand & Title */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <span
            className={`text-xl sm:text-2xl font-black uppercase tracking-wider ${
              isDark ? 'text-white' : 'text-[#0C0C0C]'
            }`}
          >
            Abhishek
          </span>
          <p
            className={`text-xs sm:text-sm font-light mt-1 ${
              isDark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/60'
            }`}
          >
            {t.footer.tagline}
          </p>
        </div>

        {/* Quick Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8 flex-wrap justify-center">
          {NAV_ITEMS.map((item) => {
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

            return (
              <a
                key={`footer-${item.label}`}
                href={item.href}
                onClick={(e) => {
                  if (item.href === '#contact') {
                    e.preventDefault();
                    onContactClick();
                    return;
                  }
                  const target = document.querySelector(item.href);
                  if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className={`text-xs uppercase tracking-wider font-medium hover:opacity-70 transition-opacity ${
                  isDark ? 'text-[#D7E2EA]' : 'text-[#0C0C0C]'
                }`}
              >
                {displayLabel}
              </a>
            );
          })}
        </div>

        {/* Social Icons & Back to Top */}
        <div className="flex items-center gap-2">
          <SoundToggle />
          <a
            href={PROFILE_INFO.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition-colors ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-[#D7E2EA]'
                : 'bg-[#0C0C0C]/5 hover:bg-[#0C0C0C]/10 text-[#0C0C0C]'
            }`}
            title="Instagram Profile"
          >
            <Instagram className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition-colors ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-[#D7E2EA] hover:text-white'
                : 'bg-[#0C0C0C]/5 hover:bg-[#0C0C0C]/10 text-[#0C0C0C] hover:text-black'
            }`}
            title="GitHub Profile (abhishekkumar040)"
          >
            <Github className="w-4 h-4" />
          </a>
          <a
            href={PROFILE_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition-colors ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-[#D7E2EA] hover:text-[#0077B5]'
                : 'bg-[#0C0C0C]/5 hover:bg-[#0C0C0C]/10 text-[#0C0C0C] hover:text-[#0077B5]'
            }`}
            title="LinkedIn Profile (Abhishek Kumar)"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={onContactClick}
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
              isDark
                ? 'bg-white/5 hover:bg-white/10 text-[#D7E2EA]'
                : 'bg-[#0C0C0C]/5 hover:bg-[#0C0C0C]/10 text-[#0C0C0C]'
            }`}
            title="Email Abhishek"
          >
            <Mail className="w-4 h-4" />
          </button>

          {/* Back to top button */}
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            title="Back to top"
            className={`w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center rounded-full border transition-all cursor-pointer ${
              isDark
                ? 'border-[#D7E2EA]/30 hover:border-[#D7E2EA] bg-white/5 hover:bg-white/10 text-[#D7E2EA]'
                : 'border-[#0C0C0C]/30 hover:border-[#0C0C0C] bg-[#0C0C0C]/5 hover:bg-[#0C0C0C]/10 text-[#0C0C0C]'
            }`}
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};
