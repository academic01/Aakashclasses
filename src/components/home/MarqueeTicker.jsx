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
    <div className="w-full bg-[#F5A623] h-[44px] px-[20px] overflow-hidden flex items-center shadow-sm relative z-10">
      <motion.div
        className="whitespace-nowrap font-exo font-bold text-[#0D2240] text-[14px] tracking-[0.3px] flex items-center"
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
              <span className="mx-6 hover:opacity-80 cursor-pointer transition-opacity">{item}</span>
              <span className="text-[#0D2240] font-bold">|</span>
            </React.Fragment>
          ))}
        </span>
      </motion.div>
    </div>
  );
};

export default MarqueeTicker;
