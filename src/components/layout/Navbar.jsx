import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

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
    { name: 'Test Series', path: '/test-series' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  const handleDashboardClick = (path) => {
    if (path === '/dashboard' && !user) {
      toast.error('Please login to view your dashboard');
      navigate('/login');
      return;
    }
    navigate(path);
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

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
              src="/logo.png" 
              alt="Aakash Academics" 
              className="h-[50px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                onClick={() => handleDashboardClick(link.path)}
                className="relative font-exo font-semibold text-textSecondary group transition-colors hover:text-black uppercase tracking-widest text-xs"
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <span>{link.name}</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-brandYellow rounded-full transition-all group-hover:w-full shadow-sm"></span>
              </button>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-brandNavy/5 rounded-full border border-brandNavy/10">
                   <User className="w-4 h-4 text-brandNavy" />
                   <span className="text-xs font-orbitron font-bold text-brandNavy uppercase">{user.displayName || 'Rahul K.'}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="p-2 text-textMuted hover:text-red-500 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-secondary px-6 py-2 text-xs border-brandNavy text-brandNavy hover:bg-brandNavy hover:text-white transition-all uppercase tracking-widest">
                  Log In
                </Link>
                <Link to="/signup" className="btn-primary px-6 py-2 text-xs bg-brandNavy text-white hover:bg-brandBlue transition-all uppercase tracking-widest border-transparent">
                  ENROLL NOW
                </Link>
              </>
            )}
          </div>

          <button className="md:hidden text-brandNavy hover:text-black" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            className="md:hidden absolute top-full right-0 w-64 h-screen bg-white/95 backdrop-blur-xl border-l border-[#E5E5E5] p-6 flex flex-col gap-6 shadow-xl"
          >
            {navLinks.map((link) => (
              <button 
                key={link.name} 
                className="text-lg font-exo font-bold text-textSecondary hover:text-brandNavy transition-all border-b border-[#E5E5E5] pb-2 text-left uppercase tracking-widest text-xs"
                onClick={() => { handleDashboardClick(link.path); setIsOpen(false); }}
              >
                {link.name}
              </button>
            ))}
            <div className="mt-8 flex flex-col gap-4">
              {user ? (
                <button onClick={handleLogout} className="btn-secondary text-center">LOGOUT</button>
              ) : (
                <>
                  <Link to="/login" className="btn-secondary text-center" onClick={() => setIsOpen(false)}>LOG IN</Link>
                  <Link to="/signup" className="btn-primary text-center" onClick={() => setIsOpen(false)}>ENROLL NOW</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
