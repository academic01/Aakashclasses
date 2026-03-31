import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: "/hero-slide-1.jpg",
    link: "/courses?category=senior",
    type: "image"
  },
  {
    id: 2,
    image: "/hero-slide-2.jpg",
    link: "/courses?category=school",
    type: "image"
  },
  {
    id: 3,
    image: "/hero-slide-3.jpg",
    link: "/courses?category=govt",
    type: "image"
  },
  {
    id: 4,
    type: "custom",
    bgClass: "bg-gradient-to-r from-[#0D2240] to-[#1a3a6b]",
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80"
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full overflow-hidden bg-brandBeige !mt-0 !pt-0">
      <div className="relative w-full min-h-auto md:min-h-[580px] lg:min-h-[calc(100vh-88px)] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full cursor-default"
          >
            {/* Slide Content */}
            {slides[current].type === "image" ? (
              <Link to={slides[current].link} className="w-full h-[280px] md:h-full block relative cursor-pointer group">
                <img 
                  src={slides[current].image} 
                  alt={`Hero Banner ${current + 1}`} 
                  className="w-full h-full object-contain md:object-cover object-top max-[480px]:hidden"
                  loading={current === 0 ? "eager" : "lazy"} 
                />
              </Link>
            ) : (
              <div className={`w-full h-full ${slides[current].bgClass} relative flex items-center justify-between overflow-hidden cursor-default`}>
                
                {/* Dots Pattern Overlay for Slide 4 */}
                <div 
                  className="absolute inset-0 z-0 opacity-10"
                  style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}
                ></div>

                {/* Left Content */}
                <div className="w-full lg:w-[60%] h-full relative z-10 flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-6 pb-10">
                  
                  {/* Notice Badges */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <div className="bg-[#22C55E] text-white flex items-center shadow-[0_0_15px_rgba(34,197,94,0.5)] tracking-wide font-black text-[13px] px-4 py-1.5 rounded-full animate-pulse">
                      🆕 NEW BATCH STARTING
                    </div>
                    <div className="bg-[#F5A623] text-white font-bold text-[14px] px-4 py-1.5 rounded-lg">
                      📅 1st April 2026
                    </div>
                  </div>

                  <h1 className="text-white text-4xl md:text-5xl lg:text-[56px] font-black tracking-widest leading-none mb-2 drop-shadow-lg">
                    CUET <span className="text-[#F5A623]">2026</span>
                  </h1>
                  <p className="text-white/80 text-lg md:text-xl font-medium mb-6">
                    Central Universities Entrance Test
                  </p>
                  
                  <ul className="text-white space-y-2 mb-4 font-medium text-[15px] opacity-90 max-w-lg">
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Complete Syllabus Coverage</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Domain + General Test Prep</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Language Section Mastery</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Previous Year Papers & Mock Tests</li>
                    <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></div> Expert Faculty Guidance</li>
                  </ul>

                  <p className="text-[#F5A623] font-bold text-[14px] mb-8 animate-bounce">
                    ⚡ Limited Seats Available!
                  </p>
                  
                  <div className="flex flex-wrap gap-4 items-center">
                    <Link to="/courses/cuet" className="relative cursor-pointer">
                      <span className="absolute inset-0 rounded-full animate-[ping_2s_ease-out_infinite] bg-[#F5A623] opacity-30"></span>
                      <button className="relative bg-[#F5A623] text-[#0D2240] font-black px-8 py-3.5 rounded-full shadow-xl shadow-[#F5A623]/20 hover:scale-105 transition-transform z-10 flex items-center gap-2">
                        🚀 Enroll Now
                      </button>
                    </Link>
                    <Link to="/courses/cuet" className="bg-transparent border-2 border-white text-white font-bold px-8 py-3.5 rounded-full hover:bg-white hover:text-[#0D2240] transition-colors flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-white/20">
                      📋 View Syllabus
                    </Link>
                  </div>

                </div>

                {/* Right Image */}
                <div className="hidden lg:block w-[40%] h-full relative z-10">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#1a3a6b] to-transparent w-full z-10 mix-blend-multiply pointer-events-none"></div>
                  <img src={slides[current].image} alt="CUET Students" className="absolute -top-[10px] w-full h-[110%] object-contain object-top" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%)' }} />
                </div>
              </div>
            )}
            
            {/* Global Slide Overlays */}
            {slides[current].type === "image" && (
              <div 
                className="absolute inset-0 z-10 opacity-10 pointer-events-none mix-blend-overlay"
                style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,1) 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}
              ></div>
            )}

          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg text-[#0D2240] hover:bg-white hover:scale-110 transition-all z-30"
        >
          <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg text-[#0D2240] hover:bg-white hover:scale-110 transition-all z-30"
        >
          <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
        </button>

        {/* Bottom Dots */}
        <div className="absolute bottom-[20px] left-1/2 -translate-x-1/2 flex gap-3 z-10 bg-black/30 px-5 py-2.5 rounded-full backdrop-blur-sm border border-white/10">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`min-w-[12px] min-h-[12px] rounded-full transition-all ${current === idx ? 'bg-[#F5A623] w-8 shadow-[0_0_10px_#F5A623]' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

