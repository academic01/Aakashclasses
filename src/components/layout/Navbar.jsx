import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import {
  Menu, X, ChevronDown, ChevronRight,
  Atom, Stethoscope, User, Lightbulb, Code2, Trophy, Landmark, Users,
  GraduationCap, Building2, Backpack, PencilRuler, Map, Award, BookOpen,
  Scale, Library, Train, ClipboardList, FileBarChart, ListTodo, Hospital, Shield,
  Target, Cog, BookText, Gavel, CheckCircle, Pill, PenTool, LogOut
} from 'lucide-react';

const courseCategories = [
  {
    id: 'competitive',
    title: 'Competitive Exams',
    subtitle: 'IIT JEE, NEET, ESE, GATE, AE/JE, Olympiad',
    courses: [
      { name: 'IIT JEE', icon: <Atom className="w-6 h-6 text-orange-500" /> },
      { name: 'NEET', icon: <Stethoscope className="w-6 h-6 text-red-500" /> },
      { name: 'ESE', icon: <User className="w-6 h-6 text-blue-500" /> },
      { name: 'GATE', icon: <Lightbulb className="w-6 h-6 text-yellow-500" /> },
      { name: 'AE/JE', icon: <Code2 className="w-6 h-6 text-indigo-500" /> },
      { name: 'Olympiad', icon: <Trophy className="w-6 h-6 text-yellow-600" /> },
    ]
  },
  {
    id: 'ias',
    title: 'Only IAS',
    subtitle: 'UPSC, State PSC',
    courses: [
      { name: 'UPSC', icon: <Users className="w-6 h-6 text-blue-600" /> },
      { name: 'State PSC', icon: <Landmark className="w-6 h-6 text-orange-700" /> },
    ]
  },
  {
    id: 'school_prep',
    title: 'School Preparation',
    subtitle: 'Foundation (Class 6-10), CuriousJr (3rd - 8th)',
    courses: [
      { name: 'Foundation (Class 6-10)', icon: <Backpack className="w-6 h-6 text-orange-400" /> },
      { name: 'CuriousJr (3rd - 8th)', icon: <PencilRuler className="w-6 h-6 text-pink-500" /> },
    ]
  },
  {
    id: 'school_boards',
    title: 'School Boards',
    subtitle: 'CBSE Arts, CBSE Science, CBSE Commerce, ICSE, UP Board, Rajasthan...',
    courses: [
      { name: 'CBSE Arts', icon: <Award className="w-6 h-6 text-green-500" /> },
      { name: 'CBSE Science', icon: <Atom className="w-6 h-6 text-green-600" /> },
      { name: 'CBSE Commerce', icon: <Award className="w-6 h-6 text-green-500" /> },
      { name: 'ICSE', icon: <Award className="w-6 h-6 text-green-500" /> },
      { name: 'UP Board', icon: <Map className="w-6 h-6 text-purple-400" /> },
      { name: 'Rajasthan Board', icon: <Map className="w-6 h-6 text-yellow-400" /> },
      { name: 'Bihar Board', icon: <Map className="w-6 h-6 text-yellow-500" /> },
      { name: 'MP Board', icon: <Map className="w-6 h-6 text-orange-300" /> },
      { name: 'Maharashtra Board', icon: <Map className="w-6 h-6 text-indigo-400" /> },
      { name: 'JKBose Board', icon: <Map className="w-6 h-6 text-blue-300" /> },
      { name: 'JAC Board', icon: <Map className="w-6 h-6 text-pink-400" /> },
      { name: 'Odisha Board', icon: <Map className="w-6 h-6 text-teal-400" /> },
    ]
  },
  {
    id: 'govt_exams',
    title: 'Govt Exam',
    subtitle: 'SSC, Banking, Judiciary, Teaching, Railway, UP Exams, JAIIB & CAIIB...',
    courses: [
      { name: 'SSC', icon: <Landmark className="w-6 h-6 text-teal-500" /> },
      { name: 'Banking', icon: <Building2 className="w-6 h-6 text-blue-400" /> },
      { name: 'Judiciary', icon: <Scale className="w-6 h-6 text-orange-600" /> },
      { name: 'Teaching', icon: <Library className="w-6 h-6 text-red-400" /> },
      { name: 'Railway', icon: <Train className="w-6 h-6 text-blue-500" /> },
      { name: 'UP Exams', icon: <ClipboardList className="w-6 h-6 text-orange-400" /> },
      { name: 'JAIIB & CAIIB', icon: <FileBarChart className="w-6 h-6 text-cyan-500" /> },
      { name: 'BIHAR EXAMS', icon: <ListTodo className="w-6 h-6 text-yellow-600" /> },
      { name: 'Nursing Exams', icon: <Hospital className="w-6 h-6 text-red-500" /> },
      { name: 'WB Exams', icon: <Map className="w-6 h-6 text-green-400" /> },
      { name: 'Defence', icon: <Shield className="w-6 h-6 text-sky-500" /> },
    ]
  },
  {
    id: 'ug_pg',
    title: 'UG & PG Entrance Exams',
    subtitle: 'MBA, IPMAT, IIT JAM, CSIR NET, LAW, CUET, UGC NET...',
    courses: [
      { name: 'MBA', icon: <Target className="w-6 h-6 text-orange-500" /> },
      { name: 'IPMAT', icon: <GraduationCap className="w-6 h-6 text-indigo-700" /> },
      { name: 'IIT JAM', icon: <Cog className="w-6 h-6 text-yellow-600" /> },
      { name: 'CSIR NET', icon: <BookText className="w-6 h-6 text-blue-400" /> },
      { name: 'LAW', icon: <Gavel className="w-6 h-6 text-red-800" /> },
      { name: 'CUET', icon: <Award className="w-6 h-6 text-yellow-500" /> },
      { name: 'UGC NET', icon: <Library className="w-6 h-6 text-gray-600" /> },
      { name: 'GMAT', icon: <User className="w-6 h-6 text-indigo-500" /> },
      { name: 'Design & Architecture', icon: <PenTool className="w-6 h-6 text-green-500" /> },
      { name: 'CUET PG', icon: <CheckCircle className="w-6 h-6 text-green-600" /> },
      { name: 'NEET PG', icon: <Stethoscope className="w-6 h-6 text-blue-400" /> },
      { name: 'Pharma', icon: <Pill className="w-6 h-6 text-blue-200" /> },
    ]
  },
  {
    id: 'finance',
    title: 'FINANCE',
    subtitle: 'CA, CS, ACCA',
    courses: [
      { name: 'CA', icon: <FileBarChart className="w-6 h-6 text-green-600" /> },
      { name: 'CS', icon: <Building2 className="w-6 h-6 text-blue-600" /> },
      { name: 'ACCA', icon: <Landmark className="w-6 h-6 text-indigo-600" /> },
    ]
  },
  {
    id: 'others',
    title: 'Others',
    subtitle: 'Online Degrees, Financial Certification, Private Banking...',
    courses: [
      { name: 'Online Degrees', icon: <GraduationCap className="w-6 h-6 text-purple-500" /> },
      { name: 'Financial Certification', icon: <FileBarChart className="w-6 h-6 text-green-500" /> },
    ]
  }
];

