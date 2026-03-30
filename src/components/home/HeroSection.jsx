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
    bg: "bg-brandBeige",
    accent: "#F5A623",
    type: "School Prep",
    image: "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80",
    link: "/courses?category=school"
  },
  {
    id: 2,
    badge: "XIth – XIIth CLASSES",
    subtitle: "COMMERCE, SCIENCE & HUMANITIES",
    checks: ["Experienced Teachers", "Study Materials & Notes", "Regular Doubt Sessions", "Board Exam Focused Content"],
    bg: "bg-brandBeige",
    accent: "#0D2240",
    type: "Senior Secondary",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=600&q=80",
    link: "/courses?category=senior"
  },
  {
    id: 3,
    title: { navy: "PREPARATION FOR", orange: "GOVT. JOBS" },
    subtitle: "SSC, RAILWAY, DSSSB & MORE",
    checks: ["Comprehensive Courses", "Practice Sets & Mock Tests", "Expert Guidance", "Current Affairs Updates"],
    bg: "bg-brandBeige",
    accent: "#22C55E",
    type: "Govt Jobs",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    link: "/courses?category=govt"
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
    <section className="relative w-full h-[600px] md:h-[680px] overflow-hidden bg-brandBeige pt-[100px]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`absolute inset-0 ${slides[current].bg} flex items-center`}
        >
          {/* Background Image with Overlay */}
          <div className="absolute inset-0 z-0">
            <img 
              src={slides[current].image} 
              alt="Hero Illustration" 
              className="w-full h-full object-cover rounded-none"
              loading="lazy" 
            />
            <div 
              className="absolute inset-0" 
              style={{ background: 'linear-gradient(to right, rgba(249, 246, 242, 0.98) 30%, rgba(249, 246, 242, 0.8) 50%, rgba(249, 246, 242, 0) 100%)' }}
            ></div>
          </div>

          {/* Orange Accent Stripe */}
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#F5A623] z-10"></div>

          <div className="max-w-[1400px] mx-auto px-6 md:px-20 w-full flex flex-col lg:flex-row items-center justify-between z-10">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 flex flex-col items-start text-left">
              {slides[current].badge ? (
                <div className="bg-[#F5A623] px-6 py-2 rounded-md mb-4">
                  <h2 className="text-white font-outfit font-bold text-xl md:text-2xl tracking-tight">
                    {slides[current].badge}
                  </h2>
                </div>
              ) : (
                <div className="mb-4">
                  <h2 className="text-[#0D2240] font-outfit font-black text-2xl md:text-3xl">
                    {slides[current].title.navy} <span className="text-[#F5A623]">{slides[current].title.orange}</span>
                  </h2>
                </div>
              )}

              <h3 className="text-[#0D2240] font-outfit font-bold text-lg md:text-xl mb-6 flex items-center">
                {slides[current].subtitle}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 w-full">
                {slides[current].checks.map((check, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[#0D2240] font-inter italic font-bold">
                    <CheckCircle2 className="w-5 h-5 text-[#F5A623] shrink-0" />
                    <span>{check}</span>
                  </div>
                ))}
              </div>

              <Link
                to={slides[current].link}
                className="btn-primary bg-[#0D2240] text-white px-10 py-4 rounded-full font-outfit font-bold text-lg hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-[#0D2240]/30 min-w-[120px] min-h-[44px] flex items-center justify-center cursor-pointer"
              >
                Enroll Now
              </Link>
            </div>
            
            {/* Empty right area so layout stays intact and background shows */}
            <div className="hidden lg:flex w-1/2"></div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/60 backdrop-blur-sm p-3 rounded-full shadow-lg border border-brandNavy/5 text-[#0D2240] hover:bg-white transition-all z-20 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg border border-gray-100 text-[#0D2240] hover:bg-white transition-all z-20 cursor-pointer min-w-[44px] min-h-[44px] flex items-center justify-center"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Bottom Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`slider-dot cursor-pointer min-w-[16px] min-h-[16px] rounded-full transition-all ${current === idx ? 'bg-[#F5A623] w-8' : 'bg-gray-300'}`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
