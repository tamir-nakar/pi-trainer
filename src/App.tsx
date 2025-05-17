import React from 'react';
import PiGame from './components/PiGame';
import Leaderboard from './components/Leaderboard';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 items-start">
        <div className="flex-1 w-full">
          <PiGame />
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 text-center text-xs text-gray-400"
          >
            Challenge yourself to memorize the digits of Pi
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full lg:w-auto"
        >
          <Leaderboard />
        </motion.div>
      </div>
    </div>
  );
}

export default App;