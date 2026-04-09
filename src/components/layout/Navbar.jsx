import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  Menu, X, ChevronDown, ChevronRight,
  Atom, Stethoscope, Landmark, Users,
  Backpack, Award, LogOut, Bell, BookOpen
} from 'lucide-react';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';


const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

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
      { name: 'CUET', link: '/courses/cuet', badge: '✨ CUET 2026 [NEW]', icon: <Award className="w-6 h-6 text-[#7C3AED]" /> },
    ]
  },
  {
    id: 'coming_soon',
    title: 'COMING SOON',
    subtitle: 'Competitive Exam Excellence',
    courses: [
      { name: 'JEE Mains & Advanced', link: '#', icon: <Atom className="w-6 h-6 text-gray-400" />, soon: true },
      { name: 'NEET UG', link: '#', icon: <Stethoscope className="w-6 h-6 text-gray-400" />, soon: true },
    ]
  }
];

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('available');
  const [showAnnouncement, setShowAnnouncement] = useState(!localStorage.getItem('hideCuetAnnouncement'));
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
    { name: 'Class XI - XII', path: '/courses?category=senior' },
    { name: 'Class VI - X', path: '/courses?category=school' },
    { name: 'Govt. Jobs Prep', path: '/courses?category=govt' },
    { name: 'Store (Books)', path: '/store' },
    { name: 'Real Test', path: '/test-series' },
    { name: 'Offline Institute', path: '/about' },
  ];

  const activeCategoryData = courseCategories.find(c => c.id === activeCategory);

  if (location.pathname === '/goal-selection') {
    return null;
  }

  const handleCloseAnnouncement = () => {
    localStorage.setItem('hideCuetAnnouncement', 'true');
    setShowAnnouncement(false);
  };

  useEffect(() => {
    const height = (showAnnouncement ? 40 : 0) + (scrolled ? 60 : 72);
    document.documentElement.style.setProperty('--navbar-height', `${height}px`);
  }, [showAnnouncement, scrolled]);

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 flex flex-col bg-[#FFFFFF] backdrop-blur-md border-b border-[#E5E5E5] ${scrolled && !showAnnouncement ? 'shadow-md' : ''}`}
      >
        {showAnnouncement && (
          <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 h-[40px] flex items-center justify-center text-white text-[13px] w-full relative z-[60] tracking-wide font-inter shadow-md">
            <span>
              🎉 CUET 2026 New Batch Starting 1st April! Limited Seats —{' '}
              <span 
                onClick={() => navigate('/courses/cuet')} 
                className="text-[#FFE81A] font-[900] tracking-wider cursor-pointer hover:underline"
              >
                Enroll Now →
              </span>
            </span>
            <button 
              onClick={handleCloseAnnouncement}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-gray-200"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <div className={`w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center transition-all duration-300 ${scrolled ? 'h-[60px]' : 'h-[72px]'}`}>
          <div className="flex justify-between items-center w-full">

            {/* Left Section: Logo & All Courses Button */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center no-underline mr-4 py-[5px]">
                <img
                  src="/aakashlogo.png"
                  alt="Aakash Academics"
                  className={`object-contain block shrink-0 cursor-pointer transition-all duration-300 w-auto h-[45px] md:h-[55px] lg:h-[65px] ${scrolled ? 'scale-90' : 'scale-100'}`}
                />
              </Link>

              <div className="relative group/nav h-full">
                <button className={`hidden lg:flex items-center gap-2 border-2 border-[#0D2240] text-[#0D2240] bg-white group-hover/nav:bg-[#0D2240] group-hover/nav:text-white rounded-full px-3.5 text-[13px] font-bold transition-all duration-300 h-8 cursor-pointer`}>
                  All Courses <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300 group-hover/nav:rotate-180" />
                </button>

                {/* Invisible hover bridge */}
                <div className="absolute top-full left-0 w-full h-4 bg-transparent cursor-default"></div>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-[calc(100%+10px)] left-0 w-[850px] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] rounded-lg border border-brandNavy/5 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 flex overflow-hidden lg:h-[480px]">
                  {/* Left Sidebar */}
                  <div className="w-[340px] bg-white border-r border-brandNavy/5 overflow-y-auto py-2 custom-scrollbar">
                    {courseCategories.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        className={`px-6 py-4 cursor-pointer flex justify-between items-center group/item transition-colors ${activeCategory === cat.id ? 'bg-gray-50' : 'hover:bg-gray-50'}`}
                      >
                        <div className="pr-2">
                          <div className={`font-bold text-[14px] leading-tight ${cat.id === 'coming_soon' ? 'text-[#888888]' : 'text-[#0D2240]'}`}>{cat.title}</div>
                          <div className="text-[12px] text-gray-500 leading-snug mt-1">{cat.subtitle}</div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${activeCategory === cat.id ? 'text-[#0D2240]' : 'text-gray-400 group-hover/item:text-[#F5A623]'}`} />
                      </div>
                    ))}
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 bg-gray-50 p-8 overflow-y-auto custom-scrollbar">
                    <div className="grid grid-cols-2 gap-4 auto-rows-max">
                      {activeCategoryData?.courses.map(course => (
                        <Link
                          to={course.link}
                          key={course.name}
                          onClick={() => { if (!course.soon) setIsOpen(false); }}
                          className="bg-white p-4 rounded-lg border border-brandNavy/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4 relative overflow-hidden group/item"
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
                          {course.badge && (
                            <span className="bg-[#22C55E] text-white text-[10px] px-2 py-0.5 rounded-full ml-auto whitespace-nowrap hidden lg:block">
                              {course.badge}
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Navigation Links */}
            <div className="hidden lg:flex items-center gap-5 xl:gap-7">
              {topNavLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-semibold text-[#0D2240] hover:text-[#F5A623] transition-colors duration-300 font-outfit tracking-tight outline-none focus:outline-none focus:ring-0 ${scrolled ? 'text-[13px]' : 'text-[14px]'}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Right Section: Logic for Login OR User Profile */}
            <div className="hidden lg:flex items-center gap-4">
              {/* Social Channels Log In Left Side */}
              <div className="flex items-center gap-3 mr-2 px-3 py-1 border-r border-[#E5E5E5]">
                 <a href="https://youtube.com/@aakashacademics?si=8GuakKRMyoO5Ef-K" target="_blank" rel="noopener noreferrer" className="w-[36px] h-[36px] rounded-full bg-[#FF0000] text-white flex items-center justify-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-[#FF0000] fill-white" title="Subscribe on YouTube">
                    <YoutubeIcon className="w-5 h-5 text-white" />
                 </a>
              </div>
              <SignedIn>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col items-end hidden sm:flex">
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-tighter">Welcome</span>
                    <span className="text-[13px] font-bold text-gray-800 leading-none">My Account</span>
                  </div>
                  <UserButton 
                    afterSignOutUrl="/" 
                    appearance={{
                      elements: {
                        userButtonAvatarBox: "w-10 h-10 border-2 border-white shadow-sm ring-2 ring-gray-100",
                        userButtonTrigger: "focus:shadow-none focus:outline-none"
                      }
                    }}
                  />
                </div>
              </SignedIn>

              <SignedOut>
                <Link
                  to="/login"
                  className={`btn-primary bg-[#0D2240] hover:bg-[#1a3a6b] text-white rounded-full font-bold font-nunito transition-all duration-300 shadow-lg ${scrolled ? 'px-5 py-2 text-[13px]' : 'px-6 py-2 text-[14px]'} flex items-center justify-center cursor-pointer`}
                >
                  Login/Register
                </Link>
              </SignedOut>
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
