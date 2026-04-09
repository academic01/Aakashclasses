import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CountUp = ({ end, duration = 2, delay = 0.65 }) => {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setStarted(true);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const endValue = parseInt(end.replace(/\D/g, ''));
    if (start === endValue) return;

    let totalMilisecondsStep = Math.max(20, (duration * 1000) / endValue);
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === endValue) clearInterval(timer);
    }, totalMilisecondsStep);

    return () => clearInterval(timer);
  }, [end, duration, started]);

  return <>{count}{end.replace(/[0-9]/g, '')}</>;
};

const FacultyCard = ({ initial, name, line2, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="inline-flex items-center gap-[12px] bg-[rgba(255,255,255,0.06)] border border-[rgba(255,255,255,0.12)] border-l-[3px] border-l-[#F5A623] rounded-[0_12px_12px_0] p-[12px_16px] backdrop-blur-sm"
  >
    <div className="w-[42px] h-[42px] rounded-full bg-[rgba(245,166,35,0.12)] border-2 border-[#F5A623] text-[#F5A623] flex items-center justify-center font-[900] text-[17px]">
      {initial}
    </div>
    <div className="flex flex-col text-left">
      <span className="text-white text-[14px] font-[700] leading-tight">{name}</span>
      <span className="text-[rgba(255,255,255,0.55)] text-[11px] font-[500] leading-tight mt-0.5">{line2}</span>
    </div>
  </motion.div>
);

const GlassBadge = ({ emoji, title, subtitle, className, delay, floatDelay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6 }}
    className={`absolute z-20 flex items-center gap-[10px] bg-[rgba(255,255,255,0.1)] backdrop-blur-[20px] border border-[rgba(255,255,255,0.2)] rounded-[16px] p-[14px_18px] shadow-[0_8px_32px_rgba(0,0,0,0.2)] animate-float ${className}`}
    style={{ animationDelay: `${floatDelay}s` }}
  >
    <span className="text-[26px] leading-none">{emoji}</span>
    <div className="flex flex-col text-left">
      <span className="text-white font-[700] text-[13px] leading-tight">{title}</span>
      <span className="text-[rgba(255,255,255,0.6)] text-[11px] leading-tight mt-0.5 whitespace-nowrap">{subtitle}</span>
    </div>
  </motion.div>
);

