import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ClipboardList, Clock, HelpCircle, Lock, Play, ChevronRight, Award, Filter, X, Search } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const TestSeriesPage = () => {
  const { tests } = useAppContext();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [notifyPopup, setNotifyPopup] = useState({ isOpen: false, exam: '' });

  const tabs = [
    { id: 'all', label: 'All Tests' },
    { id: 'school', label: 'School VI-X' },
    { id: 'senior', label: 'Boards XI-XII' },
    { id: 'govt', label: 'Govt Jobs' },
    { id: 'cuet', label: 'CUET 🆕', badge: true },
    { id: 'coming_soon', label: 'Coming Soon' }
  ];

  const filteredTests = tests.filter(test => {
    let matchCategory = true;
    if (activeCategory === 'coming_soon') {
      matchCategory = test.locked;
    } else if (activeCategory !== 'all') {
      matchCategory = test.category === activeCategory;
    }
    const matchSearch = test.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchCategory && matchSearch;
  }).sort((a, b) => {
    const getPriority = (test) => {
      if (test.status === 'coming_soon' || test.locked === true || (test.exam || '').toUpperCase().includes('SOON')) return 4;
      if (test.exam === 'CUET') return 1;
      const coreTags = ['BOARDS', 'SCHOOL', 'GOVT JOBS', 'SENIOR', 'COMMERCE'];
      if (coreTags.includes(test.exam)) return 2;
      return 3;
    };
    return getPriority(a) - getPriority(b);
  });

  const handleStartTest = (test) => {
    if (test.locked) {
      setNotifyPopup({ isOpen: true, exam: test.exam });
      return;
    }
    if (!user) {
      toast.error('Log in to start the test!');
      return;
    }
    toast.success('Loading Test Engine...');
    // In production would navigate to /test/:id/instructions
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] pt-28 pb-20 text-left">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-[#0D2240] mb-4 section-header-underline pb-4">
              Test <span className="text-[#0D2240]">Arena</span>
            </h1>
            <p className="text-gray-500 font-exo text-lg max-w-lg">Sharpen your edge. National-level mock tests designed by experts to replicate actual exam environments.</p>
          </div>
          
          <div className="bg-[#F8F8F8] p-4 rounded-2xl flex flex-wrap md:flex-nowrap items-center gap-4 md:gap-8 border border-[#E5E5E5] shadow-sm justify-center flex-1 max-w-3xl">
             <div className="text-center px-2">
                <div className="text-[10px] md:text-xs font-orbitron text-gray-500 uppercase font-bold mb-1">Total Tests</div>
                <div className="text-xl md:text-2xl font-orbitron font-bold text-[#0D2240] tracking-widest">150+</div>
             </div>
             <div className="w-px h-10 bg-[#E5E5E5] hidden md:block"></div>
             <div className="text-center px-2">
                <div className="text-[10px] md:text-xs font-orbitron text-gray-500 uppercase font-bold mb-1">Success Rate</div>
                <div className="text-xl md:text-2xl font-orbitron font-bold text-[#0D2240] tracking-widest">94%</div>
             </div>
             <div className="w-px h-10 bg-[#E5E5E5] hidden md:block"></div>
             <div className="text-center px-2">
                <div className="text-[10px] md:text-xs font-orbitron text-gray-500 uppercase font-bold mb-1">Tests Attempted</div>
                <div className="text-xl md:text-2xl font-orbitron font-bold text-[#0D2240] tracking-widest">25,000+</div>
             </div>
             <div className="w-px h-10 bg-[#E5E5E5] hidden md:block"></div>
             <div className="text-center px-2">
                <div className="text-[10px] md:text-xs font-orbitron text-[#22C55E] uppercase font-bold mb-1">To Get Started</div>
                <div className="text-xl md:text-2xl font-orbitron font-bold text-[#22C55E] tracking-widest">FREE</div>
             </div>
          </div>
        </div>

        {/* Global Toolbar */}
        <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search mock tests..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8F8F8] border border-[#E5E5E5] px-10 py-2.5 rounded-full focus:outline-none focus:border-[#F5A623] font-nunito text-sm"
            />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto ml-auto">
            <select 
              className="bg-white border border-[#E5E5E5] px-4 py-2.5 rounded-lg font-exo font-bold text-xs uppercase w-full md:w-auto text-[#0D2240]"
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
            >
              <option value="all">All Tests</option>
              <optgroup label="─────────────────">
                <option value="school">📚 School (VI-X)</option>
                <option value="senior">🎓 Boards (XI-XII)</option>
                <option value="govt">🏛️ Govt. Jobs</option>
                <option value="cuet">💜 CUET 2026 🆕</option>
              </optgroup>
              <optgroup label="─────────────────">
                <option value="jee">🔜 JEE (Coming Soon)</option>
                <option value="neet">🔜 NEET (Coming Soon)</option>
              </optgroup>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-10 pb-6 border-b border-[#F0F0F0]">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-5 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2 border ${
                activeCategory === tab.id 
                  ? (tab.id === 'cuet' ? 'bg-[#7C3AED] text-white border-transparent' : 'bg-[#0D2240] text-white border-transparent')
                  : 'bg-[#F8F8F8] text-[#444444] border-[#E5E5E5] hover:bg-[#EAEAEA]'
              }`}
            >
              {tab.label}
              {tab.badge && activeCategory !== tab.id && <span className="w-2 h-2 rounded-full bg-[#22C55E]"></span>}
            </button>
          ))}
        </div>

        {/* Grid Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Main Listing (Col 8) */}
          <div className="lg:col-span-8 flex flex-col gap-5">
            <AnimatePresence mode="popLayout">
              {activeCategory === 'coming_soon' && (
                 <div className="bg-[#EEF2FF] border border-[#C7D2FE] rounded-[12px] text-[#0D2240] p-[16px] mb-[20px] shadow-sm text-center">
                   🚀 These batches are launching mid-2026!<br />
                   Click <strong>Notify Me</strong> to get alerted when they go live.
                 </div>
              )}
              {filteredTests.map((test, index) => {
                const isFirstLocked = test.locked && (index === 0 || !filteredTests[index - 1].locked);
                const showDivider = (activeCategory === 'all' || activeCategory === '') && isFirstLocked;

                return (
                  <React.Fragment key={test.id}>
                    {showDivider && (
                      <div className="bg-[#F8F8F8] text-[#888888] italic border-t border-b border-dashed border-[#DDDDDD] p-[12px] text-center text-[13px] my-2">
                         🔜 Coming Soon Tests Below
                      </div>
                    )}
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={test.id}
                  className={`border rounded-[16px] p-[20px] md:px-[24px] flex flex-col md:flex-row items-start md:items-center justify-between group transition-all duration-300 ${
                    test.locked 
                      ? 'bg-[#F8F8F8] border-[#E5E5E5] opacity-70' 
                      : 'bg-[#FFFFFF] border-[#E5E5E5] shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:border-[#F5A623] hover:shadow-[0_4px_20px_rgba(245,166,35,0.15)] hover:-translate-y-[2px]'
                  }`}
                >
                   <div className="flex items-center gap-4 w-full md:w-auto">
                      <div className={`w-[52px] h-[52px] rounded-[12px] flex items-center justify-center shrink-0 ${test.locked ? 'bg-[#EEEEEE] text-[#AAAAAA]' : 'bg-[#EEF2FF] text-[#0D2240]'}`}>
                         {test.locked ? <Lock className="w-6 h-6" /> : <ClipboardList className="w-6 h-6" />}
                      </div>
                      <div>
                         <div className="flex flex-wrap items-center gap-2 mb-1">
                            <span 
                              className="text-[11px] font-orbitron font-bold text-white px-[10px] py-[3px] rounded-[6px] uppercase shadow-sm"
                              style={{ background: test.locked ? '#CCCCCC' : (test.tagBg || '#0D2240') }}
                            >
                              {test.exam}{test.locked ? ' • Soon' : ''}
                            </span>
                            {test.locked && (
                               <span className="text-[11px] font-orbitron font-bold text-white bg-[#888888] px-[10px] py-[3px] rounded-[6px] shadow-sm tracking-widest">
                                  🔜 LAUNCHING SOON
                               </span>
                            )}
                            {test.badge && (
                               <span className="text-[11px] font-orbitron font-bold text-white px-[10px] py-[3px] rounded-[6px] shadow-sm tracking-widest" style={{ background: test.badgeBg }}>
                                  {test.badge}
                               </span>
                            )}
                         </div>
                         <h3 className="text-lg font-orbitron font-bold text-[#0D2240] uppercase mb-1 leading-tight mt-1">{test.title}</h3>
                         <div className="flex gap-4 text-xs font-exo font-semibold text-gray-400 uppercase">
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.duration} MIN</span>
                            <span className="flex items-center gap-1"><HelpCircle className="w-3 h-3" /> {test.totalQuestions} QUES</span>
                            <span className="flex items-center gap-1 font-bold text-[#22C55E]">FREE</span>
                         </div>
                      </div>
                   </div>
                   
                   <button 
                     onClick={() => handleStartTest(test)}
                     className={`w-full md:w-[44px] h-[44px] rounded-full flex items-center justify-center shrink-0 mt-4 md:mt-0 transition-colors ${
                       test.locked 
                         ? 'bg-[#CCCCCC] text-white cursor-pointer hover:bg-[#888888]' 
                         : 'bg-[#0D2240] text-white hover:bg-[#F5A623] hover:text-[#0D2240] cursor-pointer'
                     } ${test.badge ? 'shadow-[0_0_15px_rgba(34,197,94,0.3)] border border-[#22C55E]' : ''}`}
                   >
                     {test.locked ? (
                       <div className="flex items-center justify-center gap-2"><Lock className="w-4 h-4" /><span className="md:hidden font-bold font-exo text-sm">NOTIFY ME</span></div>
                     ) : (
                       <div className="flex items-center justify-center gap-2"><Play className="w-4 h-4 fill-current" /><span className="md:hidden font-bold font-exo text-sm border-none ml-1">START TEST</span></div>
                     )}
                   </button>
                </motion.div>
                </React.Fragment>
              )})}
            </AnimatePresence>
            
            {filteredTests.length === 0 && (
              <div className="text-center py-20 bg-[#F9F9F9] rounded-2xl border border-[#E5E5E5]">
                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-bold font-orbitron text-gray-400">NO TESTS FOUND</h3>
              </div>
            )}
          </div>

          {/* Sidebar Stats (Col 4) */}
          <div className="lg:col-span-4 flex flex-col gap-6">
             <div className="bg-[#0D2240] p-8 rounded-[24px] text-white shadow-xl flex flex-col items-center border border-[#1a3a6b]">
                <div className="text-4xl mb-4">🏆</div>
                <h3 className="font-orbitron font-bold text-2xl mb-3 text-center">All-India Scholarship Test</h3>
                <p className="text-center font-exo text-white/80 mb-6 text-sm">Attempt our free scholarship test and win up to 100% fee waiver on all batches!</p>
                
                <div className="bg-white/10 rounded-xl p-4 w-full mb-6 space-y-2 text-sm font-exo">
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">📅 Day</span>
                    <span className="font-bold">Every Sunday</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">⏰ Duration</span>
                    <span className="font-bold">60 Minutes</span>
                  </div>
                  <div className="flex justify-between border-b border-white/10 pb-2">
                    <span className="text-white/60">📝 Questions</span>
                    <span className="font-bold">50</span>
                  </div>
                  <div className="flex justify-between mt-2 pt-1 border-none">
                    <span className="text-white/60">🎁 Prize</span>
                    <span className="font-bold text-[#22C55E]">Up to 100% Waiver</span>
                  </div>
                </div>

                <Link to="/scholarship-test" className="w-full bg-[#F5A623] text-[#0D2240] rounded-[50px] font-bold text-center py-3 hover:bg-[#e6951a] shadow-[0_4px_15px_rgba(245,166,35,0.3)] transition-all text-sm font-inter">
                  Attempt Now →
                </Link>
             </div>

             <div className="bg-white border border-[#E5E5E5] rounded-[24px] p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl border-none">📊</span>
                  <h4 className="font-orbitron font-bold text-lg text-[#0D2240]">Your Test Stats</h4>
                </div>
                
                {user ? (
                  <div className="space-y-4">
                     <div className="flex justify-between items-center bg-[#F9F9F9] p-3 rounded-xl border border-[#F0F0F0]">
                        <span className="font-exo font-bold text-[#444] text-sm">Tests Attempted</span>
                        <span className="font-orbitron font-bold text-[#0D2240]">0</span>
                     </div>
                     <div className="flex justify-between items-center bg-[#F9F9F9] p-3 rounded-xl border border-[#F0F0F0]">
                        <span className="font-exo font-bold text-[#444] text-sm">Best Score</span>
                        <span className="font-orbitron font-bold text-[#0D2240]">--</span>
                     </div>
                     <div className="flex justify-between items-center bg-[#F9F9F9] p-3 rounded-xl border border-[#F0F0F0]">
                        <span className="font-exo font-bold text-[#444] text-sm">All India Rank</span>
                        <span className="font-orbitron font-bold text-[#0D2240]">--</span>
                     </div>
                  </div>
                ) : (
                  <div className="text-center py-6 bg-[#F9F9F9] rounded-xl border border-[#F0F0F0]">
                    <p className="text-sm text-gray-500 font-exo mb-4 border-none">Login to see your stats</p>
                    <Link to="/login" className="px-6 py-2 bg-[#0D2240] text-white rounded-full text-xs font-bold shadow-sm inline-block mx-auto hover:bg-[#1a3a6b]">
                      Login Now
                    </Link>
                  </div>
                )}
             </div>
          </div>

        </div>

      </div>

      {notifyPopup.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm text-center shadow-2xl relative">
            <h3 className="text-xl font-bold font-orbitron mb-2 text-[#0D2240]">{notifyPopup.exam.toUpperCase()} Test Series</h3>
            <p className="text-gray-600 mb-6 font-exo">
              {notifyPopup.exam.toUpperCase()} test series launching mid-2026! Click Notify Me to get alerted.
            </p>
            <button 
              onClick={() => {
                toast.success("You will be notified!");
                setNotifyPopup({ isOpen: false, exam: '' });
              }}
              className="w-full bg-[#F5A623] text-[#0D2240] py-3 rounded-full font-bold font-inter flex justify-center items-center gap-2 hover:bg-[#e69b22] transition-colors border-none cursor-pointer"
            >
              <span className="border-none">🔔</span> Notify Me
            </button>
            <button 
              onClick={() => setNotifyPopup({ isOpen: false, exam: '' })}
              className="mt-4 text-gray-400 hover:text-gray-600 font-exo text-sm border-none bg-transparent cursor-pointer"
            >
              Maybe later
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestSeriesPage;
