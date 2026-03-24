import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Atom, Divide, Dna, FlaskConical, Play, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);
  
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-20 bg-white bg-graph">
      
      {/* Background Depth - Radial Dots Pattern instead of Stars */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col lg:flex-row items-center mt-10">
        
        {/* Left 55% Text */}
        <div className="w-full lg:w-[55%] text-left flex flex-col items-start pt-10 lg:pt-0">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-4"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold leading-tight">
              <span className="text-textPrimary">
                Your Rank.
              </span><br/>
              <span className="text-[#333333]">Your Rules.</span><br />
              <span className="text-textPrimary relative">Your Academy.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-textSecondary font-exo font-semibold mb-10 max-w-lg"
          >
            JEE | NEET | CUET | Boards | Government Exams
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 mt-10 justify-center md:justify-start w-full"
          >
            <Link to="/signup" className="btn-primary flex items-center justify-center gap-3 px-12 py-5 text-base shadow-xl md:text-sm tracking-widest uppercase font-orbitron hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
              <Rocket className="w-5 h-5 fill-white" /> Start Learning Free
            </Link>
            <Link to="/pricing" className="btn-secondary flex items-center justify-center gap-3 px-10 py-4 text-base md:text-sm tracking-widest uppercase font-orbitron border-brandNavy text-brandNavy hover:bg-brandNavy hover:text-white hover:scale-105 active:scale-95 transition-all w-full sm:w-auto">
              Explore Batches <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Right 45% Visuals */}
        <div className="w-full lg:w-[45%] relative h-[400px] lg:h-[600px] mt-10 lg:mt-0 flex justify-center items-center">
            
            <div className="relative w-full h-full flex justify-center items-center">
              
              {/* Central glowing orb - Light Version */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#F0F0F0] border border-[#DDDDDD] shadow-sm flex items-center justify-center overflow-hidden"
              >
                 <span className="font-orbitron text-[#888888] text-sm tracking-widest text-center uppercase">Aakash<br/>Academics</span>
              </motion.div>

              {/* Floating Icons - Black with Light Circles */}
              <motion.div style={{ y: y1 }} className="absolute top-[10%] left-[15%]">
                <div className="p-4 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textPrimary hover:bg-textPrimary hover:text-white transition-all cursor-pointer shadow-md group">
                   <Atom className="w-10 h-10 animate-spin-slow" />
                </div>
              </motion.div>
              
              <motion.div style={{ y: y2 }} className="absolute bottom-[20%] left-[5%]">
                <div className="p-3 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textPrimary hover:bg-textPrimary hover:text-white transition-all cursor-pointer shadow-md">
                   <FlaskConical className="w-10 h-10 animate-float-icon" />
                </div>
              </motion.div>
              
              <motion.div style={{ y: y2 }} className="absolute top-[25%] right-[10%]">
                <div className="p-3 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textPrimary hover:bg-textPrimary hover:text-white transition-all cursor-pointer shadow-md">
                   <Dna className="w-9 h-9 rotate-45 animate-float-icon" />
                </div>
              </motion.div>

              <motion.div style={{ y: y1 }} className="absolute bottom-[15%] right-[20%]">
                <div className="p-3 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textPrimary hover:bg-textPrimary hover:text-white transition-all cursor-pointer shadow-md">
                   <Divide className="w-8 h-8 -rotate-12 animate-float-icon" />
                </div>
              </motion.div>

            </div>

        </div>

      </div>

      {/* Counter Stats - Spanning full width below */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="w-full max-w-[1280px] mx-auto py-10 px-4 md:px-12 flex flex-col md:flex-row items-center justify-around mt-auto mb-10 border-y border-[#E5E5E5] z-10 bg-white/50 backdrop-blur-sm shadow-sm rounded-2xl"
      >
        <div className="text-center mb-6 md:mb-0">
          <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-brandNavy mb-2">2,50,000+</h3>
          <p className="font-exo text-sm md:text-base text-textMuted uppercase tracking-wider">Students Enrolled</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-[#E5E5E5]"></div>
        <div className="text-center mb-6 md:mb-0">
          <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-brandNavy mb-2">500+</h3>
          <p className="font-exo text-sm md:text-base text-textMuted uppercase tracking-wider">Active Courses</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-[#E5E5E5]"></div>
        <div className="text-center">
          <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-brandNavy mb-2">98%</h3>
          <p className="font-exo text-sm md:text-base text-textMuted uppercase tracking-wider">Success Rate</p>
        </div>
      </motion.div>
      
    </section>
  );
};

export default HeroSection;
