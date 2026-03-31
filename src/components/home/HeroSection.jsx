import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="hero-section">
      <style>{`
        .hero-section {
          width: 100%;
          min-height: calc(100vh - 112px);
          position: relative;
          overflow: hidden;
          margin-top: 112px;
          background: linear-gradient(135deg, #0a1628 0%, #0D2240 60%, #1a3a6b 100%);
          display: flex;
          align-items: center;
        }

        .hero-container {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          padding: 60px 40px;
          position: relative;
          z-index: 10;
        }

        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            padding: 40px 24px;
            gap: 40px;
          }
        }

        .anim-pulse-glow {
          animation: pulse-glow 3s infinite;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 15px rgba(245,166,35,0.2); }
          50% { box-shadow: 0 0 30px rgba(245,166,35,0.6); }
        }
      `}</style>
      
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[150px] opacity-20 pointer-events-none bg-[#F5A623]"></div>

      <div className="hero-container">
        {/* Left Side: General Info */}
        <div className="flex flex-col justify-center">
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.5 }} className="inline-flex gap-[8px] items-center mb-[24px] p-[8px_20px] rounded-[50px] text-[13px] md:text-[15px] font-[700] tracking-[1.5px] w-max font-inter shadow-sm bg-[rgba(245,166,35,0.1)] border border-[rgba(245,166,35,0.35)] text-[#F5A623]">
            🎖️ INDIA'S TOP EDUCATORS
          </motion.div>
          
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }} className="mb-[20px]">
             <h1 className="text-white text-[50px] md:text-[68px] lg:text-[76px] font-[900] leading-[1.1] font-orbitron drop-shadow-xl">
               Learn from the <span className="text-[#F5A623]">Masters</span>
             </h1>
          </motion.div>
          
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }} className="text-[rgba(255,255,255,0.9)] text-[18px] md:text-[24px] font-[600] mb-[36px] font-exo tracking-wide">
             CUET · BOARDS · GOVT JOBS
          </motion.div>
          
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.5 }} className="flex flex-col gap-[16px] mb-[48px]">
             {["Expert Faculty Panel", "Interactive Live & Recorded Classes", "Comprehensive Study Materials", "Premium Mentorship & Doubt Sessions"].map((f, i) => (
               <div key={i} className="flex items-center gap-[14px]">
                 <div className="w-[26px] h-[26px] bg-[#F5A623] rounded-[50%] flex text-[#0D2240] font-[900] text-[14px] items-center justify-center shrink-0 shadow-lg">
                   ✓
                 </div>
                 <span className="font-inter text-[rgba(255,255,255,0.95)] text-[17px] md:text-[20px] font-[600]">
                   {f}
                 </span>
               </div>
             ))}
          </motion.div>
          
          <motion.div initial={{ x: -30, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5 }} className="flex flex-col md:flex-row gap-[16px] w-full md:w-auto">
             <button onClick={() => navigate('/courses')} className="w-full md:w-auto text-center px-[36px] py-[16px] rounded-[50px] font-[800] text-[16px] bg-[#F5A623] text-[#0D2240] border-none shadow-[0_6px_20px_rgba(245,166,35,0.45)] cursor-pointer transition-all hover:-translate-y-[3px] font-inter">
               🚀 Start Learning Now
             </button>
             <button onClick={() => navigate('/about')} className="w-full md:w-auto text-center px-[32px] py-[16px] rounded-[50px] font-bold bg-transparent border-[2px] border-[rgba(255,255,255,0.35)] text-white cursor-pointer hover:border-white hover:bg-[rgba(255,255,255,0.08)] transition-all text-[16px] font-inter">
               Meet Our Team
             </button>
          </motion.div>
        </div>

        {/* Right Side: Triple Faculty Layout */}
        <div className="relative flex items-center justify-center w-full min-h-[500px]">
           <motion.div 
             initial={{ y: 30, opacity: 0 }}
             animate={{ y: 0, opacity: 1 }}
             transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
             className="relative z-20 w-full max-w-[600px] aspect-[4/5] overflow-hidden rounded-[32px] shadow-[0_40px_80px_rgba(0,0,0,0.6)] border border-[rgba(255,255,255,0.1)] group"
           >
              <img 
                src="/Gemini_Generated_Image_x2rlx0x2rlx0x2rl.png" 
                alt="Aakash Academics Expert Faculty Team" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Inner Glass Badge Overlay */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[85%] bg-[rgba(10,22,40,0.85)] backdrop-blur-xl rounded-[20px] p-[20px] border border-[rgba(255,255,255,0.1)] shadow-2xl flex items-center justify-between">
                 <div className="flex flex-col">
                   <h3 className="text-white text-[20px] font-black font-orbitron leading-none mb-1">TEAM AAKASH</h3>
                   <p className="text-[#F5A623] text-[11px] font-bold tracking-[2px] uppercase">India's Best Mentors</p>
                 </div>
                 <div className="flex flex-col items-end">
                    <span className="text-[22px] font-black text-white leading-none">15+</span>
                    <span className="text-[10px] text-[rgba(255,255,255,0.6)] uppercase font-bold tracking-[1px]">Years Exp</span>
                 </div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
