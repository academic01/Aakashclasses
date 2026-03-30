import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  Menu, X, ChevronDown, ChevronRight,
  Atom, Stethoscope, Landmark, Users,
  Backpack, Award, LogOut, Bell, BookOpen
} from 'lucide-react';

const courseCategories = [
  {
    id: 'available',
    title: 'AVAILABLE NOW',
    subtitle: 'High-Impact Board & Govt Job Prep',
    courses: [
      { name: 'Class VI - X (Boards)', link: '/courses?category=school', icon: <Backpack className="w-6 h-6 text-orange-500" /> },
      { name: 'Class XI - XII Science', link: '/courses?category=senior', icon: <Atom className="w-6 h-6 text-blue-500" /> },
      { name: 'Class XI - XII Commerce', link: '/courses?category=senior', icon: <Landmark className="w-6 h-6 text-green-500" /> },
      { name: 'Class XI - XII Humanities', link: '/courses?category=senior', icon: <BookOpen className="w-6 h-6 text-indigo-500" /> },
      { name: 'Govt. Jobs Prep', link: '/courses?category=govt', icon: <Landmark className="w-6 h-6 text-teal-500" /> },
      { name: 'Railway Exams', link: '/courses?category=govt', icon: <Users className="w-6 h-6 text-blue-600" /> },
      { name: 'DSSSB', link: '/courses?category=govt', icon: <Award className="w-6 h-6 text-yellow-600" /> },
    ]
  },
  {
    id: 'coming_soon',
    title: 'COMING SOON',
    subtitle: 'Competitive Exam Excellence',
    courses: [
      { name: 'JEE Mains & Advanced', link: '#', icon: <Atom className="w-6 h-6 text-gray-400" />, soon: true },
      { name: 'NEET UG', link: '#', icon: <Stethoscope className="w-6 h-6 text-gray-400" />, soon: true },
      { name: 'CUET', link: '#', icon: <Award className="w-6 h-6 text-gray-400" />, soon: true },
    ]
  }
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('available');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topNavLinks = [
    { name: 'Vidyapeeth', path: '/vidyapeeth' },
    { name: 'Class VI - X', path: '/courses?category=school' },
    { name: 'Class XI - XII', path: '/courses?category=senior' },
    { name: 'Govt. Jobs Prep', path: '/courses?category=govt' },
    { name: 'Store (Books)', path: '/store' },
    { name: 'Real Test', path: '/test-series' },
  ];

  const activeCategoryData = courseCategories.find(c => c.id === activeCategory);

  if (location.pathname === '/goal-selection') {
    return null;
  }

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 bg-brandBeige/95 backdrop-blur-md ${scrolled ? 'shadow-md py-2' : 'py-5'}`}
      >

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-1">
          <div className="flex justify-between items-center pb-2">

            {/* Left Section: Logo & All Courses Button */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center">
                <img
                  src="/aakashlogo.png"
                  alt="Aakash Academics"
                  className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-9' : 'h-14'}`}
                />
              </Link>

              <div className="relative group/nav h-full">
                <button className={`hidden lg:flex items-center gap-2 border-2 border-[#0D2240] text-[#0D2240] bg-brandBeige group-hover/nav:bg-[#0D2240] group-hover/nav:text-white rounded-full px-4 text-[14px] font-bold transition-all duration-300 h-9 cursor-pointer`}>
                  All Courses <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180" />
                </button>

                {/* Invisible hover bridge */}
                <div className="absolute top-full left-0 w-full h-4 bg-transparent cursor-default"></div>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-[calc(100%+10px)] left-0 w-[850px] bg-brandBeige shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-lg border border-brandNavy/5 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 flex overflow-hidden lg:h-[480px]">
                  {/* Left Sidebar */}
                  <div className="w-[340px] bg-brandBeige border-r border-brandNavy/5 overflow-y-auto py-2 custom-scrollbar">
                    {courseCategories.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        className={`px-6 py-4 cursor-pointer flex justify-between items-center group/item transition-colors ${activeCategory === cat.id ? 'bg-lightBg2' : 'hover:bg-lightBg2/50'}`}
                      >
                        <div className="pr-2">
                          <div className={`font-bold text-[14px] leading-tight ${cat.id === 'coming_soon' ? 'text-[#888888]' : 'text-gray-900'}`}>{cat.title}</div>
                          <div className="text-[12px] text-gray-500 leading-snug mt-1">{cat.subtitle}</div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${activeCategory === cat.id ? 'text-gray-800' : 'text-gray-400 group-hover/item:text-gray-600'}`} />
                      </div>
                    ))}
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 bg-lightBg3/30 p-8 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4 auto-rows-max">
                      {activeCategoryData?.courses.map(course => (
                        <Link 
                          to={course.link}
                          key={course.name} 
                          onClick={() => { if(!course.soon) setIsOpen(false); }}
                          className="bg-brandBeige p-4 rounded-lg border border-brandNavy/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4 relative overflow-hidden group/item"
                        >
                          {course.soon && (
                            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center -rotate-12 z-10">
                              <span className="text-[10px] font-black text-[#F5A623] px-2 py-0.5 border border-[#F5A623] rounded-sm bg-white shadow-sm">LAUNCHING SOON</span>
                            </div>
                          )}
                          <div className="w-10 h-10 flex items-center justify-center shrink-0">
                            {course.icon}
                          </div>
                          <span className={`font-bold text-[14px] ${course.soon ? 'text-[#888888]' : 'text-gray-800'}`}>{course.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-bold text-[#444444] hover:text-[#0D2240] transition-all duration-300 font-nunito ${scrolled ? 'text-xs' : 'text-[14px]'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Section: Logic for Login OR User Profile */}
            <div className="hidden lg:flex items-center gap-4">
              {user ? (
                <div className="flex items-center gap-4">
                  <div className="flex flex-col items-end">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-tighter">My Account</span>
                    <span className="text-[15px] font-bold text-gray-800 leading-none">{user.displayName || 'Student'}</span>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#0D2240] text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm overflow-hidden ring-2 ring-gray-100">
                    {user.displayName?.[0]?.toUpperCase() || 'S'}
                  </div>
                  <button 
                    onClick={() => logout()}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className={`btn-primary bg-[#0D2240] hover:bg-[#1a3a6b] text-white rounded-full font-bold font-nunito transition-all duration-300 shadow-lg ${scrolled ? 'px-6 py-2.5 text-sm' : 'px-8 py-2.5 text-[15px]'} flex items-center justify-center cursor-pointer`}
                >
                  Login/Register
                </Link>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-gray-800 hover:text-black" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
