import { motion } from 'framer-motion';
import { Target, HeartPulse, GraduationCap, BookOpen, Calculator, ShieldCheck } from 'lucide-react';

const categories = [
  { name: 'JEE Mains & Advanced', icon: <Target className="w-8 h-8" />, hover: 'glass-card' },
  { name: 'NEET UG', icon: <HeartPulse className="w-8 h-8" />, hover: 'glass-card' },
  { name: 'Class 10 Boards', icon: <BookOpen className="w-8 h-8" />, hover: 'glass-card' },
  { name: 'Class 12 Boards', icon: <GraduationCap className="w-8 h-8" />, hover: 'glass-card' },
  { name: 'CUET', icon: <Calculator className="w-8 h-8" />, hover: 'glass-card' },
  { name: 'Government Exams', icon: <ShieldCheck className="w-8 h-8" />, hover: 'glass-card' },
];

const CategoryCards = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-[1280px] mx-auto relative z-10 bg-white">
      <div className="text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-orbitron font-bold text-textPrimary mb-4 section-header-underline pb-4">
          Choose Your <span className="text-textPrimary">Battleground</span>
        </h2>
        <p className="text-textSecondary font-exo text-lg max-w-2xl mx-auto mt-4">
          Tailored learning tracks for the toughest exams. Your success story starts here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {categories.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className={`${cat.hover} p-10 group cursor-pointer flex flex-col items-center text-center`}
          >
            <div className="mb-8 p-5 rounded-full transition-all duration-300 transform group-hover:-translate-y-2 group-hover:bg-textPrimary group-hover:text-white bg-[#F5F5F5] text-textPrimary shadow-sm border border-[#E5E5E5]">
              {cat.icon}
            </div>
            <h3 className="text-xl font-orbitron font-bold text-textPrimary group-hover:text-black tracking-wide transition-all uppercase">
              {cat.name}
            </h3>
            <div className="mt-6 w-12 h-1 bg-[#E5E5E5] rounded-full group-hover:w-full group-hover:bg-textPrimary transition-all duration-300"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
