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
        <div className="inline-flex items-center justify-center gap-2 mb-4 bg-orange-100 text-orange-600 px-4 py-2 rounded-full font-black text-sm uppercase tracking-widest shadow-sm">
           <Zap className="w-5 h-5 fill-current" /> Supercharge Learning
        </div>
        <h2 className="text-5xl md:text-7xl font-black text-brandNavy mb-6 tracking-tight">
          Learn Like A <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-yellow-500 transform inline-block hover:scale-105 transition-transform">Champion!</span>
        </h2>
        <p className="text-gray-500 font-bold text-xl max-w-2xl mx-auto leading-relaxed">
          Unlock badges, keep your daily streak alive, and rule the All-India Leaderboard. Education is now your favorite game! 🎮
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 relative z-10 items-stretch">
        
        {/* Left Side - Personal Profile (Col Span 5) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-5 flex flex-col gap-6"
        >
          {/* Main User Card */}
          <div className="bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-4 border-gray-100 relative overflow-hidden group">
            
            <div className="h-24 bg-gradient-to-r from-[#0D2240] to-blue-800 w-full absolute top-0 left-0"></div>

            <div className="relative z-20 flex flex-col items-center pt-8 pb-8 px-6">
               <div className="w-28 h-28 rounded-full border-4 border-white shadow-xl relative mt-4 bg-white flex items-center justify-center">
                 {user ? (
                   <img src={user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=F97316&color=fff&bold=true&size=128`} className="w-full h-full rounded-full object-cover" alt="User" />
                 ) : (
                   <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center">
                      <Lock className="w-10 h-10 text-gray-400" />
                   </div>
                 )}

                 {user && (
                    <div className="absolute -bottom-2 -right-2 bg-yellow-400 text-brandNavy w-10 h-10 rounded-full flex items-center justify-center font-black text-sm shadow-md border-2 border-white transform rotate-12">
                      Lvl 4
                    </div>
                 )}
               </div>
               
               <h3 className="font-black text-3xl text-brandNavy mt-4 mb-1 text-center leading-tight">
                 {user ? userName : 'Who are you?'}
               </h3>
               <p className="text-gray-500 font-bold text-sm uppercase tracking-widest mb-6">
                 {user ? '🏆 Scholar Rank' : 'Guest Player'}
               </p>

               {!user ? (
                  <Link to="/login" className="w-full">
                    <button className="w-full bg-orange-500 text-white font-black uppercase tracking-widest text-lg py-5 rounded-[24px] shadow-[0_8px_0_#C2410C] active:shadow-[0_0px_0_#C2410C] active:translate-y-2 transition-all flex items-center justify-center gap-3">
                      <Lock className="w-6 h-6" /> Unlock Profile
                    </button>
                  </Link>
               ) : (
                  <div className="w-full bg-gray-50 p-5 rounded-3xl border-2 border-gray-100">
                    <div className="flex justify-between items-end mb-3">
                      <span className="font-bold text-sm text-gray-400 uppercase tracking-widest flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" /> Next: Gold
                      </span>
                      <span className="font-black text-brandNavy text-lg">4,200 XP</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden border-2 border-gray-100/50 relative shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: '84%' }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full"
                      />
                    </div>
                    <p className="text-center text-xs font-bold text-gray-400 mt-3 uppercase tracking-widest">800 XP to Level Up!</p>
                  </div>
               )}
            </div>
          </div>

          {/* Streak & Badges row */}
          <div className="grid grid-cols-2 gap-6">
            <div className={`bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-4 border-gray-100 flex flex-col justify-center items-center text-center !transition-transform hover:-translate-y-2 ${!user && 'opacity-60 relative'}`}>
              {!user && <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] flex items-center justify-center rounded-[28px]"><Lock className="text-gray-400 w-8 h-8" /></div>}
              
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                 <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-4xl">🔥</motion.div>
              </div>
              <div className="font-black text-brandNavy text-3xl mb-1">{user ? '14' : '0'}<span className="text-lg text-gray-400 font-bold ml-1">Days</span></div>
              <div className="text-xs font-bold text-orange-500 uppercase tracking-widest">Hot Streak</div>
            </div>

            <div className={`bg-white rounded-[32px] p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-4 border-gray-100 flex flex-col justify-center items-center text-center relative !transition-transform hover:-translate-y-2 ${!user && 'opacity-60 relative'}`}>
               {!user && <div className="absolute inset-0 z-10 bg-white/40 backdrop-blur-[2px] flex items-center justify-center rounded-[28px]"><Lock className="text-gray-400 w-8 h-8" /></div>}
               
               <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Newest Badge</div>
               
               {user ? (
                 <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 shadow-xl border-4 border-white flex items-center justify-center relative transform -rotate-6">
                    <Trophy className="w-10 h-10 text-white fill-current" />
                 </div>
               ) : (
                 <div className="w-20 h-20 rounded-full bg-gray-100 border-4 border-dashed border-gray-300 flex items-center justify-center">
                   <Award className="w-8 h-8 text-gray-400" />
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
          <div className="bg-white rounded-[40px] shadow-[0_8px_30px_rgba(0,0,0,0.06)] border-4 border-gray-100 flex-grow flex flex-col overflow-hidden">
            
            {/* Leaderboard Header */}
            <div className="p-8 pb-6 border-b-4 border-gray-100 bg-gray-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
                  <Trophy className="w-8 h-8 fill-current" />
                </div>
                <div>
                  <h3 className="font-black text-3xl text-brandNavy flex items-center gap-2">Leaderboard <Sparkles className="w-6 h-6 text-yellow-500" /></h3>
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mt-1">Top players nationwide</p>
                </div>
              </div>
              
              <div className="flex gap-2 bg-gray-200/50 p-2 rounded-2xl">
                <button className="px-6 py-3 bg-white text-brandNavy rounded-xl shadow-sm font-black text-sm transition-all">Weekly</button>
                <button className="px-6 py-3 text-gray-500 hover:text-brandNavy hover:bg-white/50 rounded-xl font-bold text-sm transition-colors">All-Time</button>
              </div>
            </div>

            {/* List */}
            <div className="p-6 space-y-4 flex-grow bg-white">
              
              {/* Rank 1 */}
              <div className="flex items-center justify-between p-4 rounded-3xl bg-yellow-50 border-2 border-yellow-200 transform hover:-translate-y-1 transition-transform shadow-sm group">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 flex items-center justify-center text-yellow-600 font-black text-3xl">1</div>
                   <div className="w-14 h-14 rounded-full border-4 border-yellow-300 shadow-md overflow-hidden bg-white">
                     <img src="https://ui-avatars.com/api/?name=Priya+M&background=EAB308&color=fff&bold=true" alt="Rank 1" className="w-full h-full object-cover" />
                   </div>
                   <div className="font-black text-gray-900 text-xl group-hover:text-yellow-600 transition-colors">Priya M.</div>
                 </div>
                 <div className="font-black text-yellow-700 bg-yellow-200/50 px-5 py-2 rounded-2xl text-lg">12,450 XP</div>
              </div>

              {/* Rank 2 */}
              <div className="flex items-center justify-between p-4 rounded-3xl bg-gray-50 border-2 border-gray-200 transform hover:-translate-y-1 transition-transform shadow-sm group">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 flex items-center justify-center text-gray-500 font-black text-3xl">2</div>
                   <div className="w-14 h-14 rounded-full border-4 border-gray-300 shadow-md overflow-hidden bg-white">
                     <img src="https://ui-avatars.com/api/?name=Arjun+S&background=9CA3AF&color=fff&bold=true" alt="Rank 2" className="w-full h-full object-cover" />
                   </div>
                   <div className="font-black text-gray-900 text-xl group-hover:text-gray-500 transition-colors">Arjun S.</div>
                 </div>
                 <div className="font-black text-gray-600 bg-gray-200/50 px-5 py-2 rounded-2xl text-lg">11,900 XP</div>
              </div>

              {/* Rank 3 */}
              <div className="flex items-center justify-between p-4 rounded-3xl bg-orange-50 border-2 border-orange-200 transform hover:-translate-y-1 transition-transform shadow-sm group">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 flex items-center justify-center text-orange-600 font-black text-3xl">3</div>
                   <div className="w-14 h-14 rounded-full border-4 border-orange-300 shadow-md overflow-hidden bg-white">
                     <img src="https://ui-avatars.com/api/?name=Nisha+T&background=F97316&color=fff&bold=true" alt="Rank 3" className="w-full h-full object-cover" />
                   </div>
                   <div className="font-black text-gray-900 text-xl group-hover:text-orange-600 transition-colors">Nisha T.</div>
                 </div>
                 <div className="font-black text-orange-700 bg-orange-200/50 px-5 py-2 rounded-2xl text-lg">11,200 XP</div>
              </div>

              <div className="py-2 flex justify-center gap-2 opacity-50">
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                <div className="w-2 h-2 rounded-full bg-gray-300"></div>
              </div>

              {/* You Row */}
              {user ? (
                 <div className="flex items-center justify-between p-4 rounded-3xl bg-brandNavy text-white shadow-[0_8px_30px_rgba(13,34,64,0.3)] relative overflow-hidden group hover:scale-[1.02] transition-transform">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl"></div>
                   <div className="flex items-center gap-4 relative z-10">
                     <div className="w-12 flex justify-center text-orange-400 font-black text-2xl">342</div>
                     <div className="w-14 h-14 rounded-full border-4 border-orange-400 bg-white overflow-hidden shadow-lg">
                        <img src={user.photoURL || `https://ui-avatars.com/api/?name=${userName}&background=F97316&color=fff&bold=true`} alt="User" className="w-full h-full object-cover" />
                     </div>
                     <div className="font-black text-white text-xl flex items-center gap-3">
                       {userName}
                       <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-xl uppercase font-black tracking-widest">You</span>
                     </div>
                   </div>
                   <div className="flex items-center gap-4 relative z-10 pr-2">
                     <div className="font-black text-white text-xl">4,200 XP</div>
                     <div className="bg-green-500 p-2 rounded-full shadow-lg">
                       <ArrowUp className="w-4 h-4 text-white font-black" strokeWidth={4} />
                     </div>
                   </div>
                 </div>
              ) : (
                 <div className="flex flex-col items-center justify-center p-8 rounded-3xl border-4 border-dashed border-gray-200 bg-gray-50 text-gray-400">
                   <Lock className="w-8 h-8 mb-3 text-gray-300" />
                   <p className="font-black text-xl text-gray-400">Login to join the Leaderboard</p>
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
