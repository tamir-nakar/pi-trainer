import React from 'react';
import { motion } from 'framer-motion';

interface KeypadProps {
  onDigitPress: (digit: string) => void;
  disabled: boolean;
}

const Keypad: React.FC<KeypadProps> = ({ onDigitPress, disabled }) => {
  const digits = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];

  return (
    <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-xs mx-auto">
      {digits.map((digit, index) => (
        <motion.button
          key={digit}
          whileTap={{ scale: 0.95 }}
          className={`
            ${index === 9 ? 'col-start-2' : ''} 
            bg-white h-14 flex items-center justify-center rounded-xl 
            font-bold text-2xl text-gray-800 shadow-sm
            hover:bg-gray-50 active:bg-gray-100
            transition-colors duration-100
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          onClick={() => !disabled && onDigitPress(digit)}
          disabled={disabled}
        >
          {digit}
        </motion.button>
      ))}
    </div>
  );
};

export default Keypad;