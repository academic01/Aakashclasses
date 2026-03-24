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
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative cursor-default z-10 bg-[#F7F7F7] rounded-[3rem] my-20 border border-[#E5E5E5] shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between overflow-hidden">
          <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-textPrimary mb-4 section-header-underline pb-4">
              Learn <span className="text-black drop-shadow-sm">Anywhere</span>
            </h2>
            <p className="text-textSecondary font-exo text-lg mb-8 mt-4">
              Download the Aakash Academic App. Access live classes, recorded videos, and tests right from your pocket. Offline modes available.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <button className="bg-textPrimary text-white shadow-lg hover:bg-[#333333] px-8 py-3 rounded-full flex items-center gap-3 transition-colors">
                 <span className="font-bold font-orbitron text-sm cursor-pointer">Download for Android</span>
               </button>
               <button className="bg-white text-textPrimary border border-textPrimary hover:bg-textPrimary hover:text-white px-8 py-3 rounded-full flex items-center gap-3 transition-colors">
                 <span className="font-bold font-orbitron text-sm cursor-pointer">Download on App Store</span>
               </button>
            </div>
          </div>

          <div className="relative w-full md:w-1/3 flex justify-center z-10 group mt-10 md:mt-0">
             {/* Abstract Phone Mockup - Light Mode */}
             <div className="w-64 h-96 bg-white border-4 border-[#E5E5E5] rounded-[2.5rem] p-2 relative shadow-2xl group-hover:-translate-y-4 transition-all duration-500 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-6 bg-[#E5E5E5] rounded-b-xl w-32 mx-auto"></div>
                <div className="w-full h-full bg-[#F5F5F5] rounded-[2rem] border border-[#E5E5E5] p-4 flex flex-col">
                   <div className="h-10 w-full bg-textPrimary/10 rounded mb-4"></div>
                   <div className="h-6 w-3/4 bg-textPrimary/5 rounded mb-6"></div>
                   <div className="flex gap-2 mb-4">
                      <div className="h-16 w-1/2 bg-white rounded border border-[#E5E5E5]"></div>
                      <div className="h-16 w-1/2 bg-textPrimary/5 rounded border border-[#E5E5E5]"></div>
                   </div>
                   <div className="h-24 w-full bg-white rounded mb-auto border border-[#E5E5E5]"></div>
                   <div className="h-8 w-full bg-textPrimary rounded mt-4"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
