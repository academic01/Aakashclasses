import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    badge: "VIth To Xth CLASSES",
    subtitle: "MATHS, SCIENCE, ENGLISH & SST",
    checks: ["Expert Faculty", "Complete Syllabus", "Live + Recorded Classes", "Regular Tests & Doubt Sessions"],
    bg: "from-[#FFF8F0] to-[#FFFFFF]",
    accent: "#F5A623",
    type: "School Prep"
  },
  {
    id: 2,
    badge: "XIth – XIIth CLASSES",
    subtitle: "COMMERCE, SCIENCE & HUMANITIES",
    checks: ["Experienced Teachers", "Study Materials & Notes", "Regular Doubt Sessions", "Board Exam Focused Content"],
    bg: "from-[#F3F8FF] to-[#FFFFFF]",
    accent: "#0D2240",
    type: "Senior Secondary"
  },
  {
    id: 3,
    title: { navy: "PREPARATION FOR", orange: "GOVT. JOBS" },
    subtitle: "SSC, RAILWAY, DSSSB & MORE",
    checks: ["Comprehensive Courses", "Practice Sets & Mock Tests", "Expert Guidance", "Current Affairs Updates"],
    bg: "from-[#F0FFF4] to-[#FFFFFF]",
    accent: "#22C55E",
    type: "Govt Jobs"
  }
];

const HeroSection = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative w-full h-[600px] md:h-[700px] overflow-hidden bg-white">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-r ${slides[current].bg} flex items-center`}
        >
          {/* Orange Accent Stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F5A623]"></div>

          <div className="max-w-[1400px] mx-auto px-6 md:px-20 w-full flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">
              {slides[current].badge ? (
                <div className="bg-[#F5A623] px-6 py-2 rounded-md mb-4">
                  <h2 className="text-white font-outfit font-bold text-2xl md:text-3xl tracking-tight">
                    {slides[current].badge}
                  </h2>
                </div>
              ) : (
                <div className="mb-4">
                  <h2 className="text-[#0D2240] font-outfit font-black text-3xl md:text-4xl">
                    {slides[current].title.navy} <span className="text-[#F5A623]">{slides[current].title.orange}</span>
                  </h2>
                </div>
              )}

              <h3 className="text-[#0D2240] font-outfit font-bold text-xl md:text-2xl mb-8 flex items-center">
                {slides[current].subtitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full">
                {slides[current].checks.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[#0D2240] font-inter italic font-bold">
                    <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className="bg-[#0D2240] text-white px-10 py-4 rounded-full font-outfit font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-[#0D2240]/30"
              >
                Enroll Now
              </Link>
            </div>

            {/* Right side decoration/image placeholder */}
            <div className="hidden lg:flex w-1/2 justify-center relative h-full items-center">
              <div className="w-96 h-96 rounded-full bg-[#F5A623]/10 absolute animate-pulse"></div>
              <div className="relative z-10 w-80 h-80 bg-gray-200 rounded-2xl flex items-center justify-center border-4 border-white shadow-2xl overflow-hidden">
                <span className="text-gray-400 font-bold uppercase tracking-widest text-center px-4">
                   Student {slides[current].id} Illustration / Image
                </span>
              </div>
              {/* Swirl Decoration */}
              <svg className="absolute -right-10 w-64 h-64 text-[#F5A623]/20 fill-current opacity-50" viewBox="0 0 200 200">
                <path d="M 40,100 C 40,40 160,40 160,100 C 160,160 40,160 40,100" />
              </svg>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-100 text-[#0D2240] hover:bg-white transition-all z-20"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-100 text-[#0D2240] hover:bg-white transition-all z-20"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`slider-dot ${current === idx ? 'active' : 'inactive'}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
