import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

const slidesData = [
  {
    id: 1,
    leftBg: '#0D2240',
    rightBg: 'linear-gradient(135deg, #1a3a6b 0%, #0D2240 100%)',
    topTag: { text: "📚 School Education", color: "#F5A623", bg: "rgba(245,166,35,0.15)", border: "#F5A623" },
    classBadge: { text: "VIth — Xth CLASSES", bg: "#F5A623", color: "#0D2240", shadow: "rgba(245,166,35,0.4)" },
    subjectLine: "MATHS · SCIENCE · ENGLISH · SST",
    facultyNameplate: { name: "Kishan Sharma", title: "EXPERT FACULTY", iconColor: "#F5A623", borderColor: "#F5A623" },
    features: [
      "15+ Years Experience", "Complete NCERT Syllabus", "Live + Recorded Classes", "Regular Doubt Sessions"
    ],
    featureIconBg: "#F5A623",
    featureIconColor: "#0D2240",
    button1: { text: "Enroll Now →", link: "/courses?category=school", bg: "#F5A623", color: "#0D2240", shadow: "rgba(245,166,35,0.5)" },
    button2: { text: "View Courses", link: "/courses?category=school" },
    image: "/hero-slide-2.jpg",
    floatingBadge: { rating: "4.9", students: "5,000+" }
  },
  {
    id: 2,
    leftBg: '#1a0533',
    rightBg: 'linear-gradient(135deg, #2d1b69, #1a0533)',
    topTag: { text: "🎓 Senior Secondary", color: "#A78BFA", bg: "transparent", border: "#A78BFA" },
    classBadge: { text: "XIth — XIIth CLASSES", bg: "linear-gradient(135deg, #7C3AED, #9F67FF)", color: "white", shadow: "rgba(124,58,237,0.4)" },
    subjectLine: "COMMERCE · SCIENCE · HUMANITIES",
    facultyNameplate: { name: "Aakash", title: "EXPERT FACULTY", iconColor: "#A78BFA", borderColor: "#A78BFA" },
    features: [
      "15+ Years Experience", "Board Exam Focused", "Study Materials & Notes", "Regular Doubt Sessions"
    ],
    featureIconBg: "#7C3AED",
    featureIconColor: "white",
    button1: { text: "Enroll Now →", link: "/courses?category=senior", bg: "linear-gradient(135deg, #7C3AED, #9F67FF)", color: "white", shadow: "rgba(124,58,237,0.5)" },
    button2: { text: "View Courses", link: "/courses?category=senior" },
    image: "/hero-slide-1.jpg", 
    floatingBadge: { rating: "4.8", students: "3,000+" }
  },
  {
    id: 3,
    leftBg: '#0a3d1f',
    rightBg: 'linear-gradient(135deg, #0a3d1f, #052210)',
    topTag: { text: "🏛️ Government Exams", color: "#4ADE80", bg: "transparent", border: "#4ADE80" },
    classBadge: { text: "GOVT. JOBS PREP", bg: "linear-gradient(135deg, #16A34A, #22C55E)", color: "white", shadow: "rgba(34,197,94,0.4)" },
    subjectLine: "SSC · RAILWAY · DSSSB · MORE",
    facultyNameplate: { name: "Vikas", title: "GOVT. JOB SPECIALIST", iconColor: "#4ADE80", borderColor: "#4ADE80" },
    features: [
      "9+ Years Experience", "Comprehensive Courses", "Practice Sets & Mock Tests", "Current Affairs Updates"
    ],
    featureIconBg: "#22C55E",
    featureIconColor: "white",
    button1: { text: "Enroll Now →", link: "/courses?category=govt", bg: "linear-gradient(135deg, #16A34A, #22C55E)", color: "white", shadow: "rgba(34,197,94,0.5)" },
    button2: { text: "View Courses", link: "/courses?category=govt" },
    image: "/hero-slide-3.jpg", 
    floatingBadge: { rating: "4.8", students: "2,000+" }
  },
  {
    id: 4,
    isSpecial: true,
    leftBg: 'linear-gradient(135deg, #0D2240, #0a1628)',
    rightBg: 'transparent',
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState(0); // to force progress bar animation restart

  // Auto-advance
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slidesData.length);
      setKey(prev => prev + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [current, isHovered]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slidesData.length);
    setKey(prev => prev + 1);
  };
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    setKey(prev => prev + 1);
  };
  const goToSlide = (index) => {
    setCurrent(index);
    setKey(prev => prev + 1);
  };

  const currentSlide = slidesData[current];

  return (
    <section 
      className="relative w-full overflow-hidden !mt-0 !pt-0 bg-[#0D2240] h-auto md:h-[480px] lg:h-[580px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        .hero-diagonal-cut {
          clip-path: none;
        }
        @media (min-width: 768px) {
          .hero-diagonal-cut {
             clip-path: polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%);
          }
        }
        @keyframes custom-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-custom-float {
          animation: custom-float 4s ease-in-out infinite;
        }
        @keyframes fill-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fill-progress {
          animation: fill-progress 5s linear forwards;
        }
      `}</style>
      
      <div className="relative w-full h-full flex flex-col md:flex-row pb-[60px] md:pb-0">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`slide-${current}`}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, zIndex: -1 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full flex flex-col-reverse md:flex-row"
            style={{ background: currentSlide.leftBg }}
          >
            
            {currentSlide.isSpecial ? (
               /* === CUET SLIDE (SPECIAL) === */
               <div className="w-full h-full flex flex-col md:flex-row relative z-10 px-[24px] md:px-[60px] lg:px-[80px]">
                 
                 {/* Left Text */}
                 <div className="w-full md:w-[60%] h-full flex flex-col justify-center py-[40px] md:py-0 z-20">
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-wrap gap-3 mb-[20px]">
                       <span className="bg-[#22C55E] text-white text-[12px] font-bold px-[12px] py-[4px] rounded-[4px] animate-pulse whitespace-nowrap">🆕 NEW BATCH STARTING</span>
                       <span className="bg-[#F5A623] text-[#0D2240] text-[12px] font-bold px-[12px] py-[4px] rounded-[4px] whitespace-nowrap">📅 1st April 2026</span>
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }} className="mb-[8px]">
                       <h1 className="text-white text-[42px] md:text-[56px] font-[900] leading-none mb-2 font-orbitron drop-shadow-lg">
                         CUET <span className="text-[#F5A623]">2026</span>
                       </h1>
                       <p className="text-white/80 text-[16px] font-exo">Central Universities Entrance Test</p>
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }} className="mb-[24px]">
                       <div className="text-[#F5A623] font-bold animate-[pulse_1.5s_ease-in-out_infinite] text-[15px]">⚡ Limited Seats Available!</div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }} className="flex flex-col gap-[10px] mb-[32px]">
                       {["Complete Syllabus Coverage", "Domain + General Test Prep", "Language Section Mastery", "Previous Year Papers", "Expert Faculty Guidance"].map((f, i) => (
                         <div key={i} className="flex items-center gap-[8px]">
                           <div className="w-[18px] h-[18px] bg-[#22C55E] rounded-full flex outline outline-1 outline-white/20 items-center justify-center shrink-0">
                             <Check className="w-3 h-3 text-white stroke-[3px]" />
                           </div>
                           <span className="text-white text-[14px] font-[500] font-exo">{f}</span>
                         </div>
                       ))}
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="flex flex-col md:flex-row gap-[16px]">
                       <Link to="/courses/cuet" className="w-full md:w-auto text-center inline-block px-[32px] py-[14px] rounded-[50px] font-[900] text-[16px] text-[#0D2240] hover:-translate-y-[3px] transition-transform shadow-[0_0_20px_rgba(245,166,35,0.6)] font-inter" style={{ background: 'linear-gradient(135deg, #F5A623, #e6951a)' }}>
                         🚀 Enroll Now
                       </Link>
                       <Link to="/courses/cuet" className="w-full md:w-auto text-center inline-block bg-transparent border-[2px] border-white text-white px-[28px] py-[14px] rounded-[50px] font-bold hover:bg-white hover:text-[#0D2240] transition-colors text-[16px] font-inter">
                         📋 View Syllabus
                       </Link>
                    </motion.div>
                 </div>
                 
                 {/* Right Special Graphics */}
                 <div className="w-full md:w-[40%] h-[250px] md:h-full relative overflow-hidden flex items-center justify-center -order-1 md:order-1 mt-[40px] md:mt-0">
                    <div className="absolute text-[#ffffff08] text-[80px] lg:text-[150px] font-[900] font-orbitron top-1/2 -translate-y-1/2 right-[0%] lg:-right-[10%] rotate-90 pointer-events-none select-none tracking-widest">
                      CUET
                    </div>
                    {/* Floating Price Card */}
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="absolute bg-white rounded-[20px] p-[20px] shadow-2xl z-30 animate-custom-float">
                       <span className="text-[#888888] text-[12px] font-bold uppercase tracking-widest block mb-1">Course Fee</span>
                       <div className="flex items-baseline gap-3 mb-1">
                          <span className="text-[#0D2240] text-[32px] font-[900] font-orbitron tracking-tight">₹2,999</span>
                          <span className="text-[#888888] text-[16px] line-through font-exo">₹8,999</span>
                       </div>
                       <div className="flex items-center gap-3">
                          <span className="bg-[#22C55E] text-white text-[11px] font-bold px-[8px] py-[4px] rounded-[4px]">67% OFF</span>
                          <span className="text-[#888888] text-[12px] font-exo font-medium">EMI from ₹499/mo</span>
                       </div>
                    </motion.div>
                 </div>
                 
               </div>
            ) : (
               /* === REGULAR SLIDES === */
               <div className="w-full h-full flex flex-col md:flex-row relative z-10">
                 {/* Left Content */}
                 <div className="w-full md:w-[50%] h-auto md:h-full z-20 p-[40px_24px_24px] lg:p-[60px_40px_60px_80px] flex flex-col justify-center">
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
                      <div 
                        className="inline-block rounded-[50px] px-[16px] lg:px-[18px] py-[6px] text-[11px] lg:text-[12px] font-bold tracking-[1px] mb-[16px] lg:mb-[20px] uppercase font-inter border"
                        style={{ background: currentSlide.topTag.bg, borderColor: currentSlide.topTag.border, color: currentSlide.topTag.color }}
                      >
                        {currentSlide.topTag.text}
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.3 }}>
                      <div 
                        className="inline-block text-[18px] lg:text-[22px] font-[900] px-[20px] lg:px-[24px] py-[10px] rounded-[10px] mb-[12px] lg:mb-[16px] font-orbitron tracking-tight uppercase"
                        style={{ background: currentSlide.classBadge.bg, color: currentSlide.classBadge.color, boxShadow: `0 4px 15px ${currentSlide.classBadge.shadow}` }}
                      >
                        {currentSlide.classBadge.text}
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.4 }}>
                      <div className="text-white text-[16px] lg:text-[22px] font-[700] tracking-[1px] mb-[20px] lg:mb-[24px] opacity-90 font-exo uppercase">
                        {currentSlide.subjectLine}
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.5 }}>
                      <div 
                        className="inline-flex items-center gap-[12px] p-[10px_20px] rounded-[0_12px_12px_0] mb-[20px] lg:mb-[24px] border-l-[4px]"
                        style={{ background: 'rgba(255,255,255,0.05)', borderLeftColor: currentSlide.facultyNameplate.borderColor }}
                      >
                        <div className="text-[28px] lg:text-[32px]">👨‍🏫</div>
                        <div className="flex flex-col">
                          <span className="text-[10px] lg:text-[11px] font-bold tracking-[2px] text-white/60 mb-0.5 uppercase">{currentSlide.facultyNameplate.title}</span>
                          <span className="text-[16px] lg:text-[18px] font-[700] text-white leading-none tracking-wide font-orbitron">{currentSlide.facultyNameplate.name}</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.6 }} className="grid grid-cols-1 md:grid-cols-2 gap-[10px] lg:gap-[12px] mb-[24px] lg:mb-[32px]">
                      {currentSlide.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-[8px]">
                          <div className="w-[20px] h-[20px] lg:w-[22px] lg:h-[22px] rounded-full flex items-center justify-center shrink-0 shadow-sm" style={{ background: currentSlide.featureIconBg, color: currentSlide.featureIconColor }}>
                             <Check className="w-3 h-3 stroke-[3px]" />
                          </div>
                          <span className="text-white text-[13px] lg:text-[14px] font-[500] font-exo whitespace-nowrap">{f}</span>
                        </div>
                      ))}
                    </motion.div>
                    
                    <motion.div initial={{ x: -40, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className="flex flex-col xl:flex-row gap-[12px] lg:gap-[16px]">
                      <Link to={currentSlide.button1.link} className="w-full xl:w-auto text-center inline-block px-[28px] lg:px-[32px] py-[12px] lg:py-[14px] rounded-[50px] font-[900] text-[15px] lg:text-[16px] font-inter hover:-translate-y-[2px] lg:hover:-translate-y-[3px] transition-transform" style={{ background: currentSlide.button1.bg, color: currentSlide.button1.color, boxShadow: `0 6px 20px ${currentSlide.button1.shadow}`, border: 'none' }}>
                        {currentSlide.button1.text}
                      </Link>
                      <Link to={currentSlide.button2.link} className="w-full xl:w-auto text-center inline-block bg-transparent border-[2px] border-white/50 text-white px-[28px] lg:px-[28px] py-[12px] lg:py-[14px] rounded-[50px] font-bold hover:border-white hover:bg-white/10 transition-colors font-inter text-[15px] lg:text-[16px]">
                        {currentSlide.button2.text}
                      </Link>
                    </motion.div>
                 </div>
                 
                 {/* Right Graphics */}
                 <div 
                   className="hero-diagonal-cut w-full md:w-[55%] h-[250px] md:h-full md:absolute md:top-0 md:right-0 z-10 overflow-hidden shrink-0 flex items-end justify-center -order-1 md:order-1" 
                   style={{ background: currentSlide.rightBg }}
                 >
                    <div className="absolute w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] rounded-full top-1/2 -translate-y-1/2 right-[10%] mix-blend-screen pointer-events-none" style={{ background: 'rgba(245,166,35,0.08)' }}></div>
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}></div>
                    
                    <motion.img 
                       key={`img-${current}`}
                       initial={{ x: 40, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ duration: 0.8, delay: 0.3 }}
                       src={currentSlide.image} 
                       alt="Faculty" 
                       className="absolute bottom-0 right-0 h-full w-full object-cover object-top md:w-auto md:object-contain md:object-[bottom_right] pointer-events-none"
                    />
                    
                    <motion.div 
                       key={`badge-${current}`}
                       initial={{ y: 20, opacity: 0 }}
                       animate={{ y: 0, opacity: 1 }}
                       transition={{ duration: 0.6, delay: 0.9, type: 'spring' }}
                       className="hidden md:flex absolute bottom-[40px] left-[20%] lg:left-[10%] bg-white rounded-[16px] p-[12px_20px] shadow-[0_8px_32px_rgba(0,0,0,0.15)] animate-custom-float flex-col items-start"
                    >
                       <div className="font-[900] text-[#F5A623] text-[13px] mb-1 font-inter whitespace-nowrap">⭐ {currentSlide.floatingBadge.rating} Rating</div>
                       <div className="font-[900] text-[#0D2240] text-[16px] leading-[1.2] font-orbitron">{currentSlide.floatingBadge.students}</div>
                       <div className="text-[#888888] text-[11px] font-[600] font-exo uppercase tracking-widest mt-1">Students Taught</div>
                    </motion.div>
                 </div>
               </div>
            )}
            
          </motion.div>
        </AnimatePresence>

        {/* Custom Navigation */}
        
        {/* Left/Right Overlays */}
        <button 
          onClick={prevSlide}
          className="absolute left-[10px] md:left-[20px] top-[125px] md:top-1/2 -translate-y-1/2 w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full flex items-center justify-center bg-white/15 border border-white/30 text-white backdrop-blur-[8px] hover:bg-white/30 hover:scale-105 transition-all z-40 outline-none"
        >
          <ChevronLeft className="w-6 h-6 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-[10px] md:right-[20px] top-[125px] md:top-1/2 -translate-y-1/2 w-[40px] h-[40px] md:w-[48px] md:h-[48px] rounded-full flex items-center justify-center bg-white/15 border border-white/30 text-white backdrop-blur-[8px] hover:bg-white/30 hover:scale-105 transition-all z-40 outline-none"
        >
          <ChevronRight className="w-6 h-6 md:w-8 md:h-8" />
        </button>

        {/* Progress Navigation Tabs */}
        <div className="absolute bottom-[24px] left-[24px] lg:left-[80px] flex gap-[8px] z-40">
           {slidesData.map((_, idx) => (
             <div 
               key={idx}
               onClick={() => goToSlide(idx)}
               className="w-[60px] md:w-[80px] lg:w-[120px] h-[4px] rounded-[2px] bg-white/30 cursor-pointer overflow-hidden group hover:bg-white/60 transition-colors"
             >
               {current === idx && (
                 <div 
                   key={key} 
                   className="h-full bg-[#F5A623] animate-fill-progress" 
                   style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
                 ></div>
               )}
             </div>
           ))}
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
