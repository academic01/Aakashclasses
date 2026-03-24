import { motion } from 'framer-motion';
import { Target, Award, ArrowUp, Lock, Users } from 'lucide-react';

const GamificationShowcase = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative overflow-hidden">
      
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[10%] bg-gradient-radial from-white/5 to-transparent blur-3xl w-96 h-96 rounded-full z-0" />

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-white mb-4 section-header-underline pb-4">
          Learn Like You <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]">Game</span>
        </h2>
        <p className="text-textSec font-exo text-lg max-w-2xl mx-auto mt-4">
          Level up your preparation. Earn XP, maintain hot streaks, and unlock exclusive badges. Compete globally.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10 items-stretch">
        
        {/* Left Side - XP & Streak Widget (Col Span 5) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Main User Card */}
          <div className="glass-card p-6 border-white/20 relative overflow-hidden">
            {/* Hexagon Rank Badge overlaying top left */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-white/10 flex items-center justify-center transform rotate-45 border border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              <span className="font-orbitron font-bold text-white transform -rotate-45 text-xs drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]">ELITE</span>
            </div>

            <div className="flex flex-col items-center mt-6">
              <div className="w-24 h-24 rounded-full border-4 border-[#080808] outline outline-2 outline-white shadow-[0_0_20px_rgba(255,255,255,0.4)] mb-4">
                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full rounded-full object-cover grayscale" />
              </div>
              <h3 className="font-orbitron font-bold text-2xl text-white">Rahul K.</h3>
              <p className="font-exo text-white font-semibold mt-1">Level 4 — Scholar</p>
            </div>

            {/* XP Bar */}
            <div className="mt-8">
              <div className="flex justify-between items-end mb-2">
                <span className="font-exo font-semibold text-sm text-textSec">Next Rank: <span className="text-white">Legend</span></span>
                <span className="font-orbitron font-bold text-white text-sm">4,200 / 5,000 XP</span>
              </div>
              <div className="w-full h-4 bg-[#1A1A1A] rounded-full overflow-hidden border border-white/10 shadow-inner relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '84%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-white relative overflow-hidden"
                >
                  <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-black/10 to-transparent"></div>
                </motion.div>
                <div className="absolute inset-0 shadow-[0_0_15px_rgba(255,255,255,0.3)] pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* Streak & Badges row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Streak Counter */}
            <div className="bg-[rgba(255,255,255,0.04)] backdrop-blur-md rounded-xl border border-white/20 p-4 flex flex-col items-center justify-center text-center">
              <span className="text-4xl animate-flicker grayscale block mb-2">🔥</span>
              <div className="font-orbitron font-bold text-white text-lg">Day 14</div>
              <p className="text-xs font-exo text-textSec mt-1 uppercase tracking-wider">Active Streak</p>
            </div>

            {/* Badges Mini view */}
            <div className="glass-card p-4 flex flex-col justify-around">
               <div className="text-xs font-orbitron text-textSec mb-2 text-center">LATEST BADGE</div>
               <div className="flex justify-center group relative cursor-pointer">
                 <div className="w-16 h-16 rounded-full border border-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center relative">
                   <Target className="w-8 h-8 text-white" />
                 </div>
                 {/* Tooltip */}
                 <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-[#111111] border border-white text-white px-3 py-1 rounded text-xs transition-opacity whitespace-nowrap z-20">
                   Sharpshooter: 100% Accuracy in Test
                 </div>
               </div>
            </div>
          </div>

        </motion.div>

        {/* Right Side - Leaderboard (Col Span 7) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-7"
        >
          <div className="glass-card p-6 md:p-8 h-full flex flex-col">
            
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-white" />
                <h3 className="font-orbitron font-bold text-xl text-white">All-India Leaderboard</h3>
              </div>
              <div className="flex gap-2 text-sm font-exo">
                <button className="px-3 py-1 bg-white/10 text-white border border-white rounded-[50px]">Weekly</button>
                <button className="px-3 py-1 text-textSec hover:text-white transition-colors">All-time</button>
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              
              {/* Rank 1 Row */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-white shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-black w-6">#1</div>
                   <div className="w-10 h-10 rounded-full bg-gray-600 border border-black overflow-hidden"><img src="https://i.pravatar.cc/150?img=33" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-black">Priya M.</div>
                 </div>
                 <div className="font-orbitron text-black font-bold">12,450 XP</div>
              </div>

              {/* Rank 2 Row */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#CCCCCC] border border-[#CCCCCC] shadow-[0_0_10px_rgba(204,204,204,0.2)] transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-black w-6">#2</div>
                   <div className="w-10 h-10 rounded-full bg-gray-600 border border-black overflow-hidden"><img src="https://i.pravatar.cc/150?img=68" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-black">Arjun S.</div>
                 </div>
                 <div className="font-orbitron text-black font-bold">11,900 XP</div>
              </div>

              {/* Rank 3 Row */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[#888888] border border-[#888888] transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-white w-6">#3</div>
                   <div className="w-10 h-10 rounded-full bg-gray-600 border border-white overflow-hidden"><img src="https://i.pravatar.cc/150?img=12" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-white">Nisha T.</div>
                 </div>
                 <div className="font-orbitron text-white font-bold">11,200 XP</div>
              </div>

              {/* Separator */}
              <div className="py-2 flex justify-center text-white/20">
                <div className="w-1 h-1 rounded-full bg-current mx-1"></div>
                <div className="w-1 h-1 rounded-full bg-current mx-1"></div>
                <div className="w-1 h-1 rounded-full bg-current mx-1"></div>
              </div>

              {/* User Row Highlighted */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.08)] border border-white shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-colors">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-white w-8">#342</div>
                   <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-white overflow-hidden"><img src="https://i.pravatar.cc/150?img=11" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-white flex items-center gap-3">
                     Rahul K. <span className="bg-white text-black text-[10px] font-orbitron px-2 py-0.5 rounded-sm">YOU</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="font-orbitron text-white font-bold">4,200 XP</div>
                   <ArrowUp className="w-4 h-4 text-white" />
                 </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default GamificationShowcase;
