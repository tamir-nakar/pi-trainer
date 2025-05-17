import React from 'react';
import PiGame from './components/PiGame';
import { motion } from 'framer-motion';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full">
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
    </div>
  );
}

export default App;