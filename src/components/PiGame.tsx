import React, { useState, useEffect, useCallback, useRef } from 'react';
import { PI_DIGITS } from '../constants/piDigits';
import { GameState, Digit } from '../types';
import DigitDisplay from './DigitDisplay';
import MistakesCounter from './MistakesCounter';
import ScoreDisplay from './ScoreDisplay';
import Keypad from './Keypad';
import GameOverModal from './GameOverModal';
import { Sparkles, Brain } from 'lucide-react';
import { motion } from 'framer-motion';

const MAX_VISIBLE_DIGITS = 10;
const MAX_MISTAKES = 3;

const PiGame: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('idle');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [digits, setDigits] = useState<Digit[]>([]);
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: MAX_VISIBLE_DIGITS });
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Initialize game digits
  const initializeGame = useCallback(() => {
    const initialDigits: Digit[] = PI_DIGITS.split('').map(value => ({
      value,
      status: 'idle',
      attempted: false
    }));
    
    setDigits(initialDigits);
    setCurrentIndex(0);
    setMistakes(0);
    setVisibleRange({ start: 0, end: MAX_VISIBLE_DIGITS });
    setGameState('playing');
  }, []);

  // Handle digit input
  const handleDigitInput = useCallback((input: string) => {
    if (gameState !== 'playing') return;
    
    setDigits(prev => {
      const newDigits = [...prev];
      const correct = input === newDigits[currentIndex].value;
      
      newDigits[currentIndex] = {
        ...newDigits[currentIndex],
        status: correct ? 'correct' : 'incorrect',
        attempted: true
      };
      
      return newDigits;
    });

    if (input === digits[currentIndex].value) {
      // Correct input
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      
      // Adjust visible range if needed
      if (nextIndex >= visibleRange.end - 2) {
        setVisibleRange(prev => ({
          start: prev.start + 1,
          end: prev.end + 1
        }));
      }
    } else {
      // Incorrect input
      const newMistakes = mistakes + 1;
      setMistakes(newMistakes);
      
      if (newMistakes >= MAX_MISTAKES) {
        setGameState('gameover');
      }
    }
  }, [currentIndex, digits, gameState, mistakes, visibleRange]);

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (gameState !== 'playing') return;
      
      if (/^[0-9]$/.test(e.key)) {
        handleDigitInput(e.key);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, handleDigitInput]);

  // Restart game
  const handleRestart = () => {
    initializeGame();
  };

  // Initialize game on first load
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Get visible digits
  const visibleDigits = digits.slice(visibleRange.start, visibleRange.end);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center w-full max-w-xl mx-auto h-full"
      ref={gameContainerRef}
    >
      <div className="rounded-2xl bg-white shadow-xl w-full px-4 py-8 sm:p-8">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 rounded-full">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-gray-800">Pi Trainer</h1>
          </div>
          <div className="flex items-center gap-3">
            <MistakesCounter mistakes={mistakes} maxMistakes={MAX_MISTAKES} />
            <ScoreDisplay score={currentIndex} />
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center">
              <span className="text-4xl font-bold text-gray-800 mr-1">3.</span>
              <div className="flex overflow-hidden">
                <div className="flex gap-1 transition-transform duration-300" 
                  style={{ transform: `translateX(-${visibleRange.start * 48}px)` }}>
                  {visibleDigits.map((digit, index) => (
                    <DigitDisplay 
                      key={visibleRange.start + index} 
                      digit={digit} 
                      current={visibleRange.start + index === currentIndex}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center items-center my-2">
            <div className="h-1 w-20 bg-gray-200 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-blue-500" 
                animate={{ width: `${(currentIndex / 20) * 100}%` }}
                transition={{ type: "spring", stiffness: 100 }}
              />
            </div>
          </div>

          {gameState === 'playing' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-center items-center mb-6"
            >
              <p className="text-gray-500 text-sm flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-amber-500" />
                {currentIndex === 0 
                  ? "Enter the first digit after the decimal point" 
                  : `You've memorized ${currentIndex} digits so far!`}
              </p>
            </motion.div>
          )}
        </div>

        <Keypad 
          onDigitPress={handleDigitInput} 
          disabled={gameState !== 'playing'} 
        />
      </div>

      {gameState === 'gameover' && (
        <GameOverModal score={currentIndex} onRestart={handleRestart} />
      )}
    </motion.div>
  );
};

export default PiGame;