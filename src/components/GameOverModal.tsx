import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Award } from 'lucide-react';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-20"
    >
      <motion.div
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md mx-4 w-full"
      >
        <div className="flex flex-col items-center text-center">
          <div className="bg-purple-100 p-3 rounded-full mb-4">
            <Award className="h-8 w-8 text-purple-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Game Over!</h2>
          <p className="text-gray-600 mb-6">
            You memorized <span className="font-bold text-purple-600">{score}</span> digits of Pi!
          </p>
          
          <div className="w-full bg-gray-100 h-2 rounded-full mb-6">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full" 
              style={{ width: `${Math.min(score, 100)}%` }}
            />
          </div>

          {score > 0 && (
            <div className="mb-6 py-3 px-6 bg-amber-50 rounded-lg border border-amber-100">
              <p className="text-amber-800 text-sm">
                {score < 10 
                  ? "Great start! Keep practicing to improve your Pi memory." 
                  : score < 30 
                    ? "Impressive! You're getting good at memorizing Pi."
                    : "Amazing! You have serious memorization skills!"}
              </p>
            </div>
          )}
          
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 w-full justify-center"
          >
            <RefreshCcw className="h-5 w-5" />
            Try Again
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GameOverModal;