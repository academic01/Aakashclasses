import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Landmark, BookOpen, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const programs = [
  {
    id: 1,
    title: "Class VI - X",
    subtitle: "Foundation & Board Prep",
    icon: <BookOpen className="w-12 h-12" />,
    color: "#F5A623",
    features: ["Maths, Science, English, SST", "NCERT Based Content", "Chapter-wise Tests", "Live Doubt Sessions"],
    students: "5,000+ Students"
  },
  {
    id: 2,
    title: "Class XI - XII",
    subtitle: "Board Exam Excellence",
    icon: <GraduationCap className="w-12 h-12" />,
    color: "#0D2240",
    features: ["Science, Commerce, Humanities", "Board-focused Curriculum", "Previous Year Papers", "Expert Faculty"],
    students: "3,000+ Students"
  },
  {
    id: 3,
    title: "Govt. Jobs Prep",
    subtitle: "SSC, Railway, DSSSB & More",
    icon: <Landmark className="w-12 h-12" />,
    color: "#22C55E",
    features: ["Complete Syllabus Coverage", "Daily Practice Sets", "Mock Test Series", "Current Affairs"],
    students: "2,000+ Students"
  }
];

const OurPrograms = () => {
  return (
    <section className="py-24 px-6 md:px-20 bg-white">
      <div className="max-w-[1400px] mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-outfit font-black text-[#0A0A0A] mb-4">Our Programs</h2>
        <p className="text-[#888888] text-lg md:text-xl font-inter">Choose your path to success</p>
      </div>

      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {programs.map((program) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="program-card overflow-hidden group"
          >
            {/* Top Color Bar */}
            <div className="h-2 w-full absolute top-0 left-0" style={{ backgroundColor: program.color }}></div>

            <div className="flex flex-col h-full items-start">
              <div className="mb-6 p-4 rounded-2xl bg-[#F8F8F8] group-hover:bg-white border border-transparent group-hover:border-[#E5E5E5] transition-all duration-300" style={{ color: program.color }}>
                {program.icon}
              </div>

              <h3 className="text-3xl font-outfit font-black text-[#0A0A0A] mb-2">{program.title}</h3>
              <p className="text-[#888888] font-bold mb-8">{program.subtitle}</p>

              <div className="flex flex-col gap-4 mb-10 w-full flex-grow text-left">
                {program.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-[#444444] font-inter">
                    <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                    <span className="font-medium">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="w-full pt-6 border-t border-[#E5E5E5] flex flex-col items-start gap-6">
                <span className="text-[#0D2240] font-black text-sm uppercase tracking-widest">{program.students}</span>
                <Link
                  to="/courses"
                  className="w-full text-center py-4 bg-[#0D2240] hover:bg-[#1a3a6b] text-white font-bold rounded-xl shadow-lg transition-all transform group-hover:translate-y-[-2px]"
                >
                  Explore Courses
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurPrograms;
