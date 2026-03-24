import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Clock, HelpCircle, Lock, Play, ChevronRight, Award, Filter, X } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const TestSeriesPage = () => {
  const { tests, filters, setFilters, clearFilters } = useAppContext();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTests = tests.filter(test => {
    const matchExam = filters.exam ? test.exam === filters.exam : true;
    const matchSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchExam && matchSearch;
  });

  const handleStartTest = (test) => {
    if (!user) {
      toast.error('Log in to start the test!');
      return;
    }
    if (test.premium) {
      toast.error('Upgrade to Aakash Prime to unlock this test!');
      return;
    }
    toast.success('Loading Test Engine...');
    // In production would navigate to /test/:id/instructions
  };

  return (
    <div className="min-h-screen bg-white bg-graph pt-28 pb-20 text-left">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-brandNavy mb-4 section-header-underline pb-4">
              Test <span className="text-brandNavy">Arena</span>
            </h1>
            <p className="text-textSecondary font-exo text-lg max-w-lg">Sharpen your edge. National-level mock tests designed by experts to replicate actual exam environments.</p>
          </div>
          
          <div className="bg-[#F5F5F5] p-3 rounded-2xl flex items-center gap-6 border border-[#E5E5E5] shadow-sm">
             <div className="text-center px-4">
                <div className="text-xs font-orbitron text-textMuted uppercase font-bold mb-1">Total Tests</div>
                <div className="text-2xl font-orbitron font-bold text-brandNavy tracking-widest">1,450+</div>
             </div>
             <div className="w-px h-10 bg-[#E5E5E5]"></div>
             <div className="text-center px-4">
                <div className="text-xs font-orbitron text-textMuted uppercase font-bold mb-1">Success Rate</div>
                <div className="text-2xl font-orbitron font-bold text-brandNavy tracking-widest">92%</div>
             </div>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-[#F0F0F0]">
          <div className="relative w-full md:w-80 mr-auto">
            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search mock tests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F5F5] border border-[#E5E5E5] px-10 py-2.5 rounded-full focus:outline-none focus:border-brandNavy font-nunito text-sm"
            />
          </div>

          <div className="flex items-center gap-4">
            <select 
              className="bg-white border border-[#E5E5E5] px-4 py-2 rounded-lg font-exo font-bold text-xs uppercase"
              value={filters.exam}
              onChange={(e) => setFilters({...filters, exam: e.target.value})}
            >
              <option value="">Filter by Exam</option>
              <option value="JEE">JEE</option>
              <option value="NEET">NEET</option>
              <option value="BOARDS">BOARDS</option>
            </select>
            {(filters.exam) && (
              <button onClick={clearFilters} className="text-xs font-bold font-orbitron text-brandYellow hover:underline uppercase flex items-center gap-1">
                <X className="w-4 h-4" /> Clear
              </button>
            )}
          </div>
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Listing (Col 8) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <AnimatePresence mode="popLayout">
              {filteredTests.map((test) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={test.id}
                  className="bg-white border border-[#E5E5E5] rounded-3xl p-6 md:p-8 flex items-center justify-between group hover:border-brandNavy transition-all hover:bg-[#F9F9F9] shadow-sm"
                >
                   <div className="flex items-center gap-6">
                      <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border shadow-sm ${test.premium ? 'bg-brandNavy text-white' : 'bg-white text-brandNavy border-[#E5E5E5]'}`}>
                         {test.premium ? <Lock className="w-8 h-8" /> : <ClipboardList className="w-8 h-8" />}
                      </div>
                      <div>
                         <div className="flex items-center gap-3 mb-1">
                            <span className="text-[10px] font-orbitron font-bold text-brandNavy bg-[#F0F0F0] px-2 py-0.5 rounded shadow-sm">{test.exam}</span>
                            {test.premium && <span className="text-[10px] font-orbitron font-bold text-white bg-brandYellow px-2 py-0.5 rounded shadow-sm uppercase tracking-widest">Premium Block</span>}
                         </div>
                         <h3 className="text-xl font-orbitron font-bold text-brandNavy uppercase mb-2">{test.title}</h3>
                         <div className="flex gap-4 text-xs font-exo font-semibold text-textMuted uppercase">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration} MIN</span>
                            <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3" /> {test.totalQuestions} QUES</span>
                         </div>
                      </div>
                   </div>
                   
                   <button 
                     onClick={() => handleStartTest(test)}
                     className={`btn-primary p-4 rounded-xl flex items-center justify-center gap-2 ${test.premium ? 'bg-textMuted border-transparent' : 'bg-brandNavy'}`}
                   >
                     {test.premium ? <Lock className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                   </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Sidebar Stats (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="bg-brandNavy p-8 rounded-[2rem] text-white shadow-xl flex flex-col items-center">
                <Award className="w-16 h-16 text-brandYellow mb-6" />
                <h3 className="font-orbitron font-bold text-2xl uppercase mb-4 text-center">Scholarship Test</h3>
                <p className="text-center font-exo text-white/70 mb-8 font-medium">Attempt the All-India Scholarship Test to win up to 100% discount on Prime Batches.</p>
                <button className="btn-secondary w-full border-white text-white bg-transparent hover:bg-white hover:text-brandNavy py-4 font-orbitron tracking-widest text-sm uppercase">APPLY NOW</button>
             </div>

             <div className="bg-white border border-[#E5E5E5] rounded-[2rem] p-8 shadow-sm">
                <h4 className="font-orbitron font-bold text-lg text-brandNavy mb-6 uppercase tracking-tight">Recent Results</h4>
                <div className="space-y-4">
                   <div className="flex justify-between items-center bg-[#F9F9F9] p-3 rounded-xl border border-[#F0F0F0]">
                      <div className="flex items-center gap-3">
                         <div className="w-8 h-8 rounded-full bg-brandNavy text-white flex items-center justify-center font-orbitron text-xs">#1</div>
                         <span className="font-exo font-bold text-brandNavy text-xs">JEE ADVANCED 2026 MOCK</span>
                      </div>
                      <span className="font-orbitron font-bold text-green-600 text-sm italic">99/100</span>
                   </div>
                </div>
             </div>
          </div>

        </div>

      </div>
    </div>
  );
};

const SearchIcon = ({ className }) => <span className={className}><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg></span>;

export default TestSeriesPage;
