import React from 'react';
import { motion } from 'framer-motion';
import { Download, FileText, ChevronRight } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';

const syllabusData = [
  {
    category: "Competitive Exams",
    items: [
      { name: "JEE Mains 2025", type: "PDF", size: "2.4 MB" },
      { name: "NEET UG 2025", type: "PDF", size: "3.1 MB" },
      { name: "CUET (UG)", type: "PDF", size: "1.8 MB" }
    ]
  },
  {
    category: "School Boards",
    items: [
      { name: "Class 10 CBSE", type: "PDF", size: "4.2 MB" },
      { name: "Class 12 CBSE (Science)", type: "PDF", size: "5.5 MB" },
      { name: "Class 12 CBSE (Commerce)", type: "PDF", size: "4.8 MB" }
    ]
  },
  {
    category: "Foundation (VI-X)",
    items: [
      { name: "Class 9 Olympiad", type: "PDF", size: "1.2 MB" },
      { name: "Class 8 Foundation", type: "PDF", size: "2.5 MB" },
      { name: "NTSE Stage 1", type: "PDF", size: "1.5 MB" }
    ]
  },
  {
    category: "Govt. Exams",
    items: [
      { name: "SSC CGL 2025", type: "PDF", size: "2.9 MB" },
      { name: "Railway NTPC", type: "PDF", size: "3.4 MB" },
      { name: "DSSSB TGT/PGT", type: "PDF", size: "2.2 MB" }
    ]
  }
];

const SyllabusPage = () => {
  return (
    <div className="min-h-screen bg-brandBeige flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <header className="mb-12 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-black font-outfit text-brandNavy mb-4"
          >
            Download <span className="text-orange-500">Syllabus</span>
          </motion.h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium">
            Stay updated with the latest exam patterns and official syllabus for all your target exams.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {syllabusData.map((section, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white rounded-[32px] p-8 shadow-sm border border-brandNavy/5 hover:shadow-xl transition-all duration-500"
            >
              <h2 className="text-xl font-black text-brandNavy mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-orange-500 rounded-full"></div>
                {section.category}
              </h2>

              <div className="space-y-4">
                {section.items.map((item, i) => (
                  <div 
                    key={i}
                    className="flex items-center justify-between p-4 rounded-2xl bg-brandBeige/50 border border-transparent hover:border-orange-500/20 hover:bg-white transition-all group cursor-pointer"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-600">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-brandNavy text-[15px]">{item.name}</h3>
                        <span className="text-[11px] text-gray-400 font-medium uppercase tracking-wider">{item.type} • {item.size}</span>
                      </div>
                    </div>
                    <button className="bg-brandNavy text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-orange-500 transition-colors">
                      Download <Download className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SyllabusPage;
