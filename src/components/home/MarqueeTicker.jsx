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
    <div className="w-full bg-[#080808]/90 border-y border-white/10 py-3 overflow-hidden flex items-center shadow-[0_0_20px_rgba(255,255,255,0.05)] relative z-10">
      <motion.div
        className="whitespace-nowrap font-exo font-bold text-white tracking-wide text-sm md:text-base flex"
        animate={{ x: [0, -2000] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 40,
          ease: 'linear'
        }}
      >
        <span className="mr-8 drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]">{fullText}</span>
      </motion.div>
    </div>
  );
};

export default MarqueeTicker;
