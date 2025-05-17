import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCcw, Award, Trophy } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface GameOverModalProps {
  score: number;
  onRestart: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ score, onRestart }) => {
  const [playerName, setPlayerName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmitScore = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!playerName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await supabase
        .from('leaderboard')
        .insert([{ player_name: playerName.trim(), score }]);
      setSubmitted(true);
    } catch (error) {
      console.error('Error submitting score:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {!submitted ? (
            <form onSubmit={handleSubmitScore} className="w-full mb-6">
              <div className="mb-4">
                <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Enter your name to join the leaderboard
                </label>
                <input
                  type="text"
                  id="playerName"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your name"
                  maxLength={50}
                  required
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting || !playerName.trim()}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                ) : (
                  <>
                    <Trophy className="h-5 w-5" />
                    Submit Score
                  </>
                )}
              </button>
            </form>
          ) : (
            <div className="mb-6 py-3 px-6 bg-green-50 rounded-lg border border-green-100">
              <p className="text-green-800 text-sm">
                Your score has been added to the leaderboard!
              </p>
            </div>
          )}
          
          <button
            onClick={onRestart}
            className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg transition-all duration-200 w-full justify-center"
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