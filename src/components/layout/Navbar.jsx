import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Courses', path: '/courses' },
    { name: 'Live', path: '/live' },
    { name: 'Test Series', path: '/tests' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg border-b border-[#E5E5E5] shadow-sm py-3' : 'bg-white/50 py-5'}`}
    >
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center group">
            <img 
              src="/logo.jpeg" 
              alt="Aakash Academic" 
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="relative font-exo font-semibold text-textSecondary group transition-colors hover:text-black"
              >
                <span>{link.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black rounded-full transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="btn-secondary px-6 py-2 text-sm border-textPrimary text-textPrimary hover:bg-textPrimary hover:text-white transition-all">
              Log In
            </Link>
            <Link to="/signup" className="btn-primary px-6 py-2 text-sm bg-textPrimary text-white hover:bg-[#333333] transition-all">
              ENROLL NOW
            </Link>
          </div>

          <button className="md:hidden text-textPrimary hover:text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          className="md:hidden absolute top-full right-0 w-64 h-screen bg-white/95 backdrop-blur-xl border-l border-[#E5E5E5] p-6 flex flex-col gap-6 shadow-xl"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-lg font-exo font-semibold text-textSecondary hover:text-black transition-all border-b border-[#E5E5E5] pb-2"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="mt-8 flex flex-col gap-4">
            <Link to="/login" className="btn-secondary text-center" onClick={() => setIsOpen(false)}>Log In</Link>
            <Link to="/signup" className="btn-primary text-center" onClick={() => setIsOpen(false)}>ENROLL NOW</Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
