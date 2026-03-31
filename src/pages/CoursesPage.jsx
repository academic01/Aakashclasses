import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, X, Play, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useAuth } from '../context/AuthContext';
import { Link, useSearchParams } from 'react-router-dom';

const CoursesPage = () => {
  const { courses, userEnrollments, enrollInCourse, filters, setFilters, clearFilters } = useAppContext();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  
  // URL Param logic: /courses?exam=jee
  useEffect(() => {
    const examParam = searchParams.get('exam');
    if (examParam) setFilters({ ...filters, exam: examParam.toUpperCase() });
  }, [searchParams]);

  const filteredCourses = courses.filter(course => {
    const matchExam = filters.exam ? course.exam === filters.exam : true;
    const matchClass = filters.class ? course.class === filters.class : true;
    const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFree = filters.type === 'free' ? course.free : (filters.type === 'paid' ? !course.free : true);
    return matchExam && matchClass && matchSearch && matchFree;
  });

  return (
    <div className="min-h-screen bg-white bg-graph pt-28 pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-brandNavy mb-4 section-header-underline pb-4">
              Explore <span className="text-brandNavy">Courses</span>
            </h1>
            <p className="text-textSecondary font-exo text-lg">Top-tier curriculum for Indias toughest exams.</p>
          </div>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-textMuted w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search courses..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F5F5F5] border border-[#E5E5E5] px-12 py-3 rounded-full focus:outline-none focus:border-brandNavy font-nunito"
            />
          </div>
        </div>

        {/* Filters Grid */}
        <div className="flex flex-wrap items-center gap-4 mb-10 pb-6 border-b border-[#F0F0F0]">
          <div className="flex items-center gap-2 text-brandNavy font-bold font-exo uppercase tracking-widest text-xs mr-4">
             <Filter className="w-4 h-4" /> Filter By:
          </div>
          
          {/* Exam Filter */}
          <select 
            className="bg-white border border-[#E5E5E5] px-4 py-2 rounded-lg font-exo font-bold text-xs uppercase"
            value={filters.exam}
            onChange={(e) => setFilters({...filters, exam: e.target.value})}
          >
            <option value="">All Exams</option>
            <option value="JEE">JEE</option>
            <option value="NEET">NEET</option>
            <option value="BOARDS">BOARDS</option>
            <option value="CUET">CUET</option>
          </select>

          {/* Class Filter */}
          <select 
            className="bg-white border border-[#E5E5E5] px-4 py-2 rounded-lg font-exo font-bold text-xs uppercase"
            value={filters.class}
            onChange={(e) => setFilters({...filters, class: e.target.value})}
          >
            <option value="">All Classes</option>
            <option value="12">Class 12</option>
            <option value="11">Class 11</option>
            <option value="10">Class 10</option>
          </select>

          {/* Price Filter */}
          <div className="flex bg-[#F5F5F5] rounded-lg p-1">
             <button 
               className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${filters.type === 'all' ? 'bg-white shadow-sm text-brandNavy' : 'text-textMuted'}`}
               onClick={() => setFilters({...filters, type: 'all'})}
             >All</button>
             <button 
               className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${filters.type === 'free' ? 'bg-white shadow-sm text-brandNavy' : 'text-textMuted'}`}
               onClick={() => setFilters({...filters, type: 'free'})}
             >Free</button>
             <button 
               className={`px-4 py-1.5 rounded-md text-xs font-bold uppercase transition-all ${filters.type === 'paid' ? 'bg-white shadow-sm text-brandNavy' : 'text-textMuted'}`}
               onClick={() => setFilters({...filters, type: 'paid'})}
             >Paid</button>
          </div>

          {(filters.exam || filters.class || filters.type !== 'all') && (
            <button 
              onClick={clearFilters}
              className="flex items-center gap-1 text-xs font-bold font-orbitron text-brandYellow hover:underline ml-auto"
            >
              <X className="w-4 h-4" /> CLEAR FILTERS
            </button>
          )}
        </div>

        {/* Courses Listing */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredCourses.map((course) => {
              const enrolled = userEnrollments.includes(course.id);
              
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  key={course.id}
                  className="glass-card flex flex-col overflow-hidden group h-full"
                >
                  <div className="h-48 w-full overflow-hidden relative">
                    <img src={course.image} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full border border-[#E5E5E5] text-[10px] font-orbitron font-bold text-brandNavy tracking-widest shadow-sm">
                      {course.exam}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-xs font-exo font-bold text-brandBlue uppercase">Class {course.class}</span>
                       <div className="flex flex-col items-end">
                         {course.originalPrice && <span className="text-[10px] text-textMuted line-through font-bold">₹{course.originalPrice}</span>}
                         <div className="flex gap-2 items-center">
                           {course.discount && <span className="text-[10px] bg-red-100 text-red-600 px-1 py-0.5 rounded font-bold">{course.discount} OFF</span>}
                           <span className={`text-sm font-orbitron font-bold ${course.price === 0 ? 'text-green-600' : 'text-brandNavy'}`}>
                             {course.price === 0 ? 'FREE' : `₹${course.price}`}
                           </span>
                         </div>
                       </div>
                    </div>
                    
                    <h3 className="text-xl font-orbitron font-bold text-brandNavy mb-2 h-14 line-clamp-2">
                       {course.title}
                    </h3>
                    <p className="text-sm text-textMuted font-exo font-semibold mb-2">Expert: {course.faculty}</p>
                    
                    {course.features && (
                      <ul className="text-xs text-textSecondary font-exo space-y-1 mb-4">
                        {course.features.map((f, i) => <li key={i}>• {f}</li>)}
                      </ul>
                    )}
                    
                    <div className="mt-auto flex gap-3">
                      {enrolled ? (
                        <Link to={`/dashboard`} className="btn-secondary w-full text-center flex items-center justify-center gap-2 py-2 text-xs">
                          <Play className="w-3 h-3 fill-brandNavy" /> ENROLLED — GO TO DASHBOARD
                        </Link>
                      ) : (
                        <button 
                          onClick={() => enrollInCourse(course.id)}
                          className={`btn-primary w-full flex items-center justify-center gap-2 py-2 text-xs h-10 ${course.price > 0 ? 'bg-brandNavy' : 'bg-brandNavy'}`}
                        >
                          {course.price === 0 ? <Play className="w-3 h-3 fill-white" /> : <ShoppingCart className="w-3 h-3" />}
                          {course.price === 0 ? 'START LEARNING FREE' : 'ENROLL NOW'}
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredCourses.length === 0 && (
            <div className="col-span-full py-20 text-center flex flex-col items-center">
               <Filter className="w-16 h-16 text-textMuted mb-4 opacity-20" />
               <h3 className="text-2xl font-orbitron font-bold text-textMuted mb-2 uppercase">No courses found</h3>
               <p className="text-textSecondary font-exo mb-6">Try different filters or clear search.</p>
               <button onClick={clearFilters} className="btn-secondary">Clear All Filters</button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default CoursesPage;
