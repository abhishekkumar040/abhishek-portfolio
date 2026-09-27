import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

export const CustomCursor: React.FC = () => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Outer halo follower: silky, smooth spring physics
  const springConfig = { damping: 24, stiffness: 220, mass: 0.5 };
  const haloX = useSpring(mouseX, springConfig);
  const haloY = useSpring(mouseY, springConfig);

  // Inner dot: snappier, direct tracking
  const dotSpringConfig = { damping: 35, stiffness: 450, mass: 0.1 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Disable completely on devices without a fine pointer (touchscreens, mobile phones, tablets)
    if (typeof window !== 'undefined') {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || !window.matchMedia('(hover: hover)').matches;
      if (isTouch) {
        setIsTouchDevice(true);
        return;
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = target.closest(
          'a, button, [role="button"], input, textarea, select, [data-cursor="pointer"], [data-cursor="expand"], .cursor-pointer'
        );
        setIsHovered(!!interactive);
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  // Don't render on touch/mobile devices
  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Outer Halo / Follower Ring that expands over interactive elements */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: haloX,
          y: haloY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          scale: isClicked ? 0.85 : 1,
          opacity: isVisible ? (isHovered ? 0.95 : 0.6) : 0,
          backgroundColor: isHovered
            ? isDark
              ? 'rgba(6, 182, 212, 0.15)'
              : 'rgba(37, 99, 235, 0.12)'
            : 'transparent',
          borderColor: isHovered
            ? isDark
              ? 'rgba(6, 182, 212, 0.75)'
              : 'rgba(37, 99, 235, 0.75)'
            : isDark
            ? 'rgba(215, 226, 234, 0.35)'
            : 'rgba(12, 12, 12, 0.3)',
          borderWidth: isHovered ? '1.5px' : '1px',
          boxShadow: isHovered
            ? isDark
              ? '0 0 16px rgba(6, 182, 212, 0.4), inset 0 0 10px rgba(6, 182, 212, 0.2)'
              : '0 0 14px rgba(37, 99, 235, 0.35), inset 0 0 8px rgba(37, 99, 235, 0.15)'
            : 'none',
        }}
        transition={{
          width: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
          height: { duration: 0.2, ease: [0.25, 0.1, 0.25, 1] },
          scale: { duration: 0.15, ease: 'easeOut' },
          opacity: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
          borderColor: { duration: 0.2 },
          boxShadow: { duration: 0.2 },
        }}
      />

      {/* Center Micro Dot for precision */}
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: isHovered ? 6 : 4,
          height: isHovered ? 6 : 4,
          opacity: isVisible ? (isHovered ? 0.9 : 0.7) : 0,
          backgroundColor: isDark
            ? isHovered
              ? '#06B6D4'
              : '#D7E2EA'
            : isHovered
            ? '#2563EB'
            : '#0C0C0C',
        }}
        transition={{
          duration: 0.15,
          ease: 'easeOut',
        }}
      />
    </div>
  );
};
