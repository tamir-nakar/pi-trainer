import React from 'react';
import { Digit } from '../types';
import { motion } from 'framer-motion';

interface DigitDisplayProps {
  digit: Digit;
  current: boolean;
  index: number;
}

const DigitDisplay: React.FC<DigitDisplayProps> = ({ digit, current, index }) => {
  const getBackgroundColor = () => {
    if (digit.status === 'correct') return 'bg-green-500';
    if (digit.status === 'incorrect') return 'bg-red-400';
    if (current) return 'bg-white ring-4 ring-blue-500';
    return 'bg-gray-100';
  };

  const getTextColor = () => {
    if (digit.status === 'correct') return 'text-white';
    if (digit.status === 'incorrect') return 'text-white';
    return 'text-gray-800';
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        backgroundColor: digit.status === 'correct' ? '#22C55E' : 
                        digit.status === 'incorrect' ? '#EF4444' : 
                        current ? '#FFFFFF' : '#F3F4F6'
      }}
      transition={{ 
        type: 'spring', 
        duration: 0.3,
        delay: Math.min(index * 0.02, 0.3)
      }}
      className={`
        w-12 h-12 sm:w-14 sm:h-14 
        ${getBackgroundColor()} 
        ${getTextColor()}
        flex items-center justify-center
        rounded-xl text-xl font-semibold
        shadow-lg transform transition-all
        ${current ? 'scale-110 z-10' : ''}
      `}
    >
      {digit.attempted || digit.status === 'correct' ? digit.value : ''}
    </motion.div>
  );
};

export default DigitDisplay;