const Navbar = () => {
  const { user, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('competitive');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topNavLinks = [
    'Vidyapeeth',
    'Upskilling',
    'Store (Books)',
    'Real Test',
    'Class 1st - 8th',
    'Power Batch'
  ];

  const activeCategoryData = courseCategories.find(c => c.id === activeCategory);

  if (location.pathname === '/goal-selection') {
    return null;
  }

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-2' : 'border-b border-gray-200 py-6'}`}
      >
        <div className="absolute top-0 left-0 w-full h-[6px] bg-[#433A4D]"></div>

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-1">
          <div className="flex justify-between items-center">

            {/* Left Section: Logo & All Courses Button */}
            <div className="flex items-center gap-6">
              <Link to="/" className="flex items-center">
                <img
                  src="/aakashlogo.png"
                  alt="Aakash Academics"
                  className={`w-auto object-contain transition-all duration-300 ${scrolled ? 'h-12' : 'h-[72px]'}`}
                />
              </Link>

              <div className="relative group/nav z-50 h-full">
                <button className={`hidden lg:flex items-center gap-2 border border-[#5A4BDA] text-[#5A4BDA] bg-white group-hover/nav:border-[#5A4BDA] group-hover/nav:bg-white rounded-md px-4 text-[15px] font-bold transition-all duration-300 h-10 lg:h-11`}>
                  All Courses <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover/nav:rotate-180" />
                </button>

                {/* Invisible hover bridge to keep menu open while moving pointer down */}
                <div className="absolute top-full left-0 w-full h-4 bg-transparent cursor-default"></div>

                {/* Mega Menu Dropdown */}
                <div className="absolute top-[calc(100%+10px)] left-0 w-[850px] bg-white shadow-[0_10px_40px_-10px_rgba(0,0,0,0.2)] rounded-lg border border-gray-100 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 flex overflow-hidden lg:h-[480px]">
                  {/* Left Sidebar */}
                  <div className="w-[340px] bg-white border-r border-gray-100 overflow-y-auto py-2 custom-scrollbar">
                    {courseCategories.map((cat) => (
                      <div
                        key={cat.id}
                        onMouseEnter={() => setActiveCategory(cat.id)}
                        className={`px-6 py-4 cursor-pointer flex justify-between items-center group/item transition-colors ${activeCategory === cat.id ? 'bg-[#F4F6F8]' : 'hover:bg-gray-50'}`}
                      >
                        <div className="pr-2">
                          <div className="font-bold text-[14px] text-gray-900 leading-tight">{cat.title}</div>
                          <div className="text-[12px] text-gray-500 leading-snug mt-1">{cat.subtitle}</div>
                        </div>
                        <ChevronRight className={`w-4 h-4 shrink-0 transition-colors ${activeCategory === cat.id ? 'text-gray-800' : 'text-gray-400 group-hover/item:text-gray-600'}`} />
                      </div>
                    ))}
                  </div>

                  {/* Right Content Area */}
                  <div className="flex-1 bg-[#F8F9FA] p-8 overflow-y-auto custom-scrollbar">
                    {activeCategoryData?.courses && activeCategoryData.courses.length > 0 ? (
                      <div className="grid grid-cols-2 gap-4 auto-rows-max">
                        {activeCategoryData.courses.map(course => (
                          <div key={course.name} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer flex items-center gap-4">
                            <div className="w-10 h-10 flex items-center justify-center shrink-0">
                              {course.icon}
                            </div>
                            <span className="font-bold text-gray-800 text-[14px]">{course.name}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400 font-semibold">
                        Content coming soon...
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Section: Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {topNavLinks.map((name) => (
                <Link
                  key={name}
                  to="#"
                  className={`font-bold text-gray-800 hover:text-[#5A4BDA] transition-all duration-300 font-nunito ${scrolled ? 'text-sm' : 'text-[15px]'}`}
                >
                  {name}
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
                  <div className="w-10 h-10 rounded-full bg-[#5A4BDA] text-white flex items-center justify-center font-bold text-lg border-2 border-white shadow-sm overflow-hidden ring-2 ring-gray-100">
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
                  className={`bg-[#5A4BDA] hover:bg-[#4d3fc4] text-white rounded-md font-bold font-nunito transition-all duration-300 ${scrolled ? 'px-6 py-2.5 text-sm' : 'px-8 py-2.5 text-[15px]'}`}
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

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="lg:hidden absolute top-full right-0 w-72 h-screen bg-white shadow-2xl border-l border-gray-100 p-6 flex flex-col overflow-y-auto"
            >
              <button className="w-full flex items-center justify-between border border-[#5A4BDA] text-[#5A4BDA] bg-[#F8F7FF] rounded-md px-4 py-3 mb-6 font-semibold">
                All Courses <ChevronDown className="w-4 h-4" />
              </button>

              <div className="flex flex-col gap-4 border-b border-gray-200 pb-6 mb-6">
                {topNavLinks.map((name) => (
                  <Link
                    key={name}
                    to="#"
                    className="text-base font-bold text-gray-800 hover:text-[#5A4BDA]"
                    onClick={() => setIsOpen(false)}
                  >
                    {name}
                  </Link>
                ))}
              </div>

              <Link
                to="/login"
                className="bg-[#5A4BDA] text-white text-center rounded-md px-4 py-3 font-bold"
                onClick={() => setIsOpen(false)}
              >
                Login/Register
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
};

export default Navbar;
