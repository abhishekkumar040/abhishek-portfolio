import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { PROFILE_INFO } from '../data/portfolioData';

interface SectionMeta {
  title: string;
  description: string;
}

const SECTION_METADATA: Record<string, SectionMeta> = {
  hero: {
    title: 'Abhishek — Full-Stack MERN Developer & Content Creator',
    description:
      'Official portfolio of Abhishek — Computer Science Engineering student, Full-Stack MERN developer, ML engineer, and digital journalist with 150K+ community.',
  },
  about: {
    title: 'About Abhishek — Developer, ML Engineer & Digital Journalist',
    description:
      "I'm a final-year Computer Science Engineering student building full-stack MERN web platforms, explainable machine learning systems, and media storytelling.",
  },
  services: {
    title: 'Services & Technical Expertise — Web Platforms & AI | Abhishek',
    description:
      'High-impact services including MERN Stack Architecture, Explainable AI (SHAP/LIME), Digital Photojournalism, and Social Media Strategy.',
  },
  testimonials: {
    title: 'Client Endorsements & Testimonials — Full-Stack & ML | Abhishek',
    description:
      'Read verified reviews and feedback from research leads, founders, and media collaborators on engineering and production quality.',
  },
  projects: {
    title: 'Featured Projects — Back.Removal SaaS & Phishing AI | Abhishek',
    description:
      'Explore flagship engineering systems: AI background removal SaaS, 96% accuracy zero-day phishing detector, and ABHISHEK.MEDIAA press brand.',
  },
  contact: {
    title: 'Contact Abhishek — Software Inquiries & Media Partnerships',
    description:
      'Get in touch with Abhishek for software development, full-stack freelance projects, AI machine learning consulting, or content collaborations.',
  },
};

interface SEOHeadProps {
  isContactModalOpen?: boolean;
}

export const SEOHead: React.FC<SEOHeadProps> = ({ isContactModalOpen = false }) => {
  const [currentSection, setCurrentSection] = useState<string>('hero');

  useEffect(() => {
    if (isContactModalOpen) {
      setCurrentSection('contact');
      return;
    }

    const sectionIds = ['hero', 'about', 'services', 'testimonials', 'projects'];
    const sectionElements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (sectionElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find visible section with highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const topVisible = visibleEntries.reduce((prev, current) =>
            current.intersectionRatio > prev.intersectionRatio ? current : prev
          );
          if (topVisible.target.id && SECTION_METADATA[topVisible.target.id]) {
            setCurrentSection(topVisible.target.id);
          }
        }
      },
      {
        root: null,
        rootMargin: '-20% 0px -40% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sectionElements.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [isContactModalOpen]);

  const activeMeta = SECTION_METADATA[currentSection] || SECTION_METADATA.hero;

  // Schema.org structured data (JSON-LD) for rich search engine snippets
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: PROFILE_INFO.name,
    jobTitle: PROFILE_INFO.title,
    email: PROFILE_INFO.email,
    sameAs: [
      PROFILE_INFO.github,
      PROFILE_INFO.linkedin,
      PROFILE_INFO.instagram,
    ],
    description: activeMeta.description,
    knowsAbout: [
      'Full-Stack MERN Development',
      'React',
      'Node.js',
      'Express',
      'MongoDB',
      'Machine Learning',
      'XGBoost',
      'Explainable AI',
      'Photojournalism',
    ],
  };

  return (
    <Helmet>
      {/* Primary HTML Meta Tags */}
      <title>{activeMeta.title}</title>
      <meta name="description" content={activeMeta.description} />

      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={activeMeta.title} />
      <meta property="og:description" content={activeMeta.description} />
      <meta property="og:site_name" content="Abhishek Portfolio" />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={activeMeta.title} />
      <meta name="twitter:description" content={activeMeta.description} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
    </Helmet>
  );
};
