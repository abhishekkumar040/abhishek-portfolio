import React from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  delay?: number;
  threshold?: number;
  rootMargin?: string;
  className?: string;
  triggerOnce?: boolean;
  scale?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = 'up',
  distance = 32,
  duration = 750,
  delay = 0,
  threshold = 0.12,
  rootMargin = '0px 0px -40px 0px',
  className = '',
  triggerOnce = true,
  scale = false,
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce,
  });

  const getTransform = () => {
    if (isVisible) return 'translate3d(0, 0, 0) scale(1)';

    let x = 0;
    let y = 0;

    switch (direction) {
      case 'up':
        y = distance;
        break;
      case 'down':
        y = -distance;
        break;
      case 'left':
        x = distance;
        break;
      case 'right':
        x = -distance;
        break;
      case 'none':
      default:
        break;
    }

    const scaleVal = scale ? ' scale(0.96)' : '';
    return `translate3d(${x}px, ${y}px, 0)${scaleVal}`;
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
        willChange: isVisible ? 'auto' : 'opacity, transform',
      }}
    >
      {children}
    </div>
  );
};
