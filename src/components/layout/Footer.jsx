import { Link } from 'react-router-dom';
import { Tv, Globe, MessageCircle, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darkBg border-t border-cyanAccent/10 pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[2px] bg-gradient-to-r from-transparent via-cyanAccent to-transparent opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <h2 className="font-orbitron font-bold text-2xl text-white">
              AAKASH<br/><span className="text-orangeAccent text-sm tracking-widest">ACADEMIC</span>
            </h2>
            <p className="text-gray-400 font-nunito leading-relaxed">
              Your Rank. Your Rules. Your Academy. Next-generation learning platform for the stars of tomorrow.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 glass-card hover:bg-cyanAccent/20 hover:text-cyanAccent transition-colors"><Tv className="w-5 h-5" /></a>
              <a href="#" className="p-2 glass-card hover:bg-cyanAccent/20 hover:text-cyanAccent transition-colors"><Globe className="w-5 h-5" /></a>
              <a href="#" className="p-2 glass-card hover:bg-cyanAccent/20 hover:text-cyanAccent transition-colors"><MessageCircle className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h3 className="font-orbitron text-lg text-cyanAccent mb-6 glow-text-sm">Explore</h3>
            <ul className="space-y-3 font-nunito text-gray-400">
              <li><Link to="/courses" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">All Courses</Link></li>
              <li><Link to="/live" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">Live Classes</Link></li>
              <li><Link to="/tests" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">Test Series</Link></li>
              <li><Link to="/faculty" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">Top Faculty</Link></li>
              <li><Link to="/resources" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">Free Resources</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-lg text-cyanAccent mb-6 glow-text-sm">Support</h3>
            <ul className="space-y-3 font-nunito text-gray-400">
              <li><Link to="/about" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">Contact Support</Link></li>
              <li><Link to="/careers" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">Careers</Link></li>
              <li><Link to="/privacy" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-cyanAccent hover:translate-x-1 transition-all inline-block">T&C</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-orbitron text-lg text-cyanAccent mb-6 glow-text-sm">Learn Anywhere</h3>
            <p className="text-gray-400 font-nunito mb-4 text-sm">Download our app to learn on the go, offline, anytime.</p>
            <div className="flex flex-col gap-3">
              <button className="glass-card flex items-center justify-center gap-2 py-3 hover:bg-white/10 transition">
                <Mail className="w-5 h-5" /> Get App Link via Email
              </button>
              {/* Placeholders for App Store buttons */}
              <div className="h-12 border border-white/20 rounded-lg flex items-center justify-center text-gray-400 font-bold hover:border-cyanAccent cursor-pointer transition">
                App Store Preview
              </div>
              <div className="h-12 border border-white/20 rounded-lg flex items-center justify-center text-gray-400 font-bold hover:border-cyanAccent cursor-pointer transition">
                Google Play Preview
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-white/10 text-center flex flex-col items-center">
          <p className="text-gray-500 font-nunito text-sm">
            © 2026 Aakash Academic Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