const HeroSection = () => {
  const navigate = useNavigate();

  const facultyData = [
    { initial: "V", name: "Vikas", line2: "M.A. • 9+ Yrs Exp" },
    { initial: "A", name: "Aakash", line2: "B.Tech • 15+ Yrs Exp" },
    { initial: "K", name: "Kishan Sharma", line2: "M.Sc. • 15+ Yrs Exp" }
  ];

  return (
    <section className="relative w-full min-h-[calc(100vh-var(--navbar-height,112px))] overflow-hidden bg-[#0D2240] grid grid-cols-1 lg:grid-cols-2">
      <style>{`
        .bg-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px);
          background-size: 28px 28px;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
           .hero-mobile-content {
              margin-top: -120px;
              background: linear-gradient(to bottom, transparent 0%, #0D2240 15%, #0D2240 100%);
              position: relative;
              z-index: 10;
           }
        }
      `}</style>

      {/* Right Side — Faculty Image (Appears First on Mobile) */}
      <div className="relative h-[420px] lg:h-full lg:sticky lg:top-0 overflow-hidden order-first lg:order-last">
        <motion.img 
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          src="/Gemini_Generated_Image_x2rlx0x2rlx0x2rl.png" 
          alt="Aakash Academics Expert Faculty Team" 
          className="absolute inset-0 w-full h-full object-cover object-[top_center]"
        />
        
        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-[1] pointer-events-none">
           {/* Left edge fade */}
           <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-[#0D2240] via-[rgba(13,34,64,0.7)] to-transparent hidden lg:block"></div>
           {/* Bottom fade */}
           <div className="absolute bottom-0 left-0 w-full h-[65%] lg:h-[35%] bg-gradient-to-t from-[#0D2240] to-transparent"></div>
           {/* Top fade */}
           <div className="absolute top-0 left-0 w-full h-[15%] bg-gradient-to-b from-[#0D2240] to-transparent"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[rgba(245,166,35,0.04)] border border-[rgba(245,166,35,0.06)] pointer-events-none z-0 hidden lg:block"></div>

        {/* Floating glass cards - Hidden on mobile */}
        <div className="hidden lg:block">
          <GlassBadge 
            emoji="🏆" 
            title="Best Faculty Team" 
            subtitle="Aakash Academics 2024" 
            className="top-[60px] right-[28px]" 
            delay={1.2} 
            floatDelay={0}
          />
          <GlassBadge 
            emoji="⭐" 
            title="4.9 / 5.0 Rating" 
            subtitle="By 8,000+ Students" 
            className="top-[42%] right-[20px]" 
            delay={1.4} 
            floatDelay={1}
          />
          <GlassBadge 
            emoji="🎓" 
            title="39+ Years" 
            subtitle="Combined Experience" 
            className="bottom-[90px] right-[28px]" 
            delay={1.6} 
            floatDelay={2}
          />
        </div>
      </div>
      
      {/* Left Side — Text Content */}
      <div className="relative flex flex-col justify-center px-[24px] lg:px-[80px] py-[40px] lg:py-[60px] bg-dot-grid hero-mobile-content">
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center bg-[rgba(245,166,35,0.12)] border border-[rgba(245,166,35,0.4)] text-[#F5A623] p-[8px_20px] rounded-[50px] text-[12px] font-[700] tracking-[2px] w-max mb-[24px]"
        >
          🏆 INDIA'S TOP EDUCATORS
        </motion.div>

        <h1 className="flex flex-col mb-[20px] drop-shadow-[0_4px_20px_rgba(0,0,0,0.2)]">
          <motion.span 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-white text-[36px] md:text-[64px] font-[900] leading-[1.05] font-orbitron uppercase"
          >
            Empowering Minds,
          </motion.span>
          <motion.span 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ delay: 0.35, duration: 0.6 }}
            className="text-[#F5A623] text-[36px] md:text-[64px] font-[900] leading-[1.05] font-orbitron uppercase"
          >
            Building Futures.
          </motion.span>
        </h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.45, duration: 0.5 }}
          className="text-[rgba(255,255,255,0.72)] text-[15px] md:text-[17px] leading-[1.7] max-w-[460px] mb-[36px] font-inter font-medium"
        >
          Learn from India's most experienced and qualified educators. Expert coaching for Class VI-XII, CUET 2026 and Government Jobs.
        </motion.p>
        
        <div className="flex flex-col md:flex-row gap-[16px] mb-[40px] flex-wrap">
          {facultyData.map((f, i) => (
            <FacultyCard key={i} {...f} delay={0.55 + (i * 0.1)} />
          ))}
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.65, duration: 0.5 }}
          className="flex mb-[44px]"
        >
          <div className="flex flex-col pr-[24px] lg:pr-[32px] border-r border-[rgba(255,255,255,0.12)] mr-[24px] lg:mr-[32px]">
            <span className="text-[22px] md:text-[30px] font-[900] text-[#F5A623] leading-none">
              <CountUp end="8,000+" />
            </span>
            <span className="text-[11px] lg:text-[12px] text-[rgba(255,255,255,0.55)] letter-spacing-[0.5px] mt-[2px] font-bold uppercase whitespace-nowrap">Happy Students</span>
          </div>
          <div className="flex flex-col pr-[24px] lg:pr-[32px] border-r border-[rgba(255,255,255,0.12)] mr-[24px] lg:mr-[32px]">
            <span className="text-[22px] md:text-[30px] font-[900] text-[#F5A623] leading-none">
              <CountUp end="39+" />
            </span>
            <span className="text-[11px] lg:text-[12px] text-[rgba(255,255,255,0.55)] letter-spacing-[0.5px] mt-[2px] font-bold uppercase whitespace-nowrap">Years Combined Exp</span>
          </div>
          <div className="flex flex-col">
            <span className="text-[22px] md:text-[30px] font-[900] text-[#F5A623] leading-none">
              <CountUp end="98%" />
            </span>
            <span className="text-[11px] lg:text-[12px] text-[rgba(255,255,255,0.55)] letter-spacing-[0.5px] mt-[2px] font-bold uppercase whitespace-nowrap">Success Rate</span>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.75, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-[16px]"
        >
          <button 
            onClick={() => navigate('/signup')} 
            className="w-full md:w-auto px-[36px] py-[16px] rounded-[50px] font-[900] text-[16px] bg-[#F5A623] text-[#0D2240] border-none shadow-[0_8px_32px_rgba(245,166,35,0.45)] cursor-pointer transition-all hover:-translate-y-[3px] hover:shadow-[0_12px_40px_rgba(245,166,35,0.6)] font-inter"
          >
            Get Started Free →
          </button>
          <button 
            onClick={() => navigate('/courses')} 
            className="w-full md:w-auto px-[32px] py-[16px] rounded-[50px] font-bold bg-transparent border-[2px] border-[rgba(255,255,255,0.35)] text-white cursor-pointer hover:border-white hover:bg-[rgba(255,255,255,0.08)] transition-all text-[16px] font-inter"
          >
            Explore Courses
          </button>
        </motion.div>
      </div>

    </section>
  );
};

export default HeroSection;
