import React from 'react';
import toast from 'react-hot-toast';
import HeroSection from '../components/home/HeroSection';
import MarqueeTicker from '../components/home/MarqueeTicker';
import CategoryCards from '../components/home/CategoryCards';
import ExamCategories from '../components/home/ExamCategories';
import StudyResources from '../components/home/StudyResources';
import GamificationShowcase from '../components/home/GamificationShowcase';
import FeaturesGrid from '../components/home/FeaturesGrid';

const HomePage = () => {
  return (
    <div className="w-full relative">
      <HeroSection />
      <MarqueeTicker />
      <ExamCategories />
      <StudyResources />
      <GamificationShowcase />
      <FeaturesGrid />
      
      {/* App Download Prompt */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative cursor-default z-10 bg-[#FBFAFF] rounded-[3rem] my-20 border border-[#E5E5E5] shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
        <div className="flex flex-col md:flex-row items-center justify-between overflow-hidden">
          <div className="relative z-10 max-w-xl text-center md:text-left mb-8 md:mb-0">
            <h2 className="text-4xl md:text-6xl font-outfit font-black text-gray-900 mb-6 leading-none">
              Learn <span className="text-black inline-block relative border-b-4 border-brandYellow pb-2">Anywhere</span>
            </h2>
            <p className="text-gray-500 font-inter text-lg mb-10 max-w-lg">
              Download the Aakash Academic App. Access live classes, recorded videos, and tests right from your pocket. Offline modes available.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
               <button 
                onClick={() => toast('Coming Soon on Play Store', { icon: '🚧' })}
                className="bg-[#0D2240] text-white shadow-xl shadow-[#0D2240]/20 hover:bg-[#1a3a6b] hover:-translate-y-1 px-10 py-4 rounded-full flex items-center gap-3 transition-all font-bold font-inter"
               >
                 <span>Download for Android</span>
               </button>
               <button 
                onClick={() => toast('Coming Soon on App Store', { icon: '🚧' })}
                className="bg-white text-[#0D2240] border-2 border-[#0D2240] hover:bg-[#0D2240] hover:text-white hover:-translate-y-1 px-10 py-4 rounded-full flex items-center gap-3 transition-all font-bold font-inter"
               >
                 <span>Download on App Store</span>
               </button>
            </div>
          </div>

          <div className="relative w-full md:w-1/3 flex justify-center z-10 group mt-10 md:mt-0">
             {/* Abstract Phone Mockup - Clean White Style */}
             <div className="w-72 h-[480px] bg-white border-8 border-gray-100 rounded-[3rem] p-3 relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] group-hover:-translate-y-6 transition-all duration-700 overflow-hidden">
                <div className="absolute top-0 inset-x-0 h-7 bg-gray-100 rounded-b-2xl w-36 mx-auto z-20"></div>
                <div className="w-full h-full bg-[#FAFAFB] rounded-[2.5rem] border border-gray-100 p-6 flex flex-col relative z-10">
                   <div className="h-12 w-full bg-gray-200 rounded-xl mb-6"></div>
                   <div className="h-6 w-3/4 bg-gray-100 rounded-lg mb-8"></div>
                   <div className="flex gap-4 mb-6">
                      <div className="h-20 w-1/2 bg-white rounded-xl border border-gray-100 shadow-sm"></div>
                      <div className="h-20 w-1/2 bg-gray-50 rounded-xl border border-gray-100 shadow-sm"></div>
                   </div>
                   <div className="h-40 w-full bg-white rounded-2xl mb-auto border border-gray-100 shadow-sm"></div>
                   <div className="h-10 w-full bg-[#0D2240] rounded-xl mt-6"></div>
                </div>
                {/* Glow Effect */}
                <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#5A4BDA]/10 blur-[80px] rounded-full pointer-events-none"></div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
