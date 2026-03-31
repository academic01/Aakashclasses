import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, ArrowUp, Lock, Users, Zap, Trophy, Orbit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const GamificationShowcase = () => {
  const { user } = useAuth();
  
  const userName = user?.displayName || 'Guest User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative overflow-hidden bg-brandBeige border-y border-brandNavy/5">
      
      {/* Background decoration */}
      <div className="absolute top-[20%] left-[10%] bg-orange-500/10 blur-[100px] w-96 h-96 rounded-full z-0 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[10%] bg-blue-500/10 blur-[100px] w-96 h-96 rounded-full z-0 pointer-events-none" />

      <div className="text-center mb-16 relative z-10">
        <div className="flex items-center justify-center gap-2 mb-4">
           <Zap className="w-6 h-6 text-orange-500" />
           <span className="text-sm font-black text-orange-500 tracking-widest uppercase">Gamified Learning</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-brandNavy mb-6 tracking-tight">
          Learn Like You <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Game</span>
        </h2>
        <p className="text-gray-500 font-medium text-lg max-w-2xl mx-auto">
          Level up your preparation. Earn XP, maintain hot streaks, and unlock exclusive badges. Compete with students nationwide.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        
        {/* Left Side - XP & Streak Widget (Col Span 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Main User Card */}
          <div className="bg-brandNavy text-brandBeige p-8 rounded-[2rem] shadow-2xl relative overflow-hidden group border border-brandNavy/20 relative">
            
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[50px] transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full blur-[40px] transform -translate-x-1/2 translate-y-1/2"></div>

            {!user && (
              <div className="absolute inset-0 bg-brandNavy/60 backdrop-blur-md z-30 flex flex-col items-center justify-center p-6 text-center rounded-[2rem]">
                <Lock className="w-12 h-12 text-gray-400 mb-4" />
                <h4 className="text-xl font-black text-white mb-2">Login to Sync Progress</h4>
                <p className="text-sm text-gray-300 mb-6">Track your XP, streaks, and compete on the leaderboard!</p>
                <Link to="/login" className="bg-orange-500 text-brandNavy font-black px-8 py-3 rounded-xl hover:bg-orange-400 transition-colors">
                  Login Now
                </Link>
              </div>
            )}

            <div className={`relative z-20 ${!user ? 'opacity-30 pointer-events-none' : ''}`}>
               {/* Hexagon Rank Badge overlaying top left */}
               <div className="absolute top-0 left-0 bg-gradient-to-br from-orange-400 to-red-500 text-white px-4 py-1.5 rounded-br-2xl rounded-tl-xl font-black text-xs uppercase tracking-widest shadow-lg">
                 Level 4 Elite
               </div>

               <div className="flex flex-col items-center mt-8">
                 <div className="w-24 h-24 rounded-full border-4 border-brandNavy outline outline-2 outline-orange-500 mb-6 overflow-hidden shadow-lg shadow-orange-500/20 bg-brandNavy flex items-center justify-center text-4xl font-black text-orange-500">
                   {user ? userInitial : 'G'}
                 </div>
                 <h3 className="font-black text-2xl text-white tracking-tight">{userName}</h3>
                 <p className="text-orange-400 font-bold text-sm mt-1 uppercase tracking-widest">Scholar Rank</p>
               </div>

               {/* XP Bar */}
               <div className="mt-10">
                 <div className="flex justify-between items-end mb-3">
                   <span className="font-bold text-xs text-gray-400 uppercase tracking-widest">Next: <span className="text-white">Legend</span></span>
                   <span className="font-black text-white text-sm">4,200 <span className="text-gray-400">/ 5,000 XP</span></span>
                 </div>
                 <div className="w-full h-3 bg-brandNavy/50 rounded-full overflow-hidden border border-white/10 relative">
                   <motion.div 
                     initial={{ width: 0 }}
                     whileInView={{ width: '84%' }}
                     viewport={{ once: true }}
                     transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                     className="h-full bg-gradient-to-r from-orange-500 to-red-500 relative overflow-hidden"
                   >
                     <div className="w-full h-full animate-pulse bg-white/20"></div>
                   </motion.div>
                 </div>
               </div>
            </div>
          </div>

          {/* Streak & Badges row */}
          <div className="grid grid-cols-2 gap-4">
            {/* Streak Counter */}
            <div className={`bg-white shadow-sm rounded-3xl border border-brandNavy/5 p-6 flex flex-col items-center justify-center text-center group hover:-translate-y-1 transition-transform overflow-hidden relative ${!user ? 'opacity-50' : ''}`}>
              {!user && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px]"><Lock className="w-6 h-6 text-gray-400" /></div>}
              <div className="absolute top-0 right-0 w-16 h-16 bg-orange-100 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <span className="text-4xl block mb-2 origin-bottom group-hover:rotate-12 transition-transform">🔥</span>
              <div className="font-black text-brandNavy text-2xl tracking-tight">{user ? 'Day 14' : 'Day 0'}</div>
              <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">Active Streak</p>
            </div>

            {/* Badges Mini view */}
            <div className={`bg-white shadow-sm rounded-3xl border border-brandNavy/5 p-6 flex flex-col items-center justify-center relative hover:-translate-y-1 transition-transform ${!user ? 'opacity-50' : ''}`}>
               {!user && <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/50 backdrop-blur-[2px]"><Lock className="w-6 h-6 text-gray-400" /></div>}
               <p className="text-[10px] font-black text-gray-400 mb-3 uppercase tracking-widest">Latest Badge</p>
               <div className="flex justify-center group/badge relative cursor-pointer">
                 <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-white shadow-md flex items-center justify-center relative hover:scale-110 transition-transform">
                   <Trophy className="w-8 h-8 text-blue-500" />
                 </div>
                 {/* Tooltip */}
                 <div className="opacity-0 group-hover/badge:opacity-100 absolute -top-14 bg-brandNavy text-white px-4 py-2 rounded-xl text-xs font-bold transition-opacity whitespace-nowrap z-20 shadow-xl pointer-events-none">
                   Sharpshooter: 100% Accuracy
                 </div>
               </div>
            </div>
          </div>

        </motion.div>

        {/* Right Side - Leaderboard (Col Span 7) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7"
        >
          <div className="bg-white p-6 md:p-8 h-full flex flex-col border border-brandNavy/5 rounded-[2rem] shadow-sm relative overflow-hidden">
            
            {/* Decorative Orbit */}
            <div className="absolute -top-10 -right-10 text-brandNavy/5 pointer-events-none">
              <Orbit className="w-64 h-64 animate-spin-slow" />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-black text-2xl text-brandNavy tracking-tight">All-India Leaderboard</h3>
              </div>
              <div className="flex gap-2 p-1 bg-gray-100 rounded-xl">
                <button className="px-5 py-2 bg-white text-brandNavy rounded-lg shadow-sm font-black text-sm transition-all">Weekly</button>
                <button className="px-5 py-2 text-gray-500 hover:text-brandNavy rounded-lg font-black text-sm transition-colors">All-Time</button>
              </div>
            </div>

            <div className="space-y-4 flex-grow relative z-10">
              
              {/* Rank 1 Row */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-500/20 transform hover:-translate-y-1 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="font-black text-white/50 text-2xl w-8">#1</div>
                   <div className="w-12 h-12 rounded-full border-2 border-white/30 overflow-hidden bg-brandNavy flex items-center justify-center font-black">P</div>
                   <div className="font-bold text-lg tracking-wide">Priya M.</div>
                 </div>
                 <div className="font-black text-xl tracking-wider">12,450 XP</div>
              </div>

              {/* Rank 2 Row */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-brandNavy text-white shadow-md transform hover:-translate-y-1 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="font-black text-white/30 text-xl w-8">#2</div>
                   <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden bg-white/10 flex items-center justify-center font-black text-brandBeige">A</div>
                   <div className="font-bold text-lg">Arjun S.</div>
                 </div>
                 <div className="font-black text-lg">11,900 XP</div>
              </div>

              {/* Rank 3 Row */}
              <div className="flex items-center justify-between p-5 rounded-2xl bg-gray-800 text-white transform hover:-translate-y-1 transition-all">
                 <div className="flex items-center gap-4">
                   <div className="font-black text-white/30 text-xl w-8">#3</div>
                   <div className="w-12 h-12 rounded-full border-2 border-white/10 overflow-hidden bg-white/10 flex items-center justify-center font-black text-brandBeige">N</div>
                   <div className="font-bold text-lg">Nisha T.</div>
                 </div>
                 <div className="font-black text-lg">11,200 XP</div>
              </div>

              {/* Separator */}
              <div className="py-2 flex justify-center text-gray-300">
                <div className="w-1.5 h-1.5 rounded-full bg-current mx-1"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-current mx-1"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-current mx-1"></div>
              </div>

              {/* User Row Highlighted */}
              <div className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all ${user ? 'bg-orange-50 border-orange-200 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-50'}`}>
                 <div className="flex items-center gap-4">
                   <div className="font-black text-orange-300 text-lg w-8">#342</div>
                   <div className="w-12 h-12 rounded-full border-2 border-orange-200 overflow-hidden bg-white flex items-center justify-center font-black text-orange-500">
                     {user ? userInitial : 'G'}
                   </div>
                   <div className="font-bold text-lg text-brandNavy flex items-center gap-3">
                     {userName}
                     {user && <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-md uppercase font-black tracking-widest">YOU</span>}
                   </div>
                 </div>
                 <div className="flex items-center gap-3">
                   <div className="font-black text-brandNavy text-lg">{user ? '4,200 XP' : '0 XP'}</div>
                   <ArrowUp className="w-5 h-5 text-green-500" />
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
