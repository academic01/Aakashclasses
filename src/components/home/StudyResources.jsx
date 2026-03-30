import React from 'react';
import { Book, FileText, FileSearch, Library } from 'lucide-react';
import { Link } from 'react-router-dom';

const resources = [
  {
    id: 1,
    title: 'Reference Books',
    description: 'Expert-curated materials that break down complex concepts into simple steps.',
    bgColor: 'bg-[#F2F8FB]',
    link: '/reference-books',
    ImageComponent: () => (
      <div className="relative w-full h-32 mt-4 flex justify-center items-center">
        <div className="w-16 h-24 bg-brandNavy rounded-md shadow-lg flex flex-col items-center p-2 border-l-4 border-l-brandYellow -rotate-6">
            <div className="w-10 h-3 bg-white/20 rounded mt-1"></div>
            <Library className="w-6 h-6 text-brandYellow mt-auto mb-1" />
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-20 bg-blue-500 rounded-md shadow-md border-l-4 border-l-white rotate-12 flex items-center justify-center">
             <Book className="w-5 h-5 text-white/80" />
        </div>
      </div>
    )
  },
  {
    id: 2,
    title: 'NCERT Solutions',
    description: 'Step-by-step solutions for all NCERT exercises to master your basics.',
    bgColor: 'bg-[#FEF8F0]',
    link: '/ncert-solutions',
    ImageComponent: () => (
      <div className="relative w-full h-32 mt-4 flex justify-center items-center group">
        <div className="relative z-10 w-20 h-28 bg-white border border-gray-200 rounded shadow-lg flex flex-col p-2 transform transition-transform group-hover:-translate-y-2">
           <div className="w-8 h-1 bg-gray-300 rounded mb-1"></div>
           <div className="w-full h-1 bg-gray-100 rounded mb-1"></div>
           <div className="w-4/5 h-1 bg-gray-100 rounded mb-4"></div>
           <FileSearch className="w-6 h-6 text-orange-400 mx-auto" />
        </div>
      </div>
    )
  },
  {
    id: 3,
    title: 'Notes',
    description: 'Simplify complex ideas into easily understandable handwritten notes.',
    bgColor: 'bg-[#F0FCF4]',
    link: '/notes',
    ImageComponent: () => (
      <div className="relative w-full h-32 mt-4 flex justify-center items-center group">
         <div className="relative z-10 w-20 h-28 bg-white border border-gray-200 rounded-sm shadow-xl p-3 rotate-3 transform transition-transform group-hover:rotate-6 duration-300">
            <div className="w-full h-2 bg-brandNavy rounded-sm mb-3"></div>
            <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
            <div className="w-5/6 h-1 bg-gray-200 rounded mb-4"></div>
            <FileText className="w-6 h-6 text-brandNavy ml-auto" />
         </div>
      </div>
    )
  },
  {
    id: 4,
    title: 'Syllabus',
    description: 'Download latest syllabus and exam patterns for all classes.',
    bgColor: 'bg-[#F5F3FF]',
    link: '/syllabus',
    ImageComponent: () => (
      <div className="mt-4 flex flex-col gap-1.5">
         {[
           { label: 'JEE Mains', class: 'Class 12' },
           { label: 'NEET UG', class: 'Class 12' },
           { label: 'Classes 6-10', class: 'Boards' },
           { label: 'Govt. Jobs', class: 'All' }
         ].map((item, i) => (
           <div key={i} className="flex items-center justify-between bg-white/60 px-3 py-1.5 rounded-lg border border-brandNavy/5 hover:bg-white hover:border-blue-500 transition-all cursor-pointer group/btn">
              <span className="text-[10px] font-black text-brandNavy">{item.label}</span>
              <span className="text-[9px] font-bold text-blue-600 group-hover/btn:underline">Download</span>
           </div>
         ))}
      </div>
    )
  }
];

const StudyResources = () => {
  return (
    <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-[1400px] mx-auto w-full relative z-10 font-nunito bg-brandBeige">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-black font-outfit text-brandNavy mb-3 uppercase tracking-tight">
          Study Resources
        </h2>
        <p className="text-[#888888] text-sm md:text-md font-medium max-w-2xl mx-auto">
          Expert-curated materials to power your academic journey.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {resources.map((resource) => (
          <Link 
            to={resource.link} 
            key={resource.id} 
            className={`block rounded-[32px] overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${resource.bgColor} border border-brandNavy/5 p-6 flex flex-col`}
          >
            <div className="mb-2">
              <h3 className="text-xl font-black text-brandNavy mb-1.5">{resource.title}</h3>
              <p className="text-gray-500 text-[11px] leading-relaxed font-medium">
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
