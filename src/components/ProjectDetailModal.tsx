import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Check, Copy } from 'lucide-react';
import { ProjectCard } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';

interface ProjectDetailModalProps {
  project: ProjectCard | null;
  onClose: () => void;
  onContactClick: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onContactClick,
}) => {
  const [copied, setCopied] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const { isDark } = useTheme();

  if (!project) return null;

  const currentPreviewImage = activeImage || project.col1Image1;

  const handleCopyLink = () => {
    if (project.liveUrl) {
      navigator.clipboard.writeText(project.liveUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          className={`relative w-full max-w-4xl rounded-3xl sm:rounded-[40px] p-6 sm:p-8 md:p-10 z-10 shadow-2xl my-auto overflow-hidden transition-colors duration-300 border-2 ${
            isDark
              ? 'bg-[#121418] border-[#D7E2EA]/30 text-[#D7E2EA]'
              : 'bg-[#FFFFFF] border-[#0C0C0C]/30 text-[#0C0C0C]'
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-start justify-between gap-4 pb-6 border-b ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className={`text-sm uppercase tracking-widest font-light ${
                    isDark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/60'
                  }`}
                >
                  Project {project.number} · {project.category}
                </span>
              </div>
              <h3
                className={`text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight ${
                  isDark ? 'text-white' : 'text-[#0C0C0C]'
                }`}
              >
                {project.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className={`p-2 rounded-full transition-colors cursor-pointer ${
                isDark
                  ? 'bg-white/10 hover:bg-white/20 text-[#D7E2EA]'
                  : 'bg-black/10 hover:bg-black/20 text-[#0C0C0C]'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="mt-6 flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-1">
            {/* Main Preview Image */}
            <div
              className={`relative w-full h-[240px] sm:h-[340px] md:h-[400px] rounded-2xl overflow-hidden border ${
                isDark ? 'border-white/10 bg-black/50' : 'border-black/10 bg-gray-100'
              }`}
            >
              <img
                src={currentPreviewImage}
                alt={project.title}
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-white text-sm font-medium">
                  {currentPreviewImage === project.col1Image1
                    ? project.col1Image1Label
                    : currentPreviewImage === project.col1Image2
                    ? project.col1Image2Label
                    : project.col2ImageLabel}
                </p>
              </div>
            </div>

            {/* Thumbnail Selectors */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { src: project.col1Image1, label: project.col1Image1Label },
                { src: project.col1Image2, label: project.col1Image2Label },
                { src: project.col2Image, label: project.col2ImageLabel },
              ].map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(img.src)}
                  className={`relative h-20 sm:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    currentPreviewImage === img.src
                      ? 'border-[#B600A8] ring-2 ring-[#B600A8]/40'
                      : isDark
                      ? 'border-white/15 opacity-70 hover:opacity-100'
                      : 'border-black/15 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Description & Core Highlights */}
            <div className="flex flex-col gap-4">
              <h4
                className={`text-lg font-semibold uppercase tracking-wider ${
                  isDark ? 'text-white' : 'text-[#0C0C0C]'
                }`}
              >
                Overview
              </h4>
              <p
                className={`text-sm sm:text-base font-light leading-relaxed ${
                  isDark ? 'text-[#D7E2EA]/85' : 'text-[#0C0C0C]/85'
                }`}
              >
                {project.description}
              </p>

              {/* Highlights */}
              <div
                className={`rounded-2xl p-4 sm:p-5 mt-2 border ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'
                }`}
              >
                <h5
                  className={`text-xs uppercase tracking-widest font-medium mb-3 ${
                    isDark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/60'
                  }`}
                >
                  Key Capabilities
                </h5>
                <ul className="space-y-2.5">
                  {project.highlights.map((h, i) => (
                    <li
                      key={i}
                      className={`flex items-start gap-2.5 text-xs sm:text-sm ${
                        isDark ? 'text-[#D7E2EA]/90' : 'text-[#0C0C0C]/90'
                      }`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B600A8] mt-1.5 flex-shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h5
                  className={`text-xs uppercase tracking-widest font-medium mb-2.5 ${
                    isDark ? 'text-[#D7E2EA]/60' : 'text-[#0C0C0C]/60'
                  }`}
                >
                  Technologies Used
                </h5>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-xs font-mono border ${
                        isDark
                          ? 'bg-white/10 border-white/15 text-white'
                          : 'bg-black/5 border-black/15 text-[#0C0C0C]'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div
              className={`flex flex-wrap items-center justify-between gap-3 pt-4 border-t mt-2 ${
                isDark ? 'border-white/10' : 'border-black/10'
              }`}
            >
              <button
                type="button"
                onClick={handleCopyLink}
                className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-full border text-xs sm:text-sm transition-colors cursor-pointer ${
                  isDark
                    ? 'border-white/20 text-[#D7E2EA] hover:bg-white/10'
                    : 'border-black/20 text-[#0C0C0C] hover:bg-black/10'
                }`}
              >
                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Link Copied' : 'Share Project'}</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onContactClick();
                  }}
                  className={`px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors cursor-pointer ${
                    isDark
                      ? 'bg-white/10 hover:bg-white/20 text-white'
                      : 'bg-black/10 hover:bg-black/20 text-[#0C0C0C]'
                  }`}
                >
                  Discuss Project
                </button>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium uppercase tracking-wider text-white transition-transform hover:scale-105"
                    style={{
                      background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
                      boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25)',
                    }}
                  >
                    <span>Launch Live</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
