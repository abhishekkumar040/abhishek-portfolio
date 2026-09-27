import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  className?: string;
  viewportMargin?: string;
  viewportOnce?: boolean;
  threshold?: number;
  scale?: number;
}

/**
 * High-performance IntersectionObserver-driven FadeIn component.
 * Ensures hardware-accelerated, butter-smooth scroll-triggered animations
 * with accessibility and fallback support.
 */
export const FadeIn: React.FC<FadeInProps> = ({
  children,
  delay = 0,
  duration = 0.75,
  x = 0,
  y = 30,
  className = '',
  viewportMargin = '0px 0px -40px 0px',
  viewportOnce = true,
  threshold = 0.1,
  scale = 1,
}) => {
  const [ref, isIntersecting] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin: viewportMargin,
    triggerOnce: viewportOnce,
  });

  const getTransform = () => {
    if (isIntersecting) {
      return 'translate3d(0, 0, 0) scale(1)';
    }
    const scaleTransform = scale !== 1 ? ` scale(${scale})` : '';
    return `translate3d(${x}px, ${y}px, 0)${scaleTransform}`;
  };

  const delayMs = Math.round(delay * 1000);
  const durationMs = Math.round(duration * 1000);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isIntersecting ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform ${durationMs}ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
        willChange: isIntersecting ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
