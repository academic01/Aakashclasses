import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slidesData = [
  {
    id: 1,
    bg: 'linear-gradient(120deg, #0D2240 0%, #0D2240 55%, #1a3a6b 100%)',
    topTag: { text: "📚  SCHOOL EDUCATION", color: "#F5A623", bg: "rgba(245,166,35,0.12)", border: "rgba(245,166,35,0.4)" },
    classBadge: { text: "VIth — Xth CLASSES", bg: "#F5A623", color: "#0D2240", shadow: "rgba(245,166,35,0.35)" },
    subjectLine: "MATHS · SCIENCE · ENGLISH · SST",
    facultyNameplate: { name: "Kishan Sharma", initial: "K", title: "EXPERT FACULTY", iconColor: "#0D2240", iconBg: "#F5A623", borderColor: "#F5A623" },
    features: [
      "15+ Years Experience", "Complete NCERT Syllabus", "Live + Recorded Classes", "Regular Doubt Sessions"
    ],
    featureIconBg: "#F5A623",
    featureIconColor: "#0D2240",
    button1: { text: "Enroll Now →", link: "/courses?category=school", bg: "#F5A623", color: "#0D2240", shadow: "rgba(245,166,35,0.45)", dropShadowHover: "rgba(245,166,35,0.6)" },
    image: "/hero-slide-2.jpg",
    stats: { rating: "4.9", students: "5,000+" },
    statsBgMain: "rgba(245,166,35,0.9)",
    statsBgSecondary: "rgba(13,34,64,0.9)",
    statsBorder: "rgba(245,166,35,0.3)",
    statsTextColorMain: "#0D2240",
    statsTextColorSecondary: "rgba(13,34,64,0.7)",
    statsRatingColor: "#F5A623"
  },
  {
    id: 2,
    bg: 'linear-gradient(120deg, #1a0533 0%, #2d1b69 55%, #1a0533 100%)',
    topTag: { text: "🎓  SENIOR SECONDARY", color: "#A78BFA", bg: "transparent", border: "rgba(167,139,250,0.4)" },
    classBadge: { text: "XIth — XIIth CLASSES", bg: "linear-gradient(135deg, #7C3AED, #9F67FF)", color: "white", shadow: "rgba(124,58,237,0.4)" },
    subjectLine: "COMMERCE · SCIENCE · HUMANITIES",
    facultyNameplate: { name: "Aakash", initial: "A", title: "EXPERT FACULTY", iconColor: "white", iconBg: "#7C3AED", borderColor: "#A78BFA" },
    features: [
      "15+ Years Experience", "Board Exam Focused", "Study Materials & Notes", "Regular Doubt Sessions"
    ],
    featureIconBg: "#7C3AED",
    featureIconColor: "white",
    button1: { text: "Enroll Now →", link: "/courses?category=senior", bg: "linear-gradient(135deg, #7C3AED, #9F67FF)", color: "white", shadow: "rgba(124,58,237,0.45)", dropShadowHover: "rgba(124,58,237,0.6)" },
    image: "/hero-slide-1.jpg", 
    stats: { rating: "4.8", students: "3,000+" },
    statsBgMain: "rgba(124,58,237,0.9)",
    statsBgSecondary: "rgba(26,5,51,0.9)",
    statsBorder: "rgba(124,58,237,0.3)",
    statsTextColorMain: "white",
    statsTextColorSecondary: "rgba(255,255,255,0.7)",
    statsRatingColor: "#A78BFA"
  },
  {
    id: 3,
    bg: 'linear-gradient(120deg, #052210 0%, #0a3d1f 55%, #052210 100%)',
    topTag: { text: "🏛️  GOVERNMENT EXAMS", color: "#4ADE80", bg: "transparent", border: "rgba(74,222,128,0.4)" },
    classBadge: { text: "GOVT. JOBS PREP", bg: "linear-gradient(135deg, #16A34A, #22C55E)", color: "white", shadow: "rgba(34,197,94,0.4)" },
    subjectLine: "SSC · RAILWAY · DSSSB · MORE",
    facultyNameplate: { name: "Vikas", initial: "V", title: "GOVT. JOB SPECIALIST", iconColor: "white", iconBg: "#16A34A", borderColor: "#4ADE80" },
    features: [
      "9+ Years Experience", "Comprehensive Courses", "Practice Sets & Mock Tests", "Current Affairs Updates"
    ],
    featureIconBg: "#22C55E",
    featureIconColor: "white",
    button1: { text: "Enroll Now →", link: "/courses?category=govt", bg: "linear-gradient(135deg, #16A34A, #22C55E)", color: "white", shadow: "rgba(34,197,94,0.45)", dropShadowHover: "rgba(34,197,94,0.6)" },
    image: "/hero-slide-3.jpg", 
    stats: { rating: "4.8", students: "2,000+" },
    statsBgMain: "rgba(34,197,94,0.9)",
    statsBgSecondary: "rgba(5,34,16,0.9)",
    statsBorder: "rgba(34,197,94,0.3)",
    statsTextColorMain: "white",
    statsTextColorSecondary: "rgba(255,255,255,0.7)",
    statsRatingColor: "#4ADE80"
  },
  {
    id: 4,
    isSpecial: true,
    bg: 'linear-gradient(120deg, #0D2240 0%, #0a1628 55%, #0D2240 100%)',
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

  const goToSlide = (index) => {
    setCurrent(index);
    setKey(prev => prev + 1);
  };

  const currentSlide = slidesData[current];

  return (
    <section 
      className="relative w-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: 'calc(100vh - 88px)', minHeight: '600px', maxHeight: '750px' }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-mobile-override {
             height: auto !important;
             min-height: unset !important;
             max-height: unset !important;
          }
        }
        @keyframes fillBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .animate-fill-bar {
          animation: fillBar 5s linear forwards;
        }
        @keyframes bounce-arrow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .animate-bounce-arrow {
          animation: bounce-arrow 1.5s infinite;
        }
      `}</style>
      
      <div className="hero-mobile-override relative w-full h-full" style={{ height: 'calc(100vh - 88px)', minHeight: '600px', maxHeight: '750px' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={`slide-${current}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, zIndex: -1 }}
            transition={{ duration: 0.6, ease: "easeIn" }}
            className="absolute inset-0 w-full h-full flex flex-col md:flex-row"
            style={{ background: currentSlide.bg }}
          >
            {/* Unified Background Pattern Overlay */}
            <div 
              className="absolute inset-0 pointer-events-none z-0" 
              style={{ 
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(245,166,35,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.03) 0%, transparent 40%)'
              }}
            ></div>

            {currentSlide.isSpecial ? (
               /* === CUET SLIDE (SPECIAL) === */
               <div className="w-full h-full flex flex-col md:flex-row relative z-10 w-full px-[24px] md:px-0">
                 
                 {/* Left Content (60%) */}
                 <div className="w-full md:w-[60%] h-auto md:h-full flex flex-col justify-center py-[40px] md:py-[50px] md:pl-[80px] md:pr-[40px] z-20">
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex flex-wrap gap-3 mb-[24px]">
                       <span className="bg-[#22C55E] text-white text-[12px] font-bold px-[14px] py-[6px] rounded-[4px] animate-pulse whitespace-nowrap tracking-wide">🆕 NEW BATCH STARTING</span>
                       <span className="bg-[#F5A623] text-[#0D2240] text-[12px] font-bold px-[14px] py-[6px] rounded-[4px] whitespace-nowrap">📅 1st April 2026</span>
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }} className="mb-[12px]">
                       <h1 className="text-white text-[48px] md:text-[64px] lg:text-[76px] font-[900] leading-[1] mb-2 font-orbitron drop-shadow-lg tracking-tight">
                         CUET <span className="text-[#F5A623]">2026</span>
                       </h1>
                       <p className="text-white/80 text-[16px] font-exo">Central Universities Entrance Test</p>
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }} className="mb-[28px]">
                       <div className="text-[#F5A623] font-bold animate-[pulse_1.5s_ease-in-out_infinite] text-[16px] tracking-wide">⚡ Limited Seats Available!</div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col gap-[12px] mb-[36px]">
                       {["Complete Syllabus Coverage", "Domain + General Test Prep", "Language Section Mastery", "Previous Year Papers", "Expert Faculty Guidance"].map((f, i) => (
                         <div key={i} className="flex items-center gap-[12px]">
                           <div className="w-[20px] h-[20px] bg-[#22C55E] rounded-full flex text-[#0D2240] font-[900] text-[11px] items-center justify-center shrink-0">
                             ✓
                           </div>
                           <span className="text-white text-[15px] font-[500] font-inter">{f}</span>
                         </div>
                       ))}
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="flex flex-col md:flex-row gap-[16px]">
                       <Link to="/courses/cuet" className="cursor-pointer w-full md:w-auto text-center inline-block px-[36px] py-[14px] rounded-[50px] font-[900] text-[16px] text-[#0D2240] hover:-translate-y-[3px] transition-all shadow-[0_6px_20px_rgba(245,166,35,0.45)] font-inter" style={{ background: 'linear-gradient(135deg, #F5A623, #e6951a)' }}>
                         🚀 Enroll Now
                       </Link>
                       <Link to="/courses/cuet" className="cursor-pointer w-full md:w-auto text-center inline-block bg-transparent border-[2px] border-white/40 text-white px-[32px] py-[14px] rounded-[50px] font-[600] hover:bg-white/10 hover:border-white transition-colors text-[16px] font-inter">
                         📋 View Syllabus
                       </Link>
                    </motion.div>
                 </div>
                 
                 {/* Right Graphics (40%) */}
                 <div className="hidden md:flex w-full md:w-[40%] h-full flex-col items-center justify-center relative z-20 pr-[40px]">
                    <div className="flex flex-wrap gap-[10px] justify-center max-w-[340px] mb-8 relative z-10">
                      {['English', 'Domain Subjects', 'General Test', 'Languages', 'Mock Tests', 'PYP'].map((chip, i) => (
                         <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }} key={i} className="bg-white/10 border border-white/20 text-white/90 px-[16px] py-[8px] rounded-full text-[13px] font-bold backdrop-blur-sm">
                           {chip}
                         </motion.div>
                      ))}
                    </div>
                    
                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.8 }} className="bg-white rounded-[20px] p-[24px] shadow-2xl relative z-10 min-w-[280px]">
                       <span className="text-[#888888] text-[12px] font-[700] uppercase tracking-widest block mb-2 font-inter">Course Fee</span>
                       <div className="flex items-baseline gap-3 mb-2">
                          <span className="text-[#0D2240] text-[36px] font-[900] font-orbitron tracking-tight">₹2,999</span>
                          <span className="text-[#888888] text-[16px] line-through font-exo">₹8,999</span>
                       </div>
                       <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                          <span className="bg-[#22C55E] text-white text-[12px] font-[800] px-[10px] py-[4px] rounded-[6px]">67% OFF</span>
                          <span className="text-[#888888] text-[13px] font-exo font-[600]">EMI from ₹499/mo</span>
                       </div>
                    </motion.div>
                 </div>
                 
               </div>
            ) : (
               /* === REGULAR SLIDES === */
               <div className="w-full h-full flex flex-col md:flex-row relative z-10">
                 
                 {/* Desktop: Right Photo Area (45%) | Mobile: Top Image */}
                 <div className="flex w-full md:w-[45%] h-[240px] md:h-full relative overflow-hidden items-end justify-end -order-1 md:order-1 pt-[20px] md:pt-0 shrink-0">
                    {/* Decorative Graphics */}
                    <div className="hidden md:block absolute right-[-60px] top-1/2 -translate-y-[50%] w-[500px] h-[500px] rounded-full border pointer-events-none" style={{ background: 'rgba(245,166,35,0.06)', borderColor: 'rgba(245,166,35,0.1)' }}></div>
                    <div className="hidden md:block absolute right-[-10px] top-1/2 -translate-y-[50%] w-[380px] h-[380px] rounded-full border pointer-events-none" style={{ background: 'rgba(245,166,35,0.04)', borderColor: 'rgba(245,166,35,0.08)' }}></div>
                    
                    <motion.img 
                       key={`img-${current}`}
                       initial={{ x: 30, opacity: 0 }}
                       animate={{ x: 0, opacity: 1 }}
                       transition={{ duration: 0.6 }}
                       src={currentSlide.image} 
                       alt="Faculty" 
                       className="absolute bottom-0 md:right-[40px] left-1/2 md:left-auto -translate-x-1/2 md:translate-x-0 h-full w-full md:w-auto object-cover md:object-contain object-[top_center] md:object-[bottom_center] z-10 pointer-events-none"
                    />
                    
                    {/* Clean Stats Bar instead of floating popup */}
                    <motion.div 
                       initial={{ opacity: 0, y: 10 }}
                       animate={{ opacity: 1, y: 0 }}
                       transition={{ duration: 0.6, delay: 0.6 }}
                       className="hidden md:flex absolute bottom-[20px] right-[20px] z-[20] shadow-xl rounded-[12px] overflow-hidden"
                    >
                       <div className="backdrop-blur-[10px] border px-[20px] py-[10px] flex flex-col justify-center border-r-0" style={{ background: currentSlide.statsBgSecondary, borderColor: currentSlide.statsBorder }}>
                         <span className="font-[800] text-[14px]" style={{ color: currentSlide.statsRatingColor }}>⭐ {currentSlide.stats.rating}</span>
                         <span className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Rating</span>
                       </div>
                       <div className="px-[20px] py-[10px] flex flex-col justify-center" style={{ background: currentSlide.statsBgMain }}>
                         <span className="font-[800] text-[14px]" style={{ color: currentSlide.statsTextColorMain }}>{currentSlide.stats.students}</span>
                         <span className="text-[11px] mt-0.5" style={{ color: currentSlide.statsTextColorSecondary }}>Students</span>
                       </div>
                    </motion.div>
                 </div>
                 
                 {/* Desktop: Left Content Area (55%) | Mobile: Bottom Text */}
                 <div className="w-full md:w-[55%] h-auto md:h-full z-20 p-[24px] md:p-[50px_40px_50px_80px] flex flex-col justify-center bg-transparent shrink-0">
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.1 }}>
                      <div 
                        className="inline-flex items-center gap-[8px] rounded-[50px] px-[18px] py-[6px] text-[12px] font-[600] tracking-[1.5px] mb-[24px] font-inter border"
                        style={{ background: currentSlide.topTag.bg, borderColor: currentSlide.topTag.border, color: currentSlide.topTag.color }}
                      >
                        {currentSlide.topTag.text}
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                      <div 
                        className="inline-block text-[18px] md:text-[26px] font-[900] px-[20px] md:px-[28px] py-[10px] md:py-[12px] rounded-[12px] mb-[16px] uppercase font-orbitron"
                        style={{ background: currentSlide.classBadge.bg, color: currentSlide.classBadge.color, boxShadow: `0 6px 24px ${currentSlide.classBadge.shadow}` }}
                      >
                        {currentSlide.classBadge.text}
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.3 }}>
                      <div className="text-[15px] md:text-[20px] font-[600] tracking-[2px] mb-[28px] font-exo text-white/90 uppercase">
                        {currentSlide.subjectLine}
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                      <div 
                        className="inline-flex items-center gap-[14px] p-[12px_20px] rounded-[0_12px_12px_0] mb-[28px] border-l-[4px] border border-white/10 shadow-sm"
                        style={{ background: 'rgba(255,255,255,0.08)', borderLeftColor: currentSlide.facultyNameplate.borderColor }}
                      >
                        <div className="w-[44px] h-[44px] rounded-full flex items-center justify-center font-[900] text-[20px] shrink-0 font-inter" style={{ background: currentSlide.facultyNameplate.iconBg, color: currentSlide.facultyNameplate.iconColor }}>
                          {currentSlide.facultyNameplate.initial}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-[600] tracking-[2px] text-white/50 mb-0.5 uppercase">{currentSlide.facultyNameplate.title}</span>
                          <span className="text-[16px] md:text-[17px] font-[700] text-white leading-none tracking-wide">{currentSlide.facultyNameplate.name}</span>
                        </div>
                      </div>
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="grid grid-cols-1 md:grid-cols-2 gap-[12px] md:gap-[12px_24px] mb-[36px]">
                      {currentSlide.features.map((f, i) => (
                        <div key={i} className="flex items-center gap-[10px]">
                          <div className="w-[20px] h-[20px] rounded-full flex items-center justify-center shrink-0 font-[900] text-[11px]" style={{ background: currentSlide.featureIconBg, color: currentSlide.featureIconColor }}>
                             ✓
                          </div>
                          <span className="text-white/85 text-[14px] font-[500] font-inter whitespace-nowrap">{f}</span>
                        </div>
                      ))}
                    </motion.div>
                    
                    <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }} className="flex flex-col xl:flex-row gap-[16px]">
                      <Link 
                         to={currentSlide.button1.link} 
                         className="cursor-pointer w-full md:w-auto text-center inline-block px-[32px] py-[14px] rounded-[50px] font-[800] text-[15px] hover:-translate-y-[3px] transition-all duration-300 font-inter" 
                         style={{ background: currentSlide.button1.bg, color: currentSlide.button1.color, boxShadow: `0 6px 20px ${currentSlide.button1.shadow}`, border: 'none' }}
                         onMouseEnter={(e) => e.target.style.boxShadow = `0 8px 25px ${currentSlide.button1.dropShadowHover}`}
                         onMouseLeave={(e) => e.target.style.boxShadow = `0 6px 20px ${currentSlide.button1.shadow}`}
                      >
                        {currentSlide.button1.text}
                      </Link>
                      <Link to={currentSlide.button2.link} className="cursor-pointer w-full md:w-auto text-center inline-block bg-transparent border-[2px] border-white/40 text-white px-[28px] py-[14px] rounded-[50px] font-[600] hover:border-white hover:bg-white/10 transition-colors text-[15px] font-inter">
                        {currentSlide.button2.text}
                      </Link>
                    </motion.div>
                 </div>
                 
               </div>
            )}
            
          </motion.div>
        </AnimatePresence>

        {/* Custom Navigation */}

        {/* Progress Navigation Bars */}
        <div className="absolute bottom-[28px] left-[24px] md:left-[80px] flex gap-[8px] z-40">
           {slidesData.map((_, idx) => (
             <div 
               key={idx}
               onClick={() => goToSlide(idx)}
               className="w-[60px] md:w-[80px] h-[3px] rounded-[2px] bg-white/25 cursor-pointer overflow-hidden group hover:bg-white/50 transition-colors"
             >
               {current === idx && (
                 <div 
                   key={key} 
                   className="h-full bg-[#F5A623] animate-fill-bar" 
                   style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
                 ></div>
               )}
             </div>
           ))}
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:flex absolute bottom-[32px] right-[80px] flex-col items-center gap-1 z-40 font-exo text-[12px] tracking-[1px] text-white/40 select-none pointer-events-none">
           Scroll to explore
           <span className="animate-bounce-arrow text-[16px]">↓</span>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
