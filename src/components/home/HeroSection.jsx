import React from 'react';
import { motion } from 'framer-motion';
import { Atom, FlaskConical, Dna, Divide, Rocket, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  const stats = [
    { value: '2,50,000+', label: 'Students' },
    { value: '500+', label: 'Courses' },
    { value: '98%', label: 'Success' }
  ];

  const floatingIcons = [
    { Icon: Atom, color: '#0D2240', bg: '#EEF2FF', delay: 0, animation: 'animate-spin-slow' },
    { Icon: FlaskConical, color: '#F5A623', bg: '#FFF8E7', delay: 0.5 },
    { Icon: Dna, color: '#22C55E', bg: '#F0FDF4', delay: 1 },
    { Icon: Divide, color: '#F59E0B', bg: '#FEF3C7', delay: 1.5 }
  ];

  return (
    <section className="relative w-full overflow-hidden bg-white bg-dot-grid pt-12 md:pt-14 lg:pt-16 pb-16 px-6 md:px-20 min-h-auto">
      
      <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-0 relative z-10">
        
        {/* Left Side (55%) */}
        <div className="w-full lg:w-[55%] text-left flex flex-col items-start">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-outfit font-black leading-tight mb-6">
              <span className="text-[#0D2240] block">Your Rank.</span>
              <span className="text-[#0D2240] block">Your Rules.</span>
              <span className="text-gradient-navy-yellow block">Your Academy.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-lg md:text-xl font-bold mb-8 flex flex-wrap gap-x-3 items-center"
          >
            <span className="text-[#0D2240]">JEE</span>
            <span className="text-[#F5A623]">|</span>
            <span className="text-[#0D2240]">NEET</span>
            <span className="text-[#F5A623]">|</span>
            <span className="text-[#0D2240]">CUET</span>
            <span className="text-[#F5A623]">|</span>
            <span className="text-[#0D2240]">Boards</span>
            <span className="text-[#F5A623]">|</span>
            <span className="text-[#0D2240]">Government Exams</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-6 mb-10 w-full sm:w-auto"
          >
            <Link
              to="/signup"
              className="btn-primary-gradient w-full sm:w-auto px-10 py-5 rounded-full text-white font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3"
            >
              <Rocket className="w-5 h-5 fill-white" /> Start Learning Free
            </Link>
            
            <Link
              to="/courses"
              className="btn-hover-arrow w-full sm:w-auto px-10 py-5 rounded-full border-2 border-[#0D2240] text-[#0D2240] font-black text-sm tracking-widest uppercase flex items-center justify-center gap-3 hover:bg-[#0D2240] hover:text-white transition-all duration-300"
            >
              Explore Batches <ArrowRight className="w-5 h-5 arrow-icon" />
            </Link>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="flex items-center gap-0 border-t border-b border-[#E5E5E5] py-4 mt-8 w-full md:w-auto"
          >
            {stats.map((stat, i) => (
              <React.Fragment key={stat.label}>
                <div className="px-6 md:px-10 text-center md:text-left">
                  <div className="text-[#0D2240] text-2xl font-black">{stat.value}</div>
                  <div className="text-[#888888] text-[13px] uppercase tracking-wider">{stat.label}</div>
                </div>
                {i < stats.length - 1 && (
                  <div className="w-px h-10 bg-[#E5E5E5]"></div>
                )}
              </React.Fragment>
            ))}
          </motion.div>
        </div>

        {/* Right Side (45%) */}
        <div className="w-full lg:w-[45%] relative h-[450px] md:h-[600px] flex justify-center items-center">
          
          {/* Animated Central Circle */}
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[#0D2240] border-[3px] border-[#F5A623] shadow-2xl flex items-center justify-center text-center p-6 z-20"
          >
            <span className="text-white font-outfit font-black text-xl tracking-tighter uppercase leading-tight">
              Aakash<br />Academics
            </span>
          </motion.div>

          {/* Floating Icons */}
          {floatingIcons.map(({ Icon, color, bg, delay, animation }, i) => {
            const positions = [
              "top-[10%] left-[15%]",
              "bottom-[20%] left-[5%]",
              "top-[25%] right-[10%]",
              "bottom-[15%] right-[20%]"
            ];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + delay, duration: 0.5 }}
                className={`absolute ${positions[i]} z-30`}
              >
                <div 
                  className={`p-4 rounded-full shadow-lg border border-white flex items-center justify-center animate-float ${animation || ''}`}
                  style={{ backgroundColor: bg, animationDelay: `${delay}s` }}
                >
                  <Icon className="w-8 h-8 md:w-10 md:h-10" style={{ color }} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>

    </section>
  );
};

export default HeroSection;
