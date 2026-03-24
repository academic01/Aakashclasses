import { motion } from 'framer-motion';
import { Target, Award, ArrowUp, Lock, Users } from 'lucide-react';

const GamificationShowcase = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative overflow-hidden bg-[#F9F9F9] border-y border-[#E5E5E5]">
      
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[10%] bg-black/[0.03] blur-3xl w-96 h-96 rounded-full z-0" />

      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-textPrimary mb-4 section-header-underline pb-4">
          Learn Like You <span className="text-textPrimary">Game</span>
        </h2>
        <p className="text-textSecondary font-exo text-lg max-w-2xl mx-auto mt-4">
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
          <div className="bg-white p-8 border border-[#E5E5E5] rounded-[2rem] shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            {/* Hexagon Rank Badge overlaying top left */}
            <div className="absolute top-4 left-4 w-16 h-16 bg-textPrimary flex items-center justify-center transform rotate-45 border border-black shadow-md">
              <span className="font-orbitron font-bold text-white transform -rotate-45 text-[10px]">ELITE</span>
            </div>

            <div className="flex flex-col items-center mt-6">
              <div className="w-24 h-24 rounded-full border-4 border-white outline outline-2 outline-textPrimary mb-4 overflow-hidden shadow-lg">
                <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" className="w-full h-full object-cover grayscale" />
              </div>
              <h3 className="font-orbitron font-bold text-2xl text-textPrimary">Rahul K.</h3>
              <p className="font-exo text-textSecondary font-semibold mt-1">Level 4 — Scholar</p>
            </div>

            {/* XP Bar */}
            <div className="mt-8">
              <div className="flex justify-between items-end mb-2">
                <span className="font-exo font-semibold text-sm text-textMuted uppercase">Next Rank: <span className="text-textPrimary">Legend</span></span>
                <span className="font-orbitron font-bold text-textPrimary text-sm">4,200 / 5,000 XP</span>
              </div>
              <div className="w-full h-4 bg-[#E5E5E5] rounded-full overflow-hidden border border-black/5 shadow-inner relative">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: '84%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                  className="h-full bg-textPrimary relative overflow-hidden"
                >
                  <div className="w-full h-full animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Streak & Badges row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Streak Counter */}
            <div className="bg-white shadow-sm rounded-2xl border border-[#E5E5E5] p-6 flex flex-col items-center justify-center text-center group hover:border-black transition-colors">
              <span className="text-4xl animate-flicker grayscale block mb-2">🔥</span>
              <div className="font-orbitron font-bold text-textPrimary text-xl tracking-tight">Day 14</div>
              <p className="text-xs font-exo text-textMuted mt-1 uppercase tracking-wider font-bold">Active Streak</p>
            </div>

            {/* Badges Mini view */}
            <div className="bg-white shadow-sm rounded-2xl border border-[#E5E5E5] p-4 flex flex-col justify-around">
               <div className="text-xs font-orbitron text-textMuted mb-2 text-center uppercase font-bold">LATEST BADGE</div>
               <div className="flex justify-center group relative cursor-pointer">
                 <div className="w-16 h-16 rounded-full border border-black bg-white flex items-center justify-center relative hover:scale-105 transition-transform shadow-sm">
                   <Target className="w-8 h-8 text-black" />
                 </div>
                 {/* Tooltip */}
                 <div className="opacity-0 group-hover:opacity-100 absolute -top-12 bg-black text-white px-3 py-1 rounded text-xs transition-opacity whitespace-nowrap z-20">
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
          <div className="bg-white p-6 md:p-8 h-full flex flex-col border border-[#E5E5E5] rounded-[2rem] shadow-sm">
            
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-[#F0F0F0]">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-textPrimary" />
                <h3 className="font-orbitron font-bold text-xl text-textPrimary">All-India Leaderboard</h3>
              </div>
              <div className="flex gap-2 text-sm font-exo">
                <button className="px-3 py-1 bg-textPrimary text-white rounded-[50px] shadow-sm font-bold">Weekly</button>
                <button className="px-3 py-1 text-textMuted hover:text-black transition-colors font-bold uppercase tracking-wider text-xs">All-time</button>
              </div>
            </div>

            <div className="space-y-3 flex-grow">
              
              {/* Rank 1 Row - Black/White Contrast */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-textPrimary text-white shadow-md transition-all">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-white w-6 text-lg">#1</div>
                   <div className="w-11 h-11 rounded-full border border-white/20 overflow-hidden shadow-sm"><img src="https://i.pravatar.cc/150?img=33" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-white tracking-wide">Priya M.</div>
                 </div>
                 <div className="font-orbitron text-white font-bold tracking-wider">12,450 XP</div>
              </div>

              {/* Rank 2 Row */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#333333] text-white shadow-sm transition-all hover:scale-[1.01]">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-white w-6">#2</div>
                   <div className="w-10 h-10 rounded-full border border-white/10 overflow-hidden"><img src="https://i.pravatar.cc/150?img=68" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-white">Arjun S.</div>
                 </div>
                 <div className="font-orbitron font-bold">11,900 XP</div>
              </div>

              {/* Rank 3 Row */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-[#666666] text-white transition-all hover:scale-[1.01]">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-white w-6">#3</div>
                   <div className="w-10 h-10 rounded-full border border-white/5 overflow-hidden"><img src="https://i.pravatar.cc/150?img=12" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-white">Nisha T.</div>
                 </div>
                 <div className="font-orbitron font-bold">11,200 XP</div>
              </div>

              {/* Separator - Subtle dots */}
              <div className="py-2 flex justify-center text-[#E5E5E5]">
                <div className="w-1.5 h-1.5 rounded-full bg-current mx-1"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-current mx-1"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-current mx-1"></div>
              </div>

              {/* User Row Highlighted - Light Mode with Dark Accent */}
              <div className="flex items-center justify-between p-4 rounded-xl bg-white border-l-4 border-l-textPrimary border border-[#E5E5E5] shadow-sm transition-all group hover:bg-[#F5F5F5]">
                 <div className="flex items-center gap-4">
                   <div className="font-orbitron font-bold text-textPrimary w-8 text-center text-sm">#342</div>
                   <div className="w-10 h-10 rounded-full border border-textPrimary overflow-hidden"><img src="https://i.pravatar.cc/150?img=11" alt="" className="grayscale" /></div>
                   <div className="font-exo font-bold text-textPrimary flex items-center gap-3">
                     Rahul K. <span className="bg-black text-white text-[9px] font-orbitron px-2 py-0.5 rounded-full uppercase">YOU</span>
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="font-orbitron text-textPrimary font-bold">4,200 XP</div>
                   <ArrowUp className="w-4 h-4 text-textPrimary" />
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
