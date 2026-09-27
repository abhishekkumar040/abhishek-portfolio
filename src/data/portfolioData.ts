import heroPortrait from '../assets/images/abhishek_hero_portrait_1790528805300.jpg';
import backRemovalLanding from '../assets/images/back_removal_landing_1790528823363.jpg';
import backRemovalResult from '../assets/images/back_removal_result_1790528839670.jpg';
import phishingAiDashboard from '../assets/images/phishing_ai_dashboard_1790528863318.jpg';
import abhishekMediaShowcase from '../assets/images/abhishek_media_showcase_1790528882680.jpg';

export interface NavItem {
  label: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export const MARQUEE_IMAGES = [
  'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif',
  'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif',
  'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif',
  'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif',
  'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif',
  'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif',
  'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif',
  'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif',
  'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif',
  'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif',
  'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif',
  'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif',
  'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif',
  'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif',
  'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif',
  'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif',
  'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif',
  'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif',
  'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif',
  'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif',
];

export const MARQUEE_ROW_1 = MARQUEE_IMAGES.slice(0, 11);
export const MARQUEE_ROW_2 = MARQUEE_IMAGES.slice(11);

export interface ServiceItem {
  number: string;
  name: string;
  description: string;
  skills: string[];
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    number: '01',
    name: 'Full-Stack MERN Development',
    description:
      'Building full-stack, production-ready web platforms using MongoDB, Express, React, and Node.js -- from authentication and payments to deployment.',
    skills: ['React 19', 'Node.js', 'Express', 'MongoDB', 'REST APIs', 'Auth & Payments'],
  },
  {
    number: '02',
    name: 'Machine Learning & AI',
    description:
      'Designing and training explainable machine learning models, using SHAP and LIME to make predictions transparent and trustworthy.',
    skills: ['Python', 'XGBoost', 'Random Forest', 'SHAP', 'LIME', 'Feature Engineering'],
  },
  {
    number: '03',
    name: 'Content Creation & Journalism',
    description:
      'Producing daily photo and video journalism content, covering public figures and events for a combined audience of 150K+.',
    skills: ['Photojournalism', 'Short-form Video', 'Storytelling', 'Audience Growth', 'Live Coverage'],
  },
  {
    number: '04',
    name: 'Social Media Management',
    description:
      'Managing public relations and social media presence for high-profile clients -- handling content strategy, photography, and audience engagement.',
    skills: ['PR Strategy', 'Growth Marketing', 'Content Directing', 'Community Building'],
  },
];

export interface ProjectCard {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl?: string;
  col1Image1: string;
  col1Image1Label: string;
  col1Image2: string;
  col1Image2Label: string;
  col2Image: string;
  col2ImageLabel: string;
  highlights: string[];
}

export const PROJECTS_DATA: ProjectCard[] = [
  {
    id: 'back-removal',
    number: '01',
    category: 'Personal',
    title: 'Back.Removal',
    description:
      'AI-powered background removal SaaS platform built with React, Node.js, MongoDB, Clerk authentication, Razorpay payments, and seamless cloud deployment on Vercel.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Clerk Auth', 'Razorpay', 'Vercel'],
    liveUrl: 'https://back-removel-j9yy.vercel.app/',
    col1Image1: backRemovalLanding,
    col1Image1Label: 'Landing Page & Drag-and-Drop Area',
    col1Image2: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    col1Image2Label: 'Upload Flow & Processing State',
    col2Image: backRemovalResult,
    col2ImageLabel: 'Result View with HD Download & Transparent Checkerboard',
    highlights: [
      'Sub-second AI background separation using state-of-the-art neural segmentation',
      'Clerk auth flow with Google OAuth & passwordless magic links',
      'Razorpay payment checkout integration with subscription and credit tiers',
      'High-resolution batch export supporting PNG transparency and custom backdrops',
    ],
  },
  {
    id: 'phishing-ai',
    number: '02',
    category: 'Personal',
    title: 'Phishing Detection AI',
    description:
      'Real-time phishing website detector using Random Forest and XGBoost with explainable AI (SHAP/LIME), achieving 96% accuracy on zero-day malicious domains.',
    techStack: ['Python', 'XGBoost', 'Random Forest', 'SHAP', 'LIME', 'FastAPI', 'React'],
    liveUrl: 'https://abhishek-kumar-seven.vercel.app/',
    col1Image1: phishingAiDashboard,
    col1Image1Label: 'Detection Interface & Security Scanner',
    col1Image2: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    col1Image2Label: 'Model Architecture & Feature Importance',
    col2Image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80',
    col2ImageLabel: 'Confidence Metrics & Explainability Analytics (96% Accuracy)',
    highlights: [
      '96.2% validation accuracy against newly registered deceptive domains',
      'Explainable AI insights showing why a URL is flagged via SHAP waterfall charts',
      'Sub-150ms real-time API latency for browser extension and security feeds',
      'Lexical, domain-heuristic, and HTML DOM feature extraction pipeline',
    ],
  },
  {
    id: 'abhishek-mediaa',
    number: '03',
    category: 'Personal',
    title: 'ABHISHEK.MEDIAA',
    description:
      'Photo/video journalism brand with a combined 150K+ audience across social platforms, covering public figures, cultural gatherings, and historic community moments.',
    techStack: ['Sony Cinema FX', 'Premiere Pro', 'DaVinci Resolve', 'Instagram', 'YouTube'],
    liveUrl: 'https://instagram.com/abhishek.mediaa',
    col1Image1: abhishekMediaShowcase,
    col1Image1Label: 'On-Location Camera & Press Coverage',
    col1Image2: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    col1Image2Label: 'Photojournalism Stills & Visual Journalism',
    col2Image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80',
    col2ImageLabel: 'Documentary Storytelling for 150K+ Audience',
    highlights: [
      '150,000+ loyal followers across Instagram, YouTube, and digital publications',
      'Official media accreditation for high-profile public dignitaries and state festivals',
      'Over 25 million lifetime video impressions with high engagement rate',
      'Editorial style blending documentary truth with modern cinematic pacing',
    ],
  },
];

