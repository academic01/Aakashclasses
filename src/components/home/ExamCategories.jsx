import React from 'react';
import { Stethoscope, Atom, Backpack, BookOpen, Users, Landmark, ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    title: 'NEET',
    tags: ['class 11', 'class 12', 'Dropper'],
    bgColor: 'bg-[#FCF0F0]',
    iconColor: 'text-[#E55A5D]',
    Icon: () => (
      <div className="relative flex items-center justify-center">
        <Stethoscope className="w-12 h-12 text-[#E55A5D]" />
        <div className="absolute text-[#FCE170] -bottom-2 -right-2">
          {/* Decorative element could go here */}
        </div>
      </div>
    ),
    link: '/courses?exam=neet'
  },
  {
    id: 2,
    title: 'IIT JEE',
    tags: ['class 11', 'class 12', 'Dropper'],
    bgColor: 'bg-[#FFF2E5]',
    iconColor: 'text-[#F5A623]',
    Icon: () => (
      <Atom className="w-14 h-14 text-[#F5A623]" />
    ),
    link: '/courses?exam=jee'
  },
  {
    id: 3,
    title: 'Pre Foundation',
    tags: [],
    bgColor: 'bg-[#FFF9EA]',
    iconColor: 'text-[#F5D547]',
    Icon: () => (
      <Backpack className="w-12 h-12 text-[#F5D547]" />
    ),
    link: '/courses?exam=pre-foundation'
  },
  {
    id: 4,
    title: 'School Boards',
    tags: ['CBSE', 'ICSE', 'UP Board', 'Maharashtra Board'],
    bgColor: 'bg-[#F0F2FA]',
    iconColor: 'text-[#4A90E2]',
    Icon: () => (
      <BookOpen className="w-12 h-12 text-[#4A90E2]" />
    ),
    link: '/courses?exam=boards'
  },
  {
    id: 5,
    title: 'UPSC',
    tags: [],
    bgColor: 'bg-[#ECFAFB]',
    iconColor: 'text-[#41C4D3]',
    Icon: () => (
      <Users className="w-14 h-14 text-[#41C4D3]" />
    ),
    link: '/courses?exam=upsc'
  },
  {
    id: 6,
    title: 'Govt Job Exams',
    tags: ['SSC', 'Banking', 'Teaching', 'Judiciary'],
    bgColor: 'bg-[#F3F4F6]',
    iconColor: 'text-[#6B7280]',
    Icon: () => (
      <Landmark className="w-14 h-14 text-[#6B7280]" />
    ),
    link: '/courses?exam=govt-jobs'
  }
];

const ExamCategories = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto w-full relative z-10 font-nunito bg-white">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold font-orbitron text-textPrimary mb-4">
          Exam Categories
        </h2>
        <p className="text-textSecondary text-lg md:text-xl font-exo mb-4">
          Aakash is preparing students for 35+ exam categories. Scroll down to find the one you are preparing for
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {categories.map((category) => (
          <div 
            key={category.id} 
            className="group block relative bg-white border border-[#E5E5E5] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 min-h-[260px] cursor-pointer"
          >
            {/* Right side circle background */}
            <div className={`absolute top-1/2 -translate-y-1/2 -right-16 w-64 h-64 rounded-full ${category.bgColor} flex items-center justify-center transition-transform duration-500 group-hover:scale-110`}>
               {/* Icon wrapper */}
               <div className="absolute left-16">
                 <category.Icon />
               </div>
            </div>

            <div className="relative z-10 p-8 flex flex-col h-full w-[65%]">
              <h3 className="text-2xl font-bold text-textPrimary mb-4 font-orbitron">{category.title}</h3>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {category.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-4 py-1.5 bg-white border border-[#E5E5E5] rounded-full text-xs font-semibold text-textSecondary font-exo shadow-sm hover:border-brandNavy hover:text-brandNavy transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-auto flex items-center text-textSecondary group-hover:text-brandNavy transition-colors font-exo font-semibold w-max">
                Explore Category
                <ArrowRight className="w-5 h-5 ml-2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExamCategories;
