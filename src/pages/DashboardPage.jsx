import React from 'react';
import { motion } from 'framer-motion';
import { Play, ClipboardList, Clock, ArrowRight, User, Settings, LogOut, Layout, Zap, Award } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import GamificationShowcase from '../components/home/GamificationShowcase';

const DashboardPage = () => {
  const { courses, userEnrollments } = useAppContext();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const enrolled = courses.filter(c => userEnrollments.includes(c.id));

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] bg-graph pb-20 text-left">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* Welcome Block */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 bg-brandNavy rounded-[2rem] flex items-center justify-center text-white border-4 border-white shadow-xl">
                <User size={32} />
             </div>
             <div>
                <h1 className="text-3xl font-orbitron font-bold text-brandNavy uppercase tracking-tight">
                  Welcome, <span className="text-brandNavy">{user?.displayName || 'Scholar'}</span>!
                </h1>
                <p className="text-textMuted font-exo font-semibold uppercase tracking-widest text-xs mt-1">Status: Active Student | Level 42</p>
             </div>
          </div>
          
          <div className="flex gap-4">
             <button className="btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 uppercase tracking-widest font-bold border-brandNavy text-brandNavy"><Settings size={14} /> Settings</button>
             <button onClick={handleLogout} className="btn-secondary px-6 py-2.5 text-xs flex items-center gap-2 uppercase tracking-widest font-bold border-red-500 text-red-500 hover:bg-red-50"><LogOut size={14} /> Sign Out</button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Feed (Col 8) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* My Courses */}
            <section>
              <div className="flex justify-between items-end mb-8">
                 <h2 className="text-2xl font-orbitron font-bold text-brandNavy uppercase section-header-underline pb-3">My <span className="text-brandNavy">Courses</span></h2>
                 <Link to="/courses" className="text-xs font-bold font-orbitron text-brandBlue hover:underline uppercase tracking-tighter">Explore More</Link>
              </div>

              {enrolled.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {enrolled.map(course => (
                     <div key={course.id} className="bg-white border border-[#E5E5E5] p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all group flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                           <div className="w-16 h-16 rounded-2xl overflow-hidden shrink-0">
                              <img src={course.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
                           </div>
                           <div className="text-left flex-grow">
                              <h4 className="font-orbitron font-bold text-brandNavy uppercase text-sm line-clamp-1">{course.title}</h4>
                              <p className="text-[10px] font-exo font-bold text-textMuted uppercase">Next: Chapter 4 Quiz</p>
                           </div>
                        </div>
                        <div className="w-full h-1.5 bg-[#F0F0F0] rounded-full overflow-hidden">
                           <div className="h-full bg-brandNavy rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <Link to={`/courses/${course.id}`} className="btn-primary w-full py-2.5 text-xs flex items-center justify-center gap-2 rounded-xl">
                           <Play size={12} fill="white" /> CONTINUE LEARNING
                        </Link>
                     </div>
                   ))}
                </div>
              ) : (
                <div className="p-12 border-2 border-dashed border-[#E5E5E5] rounded-[3rem] text-center flex flex-col items-center">
                   <div className="w-16 h-16 bg-[#F5F5F5] rounded-full flex items-center justify-center text-textMuted mb-6"><Layout size={32} /></div>
                   <h3 className="text-xl font-orbitron font-bold text-brandNavy mb-2 uppercase">No courses yet</h3>
                   <p className="text-textSecondary font-exo mb-8 max-w-sm font-medium">Start your journey today by enrolling in a free or premium batch.</p>
                   <Link to="/courses" className="btn-primary px-10 py-3 uppercase tracking-widest text-xs">Browse Categories</Link>
                </div>
              )}
            </section>

            {/* Daily Schedule */}
            <section className="bg-white p-8 rounded-[3rem] border border-[#E5E5E5] shadow-sm relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow/5 rounded-full blur-3xl"></div>
               <h2 className="text-2xl font-orbitron font-bold text-brandNavy mb-10 uppercase flex items-center gap-3">
                  <Clock className="w-6 h-6" /> Todays Plan
               </h2>
               <div className="space-y-6">
                  <div className="flex items-center gap-6 p-4 bg-[#F9F9F9] rounded-2xl border border-[#F0F0F0] hover:bg-white transition-all shadow-sm group">
                     <span className="text-xs font-orbitron font-bold text-textMuted uppercase tracking-widest">10:00 AM</span>
                     <div className="w-px h-8 bg-[#E5E5E5]"></div>
                     <div className="flex-grow">
                        <h4 className="font-orbitron font-bold text-brandNavy uppercase text-sm">Thermodynamics Live Class</h4>
                        <p className="text-[10px] text-brandBlue font-exo font-bold uppercase">Physics | Dr. RK Singh</p>
                     </div>
                     <Link to="/live" className="btn-secondary px-4 py-2 text-[10px] uppercase font-black border-brandNavy text-brandNavy scale-90 opacity-0 group-hover:opacity-100 transition-all">Join Early</Link>
                  </div>
                  <div className="flex items-center gap-6 p-4 bg-[#F9F9F9] rounded-2xl border border-[#F0F0F0] hover:bg-white transition-all shadow-sm group">
                     <span className="text-xs font-orbitron font-bold text-textMuted uppercase tracking-widest">14:30 PM</span>
                     <div className="w-px h-8 bg-[#E5E5E5]"></div>
                     <div className="flex-grow">
                        <h4 className="font-orbitron font-bold text-brandNavy uppercase text-sm">Chapter Mock Test: Algebra</h4>
                        <p className="text-[10px] text-textMuted font-exo font-bold uppercase">Mathematics | 15 Questions</p>
                     </div>
                     <Link to="/test-series" className="btn-secondary px-4 py-2 text-[10px] uppercase font-black border-brandNavy text-brandNavy scale-90 opacity-0 group-hover:opacity-100 transition-all">Start Test</Link>
                  </div>
               </div>
            </section>
          </div>

          {/* Sidebar (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-10">
             
             {/* Gamification Hub */}
             <div className="bg-white border border-[#E5E5E5] rounded-[3rem] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-10">
                   <h3 className="font-orbitron font-black text-lg text-brandNavy uppercase tracking-tighter">Your Progress</h3>
                   <div className="bg-brandYellow/10 text-brandYellow p-2 rounded-xl border border-brandYellow/20"><Zap size={20} /></div>
                </div>
                
                <div className="space-y-10">
                   <div>
                      <div className="flex justify-between text-[10px] font-orbitron font-bold text-brandNavy uppercase mb-3 px-1">
                         <span>XP PROGRESS</span>
                         <span>3,450 / 5,000</span>
                      </div>
                      <div className="h-4 bg-[#F5F5F5] rounded-full overflow-hidden p-1 border border-[#E5E5E5] shadow-inner">
                         <div className="h-full bg-brandNavy rounded-full shadow-[0_0_10px_rgba(13,34,64,0.3)]" style={{ width: '69%' }}></div>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-4">
                      <div className="bg-[#F9F9F9] p-4 rounded-3xl border border-[#F0F0F0] text-center">
                         <div className="text-2xl font-orbitron font-bold text-brandNavy">12</div>
                         <div className="text-[8px] font-exo font-black text-textMuted uppercase opacity-60">COURSE BADGES</div>
                      </div>
                      <div className="bg-[#F9F9F9] p-4 rounded-3xl border border-[#F0F0F0] text-center">
                         <div className="text-2xl font-orbitron font-bold text-brandNavy">#840</div>
                         <div className="text-[8px] font-exo font-black text-textMuted uppercase opacity-60">NATL RANK</div>
                      </div>
                   </div>

                   <button className="btn-secondary w-full flex items-center justify-center gap-2 py-3 text-xs uppercase font-black tracking-widest border-brandBlue text-brandBlue hover:bg-brandBlue/5 transition-all">
                      <Award size={14} /> View Achievements
                   </button>
                </div>
             </div>

             <div className="bg-brandNavy p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden flex flex-col items-center text-center group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-brandYellow/5 transition-all"></div>
                <h3 className="font-orbitron font-black text-2xl uppercase mb-4 tracking-tight leading-tight">Refer A Friend.<br/>Earn Credits.</h3>
                <p className="text-white/60 font-exo font-semibold text-sm mb-8 max-w-[200px] uppercase tracking-tighter">Get ₹500 in your wallet for every successful enrollment.</p>
                <button className="btn-secondary w-full border-white text-white bg-transparent py-4 font-bold text-xs uppercase hover:bg-white hover:text-brandNavy transition-all tracking-widest">GET REFERRAL LINK</button>
             </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DashboardPage;
