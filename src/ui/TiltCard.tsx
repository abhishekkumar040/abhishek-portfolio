import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  scaleHover?: number;
  glare?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  dataCursor?: string;
  style?: React.CSSProperties;
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 6,
  scaleHover = 1.015,
  glare = true,
  onClick,
  dataCursor = 'expand',
  style = {},
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  const springConfig = { damping: 20, stiffness: 260 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const rotateX = useTransform(smoothY, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [0, 1], [-maxTilt, maxTilt]);
  const scale = useSpring(1, springConfig);

  // Glare position
  const glareX = useTransform(smoothX, [0, 1], ['0%', '100%']);
  const glareY = useTransform(smoothY, [0, 1], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const clientX = (e.clientX - rect.left) / rect.width;
    const clientY = (e.clientY - rect.top) / rect.height;

    x.set(clientX);
    y.set(clientY);
  };

  const handleMouseEnter = () => {
    scale.set(scaleHover);
  };

  const handleMouseLeave = () => {
    x.set(0.5);
    y.set(0.5);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      data-cursor={dataCursor}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        scale,
        ...style,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Subtle dynamic glare overlay */}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 overflow-hidden mix-blend-overlay"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([gx, gy]) =>
                `radial-gradient(circle 320px at ${gx} ${gy}, rgba(255, 255, 255, 0.22), transparent 70%)`
            ),
          }}
        />
      )}
    </motion.div>
  );
};
