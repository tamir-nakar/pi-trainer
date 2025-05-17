import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface LeaderboardEntry {
  player_name: string;
  score: number;
  created_at: string;
}

const Leaderboard: React.FC = () => {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard')
        .select('*')
        .order('score', { ascending: false })
        .limit(10);

      if (error) throw error;
      setEntries(data || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md">
      <div className="flex items-center gap-2 mb-6">
        <Trophy className="h-6 w-6 text-yellow-500" />
        <h2 className="text-xl font-bold text-gray-800">Top Players</h2>
      </div>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : entries.length === 0 ? (
        <p className="text-center text-gray-500 py-8">No scores yet. Be the first!</p>
      ) : (
        <div className="space-y-2">
          {entries.map((entry, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 p-3 rounded-lg bg-gray-50"
            >
              <div className="w-8 flex justify-center">
                {index < 3 && (
                  <Medal className={`h-5 w-5 ${
                    index === 0 ? 'text-yellow-500' :
                    index === 1 ? 'text-gray-400' :
                    'text-amber-700'
                  }`} />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{entry.player_name}</p>
                <p className="text-sm text-gray-500">
                  {new Date(entry.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-lg font-bold text-blue-600">{entry.score}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Leaderboard;