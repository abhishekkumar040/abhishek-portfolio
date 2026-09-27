import { useEffect, useRef, useState, RefObject } from 'react';

export interface UseIntersectionObserverOptions {
  threshold?: number | number[];
  rootMargin?: string;
  triggerOnce?: boolean;
  disabled?: boolean;
}

/**
 * Custom React hook utilizing the native browser IntersectionObserver API
 * to detect when elements enter the viewport during scrolling.
 */
export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseIntersectionObserverOptions = {}
): [RefObject<T | null>, boolean] {
  const {
    threshold = 0.15,
    rootMargin = '0px 0px -50px 0px',
    triggerOnce = true,
    disabled = false,
  } = options;

  const targetRef = useRef<T | null>(null);
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    if (disabled) {
      setIsIntersecting(true);
      return;
    }

    const node = targetRef.current;
    if (!node) return;

    // Fallback if browser doesn't support IntersectionObserver
    if (!('IntersectionObserver' in window)) {
      setIsIntersecting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          if (triggerOnce) {
            observer.unobserve(node);
            observer.disconnect();
          }
        } else if (!triggerOnce) {
          setIsIntersecting(false);
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, disabled]);

  return [targetRef, isIntersecting];
}
