import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Sparkles } from 'lucide-react';

const jobs = [
  { title: "Senior Mathematics Educator", dept: "Academic", location: "Remote / Delhi", type: "Full-Time", salary: "12L - 18L PA" },
  { title: "Physics Content Developer", dept: "Content", location: "Delhi", type: "Full-Time", salary: "8L - 12L PA" },
  { title: "Full Stack Developer (React/Node)", dept: "Tech", location: "Bangalore / Remote", type: "Full-Time", salary: "15L - 25L PA" },
  { title: "Academic Counselor", dept: "Sales", location: "Mumbai", type: "Full-Time", salary: "6L - 9L PA + Bonus" },
  { title: "UPSC GS Mentor", dept: "Academic", location: "Delhi", type: "Contract", salary: "Competitive" },
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-brandBeige pt-[120px]">
      <Navbar />

      {/* Hero Section */}
      <section className="px-6 md:px-20 py-20 text-center relative overflow-hidden bg-brandNavy text-brandBeige rounded-[80px] mx-6 md:mx-20 mt-10">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto"
         >
            <div className="flex items-center justify-center gap-2 mb-6 text-orange-400 font-black tracking-widest text-sm uppercase">
               <Sparkles className="w-4 h-4" /> WE'RE HIRING <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-4xl md:text-6xl font-outfit font-black mb-8 leading-tight">
               Let's Build the Future of <span className="text-orange-500 underline decoration-brandBeige/20 underline-offset-8">Education</span> Together
            </h1>
            <p className="text-gray-400 font-medium text-lg lg:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
               Join a team of passionate educators and innovators working to change how India learns.
            </p>
            <a href="#open-positions" className="btn-primary bg-orange-500 text-brandNavy px-10 py-4 rounded-full font-black text-lg hover:bg-orange-400 hover:scale-105 transition-all shadow-xl shadow-orange-500/20">
               View Open Positions
            </a>
         </motion.div>
      </section>

      {/* Why Join Us */}
      <section className="px-6 md:px-20 py-24">
         <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
               { title: "Meaningful Impact", desc: "Every line of code or lesson you create helps a student achieve their dreams." },
               { title: "Culture of Learning", desc: "We support continuous learning with budget for courses, books, and conferences." },
               { title: "Competitive Salary", desc: "We believe in rewarding talent. Get industry-leading pay and performance bonuses." }
            ].map((p, idx) => (
               <div key={idx} className="p-8 bg-lightBg2/40 rounded-3xl border border-brandNavy/5">
                  <h3 className="text-2xl font-black text-brandNavy mb-4">{p.title}</h3>
                  <p className="text-gray-600 font-medium leading-relaxed">{p.desc}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Job Openings */}
      <section id="open-positions" className="px-6 md:px-20 pb-32">
         <div className="max-w-[1200px] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-brandNavy mb-12 text-center">Open Internal Roles</h2>
            
            <div className="flex flex-col gap-4">
               {jobs.map((job, idx) => (
                  <motion.div 
                     key={idx}
                     whileHover={{ x: 10, backgroundColor: 'rgba(0,0,0,0.02)' }}
                     className="bg-brandBeige p-6 md:p-8 rounded-[32px] border border-brandNavy/5 flex flex-col md:flex-row md:items-center justify-between gap-6 transition-all group cursor-pointer"
                  >
                     <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 mb-1">
                           <span className="bg-brandNavy/5 text-brandNavy font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">{job.dept}</span>
                           <span className="bg-orange-100 text-orange-600 font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full">{job.type}</span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-outfit font-bold text-gray-900 leading-tight">{job.title}</h3>
                        <div className="flex items-center gap-6 mt-2">
                           <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                              <MapPin className="w-4 h-4" /> {job.location}
                           </div>
                           <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                              <Briefcase className="w-4 h-4" /> {job.salary}
                           </div>
                        </div>
                     </div>
                     <button className="bg-brandNavy text-brandBeige p-4 rounded-2xl group-hover:bg-orange-500 transition-colors">
                        <ArrowRight className="w-6 h-6" />
                     </button>
                  </motion.div>
               ))}
            </div>
            
            <div className="mt-16 text-center">
               <p className="text-gray-500 font-bold mb-4">Don't see a role for you?</p>
               <p className="text-gray-400 font-medium mb-8">Send your resume to <a href="mailto:careers@aakashacademics.com" className="text-brandNavy font-black underline decoration-2 underline-offset-4">careers@aakashacademics.com</a> and we'll keep you in mind!</p>
            </div>
         </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;
