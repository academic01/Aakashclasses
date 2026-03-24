import { motion } from 'framer-motion';
import { Flame, Star, Trophy, Target, Award } from 'lucide-react';

const GamificationShowcase = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-radial from-purpleAccent/5 to-transparent blur-3xl rounded-full z-0" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-6 leading-tight">
            Learn Like You <span className="neon-text-orange text-orangeAccent">Game</span>
          </h2>
          <p className="text-gray-400 font-nunito text-lg mb-8 leading-relaxed">
            Level up your preparation. Earn XP for every chapter you master, maintain hot streaks, and unlock exclusive badges. Compete on the All-India Leaderboard.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-[0_4px_15px_rgba(255,107,0,0.1)]">
              <div className="bg-orangeAccent/20 p-3 rounded-full text-orangeAccent drop-shadow-[0_0_8px_rgba(255,107,0,0.8)]">
                <Flame className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-white">Daily Streaks</h4>
                <p className="text-sm text-gray-400 font-nunito">Study every day to keep the flame alive & earn bonus XP.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-[0_4px_15px_rgba(124,58,237,0.1)]">
              <div className="bg-purpleAccent/20 p-3 rounded-full text-purpleAccent drop-shadow-[0_0_8px_rgba(124,58,237,0.8)]">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-white">All-India Leaderboard</h4>
                <p className="text-sm text-gray-400 font-nunito">See where you stand among 2,50,000+ competitors.</p>
              </div>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10 shadow-[0_4px_15px_rgba(0,245,255,0.1)]">
              <div className="bg-cyanAccent/20 p-3 rounded-full text-cyanAccent drop-shadow-[0_0_8px_rgba(0,245,255,0.8)]">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-orbitron font-bold text-white">Unlock Badges</h4>
                <p className="text-sm text-gray-400 font-nunito">From 'Rookie' to 'Legend', collect them all.</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Visual Showcase Right Side - Gaming UI */}
        <motion.div 
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <div className="glass-card p-6 border-cyanAccent/30 relative">
            
            <div className="absolute -top-4 -right-4 bg-orangeAccent text-white px-4 py-1 rounded-full text-sm font-bold shadow-[0_0_15px_rgba(255,107,0,0.6)] animate-pulse flex items-center gap-1 font-orbitron">
              <Flame size={14} className="fill-white"/> 14 Day Streak!
            </div>

            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-6">
              <div className="w-16 h-16 rounded-full border-2 border-purpleAccent p-1 shadow-[0_0_15px_rgba(124,58,237,0.5)]">
                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full rounded-full object-cover" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-end mb-1">
                  <h3 className="font-orbitron font-bold text-xl text-white">Rahul K. <span className="text-xs text-purpleAccent ml-2 bg-purpleAccent/20 px-2 py-1 rounded">ELITE TIER</span></h3>
                  <span className="font-nunito font-bold text-cyanAccent">Level 42</span>
                </div>
                {/* XP Bar */}
                <div className="w-full h-3 bg-darkBg rounded-full overflow-hidden border border-white/10">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '75%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-cyanAccent to-purpleAccent"
                  />
                </div>
                <p className="text-xs text-right mt-1 text-gray-400 font-nunito">7,500 / 10,000 XP</p>
              </div>
            </div>

            <h4 className="font-orbitron font-bold text-gray-300 mb-4 text-sm">RECENT BADGES EARNED</h4>
            <div className="flex justify-around items-center bg-darkBg/50 p-4 rounded-xl border border-white/5">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-orangeAccent/20 border border-orangeAccent/50 flex items-center justify-center text-orangeAccent shadow-[0_0_10px_rgba(255,107,0,0.5)] mb-2">
                  <Flame size={20} />
                </div>
                <span className="text-xs font-nunito text-gray-400">Streak Master</span>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-cyanAccent/20 border border-cyanAccent/50 flex items-center justify-center text-cyanAccent shadow-[0_0_10px_rgba(0,245,255,0.5)] mb-2">
                  <Target size={20} />
                </div>
                <span className="text-xs font-nunito text-gray-400">Sharpshooter</span>
              </div>
              <div className="flex flex-col items-center opacity-40 grayscale">
                <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center mb-2">
                  <Star size={20} />
                </div>
                <span className="text-xs font-nunito text-gray-600">Locked</span>
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GamificationShowcase;
