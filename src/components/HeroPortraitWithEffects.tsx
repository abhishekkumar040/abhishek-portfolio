import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Camera, Sparkles, Zap, Film, Sun, Music, Disc } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useBackgroundMusic } from '../utils/backgroundMusic';

interface HeroPortraitWithEffectsProps {
  portraitImage: string;
  onImageChange?: (newImage: string) => void;
}

type EffectMode = 'neon' | 'cinematic' | 'holo' | 'clean';

export const HeroPortraitWithEffects: React.FC<HeroPortraitWithEffectsProps> = ({
  portraitImage,
  onImageChange,
}) => {
  const { isDark } = useTheme();
  const { isPlaying, togglePlay } = useBackgroundMusic();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [effectMode, setEffectMode] = useState<EffectMode>('neon');
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking 3D tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 250, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 250, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-12, 12]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ['-100%', '200%']);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ['-100%', '200%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result && onImageChange) {
          onImageChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Effect-specific style classes & glow gradients
  const getEffectStyles = () => {
    switch (effectMode) {
      case 'neon':
        return {
          bgGlow: 'from-cyan-500/35 via-purple-600/30 to-blue-600/35',
          rimLight: 'drop-shadow-[0_0_25px_rgba(6,182,212,0.6)]',
          imageFilter: 'contrast-110 brightness-105 saturate-110',
          accent: '#06B6D4',
        };
      case 'cinematic':
        return {
          bgGlow: 'from-amber-500/30 via-rose-600/25 to-indigo-700/30',
          rimLight: 'drop-shadow-[0_15px_35px_rgba(244,63,94,0.4)]',
          imageFilter: 'contrast-125 brightness-95 saturate-120 sepia-[0.1]',
          accent: '#F43F5E',
        };
      case 'holo':
        return {
          bgGlow: 'from-fuchsia-500/35 via-cyan-400/30 to-violet-600/35',
          rimLight: 'drop-shadow-[0_0_30px_rgba(217,70,239,0.55)]',
          imageFilter: 'contrast-115 brightness-110 saturate-125 hue-rotate-15',
          accent: '#D946EF',
        };
      case 'clean':
      default:
        return {
          bgGlow: 'from-white/10 via-gray-400/10 to-transparent',
          rimLight: isDark
            ? 'drop-shadow-[0_20px_45px_rgba(0,0,0,0.9)]'
            : 'drop-shadow-[0_20px_35px_rgba(0,0,0,0.25)]',
          imageFilter: 'contrast-100 brightness-100 saturate-100',
          accent: '#ffffff',
        };
    }
  };

  const styleConfig = getEffectStyles();

  return (
    <div className="relative w-full flex flex-col items-center justify-center [perspective:1200px] select-none">
      {/* 1. Ambient Background Halo & Pulsing Backlight */}
      <motion.div
        animate={{
          scale: isHovered ? 1.08 : [1, 1.04, 1],
          opacity: isHovered ? 0.9 : 0.65,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        }}
        className={`absolute inset-0 max-w-[480px] mx-auto rounded-full bg-gradient-to-tr ${styleConfig.bgGlow} blur-3xl pointer-events-none -z-10`}
      />

      {/* Floating ambient particle specks */}
      {effectMode !== 'clean' && (
        <div className="absolute inset-0 pointer-events-none -z-5 overflow-hidden">
          <div className="absolute top-10 left-1/4 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
          <div className="absolute top-1/3 right-1/4 w-2 h-2 rounded-full bg-purple-400 animate-pulse opacity-80" />
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 rounded-full bg-amber-300 animate-bounce opacity-70" />
        </div>
      )}

      {/* 2. Interactive 3D Tilt Portrait Frame */}
      <motion.div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? 1.03 : 1,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 18 }}
        className="relative w-full flex justify-center items-end group cursor-grab active:cursor-grabbing"
      >
        <div className="relative w-full max-w-[480px] flex justify-center">
          {/* Main Portrait Image */}
          <img
            src={portraitImage}
            alt="Abhishek - Developer and Content Creator"
            className={`w-full h-auto max-h-[70vh] sm:max-h-[74vh] object-contain object-bottom pointer-events-none transition-all duration-500 ${styleConfig.rimLight} ${styleConfig.imageFilter}`}
            loading="eager"
          />

          {/* Sunglass Glare / Metallic Sheen Light Reflection Sweep on Hover */}
          <motion.div
            style={{
              translateX: glareX,
              translateY: glareY,
            }}
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />

          {/* Subtle bottom atmospheric fade overlay into current background theme */}
          <div
            className={`absolute inset-x-0 bottom-0 h-16 pointer-events-none transition-colors duration-300 ${
              isDark
                ? 'bg-gradient-to-t from-[#0C0C0C] via-[#0C0C0C]/80 to-transparent'
                : 'bg-gradient-to-t from-[#FAFAFC] via-[#FAFAFC]/80 to-transparent'
            }`}
          />

          {/* Mini Semi-Glassy Transparent Music Control Button at Top Left of Image */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/45 hover:bg-black/75 border border-white/20 backdrop-blur-md shadow-xl text-white transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 group/music"
            title={isPlaying ? 'Pause Background Music (Metro Boomin)' : 'Play Background Music (Metro Boomin)'}
            aria-label={isPlaying ? 'Pause Music' : 'Play Music'}
          >
            {isPlaying ? (
              <>
                <Disc className="w-3.5 h-3.5 text-cyan-400 animate-spin" style={{ animationDuration: '3s' }} />
                <span className="text-[11px] font-semibold tracking-wider text-cyan-300 uppercase font-mono">
                  Metro Boomin
                </span>
                <div className="flex items-end gap-0.5 h-2.5 ml-0.5">
                  <span className="w-0.5 h-full bg-cyan-400 rounded-full animate-bounce" />
                  <span className="w-0.5 h-2/3 bg-blue-400 rounded-full animate-[bounce_1s_infinite_200ms]" />
                  <span className="w-0.5 h-full bg-purple-400 rounded-full animate-[bounce_1s_infinite_400ms]" />
                </div>
              </>
            ) : (
              <>
                <Music className="w-3.5 h-3.5 text-white/70 group-hover/music:text-cyan-400 transition-colors" />
                <span className="text-[11px] font-medium tracking-wide text-white/80">
                  Play Music
                </span>
              </>
            )}
          </button>

          {/* Quick Upload Button overlay */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Upload custom portrait image"
            className="absolute top-4 right-4 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl cursor-pointer hover:scale-110 active:scale-95 z-30"
          >
            <Camera className="w-4 h-4 text-cyan-300" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </div>
      </motion.div>

      {/* 3. Floating Interactive Effect Toggles Bar */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="mt-3 flex items-center justify-center gap-1.5 p-1.5 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl z-20 text-xs text-white"
      >
        <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 pl-2 pr-1 hidden sm:inline-block">
          Photo FX:
        </span>

        {/* Neon Button */}
        <button
          type="button"
          onClick={() => setEffectMode('neon')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
            effectMode === 'neon'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md scale-105'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Zap className="w-3 h-3 text-cyan-300" />
          <span>Neon</span>
        </button>

        {/* Holographic Button */}
        <button
          type="button"
          onClick={() => setEffectMode('holo')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
            effectMode === 'holo'
              ? 'bg-gradient-to-r from-fuchsia-500 to-violet-600 text-white shadow-md scale-105'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-3 h-3 text-fuchsia-300" />
          <span>Holo</span>
        </button>

        {/* Cinematic Button */}
        <button
          type="button"
          onClick={() => setEffectMode('cinematic')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
            effectMode === 'cinematic'
              ? 'bg-gradient-to-r from-rose-500 to-amber-600 text-white shadow-md scale-105'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Film className="w-3 h-3 text-amber-300" />
          <span>Film</span>
        </button>

        {/* Clean Button */}
        <button
          type="button"
          onClick={() => setEffectMode('clean')}
          className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium transition-all duration-200 cursor-pointer ${
            effectMode === 'clean'
              ? 'bg-white/20 text-white shadow-md scale-105 border border-white/30'
              : 'text-gray-300 hover:text-white hover:bg-white/10'
          }`}
        >
          <Sun className="w-3 h-3 text-yellow-200" />
          <span>Clean</span>
        </button>
      </motion.div>
    </div>
  );
};
