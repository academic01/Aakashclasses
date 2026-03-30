import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: "/hero-slide-1.jpg",
    link: "/courses?category=senior"
  },
  {
    id: 2,
    image: "/hero-slide-2.jpg",
    link: "/courses?category=school"
  },
  {
    id: 3,
    image: "/hero-slide-3.jpg",
    link: "/courses?category=govt"
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
    <section className="relative w-full overflow-hidden bg-brandBeige pt-[72px]">
      <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[650px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full cursor-pointer"
          >
            <Link to={slides[current].link} className="w-full h-full block">
              <img 
                src={slides[current].image} 
                alt={`Hero Banner ${current + 1}`} 
                className="w-full h-full object-cover object-center"
                loading={current === 0 ? "eager" : "lazy"} 
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button 
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          className="absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg text-[#0D2240] hover:bg-white hover:scale-110 transition-all z-20"
        >
          <ChevronLeft className="w-5 h-5 md:w-8 md:h-8" />
        </button>
        <button 
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          className="absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-md p-2 md:p-3 rounded-full shadow-lg text-[#0D2240] hover:bg-white hover:scale-110 transition-all z-20"
        >
          <ChevronRight className="w-5 h-5 md:w-8 md:h-8" />
        </button>

        {/* Bottom Dots */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`min-w-[12px] min-h-[12px] rounded-full transition-all ${current === idx ? 'bg-white w-8 shadow-md' : 'bg-white/50 hover:bg-white/80'}`}
              aria-label={`Go to slide ${idx + 1}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
