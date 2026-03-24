import React from 'react';
import { motion } from 'framer-motion';

const MarqueeTicker = () => {
  const tickerItems = [
    "🏆 Rohan S. secured AIR 47 in JEE 2024",
    "🎉 New Batch Starting: NEET 2025 Dropper",
    "📢 Free Mock Test Live Now →",
    "🔥 Highest Selections in State Boards 2023",
    "⭐ Daily Live Classes at 6PM – Join Now"
  ];

  const fullText = [...tickerItems, ...tickerItems, ...tickerItems].join('   |   ');

  return (
    <div className="w-full bg-white/90 border-y border-[#E5E5E5] py-4 overflow-hidden flex items-center shadow-sm relative z-10">
      <motion.div
        className="whitespace-nowrap font-exo font-bold text-textPrimary tracking-widest text-sm md:text-base flex"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 50,
          ease: 'linear'
        }}
      >
        <span className="mr-8 opacity-80">{fullText}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeTicker;
