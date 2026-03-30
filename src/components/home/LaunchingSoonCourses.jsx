import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bell } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const categories = [
  {
    id: 1,
    title: 'Class VI-X Maths',
    subtitle: 'Foundation & Boards',
    active: true,
    tags: ['Maths', 'CBSE/ICSE'],
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&q=80",
    color: "#F5A623",
    link: "/checkout/maths-6-10"
  },
  {
    id: 2,
    title: 'Class VI-X Science',
    subtitle: 'Physics, Chem, Bio',
    active: true,
    tags: ['Science', 'Experiments'],
    image: "https://images.unsplash.com/photo-1532094349884-543559a8e9f6?w=400&q=80",
    color: "#F5A623",
    link: "/checkout/science-6-10"
  },
  {
    id: 3,
    title: 'Class XI-XII Science',
    subtitle: 'Board Exam Excellence',
    active: true,
    tags: ['PCM', 'PCB'],
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=80",
    color: "#0D2240",
    link: "/checkout/science-11-12"
  },
  {
    id: 4,
    title: 'Class XI-XII Commerce',
    subtitle: 'Accounts, Economics',
    active: true,
    tags: ['Commerce', 'B.St'],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80",
    color: "#0D2240",
    link: "/checkout/commerce-11-12"
  },
  {
    id: 5,
    title: 'Class XI-XII Humanities',
    subtitle: 'History, Pol Sci',
    active: true,
    tags: ['Arts', 'Humanities'],
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    color: "#0D2240",
    link: "/checkout/humanities-11-12"
  },
  {
    id: 6,
    title: 'SSC Preparation',
    subtitle: 'CGL, CHSL, MTS',
    active: true,
    tags: ['Govt Jobs', 'SSC'],
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80",
    color: "#22C55E",
    link: "/checkout/ssc"
  },
  {
    id: 7,
    title: 'Railway ExamPrep',
    subtitle: 'RRB NTPC, Group D',
    active: true,
    tags: ['Railways', 'Govt Jobs'],
    image: "https://images.unsplash.com/photo-1474487548417-781cb71495f3?w=400&q=80",
    color: "#22C55E",
    link: "/checkout/railway"
  },
  {
    id: 8,
    title: 'DSSSB Preparation',
    subtitle: 'PRT, TGT, PGT',
    active: true,
    tags: ['Teaching', 'Delhi Govt'],
    image: "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=400&q=80",
    color: "#22C55E",
    link: "/checkout/dsssb"
  },
  {
    id: 9,
    title: 'English Course',
    subtitle: 'Grammar & Literature',
    active: true,
    tags: ['Language', 'English'],
    image: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=400&q=80",
    color: "#F5A623",
    link: "/checkout/english"
  },
  {
    id: 10,
    title: 'SST / Social Studies',
    subtitle: 'History, Geo, Civics',
    active: true,
    tags: ['Social Studies', 'Boards'],
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
    color: "#F5A623",
    link: "/checkout/sst"
  },
  {
    id: 11,
    title: 'JEE Mains & Advanced',
    active: false,
    tags: ['IIT JEE', 'Engineering'],
    image: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400&q=80",
    color: "#888888"
  },
  {
    id: 12,
    title: 'NEET UG',
    active: false,
    tags: ['Medical', 'MBBS Entrance'],
    image: "https://images.unsplash.com/photo-1532094349884-543559a8e9f6?w=400&q=80",
    color: "#888888"
  },
  {
    id: 13,
    title: 'CUET',
    active: false,
    tags: ['UG Entrance', 'Universities'],
    image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&q=80",
    color: "#888888"
  }
];

