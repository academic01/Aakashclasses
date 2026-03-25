import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  return (
    <>
      <motion.nav 
        className={`fixed w-full z-50 transition-all duration-300 bg-white ${scrolled ? 'shadow-md py-2' : 'border-b border-gray-200 py-6'}`}
      >
        {/* Top thin dark bar */}
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

              <div className="relative group">
                <button className={`hidden lg:flex items-center gap-2 border border-[#5A4BDA] text-[#5A4BDA] bg-[#F8F7FF] hover:bg-[#F3F0FF] rounded-md px-4 text-sm font-bold transition-all duration-300 ${scrolled ? 'py-2' : 'py-2.5'}`}>
                  All Courses <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-xl rounded-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 p-2 flex flex-col">
                   <Link to="/courses?category=neet" className="px-4 py-3 hover:bg-gray-50 hover:text-[#5A4BDA] rounded-md font-bold text-gray-800 text-sm transition-colors">NEET</Link>
                   <Link to="/courses?category=jee" className="px-4 py-3 hover:bg-gray-50 hover:text-[#5A4BDA] rounded-md font-bold text-gray-800 text-sm transition-colors">IIT JEE</Link>
                   <Link to="/courses?category=foundation" className="px-4 py-3 hover:bg-gray-50 hover:text-[#5A4BDA] rounded-md font-bold text-gray-800 text-sm transition-colors">Pre Foundation</Link>
                   <Link to="/courses?category=boards" className="px-4 py-3 hover:bg-gray-50 hover:text-[#5A4BDA] rounded-md font-bold text-gray-800 text-sm transition-colors">School Boards</Link>
                </div>
              </div>
            </div>

            {/* Middle Section: Navigation Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {topNavLinks.map((name) => (
                <Link 
                  key={name} 
                  to="#"
                  className={`font-bold text-gray-800 hover:text-[#5A4BDA] transition-all duration-300 font-nunito ${scrolled ? 'text-sm' : 'text-base'}`}
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Right Section: Login Button */}
            <div className="hidden lg:flex items-center">
              <Link 
                to="/login" 
                className={`bg-[#5A4BDA] hover:bg-[#4d3fc4] text-white rounded-md font-bold font-nunito transition-all duration-300 ${scrolled ? 'px-6 py-2.5 text-sm' : 'px-8 py-3 text-base'}`}
                onClick={() => navigate('/login')}
              >
                Login/Register
              </Link>
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
      {/* Spacer to prevent content from going under the fixed navbar */}
      <div className="h-[140px] w-full bg-transparent"></div>
    </>
  );
};

export default Navbar;
