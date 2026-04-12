import React, { useState } from 'react';
import { ArrowLeft, Atom, Stethoscope, Landmark, ShieldAlert, GraduationCap, Building, Trophy, Briefcase, Glasses, BookOpen, MonitorPlay, Library, X, ChevronRight, PenTool } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const GoalSelectionPage = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState(null);

  // Top quick goals data matching screenshot
  const quickGoals = [
    { id: 'upsc', name: 'UPSC', icon: <Landmark className="w-5 h-5 text-yellow-700" />, bg: 'bg-[#FFF3C2]' },
    { id: 'govt', name: 'Govt. Exams', icon: <ShieldAlert className="w-5 h-5 text-orange-600" />, bg: 'bg-[#FFE9D4]' },
  ];

  const upcomingExams = [
    { id: 'iit-jee', name: 'IIT-JEE', icon: <Atom className="w-5 h-5 text-blue-600" />, bg: 'bg-[#E0F2FE]' },
    { id: 'neet', name: 'NEET', icon: <Stethoscope className="w-5 h-5 text-green-700" />, bg: 'bg-[#DCFCE7]' },
    { id: 'cuet', name: 'CUET', icon: <BookOpen className="w-5 h-5 text-indigo-600" />, bg: 'bg-[#E0E7FF]' },
  ];

  const allExams = [
    { id: 'eng-med', name: 'Engineering & Medical Exams ( College & Job )', iconBg: 'bg-[#DFF0FF]', icon: <Atom className="w-6 h-6 text-blue-600" /> },
    { id: 'ug-pg', name: 'College Entrance Exams ( UG & PG )', iconBg: 'bg-[#E0E7FF]', icon: <GraduationCap className="w-6 h-6 text-indigo-600" /> },
    { id: 'schools', name: 'Schools, Boards & Olympiads', iconBg: 'bg-[#FEF08A]', icon: <Trophy className="w-6 h-6 text-yellow-600" /> },
    { id: 'govt-all', name: 'All Government Job Exams', iconBg: 'bg-[#FECACA]', icon: <Building className="w-6 h-6 text-red-600" /> },
    { id: 'finance', name: 'CA, CS, Banking & Finance Courses', iconBg: 'bg-[#FED7AA]', icon: <Briefcase className="w-6 h-6 text-orange-600" /> },
    { id: 'net', name: 'NET Exams & Teacher Training', iconBg: 'bg-[#D9F99D]', icon: <Glasses className="w-6 h-6 text-lime-600" /> },
  ];

  const otherOfferings = [
    { id: 'skills', name: 'Skills', iconBg: 'bg-[#E9D5FF]', icon: <MonitorPlay className="w-6 h-6 text-purple-600" /> },
    { id: 'degree', name: 'Online Degree', iconBg: 'bg-[#FEF08A]', icon: <Library className="w-6 h-6 text-yellow-700" /> },
  ];

  // Modal Content Mapping based on requested screenshots
  const modalData = {
    'iit-jee': {
      title: 'Select your Class',
      subtext: 'IIT-JEE',
      items: [
        { name: 'Class 11', icon: <Atom className="w-5 h-5 text-blue-500" /> },
        { name: 'Class 12', icon: <Atom className="w-5 h-5 text-blue-500" /> },
        { name: 'Dropper', icon: <Atom className="w-5 h-5 text-blue-500" /> },
      ]
    },
    'neet': {
      title: 'Select your Class',
      subtext: 'NEET',
      items: [
        { name: 'Class 11', icon: <Stethoscope className="w-5 h-5 text-green-600" /> },
        { name: 'Class 12', icon: <Stethoscope className="w-5 h-5 text-green-600" /> },
        { name: 'Dropper', icon: <Stethoscope className="w-5 h-5 text-green-600" /> },
      ]
    },
    'govt': {
      title: 'Select your Exam',
      subtext: 'Govt. Exams',
      items: [
        { name: 'SSC', icon: <Landmark className="w-5 h-5 text-red-400" /> },
        { name: 'Defence', icon: <ShieldAlert className="w-5 h-5 text-red-400" /> },
        { name: 'UPSC', icon: <Landmark className="w-5 h-5 text-red-400" /> },
        { name: 'State PSC', icon: <Landmark className="w-5 h-5 text-red-400" /> },
        { name: 'Banking', icon: <Building className="w-5 h-5 text-red-400" /> },
        { name: 'Judiciary', icon: <Landmark className="w-5 h-5 text-red-400" />, hasArrow: true },
        { name: 'Teaching', icon: <BookOpen className="w-5 h-5 text-red-400" /> },
        { name: 'Railway', icon: <Briefcase className="w-5 h-5 text-red-400" /> },
        { name: 'State Government Exams', icon: <Landmark className="w-5 h-5 text-red-400" /> },
        { name: 'Nursing Exams', icon: <Stethoscope className="w-5 h-5 text-red-400" /> },
      ]
    },
    'eng-med': {
      title: 'Select your Exam',
      groups: [
        {
          groupName: 'Engineering College Entrance',
          items: [
            { name: 'IIT-JEE (Coming Soon)', icon: <Atom className="w-5 h-5 text-blue-500" /> },
            { name: 'GATE', icon: <Atom className="w-5 h-5 text-blue-500" /> },
            { name: 'Polytechnic', icon: <Atom className="w-5 h-5 text-blue-500" />, hasArrow: true },
          ]
        },
        {
          groupName: 'Medical College Entrance',
          items: [
            { name: 'NEET (Coming Soon)', icon: <Stethoscope className="w-5 h-5 text-green-600" /> },
            { name: 'NEET PG', icon: <Stethoscope className="w-5 h-5 text-green-600" /> },
          ]
        },
        {
          groupName: 'Engineering Job Exams',
          items: [
            { name: 'ESE', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
            { name: 'AE/JE', icon: <Briefcase className="w-5 h-5 text-purple-500" /> },
          ]
        }
      ]
    },
    'ug-pg': {
      title: 'Select your Exam',
      groups: [
        {
          groupName: 'UG Exams',
          items: [
            { name: 'IPMAT', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
            { name: 'CLAT UG', icon: <BookOpen className="w-5 h-5 text-yellow-600" />, hasArrow: true },
            { name: 'Design - NID, UCEED, NIFT', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
            { name: 'Architecture - NATA, JEE Paper 2', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
            { name: 'CUET UG', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
          ]
        },
        {
          groupName: 'PG Exams',
          items: [
            { name: 'CAT', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
            { name: 'GMAT', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
            { name: 'IIT JAM', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
            { name: 'CUET PG', icon: <BookOpen className="w-5 h-5 text-yellow-600" /> },
          ]
        }
      ]
    },
    'cuet': {
      title: 'Select your Category',
      subtext: 'CUET',
      items: [
        { name: 'CUET UG', icon: <BookOpen className="w-5 h-5 text-indigo-600" /> },
        { name: 'CUET PG', icon: <BookOpen className="w-5 h-5 text-indigo-600" /> },
      ]
    }
  };

  const currentModal = activeModal ? modalData[activeModal] : null;

  return (
    <div className="min-h-screen bg-brandBeige text-gray-800 font-nunito flex flex-col items-center pb-20 relative">
      
      {/* Top Header */}
      <div className="w-full bg-brandBeige border-b border-brandNavy/5 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto flex items-center justify-center relative py-4 px-4 h-16">
          <button 
            onClick={() => navigate(-1)} 
            className="absolute left-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </button>
          <h1 className="text-xl font-bold font-orbitron tracking-wide text-gray-900">Select your Goal</h1>
        </div>
      </div>

      <div className="w-full max-w-4xl px-4 mt-8">
        
        {/* Quick Goals Row */}
        <div className="flex flex-wrap gap-4 mb-10">
          {quickGoals.map((goal, idx) => (
            <motion.div 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               key={idx} 
               onClick={() => activeModal !== goal.id && setActiveModal(goal.id)}
               className={`flex items-center gap-3 px-6 py-4 rounded-2xl cursor-pointer shadow-sm border border-transparent hover:border-black/5 transition-all ${goal.bg}`}
            >
              <div className="bg-white/50 p-2 rounded-full shadow-sm border border-black/5">
                {goal.icon}
              </div>
              <span className="font-bold text-[16px] text-gray-800">{goal.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Upcoming Section */}
        <div className="mb-10">
          <h2 className="text-[20px] font-bold text-gray-900 mb-6 px-1 flex items-center gap-2">
            Upcoming <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full font-black animate-pulse">LIVE SOON</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {upcomingExams.map((goal, idx) => (
              <motion.div 
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 key={idx} 
                 onClick={() => activeModal !== goal.id && setActiveModal(goal.id)}
                 className={`flex items-center justify-between px-6 py-5 rounded-[24px] cursor-pointer shadow-sm border border-brandNavy/5 transition-all ${goal.bg} relative overflow-hidden group`}
              >
                <div className="flex items-center gap-4 relative z-10">
                  <div className="bg-white p-3 rounded-2xl shadow-sm border border-black/5 group-hover:rotate-12 transition-transform">
                    {goal.icon}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-black text-[18px] text-gray-900 tracking-tight">{goal.name}</span>
                    <span className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">Launching Soon</span>
                  </div>
                </div>
                <div className="bg-white/40 p-2 rounded-full relative z-10">
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                </div>
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-10 -mt-10 blur-2xl"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* All Exams Section */}
        <h2 className="text-[22px] font-bold text-gray-900 mb-6 px-1 tracking-tight">All Exams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          {allExams.map((exam, idx) => (
            <motion.div 
               whileHover={{ scale: 1.01, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
               whileTap={{ scale: 0.99 }}
               key={idx} 
               onClick={() => activeModal !== exam.id && setActiveModal(exam.id)}
               className="bg-brandBeige border border-brandNavy/5 rounded-[14px] p-4 flex items-center gap-5 cursor-pointer hover:border-[#5A4BDA] transition-all"
            >
              <div className={`w-[52px] h-[52px] rounded-[14px] ${exam.iconBg} flex items-center justify-center shrink-0`}>
                {exam.icon}
              </div>
              <span className="font-bold text-gray-800 text-[15px] leading-snug pr-4">{exam.name}</span>
            </motion.div>
          ))}
        </div>

        {/* Other Offerings Section */}
        <h2 className="text-[22px] font-bold text-gray-900 mb-6 px-1 tracking-tight">Other Offerings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {otherOfferings.map((offer, idx) => (
            <motion.div 
               whileHover={{ scale: 1.01, boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' }}
               whileTap={{ scale: 0.99 }}
               key={idx} 
               onClick={() => navigate('/dashboard')}
               className="bg-brandBeige border border-brandNavy/5 rounded-[14px] p-4 flex items-center gap-5 cursor-pointer hover:border-[#5A4BDA] transition-all"
            >
              <div className={`w-[52px] h-[52px] rounded-[14px] ${offer.iconBg} flex items-center justify-center shrink-0`}>
                {offer.icon}
              </div>
              <span className="font-bold text-gray-800 text-[15px] leading-snug pr-4">{offer.name}</span>
            </motion.div>
          ))}
        </div>

      </div>

      {/* MODAL SYSTEM */}
      <AnimatePresence>
        {activeModal && currentModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               duration={0.2}
               className="absolute inset-0 bg-[#00000060] backdrop-blur-[2px]" 
               onClick={() => setActiveModal(null)} 
            />
            
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, y: 10 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 10 }}
               className="relative w-full max-w-3xl bg-brandBeige rounded-2xl shadow-2xl flex flex-col max-h-[85vh] overflow-hidden border border-brandNavy/5"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h3 className="text-[22px] font-bold text-gray-900">{currentModal.title}</h3>
                <button 
                   onClick={() => setActiveModal(null)}
                   className="p-2 -mr-2 text-gray-400 hover:bg-gray-100 hover:text-gray-800 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                 {currentModal.subtext && (
                    <div className="text-[13px] font-semibold text-gray-500 uppercase tracking-widest mb-4 ml-1">
                      {currentModal.subtext}
                    </div>
                 )}

                 {/* Grouped Layout */}
                 {currentModal.groups ? (
                    currentModal.groups.map((group, gIdx) => (
                       <div key={gIdx} className="mb-8 last:mb-0">
                          <div className="text-[14px] font-semibold text-gray-500 mb-3 ml-1">
                             {group.groupName}
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {group.items.map((item, idx) => (
                               <div 
                                 key={idx} 
                                 onClick={() => item.name.toLowerCase().includes('cuet') ? navigate('/courses/cuet') : navigate('/dashboard')}
                                 className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#5A4BDA] hover:bg-gray-50 transition-all font-semibold text-gray-800"
                               >
                                 <div className="flex items-center gap-3">
                                   <div className="w-6 flex justify-center shrink-0">{item.icon}</div>
                                   <span className="text-[15px]">{item.name}</span>
                                 </div>
                                 {item.hasArrow && <ChevronRight className="w-5 h-5 text-gray-400" />}
                               </div>
                            ))}
                          </div>
                       </div>
                    ))
                 ) : (
                    /* Simple Flat Layout */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                       {currentModal.items.map((item, idx) => (
                         <div 
                           key={idx} 
                           onClick={() => item.name.toLowerCase().includes('cuet') ? navigate('/courses/cuet') : navigate('/dashboard')}
                           className="flex items-center justify-between p-4 rounded-xl border border-gray-200 cursor-pointer hover:border-[#5A4BDA] hover:bg-gray-50 transition-all"
                         >
                           <div className="flex items-center gap-3">
                             <div className="hidden sm:flex w-6 justify-center shrink-0 bg-gray-50 rounded-full p-1 border border-gray-100">{item.icon}</div>
                             <span className="text-[15px] font-bold text-gray-800">{item.name}</span>
                           </div>
                           {item.hasArrow && <ChevronRight className="w-5 h-5 text-gray-400" />}
                         </div>
                       ))}
                    </div>
                 )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoalSelectionPage;
