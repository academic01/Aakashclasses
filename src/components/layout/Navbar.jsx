import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Rocket } from 'lucide-react';

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
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-darkBg/80 backdrop-blur-lg border-b border-cyanAccent/20 shadow-[0_4px_30px_rgba(0,245,255,0.1)] py-3' : 'bg-transparent py-5'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-gradient-to-tr from-purpleAccent to-cyanAccent p-2 rounded-lg group-hover:shadow-[0_0_15px_rgba(0,245,255,0.6)] transition-all">
              <Rocket className="w-6 h-6 text-white" />
            </div>
            <span className="font-orbitron font-bold text-xl md:text-2xl neon-text-cyan tracking-wider">
              AAKASH<br/><span className="text-xs text-orangeAccent tracking-[0.2em] -mt-1 block">ACADEMIC</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="font-nunito font-semibold text-gray-300 hover:text-cyanAccent hover:drop-shadow-[0_0_5px_rgba(0,245,255,0.8)] transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="font-nunito font-bold text-white hover:text-cyanAccent transition">
              Log In
            </Link>
            <Link to="/signup" className="glass-card px-6 py-2 font-orbitron font-bold text-sm bg-cyanAccent/10 border-cyanAccent/50 text-cyanAccent hover:bg-cyanAccent hover:text-darkBg transition-all">
              ENROLL NOW
            </Link>
          </div>

          <button className="md:hidden text-white hover:text-cyanAccent" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:hidden absolute top-full left-0 w-full bg-darkBg/95 backdrop-blur-xl border-b border-cyanAccent/20 p-4 flex flex-col gap-4 shadow-[0_10px_30px_rgba(0,245,255,0.1)]"
        >
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className="text-lg font-nunito font-semibold text-gray-300 hover:text-cyanAccent"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-gray-800" />
          <Link to="/login" className="text-lg font-nunito font-bold" onClick={() => setIsOpen(false)}>Log In</Link>
          <Link to="/signup" className="text-center glass-card py-3 mt-2 font-orbitron bg-cyanAccent text-darkBg text-lg" onClick={() => setIsOpen(false)}>ENROLL NOW</Link>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
