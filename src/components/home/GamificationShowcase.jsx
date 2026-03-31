import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, ArrowUp, Lock, Users, Zap, Trophy, Flame, Star, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const GamificationShowcase = () => {
  const { user } = useAuth();
  
  const userName = user?.displayName || 'Guest User';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1200px] mx-auto relative overflow-hidden bg-brandBeige">
      
      {/* Decorative Floating Elements */}
      <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-10 left-10 text-4xl opacity-50 z-0">🌟</motion.div>
      <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute bottom-20 right-10 text-5xl opacity-50 z-0">🚀</motion.div>
      <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-40 right-20 text-4xl opacity-50 z-0">🎯</motion.div>

      <div className="text-center mb-16 relative z-10">
        <div className="inline-flex items-center justify-center gap-2 mb-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-bold text-xs uppercase tracking-widest shadow-sm">
           <Zap className="w-4 h-4 fill-current" /> Supercharge Learning
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-brandNavy mb-6 tracking-tight">
          Learn Like A <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 transform inline-block hover:scale-105 transition-transform">Champion!</span>
        </h2>
        <p className="text-gray-500 font-semibold text-lg max-w-2xl mx-auto leading-relaxed">
          Unlock badges, keep your daily streak alive, and rule the All-India Leaderboard. Education is now your favorite game! 🎮
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10 items-stretch">
        
        {/* Left Side - Personal Profile (Col Span 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Main User Card */}
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 relative overflow-hidden group">
            
            <div className="h-20 bg-gradient-to-r from-[#0D2240] to-blue-800 w-full absolute top-0 left-0"></div>

            <div className="relative z-20 flex flex-col items-center pt-8 pb-8 px-6">
               <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg relative mt-2 bg-white flex items-center justify-center">
                 {user ? (
                   <img src={user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=F97316&color=fff&size=128`} className="w-full h-full rounded-full object-cover" alt="User" />
                 ) : (
                   <div className="w-full h-full rounded-full bg-gray-50 flex items-center justify-center">
                      <Lock className="w-8 h-8 text-gray-400" />
                   </div>
                 )}

                 {user && (
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-brandNavy w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-md border-2 border-white transform rotate-12">
                      Lvl 4
                    </div>
                 )}
               </div>
               
               <h3 className="font-bold text-2xl text-brandNavy mt-4 mb-1 text-center leading-tight">
                 {user ? userName : 'Who are you?'}
               </h3>
               <p className="text-gray-500 font-semibold text-xs uppercase tracking-widest mb-6">
                 {user ? '🏆 Scholar Rank' : 'Guest Player'}
               </p>

               {!user ? (
                  <Link to="/login" className="w-full">
                    <button className="w-full bg-orange-500 text-white font-bold uppercase tracking-widest text-sm py-4 rounded-2xl shadow-[0_4px_0_#C2410C] active:shadow-[0_0px_0_#C2410C] active:translate-y-1 transition-all flex items-center justify-center gap-2">
                      <Lock className="w-5 h-5" /> Unlock Profile
                    </button>
                  </Link>
               ) : (
                  <div className="w-full bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <div className="flex justify-between items-end mb-2">
                      <span className="font-semibold text-xs text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" /> Next: Gold
                      </span>
                      <span className="font-bold text-brandNavy text-sm">4,200 XP</span>
                    </div>
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden relative shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '84%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                      />
                    </div>
                    <p className="text-center text-[10px] font-bold text-gray-400 mt-2 uppercase tracking-widest">800 XP to Level Up!</p>
                  </div>
               )}
            </div>
          </div>

          {/* Streak & Badges row */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center items-center text-center transition-transform hover:-translate-y-1 ${!user && 'opacity-70 relative'}`}>
              {!user && <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[1px] flex items-center justify-center rounded-3xl"><Lock className="text-gray-400 w-6 h-6" /></div>}
              
              <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-3">
                 <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-2xl">🔥</motion.div>
              </div>
              <div className="font-bold text-brandNavy text-2xl mb-0.5">{user ? '14' : '0'}<span className="text-sm text-gray-400 font-semibold ml-1">Days</span></div>
              <div className="text-[10px] font-bold text-orange-500 uppercase tracking-widest">Hot Streak</div>
            </div>

            <div className={`bg-white rounded-3xl p-5 shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-center items-center text-center relative transition-transform hover:-translate-y-1 ${!user && 'opacity-70 relative'}`}>
               {!user && <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[1px] flex items-center justify-center rounded-3xl"><Lock className="text-gray-400 w-6 h-6" /></div>}
               
               <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-3">Newest Badge</div>
               
               {user ? (
                 <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-md border-2 border-white flex items-center justify-center relative transform -rotate-6">
                    <Trophy className="w-6 h-6 text-white fill-current" />
                 </div>
               ) : (
                 <div className="w-14 h-14 rounded-full bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                   <Award className="w-6 h-6 text-gray-300" />
                 </div>
               )}
            </div>
          </div>
        </motion.div>

        {/* Right Side - Leaderboard (Col Span 7) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-7 flex flex-col"
        >
          <div className="bg-white rounded-3xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-gray-100 flex-grow flex flex-col overflow-hidden">
            
            {/* Leaderboard Header */}
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-sm">
                  <Trophy className="w-6 h-6 fill-current" />
                </div>
                <div>
                  <h3 className="font-bold text-xl text-brandNavy flex items-center gap-2">Leaderboard <Sparkles className="w-4 h-4 text-yellow-500" /></h3>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">Top players nationwide</p>
                </div>
              </div>
              
              <div className="flex gap-2 bg-gray-100 p-1.5 rounded-xl">
                <button className="px-4 py-2 bg-white text-brandNavy rounded-lg shadow-sm font-semibold text-xs transition-all">Weekly</button>
                <button className="px-4 py-2 text-gray-500 hover:text-brandNavy hover:bg-white/50 rounded-lg font-semibold text-xs transition-colors">All-Time</button>
              </div>
            </div>

            {/* List */}
            <div className="p-5 space-y-3 flex-grow bg-white">
              
              {/* Rank 1 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-yellow-50/50 border border-yellow-100 hover:bg-yellow-50 transition-colors group">
                 <div className="flex items-center gap-4">
                   <div className="w-8 flex justify-center text-yellow-600 font-bold text-xl">1</div>
                   <div className="w-10 h-10 rounded-full border-2 border-yellow-200 shadow-sm overflow-hidden bg-white">
                     <img src="https://ui-avatars.com/api/?name=Priya+M&background=EAB308&color=fff" alt="Rank 1" className="w-full h-full object-cover" />
                   </div>
                   <div className="font-semibold text-gray-800 text-base group-hover:text-yellow-600 transition-colors">Priya M.</div>
                 </div>
                 <div className="font-bold text-yellow-700 bg-yellow-100/50 px-3 py-1.5 rounded-xl text-sm">12,450 XP</div>
              </div>

              {/* Rank 2 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/50 border border-gray-100 hover:bg-gray-50 transition-colors group">
                 <div className="flex items-center gap-4">
                   <div className="w-8 flex justify-center text-gray-400 font-bold text-xl">2</div>
                   <div className="w-10 h-10 rounded-full border-2 border-gray-200 shadow-sm overflow-hidden bg-white">
                     <img src="https://ui-avatars.com/api/?name=Arjun+S&background=9CA3AF&color=fff" alt="Rank 2" className="w-full h-full object-cover" />
                   </div>
                   <div className="font-semibold text-gray-800 text-base group-hover:text-gray-500 transition-colors">Arjun S.</div>
                 </div>
                 <div className="font-bold text-gray-600 bg-gray-100/50 px-3 py-1.5 rounded-xl text-sm">11,900 XP</div>
              </div>

              {/* Rank 3 */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-orange-50/50 border border-orange-100 hover:bg-orange-50 transition-colors group">
                 <div className="flex items-center gap-4">
                   <div className="w-8 flex justify-center text-orange-500 font-bold text-xl">3</div>
                   <div className="w-10 h-10 rounded-full border-2 border-orange-200 shadow-sm overflow-hidden bg-white">
                     <img src="https://ui-avatars.com/api/?name=Nisha+T&background=F97316&color=fff" alt="Rank 3" className="w-full h-full object-cover" />
                   </div>
                   <div className="font-semibold text-gray-800 text-base group-hover:text-orange-600 transition-colors">Nisha T.</div>
                 </div>
                 <div className="font-bold text-orange-600 bg-orange-100/50 px-3 py-1.5 rounded-xl text-sm">11,200 XP</div>
              </div>

              <div className="py-2 flex justify-center gap-1.5 opacity-40">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div>
              </div>

              {/* You Row */}
              {user ? (
                 <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0D2240] text-white shadow-md relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl"></div>
                   <div className="flex items-center gap-4 relative z-10">
                     <div className="w-8 flex justify-center text-orange-400 font-bold text-sm">342</div>
                     <div className="w-10 h-10 rounded-full border-2 border-orange-400/50 bg-white overflow-hidden">
                        <img src={user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=F97316&color=fff`} alt="User" className="w-full h-full object-cover" />
                     </div>
                     <div className="font-bold text-white text-base flex items-center gap-2">
                       {userName}
                       <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-lg uppercase font-bold tracking-widest leading-none">You</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-3 relative z-10 pr-2">
                     <div className="font-bold text-white text-sm">4,200 XP</div>
                     <div className="bg-green-500 p-1.5 rounded-full">
                       <ArrowUp className="w-3 h-3 text-white font-bold" strokeWidth={3} />
                     </div>
                   </div>
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center p-6 rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 text-gray-400">
                   <Lock className="w-6 h-6 mb-2 text-gray-300" />
                   <p className="font-bold text-sm text-gray-400">Login to join the Leaderboard</p>
                 </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>

    </section>
  );
};

export default GamificationShowcase;
