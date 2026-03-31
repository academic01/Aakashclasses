import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, Clock, BookOpen, Users, Target, IndianRupee, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const CuetPage = () => {
  return (
    <div className="bg-lightBg1 min-h-screen pt-12 pb-24">
      {/* Hero Section */}
      <section className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
        <div className="text-center mb-12">
           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-block bg-[#22C55E]/10 border border-[#22C55E]/20 text-[#22C55E] px-4 py-1.5 rounded-full font-bold text-sm mb-6 flex items-center justify-center mx-auto gap-2">
             <Sparkles className="w-4 h-4" /> New Batch: 1st April 2026
           </motion.div>
           <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-brandNavy font-orbitron mb-6">CUET 2026 Complete Preparation</h1>
           <p className="text-xl text-textSecondary max-w-2xl mx-auto font-inter">Crack Central Universities Entrance Test with Expert Guidance.</p>
        </div>

        {/* Info Grid */}
        <div className="bg-[#0D2240] rounded-[32px] p-8 md:p-12 shadow-2xl relative overflow-hidden text-left">
           {/* Abstract pattern */}
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#F5A623]/5 rounded-full blur-[80px] -mr-40 -mt-40 pointer-events-none"></div>
           
           <div className="grid grid-cols-2 md:grid-cols-3 gap-8 relative z-10 text-white">
              <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-xl text-[#F5A623]"><Calendar className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Batch Start</h4>
                    <p className="text-xl font-bold">1st April 2026</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-xl text-[#F5A623]"><Clock className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Duration</h4>
                    <p className="text-xl font-bold">6 Months</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-xl text-[#F5A623]"><Target className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Target</h4>
                    <p className="text-xl font-bold">CUET 2026</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-xl text-[#F5A623]"><BookOpen className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Subjects</h4>
                    <p className="text-xl font-bold">All Domains</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-white/10 p-3 rounded-xl text-[#F5A623]"><Users className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Faculty</h4>
                    <p className="text-xl font-bold">Aakash Experts</p>
                 </div>
              </div>
              <div className="flex items-start gap-4">
                 <div className="bg-[#F5A623]/20 p-3 rounded-xl text-[#F5A623]"><IndianRupee className="w-6 h-6" /></div>
                 <div>
                    <h4 className="text-white/60 text-sm font-bold uppercase tracking-wider mb-1">Fee</h4>
                    <p className="text-xl font-bold text-[#F5A623]">₹2,999 only <span className="text-sm line-through text-white/40 ml-2">₹8,999</span></p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="bg-white py-16">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 text-left">
           <h2 className="text-3xl font-black text-center text-brandNavy font-orbitron mb-12">Comprehensive Syllabus Coverage</h2>
           <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-[24px] bg-lightBg1 border border-brandNavy/5">
                 <h3 className="text-xl font-bold text-brandNavy mb-6 flex items-center gap-3"><BookOpen className="text-brandBlue w-5 h-5" /> Domain Subjects</h3>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> Science (PCM/PCB)</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> Commerce (Acc/Eco/BST)</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> Humanities (Hist/Pol Sci/Geo)</li>
                 </ul>
              </div>
              <div className="p-8 rounded-[24px] bg-lightBg1 border border-brandNavy/5">
                 <h3 className="text-xl font-bold text-brandNavy mb-6 flex items-center gap-3"><Target className="text-brandBlue w-5 h-5" /> General Test</h3>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> Quantitative Aptitude</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> Logical Reasoning</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> General Knowledge & CA</li>
                 </ul>
              </div>
              <div className="p-8 rounded-[24px] bg-lightBg1 border border-brandNavy/5">
                 <h3 className="text-xl font-bold text-brandNavy mb-6 flex items-center gap-3"><BookOpen className="text-brandBlue w-5 h-5" /> Language Section</h3>
                 <ul className="space-y-4">
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> English Language Comprehension</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> Vocabulary Building</li>
                    <li className="flex items-center gap-3"><CheckCircle2 className="w-5 h-5 text-green-500 fill-green-500/10" /> Grammar & Usage</li>
                 </ul>
              </div>
           </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
         <Link to="/checkout/cuet" className="inline-flex items-center justify-center bg-[#F5A623] hover:bg-[#ffaa2b] text-[#0D2240] font-black text-xl px-12 py-5 rounded-full shadow-[0_20px_40px_rgba(245,166,35,0.3)] hover:scale-105 transition-all">
            Secure Your Seat — Batch Starts April 1!
         </Link>
      </section>
    </div>
  );
};

export default CuetPage;
