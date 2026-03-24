import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Atom, Divide, Dna, FlaskConical, Play } from 'lucide-react';

const ParticleCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    const particles = [];
    for (let i = 0; i < 200; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
      
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.x += p.dx;
        p.y += p.dy;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
      });

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-30" />;
};

const HeroSection = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -80]);
  
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center items-center overflow-hidden pt-20">
      
      {/* JS Canvas Star field */}
      <ParticleCanvas />

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
              <span className="text-white">
                Your Rank.
              </span><br/>
              <span className="text-lightGrey">Your Rules.</span><br />
              <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Your Academy.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-lg md:text-xl text-midGrey font-exo font-semibold mb-10 max-w-lg"
          >
            JEE | NEET | CUET | Boards | Government Exams
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5, type: 'spring' }}
            className="flex flex-col sm:flex-row gap-6 mb-16 w-full sm:w-auto"
          >
            <button className="btn-primary flex items-center justify-center gap-2">
              <Play className="w-5 h-5 fill-black" /> Start Learning Free
            </button>
            
            <button className="btn-secondary">
              Explore Batches
            </button>
          </motion.div>
        </div>

        {/* Right 45% Visuals */}
        <div className="w-full lg:w-[45%] relative h-[400px] lg:h-[600px] mt-10 lg:mt-0 flex justify-center items-center">
            
            {/* 3D abstract grouping representing the "Astronaut/Student in space" vibe */}
            <div className="relative w-full h-full flex justify-center items-center">
              
              {/* Central glowing orb placeholder for astronaut */}
              <motion.div 
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-[rgba(255,255,255,0.06)] backdrop-blur-3xl border border-[rgba(255,255,255,0.15)] shadow-[0_0_80px_rgba(255,255,255,0.1)] flex items-center justify-center overflow-hidden"
              >
                 <span className="font-orbitron text-white text-opacity-80 text-sm tracking-widest text-center">COSMIC<br/>ACADEMY</span>
              </motion.div>

              {/* Floating Icons */}
              <motion.div style={{ y: y1 }} className="absolute text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] top-[10%] left-[15%]">
                <Atom className="w-16 h-16 animate-spin-slow" />
              </motion.div>
              
              <motion.div style={{ y: y2 }} className="absolute text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] bottom-[20%] left-[5%]">
                <FlaskConical className="w-14 h-14 animate-float-icon" />
              </motion.div>
              
              <motion.div style={{ y: y2 }} className="absolute text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] top-[25%] right-[10%]">
                <Dna className="w-12 h-12 rotate-45 animate-float-icon" />
              </motion.div>

              <motion.div style={{ y: y1 }} className="absolute text-white opacity-80 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] bottom-[15%] right-[20%]">
                <Divide className="w-12 h-12 -rotate-12 animate-float-icon" />
              </motion.div>

            </div>

        </div>

      </div>

      {/* Counter Stats - Spanning full width below */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="glass-card w-full max-w-[1280px] mx-auto py-8 px-4 md:px-12 flex flex-col md:flex-row items-center justify-around mt-auto mb-10 border-white/10 z-10"
      >
        <div className="text-center mb-6 md:mb-0">
          <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">2,50,000+</h3>
          <p className="font-exo text-sm md:text-base text-textSec">Students Enrolled</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-white/10"></div>
        <div className="text-center mb-6 md:mb-0">
          <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] mb-2">500+</h3>
          <p className="font-exo text-sm md:text-base text-textSec">Active Courses</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-white/10"></div>
        <div className="text-center">
          <h3 className="font-orbitron font-bold text-3xl md:text-4xl text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] mb-2">98%</h3>
          <p className="font-exo text-sm md:text-base text-textSec">Success Rate</p>
        </div>
      </motion.div>
      
    </section>
  );
};

export default HeroSection;
