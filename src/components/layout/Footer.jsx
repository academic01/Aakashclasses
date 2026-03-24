import { Link } from 'react-router-dom';
import { Tv, Globe, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] pt-20 pb-10 relative overflow-hidden z-10 font-nunito">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.jpeg" 
                alt="Aakash Academics" 
                className="h-16 w-auto object-contain grayscale"
              />
            </Link>
            <p className="text-textSecondary leading-relaxed text-sm">
              Your Rank. Your Rules. Your Academy. Next-generation learning platform for the stars of tomorrow. Premium education, simplified.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textSecondary hover:bg-textPrimary hover:text-white transition-all"><Tv className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textSecondary hover:bg-textPrimary hover:text-white transition-all"><Globe className="w-5 h-5" /></a>
              <a href="#" className="p-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textSecondary hover:bg-textPrimary hover:text-white transition-all"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-orbitron text-sm font-bold text-textPrimary mb-8 uppercase tracking-widest">Explore</h3>
            <ul className="space-y-4 font-exo font-semibold text-textSecondary text-sm">
              <li><Link to="/courses" className="hover:text-black hover:translate-x-1 transition-all inline-block">All Courses</Link></li>
              <li><Link to="/live" className="hover:text-black hover:translate-x-1 transition-all inline-block">Live Classes</Link></li>
              <li><Link to="/tests" className="hover:text-black hover:translate-x-1 transition-all inline-block">Test Series</Link></li>
              <li><Link to="/faculty" className="hover:text-black hover:translate-x-1 transition-all inline-block">Top Faculty</Link></li>
              <li><Link to="/resources" className="hover:text-black hover:translate-x-1 transition-all inline-block">Free Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-sm font-bold text-textPrimary mb-8 uppercase tracking-widest">Support</h3>
            <ul className="space-y-4 font-exo font-semibold text-textSecondary text-sm">
              <li><Link to="/about" className="hover:text-black hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-black hover:translate-x-1 transition-all inline-block">Contact Support</Link></li>
              <li><Link to="/careers" className="hover:text-black hover:translate-x-1 transition-all inline-block">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-black hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-black hover:translate-x-1 transition-all inline-block">T&C</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-sm font-bold text-textPrimary mb-8 uppercase tracking-widest">Mobile App</h3>
            <p className="text-textSecondary mb-6 text-sm">Download our app to learn on the go, offline, anytime.</p>
            <div className="flex flex-col gap-3">
              <button className="bg-textPrimary text-white flex items-center justify-center gap-2 py-3 rounded-xl hover:bg-[#333333] transition font-exo font-bold text-sm shadow-md">
                <Mail className="w-5 h-5" /> Get App Link via Email
              </button>
              <div className="h-12 border border-[#E5E5E5] rounded-xl flex items-center justify-center text-textMuted font-bold font-exo text-xs hover:border-textPrimary hover:text-textPrimary cursor-pointer transition uppercase tracking-widest">
                App Store
              </div>
              <div className="h-12 border border-[#E5E5E5] rounded-xl flex items-center justify-center text-textMuted font-bold font-exo text-xs hover:border-textPrimary hover:text-textPrimary cursor-pointer transition uppercase tracking-widest">
                Google Play
              </div>
            </div>
          </div>

        </div>

        <div className="pt-10 border-t border-[#F0F0F0] text-center flex flex-col items-center">
          <p className="text-textMuted font-nunito text-xs uppercase tracking-widest font-bold">
            © 2026 Aakash Academic Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
