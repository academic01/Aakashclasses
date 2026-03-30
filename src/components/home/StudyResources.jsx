import React from 'react';
import { Book, FileText, FileSearch, Library } from 'lucide-react';
import { Link } from 'react-router-dom';

const resources = [
  {
    id: 1,
    title: 'Reference Books',
    description: 'Our experts have created thorough study materials that break down complicated concepts into easily understandable content',
    bgColor: 'bg-[#F2F8FB]',
    link: '/reference-books',
    ImageComponent: () => (
      <div className="relative w-full h-48 mt-6 flex justify-center items-end pb-4">
        {/* Abstract Book Stack */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/5 rounded-[50%] blur-sm"></div>
        <div className="relative z-10 w-24 h-32 bg-brandNavy rounded-md shadow-2xl flex flex-col items-center p-2 border-l-4 border-l-brandYellow -rotate-6 transform scale-110 translate-y-2">
            <div className="w-16 h-4 bg-white/20 rounded mt-2"></div>
            <div className="w-10 h-2 bg-white/10 rounded mt-2"></div>
            <Library className="w-8 h-8 text-brandYellow mt-auto mb-2" />
        </div>
        <div className="absolute right-12 bottom-6 z-0 w-20 h-28 bg-[#2E86C1] rounded-md shadow-xl border-l-4 border-l-white rotate-12 flex flex-col items-center justify-center">
             <Book className="w-8 h-8 text-white/80" />
        </div>
        <div className="absolute left-10 bottom-8 z-0 w-20 h-24 bg-[#E55A5D] rounded-md shadow-xl border-l-4 border-l-white -rotate-12 flex flex-col items-center justify-center">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
               <span className="text-white text-xs font-bold">11th</span>
            </div>
        </div>
        
        {/* Explore Button mimicking the screenshot */}
        <div className="absolute bottom-0 z-20 w-max bg-[#1E293B] text-white px-6 py-1.5 rounded-lg text-sm font-semibold shadow-lg hover:bg-black transition-colors cursor-pointer">
          Explore
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'NCERT Solutions',
    description: 'Unlock academic excellence with Aakash\'s NCERT Solutions which provides you step-by-step solutions',
    bgColor: 'bg-[#FEF8F0]',
    link: '/ncert-solutions',
    ImageComponent: () => (
      <div className="relative w-full h-48 mt-6 flex justify-center items-end pb-4 group">
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-8 bg-black/5 rounded-[50%] blur-sm"></div>
        
        {/* Abstract Documents */}
        <div className="relative z-10 w-32 h-40 bg-white border border-gray-200 rounded shadow-xl flex flex-col p-3 transform transition-transform group-hover:-translate-y-2 duration-300">
           <div className="flex justify-between items-center border-b pb-1 mb-2">
              <div className="w-10 h-2 bg-gray-300 rounded"></div>
              <div className="w-4 h-4 bg-brandYellow/30 rounded-full"></div>
           </div>
           <div className="w-full h-1 bg-gray-200 rounded mb-1.5"></div>
           <div className="w-5/6 h-1 bg-gray-200 rounded mb-1.5"></div>
           <div className="w-full h-1 bg-gray-200 rounded mb-1.5"></div>
           <div className="w-4/5 h-1 bg-gray-200 rounded mb-1.5"></div>
           <div className="mt-auto w-1/2 h-1 bg-gray-200 rounded"></div>
        </div>

        <div className="absolute left-12 bottom-6 z-0 w-28 h-36 bg-white border border-gray-200 rounded shadow-lg -rotate-12 p-3 opacity-90 transition-transform group-hover:-rotate-12 group-hover:-translate-x-4 duration-300">
           <div className="w-full h-1 bg-gray-200 rounded mb-1.5 mt-4"></div>
           <div className="w-5/6 h-1 bg-gray-200 rounded mb-1.5"></div>
           <FileSearch className="w-10 h-10 text-gray-300 mt-4 mx-auto" />
        </div>

        <div className="absolute right-12 bottom-6 z-0 w-28 h-36 bg-white border border-gray-200 rounded shadow-lg rotate-12 p-3 opacity-90 transition-transform group-hover:rotate-12 group-hover:translate-x-4 duration-300">
           <div className="w-full h-1 bg-gray-200 rounded mb-1.5 mt-4"></div>
           <div className="w-5/6 h-1 bg-gray-200 rounded mb-1.5"></div>
           <div className="w-full h-1 bg-gray-200 rounded mb-1.5"></div>
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Notes',
    description: 'Use Aakash\'s detailed study materials that simplify complex ideas into easily understandable language',
    bgColor: 'bg-[#F0FCF4]',
    link: '/notes',
    ImageComponent: () => (
      <div className="relative w-full h-48 mt-6 flex justify-center items-end pb-8 group">
         {/* Abstract Notes Pages */}
         <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-40 h-8 bg-black/5 rounded-[50%] blur-sm"></div>

         <div className="absolute left-16 z-0 w-28 h-40 bg-white border border-gray-200 rounded-sm shadow-md -rotate-12 p-4 transition-transform group-hover:rotate-[-20deg] duration-300">
            <div className="w-8 h-8 rounded-full border-2 border-brandNavy text-brandNavy flex items-center justify-center font-bold mb-4">i</div>
            <div className="w-full h-1 bg-gray-200 rounded mb-2"></div>
            <div className="w-3/4 h-1 bg-gray-200 rounded"></div>
         </div>

         <div className="relative z-10 w-32 h-44 bg-white border border-gray-200 rounded-sm shadow-xl p-4 rotate-6 transform translate-x-4 transition-transform group-hover:rotate-[12deg] duration-300">
            <div className="w-full h-3 bg-brandNavy rounded-sm mb-4"></div>
            <div className="w-full h-1.5 bg-gray-200 rounded mb-2"></div>
            <div className="w-5/6 h-1.5 bg-gray-200 rounded mb-2"></div>
            <div className="w-full h-1.5 bg-gray-200 rounded mb-2"></div>
            <div className="w-2/3 h-1.5 bg-gray-200 rounded mb-6"></div>
            
            <FileText className="w-8 h-8 text-brandNavy ml-auto" />
         </div>
      </div>
    )
  }
];

const StudyResources = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full relative z-10 font-nunito bg-brandBeige">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-textPrimary mb-4">
          Study Resources
        </h2>
        <p className="text-textSecondary text-lg md:text-xl font-exo mb-4 max-w-2xl mx-auto">
          A diverse array of learning materials to enhance your educational journey.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {resources.map((resource) => (
          <Link 
            to={resource.link} 
            key={resource.id} 
            className={`block rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 ${resource.bgColor} p-8 flex flex-col`}
          >
            <div className="mb-4">
              <h3 className="text-2xl font-bold text-textPrimary mb-3">{resource.title}</h3>
              <p className="text-textSecondary text-sm leading-relaxed font-exo">
                {resource.description}
              </p>
            </div>
            
            <div className="mt-auto">
               <resource.ImageComponent />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default StudyResources;
