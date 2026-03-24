import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tv, Clock, BookOpen, Star, Calendar, ArrowRight, Video, Lock } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const LivePage = () => {
  const { userEnrollments } = useAppContext();
  const { user } = useAuth();
  const [activeDay, setActiveDay] = useState('Today');

  const liveClasses = [
    { id: 'l1', title: 'Calculus: Integration Intensive', subject: 'Math', time: 'LIVE NOW', status: 'live', teacher: 'Dr. RS Gupta', enrolled: userEnrollments.includes('c1'), preview: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&q=40&w=200' },
    { id: 'l2', title: 'Molecular Biology Live Doubt Session', subject: 'Biology', time: '18:00 PM', status: 'upcoming', teacher: 'Shilpa Rao', enrolled: userEnrollments.includes('c2'), preview: 'https://images.unsplash.com/photo-1579154273821-39691b0f5551?auto=format&fit=crop&q=40&w=200' },
  ];

  const timetable = {
    'Today': [
       { id: 't1', title: 'Newtonian Mechanics', time: '10:00 AM', teacher: 'Dr. RK Singh' },
       { id: 't2', title: 'Organic Reaction Mechanisms', time: '14:00 PM', teacher: 'Aman Deep' },
       { id: 't3', title: 'Modern Physics Quick Quiz', time: '16:00 PM', teacher: 'Samanth J.' },
    ],
    'Tomorrow': [
       { id: 't4', title: 'Complex Numbers: Part 1', time: '09:00 AM', teacher: 'Dr. RS Gupta' },
       { id: 't5', title: 'Plant Physiology', time: '11:00 AM', teacher: 'Shilpa Rao' },
       { id: 't6', title: 'Inorganic Chemistry Trends', time: '15:00 PM', teacher: 'Aman Deep' },
    ],
    'Thursday': [
       { id: 't7', title: 'Probability & Stats', time: '10:00 AM', teacher: 'Dr. RS Gupta' },
    ]
  };

  const handleJoin = (cls) => {
    if (!user) {
      toast.error('Please login to join the live session!');
      return;
    }
    if (!cls.enrolled) {
      toast.error('Enroll in the course to join this live class.');
      return;
    }
    toast.success('Entering Live Player...');
    // In production would navigate to /live/:id
  };

  const handleSetReminder = (cls) => {
    if (!user) {
      toast.error('Login to set reminders!');
      return;
    }
    toast.success("Reminder set! We'll notify you 15 min before.");
  };

  return (
    <div className="min-h-screen bg-white bg-graph pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-12">
          <div className="flex items-center gap-3 mb-4">
             <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center animate-pulse">
                <Video className="w-5 h-5 text-white" />
             </div>
             <div className="bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-orbitron font-bold tracking-widest border border-red-200 uppercase">Interactive Live Hub</div>
          </div>
          <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-brandNavy mb-4 section-header-underline pb-4">
            Live <span className="text-brandNavy">Studio</span>
          </h1>
          <p className="text-textSecondary font-exo text-lg">Tune in and ask doubts in real-time with Indias top mentors.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left: Ongoing Sessions & Timetable (Col 8) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            
            {/* Live Now Carousel/List */}
            <div className="bg-white border border-[#E5E5E5] rounded-[2rem] p-8 shadow-sm">
               <h3 className="font-orbitron font-bold text-xl text-brandNavy mb-6 flex items-center gap-3">
                 <span className="w-2 h-2 bg-red-600 rounded-full animate-ping"></span> Currently LIVE
               </h3>
               
               <div className="space-y-6">
                 {liveClasses.map((cls) => (
                   <div key={cls.id} className="group relative flex flex-col md:flex-row items-center gap-6 p-6 bg-[#F9F9F9] border border-[#E5E5E5] rounded-3xl transition-all hover:border-brandNavy hover:bg-white hover:shadow-lg">
                      <div className="w-full md:w-48 h-32 rounded-2xl overflow-hidden relative border border-black/5 bg-black/5">
                         <img src={cls.preview} alt={cls.title} className="w-full h-full object-cover group-hover:scale-105 transition-all" />
                         <div className="absolute inset-0 bg-black/20 flex flex-col items-center justify-center">
                            <Play className="w-10 h-10 text-white fill-white opacity-80" />
                         </div>
                      </div>
                      
                      <div className="flex-grow text-left">
                         <div className="flex items-center gap-3 mb-2">
                           <span className="text-[10px] font-orbitron font-bold text-white bg-red-600 px-2 py-0.5 rounded uppercase">{cls.time}</span>
                           <span className="text-xs font-exo font-bold text-brandBlue uppercase">{cls.subject}</span>
                         </div>
                         <h4 className="text-lg font-orbitron font-bold text-brandNavy mb-2 h-12 uppercase">{cls.title}</h4>
                         <div className="flex items-center gap-4 text-xs font-exo font-semibold text-textMuted uppercase mb-4">
                            <span>Teacher: {cls.teacher}</span>
                            <span>Enroll To Join</span>
                         </div>
                         
                         <div className="flex gap-4">
                            <button 
                              onClick={() => handleJoin(cls)}
                              className="btn-primary py-1.5 px-6 text-xs flex items-center justify-center gap-2"
                            >
                               {cls.enrolled ? <Video className="w-3 h-3" /> : <Lock className="w-3 h-3" />}
                               {cls.status === 'live' ? 'JOIN NOW' : 'SET REMINDER'}
                            </button>
                            {!cls.enrolled && <Link to="/courses" className="btn-secondary py-1.5 px-4 text-xs font-bold border-brandBlue text-brandBlue">LEARN MORE</Link>}
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>

            {/* Timetable Panel */}
            <div className="bg-white border border-[#E5E5E5] rounded-[2rem] p-8 shadow-sm">
               <h3 className="font-orbitron font-bold text-xl text-brandNavy mb-8 flex items-center gap-3">
                 <Calendar className="w-6 h-6 text-brandNavy" /> Weekly Timetable
               </h3>
               
               <div className="flex gap-4 mb-10 overflow-x-auto pb-4 no-scrollbar">
                  {Object.keys(timetable).map(day => (
                    <button 
                      key={day}
                      onClick={() => setActiveDay(day)}
                      className={`px-6 py-2 rounded-full font-exo font-bold uppercase text-xs tracking-widest transition-all ${activeDay === day ? 'bg-brandNavy text-white shadow-md' : 'bg-[#F5F5F5] text-textMuted hover:bg-brandNavy/5'}`}
                    >
                      {day}
                    </button>
                  ))}
               </div>

               <AnimatePresence mode="wait">
                 <motion.div 
                   key={activeDay}
                   initial={{ opacity: 0, x: 20 }}
                   animate={{ opacity: 1, x: 0 }}
                   exit={{ opacity: 0, x: -20 }}
                   className="space-y-4"
                 >
                    {timetable[activeDay]?.map((slot, index) => (
                      <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-6 bg-white border border-[#E5E5E5] rounded-2xl hover:bg-[#F9F9F9] transition-all hover:scale-[1.01] shadow-sm">
                         <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-brandNavy text-white rounded-xl flex flex-col items-center justify-center font-orbitron font-bold border border-brandNavy shadow-sm">
                               <Clock className="w-4 h-4 mb-1" />
                               <span className="text-[10px] uppercase font-bold text-white text-center leading-tight">LIVE<br/>Soon</span>
                            </div>
                            <div className="text-left">
                               <h5 className="font-orbitron font-bold text-brandNavy uppercase text-sm mb-1">{slot.title}</h5>
                               <p className="text-xs font-exo text-textMuted uppercase font-semibold">Teacher: {slot.teacher}  |  {slot.time}</p>
                            </div>
                         </div>
                         <button onClick={handleSetReminder} className="mt-4 md:mt-0 px-5 py-2 border border-brandNavy text-brandNavy font-exo font-bold text-[10px] rounded-full hover:bg-brandNavy hover:text-white transition-all uppercase tracking-widest">
                            Notify Me
                         </button>
                      </div>
                    ))}
                 </motion.div>
               </AnimatePresence>
            </div>
          </div>

          {/* Right: Sidebar Prompts (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-brandNavy p-8 rounded-[2rem] text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl group-hover:bg-brandYellow/10 transition-all"></div>
               <Tv className="w-12 h-12 text-brandYellow mb-6" />
               <h3 className="font-orbitron font-bold text-2xl mb-4 text-white">Unlock Infinite Streams</h3>
               <p className="font-exo text-white/80 leading-relaxed mb-10 font-medium">Join 2,50,000+ students learning live every day. Live doubt solving included.</p>
               <Link to="/pricing" className="btn-secondary border-white text-white bg-transparent w-full text-center py-4 flex items-center justify-center gap-2 hover:bg-white hover:text-brandNavy">
                 UPGRADE TO ELITE <ArrowRight className="w-4 h-4" />
               </Link>
            </div>

            <div className="bg-[#F9F9F9] p-8 border border-[#E5E5E5] rounded-[2rem] shadow-sm">
               <h4 className="font-orbitron font-bold text-lg text-brandNavy mb-6 uppercase tracking-tight">Today Statistics</h4>
               <ul className="space-y-4 font-exo font-semibold text-textSecondary text-sm uppercase">
                  <li className="flex justify-between"><span>Classes Streamed:</span> <span className="text-brandNavy font-bold">144+</span></li>
                  <li className="flex justify-between"><span>Average Rating:</span> <span className="text-brandYellow font-bold flex items-center gap-1">4.9/5 <Star className="w-3 h-3 fill-brandYellow" /></span></li>
                  <li className="flex justify-between"><span>Peak Viewers:</span> <span className="text-brandNavy font-bold">12,400+</span></li>
               </ul>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default LivePage;
