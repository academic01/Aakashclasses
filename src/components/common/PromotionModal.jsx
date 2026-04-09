import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Youtube, ExternalLink, Sparkles } from 'lucide-react';

const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after 1.5 seconds of page load
    const timer = setTimeout(() => {
      const hasSeenModal = sessionStorage.getItem('hasSeenPromoModal');
      if (!hasSeenModal) {
        setIsOpen(true);
      }
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('hasSeenPromoModal', 'true');
  };

  const handleRedirect = () => {
    handleClose();
    window.open('https://youtube.com/@aakashacademics?si=8GuakKRMyoO5Ef-K', '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="relative w-full max-w-lg bg-brandBeige rounded-[40px] overflow-hidden shadow-2xl border border-white/20"
          >
            {/* Close Button */}
            <button 
              onClick={handleClose}
              className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-brandNavy" />
            </button>

            {/* Top Badge Section */}
            <div className="bg-[#FF0000] py-3 px-8 text-center text-white font-black tracking-widest text-[10px] uppercase">
               FREE EDUCATION FOR ALL • JOIN US LIVE!
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-10 pt-8 text-center">
               <div className="flex justify-center mb-6">
                  <div className="relative">
                     <div className="w-20 h-20 bg-[#FF0000] rounded-3xl flex items-center justify-center text-white rotate-6 shadow-xl">
                        <Youtube className="w-10 h-10 -rotate-6" />
                     </div>
                     <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-[#FF0000] animate-pulse" />
                  </div>
               </div>

               <h2 className="text-3xl md:text-4xl font-outfit font-black text-brandNavy mb-2 leading-tight">
                  Watch Us Live!
               </h2>
               <p className="text-lg font-bold text-[#FF0000] mb-6 uppercase tracking-wider">
                  LEARN ANYTIME, ANYWHERE
               </p>

               <div className="bg-white/50 p-6 rounded-3xl border border-brandNavy/5 mb-8">
                  <p className="text-gray-600 font-bold leading-relaxed mb-4 px-4">
                     Subscribe to our YouTube channel for free live classes, exam strategy sessions, and expert guidance.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                     <span className="text-brandNavy font-black text-xl">Join 8,000+ Students Today</span>
                  </div>
               </div>

               <button 
                  onClick={handleRedirect}
                  className="w-full bg-[#FF0000] text-white py-5 rounded-2xl font-black text-xl shadow-xl shadow-red-500/20 hover:scale-[1.02] hover:shadow-red-500/40 transition-all flex items-center justify-center gap-3"
               >
                  Subscribe on YouTube <ExternalLink className="w-6 h-6" />
               </button>
               
               <p className="mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  Daily Live Classes • Free Resources • Expert Tips
               </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-red-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brandNavy/5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
