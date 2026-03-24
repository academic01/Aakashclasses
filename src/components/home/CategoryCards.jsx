import { motion } from 'framer-motion';
import { Target, HeartPulse, GraduationCap, BookOpen, Calculator, ShieldCheck } from 'lucide-react';

const categories = [
  { name: 'JEE Mains & Advanced', icon: <Target className="w-8 h-8" />, color: 'cyan', hover: 'glass-card' },
  { name: 'NEET UG', icon: <HeartPulse className="w-8 h-8" />, color: 'orange', hover: 'glass-card-orange' },
  { name: 'Class 10 Boards', icon: <BookOpen className="w-8 h-8" />, color: 'purple', hover: 'glass-card-purple' },
  { name: 'Class 12 Boards', icon: <GraduationCap className="w-8 h-8" />, color: 'cyan', hover: 'glass-card' },
  { name: 'CUET', icon: <Calculator className="w-8 h-8" />, color: 'orange', hover: 'glass-card-orange' },
  { name: 'Government Exams', icon: <ShieldCheck className="w-8 h-8" />, color: 'purple', hover: 'glass-card-purple' },
];

const CategoryCards = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative z-10">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-orbitron font-bold text-white mb-4 section-header-underline pb-4">
          Choose Your <span className="neon-text-cyan">Battleground</span>
        </h2>
        <p className="text-textSec font-exo text-lg max-w-2xl mx-auto mt-4">
          Tailored learning tracks for the toughest exams. Your success story starts here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`${cat.hover} p-8 group cursor-pointer flex flex-col items-center text-center`}
          >
            <div className={`
              mb-6 p-4 rounded-xl transition-all duration-300 transform group-hover:-translate-y-2 group-hover:scale-110
              ${cat.color === 'cyan' ? 'bg-cyanAccent/10 text-cyanAccent shadow-[0_0_15px_rgba(0,245,255,0.4)]' : ''}
              ${cat.color === 'orange' ? 'bg-orangeAccent/10 text-orangeAccent shadow-[0_0_15px_rgba(255,107,0,0.4)]' : ''}
              ${cat.color === 'purple' ? 'bg-purpleAccent/10 text-purpleAccent shadow-[0_0_15px_rgba(124,58,237,0.4)]' : ''}
            `}>
              {cat.icon}
            </div>
            <h3 className="text-xl font-orbitron font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-cyanAccent transition-all">
              {cat.name}
            </h3>
            <div className="mt-4 w-12 h-1 bg-gray-700 rounded-full group-hover:w-full group-hover:bg-cyanAccent transition-all duration-300"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
