import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const Char: React.FC<CharProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0.35, 1]);

  return (
    <span className="relative inline-block">
      <span className="opacity-0 select-none pointer-events-none" aria-hidden="true">
        {children}
      </span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {children}
      </motion.span>
    </span>
  );
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({ text, className = '', style }) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.85', 'end 0.2'],
  });

  const words = text.split(' ');
  let charIndexCounter = 0;
  const totalChars = text.length;

  return (
    <p
      ref={containerRef}
      className={`relative select-text ${className}`}
      style={{
        lineHeight: 1.9,
        letterSpacing: '0.01em',
        fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        ...style,
      }}
    >
      {words.map((word, wordIndex) => {
        const characters = word.split('');
        const isLastWord = wordIndex === words.length - 1;

        return (
          <span
            key={`word-${wordIndex}`}
            className="inline-block whitespace-nowrap"
            style={{ marginRight: !isLastWord ? '0.34em' : '0' }}
          >
            {characters.map((char, charIndex) => {
              const currentGlobalIndex = charIndexCounter++;
              const start = currentGlobalIndex / totalChars;
              const end = Math.min(1, start + 0.1);

              return (
                <Char
                  key={`char-${wordIndex}-${charIndex}`}
                  progress={scrollYProgress}
                  range={[start, end]}
                >
                  {char}
                </Char>
              );
            })}
            {/* Account for space in counter */}
            {(() => {
              if (!isLastWord) {
                charIndexCounter++;
              }
              return null;
            })()}
          </span>
        );
      })}
    </p>
  );
};
