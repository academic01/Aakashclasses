import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, Rocket } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromotionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleRegister = () => {
    handleClose();
    navigate('/signup');
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
            <div className="bg-orange-500 py-3 px-8 text-center text-white font-black tracking-widest text-[10px] uppercase">
               SEATS FILLING FAST! • LIMITED TIME OFFER
            </div>

            {/* Main Content */}
            <div className="p-8 md:p-10 pt-8 text-center">
               <div className="flex justify-center mb-6">
                  <div className="relative">
                     <div className="w-20 h-20 bg-brandNavy rounded-3xl flex items-center justify-center text-orange-500 rotate-6 shadow-xl">
                        <Rocket className="w-10 h-10 -rotate-6" />
                     </div>
                     <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-orange-500 animate-pulse" />
                  </div>
               </div>

               <h2 className="text-3xl md:text-4xl font-outfit font-black text-brandNavy mb-2 leading-tight">
                  CUET 2026 Batch
               </h2>
               <p className="text-lg font-bold text-orange-600 mb-6 uppercase tracking-wider">
                  Starting from 1st April
               </p>

               <div className="bg-white/50 p-6 rounded-3xl border border-brandNavy/5 mb-8">
                  <div className="flex items-center justify-center gap-4 mb-2">
                     <Calendar className="w-5 h-5 text-gray-400 font-bold" />
                     <span className="text-gray-600 font-bold tracking-tight">Registration Ends 31st March</span>
                  </div>
                  <div className="flex items-center justify-center gap-3">
                     <span className="text-gray-400 line-through text-lg font-bold">₹500</span>
                     <span className="text-3xl font-black text-brandNavy">₹99</span>
                     <span className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-full">80% OFF</span>
                  </div>
               </div>

               <button 
                  onClick={handleRegister}
                  className="w-full bg-[#0D2240] text-brandBeige py-5 rounded-2xl font-black text-xl shadow-xl shadow-brandNavy/20 hover:scale-[1.02] hover:shadow-brandNavy/40 transition-all flex items-center justify-center gap-3"
               >
                  Register Now
               </button>
               
               <p className="mt-4 text-[10px] text-gray-400 font-medium uppercase tracking-widest">
                  *T&C Apply • Secure payments
               </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-brandNavy/5 rounded-full blur-3xl"></div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PromotionModal;
