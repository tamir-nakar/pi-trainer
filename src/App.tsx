import React from 'react';
import PiGame from './components/PiGame';
import Leaderboard from './components/Leaderboard';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-3">
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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="sticky top-8">
              <Leaderboard />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;