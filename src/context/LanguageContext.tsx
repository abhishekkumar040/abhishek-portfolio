import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'hi';

export interface Translations {
  nav: {
    about: string;
    services: string;
    projects: string;
    contact: string;
    chatWithAi: string;
  };
  hero: {
    badge: string;
    heading: string;
    subtitle: string;
    contactBtn: string;
    exploreBtn: string;
    statusAvailable: string;
    scrollDown: string;
  };
  about: {
    heading: string;
    subheading: string;
    experience: string;
    statsFollowers: string;
    statsProjects: string;
    statsAcc: string;
    statsReach: string;
    educationTitle: string;
    skillsTitle: string;
  };
  services: {
    heading: string;
    subheading: string;
    viewDetails: string;
  };
  projects: {
    heading: string;
    subheading: string;
    liveDemo: string;
    viewCaseStudy: string;
    highlights: string;
    allTech: string;
  };
  testimonials: {
    heading: string;
    subheading: string;
    verified: string;
  };
  contact: {
    heading: string;
    subheading: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    subjectLabel: string;
    subjectPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    sendBtn: string;
    sending: string;
    sentSuccess: string;
  };
  footer: {
    tagline: string;
    quickLinks: string;
    socials: string;
    backToTop: string;
    rights: string;
  };
  chatbot: {
    title: string;
    subtitle: string;
    placeholder: string;
    send: string;
    clear: string;
    suggest1: string;
    suggest2: string;
    suggest3: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    nav: {
      about: 'About',
      services: 'Services',
      projects: 'Projects',
      contact: 'Contact',
      chatWithAi: 'Ask AI',
    },
    hero: {
      badge: 'Software Engineer & Creator',
      heading: "Hi, i'm abhishek",
      subtitle: 'a web developer and content creator driven by crafting striking and unforgettable experiences',
      contactBtn: "Let's Talk",
      exploreBtn: 'Explore Work',
      statusAvailable: 'Available for work',
      scrollDown: 'Scroll to explore',
    },
    about: {
      heading: 'About Me',
      subheading: 'Engineering Scalable Web Apps & Visual Journalism',
      experience: 'Final Year CSE Student & Creative Storyteller',
      statsFollowers: 'Social Reach',
      statsProjects: 'Production Apps',
      statsAcc: 'Model Accuracy',
      statsReach: 'Lifetime Views',
      educationTitle: 'Education & Foundation',
      skillsTitle: 'Core Capabilities',
    },
    services: {
      heading: 'Services & Expertise',
      subheading: 'End-to-end digital craft across engineering and multimedia production.',
      viewDetails: 'View Details',
    },
    projects: {
      heading: 'Selected Projects',
      subheading: 'High-impact full-stack web platforms, machine learning systems, and documentary journalism.',
      liveDemo: 'Live Demo',
      viewCaseStudy: 'Case Study',
      highlights: 'Key Technical Highlights',
      allTech: 'Tech Stack',
    },
    testimonials: {
      heading: 'Endorsements & Reviews',
      subheading: 'Insights from professors, engineering mentors, and creative collaborators.',
      verified: 'Verified Collaboration',
    },
    contact: {
      heading: "Let's Collaborate",
      subheading: 'Have a project, sponsorship, or engineering opportunity in mind? Drop a message.',
      nameLabel: 'Your Name',
      namePlaceholder: 'Abhishek Kumar',
      emailLabel: 'Your Email',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'Project Type / Subject',
      subjectPlaceholder: 'Full-stack development / Media production',
      messageLabel: 'Your Message',
      messagePlaceholder: 'Tell me about your project, timeline, and goals...',
      sendBtn: 'Send Message',
      sending: 'Sending...',
      sentSuccess: 'Message sent successfully! Abhishek will get back to you shortly.',
    },
    footer: {
      tagline: 'Crafting digital products, machine intelligence, and visual stories that matter.',
      quickLinks: 'Navigation',
      socials: 'Connect',
      backToTop: 'Back to top',
      rights: 'All rights reserved.',
    },
    chatbot: {
      title: "Abhishek's AI Assistant",
      subtitle: 'Ask anything about my skills, projects, stack, or experience',
      placeholder: 'Ask about my projects, MERN experience, or AI research...',
      send: 'Send',
      clear: 'Clear Chat',
      suggest1: 'What full-stack projects has Abhishek built?',
      suggest2: 'Tell me about the Phishing Detection AI research',
      suggest3: 'How can I collaborate with Abhishek?',
    },
  },
  hi: {
    nav: {
      about: 'परिचय',
      services: 'सेवाएं',
      projects: 'प्रोजेक्ट्स',
      contact: 'संपर्क',
      chatWithAi: 'AI से पूछें',
    },
    hero: {
      badge: 'सॉफ्टवेयर इंजीनियर और कंटेंट क्रिएटर',
      heading: 'नमस्ते, मैं अभिषेक हूँ',
      subtitle: 'एक वेब डेवलपर और कंटेंट क्रिएटर जो प्रभावशाली और अविस्मरणीय डिजिटल अनुभव बनाने के लिए तत्पर है',
      contactBtn: 'बातचीत शुरू करें',
      exploreBtn: 'काम देखें',
      statusAvailable: 'काम के लिए उपलब्ध',
      scrollDown: 'नीचे स्क्रॉल करें',
    },
    about: {
      heading: 'मेरे बारे में',
      subheading: 'स्केलेबल वेब ऍप्लिकेशन्स और दृश्य पत्रकारिता का निर्माण',
      experience: 'अंतिम वर्ष कंप्यूटर साइंस इंजीनियरिंग छात्र और डिजिटल क्रिएटर',
      statsFollowers: 'सोशल फॉलोअर्स',
      statsProjects: 'मुख्य प्रोजेक्ट्स',
      statsAcc: 'मॉडल सटीकता',
      statsReach: 'कुल वीडियो व्यूज',
      educationTitle: 'शिक्षा और पृष्ठभूमि',
      skillsTitle: 'मुख्य तकनीकी कौशल',
    },
    services: {
      heading: 'विशेषज्ञता और सेवाएं',
      subheading: 'सॉफ्टवेयर इंजीनियरिंग और मल्टीमीडिया प्रोडक्शन में सम्पूर्ण डिजिटल कौशल।',
      viewDetails: 'विवरण देखें',
    },
    projects: {
      heading: 'प्रमुख प्रोजेक्ट्स',
      subheading: 'फुल-स्टैक वेब प्लेटफॉर्म्स, मशीन लर्निंग सिस्टम्स और डॉक्यूमेंट्री जर्नलिज्म।',
      liveDemo: 'लाइव डेमो',
      viewCaseStudy: 'केस स्टडी',
      highlights: 'मुख्य तकनीकी विशेषताएं',
      allTech: 'तकनीकी स्टैक',
    },
    testimonials: {
      heading: 'समीक्षाएं एवं अनुशंसाएं',
      subheading: 'प्रोफेसर्स, इंजीनियरिंग मेंटर्स और क्रिएटिव पार्टनर्स के विचार।',
      verified: 'सत्यापित सहयोग',
    },
    contact: {
      heading: 'संपर्क करें',
      subheading: 'क्या आपके पास कोई नया प्रोजेक्ट, साझेदारी या अवसर है? संदेश भेजें।',
      nameLabel: 'आपका नाम',
      namePlaceholder: 'अभिषेक कुमार',
      emailLabel: 'आपका ईमेल',
      emailPlaceholder: 'you@example.com',
      subjectLabel: 'विषय / प्रोजेक्ट प्रकार',
      subjectPlaceholder: 'फुल-स्टैक डेवलपमेंट / मीडिया प्रोडक्शन',
      messageLabel: 'आपका संदेश',
      messagePlaceholder: 'अपने प्रोजेक्ट, समय-सीमा और लक्ष्यों के बारे में बताएं...',
      sendBtn: 'संदेश भेजें',
      sending: 'भेजा जा रहा है...',
      sentSuccess: 'संदेश सफलतापूर्वक भेजा गया! अभिषेक जल्द ही आपसे संपर्क करेंगे।',
    },
    footer: {
      tagline: 'डिजिटल उत्पाद, मशीन इंटेलिजेंस और प्रभावशाली दृश्य कहानियों का निर्माण।',
      quickLinks: 'नेविगेशन',
      socials: 'जुड़ें',
      backToTop: 'ऊपर जाएं',
      rights: 'सर्वाधिकार सुरक्षित।',
    },
    chatbot: {
      title: 'अभिषेक का AI असिस्टेंट',
      subtitle: 'मेरे कौशल, प्रोजेक्ट्स, तकनीकी स्टैक या अनुभव के बारे में पूछें',
      placeholder: 'प्रोजेक्ट्स, MERN अनुभव या AI रिसर्च के बारे में पूछें...',
      send: 'भेजें',
      clear: 'चैट साफ करें',
      suggest1: 'अभिषेक ने कौन-से फुल-स्टैक प्रोजेक्ट्स बनाए हैं?',
      suggest2: 'फ़िशिंग डिटेक्शन AI रिसर्च के बारे में बताएं',
      suggest3: 'अभिषेक के साथ सहयोग कैसे किया जा सकता है?',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  isHindi: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('abhishek_portfolio_lang');
      if (saved === 'en' || saved === 'hi') return saved;
    }
    return 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('abhishek_portfolio_lang', lang);
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = language;
    }
  }, [language]);

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: TRANSLATIONS[language],
    isHindi: language === 'hi',
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
