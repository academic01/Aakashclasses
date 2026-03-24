import React from 'react';
import { Play, FlaskConical, Globe, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';

const categories = [
  { id: 1, name: 'JEE', icon: <Play className="w-8 h-8 fill-brandNavy" />, count: '240+ Courses', exam: 'jee' },
  { id: 2, name: 'NEET', icon: <FlaskConical className="w-8 h-8" />, count: '180+ Courses', exam: 'neet' },
  { id: 3, name: 'CUET', icon: <Globe className="w-8 h-8" />, count: '95+ Courses', exam: 'cuet' },
  { id: 4, name: 'BOARDS', icon: <Tv className="w-8 h-8" />, count: '310+ Courses', exam: 'boards' },
];

const CategoryCards = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-12">
      {categories.map((cat) => (
        <Link 
          to={`/courses?exam=${cat.exam}`}
          key={cat.id} 
          className="group relative bg-[#F9F9F9] border border-[#E5E5E5] p-8 md:p-10 rounded-[3rem] transition-all duration-300 hover:bg-brandNavy hover:translate-y-[-10px] hover:shadow-2xl overflow-hidden shadow-sm"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-brandYellow opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-white group-hover:opacity-10 transition-all duration-500"></div>
          
          <div className="mb-6 bg-white p-4 rounded-3xl w-fit shadow-md group-hover:bg-brandYellow transition-all duration-300 transform group-hover:scale-110">
            {cat.icon}
          </div>
          
          <h3 className="text-xl md:text-2xl font-orbitron font-bold text-brandNavy mb-2 tracking-tight group-hover:text-white transition-colors uppercase">
            {cat.name}
          </h3>
          
          <p className="text-sm font-exo font-semibold text-textSecondary uppercase tracking-widest group-hover:text-white/80 transition-colors">
            {cat.count}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default CategoryCards;
