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
  
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      setFilters(prev => ({ ...prev, category: categoryParam.toLowerCase() }));
    } else {
      setFilters(prev => ({ ...prev, category: '' }));
    }
  }, [searchParams, setFilters]);

  const filteredCourses = courses.filter(course => {
    const matchCategory = filters.category ? course.category === filters.category : true;
    
    let matchClass = true;
    if (filters.class) {
      if (filters.class === 'govt_exams') {
        matchClass = course.category === 'govt';
      } else {
        matchClass = course.class === filters.class;
      }
    }

    const matchSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchFree = filters.type === 'free' ? course.free : (filters.type === 'paid' ? !course.free : true);
    return matchCategory && matchClass && matchSearch && matchFree;
  });

  const getPageInfo = () => {
    switch (filters.category) {
      case 'senior': return { title: 'Class XI - XII Courses', subtitle: 'Board Exam Excellence — Science, Commerce & Humanities' };
      case 'school': return { title: 'Class VI - X Courses', subtitle: 'Strong Foundation for Every Subject' };
      case 'govt': return { title: 'Government Job Courses', subtitle: 'SSC, Railway, DSSSB & More — Crack Every Exam' };
      default: return { title: 'Explore Courses', subtitle: "Top-tier curriculum for India's toughest exams" };
    }
  };
  const pageInfo = getPageInfo();

  return (
    <div className="min-h-screen bg-white bg-graph pb-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <h1 className="text-4xl md:text-5xl font-orbitron font-bold text-brandNavy mb-4 section-header-underline pb-4">
              {pageInfo.title.split(' ').map((word, i, arr) => 
                i === arr.length - 1 ? <span key={i} className="text-brandYellow">{word}</span> : word + ' '
              )}
            </h1>
            <p className="text-textSecondary font-exo text-lg">{pageInfo.subtitle}</p>
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
          
          {/* Category Filter */}
          <select 
            className="bg-white border border-[#E5E5E5] px-4 py-2 rounded-lg font-exo font-bold text-xs uppercase"
            value={filters.category || ''}
            onChange={(e) => {
              setFilters({...filters, category: e.target.value});
              setSearchParams(e.target.value ? { category: e.target.value } : {});
            }}
          >
            <option value="">All Exams</option>
            <optgroup label="─────────────────">
              <option value="school">📚 School (VI-X)</option>
              <option value="senior">🎓 Senior (XI-XII)</option>
              <option value="govt">🏛️ Govt. Jobs</option>
            </optgroup>
            <optgroup label="─────────────────">
              <option value="jee">🔜 JEE (Coming Soon)</option>
              <option value="neet">🔜 NEET (Coming Soon)</option>
              <option value="cuet">🔜 CUET (New Batch Soon)</option>
            </optgroup>
          </select>

          {/* Class Filter */}
          <select 
            className="bg-white border border-[#E5E5E5] px-4 py-2 rounded-lg font-exo font-bold text-xs uppercase"
            value={filters.class || ''}
            onChange={(e) => setFilters({...filters, class: e.target.value})}
          >
            <option value="">All Classes</option>
            <optgroup label="──────────────">
              <option value="6, 7, 8">Class 6, Class 7, Class 8</option>
              <option value="9, 10">Class 9, Class 10</option>
            </optgroup>
            <optgroup label="──────────────">
              <option value="11, 12">Class 11, Class 12</option>
            </optgroup>
            <optgroup label="──────────────">
              <option value="govt_exams">All Govt Exams</option>
            </optgroup>
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
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={async () => {
                            try {
                              const result = await enrollInCourse(course.id);
                              if (result && result.paymentRequired) {
                                navigate(`/checkout?courseId=${course.id}&price=${result.price}&title=${encodeURIComponent(course.title)}`);
                              }
                            } catch (error) {
                              console.error("Enrollment failed:", error);
                              toast.error("Process failed. Please try again.");
                            }
                          }}
                          className={`btn-primary w-full flex items-center justify-center gap-2 py-2 text-xs h-10 ${course.price > 0 ? 'bg-brandNavy' : 'bg-brandNavy'}`}
                        >
                          {course.price === 0 ? <Play className="w-3 h-3 fill-white" /> : <ShoppingCart className="w-3 h-3" />}
                          {course.price === 0 ? 'START LEARNING FREE' : 'ENROLL NOW'}
                        </motion.button>
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
