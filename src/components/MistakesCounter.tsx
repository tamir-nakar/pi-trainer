import React from 'react';
import { Heart } from 'lucide-react';

interface MistakesCounterProps {
  mistakes: number;
  maxMistakes: number;
}

const MistakesCounter: React.FC<MistakesCounterProps> = ({ mistakes, maxMistakes }) => {
  return (
    <div className="flex items-center space-x-1">
      {Array.from({ length: maxMistakes }).map((_, index) => (
        <Heart
          key={index}
          className={`h-6 w-6 transition-all duration-300 ease-in-out ${
            index < maxMistakes - mistakes
              ? 'text-red-500 fill-red-500'
              : 'text-gray-300'
          }`}
        />
      ))}
    </div>
  );
};

export default MistakesCounter;