const LaunchingSoonCourses = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [notifyEmail, setNotifyEmail] = useState('');
  const [showNotifyModal, setShowNotifyModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loadingMap, setLoadingMap] = useState({});

  const handleEnrollClick = async (e, cat) => {
    e.preventDefault();
    setLoadingMap(prev => ({ ...prev, [cat.id]: true }));
    
    setTimeout(() => {
      setLoadingMap(prev => ({ ...prev, [cat.id]: false }));
      if (!currentUser) {
        toast.error("Please login to enroll", { icon: '🔒', position: 'bottom-right' });
        navigate('/login');
      } else {
        navigate(cat.link);
      }
    }, 600);
  };

  const handleNotifyClick = (cat) => {
    setSelectedCourse(cat);
    setShowNotifyModal(true);
  };

  const submitNotify = (e) => {
    e.preventDefault();
    if (!notifyEmail) return;
    
    setLoadingMap(prev => ({ ...prev, 'notify': true }));
    setTimeout(() => {
        setLoadingMap(prev => ({ ...prev, 'notify': false }));
        toast.success(`You'll be notified when ${selectedCourse?.title} launches! ✅`, {
          position: 'bottom-right',
          duration: 3000
        });
        setShowNotifyModal(false);
        setNotifyEmail('');
    }, 800);
  };

  return (
    <section className="py-16 px-6 md:px-20 bg-brandBeige relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto text-left mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl md:text-4xl font-outfit font-black text-[#0A0A0A] mb-3">Featured Courses</h2>
          <p className="text-[#888888] text-md lg:text-lg font-medium max-w-2xl text-left">Prepare with excellence. Explore our active courses or get notified about our upcoming competitive exam programs.</p>
        </div>
        <Link to="/courses" className="btn-secondary whitespace-nowrap px-8 py-3 min-h-[44px] min-w-[120px] rounded-full border-2 border-[#0D2240] text-[#0D2240] font-bold hover:bg-[#0D2240] hover:text-white transition-all hover:scale-105 inline-flex items-center justify-center cursor-pointer">
          See All Courses
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={`group flex flex-col relative overflow-hidden bg-brandBeige border border-brandNavy/5 rounded-[24px] transition-all duration-300 ${cat.active ? 'hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] hover:-translate-y-2' : 'opacity-80'}`}
          >
            {!cat.active && (
              <div className="launching-soon-overlay flex flex-col items-center justify-center absolute inset-0 bg-brandBeige/70 backdrop-blur-sm z-20">
                 <div className="bg-[#0D2240] text-white px-4 py-1 text-xs font-black uppercase tracking-widest rounded-sm mb-4">LAUNCHING SOON</div>
                 <div className="bg-brandBeige p-4 rounded-xl text-[#0D2240] font-black text-sm flex items-center gap-2 shadow-xl group-hover:scale-110 transition-transform">
                   Stay Tuned 🚀
                 </div>
              </div>
            )}

            <div className="w-full h-48 relative overflow-hidden rounded-t-[24px]">
              <img src={cat.image} alt={cat.title} className="w-full h-full object-cover rounded-t-[24px] group-hover:scale-105 transition-transform duration-700" loading="lazy" style={{ borderRadius: '16px 16px 0 0' }} />
            </div>

            <div className="flex flex-col h-full p-8 pt-6">
              <h3 className="text-2xl font-outfit font-black text-[#0A0A0A] mb-2">{cat.title}</h3>
              <p className="text-[#888888] font-bold text-sm mb-6">{cat.subtitle || 'Competitive Entrance Exam'}</p>

              <div className="flex flex-wrap gap-2 mb-8 mt-auto">
                {cat.tags.map(tag => (
                  <span key={tag} className="px-4 py-1.5 bg-lightBg2 text-[#888888] text-[11px] font-bold rounded-full uppercase tracking-widest">{tag}</span>
                ))}
              </div>

              {cat.active ? (
                <button 
                  onClick={(e) => handleEnrollClick(e, cat)}
                  disabled={loadingMap[cat.id]}
                  className="btn-primary flex items-center justify-between w-full p-4 bg-lightBg2 text-[#0A0A0A] hover:bg-[#0D2240] hover:text-white rounded-2xl transition-all font-outfit font-black min-h-[44px] cursor-pointer disabled:opacity-50"
                >
                  <span>{loadingMap[cat.id] ? 'Processing...' : 'Enroll Now'}</span>
                  <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-2" />
                </button>
              ) : (
                <button 
                  onClick={() => handleNotifyClick(cat)}
                  disabled={loadingMap[cat.id]}
                  className="btn-secondary flex items-center justify-center w-full p-4 border-2 border-dashed border-[#CCCCCC] text-[#888888] hover:border-[#F5A623] hover:text-[#F5A623] hover:bg-[#F5A623]/5 rounded-2xl transition-all font-outfit font-black min-h-[44px] cursor-pointer"
                >
                  <Bell className="w-5 h-5 mr-3" /> Notify Me
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Notify Modal */}
      {showNotifyModal && (
        <div className="fixed inset-0 bg-[#0D2240]/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="bg-brandBeige rounded-[32px] p-8 max-w-md w-full shadow-2xl relative border border-brandNavy/5"
          >
            <button onClick={() => setShowNotifyModal(false)} className="absolute top-6 right-6 text-gray-400 hover:text-gray-900 font-bold cursor-pointer min-h-[44px] min-w-[44px]">✕</button>
            <h3 className="text-2xl font-outfit font-black text-[#0A0A0A] mb-2 mt-4 text-center">Get Notified! 🔔</h3>
            <p className="text-[#888888] text-center mb-6 font-medium">We'll notify you when <strong>{selectedCourse?.title}</strong> launches.</p>
            <form onSubmit={submitNotify} className="flex flex-col gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required 
                value={notifyEmail}
                onChange={e => setNotifyEmail(e.target.value)}
                className="w-full bg-lightBg2 border border-brandNavy/5 px-6 py-4 rounded-xl outline-none focus:border-[#F5A623] transition-colors"
              />
              <button 
                type="submit" 
                disabled={loadingMap['notify']}
                className="btn-primary bg-[#F5A623] text-white font-bold py-4 rounded-xl hover:bg-[#ff9f00] transition-colors cursor-pointer min-h-[44px] shadow-lg shadow-[#F5A623]/20 hover:-translate-y-1 transform flex items-center justify-center"
              >
                {loadingMap['notify'] ? 'Subscribing...' : 'Subscribe'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default LaunchingSoonCourses;
