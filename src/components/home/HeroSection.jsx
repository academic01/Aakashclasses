import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const slidesData = [
  {
    id: 1,
    bg: 'linear-gradient(135deg, #0a1628 0%, #0D2240 60%, #1a3a6b 100%)',
    topTag: { text: "📚  SCHOOL EDUCATION", color: "#F5A623", bg: "rgba(245,166,35,0.1)", border: "rgba(245,166,35,0.35)" },
    classBadge: { text: "VIth — Xth CLASSES", bg: "#F5A623", color: "#0D2240", shadow: "rgba(245,166,35,0.4)" },
    subjectLine: "MATHS · SCIENCE · ENGLISH · SST",
    facultyNameplate: { name: "Kishan Sharma", initial: "K", title: "EXPERT FACULTY", iconColor: "#0D2240", iconBg: "#F5A623", borderColor: "#F5A623" },
    features: [
      "15+ Years Experience", "Complete NCERT Syllabus", "Live + Recorded Classes", "Regular Doubt Sessions"
    ],
    featureIconBg: "#F5A623",
    featureIconColor: "#0D2240",
    button1: { text: "Enroll Now →", link: "/courses?category=school", bg: "#F5A623", color: "#0D2240", shadow: "rgba(245,166,35,0.45)" },
    button2: { text: "View Courses", link: "/courses?category=school" },
    image: "/hero-slide-2.jpg",
    stats: { rating: "4.9", students: "5,000+" },
    statsBgMain: "rgba(245,166,35,0.88)",
    statsBgSecondary: "rgba(10,22,40,0.88)",
    statsBorder: "rgba(245,166,35,0.25)",
    statsTextColorMain: "#0D2240",
    statsTextColorSecondary: "rgba(13,34,64,0.65)",
    statsRatingColor: "#F5A623"
  },
  {
    id: 2,
    bg: 'linear-gradient(135deg, #1a0533, #2d1b69, #1a0533)',
    topTag: { text: "🎓  SENIOR SECONDARY", color: "#A78BFA", bg: "transparent", border: "rgba(167,139,250,0.35)" },
    classBadge: { text: "XIth — XIIth CLASSES", bg: "linear-gradient(135deg, #7C3AED, #9F67FF)", color: "white", shadow: "rgba(124,58,237,0.4)" },
    subjectLine: "COMMERCE · SCIENCE · HUMANITIES",
    facultyNameplate: { name: "Aakash", initial: "A", title: "EXPERT FACULTY", iconColor: "white", iconBg: "#7C3AED", borderColor: "#A78BFA" },
    features: [
      "15+ Years Experience", "Board Exam Focused", "Study Materials & Notes", "Regular Doubt Sessions"
    ],
    featureIconBg: "#7C3AED",
    featureIconColor: "white",
    button1: { text: "Enroll Now →", link: "/courses?category=senior", bg: "linear-gradient(135deg, #7C3AED, #9F67FF)", color: "white", shadow: "rgba(124,58,237,0.45)" },
    button2: { text: "View Courses", link: "/courses?category=senior" },
    image: "/hero-slide-1.jpg", 
    stats: { rating: "4.8", students: "3,000+" },
    statsBgMain: "rgba(124,58,237,0.88)",
    statsBgSecondary: "rgba(26,5,51,0.88)",
    statsBorder: "rgba(124,58,237,0.25)",
    statsTextColorMain: "white",
    statsTextColorSecondary: "rgba(255,255,255,0.65)",
    statsRatingColor: "#A78BFA"
  },
  {
    id: 3,
    bg: 'linear-gradient(135deg, #052210, #0a3d1f, #052210)',
    topTag: { text: "🏛️  GOVERNMENT EXAMS", color: "#4ADE80", bg: "transparent", border: "rgba(74,222,128,0.35)" },
    classBadge: { text: "GOVT. JOBS PREP", bg: "linear-gradient(135deg, #16A34A, #22C55E)", color: "white", shadow: "rgba(34,197,94,0.4)" },
    subjectLine: "SSC · RAILWAY · DSSSB · MORE",
    facultyNameplate: { name: "Vikas", initial: "V", title: "GOVT. JOB SPECIALIST", iconColor: "white", iconBg: "#22C55E", borderColor: "#4ADE80" },
    features: [
      "9+ Years Experience", "Comprehensive Courses", "Practice Sets & Mock Tests", "Current Affairs Updates"
    ],
    featureIconBg: "#22C55E",
    featureIconColor: "white",
    button1: { text: "Enroll Now →", link: "/courses?category=govt", bg: "linear-gradient(135deg, #16A34A, #22C55E)", color: "white", shadow: "rgba(34,197,94,0.45)" },
    button2: { text: "View Courses", link: "/courses?category=govt" },
    image: "/hero-slide-3.jpg", 
    stats: { rating: "4.8", students: "2,000+" },
    statsBgMain: "rgba(34,197,94,0.88)",
    statsBgSecondary: "rgba(5,34,16,0.88)",
    statsBorder: "rgba(34,197,94,0.25)",
    statsTextColorMain: "white",
    statsTextColorSecondary: "rgba(255,255,255,0.65)",
    statsRatingColor: "#4ADE80"
  },
  {
    id: 4,
    isSpecial: true,
    bg: 'linear-gradient(135deg, #0a1628, #0D2240, #0a1628)'
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [key, setKey] = useState(0); 
  const navigate = useNavigate();

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
  
  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slidesData.length);
    setKey(prev => prev + 1);
  };
  
  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    setKey(prev => prev + 1);
  };

  const currentSlide = slidesData[current];

  return (
    <section 
      className="hero-section"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>{`
        .hero-section {
          width: 100%;
          height: calc(100vh - 80px);
          min-height: 620px;
          max-height: 780px;
          position: relative;
          overflow: hidden;
          margin-top: 0;
          padding-top: 0;
        }
        
        .hero-slide {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 52% 48%;
          position: relative;
          overflow: hidden;
        }
        
        .hero-slide-cuet {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: 55% 45%;
          position: relative;
          overflow: hidden;
        }

        .hero-left {
          padding: 0 40px 0 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: 0;
          z-index: 10;
        }

        .hero-right {
          position: relative;
          overflow: hidden;
          z-index: 5;
        }
        
        /* Desktop Image Cropping to hide baked-in text */
        .hero-photo-desktop {
          position: absolute;
          bottom: -2%;
          right: -8%;
          height: 115%;
          width: auto;
          max-width: none;
          object-fit: contain;
          object-position: bottom right;
          pointer-events: none;
          z-index: 2;
        }
        
        @media (max-width: 768px) {
          .hero-section {
            height: auto !important;
            min-height: unset !important;
          }
          .hero-slide, .hero-slide-cuet {
            grid-template-columns: 1fr;
            display: flex;
            flex-direction: column;
          }
          .hero-right {
             height: 280px;
             width: 100%;
             order: -1;
             display: block;
          }
          /* Mobile Image Cropping */
          .hero-photo-desktop {
             height: 380px !important;
             width: auto !important;
             object-fit: contain !important;
             object-position: bottom right !important;
             right: -15% !important;
             bottom: -20px !important;
          }
          .hero-photo-gradient::after {
             content: '';
             position: absolute;
             bottom: 0; left: 0; right: 0; top: 0;
             background: linear-gradient(to bottom, transparent 40%, rgba(13,34,64,1) 100%);
             z-index: 3;
          }
          .hero-left {
             padding: 24px 24px 40px !important;
          }
          .mobile-hide { display: none !important; }
        }

        @keyframes fillBar {
          from { width: 0%; }
          to { width: 100%; }
        }
        .anim-fill-bar {
          animation: fillBar 5s linear forwards;
        }
        @keyframes bounce-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(5px); }
        }
        .anim-bounce-down {
          animation: bounce-down 1.5s infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(34,197,94,0.3); }
          50% { box-shadow: 0 0 25px rgba(34,197,94,0.6); }
        }
        .anim-pulse-glow {
          animation: pulse-glow 2s infinite;
        }
      `}</style>
      
      <AnimatePresence mode="wait">
        <motion.div
           key={current}
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           exit={{ opacity: 0 }}
           transition={{ duration: 0.6, ease: "easeInOut" }}
           style={{ background: currentSlide.bg }}
           className={currentSlide.isSpecial ? "hero-slide-cuet" : "hero-slide"}
        >
          {currentSlide.isSpecial ? (
            /* ========================================================= */
            /* CUET 2026 SLIDE */
            /* ========================================================= */
            <>
              <div className="hero-left">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="flex gap-[12px] mb-[20px]">
                   <span className="bg-[#22C55E] text-white text-[12px] font-[700] px-[16px] py-[6px] rounded-[50px] anim-pulse-glow">🆕 NEW BATCH STARTING</span>
                   <span className="bg-[#F5A623] text-[#0D2240] text-[12px] font-[700] px-[16px] py-[6px] rounded-[50px]">📅 1st April 2026</span>
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="mb-[8px]">
                   <h1 className="text-white text-[58px] font-[900] leading-[1] font-orbitron">
                     CUET <span className="text-[#F5A623]">2026</span>
                   </h1>
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="text-[rgba(255,255,255,0.7)] text-[16px] mb-[12px] font-exo">
                   Central Universities Entrance Test
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }} className="text-[#F5A623] font-[700] text-[14px] mb-[24px]">
                   ⚡ Limited Seats Available!
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} className="flex flex-col gap-[10px] mb-[32px]">
                   {["Complete Syllabus Coverage", "Domain + General Test Prep", "Language Section Mastery", "Previous Year Papers & Mock Tests", "Expert Faculty Guidance"].map((f, i) => (
                     <div key={i} className="flex items-center gap-[10px]">
                       <div className="w-[20px] h-[20px] bg-[#F5A623] rounded-[50%] flex text-[#0D2240] font-[900] text-[11px] items-center justify-center shrink-0">
                         ✓
                       </div>
                       <span className="text-[rgba(255,255,255,0.82)] text-[14px] font-[500] font-inter">{f}</span>
                     </div>
                   ))}
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="flex flex-col md:flex-row gap-[16px] mt-2">
                   <button onClick={() => navigate('/courses/cuet')} className="w-full md:w-auto text-center px-[32px] py-[14px] rounded-[50px] font-[800] text-[15px] bg-[#F5A623] color-[#0D2240] border-none shadow-[0_6px_20px_rgba(245,166,35,0.45)] cursor-pointer transition-all hover:-translate-y-[3px] font-inter">
                     🚀 Enroll Now
                   </button>
                   <button onClick={() => navigate('/cuet-syllabus')} className="w-full md:w-auto text-center px-[28px] py-[14px] rounded-[50px] font-bold bg-transparent border-[2px] border-[rgba(255,255,255,0.35)] text-white cursor-pointer hover:border-white hover:bg-[rgba(255,255,255,0.08)] transition-all text-[15px] font-inter">
                     📋 View Syllabus
                   </button>
                </motion.div>
              </div>
              
              <div className="hero-right mobile-hide flex flex-col justify-center relative">
                 <div className="flex flex-wrap gap-[12px] p-[40px] justify-center items-center content-center h-[50%] mb-[20px]">
                    {['English', 'Domain Subjects', 'General Test', 'Languages', 'Mock Tests', 'PYP'].map((chip, i) => (
                       <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.6 + (i * 0.1), duration: 0.4 }} key={i} className="bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.2)] text-white text-[14px] font-[600] px-[20px] py-[10px] rounded-[50px] hover:bg-[rgba(245,166,35,0.15)] hover:border-[#F5A623] cursor-default transition-all">
                         {chip}
                       </motion.div>
                    ))}
                 </div>
                 
                 <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }} className="bg-white rounded-[20px] p-[24px_28px] shadow-[0_20px_60px_rgba(0,0,0,0.3)] w-[280px] m-[0_auto]">
                    <div className="text-[#888] text-[11px] font-[600] tracking-[1.5px] uppercase mb-[8px]">COURSE FEE</div>
                    <div className="flex items-center gap-[10px]">
                       <span className="text-[#0D2240] text-[32px] font-[900]">₹2,999</span>
                       <span className="text-[#BBBBBB] text-[16px] line-through decoration-1">₹8,999</span>
                    </div>
                    <div className="flex items-center gap-[8px] mt-[8px]">
                       <span className="bg-[#DCFCE7] text-[#16A34A] text-[11px] font-[700] px-[10px] py-[4px] rounded-[6px]">67% OFF</span>
                       <span className="text-[#888] text-[12px]">EMI from ₹499/mo</span>
                    </div>
                 </motion.div>
              </div>
            </>
          ) : (
            /* ========================================================= */
            /* REGULAR SLIDES (1, 2, 3) */
            /* ========================================================= */
            <>
              <div className="hero-left">
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.4 }} className="inline-flex gap-[8px] items-center mb-[20px] p-[7px_18px] rounded-[50px] text-[12px] font-[600] tracking-[1.5px] w-max font-inter" style={{ background: currentSlide.topTag.bg, border: `1px solid ${currentSlide.topTag.border}`, color: currentSlide.topTag.color }}>
                   {currentSlide.topTag.text}
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="inline-block p-[12px_28px] rounded-[10px] mb-[14px] text-[18px] md:text-[24px] font-[900] w-max font-orbitron" style={{ background: currentSlide.classBadge.bg, color: currentSlide.classBadge.color, boxShadow: currentSlide.classBadge.shadow }}>
                   {currentSlide.classBadge.text}
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }} className="mb-[24px] text-[rgba(255,255,255,0.88)] text-[14px] md:text-[18px] font-[600] tracking-[1px] md:tracking-[2px] font-exo">
                   {currentSlide.subjectLine}
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }} className="inline-flex items-center gap-[14px] p-[12px_20px] rounded-[0_12px_12px_0] mb-[24px] bg-[rgba(255,255,255,0.07)] border-[1px] border-[rgba(255,255,255,0.12)] w-max" style={{ borderLeft: `4px solid ${currentSlide.facultyNameplate.borderColor}` }}>
                   <div className="w-[44px] h-[44px] rounded-[50%] flex items-center justify-center font-[900] text-[18px] shrink-0 font-inter" style={{ background: currentSlide.facultyNameplate.iconBg, color: currentSlide.facultyNameplate.iconColor }}>
                     {currentSlide.facultyNameplate.initial}
                   </div>
                   <div className="flex flex-col">
                     <span className="text-[10px] font-[600] tracking-[2px] text-[rgba(255,255,255,0.5)] leading-[1]">{currentSlide.facultyNameplate.title}</span>
                     <span className="text-[17px] font-[700] text-white pt-[4px] leading-[1]">{currentSlide.facultyNameplate.name}</span>
                   </div>
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} className="grid grid-cols-1 md:grid-cols-2 gap-[10px_20px] mb-[32px]">
                   {currentSlide.features.map((f, i) => (
                     <div key={i} className="flex items-center gap-[10px]">
                       <div className="w-[20px] h-[20px] rounded-[50%] flex text-[#0D2240] font-[900] text-[11px] items-center justify-center shrink-0" style={{ background: currentSlide.featureIconBg }}>
                          ✓
                       </div>
                       <span className="text-[rgba(255,255,255,0.82)] text-[14px] font-[500] font-inter">{f}</span>
                     </div>
                   ))}
                </motion.div>
                
                <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.6, duration: 0.4 }} className="flex flex-col md:flex-row gap-[16px] w-full md:w-auto">
                   <button onClick={() => navigate(currentSlide.button1.link)} className="w-full md:w-auto text-center px-[32px] py-[14px] rounded-[50px] font-[800] text-[15px] border-none cursor-pointer transition-all hover:-translate-y-[3px] font-inter" style={{ background: currentSlide.button1.bg, color: currentSlide.button1.color, boxShadow: currentSlide.button1.shadow }}>
                     {currentSlide.button1.text}
                   </button>
                   <button onClick={() => navigate(currentSlide.button2.link)} className="w-full md:w-auto text-center px-[28px] py-[14px] rounded-[50px] font-bold bg-transparent border-[2px] border-[rgba(255,255,255,0.35)] text-white cursor-pointer hover:border-white hover:bg-[rgba(255,255,255,0.08)] transition-all text-[15px] font-inter">
                     {currentSlide.button2.text}
                   </button>
                </motion.div>
              </div>

              <div className="hero-right hero-photo-gradient">
                 <div className="mobile-hide absolute right-[-80px] top-1/2 -translate-y-[50%] w-[520px] h-[520px] rounded-[50%] bg-[rgba(245,166,35,0.05)] border-[1px] border-[rgba(245,166,35,0.08)] pointer-events-none z-[1]"></div>
                 
                 <motion.img 
                    key={`img-${current}`}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    src={currentSlide.image} 
                    alt={currentSlide.facultyNameplate.name}
                    className="hero-photo-desktop"
                 />
                 
                 <motion.div 
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.7, duration: 0.4 }}
                    className="mobile-hide absolute bottom-[32px] left-[20px] z-[3] flex"
                 >
                    <div className="p-[10px_18px] rounded-[12px_0_0_12px]" style={{ background: currentSlide.statsBgSecondary, backdropFilter: 'blur(12px)', border: `1px solid ${currentSlide.statsBorder}`, borderRight: 'none' }}>
                      <div className="font-[700] text-[14px] leading-tight" style={{ color: currentSlide.statsRatingColor }}>⭐ {currentSlide.stats.rating}</div>
                      <div className="text-[11px] text-[rgba(255,255,255,0.55)] leading-tight mt-1">Rating</div>
                    </div>
                    <div className="p-[10px_18px] rounded-[0_12px_12px_0]" style={{ background: currentSlide.statsBgMain, backdropFilter: 'blur(12px)' }}>
                      <div className="font-[800] text-[14px] leading-tight" style={{ color: currentSlide.statsTextColorMain }}>{currentSlide.stats.students}</div>
                      <div className="text-[11px] leading-tight mt-1" style={{ color: currentSlide.statsTextColorSecondary }}>Students</div>
                    </div>
                 </motion.div>
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Global Navigation Controls */}
      <button onClick={prevSlide} className="mobile-hide absolute left-[20px] top-1/2 -translate-y-[50%] w-[48px] h-[48px] rounded-[50%] bg-[rgba(255,255,255,0.1)] border-[1px] border-[rgba(255,255,255,0.2)] text-white text-[18px] cursor-pointer z-10 backdrop-blur-[8px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)]">
        &#10094;
      </button>
      <button onClick={nextSlide} className="mobile-hide absolute right-[20px] top-1/2 -translate-y-[50%] w-[48px] h-[48px] rounded-[50%] bg-[rgba(255,255,255,0.1)] border-[1px] border-[rgba(255,255,255,0.2)] text-white text-[18px] cursor-pointer z-10 backdrop-blur-[8px] flex items-center justify-center hover:bg-[rgba(255,255,255,0.2)]">
        &#10095;
      </button>

      {/* Progress Bars */}
      <div className="absolute bottom-[28px] left-[24px] md:left-[80px] flex gap-[8px] z-10">
         {slidesData.map((_, idx) => (
           <div 
             key={idx}
             onClick={() => goToSlide(idx)}
             className="w-[50px] md:w-[80px] h-[3px] rounded-[2px] bg-[rgba(255,255,255,0.2)] cursor-pointer overflow-hidden relative"
           >
             {current === idx && (
               <div 
                 key={key} 
                 className="absolute left-0 top-0 h-full rounded-[2px] bg-[#F5A623] anim-fill-bar" 
                 style={{ animationPlayState: isHovered ? 'paused' : 'running' }}
               ></div>
             )}
           </div>
         ))}
      </div>

      {/* Scroll indicator */}
      <div className="mobile-hide absolute bottom-[24px] right-[80px] text-[rgba(255,255,255,0.35)] text-[12px] tracking-[1px] flex gap-[6px] items-center z-10">
         Scroll to explore
         <span className="anim-bounce-down text-[16px]">↓</span>
      </div>

    </section>
  );
};

export default HeroSection;
