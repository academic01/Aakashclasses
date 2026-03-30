import React from 'react';
import { motion } from 'framer-motion';
import { Backpack, BookOpen, Landmark, ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const categories = [
  {
    id: 1,
    title: 'Class VI - X',
    subtitle: 'Foundation & Boards',
    active: true,
    tags: ['All Subjects', 'Maths', 'Science', 'English'],
    Icon: <Backpack className="w-12 h-12" />,
    color: "#F5A623"
  },
  {
    id: 2,
    title: 'Class XI - XII Science',
    subtitle: 'Physics, Chemistry, Biology, Maths',
    active: true,
    tags: ['PCM', 'PCB', 'PCMB'],
    Icon: <BookOpen className="w-12 h-12" />,
    color: "#0D2240"
  },
  {
    id: 3,
    title: 'Class XI - XII Commerce',
    subtitle: 'Accounts, Economics, B.ST',
    active: true,
    tags: ['Accounts', 'Business', 'Economics'],
    Icon: <BookOpen className="w-12 h-12" />,
    color: "#0D2240"
  },
  {
    id: 4,
    title: 'Class XI - XII Humanities',
    subtitle: 'History, Pol Sci, English',
    active: true,
    tags: ['SST', 'Arts', 'Optional Subjects'],
    Icon: <BookOpen className="w-12 h-12" />,
    color: "#0D2240"
  },
  {
    id: 5,
    title: 'Govt. Job Exams',
    subtitle: 'SSC, Railway, DSSSB',
    active: true,
    tags: ['SSC', 'Railway', 'DSSSB', 'Others'],
    Icon: <Landmark className="w-12 h-12" />,
    color: "#22C55E"
  },
  {
    id: 6,
    title: 'JEE Mains & Advanced',
    active: false,
    tags: ['IIT JEE', 'Engineering'],
    Icon: <BookOpen className="w-12 h-12" />,
    color: "#888888"
  },
  {
    id: 7,
    title: 'NEET UG',
    active: false,
    tags: ['Medical', 'MBBS Entrance'],
    Icon: <BookOpen className="w-12 h-12" />,
    color: "#888888"
  },
  {
    id: 8,
    title: 'CUET',
    active: false,
    tags: ['UG Entrance', 'University Admission'],
    Icon: <BookOpen className="w-12 h-12" />,
    color: "#888888"
  }
];

const LaunchingSoonCourses = () => {
  const handleNotify = () => {
    toast.success("We'll notify you when this course launches!", {
      style: { background: '#0D2240', color: '#fff' },
      icon: '🚀'
    });
  };

  return (
    <section className="py-24 px-6 md:px-20 bg-white relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-left mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-black text-[#0A0A0A] mb-4">Featured Courses</h2>
        <p className="text-[#888888] text-lg lg:text-xl font-medium max-w-2xl">Prepare with excellence. Explore our active courses or get notified about our upcoming competitive exam programs.</p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`group relative overflow-hidden bg-white border border-[#E5E5E5] rounded-[32px] p-8 transition-all duration-300 ${cat.active ? 'hover:shadow-2xl hover:-translate-y-2' : 'opacity-75'}`}
          >
            {/* Launching Soon Overlay */}
            {!cat.active && (
              <div className="launching-soon-overlay flex flex-col items-center justify-center">
                 <div className="launching-soon-badge">LAUNCHING SOON</div>
                 <div className="bg-white/90 backdrop-blur-sm p-4 rounded-xl text-[#0D2240] font-black text-sm flex items-center gap-2 group-hover:scale-110 transition-transform">
                   Stay Tuned 🚀
                 </div>
              </div>
            )}

            <div className="flex flex-col h-full">
              <div className="mb-6 h-16 w-16 rounded-2xl flex items-center justify-center bg-[#F8F8F8]" style={{ color: cat.color }}>
                {cat.Icon}
              </div>

              <h3 className="text-2xl font-outfit font-black text-[#0A0A0A] mb-2">{cat.title}</h3>
              <p className="text-[#888888] font-bold text-sm mb-6">{cat.subtitle || 'Competitive Entrance Exam'}</p>

              <div className="flex flex-wrap gap-2 mb-10 mt-auto">
                {cat.tags.map(tag => (
                  <span key={tag} className="px-5 py-2 bg-[#F8F8F8] text-[#888888] text-xs font-bold rounded-full uppercase tracking-widest">{tag}</span>
                ))}
              </div>

              {cat.active ? (
                <Link to="/courses" className="flex items-center justify-between w-full p-4 bg-[#F8F8F8] hover:bg-[#0D2240] hover:text-white rounded-2xl transition-all font-outfit font-black group-hover:shadow-lg">
                  <span>Explore Program</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </Link>
              ) : (
                <button 
                  onClick={handleNotify}
                  className="flex items-center justify-center w-full p-4 border-2 border-dashed border-[#CCCCCC] text-[#888888] hover:border-[#F5A623] hover:text-[#F5A623] rounded-2xl transition-all font-outfit font-black"
                >
                  <Bell className="w-5 h-5 mr-3" /> Notify Me
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LaunchingSoonCourses;
