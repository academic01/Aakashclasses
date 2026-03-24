import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Atom, Divide, Dna, FlaskConical, Play } from 'lucide-react';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 150]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);
  
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden">
      {/* Particle Background Mock */}
      <div className="absolute inset-0 z-0 bg-hero-glow opacity-60 pointer-events-none"></div>
      
      {/* Stars/Dust (CSS Animation based) */}
      <div className="absolute inset-0 z-0 animate-twinkle bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
        
        {/* Typewriter Effect Tagline */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="inline-block relative">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-orbitron font-bold text-white mb-2 pb-2">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyanAccent via-white to-purpleAccent">
                Your Rank. Your Rules.
              </span>
              <br />
              <span className="neon-text-cyan">Your Academy.</span>
            </h1>
          </div>
        </motion.div>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-2xl text-gray-300 font-nunito font-semibold mb-10 max-w-3xl mx-auto"
        >
          JEE | NEET | CUET | Boards | Government Exams
        </motion.p>

        {/* Floating Subject Cards - Parallax */}
        <div className="absolute top-1/2 left-10 md:left-20 transform -translate-y-1/2 hidden md:block">
          <motion.div style={{ y: y1 }} className="relative text-cyanAccent opacity-70 drop-shadow-[0_0_15px_rgba(0,245,255,1)]">
            <Atom className="w-16 h-16 animate-spin-slow" />
          </motion.div>
        </div>
        
        <div className="absolute top-1/4 right-10 md:right-32 hidden md:block">
          <motion.div style={{ y: y2 }} className="relative text-orangeAccent opacity-70 drop-shadow-[0_0_15px_rgba(255,107,0,1)]">
            <FlaskConical className="w-14 h-14" />
          </motion.div>
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 hidden md:block">
          <motion.div style={{ y: y2 }} className="relative text-purpleAccent opacity-70 drop-shadow-[0_0_15px_rgba(124,58,237,1)]">
            <Dna className="w-12 h-12 rotate-45" />
          </motion.div>
        </div>

        <div className="absolute bottom-1/3 right-1/4 hidden md:block z-[-1]">
          <motion.div style={{ y: y1 }} className="relative text-white opacity-40 drop-shadow-[0_0_15px_rgba(255,255,255,1)]">
            <Divide className="w-12 h-12 -rotate-12" />
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
        >
          <button className="group relative px-8 py-4 font-orbitron font-bold text-lg rounded-xl bg-cyanAccent text-darkBg overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,245,255,0.6)]">
            <span className="relative z-10 flex items-center gap-2 text-darkBg"><Play className="w-5 h-5 fill-darkBg" /> Start Learning Free</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-xl transition-all duration-300 group-hover:scale-100 group-hover:bg-white/30"></div>
          </button>
          
          <button className="group relative px-8 py-4 font-orbitron font-bold text-lg rounded-xl bg-transparent border-2 border-purpleAccent text-white overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(124,58,237,0.4)]">
            <span className="relative z-10 flex items-center gap-2">Explore Batches</span>
            <div className="absolute inset-0 h-full w-full scale-0 rounded-xl bg-purpleAccent transition-all duration-300 group-hover:scale-100 group-hover:opacity-20"></div>
          </button>
        </motion.div>

        {/* Counter Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="glass-card max-w-4xl mx-auto py-6 px-4 md:px-12 flex flex-row items-center justify-around border-t border-cyanAccent/30"
        >
          <div className="text-center">
            <h3 className="font-orbitron font-bold text-2xl md:text-3xl neon-text-cyan mb-1">2,50,000+</h3>
            <p className="font-nunito text-sm md:text-base text-gray-400">Students</p>
          </div>
          <div className="w-px h-12 bg-gray-700"></div>
          <div className="text-center">
            <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-orangeAccent drop-shadow-[0_0_8px_rgba(255,107,0,0.8)] mb-1">500+</h3>
            <p className="font-nunito text-sm md:text-base text-gray-400">Courses</p>
          </div>
          <div className="w-px h-12 bg-gray-700"></div>
          <div className="text-center">
            <h3 className="font-orbitron font-bold text-2xl md:text-3xl text-purpleAccent drop-shadow-[0_0_8px_rgba(124,58,237,0.8)] mb-1">98%</h3>
            <p className="font-nunito text-sm md:text-base text-gray-400">Success Rate</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
