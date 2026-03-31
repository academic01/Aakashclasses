import React from 'react';
import { motion } from 'framer-motion';

const MarqueeTicker = () => {
  const tickerItems = [
    "🎉 New Batch Starting: CUET 2026 — 1st April! Enroll Now →",
    "📢 Free Mock Test Live Now →",
    "🏆 Highest Selections in State Boards 2023",
    "⭐ Daily Live Classes at 6PM — Join Now",
    "🎯 Class VI-X New Batch Open — Limited Seats!",
    "📚 Study Materials Available — Download Free"
  ];

  return (
    <div className="w-full bg-[#0D2240] py-4 overflow-hidden flex items-center shadow-sm relative z-10 border-b border-white/10">
      <motion.div
        className="whitespace-nowrap font-exo font-bold text-white tracking-widest text-[13px] md:text-sm flex items-center"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 35,
          ease: 'linear'
        }}
      >
        <span className="flex items-center">
          {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, index) => (
            <React.Fragment key={index}>
              <span className="mx-6 hover:text-[#F5A623] cursor-pointer transition-colors">{item}</span>
              <span className="text-[#F5A623] font-bold">|</span>
            </React.Fragment>
          ))}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeTicker;
