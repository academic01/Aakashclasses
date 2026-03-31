import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const CuetPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isShown = sessionStorage.getItem('cuetPopupShown');
    if (!isShown) {
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('cuetPopupShown', 'true');
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const handleClose = () => setIsOpen(false);

  const handleEnroll = () => {
    setIsOpen(false);
    navigate('/courses/cuet');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-[4px] z-[99998]"
          />

          {/* Popup Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            animate={{ opacity: 1, scale: 1.0, x: '-50%', y: '-50%' }}
            exit={{ opacity: 0, scale: 0.8, x: '-50%', y: '-50%' }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="fixed top-1/2 left-1/2 z-[99999] w-[90vw] md:w-[480px] rounded-[20px] overflow-hidden shadow-[0_25px_60px_rgba(0,0,0,0.4)] flex flex-col bg-white"
          >
            {/* Top Section */}
            <div className="bg-gradient-to-br from-[#0D2240] to-[#1a3a6b] pt-8 px-8 pb-6 relative">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white text-[18px] border-none cursor-pointer transition-colors"
              >
                ×
              </button>

              <div className="inline-block bg-[#22C55E] text-white text-[11px] font-bold px-[14px] py-1 rounded-[50px] tracking-[1px] mb-4 relative z-10 animate-[pulse_2s_infinite]">
                <style>{`
                  @keyframes pulse {
                    0% { box-shadow: 0 0 0 0 rgba(34,197,94,0.6); }
                    70% { box-shadow: 0 0 0 10px rgba(34,197,94,0); }
                    100% { box-shadow: 0 0 0 0 rgba(34,197,94,0); }
                  }
                `}</style>
                🆕 NEW BATCH ANNOUNCED
              </div>

              <h2 className="text-white text-[42px] font-[900] leading-none mb-1 font-orbitron">CUET 2026</h2>
              <p className="text-white/80 text-[16px] mb-5 font-exo">Complete Preparation Batch</p>

              <div className="flex gap-4 items-center flex-wrap">
                <div className="bg-[#F5A623] text-[#0D2240] font-bold text-[14px] px-5 py-2 rounded-[50px]">
                  📅 Starting: 1st April 2026
                </div>
                <div className="bg-red-500/20 border border-red-500 text-red-300 text-[13px] px-4 py-2 rounded-[50px]">
                  ⚡ Limited Seats!
                </div>
              </div>
            </div>

            {/* Middle Section */}
            <div className="bg-white px-8 py-6 text-left">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: '📚', text: 'Complete Syllabus' },
                  { icon: '🎯', text: 'Domain + General Test' },
                  { icon: '📝', text: 'Mock Test Series' },
                  { icon: '👨‍🏫', text: 'Expert Faculty' },
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center text-sm shrink-0">
                      {feature.icon}
                    </div>
                    <span className="text-[14px] text-[#444] font-medium leading-tight font-inter">
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-[#F0F0F0] flex justify-between items-center">
                <div>
                  <div className="text-[12px] text-[#888] font-inter">Course Fee</div>
                  <div className="flex items-center mt-1">
                    <span className="text-[28px] font-[900] text-[#0D2240] font-orbitron leading-none">₹2,999</span>
                    <span className="text-[16px] text-[#BBB] line-through ml-2 font-exo font-bold">₹8,999</span>
                    <span className="bg-[#DCFCE7] text-[#16A34A] text-[11px] font-bold px-2 py-[3px] rounded ml-2">67% OFF</span>
                  </div>
                </div>
                <div className="text-[12px] text-[#888] text-right font-inter">
                  EMI from <br /><span className="font-bold text-[#444]">₹499/month</span>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="bg-white px-8 pb-7">
              <button
                onClick={handleEnroll}
                className="w-full h-[52px] rounded-[50px] border-none cursor-pointer text-[#0D2240] font-[900] text-[16px] tracking-[0.5px] hover:-translate-y-[2px] transition-all overflow-hidden relative font-inter"
                style={{ background: 'linear-gradient(135deg, #F5A623, #e6951a)', boxShadow: '0 4px 15px rgba(245,166,35,0.3)' }}
              >
                <span className="relative z-10">🚀 Enroll Now — Secure Your Seat!</span>
                <span className="absolute inset-0 z-0 animate-[shine_3s_infinite_ease-in-out]" style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)', transform: 'skewX(-20deg)', width: '50%' }}>
                  <style>{`
                    @keyframes shine {
                      0% { left: -100%; }
                      20% { left: 200%; }
                      100% { left: 200%; }
                    }
                  `}</style>
                </span>
              </button>
              
              <div className="text-center mt-3 text-[12px] text-[#888] font-inter">
                🔒 Secure Payment | ✅ 7-Day Money Back Guarantee
              </div>
              
              <button 
                onClick={handleClose}
                className="block w-full text-center mt-2 text-[12px] text-[#BBB] hover:text-[#888] cursor-pointer bg-transparent border-none font-inter"
              >
                Maybe later →
              </button>
            </div>

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CuetPopup;
