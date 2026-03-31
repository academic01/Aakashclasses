import { Link } from 'react-router-dom';
import { Mail } from 'lucide-react';

const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const WhatsappIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"></path>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="none" className={className}>
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.016 3.016 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.498 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.016 3.016 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const Footer = () => {
  return (
    <footer className="bg-white border-t border-[#E5E5E5] pt-20 pb-10 relative overflow-hidden z-10 font-nunito">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[1px] bg-gradient-to-r from-transparent via-[#E5E5E5] to-transparent"></div>
      
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          <div className="space-y-6">
            <Link to="/" className="inline-block">
              <img 
                src="/logo.png" 
                alt="Aakash Academics" 
                className="h-[70px] w-auto object-contain"
              />
            </Link>
            <p className="text-textSecondary leading-relaxed text-sm">
              Your Rank. Your Rules. Your Academy. Next-generation learning platform for the stars of tomorrow. Premium education, simplified.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://youtube.com/@aakashacademics?si=8GuakKRMyoO5Ef-K" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textSecondary hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all"><YoutubeIcon className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/aakashacademics?igsh=MTNxMzdpazZ3dXE4cg==" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textSecondary hover:bg-[#E1306C] hover:border-[#E1306C] hover:text-white transition-all"><InstagramIcon className="w-5 h-5" /></a>
              <a href="https://whatsapp.com/channel/0029VbBtlgEDTkKD76Beca16" target="_blank" rel="noopener noreferrer" className="p-2 bg-[#F5F5F5] border border-[#E5E5E5] rounded-full text-textSecondary hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-all"><WhatsappIcon className="w-5 h-5" /></a>
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
              <li><Link to="/privacy-policy" className="hover:text-black hover:translate-x-1 transition-all inline-block">Privacy Policy</Link></li>
              <li><Link to="/terms-conditions" className="hover:text-black hover:translate-x-1 transition-all inline-block">T&C</Link></li>
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
