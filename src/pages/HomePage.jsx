import React from 'react';
import HeroSection from '../components/home/HeroSection';
import MarqueeTicker from '../components/home/MarqueeTicker';
import CategoryCards from '../components/home/CategoryCards';
import GamificationShowcase from '../components/home/GamificationShowcase';
import FeaturesGrid from '../components/home/FeaturesGrid';

const HomePage = () => {
  return (
    <div className="w-full relative">
      <HeroSection />
      <MarqueeTicker />
      <CategoryCards />
      <GamificationShowcase />
      <FeaturesGrid />
      
      {/* App Download Prompt */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative cursor-default z-10">
        <div className="glass-card bg-[rgba(255,255,255,0.02)] border-white/10 p-8 md:p-12 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between shadow-[0_0_30px_rgba(255,255,255,0.05)] overflow-hidden">
          <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4 section-header-underline pb-4">
              Learn <span className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)]">Anywhere</span>
            </h2>
            <p className="text-textSec font-exo text-lg mb-8 mt-4">
              Download the Aakash Academic App. Access live classes, recorded videos, and tests right from your pocket. Offline modes available.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <button className="bg-[#111111] text-textSec border border-[#444444] hover:border-white hover:text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors">
                 <span className="font-bold font-orbitron text-sm cursor-pointer">Download for Android</span>
               </button>
               <button className="bg-[#111111] text-textSec border border-[#444444] hover:border-white hover:text-white px-6 py-3 rounded-lg flex items-center gap-3 transition-colors">
                 <span className="font-bold font-orbitron text-sm cursor-pointer">Download on the App Store</span>
               </button>
            </div>
          </div>

          <div className="relative w-full md:w-1/3 flex justify-center z-10 group">
             {/* Abstract Phone Mockup */}
             <div className="w-64 h-96 bg-[#080808] border-4 border-[#222222] rounded-[2.5rem] p-2 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] group-hover:-translate-y-4 group-hover:shadow-[0_20px_50px_rgba(255,255,255,0.15)] transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-6 bg-[#222222] rounded-b-xl w-32 mx-auto"></div>
                <div className="w-full h-full bg-gradient-to-b from-[#111111] to-[#1A1A1A] rounded-[2rem] border border-white/5 p-4 flex flex-col">
                   <div className="h-10 w-full bg-white/10 rounded mb-4"></div>
                   <div className="h-6 w-3/4 bg-white/5 rounded mb-6"></div>
                   <div className="flex gap-2 mb-4">
                      <div className="h-16 w-1/2 bg-white/10 rounded border border-white/20"></div>
                      <div className="h-16 w-1/2 bg-[#333333] rounded border border-white/10"></div>
                   </div>
                   <div className="h-24 w-full bg-white/10 rounded mb-auto"></div>
                   <div className="h-8 w-full bg-white rounded mt-4"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