export const PROFILE_INFO = {
  name: 'Abhishek',
  title: 'Developer & Content Creator',
  heroHeading: "Hi, i'm abhishek",
  heroSubtitle:
    'a web developer and content creator driven by crafting striking and unforgettable experiences',
  aboutText:
    "I'm a final-year Computer Science Engineering student. I build full-stack MERN (MongoDB, Express, React, Node.js) web platforms and explainable machine learning systems, while also working as a digital creator and photo/video journalist with a combined audience of 150K+. I enjoy blending technical execution with storytelling. Let's build something incredible together!",
  heroPortraitImage: heroPortrait,
  email: 'bika2413@gmail.com',
  instagram: 'https://instagram.com/abhishek.mediaa',
  github: 'https://github.com/abhishekkumar040',
  linkedin: 'https://www.linkedin.com/in/abhishek-kumar-57233019b/?isSelfProfile=true',
  twitter: 'https://x.com',
};

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  organization: string;
  avatar: string;
  quote: string;
  rating: number;
  projectTag: string;
  year: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Dr. Rajesh Sharma',
    role: 'Head of AI & Cyber Intelligence Lab',
    organization: 'CSE Innovation Cell',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    quote:
      'Abhishek developed an explainable machine learning architecture with 96%+ accuracy for phishing URL classification. Beyond sheer model performance, his visual explanation dashboards made feature importance intuitive for security audits.',
    rating: 5,
    projectTag: 'Explainable AI & ML',
    year: '2025',
  },
  {
    id: 'test-2',
    name: 'Marcus Vance',
    role: 'Product Lead & Founder',
    organization: 'PixelFlow Technologies',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    quote:
      'Abhishek engineered the full-stack MERN architecture for Back.Removal, integrating Clerk authentication, Stripe credit metering, and high-throughput image jobs. The platform handles thousands of transformations with sub-second response times.',
    rating: 5,
    projectTag: 'Back.Removal MERN SaaS',
    year: '2025',
  },
  {
    id: 'test-3',
    name: 'Ananya Sen',
    role: 'Creative Director & Producer',
    organization: 'Heritage Cultural Media',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
    quote:
      'Working alongside Abhishek for visual journalism is a genuine masterclass in storytelling. His on-location photo/video coverage reached over 2.4 million organic viewers during our annual public festival with cinematic finesse.',
    rating: 5,
    projectTag: 'Abhishek.Mediaa Journalism',
    year: '2024',
  },
  {
    id: 'test-4',
    name: 'Rohan Malhotra',
    role: 'Lead Full-Stack Architect',
    organization: 'CloudPulse Studio',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
    quote:
      'Abhishek is one of the rare developers who treats typography, micro-interactions, and backend resilience with equal seriousness. His code is modular, type-safe, and built to scale effortlessly under real-world traffic.',
    rating: 5,
    projectTag: 'Full-Stack Web Platforms',
    year: '2024',
  },
  {
    id: 'test-5',
    name: 'Priya Nair',
    role: 'Senior Project Mentor & Reviewer',
    organization: 'Digital Creators Guild',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    quote:
      'Abhishek bridges the rare intersection of computer engineering and large-scale digital audience engagement. Whether training neural models or publishing video productions for 150K+ followers, his execution is always first-rate.',
    rating: 5,
    projectTag: 'Digital Content & Tech',
    year: '2025',
  },
];

