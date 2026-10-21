'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface KineticTextRevealProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  highlightWord?: string;
  highlightClass?: string;
  delay?: number;
}

/**
 * KineticTextReveal (Adapted from Animmaster Lib kinetic typography)
 * Staggered split-word transition with masked baseline translation and spring physics.
 */
export default function KineticTextReveal({
  text,
  className = '',
  as = 'h1',
  highlightWord,
  highlightClass = 'italic text-[#C25E38] dark:text-[#E07A5F]',
  delay = 0,
}: KineticTextRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.04,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 28,
      rotateX: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: 'spring' as const,
        damping: 24,
        stiffness: 140,
      },
    },
  };

  const Tag = as as any;

  return (
    <Tag className={className}>
      <motion.span
        className="inline-flex flex-wrap gap-x-[0.28em] gap-y-1"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ perspective: 1000 }}
      >
        {words.map((word, idx) => {
          const isHighlight =
            highlightWord &&
            word.toLowerCase().replace(/[^a-z0-9]/g, '') ===
              highlightWord.toLowerCase().replace(/[^a-z0-9]/g, '');

          return (
            <span key={idx} className="inline-block overflow-hidden pb-1">
              <motion.span
                variants={wordVariants}
                className={`inline-block will-change-transform ${
                  isHighlight ? highlightClass : ''
                }`}
              >
                {word}
              </motion.span>
            </span>
          );
        })}
      </motion.span>
    </Tag>
  );
}
