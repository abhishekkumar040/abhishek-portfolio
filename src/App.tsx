import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSection } from './components/HeroSection';
import { MarqueeSection } from './components/MarqueeSection';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { ProjectCard } from './data/portfolioData';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { ScrollProgressBar } from './ui/ScrollProgressBar';
import { CustomCursor } from './ui/CustomCursor';
import { SEOHead } from './components/SEOHead';
import { GeminiChatbot } from './components/GeminiChatbot';
import { BackToTop } from './components/BackToTop';

function PortfolioLanding() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectCard | null>(null);
  const { isDark, theme } = useTheme();
  const isFirstMount = useRef(true);

  useEffect(() => {
    isFirstMount.current = false;
  }, []);

  const handleOpenContact = () => {
    setIsContactOpen(true);
  };

  const handleCloseContact = () => {
    setIsContactOpen(false);
  };

  const handleOpenProject = (project: ProjectCard) => {
    setSelectedProject(project);
  };

  const handleCloseProject = () => {
    setSelectedProject(null);
  };

  return (
    <motion.div
      initial={false}
      animate={{
        backgroundColor: isDark ? '#0C0C0C' : '#FAFAFC',
        color: isDark ? '#D7E2EA' : '#0C0C0C',
      }}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
      }}
      className={`relative w-full min-h-screen font-['Kanit',sans-serif] selection:bg-[#B600A8] selection:text-white transition-colors duration-500 ${
        isDark ? 'bg-[#0C0C0C] text-[#D7E2EA]' : 'bg-[#FAFAFC] text-[#0C0C0C]'
      }`}
      style={{ overflowX: 'clip' }}
    >
      {/* React Helmet for Dynamic Document Title, Meta Description & SEO */}
      <SEOHead isContactModalOpen={isContactOpen} />

      {/* Custom non-intrusive physics-based cursor follower */}
      <CustomCursor />

      {/* Slim, fixed scroll progress indicator at the top of the viewport */}
      <ScrollProgressBar />

      {/* Subtle page-wide crossfade animation layer on theme switch */}
      <AnimatePresence mode="wait">
        {!isFirstMount.current && (
          <motion.div
            key={`crossfade-${theme}`}
            initial={{ opacity: 0.38 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            className="fixed inset-0 pointer-events-none z-[999]"
            style={{
              backgroundColor: isDark ? '#0C0C0C' : '#FAFAFC',
            }}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* 1. HERO SECTION */}
      <HeroSection onContactClick={handleOpenContact} />

      {/* 2. MARQUEE SECTION */}
      <MarqueeSection />

      {/* 3. ABOUT SECTION */}
      <AboutSection onContactClick={handleOpenContact} />

      {/* 4. SERVICES SECTION */}
      <ServicesSection />

      {/* 5. TESTIMONIALS SECTION (Horizontal Client Slider) */}
      <TestimonialsSection />

      {/* 6. PROJECTS SECTION */}
      <ProjectsSection onOpenProject={handleOpenProject} />

      {/* 6. FOOTER */}
      <Footer onContactClick={handleOpenContact} />

      {/* Floating Gemini AI Chatbot with Google Search Grounding */}
      <GeminiChatbot />

      {/* Floating Back to Top Action Button */}
      <BackToTop />

      {/* Interactive Modals */}
      <ContactModal isOpen={isContactOpen} onClose={handleCloseContact} />

      <ProjectDetailModal
        project={selectedProject}
        onClose={handleCloseProject}
        onContactClick={() => {
          setSelectedProject(null);
          setIsContactOpen(true);
        }}
      />
    </motion.div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <PortfolioLanding />
      </LanguageProvider>
    </ThemeProvider>
  );
}
